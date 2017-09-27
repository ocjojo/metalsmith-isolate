/**
 * Expose `plugin`.
 */
 var match = require('multimatch');

 module.exports = isolate;

 var removedFiles = {};
 var initialized = false;

/**
 * A Metalsmith plugin to allow usage of middleware on specific patterns of files.
 *
 * @return {Function}
 */
 function isolate(pattern){
 	var opts = pattern;
 	if ('string' == typeof opts) opts = [opts];
 	if (opts instanceof Array) opts = { patterns: opts };
 	opts = opts || {};
 	var patterns = opts.patterns || [];

 	return function(files, ms, done){
 		//init save original path for further filtering later on
 		if(!initialized){
 			for(let file in files){
 				files[file].originalPath = file;
 			}
 			initialized = true;
 		}
 		//reset original files for consecutive runs
 		Object.assign(files, removedFiles);
 		removedFiles = {};
 		//if pattern provided filter files
 		if(typeof pattern != 'undefined'){
 			for(let file in files){
 				var matches = match(files[file].originalPath, patterns);
 				if(!matches[0]){
 					removedFiles[file] = files[file];
 					delete files[file];
 				}
 			}
 		}
 		done();
 	};
 }