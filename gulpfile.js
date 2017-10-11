process.env.DEBUG = "app:*";
const debug = require('debug');
var gulp = require('gulp'),
	shell = require('shelljs'),
	log = debug('app:GULP')
watch = require('gulp-watch');
var rename = require("gulp-rename");
concat = require('gulp-concat');
var sass = require('gulp-sass');

let io;



gulp.task('sass', function() {
	let log = debug('app:GULP:SASS');
	watch(['./src/**/*.scss', './examples/**/*.scss'], {
		ignoreInitial: false
	}, function() {
		log('SASS...');
		(new Promise(function(resolve, reject) {
			gulp.src(['./src/**/*.scss', './examples/**/*.scss'])
				.on('error', reject)
				.pipe(sass().on('error', sass.logError))
				//.pipe(rename("bundle.css"))
				.pipe(concat('bundle.css'))
				.pipe(gulp.dest('./dist'))
				.on('end', resolve);
		})).then(() => {
			log('SASS... OK');
			io && io.emit('reload');
		});
	});
});

gulp.task('reload', function(next) {
	let log = debug('app:GULP:sockets');
	io = require('socket.io')(8081, {
		path: '/',
		serveClient: false,
		// below are engine.IO options
		pingInterval: 10000,
		pingTimeout: 5000,
		cookie: false
	});
	log('Server start');
	io.on('connection', function(socket) {
		socket.on('disconnect', function() {});
	});
});

gulp.task('watch', function(next) {
	let log = debug('app:GULP:JSX');
	let active = false;
	watch(["./**/*.js", "!node_modules","!./**/*bundle*.js"], {
		ignoreInitial: false
	}, function() {
		if (active) return;
		active = true;
		log('COMPILING');
		shell.exec("npm run build", {
			silent: true
		}, (code, stdout, stderr) => {
			if (code == 0) {
				log('OK');

				io && io.emit('reload');

			} else {
				log('FAIL', stdout, stderr);
			}
			setTimeout(() => active = false, 1500);
		});
	});

	(() => {
		let active = false;
		watch(["./**/*.html", "!node_modules"], {
			ignoreInitial: false
		}, function() {
			if (active) return;
			active = true;
			io && io.emit('reload');
			setTimeout(() => active = false, 1000);
		});
	})();

	next();
});

gulp.task('default', ['watch', 'reload', "sass"]);