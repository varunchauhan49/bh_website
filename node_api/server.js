var express = require('express');
var app =express();
var path = require('path');
var webpack = require('webpack');
var config = require('./webpack.config.js');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var fs = require('fs');
var multer = require('multer');
var request = require('superagent');
var bodyParser = require('body-parser');

var redis = require('redis');
var client = redis.createClient();

var userObject;

const compiler = webpack(config);

var passport = require('passport');

var GoogleStrategy = require('passport-google-oauth20').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;

function extractProfile (profile) {
	userObject = profile;
	console.log('callback',userObject);
	var imageUrl = '';
	if (profile.photos && profile.photos.length) {
	imageUrl = profile.photos[0].value;
	}
	return {
	email: userObject.emails[0].value
};
}

app.use(cookieParser());
app.use(session({ 
    secret: 'clinksecret',  // TODO: STORE outside
    saveUninitialized: true,
    httpOnly:true,
    resave: true,
    secure:true
}));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());


passport.use(new GoogleStrategy({
  clientID: '771724316675-bnqart5osgk5svsucuf9htcpvmlbhio3.apps.googleusercontent.com',
  clientSecret: 'VfLQamXlxfWCf6Bf1qockmYi',
  callbackURL: 'http://localhost:3349/auth/google/callback',
  accessType: 'offline'
}, function (accessToken, refreshToken, profile, cb) {
  // Extract the minimal profile information we need from the profile object
  // provided by Google
  cb(null, extractProfile(profile));
}));

passport.use(new FacebookStrategy({
    clientID: '525896620934007',
    clientSecret:'bc301da15cbf1a8abfaa5376da87581e' ,
    callbackURL: 'http://localhost:3349/auth/facebook/callback',
    profileFields:['id','name','gender','link','email','picture.type(large)']
  },
  function(accessToken, refreshToken, profile, done) {
    return done(null, extractProfile(profile));
  }
));

app.get('/auth/facebook', passport.authenticate('facebook',{ scope : ['email'] }));
app.get('/auth/facebook/callback',
  passport.authenticate('facebook'),
  function(req, res) {
    var name = userObject.name.givenName + ' ' +  userObject.name.familyName;
    console.log('FBProfile',userObject);
    client.hmset(req.sessionID, {
      'name': name,
      'email': userObject.emails[0].value,
      'picture': userObject.photos[0].value,
      'picture_big':userObject.photos[0].value
    });
    res.redirect('/');
  });

app.get('/auth/login',

  function (req, res, next) {
    if (req.query.return) {
      req.session.oauth2return = req.query.return;
    }
    next();
  },
  passport.authenticate('google', { scope: ['email', 'profile'] })
);

app.get('/auth/google/callback',passport.authenticate('google'),

  function (req, res) {
  	//req.session.user = userObject;
  	res.cookie('user', userObject);
  	var picture_big = userObject.photos[0].value.toString().replace('sz=50','sz=200');
  	client.hmset(req.sessionID, {
	    'name': userObject.displayName,
	    'email': userObject.emails[0].value,
	    'picture': userObject.photos[0].value,
	    'picture_big':picture_big
	});
  	console.log('User Object', userObject.displayName,userObject.emails[0].value,userObject.photos[0].value);
    var redirect = req.session.oauth2return || '/';
    delete req.session.oauth2return;
    res.redirect(redirect);
  }
);

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});


app.use(require('webpack-dev-middleware')(compiler));
app.use(require('webpack-hot-middleware')(compiler));


app.use(express.static(path.join(__dirname, 'public')));

app.use('/public', express.static(path.join(__dirname + '/public')));
app.use('/static', express.static(path.join(__dirname + '/src/static')));

app.get('/',function(req,res){
	res.sendFile(path.join(__dirname+'/public/index.html'));
});
app.get('/login',function(req,res){
  res.sendFile(path.join(__dirname+'/public/index.html'));
});
app.get('/results',function(req,res){
	res.sendFile(path.join(__dirname+'/public/index.html'));
});
app.get('/sign-up',function(req,res){
	res.sendFile(path.join(__dirname+'/public/index.html'));
});
require('./route/route.js')(app,request);
var upload = multer({ dest:storage });
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null,path.join(__dirname+'/public/images'))
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now())
  }
});

app.post('/file-upload', multer({ dest: path.join(__dirname+'/public/images')}).single('upl'), function(req,res){
  //  console.log(req.body); //form fields
  /* example output:
  { title: 'abc' }
   */
  console.log(req.file); //form files
  res.status(204).end();
});
app.post('/photos/upload', upload.array('photos', 12), function (req, res, next) {
  // req.files is array of `photos` files
  // req.body will contain the text fields, if there were any
});



app.get('/api/user',function(req, res){
		var user;
		client.hgetall(req.sessionID, function(err, object) {
		    console.log(object);
		    user = object;
		    return res.json(user);
		});
});



app.get('/auth/logout', function (req, res) {
  req.logout();
  res.redirect('/');
});


var server = app.listen('3349',function(){
	console.log('Server Running on port',server.address().port);
});