var SystemBuilder = require('systemjs-builder');
var builder = new SystemBuilder();

builder.loadConfig('./systemjs.config.js')
  .then(function(){
	  return builder.buildStatic('app', 'app.js', {
		  minify: true,
		  mangle: true,
		  rollup: true
	  });
  })
  .then(function(){
	  console.log('bundle built successfully!');
  }).catch(function(err) {
    console.error('>>> [systemjs-builder] Bundling failed'.bold.green, err);
  });
