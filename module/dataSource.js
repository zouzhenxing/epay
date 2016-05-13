var dataSource = function(){
	this.pool  = mysql.createPool({
	  connectionLimit : 10,
	  host            : '127.0.0.1',
	  user            : 'root',
	  password        : '',
	  database        : 'epay',
	  dateStrings     : true
	});
}

dataSource.prototype.getConn = function( ep ) {
	this.pool.getConnection(ep.done("conn"));
}

module.exports = function() {
	return new dataSource();
}
