var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
 var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var authRouter=require('./routes/auth.routes');
//var tutorialsRouter=require('./routes/tutorial.routers');
var app = express();
// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//app.use('/tutorial',tutorialsRouter);

// simple route
// app.get("/", (req, res) => {
//   res.json({
//     message: "Welcome to Asset Manager System  EPU of ITC."
//   });
// });

///routerServerSide
var routerServerSide=require('./routes/routesServerSide/index');
routerServerSide(app);
app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views", "./views");
///
//hiển thị giao diện home
app.get("/", function(req, res){
res.render("homeAdmin.ejs")
})

//hiển thị giao diện video
//từ trang home ấn vào
// app.get('/videoAdmin', (req, res) => {
//   res.render('videoAdmin');
// });

// routes
// app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/auth',authRouter);
var blogsRouter=require('./routes/blogs.routers');
app.use('/blogs',blogsRouter);
var videoRouter=require('./routes/video.routers');
app.use('/video',videoRouter);
var catalogRouter=require('./routes/catalog.routers');
app.use('/catalog',catalogRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});
// set port, listen for requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

module.exports=app;

