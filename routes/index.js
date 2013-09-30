
/*
 * GET home page.
 */
var fs = require('fs');

exports.index = function(req, res){
	'use strict';
	
	fs.readFile('./public/data', 'utf8', function(err, data){
		if(err){
			console.log('Error: ' + err);
			res.send('Error!');
		}else{
			res.render('index', {  	
				title: 'Express',
				data: function(){
					return data;
				}
			});
		}
	});
};

exports.send = function(req, res){
	'use strict';

	var name = req.body.name,
		msg = req.body.msg,
		req_ip = req.header('x-real-ip') || req.connection.remoteAddress,
		str = "<p class='lead'><i class='icon-chevron-right'></i><strong>" + name + "</strong>@"+ req_ip +": " + msg + "</p>";

	fs.open("./public/data", "a", 666, function(e, id){
		fs.write(id, str, null, "utf8", function(){
			fs.close(id, function(){
				console.log('file closed');
				res.redirect('/');
			});
		});
	});
};

exports.send_ajax = function(req, res){
	'use strict';

	var name = req.body.name,
		msg = req.body.msg,
		req_ip = req.header('x-real-ip') || req.connection.remoteAddress,
		str = "<p class='lead'><i class='icon-chevron-right'></i><strong>" + name + "</strong>@"+ req_ip +": " + msg + "</p>";

	fs.open("./public/data", "a", 666, function(e, id){
		fs.write(id, str, null, "utf8", function(){
			fs.close(id, function(){
				console.log('file closed');
				// read the file
				fs.readFile('./public/data', 'utf8', function(err, data){
					if(err){
						console.log('Error: ' + err);
						res.send('Error!');
					}else{
						res.send(data);
					}
				});
				//end read




			});
		});
	});
};



