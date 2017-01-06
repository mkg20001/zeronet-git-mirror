const gulp = require('gulp');
const $ = require('gulp-load-plugins')();
const del = require('del');
const runSequence = require('run-sequence');
const merge = require('merge-stream');
const path = require('path');
const fs = require("fs");

const dist="dist"

gulp.task("clean", function() {
  return del(dist)
})

gulp.task("dev", ["clean"], function() {
  return gulp.src("app/index.html")
    .pipe($.useref())
    .pipe(gulp.dest(dist))
})

gulp.task("default", ["clean"], function() {
  return gulp.src("app/index.html")
    .pipe($.useref())
    //.pipe($.if('*.js', $.uglify())) - how about es6 support?
    .pipe($.if('*.css', $.minifyCss()))
    .pipe(gulp.dest(dist))
})
