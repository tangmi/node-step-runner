var exec = require('child_process').exec;

// fail to lock?

module.exports = {
	name: 'Git Push',
	description: 'Push changes to the upstream remote of this git repo',
	options: {},
	action: function(opt, cb) {
		exec('git push', function(error, stdout, stderr) {
			if (error) {
				throw error;
			}
			console.log('Git push successful');
			cb();
		});
		cb();
	}
}