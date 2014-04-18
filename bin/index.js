#!/usr/bin/env node

var argv = require('yargs')
	.usage('Usage: $0')
	.alias('v', 'verbose')
	.argv;

var VERBOSE = argv.verbose;

console.log('');
console.log('POSTPUBLISH: started');
console.log('');

require('../lib/index.js')(VERBOSE, function() {
	console.log('');
	console.log('POSTPUBLISH: finished');
	console.log('');
})