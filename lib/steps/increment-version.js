var fs = require('fs'),
	util = require('util');

module.exports = {
	name: 'Increment version',
	description: 'Increment the version in package.json by 1 patch',
	options: {
		'packagePath': 'Path to the package file'
	},
	action: function(opt, cb) {
		var pkg = JSON.parse(fs.readFileSync(opt.packagePath));
		this.oldVersion = pkg.version;

		// semver
		var regex = new RegExp(/([0-9]+)\.([0-9]+)\.([0-9]+)/);

		var major = parseInt(pkg.version.replace(regex, '$1'));
		var minor = parseInt(pkg.version.replace(regex, '$2'));
		var patch = parseInt(pkg.version.replace(regex, '$3'));

		patch++;

		pkg.version = util.format('%s.%s.%s', major, minor, patch);

		fs.writeFile(opt.packagePath, JSON.stringify(pkg, null, 2), (function(err) {
			console.log('Incrementing', pkg.name, 'version from', this.oldVersion, 'to', pkg.version);
			cb();
		}).bind(this));
	}
}