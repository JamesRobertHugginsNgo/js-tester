const del = require('del');
const gulp = require('gulp');
const gulpBabel = require('gulp-babel');
const gulpPreProcess = require('gulp-preprocess');
const gulpRename = require('gulp-rename');
const gulpSourceMaps = require('gulp-sourcemaps');
const gulpTerser = require('gulp-terser');
const gulpUglify = require('gulp-uglify');

function cleanup() {
	return del('./dist/');
}

function build_node() {
	return gulp.src('./src/**/*.js', { since: gulp.lastRun(build_node) })
		.pipe(gulpPreProcess({ context: { TARGET: 'NODEJS' } }))
		.pipe(gulp.dest('./dist/node/'));
}

function build_browser_es5_dependency() {
	return Promise.resolve();
}
function build_browser_es5_main() {
	return gulp.src('./src/**/*.js', { since: gulp.lastRun(build_browser_es5_main) })
		.pipe(gulpPreProcess({ context: { TARGET: 'BROWSER_ES5' } }))
		.pipe(gulpBabel())
		.pipe(gulp.dest('./dist/es5/'))
		.pipe(gulpRename((path) => path.basename += '.min'))
		.pipe(gulpSourceMaps.init())
		.pipe(gulpUglify())
		.pipe(gulpSourceMaps.write('.'))
		.pipe(gulp.dest('./dist/es5/'));
}
const build_browser_es5 = gulp.parallel(build_browser_es5_dependency, build_browser_es5_main);

function build_browser_es6_dependency() {
	return Promise.resolve();
}
function build_browser_es6_main() {
	return gulp.src('./src/**/*.js', { since: gulp.lastRun(build_browser_es6_main) })
		.pipe(gulpPreProcess({ context: { TARGET: 'BROWSER_ES6' } }))
		.pipe(gulp.dest('./dist/es6/'))
		.pipe(gulpRename((path) => path.basename += '.min'))
		.pipe(gulpSourceMaps.init())
		.pipe(gulpTerser())
		.pipe(gulpSourceMaps.write('.'))
		.pipe(gulp.dest('./dist/es6/'));
}
const build_browser_es6 = gulp.parallel(build_browser_es6_dependency, build_browser_es6_main);

function build_browser_es6Module_dependency() {
	return Promise.resolve();
}
function build_browser_es6Module_main() {
	return gulp.src('./src/**/*.js', { since: gulp.lastRun(build_browser_es6Module_main) })
		.pipe(gulpPreProcess({ context: { TARGET: 'BROWSER_ES6MODULE' } }))
		.pipe(gulp.dest('./dist/es6-module/'))
		.pipe(gulpRename((path) => path.basename += '.min'))
		.pipe(gulpSourceMaps.init())
		.pipe(gulpTerser())
		.pipe(gulpSourceMaps.write('.'))
		.pipe(gulp.dest('./dist/es6-module/'));
}
const build_browser_es6Module = gulp.parallel(build_browser_es6Module_dependency, build_browser_es6Module_main);

const build_browser = gulp.parallel(build_browser_es5, build_browser_es6, build_browser_es6Module);

const build = gulp.parallel(build_node, build_browser);

function watch() {
	gulp.watch('./src/**/*.js', build);
}

module.exports = {
	build: gulp.series(cleanup, build),
	watch: gulp.series(cleanup, build, watch)
};
