var gulp = require('gulp'), 
    sass = require('gulp-ruby-sass'),
    notify = require("gulp-notify"),
    bower = require('gulp-bower'),
    inject = require('gulp-inject'),
    tinylr;

var config = {
    sassPath: './assets/sass',
    cssPath: './public/css',
    bowerDir: './bower_components'
}

/*gulp.task('express', function() {
  var express = require('express');
  var app = express();
  app.use(require('connect-livereload')({port: 4002}));
  app.use(express.static(__dirname + '/public'));
  app.listen(4000);
});

gulp.task('livereload', function() {
  tinylr = require('tiny-lr')();
  tinylr.listen(4002);
});
*/


gulp.task('bower', function() {
    return bower()
       .pipe(gulp.dest(config.bowerDir));
});

gulp.task('icons', function() {
    return gulp.src(config.bowerDir + '/fontawesome/fonts/**.*')
        .pipe(gulp.dest('./public/fonts'))
});
 
gulp.task('sass', function() {
    return sass(config.sassPath) 
    .on('error', function (err) {
      console.error('Error!', err.message);
   })
    .pipe(gulp.dest(config.cssPath))
});

gulp.task('watch', function() {
  gulp.watch(config.sassPath + '/*.scss', ['sass']);
  gulp.watch('*.html', notifyLiveReload);
  gulp.watch('css/*.css', notifyLiveReload);
});



function notifyLiveReload(event) {
  var fileName = require('path').relative(__dirname + '/public/', event.path);

  tinylr.changed({
    body: {
      files: [fileName]
    }
  });
}

gulp.task('default', [/*'express', 'livereload', */'bower', 'icons', 'sass', 'watch']);