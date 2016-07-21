var React = require("react");
var ReactDOM = require("react-dom");
var { render } = require('react-dom');
var Bh_App = require("./bh_App.jsx");
var Login = require("./Login.jsx");
var SignUp = require("./SignUp.jsx");

var { browserHistory, Router, Route, IndexRoute, Link } = require('react-router');


require('../src/static/css/bh_web.css');

const Result = ({location:{ query }}) => {
	console.log(query);
	return(
		<h1>hello</h1>
		)
}

render((
  <Router history={browserHistory}>
    <Route path="/" component={Bh_App} />
    <Route path="/login" component={Login} />
    <Route path="/sign-up" component={SignUp} />
    <Route path="/results" component={Result} />
  </Router>
),  document.getElementById('content'));