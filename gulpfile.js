'use strict' // 嚴格模式

const gulp = require('gulp')
const sass = require('gulp-sass')
const sourcemaps = require('gulp-sourcemaps')
const postcss = require('gulp-postcss')
const autoprefixer = require('autoprefixer')
const browserSync = require('browser-sync').create()

const path = { // 路徑
  src: { // 輸入
    sass: 'sass/**/*.scss',
    js: 'js/**/*.js',
    html: '*.html'
    // ajax: './ajax/*.html'
  },
  dest: { // 輸出
    css: 'stylesheets'
  }
}

gulp.task('style', () => {
  // content 樣式編譯
  return gulp.src(path.src.sass)
    .pipe(sourcemaps.init())
    .pipe(sass({ output: 'compact' }).on('error', sass.logError)) // sass編譯
    .pipe(postcss([autoprefixer()])) // prefixer
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(path.dest.css))
    .pipe(browserSync.stream())
})

gulp.task('server', () => {
  // content
  browserSync.init({
    server: './',
    index: 'index.html'
  })
})

gulp.task('watch', () => {
  // content 監控
  gulp.watch(path.src.sass, ['style'])
  gulp.watch(path.src.js).on('change', browserSync.reload)
  gulp.watch(path.src.html).on('change', browserSync.reload)
  // gulp.watch(path.src.ajax).on('change', browserSync.reload)
})

gulp.task('default', ['watch', 'server'])
