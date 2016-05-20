exports.loadConfig = function( path ) {
	path = path || rootpath + "/config/message.json";
	
	var data = fs.readFileSync(path);
	return JSON.parse(data);
}

exports.checkLogin = function( req,res,next ) {
	if( req.session.admin ) {
		next();
	} else {
		res.redirect("/login.html");
	}
}

exports.favicon = function( req,res,next ) {
	res.redirect("/favicon.ico");
}

/*跨域中间件*/
exports.crossDomain = function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    next();
}

exports.upfile = function( ep,file ) {
	var start = file.originalname.lastIndexOf(".");
	var extname = file.originalname.slice(start);
	var filename = new Date().getTime() + extname;
	
	var reandPath = rootpath + "/" + file.path;
	var writePath = rootpath + "/public/upfile/" + filename;
	
	var rs = fs.createReadStream( reandPath );
	var ws = fs.createWriteStream( writePath );
	rs.pipe(ws);
	ws.on('finish',ep.done('fileup',function(){
		fs.unlink(reandPath,function( err ) {
			if( err ) {
				log.debug(err.stack);
			}
		});
		return filename;
	}));
}
