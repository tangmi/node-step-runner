var download = require('download');

module.exports = {
	name: 'Download',
	description: 'Downloads a file',
	options: {
		'url': 'Path to download',
		'output': 'Output folder to save the file'
	},
	action: function(opt, cb) {
		var d = download(opt.url, opt.output, {});
		d.on('close', function() {
			cb();
		});
		d.on('error', function(err) {
			throw err;
		});
	}
}