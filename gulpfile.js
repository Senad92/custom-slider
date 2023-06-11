const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify');

function compileSass() {
  return gulp.src('scss/global.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(cleanCSS())
    .pipe(gulp.dest('dist/css'));
}

function optimizeJS() {
  return gulp.src('js/*.js') 
    .pipe(uglify()) 
    .pipe(gulp.dest('dist/js'));
}

function watch() {
  gulp.watch('scss/**/*.scss', compileSass);
  gulp.watch('js/**/*.js', optimizeJS);
}

exports.default = gulp.series(compileSass, optimizeJS, watch);
