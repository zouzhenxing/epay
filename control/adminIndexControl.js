var adminIndexControl = function(){};

adminIndexControl.prototype.index = function( req,res,next ) {
	//从数据库取数据
	//找到模板 渲染页面输出
	res.render("adminIndex.html",{user:req.session.admin});
}

adminIndexControl.prototype.adminList = function( req,res,next ) {
	var ep = new EventProxy();
	dataSource.getConn(ep);
	adminModule.adminList(ep);
	ep.on("success",function( data ) {
		res.json(data);
//		res.render("admin/adminList.html",{admins:data});
	});
	ep.fail(function( err ) {
		next(err);
	});
}

adminIndexControl.prototype.adminAdd = function( req,res,next ) {
	var ep = new EventProxy();
	dataSource.getConn(ep);
	adminModule.adminAdd(ep,[req.body.aname,req.body.email,req.body.password]);
	ep.on("success",function( data ) {
		if( data.insertId ) {
			res.json(config.info.suc).end();
		} else {
			res.json(config.error.adminAddErr).end();
		}
	});
	ep.fail(function( err ) {
		next(err);
	});
}

adminIndexControl.prototype.adminDel = function( req,res,next ) {
	var ep = new EventProxy();
	dataSource.getConn( ep );
	adminModule.adminDel( ep,[req.params.id] );
	ep.on("success",function( data ) {
		res.json(config.info.suc).end();
	});
	ep.fail(function( err ) {
		next(err);
	});
}

module.exports = function() {
	return new adminIndexControl();
}