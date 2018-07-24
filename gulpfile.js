var path = require("path");
var gulp = require("gulp");
var mocha = require("gulp-mocha");
var mochaPhantomjs = require("gulp-mocha-phantomjs");
var browserify = require("gulp-browserify");
var uglify = require("gulp-uglify");
var rename = require("gulp-rename");
var header = require("gulp-header");

var rollup = require("rollup");
var commonjs = require("rollup-plugin-commonjs");
var resolve = require("rollup-plugin-node-resolve");


// var istanbul = require("gulp-istanbul");
var package = require("./package.json");
var banner =
	'/*!\n' +
	' * ' + package.name + ' v' + package.version + '\n' +
	' * Homepage ' + package.homepage + '\n' +
	' * License ' + package.license + '\n' +
	' */\n'
var outputDir = 'dist/'

gulp.task('build', ['test-server','rollup','min'], function () {
	
	// return gulp.src('./browser-source/*.js')
	// 	.pipe(browserify())
	// 	.pipe(header(banner))
	// 	.pipe(gulp.dest('./dist'))
	// 	.pipe(uglify())
	// 	.pipe(header(banner))
	// 	.pipe(rename({
	// 		suffix:".min"
	// 	}))
	// 	.pipe(gulp.dest('./dist'));

	// return rollup.rollup({
	// 	input: './nzh.js',
	// 	plugins: [
	// 		resolve(),
	// 		commonjs()
	// 	]
	// }).then(function (bundle) {
	// 	return bundle.write({
	// 		file: './dist1/nzh.js',
	// 		format: 'umd',
	// 		name: 'Nzh',
	// 		banner: banner,
	// 		sourcemap: false
	// 	})
	// })
})

function runRollup(input, output) {
	var inputopt = {
		// input: './nzh.js',
		plugins: [
			resolve(),
			commonjs()
		]
	}
	var outputopt = {
		// file: './dist/nzh.js',
		format: 'umd',
		name: 'Nzh',
		banner: banner,
		sourcemap: false
	}
	return rollup.rollup(Object.assign({},inputopt,{
		input: input
	})).then(function (bundle) {
		return bundle.write(Object.assign({},outputopt,{
			file: output,
		}))
	})
}

gulp.task('rollup', function () {
	return Promise.all([
		runRollup('./nzh.js',outputDir + 'nzh.js'),
		runRollup('./cn.js',outputDir + 'nzh.cn.js'),
		runRollup('./hk.js',outputDir + 'nzh.hk.js'),
	])
})

gulp.task('min',['rollup'],function () {
	return gulp.src(outputDir+'*.js')
	.pipe(uglify())
	.pipe(header(banner))
	.pipe(rename({
		suffix:".min"
	}))
	.pipe(gulp.dest(outputDir));
})


// gulp.task('pre-test', function () {
//   return gulp.src(['src/**/*.js'])
//     // Covering files 
//     .pipe(istanbul())
//     // Force `require` to return covered files 
//     .pipe(istanbul.hookRequire());
// });

// gulp.task('test', ['pre-test'], function () {
//   return gulp.src('test/mocha_*.js', {read: false})
//     .pipe(mocha({reporter: 'dot'}))
//     // Creating the reports after tests ran 
//     .pipe(istanbul.writeReports())
//     // Enforce a coverage of at least 90% 
//     .pipe(istanbul.enforceThresholds({ thresholds: { global: 90 } }));
// });

gulp.task('test', ['test-server', 'test-browser'])

gulp.task('test-server', function () {
	return gulp.src('test/test_mocha.js', { read: false })
		.pipe(mocha({ reporter: 'dot' }))
});

gulp.task('output-testjs-browser', ['test-server'], function () {
	return gulp.src('test/test_mocha.js')
		.pipe(browserify({ insertGlobals: true }))
		.pipe(rename({
			basename: "tests"
		}))
		.pipe(gulp.dest('test/browser'));
})

gulp.task('test-browser', ['output-testjs-browser', 'build'], function () {
	return gulp.src('test/browser/test.html')
		.pipe(mochaPhantomjs({ reporter: 'dot' }))
})

gulp.task('test-docs', ['build'], function () {

})

gulp.task('default', ['build', 'test']);