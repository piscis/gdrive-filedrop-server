import gulpMain from 'gulp';
import gulpHelp from 'gulp-help';
import babel from 'gulp-babel';
import runSequence from 'run-sequence';

const gulp = gulpHelp(gulpMain);

gulp.task('source:server', false, ()=>{

  const files = [
    'src/**/*.js',
    'src/*.js'
  ];

  return gulp.src(files)
    .pipe(babel())
    .pipe(gulp.dest('build'));
});

gulp.task('source:static', false, ()=>{

  const files = [
    './*.config.json'
  ];

  return gulp.src(files)
    .pipe(gulp.dest('build'));
});

gulp.task('source', false, (cb)=>{
  return runSequence(['source:server', 'source:static'], cb);
});
