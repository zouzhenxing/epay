var loginControl = function() {};

loginControl.prototype.login = function( req,res,next ) {
	var ep = new EventProxy();
	//第一步，取数据库连接
	dataSource.getConn( ep );
	//第二步，执行sql命令
	loginModule.login( ep,[req.body.username,req.body.password] );
	//第三步，处理sql执行成功的操作
	ep.on("success",function( rows ) {
		req.session.admin = rows[0];
		
		if( rows.length ) {
			res.json(config.info.loginsuc).end();
		} else {
			res.json(config.error.loginerr).end();
		}
	});
	//第四步，处理异常情况
	ep.fail(function( err ) {
		next( err );//交给500错误处理器进行处理
	});
}

loginControl.prototype.logout = function( req,res,next ) {
	delete req.session.admin;
	res.redirect("/login.html");
}

module.exports = function() {
	return new loginControl();
};