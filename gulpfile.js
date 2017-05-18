var gulp = require('gulp'),
    connect = require('gulp-connect'),
    proxy = require('http-proxy-middleware');

// gulp.task('webserver', function() {
//     connect.server({
//         livereload: true,
//         port: 2333
//     });
// });
gulp.task("serverName", function () {
    connect.server({
        root: "src",
        port: 8000,
        // host:"172.16.20.5",
        livereload: true,
        middleware: function (connect, opt) {
          // opt.route="/src"
          return [
             proxy('/v2',  {
                 target: 'https://api.douban.com',
                 changeOrigin:true
             }),
             proxy('/otherServer', {
                 target: 'http://IP:Port',
                 changeOrigin:true
             })
         ]
        }
    });
});

gulp.task('default', ["serverName"]);

// var Proxy = require('gulp-connect-proxy');
// var connect = require('gulp-connect');
//
// gulp.task("serverName", function () {
//     connect.server({
//         root: "api",
//         port: 8000,
//         livereload: true,
//         middleware: function (connect, opt) {
//             opt.route = '/proxy';
//             var proxy = new Proxy(opt);
//             return [proxy];
//         }
//     });
// });
