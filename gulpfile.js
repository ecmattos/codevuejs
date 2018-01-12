var gulp = require('gulp');

gulp.task('default', function(){
	gulp
		.src('./node_modules/materialize-css/dist/fonts/roboto/**/*')
		.pipe(gulp.dest('./dist/fonts/roboto'));
});