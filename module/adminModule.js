var adminModule = function(){}

adminModule.prototype.adminList = function( ep ) {
	ep.on("conn",function( conn ) {
		var sql = "select * from admin";
		conn.query(sql,ep.done("success"));
		conn.release();
	});
}

adminModule.prototype.adminAdd = function( ep,data ) {
	ep.on("conn",function( conn ) {
		var sql = "insert into admin values(default,?,?,?,now(),1)";
		conn.query(sql,data,ep.done("success"));
		conn.release();
	});
}

adminModule.prototype.adminDel = function( ep,data ) {
	ep.on("conn",function( conn ) {
		var sql = "delete from admin where aid = ?";
		conn.query(sql,data,ep.done("success"));
		conn.release();
	});
}

/*********producytype m*****************/
adminModule.prototype.typeList = function( ep,data ) {
	ep.on("conn",function( conn ) {
		if( data ) {
			var sql = "select * from producttype where pid = ?";
			conn.query(sql,data,ep.done("success"));
		} else {
			var sql = "select p1.*,p2.typename as pname from producttype p1 left join producttype p2 on p1.pid = p2.tid order by p1.pid";
			conn.query(sql,ep.done("success"));
		}
		conn.release();
	});
}
adminModule.prototype.typeAdd = function( ep,data ) {
	ep.on("conn",function( conn ) {
		var sql = "insert into producttype values(default,?,?,?)";
		conn.query(sql,data,ep.done("success"));
		conn.release();
	});
}
adminModule.prototype.typeDel = function( ep,data ) {
	ep.on("conn",function( conn ) {
		var sql = "delete from producttype where tid = ?";
		conn.query(sql,data,ep.done("success"));
		conn.release();
	});
}

/* product module */
adminModule.prototype.proList = function( ep ) {
	ep.on("conn",function( conn ) {
		var sql = "select p.*,t.typename from product p left join producttype t on p.type = t.tid";
		conn.query(sql,ep.done("success"));
		conn.release();
	});
}

adminModule.prototype.proAdd = function( ep,conn,data ) {
	var sql = "insert into product values(default,?,?,?,?,?)";
	conn.query(sql,data,ep.done("success"));
	conn.release();
}

adminModule.prototype.proDel = function( ep,data ) {
	ep.on("conn",function( conn ) {
		var sql = "delete from product where pid = ?";
		conn.query(sql,data,ep.done("success"));
		conn.release();
	});
}

module.exports = function() {
	return new adminModule();
}
