module.exports = {
	name: 'Echo',
	description: 'A no-op dummy step that just logs a message',
	options: {
		'echo': 'Message to print'
	},
	action: function(opt, cb) {
		console.log(opt.echo);
		cb();
	}
}