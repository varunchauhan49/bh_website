module.exports = function(app,request){

  app.post('/api/search',function(req, res){
      request
     .post('http://127.0.0.1:5000/search')
     .send(req.body)
     .set('Accept', 'application/json')
     .end(function(err, response){
       if (err || !response.ok) {
         return res.send({"alert":"Oh no! error"});
       } else {
          return res.send(response.body);
       }
     });
  })

  app.post('/api/search/post',function(req, res){
      request
     .post('http://127.0.0.1:5000/post')
     .send(req.body)
     .set('Accept', 'application/json')
     .end(function(err, response){
       if (err || !response.ok) {
         return res.send({"alert":"Oh no! error"});
       } else {
          return res.send(response.body);
       }
     });
  })

  app.post('/api/search/filter/list',function(req, res){
      request
     .post('http://127.0.0.1:5000/filter/list')
     .send(req.body)
     .set('Accept', 'application/json')
     .end(function(err, response){
       if (err || !response.ok) {
         return res.send({"alert":"Oh no! error"});
       } else {
          return res.send(response.body);
       }
     });
  })

  app.post('/api/search/filter/results',function(req, res){
      request
     .post('http://127.0.0.1:5000/filter/results')
     .send(req.body)
     .set('Accept', 'application/json')
     .end(function(err, response){
       if (err || !response.ok) {
         return res.send({"alert":"Oh no! error"});
       } else {
          return res.send(response.body);
       }
     });
  })

  app.post('/api/post/comment',function(req, res){
      request
     .post('http://127.0.0.1:5000/post/comment')
     .send(req.body)
     .set('Accept', 'application/json')
     .end(function(err, response){
       if (err || !response.ok) {
         return res.send({"alert":"Oh no! error"});
       } else {
          return res.send(response.body);
       }
     });
  })

  app.post('/api/post/rating',function(req, res){
      request
     .post('http://127.0.0.1:5000/post/rating')
     .send(req.body)
     .set('Accept', 'application/json')
     .end(function(err, response){
       if (err || !response.ok) {
         return res.send({"alert":"Oh no! error"});
       } else {
          return res.send(response.body);
       }
     });
  })

  app.post('/api/post/like_dislike',function(req, res){
      request
     .post('http://127.0.0.1:5000/post/like_dislike')
     .send(req.body)
     .set('Accept', 'application/json')
     .end(function(err, response){
       if (err || !response.ok) {
         return res.send({"alert":"Oh no! error"});
       } else {
          return res.send(response.body);
       }
     });
  })

  app.post('/api/create/user',function(req, res){
      request
     .post('http://127.0.0.1:5000/create/user')
     .send(req.body)
     .set('Accept', 'application/json')
     .end(function(err, response){
       if (err || !response.ok) {
         return res.send({"alert":"Oh no! error"});
       } else {
          return res.send(response.body);
       }
     });
  })

  app.post('/api/search/user',function(req, res){
      request
     .post('http://127.0.0.1:5000/user/search')
     .send(req.body)
     .set('Accept', 'application/json')
     .end(function(err, response){
       if (err || !response.ok) {
         return res.send({"alert":"Oh no! error"});
       } else {
          return res.send(response.body);
       }
     });
  })
};