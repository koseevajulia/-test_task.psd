const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const browserSync = require('browser-sync').create();
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify');

// Sass Task
function style() {
  return gulp
    .src('./src/scss/main.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('./dist/css'))
    .pipe(browserSync.stream());
}

// JavaScript Task
function script() {
  return gulp
    .src('./src/js/main.js')
    .pipe(uglify())
    .pipe(gulp.dest('./dist/js'));
}

// HTML Task
function html() {
  return gulp.src('./src/index.html').pipe(gulp.dest('./dist'));
}

// Images Task
function images() {
  return gulp
    .src('./src/assets/images/*')
    .pipe(gulp.dest('./dist/assets/images'));
}

// Fonts Task
function fonts() {
  return gulp
    .src('./src/assets/fonts/*')
    .pipe(gulp.dest('./dist/assets/fonts'));
}

// BrowserSync Task
function browserSyncTask() {
  browserSync.init({
    server: {
      baseDir: './dist',
    },
  });
}

// Watch Task
function watch() {
  gulp.watch('./src/scss/**/*.scss', style);
  gulp.watch('./src/js/**/*.js', script);
  gulp.watch('./src/**/*.html', html);
  gulp.watch('./src/assets/images/*', images);
  gulp.watch('./src/assets/fonts/*', fonts);
}

// Build Task
const build = gulp.series(
  html,
  style,
  script,
  images,
  fonts
);

// Default Task
exports.default = gulp.series(build, watch, browserSyncTask);
