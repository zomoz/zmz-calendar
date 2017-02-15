'use strict';

const gulp = require('gulp');
const watch = require('gulp-watch');
const shell = require('gulp-shell');
const inlineNg2Template = require('gulp-inline-ng2-template');
const sass = require('gulp-sass');

const files = {
  // source files
  src: 'src',

  // Output
  lib: 'lib',

  // Inlined source files
  inlined: 'src/inlined',

  // Typescript, scss and html in source
  ts: ['./src/**/*.ts', '!./src/inlined/**/*.ts', '!./src/**/*.spec.ts'],
  sass: './src/**/*.scss',
  html: './src/**/*.html',

  // Global styles and assets
  assets: './src/assets/**/*.*',
  styles: './src/styles.css'
};

gulp.task('clean', shell.task(`rm -rf lib`));

// Library assets and styles to be used by consumer
gulp.task('assets', () => gulp.src(files.assets).pipe(gulp.dest(`${files.lib}/assets`)));
gulp.task('styles', () => gulp.src(files.styles).pipe(gulp.dest(files.lib)));

// Sass compilation
gulp.task('sass', () => 
  gulp.src(files.sass)
  .pipe(sass().on('error', sass.logError))
  .pipe(gulp.dest(files.src))
);

// Inline templates in components
gulp.task('inline-templates', ['sass'], () => {
  return gulp.src(files.ts)
  .pipe(inlineNg2Template({
    base: files.src,
    useRelativePaths: true
  }))
  .pipe(gulp.dest(files.inlined));
});

gulp.task('build', ['inline-templates', 'assets', 'styles'], shell.task(`ngc -p src/tsconfig-aot.json`));
gulp.task('watch', ['build'], () => gulp.watch(files.ts.concat([files.html, files.sass]), ['build']));