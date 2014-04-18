var StepRunner = require('./step-runner');

module.exports = function(verbose, cb) {
	var stepRunner = new StepRunner({
		verbose: verbose
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
				stepRunner.runStep('git-push', {}, function() {
					cb();
				});
			});
		});
	});
}