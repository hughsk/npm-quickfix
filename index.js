var http = require('http')
  , url = require('url')
  , request = require('request');

http.createServer(function(req, res) {
	var file = url.parse(req.url).path;
	
	if (!file.match(/\.tgz$/g)) {
		return request.get('https://registry.npmjs.org' + req.url, function(err, response, body) {
			var body = JSON.parse(body)
			  , versions = body.versions
			  , name = body.name;

			console.log(require('util').inspect(body, null, null, null));

			if (body.dist && body.dist.tarball) body.dist.tarball = body.dist.tarball
					.replace(/http(s)?\:\/\/registry.npmjs.org\/\-\//,
						'https://registry.npmjs.org/' + name + '/-/'
					);

			if (versions) Object.keys(versions).forEach(function(version) {
				versions[version].dist.tarball = versions[version].dist.tarball
					.replace(/http(s)?\:\/\/registry.npmjs.org\/\-\//,
						'https://registry.npmjs.org/' + name + '/-/'
					);
			});

			res.end(JSON.stringify(body));
		});
	}

	request.get('https://registry.npmjs.org' + req.url).pipe(res);
}).listen(8080);