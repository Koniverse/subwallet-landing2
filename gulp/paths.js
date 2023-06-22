'use strict';
var glob      = require( 'glob' ),
    files     = glob( 'docs/*', { sync: true } ),
    mainTheme = files[ 0 ].replace( 'docs/', '' );

module.exports = {
	mainTheme: mainTheme,
	taskDone: [
		'docs/*.php',
		'gulp/**/*.js'
	],
	root: {
		main: 'docs/'
	},
	javascript: {
		src: 'docs/assets/js-code/**/*.js',
		dist: 'docs/assets/js/'
	},
	sass: {
		watch: [
			'docs/assets/scss/**/*.scss'
		],
		generate: [
			'docs/assets/scss/*.scss'
		],
		dist: 'docs/assets/css/'
	},
	bs: {
		main: [
			'docs/*.html',
			'docs/assets/css/*.css',
			'docs/assets/js/*.js',
			'docs/assets/libs/**/**/*.js'
		],
	},
	linting: {
		js: 'docs/assets/js-code/',
		scss: 'docs/assets/scss/**/*.scss',
	}
};
