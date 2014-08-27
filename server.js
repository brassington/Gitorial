var express = require('express');
var partials = require('express-partials');
var app = express();
var GitHubApi = require('github');
var fs = require('fs');
var uuid = require('node-uuid');

var port = process.env.PORT || 3000;
var github = new GitHubApi({
	version: "3.0.0"
});
github.authenticate({
    type: "oauth",
    token: "bae8b561a5aa33a712bfe9546b3a6957ab186fd9"
});

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use('/', express.static(__dirname + '/public'));
app.use(partials());


app.get('/:user/:repo', function(req, res) {
	req.setEncoding('utf8');
	var user;
			github.user.get({username: req.params.user}, function(error, data) {
			if (error) {
				console.log(error);
			} else {
        user = data;
      }
		})
	github.repos.getContent({
		user: req.params.user,
		repo: req.params.repo,
		path: 'TEACHME.js'
	}, function(error, data) {
		var body = '';
		if (error) {
			console.log(error);
		}

		var buffer = new Buffer(data.content, 'base64');
		var randId = uuid.v4();
		var tempUrl = '/tmp/'+randId+'.js';
		fs.writeFile("public"+tempUrl, buffer, function(error){
			if (error) {
				console.log(err);
			} else {
				console.log("The file was changed.");
				res.render('index', { layout: true, locals: {
					scripturl: tempUrl,
					avatarUrl: user.avatar_url,
					username: user.login,
					fullname: user.name,
					reponame: req.params.repo
				}});
			}
		})
		// res.send(200, parsed);
	});

});

app.listen(port);

console.log('App now running on port: ' + port);