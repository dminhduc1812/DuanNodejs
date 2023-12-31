var videoServerSideRouter=require('./video.routes');
var blogServerSideRouter=require('./blog.routes');
var catalogServerSideRouter=require('./catalog.routes');
var UserServerSideRouter=require('./user.routes');
var authServerSideRouter=require('./auth.routers');
var homefaceServerSideRouter=require('./homeface.routers');

var siteRouter=require('./site.routes');

function routerServerSide(app){
    //router site:
    app.use('/',siteRouter);
    // routes serverSide
    app.use('/',videoServerSideRouter);
    app.use('/',blogServerSideRouter);
    app.use('/',catalogServerSideRouter);
    app.use('/',UserServerSideRouter);
    app.use('/',authServerSideRouter);
    app.use('/',homefaceServerSideRouter);

}



module.exports = routerServerSide;