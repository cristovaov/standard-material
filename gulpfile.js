var gulp = require("gulp");
var autoprefixer = require("autoprefixer");
var cleancss = require("gulp-clean-css");
var log = require("fancy-log");
var postcss = require("gulp-postcss");
var rename = require("gulp-rename");
var sass = require("gulp-sass");
var sourcemaps = require("gulp-sourcemaps");

gulp.task("sass", function() {
  var materialize = ["./node_modules/materialize-css/sass"];
  log("Using './assets/sass/main.scss'");
  return gulp
    .src("./assets/sass/main.scss")
    .pipe(sourcemaps.init())
    .pipe(sass({ includePaths: materialize })
      .on("end", () => {
        log("Autoprefixing css...");
        log("Minifying css...");
      })
      .on("error", sass.logError))
    .pipe(postcss([autoprefixer()]))
    .pipe(cleancss({ level: { 1: { specialComments: 0 } }, debug: true },
      details => {
        log(` before: ${details.stats.originalSize}`);
        log(` after: ${details.stats.minifiedSize}`);
      })
      .on("end", () => {
        log("Writing sourcemaps...");
      }))
    .pipe(sourcemaps.write())
    .pipe(rename({ extname: ".min.css" })
      .on("end", () => {
        log("Writing './static/css/main.min.css'...");
      }))
    .pipe(gulp.dest("./static/css"));
});

gulp.task("js", function(){
  return gulp
  .src("./assets/js/**/*")
  .pipe(gulp.dest("./static/js"));
});

gulp.task("default", function() {
  log("Gulpfile for the Standard Material theme.")
});