var exec = require('child_process').exec;

module.exports = {
	name: 'Git Add',
	description: 'Add files to the working set in git',
	options: {
		'files': 'Array of filenames to add',
	},
	action: function(opt, cb) {
		var quotedFiles = opt.files.map(function(file) {
			return '"' + file + '"';
		}).join(' ');
		exec('git add ' + quotedFiles, function(error, stdout, stderr) {
			if(error) {
				throw error;
			}
			console.log('Added ' + quotedFiles + ' to git working set');
			cb();
		});
	}
}