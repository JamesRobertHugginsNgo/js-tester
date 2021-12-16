const del = require('del');
const gulp = require('gulp');
const gulpBabel = require('gulp-babel');
const gulpPreProcess = require('gulp-preprocess');
const gulpSourceMaps = require('gulp-sourcemaps');
const gulpTerser = require('gulp-terser');
const gulpUglify = require('gulp-uglify');

function cleanup() {
	return del('dist');
}

function browserEs5Build() {
	return gulp.src('src/**/*.js')
		.pipe(gulpPreProcess({ context: { BROWSER: true } }))
		.pipe(gulpSourceMaps.init())
		.pipe(gulpBabel())
		.pipe(gulpUglify())
		.pipe(gulpSourceMaps.write('.'))
		.pipe(gulp.dest('dist/browser/es5'));
}

function browserEs6Build() {
	return gulp.src('src/**/*.js')
		.pipe(gulpPreProcess({ context: { BROWSER: true } }))
		.pipe(gulpSourceMaps.init())
		.pipe(gulpTerser())
		.pipe(gulpUglify())
		.pipe(gulpSourceMaps.write('.'))
		.pipe(gulp.dest('dist/browser/es6'));
}

function nodeBuild() {
	return gulp.src('src/**/*.js')
		.pipe(gulpPreProcess({ context: { NODE: true } }))
		.pipe(gulpSourceMaps.init())
		.pipe(gulpTerser())
		.pipe(gulpUglify())
		.pipe(gulpSourceMaps.write('.'))
		.pipe(gulp.dest('dist/node'));
}

const build = gulp.parallel(nodeBuild, browserEs5Build, browserEs6Build);

module.exports = {
	build: gulp.series(cleanup, build)
};
