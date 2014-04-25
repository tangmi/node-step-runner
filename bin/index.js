#!/usr/bin/env node

var fs = require('fs'),
	path = require('path');

var argv = require('yargs')
	.usage('Usage: $0')
	.alias('v', 'verbose')
	.alias('s', 'script')
	.demand('script')
	.argv;

var ctx = {};
ctx.verbose = argv.verbose;

var script = argv.script;

global.log = console.log;
console.log = function() {
	var args = Array.prototype.slice.call(arguments, 0);
	args[0] = "  " + args[0];
	log.apply(console, args);
}

log('');
log('%s: started', script);
log('');

var scriptPath = path.join(__dirname, '../scripts/', script + '.js');
if (!fs.existsSync(scriptPath)) {
	console.error('Could not find step: ' + script + ' at: ' + scriptPath);
	throw new Error('Step not found');
}

require(scriptPath).call(ctx, function() {
	log('');
	log('%s: finished', script);
	log('');
});