var exec = require('child_process').exec;

// module.exports.name = 'Git Commit';
// module.exports.description = 'Commit the changes made to your repository';
// module.exports.action = function(cb) {
// 	console.log('git commit');
// 	return cb();

// 	exec('git commit -m "' + commitMessage + '"', function(error, stdout, stderr) {
// 		if (error) {
// 			throw error;
// 		}
// 		if(stderr) {
// 			console.error(stderr);
// 			throw new Error();
// 		}
// 		console.log('Git commit successful');
// 		cb();
// 	});
// };


// alt

// module.exports = require('step-builder')
// 	.name('Git Commit')
// 	.description('Commit the changes made to your repository')
// 	.option('commitMessage', 'Message to describe commit')
// 	.action(function(opt, cb) {
// 		console.log('git commit -m %s', opt.commitMessage);
// 		cb();
// 	})
// 	.build();

// or

module.exports = {
	name: 'Git Commit',
	description: 'Commit the changes made to your repository',
	options: {
		'commitMessage': 'Message to describe commit'
	},
	action: function(opt, cb) {
		exec('git commit -m "' + opt.commitMessage + '"', function(error, stdout, stderr) {
			if (error) {
				throw error;
			}
			console.log('Git commit successful');
			cb();
		});
		cb();
	}
}