import gulpMain from 'gulp';
import gulpHelp from 'gulp-help';
import runSequence from 'run-sequence';
import server from 'gulp-express';

const gulp = gulpHelp(gulpMain);

gulp.task('watch', false, (cb)=>{
  runSequence(['watch:manual'], cb);
});

gulp.task('watch:manual', false, (cb)=>{

  server.run(['build/server.js']);

  gulp.watch(['src/*.js', 'src/**/*.js'], ['source', server.run]);

  cb();
});
