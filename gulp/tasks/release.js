import gulpMain from 'gulp';
import gulpHelp from 'gulp-help';
import gulpFilter from 'gulp-filter';
import runSequence from 'run-sequence';
import uglify from 'gulp-uglify';

const gulp = gulpHelp(gulpMain);

gulp.task('release:main', false, (cb)=>{
  const files = [
    'build/**/*.*',
    'build/*.*',
    '!build/keystore.config.json'
  ];

  const filter = gulpFilter(['*.js', '**/*.js'], {restore: true});

  return gulp.src(files)
    .pipe(filter)
    .pipe(uglify())
    .pipe(filter.restore)
    .pipe(gulp.dest('dist'));
});

gulp.task('release:build', false, (cb) => {
  return runSequence('release:main', cb);
});
