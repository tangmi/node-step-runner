#!/usr/bin/env node

var argv = require('yargs')
	.usage('Usage: $0')
	.alias('v', 'verbose')
	.argv;

var ctx = {};
ctx.verbose = argv.verbose;

console.log('');
console.log('POSTPUBLISH: started');
console.log('');

require('../scripts/postpublish.js').call(ctx, function() {
	console.log('');
	console.log('POSTPUBLISH: finished');
	console.log('');
});