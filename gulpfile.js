var gulp = require('gulp');
var gls = require('gulp-live-server');
var mainBowerFiles = require('gulp-main-bower-files');

var path = { source: { bower_file: './bower.json', html: 'app/*.html', styles: 'app/css/**/*.css', js: 'app/src/**/*.js' }, 
             dest: { root: 'dist', styles: 'dist/css', js: 'dist/src' }
           };

var server = gls.static(path.dest.root, 8888);

gulp.task('lr-server', ['build', 'watch'], function(){
  server.start();
});

gulp.task('html', function() {
  
  gulp.src([path.source.html])
    .pipe(gulp.dest(path.dest.root))
});


gulp.task('styles', function() {
  gulp.src([path.source.styles])
    .pipe(gulp.dest(path.dest.styles))
});

gulp.task('bower-deps', function(){
  gulp.src(path.source.bower_file)
    .pipe(mainBowerFiles())
    .pipe(gulp.dest(path.dest.js))
});

gulp.task('scripts', function(){
  gulp.src([path.source.js])
    .pipe(gulp.dest(path.dest.js))
});

gulp.task('build', ['html', 'styles', 'scripts', 'bower-deps']);

gulp.task('watch', function() {
  gulp.watch(path.source.js, ['scripts']);
  gulp.watch(path.source.styles, ['styles']);
  gulp.watch(path.source.html, ['html']);
});

gulp.task('default', ['lr-server'], function() {
    
  var watcher = gulp.watch([path.source.html, path.source.js, path.source.styles]);
  watcher.on('change', function(event) {
    //console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    server.notify(event);
  });
});