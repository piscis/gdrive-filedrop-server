import gulpMain from 'gulp';
import gulpHelp from 'gulp-help';
import runSequence from 'run-sequence';

const gulp = gulpHelp(gulpMain);

gulp.task('develop', 'Start gulp with `gulp dev` to start developing', (cb)=>{
  process.env.NODE_ENV = 'development';
  return runSequence('clean:build', 'source', 'watch', cb);
});

gulp.task('release', 'Start gulp with `gulp release` to create a release build', (cb)=>{
  process.env.NODE_ENV = 'production';
  return runSequence(['clean:build', 'clean:dist'], 'source', 'release:build', cb);
});
