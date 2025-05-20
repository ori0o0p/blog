const gulp = require('gulp');
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const imagemin = require('gulp-imagemin');

// CSS 최소화
function minifyCss() {
  return gulp.src('assets/css/*.css')
    .pipe(cleanCSS())
    .pipe(gulp.dest('dist/css'));
}

// JS 압축
function minifyJs() {
  return gulp.src('assets/js/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'));
}

// 이미지 압축
function optimizeImages() {
  return gulp.src('assets/images/*')
    .pipe(imagemin())
    .pipe(gulp.dest('dist/images'));
}

// 기존 설정에 JSON 최소화 기능 추가
const jsonminify = require('gulp-jsonminify');

function minifyJson() {
  return gulp.src('assets/data/*.json')
    .pipe(jsonminify())
    .pipe(gulp.dest('dist/data'));
}

exports.default = gulp.parallel(minifyCss, minifyJs, optimizeImages, minifyJson);