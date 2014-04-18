var StepRunner = require('./step-runner');

var stepRunner = new StepRunner({
	verbose: true
});

console.log('');
console.log('POSTPUBLISH: started');
console.log('');
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
				console.log('');
				console.log('POSTPUBLISH: finished');
				console.log('');
			});
		});
	});
});