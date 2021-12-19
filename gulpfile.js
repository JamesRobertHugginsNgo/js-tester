const del = require('del');
const gulp = require('gulp');
const gulpBabel = require('gulp-babel');
const gulpPreProcess = require('gulp-preprocess');
const gulpRename = require('gulp-rename');
const gulpSourceMaps = require('gulp-sourcemaps');
const gulpTerser = require('gulp-terser');
const gulpUglify = require('gulp-uglify');

function cleanup() {
	return del('dist');
}

function nodeBuild() {
	return gulp.src('src/**/*.js')
		.pipe(gulpPreProcess({ context: { TARGET: 'NODEJS', ES: 6, MODULE: 'COMMONJS' } }))
		.pipe(gulp.dest('dist/node'));
}

function browserEs5Build() {
	return gulp.src('src/**/*.js')
		.pipe(gulpPreProcess({ context: { TARGET: 'BROWSER', ES: 5, MODULE: null } }))
		.pipe(gulpBabel())
		.pipe(gulp.dest('dist/es5'))
		.pipe(gulpRename((path) => path.basename += '.min'))
		.pipe(gulpSourceMaps.init())
		.pipe(gulpUglify())
		.pipe(gulpSourceMaps.write('.'))
		.pipe(gulp.dest('dist/es5'));
}

function browserEs6Build() {
	return gulp.src('src/**/*.js')
		.pipe(gulpPreProcess({ context: { TARGET: 'BROWSER', ES: 6, MODULE: null } }))
		.pipe(gulp.dest('dist/es6'))
		.pipe(gulpRename((path) => path.basename += '.min'))
		.pipe(gulpSourceMaps.init())
		.pipe(gulpTerser())
		.pipe(gulpSourceMaps.write('.'))
		.pipe(gulp.dest('dist/es6'));
}

function browserEs6ModuleBuild() {
	return gulp.src('src/**/*.js')
		.pipe(gulpPreProcess({ context: { TARGET: 'BROWSER', ES: 6, MODULE: 'ES6' } }))
		.pipe(gulp.dest('dist/es6-module'))
		.pipe(gulpRename((path) => path.basename += '.min'))
		.pipe(gulpSourceMaps.init())
		.pipe(gulpTerser())
		.pipe(gulpSourceMaps.write('.'))
		.pipe(gulp.dest('dist/es6-module'));
}

const build = gulp.parallel(nodeBuild, browserEs5Build, browserEs6Build, browserEs6ModuleBuild);

function watch() {
	gulp.watch('src/**/*.js', build);
}

module.exports = {
	build: gulp.series(cleanup, build),
	watch: gulp.series(cleanup, build, watch)
};
