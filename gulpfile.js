// const cssnano = require('gulp-cssnano');
// const changed = require('gulp-changed');
// const browserSync = require('browser-sync');
// const clean = require('gulp-clean');
// const sass = require('sass');
// const autoprefixer = require('gulp-autoprefixer');
// const { src, watch, parallel, series, dest } = require('gulp');

// let gulp = require('gulp'),
//     sass = require('sass'),
//     browserSync = require('browser-sync'),
//     rename = require('gulp-rename'),
//     concat = require('gulp-concat'),
//     autoprefixer = require('gulp-autoprefixer');

// import express from 'express';
// const public = express(function(){});
import gulp from 'gulp';
// import sass from 'sass';
import browserSync from 'browser-sync';
import concat from 'gulp-concat';
import rename from 'gulp-rename';
import {deleteAsync} from 'del';
import autoprefixer from 'gulp-autoprefixer';
import dartSass from 'sass';
import gulpSass from 'gulp-sass';
const sass = gulpSass(dartSass);
    // let gulp = require('gulp'),
    //     sass = require('sass'),
    //     browserSync = require('browser-sync'),
    //     concat = require('gulp-concat'),
    //     rename = require('gulp-rename'),
    //     del = require('del'),
    //     autoprefixer = require('gulp-autoprefixer');

    gulp.task('clean', async function(){
      deleteAsync.sync('dist')
    })
    
    
    gulp.task('scss', async function(){
      return gulp.src('public/scss/**/*.scss')
        .pipe(sass({outputStyle: 'compressed'}))
        .pipe(autoprefixer({
          browsers: ['last 8 versions']
        }))
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('public/css'))
        .pipe(browserSync.reload({stream: true}))
    });
    
    gulp.task('css',async  function(){
      return gulp.src([
        'node_modules/normalize.css/normalize.css'
      ])
        .pipe(concat('_libs.scss'))
        .pipe(gulp.dest('public/scss'))
        .pipe(browserSync.reload({stream: true}))
    });
    
    gulp.task('html' , async  function(){
      return gulp.src('public/*.html')
      .pipe(browserSync.reload({stream: true}))
    });
    
    gulp.task('script', async  function(){
      return gulp.src('public/js/*.js')
      .pipe(browserSync.reload({stream: true}))
    });
    
    gulp.task('js', async  function(){
      return gulp.src('public/js/*.js')
        .pipe(concat('libs.min.js'))
        .pipe(gulp.dest('public/js'))
        .pipe(browserSync.reload({stream: true}))
    });
    
    gulp.task('browser-sync',async  function() {
      browserSync.init({
          server: {
              baseDir: "public/"
          }
      });
    });
    
    gulp.task('export',async  function(){
      let buildHtml = gulp.src('public/**/*.html')
        .pipe(gulp.dest('dist'));
    
      let BuildCss = gulp.src('public/css/**/*.css')
        .pipe(gulp.dest('dist/css'));
    
      let BuildJs = gulp.src('public/js/**/*.js')
        .pipe(gulp.dest('dist/js'));
    });
    
    gulp.task('watch',async  function(){
      gulp.watch('public/scss/**/*.scss', gulp.parallel('scss'));
      gulp.watch('public/*.html', gulp.parallel('html'))
      gulp.watch('public/js/*.js', gulp.parallel('script'))
    });
    
    gulp.task('build', gulp.series( 'clean', 'export'))
    
    gulp.task('default', gulp.parallel('css' ,'scss', 'js', 'browser-sync', 'watch'));


// gulp.task('clean', async function(){
//     return src('./build/*',{
//                 read: false
//             })
//             .pipe(clean());
// })
// gulp.task('css',async  function(){
//     return gulp.src([
//       'node_modules/normalize.css/normalize.css'
//     ])
//       .pipe(concat('_libs.scss'))
//       .pipe(gulp.dest('public/scss'))
//       .pipe(browserSync.reload({stream: true}))
// });
// gulp.task('scss', async function(){
//     return gulp.src('public/**/*.css')

//       .pipe(autoprefixer({
//         browsers: ['last 8 versions']
//       }))

//       .pipe(rename({suffix: '.min'}))
//       .pipe(gulp.dest('public/css'))
//       .pipe(browserSync.reload({stream: true}))
// });

// gulp.task('html' , async  function(){
//     return gulp.src('./public/*.html')
//     .pipe(browserSync.reload({stream: true}))
// });
// gulp.task('js', async  function(){
//     return gulp.src('./public/js/*.js')
//     .pipe(browserSync.reload({stream: true}))
//     .pipe(dest('./build/'))
//     // .pipe(concat('libs.min.js'))
// });
// gulp.task('browser-sync',async  function() {
//     browserSync.init({
//         server: {
//             baseDir: 'public/'
//         },
//     });
// });


// gulp.task('export',async  function(){
//     let buildHtml = gulp.src('./public/*.html')
//       .pipe(gulp.dest('build/html'));
  
//     let BuildCss = gulp.src('./public/css/*.css')
//       .pipe(gulp.dest('build/css'));
  
//     let BuildJs = gulp.src('./public/js/*.js')
//       .pipe(gulp.dest('build/js'));
// });
  
// gulp.task('watch',async  function(){
//     gulp.watch('./public/scss/*.scss', gulp.parallel('scss'));
//     gulp.watch('./public/*.html', gulp.parallel('html'))
//     gulp.watch('./public/js/*.js', gulp.parallel('js'))
// });
  
// gulp.task('build', gulp.series('clean', 'export'))
  
// gulp.task('default', gulp.parallel('css' ,'scss', 'js', 'browser-sync', 'watch', 'html'));





// function clear(){
//     return src('./build/*',{
//         read: false
//     })
//     .pipe(clean());
// }

//css
// function css() {
//     const source = './public/css/style.css';

//     return src(source)
//         .pipe(changed(source))
//         .pipe(cssnano())
//         .pipe(dest('./build/css'))
//         .pipe(browsersync.stream());
// }

// scss 
// function scss() {
//     return src('./public/scss/style.scss')
//         .pipe(scss({outputStyle: 'compressed'}))
//         .pipe(autoprefixer({
//         browsers: ['last 8 versions']
//         }))
//         .pipe(dest('./build/css'))
//         .pipe(browsersync.stream());
// }


//html
// function html() {
//     return src('./public/*.html')
//         .pipe(dest('./build/'))
//         .pipe(browsersync.stream());
// }

//js
// function js() {
//     return gulp.src('./public/js/*.js')
//     .pipe(dest('./build/'))
//     .pipe(browsersync.stream());
// }

//watch files
// function watchFiles(){
//     watch('./public/css/*', css);
//     watch('./public/*.html', html);
// }

//browserSync
// function browserSync(){
//     browsersync.init({
//         server: {
//             baseDir: './build'
//         },
//         port: 3000
//     })
// }

// exports.watch = parallel(watchFiles, browserSync);
// exports.default = series(clear, parallel(html, css, scss, js));