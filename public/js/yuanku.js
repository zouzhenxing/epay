-function(){
	$.validate = {};
	
	$.validate.isEmpty = function( str ) {
		var reg = /^\S+$/;
		return reg.test(str);
	}
	
	$.validate.isEmail = function( str ) {
		var reg = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
		return reg.test(str);
	}
	
	//option type,title,message,timeout
	//type warning,danger,info,success
	$.fn.alterMes = function( option ) {
		//判断type输入的合法性
		var typeobj = {warning:"警告!",danger:"错误!",info:"提示",success:"成功!"};
		if( !option.type || !typeobj[option.type] ) {
			option.type = "info";
		}
		
		$(this).addClass("alert-" + option.type);
		$(this).find(".title").html(typeobj[option.type]);
		
		$(this).show("fast");
		$(this).find(".message").html(option.message);
		
		//重新绑订关闭事件
		var that = $(this);
		$(this).find(".close").click(function(){
			that.removeClass("alert-" + option.type);
			that.hide("fast");
		});
		
		option.timeout = option.timeout || 2000;
		//自动消失
		setTimeout(function(){
			that.removeClass("alert-" + option.type);
			that.hide("fast");
		},option.timeout);
	}
	
	$._ajax = function( option ) {
		option.dataType = option.dataType || "json";
		option.type = option.type || "post";
		
		option.statusCode = {
			404 : function() {
				window.location.href = "/404.html";
			},
			500 : function() {
				window.location.href = "/500.html";
			}
		}
		
		$.lodingStart();
		return $.ajax(option).always(function(){
			$.lodingEnd();
		});
	}
	
	$.lodingStart = function() {
		$("body").append("<div id = 'loding' class='loding'><img src='/img/loding.gif'></div>");
	}
	$.lodingEnd = function() {
		$("#loding").remove();
	}
	
	/**
	 * 获取cookie
	 * @param {Object} name cookie名
	 * 如果找到cookie,返回cookie value
	 * 如果没有找到，返回""
	 */
	$.getCookie = function( name ) {
		var cookie = document.cookie;
		var start = cookie.indexOf(name);
		if( start == -1) {
			return "";
		}
		
		start = start + name.length + 1;
		var end = cookie.indexOf(";",start);
		if( end == -1 ) { //说明这些最后一个cookie,直接截取到最后一位
			return decodeURIComponent(cookie.slice(start));
		} else {
			return decodeURIComponent(cookie.slice(start,end));
		}
	}
}();