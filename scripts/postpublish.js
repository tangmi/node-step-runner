var StepRunner = require('../lib/step-runner');

module.exports = function(cb) {
	var stepRunner = new StepRunner({
		verbose: this.verbose
	});

	stepRunner.runStep('increment-version', {
		packagePath: __dirname + '/../package.json'
	}, function() {
		stepRunner.runStep('git-add', {
			files: ['package.json']
		}, function() {
			stepRunner.runStep('git-commit', {
				commitMessage: 'Release ' + this['increment-version'].oldVersion,
			}, function() {
				cb();
			});
		});
	});
}