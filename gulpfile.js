var gulp = require('gulp');
var jshint = require('gulp-jshint');
var gls = require('gulp-live-server');
var mainBowerFiles = require('gulp-main-bower-files');

var path = { source: { bower_file: './bower.json', json: 'app/*.json', html: 'app/*.html', styles: 'app/css/**/*.css', js: 'app/src/**/*.js' }, 
             dest: { root: 'dist', styles: 'dist/css', js: 'dist/src' }
           };

var server = gls.static(path.dest.root, 8888);

gulp.task('lr-server', ['build', 'watch'], function(){
  server.start();
});

gulp.task('static', function() {
  
  gulp.src([path.source.html, path.source.json])
    .pipe(gulp.dest(path.dest.root));
});


gulp.task('styles', function() {
  gulp.src([path.source.styles])
    .pipe(gulp.dest(path.dest.styles));
});

gulp.task('bower-deps', function(){
  gulp.src(path.source.bower_file)
    .pipe(mainBowerFiles())
    .pipe(gulp.dest(path.dest.js));
});

gulp.task('scripts', function(){
  gulp.src(['gulpfile.js', path.source.js])
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(gulp.dest(path.dest.js));
});

gulp.task('build', ['static', 'styles', 'scripts', 'bower-deps']);

gulp.task('watch', function() {
  gulp.watch(path.source.js, ['scripts']);
  gulp.watch(path.source.styles, ['styles']);
  gulp.watch([path.source.html, path.source.json], ['static']);
});

gulp.task('default', ['lr-server'], function() {
    
  var watcher = gulp.watch([path.source.html, path.source.json, path.source.js, path.source.styles]);
  watcher.on('change', function(event) {
    //console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    server.notify(event);
  });
});