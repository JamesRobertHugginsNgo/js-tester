const del = require('del');
const gulp = require('gulp');
const gulpBabel = require('gulp-babel');
const gulpPreProcess = require('gulp-preprocess');
const gulpSourceMaps = require('gulp-sourcemaps');
const gulpUglify = require('gulp-uglify');

function cleanup() {
	return del('dist');
}

function browserBuild() {
	return gulp.src('src/**/*.js')
		.pipe(gulpPreProcess({ context: { BROWSER: true } }))
		.pipe(gulpSourceMaps.init())
		.pipe(gulpBabel())
		.pipe(gulpUglify())
		.pipe(gulpSourceMaps.write('.'))
		.pipe(gulp.dest('dist/browser'));
}

function nodeBuild() {
	return gulp.src('src/**/*.js')
		.pipe(gulpPreProcess({ context: { NODE: true } }))
		.pipe(gulp.dest('dist/node'));
}

const build = gulp.parallel(browserBuild, nodeBuild);

module.exports = {
	build: gulp.series(cleanup, build)
};
