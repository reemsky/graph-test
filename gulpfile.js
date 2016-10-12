var gulp = require('gulp');
var gls = require('gulp-live-server');
var mainBowerFiles = require('gulp-main-bower-files');

var server = gls.static('app', 8888);

gulp.task('lr-server', function(){
  server.start();
});

gulp.task('styles', function() {
  gulp.src(['app/css/**/*.css'])
    .pipe(gulp.dest('app/css/'))
    .pipe(server.notify())
})


gulp.task('bower-deps', function(){
  gulp.src('./bower.json')
    .pipe(mainBowerFiles())
    .pipe(gulp.dest('app/js'))
    .pipe(server.notify())
});

gulp.task('scripts', function(){
  gulp.src(['app/src/**/*.js'])
    .pipe(gulp.dest('app/js'))
});

gulp.task('default', ['lr-server', 'scripts', 'bower-deps', 'styles'], function() {
    
    gulp.watch(['app/css/**/*.css', 'app/src/**/*.js', 'app/*.html'], function(file) {
        console.log("file changes");
        server.notify.apply(server, [file]);
    });
});