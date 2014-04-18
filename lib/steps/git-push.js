module.exports = {
	name: 'Git Push',
	description: 'Push changes to the upstream remote of this git repo',
	options: {},
	action: function(opt, cb) {
		console.log('git push');
		cb();
	}
}