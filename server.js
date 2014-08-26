var express = require('express');
var app = express();
var GitHubApi = require('github');

var port = process.env.PORT || 3000;
var github = new GitHubApi({
	version: "3.0.0"
});

app.use('/', express.static(__dirname + '/public'));

// router.param('user', function(req, res, next, id){
// 	if (err) {
// 		return next(err);
// 	}
// 	else if (!user) {
// 		return next(new Error('failed to load user'));
// 	}

// 	req.user = user;
// 	next();
// })

// app.get('/:user/:repo', function(req, res) {
// 	github.repos.getContent({
// 		headers: {
//       'Content-Type': 'text/plain'
// 		},
// 		user: req.params.user,
// 		repo: req.params.repo,
// 		path: 'README.md'
// 	}, function(error, data) {
// 		if (error) {
// 			console.log(error);
// 		}
// 		var reader = new FileReader();
// 		reader.addEventListener("loadend", function() {

// 		});
//     res.status(200).send(reader.readAsText(data.content));
// 	});
  
// });

app.listen(port);

console.log('App now running on port: ' + port);