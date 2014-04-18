// step module÷

var fs = require('fs'),
	path = require('path');

function StepRunner(options) {
	this.verbose = options.verbose || false;
	this.context = {};
}

StepRunner.prototype.runStep = function(stepName, options, cb) {
	var stepPath = path.join(__dirname, 'steps', stepName + '.js');
	if (!fs.existsSync(stepPath)) {
		console.error('Could not find step: ' + stepName + ' at: ' + stepPath);
		throw new Error('Step not found');
	}
	var step = require(stepPath);
	var opt = {};

	console.log('STEP %s', stepName);
	if (this.verbose) {
		console.log('Name:        "%s"', step.name);
		console.log('Description: "%s"', step.description);
		console.log('Options:     ');
	}

	opt['verbose'] = this.verbose;

	for (var key in step.options) {
		if (typeof options[key] === 'undefined') {
			console.warn('--> Missing option `%s` (%s)', key, step.options[key]);
		} else {
			if (this.verbose) {
				console.log('--> Option `%s` set to %s (%s)', key, JSON.stringify(options[key]), step.options[key]);
			}
			opt[key] = options[key];
		}
	}

	for (var key in options) {
		if (!step.options.hasOwnProperty(key)) {
			console.warn('--> Option `%s` is not valid and will be unused', key);
		}
	}

	if (this.verbose) {
		console.log('Output:');
	}

	var _this = this;
	this.context[stepName] = {};
	step.action.call(this.context[stepName], opt, function() {
		if (_this.verbose) {
			console.log('%s context:', stepName);
			console.log(_this.context[stepName]);
			console.log();
		}
		cb.call(_this.context);
	});
};

module.exports = StepRunner;