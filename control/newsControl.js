var newsControl = function(){}

newsControl.prototype.newsList = function( req,res,next ) {
    var ep = new EventProxy();
    dataSource.getConn(ep);
    adminModule.newsList(ep);
    ep.on("success",function( data ) {
        res.json(data).end();
    });
    ep.fail(function( err ) {
        next(err);
    });
}

newsControl.prototype.newsAdd = function( req,res,next ) {
    var ep = new EventProxy();
    dataSource.getConn(ep);
    adminModule.newsAdd(ep,[req.body.ntitle,req.body.ncontent,req.session.admin.aid]);
    ep.on("success",function( data ) {
        if( data.insertId ) {
            res.json(config.info.suc).end();
        } else {
            res.json(config.error.newsAddErr).end();
        }
    });
    ep.fail(function( err ) {
        next(err);
    });
}

newsControl.prototype.newsDel = function( req,res,next ) {
    var ep = new EventProxy();
    dataSource.getConn(ep);
    adminModule.newsDel(ep,[req.params.nid]);
    ep.on("success",function( data ) {
        res.json(config.info.suc).end();
    });
    ep.fail(function( err ) {
        next(err);
    });
}

newsControl.prototype.preview = function( req,res,next ) {
    var ep = new EventProxy();
    dataSource.getConn(ep);
    adminModule.preview(ep,[req.params.nid]);
    ep.on("success",function( data ) {
        res.json(data).end();
    });
    ep.fail(function( err ) {
        next(err);
    });
}


module.exports = function() {
    return new newsControl();
}