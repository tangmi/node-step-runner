var StepRunner = require('../lib/step-runner');

module.exports = function(cb) {
	var stepRunner = new StepRunner({
		verbose: this.verbose
	});

	stepRunner.runStep('echo', {
		echo: __dirname + '/../package.json'
	}, function() {
		cb();
	});
}