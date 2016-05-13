var loginModule = function(){}

loginModule.prototype.login = function( ep,data ) {
	ep.on("conn",function( conn ){
		var sql = "select * from admin where email = ? and password = ?";
		conn.query(sql,data,ep.done("success"));
		conn.release();
	});
}

module.exports = function() {
	return new loginModule();
}
