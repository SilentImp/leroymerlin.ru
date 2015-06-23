var gulp = require('gulp')
    , sourcemaps = require('gulp-sourcemaps')
    , jade = require('gulp-jade')
    , coffee = require('gulp-coffee')
    , stylus = require('gulp-stylus')
    , imagemin = require('gulp-imagemin')
    , plumber = require('gulp-plumber')
    , del = require('del')
    , pngquant = require('imagemin-pngquant')
    , svgo = require('imagemin-svgo')
    , order = require("gulp-order")
    , autoprefixer = require('gulp-autoprefixer')
    , concat = require('gulp-concat')
    , deploy = require('gulp-gh-pages')
    , path = require('path')
    , gulpif = require('gulp-if')
    , rename = require("gulp-rename")
    , serve = require('gulp-serve')
    , dirs = {
      'source': {
        'jade': ['./source/elements/**/*.jade','./source/pages/*.jade','./source/partials/*.jade']
        , 'page': './source/pages/*.jade'
        , 'copy': './source/copy/**/*'
        , 'coffee': './source/**/*.coffee'
        , 'js': './source/js/**/*.js'
        , 'stylus': './source/**/*.styl'
        , 'css': './source/css/*.css'
        , 'svg': './source/svg/**/*.svg'
        , 'images': './source/images/**/*'
      }
      , 'build': {
        'html': './build/'
        , 'js': './build/js/'
        , 'css': './build/css/'
        , 'images': './build/images/'
        , 'svg': './build/svg/'
      }
    };

gulp.task('copy', function () {
  gulp.src(dirs.source.copy).pipe(gulp.dest(dirs.build.html));
});

gulp.task('images', function () {
  return gulp.src(dirs.source.images)
    .pipe(plumber())
    .pipe(gulpif(/[.](png|jpeg|jpg|svg)$/, imagemin({
        progressive: true,
        svgoPlugins: [{removeViewBox: false}],
        use: [pngquant()]
      })
    ))
    .pipe(gulp.dest(dirs.build.images));
});

gulp.task('svg', function () {
  return gulp.src(dirs.source.svg)
    .pipe(plumber())
    .pipe(imagemin({
        progressive: true,
        svgoPlugins: [{removeViewBox: false}],
        use: [pngquant()]
      }))
    .pipe(gulp.dest(dirs.build.svg));
});

gulp.task('html', function() {
  return gulp.src(dirs.source.page)
    .pipe(plumber())
    .pipe(jade({pretty: true}))
    .pipe(rename(function (path) {
      if (path.basename != 'index') {
          path.dirname += "/" + path.basename;
          path.basename = "index";
      }
    }))
    .pipe(gulp.dest(dirs.build.html));
});

gulp.task('js', function() {
  return gulp.src([dirs.source.coffee, dirs.source.js])
    .pipe(plumber())
    .pipe(gulpif(/[.]coffee$/, coffee({bare: true})))
    .pipe(order(["velocity.min.js"]))
    .pipe(concat("scripts.js"))
    .pipe(gulp.dest(dirs.build.js));
});

gulp.task('css', function() {
  return gulp.src([dirs.source.stylus, dirs.source.css])
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(stylus())
    .pipe(order(['reset.css']))
    .pipe(concat("styles.css"))
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(dirs.build.css));
});

gulp.task('deploy', function () {
  console.log('deploying');
  return gulp.src('build/**')
    .pipe(plumber())
    .pipe(deploy({
      cacheDir:   'gh-cache',
      remoteUrl:  'git@github.com:SilentImp/leroymerlin.ru.git'
    }).on('error', function(){
      console.log('error', arguments);
    }));
});


gulp.task('watch', function () {
  gulp.watch([dirs.source.stylus, dirs.source.css], ['css']);
  gulp.watch(dirs.source.jade, ['html']);
  gulp.watch(dirs.source.coffee, ['js']);
});

gulp.task('default', ['copy', 'html', 'css', 'js', 'images', 'svg']);


gulp.task('serve', serve('build'));

gulp.task('sw', ['watch', 'serve']);
