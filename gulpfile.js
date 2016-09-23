const gulp = require('gulp'),
    connect = require('gulp-connect'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    filter = require('gulp-filter'),
    htmlmin = require('gulp-htmlmin'),
    shell = require('gulp-shell'),
    foreach = require('gulp-foreach'),
    fs      = require('fs');

gulp.task('sendTestMail',shell.task(["node ./boots/email.js &"],{
}));

gulp.task('connect', () => {
    connect.server({
        name:'test',
        root:['reports','public'],
        port:'8179',
        livereload: true
    });
});

gulp.task('disconnect',() => {
    connect.serverClose();
});

gulp.task('watch-reload',() => {
    gulp.watch('./public/**/*',['disconnect','connect']);
});

gulp.task('update',['connect','watch-reload']);

gulp.task('test:user',() => {
    var nums = 0;
    //把mocha配置放入test中
    gulp.src(['./boots/mocha.opts'])
        .pipe(gulp.dest('test/'));

    //合并生成可执行脚本,这个不要压缩，不然报告会更难阅读
    gulp.src('./describe/**/*.js')
        .pipe(foreach((stream, file) => {
            nums++;
            return gulp.src([
                './boots/init.js',
                file.path
            ])
                .pipe(concat('testUnit_'+ nums + '.js'))
                .pipe(gulp.dest('test/user'));
        }));

    //把数据库链接脚本和mocha配置放入test中
    gulp.src(['./tools/db.js'])
        .pipe(gulp.dest('test/wlm/tools'));
});

gulp.task('test:others',() => {
    gulp.src(['others/**/*'])
        .pipe(gulp.dest('test/others'));
});

gulp.task('test',['test:User','test:others']);

gulp.task('compress',() => {
    //压缩报告html，能缩减3%左右的代码
    const options = {
        collapseWhitespace:true,
        collapseBooleanAttributes:true,
        removeComments:true,
        removeEmptyAttributes:true,
        removeScriptTypeAttributes:true,
        removeStyleLinkTypeAttributes:true,
        minifyJS:true,
        minifyCSS:true
    };
    //var jsFilter = filter("**/*.js");
    //var cssFilter = filter("**/*.css");
    let htmlFilter = filter('**/*.html');
    return gulp.src(['reports/**/*'])
        .pipe(htmlFilter)
        .pipe(htmlmin())
        .pipe(gulp.dest('reports'));
});

//将新生成的报告保存.
gulp.task('store',() => {
    let date = new Date();
    let dir = `reports/${date.getFullYear().toString()}${(date.getMonth() < 9 ? `0${(date.getMonth() + 1)}` : '' + (date.getMonth() + 1))}${(date.getDay() < 10 ? `0${date.getMonth()}` : '' + date.getMonth())}/${(date.getHours() < 10 ? `0${date.getHours()}` : '' + date.getHours())}${(date.getMinutes() < 10 ? `0${date.getMinutes()}` : '' + date.getMinutes())}${(date.getSeconds() < 10 ? `0${date.getSeconds()}` : '' + date.getSeconds())}`;
    gulp.src(['public/**/*','./test_log.txt'])
        .pipe(gulp.dest(dir));
});

gulp.task('default',() => {
    console.log('测试报告(html)生成,发送提示邮件');
    gulp.start('sendTestMail');
});
