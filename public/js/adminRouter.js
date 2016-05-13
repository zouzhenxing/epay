$(function() {
	var router = new Router({
   		container: '#container',
   		enterTimeout : 200,
   		leaveTimeout : 250
	});
	
	var adminList = {
		url : "/adminList",
		className :  "adminList",
		ajaxData : function() {
			var that = this;
			return $._ajax({
				url  : "/admin/admin",
				type : "get"
			}).done(function( data ) {
				that.data = data;
			});
		},
		render : function() {
			return ejs.render($("#adminList").html(),{admins:this.data});
		}
	}
	
	var adminAdd = {
		url : "/adminAdd",
		render : function() {
			return $("#adminAdd").html();
		},
		bind : function() {
			var t = $(this);
			t.find("#sub").click(function(){
				var aname = t.find("#aname").val();
				var email = t.find("#email").val();
				var password = t.find("#password").val();
				
				if( $.validate.isEmpty(aname) == false ) {
					return t.find(".alert").alterMes({message:"用户名不能为空!"});
				}
				if( $.validate.isEmpty(email) == false ) {
					return t.find(".alert").alterMes({message:"邮箱不能为空!"});
				}
				if( $.validate.isEmpty(password) == false ) {
					return t.find(".alert").alterMes({message:"密码不能为空!"});
				}
				if( $.validate.isEmail(email) == false ) {
					return t.find(".alert").alterMes({message:"邮箱格式不正确!"});
				}
				
				//提交ajax
				$._ajax({
					url : "/admin/admin",
					data : {"aname":aname,"email":email,"password":password}
				}).done(function( obj ){
					if( obj.code ) {
						//如果增加成功，返回列表
						location.href = "/admin/index#/adminList";
					} else {
						t.find(".alert").alterMes({type:"danger",message:obj.msg})
					}
				});
			});
		}
	}
	
	var adminDel = {
		url : "/adminDel/:id",
		ajaxData : function() {
			var t = this;
			$._ajax({
				url : "/admin/admin/" + t.params.id,
				type : "delete"
			}).done(function() {
				location.href = "/admin/index#/adminList";
			});
			
			return false; //停止路由
		}
	}
	
	//typerouter
	var typeList = {
		url : "/typeList",
		ajaxData : function() {
			var that = this;
			return $._ajax({
				url  : "/admin/producttype",
				type : "get"
			}).done(function( data ) {
				that.data = data;
			});
		},
		render : function() {
			return ejs.render($("#typeList").html(),{types:this.data});
		}
	}
	
	var typeAdd = {
		url : "/typeAdd",
		render : function() {
			return ejs.render($("#typeAdd").html(),{types:this.data});
		},
		ajaxData : function() {
			var that = this;
			return $._ajax({
				url  : "/admin/producttype/0",
				type : "get"
			}).done(function( data ) {
				that.data = data;
			});
		},
		bind : function() {
			var t = $(this);
			t.find("#sub").click(function(){
				var typename = t.find("#typename").val();
				var typeinfo = t.find("#typeinfo").val();
				var pid = t.find("#pid").val();
				
				if( $.validate.isEmpty(typename) == false ) {
					return t.find(".alert").alterMes({message:"分类名不能为空!"});
				}
				if( $.validate.isEmpty(typeinfo) == false ) {
					return t.find(".alert").alterMes({message:"分类描述不能为空!"});
				}
				
				//提交ajax
				$._ajax({
					url : "/admin/producttype",
					data : {"typename":typename,"typeinfo":typeinfo,"pid":pid}
				}).done(function( obj ){
					if( obj.code ) {
						//如果增加成功，返回列表
						location.href = "/admin/index#/typeList";
					} else {
						t.find(".alert").alterMes({type:"danger",message:obj.msg})
					}
				});
			});
		}
	}
	
	var typeDel = {
		url : "/typeDel/:id",
		ajaxData : function() {
			var t = this;
			$._ajax({
				url : "/admin/producttype/" + t.params.id,
				type : "delete"
			}).done(function() {
				location.href = "/admin/index#/typeList";
			});
			
			return false; //停止路由
		}
	}
	
	var proList = {
		url : "/proList",
		ajaxData : function() {
			var that = this;
			return $._ajax({
				url  : "/admin/product",
				type : "get"
			}).done(function( data ) {
				that.data = data;
			});
		},
		render : function() {
			return ejs.render($("#proList").html(),{products:this.data});
		}
	}
	
	var proAdd = {
		url : "/proAdd",
		ajaxData : function() {
			var that = this;
			return $._ajax({
				url  : "/admin/producttype",
				type : "get"
			}).done(function( data ) {
				that.data = data;
			});
		},
		render : function() {
			return ejs.render($("#proAdd").html(),{types:this.data});
		},
		bind :function() {
			var t = $(this);
			t.find("#sub").click(function(){
				var pname = t.find("#pname").val();
				var price = t.find("#price").val();
				var strock = t.find("#strock").val();
				var type = t.find("#type").val();
				
				var data = new FormData();
				data.append("pname",pname);
				data.append("price",price);
				data.append("strock",strock);
				data.append("type",type);
				data.append("upfile",t.find("#imgpath").get(0).files[0]);
				
				$._ajax({
					url : "/admin/product",
					data : data,
					cache: false,
		            processData: false,
		            contentType: false
				}).done(function( obj ) {
					if( obj.code ) {
						location.href = "/admin/index#/proList";
					} else {
						t.find(".alert").alterMes({type:"danger",message:obj.msg});
					}
				});
			});
			
			t.find("#imgpath").change(function(){
				var file = this.files[0];
				if( file.type.indexOf("image") == -1 ) {
					$(this).val("");
					t.find(".alert").alterMes({type:"danger",message:"只能上传图片"});
					return false;
				}
				
				if( file.size > (1024 * 512) ) {
					$(this).val("");
					t.find(".alert").alterMes({type:"danger",message:"只能上传小于512K的图片"});
					return false;
				}
				
				var fr = new FileReader();
				fr.readAsDataURL(file);
				fr.onload = function() {
					$("#showimg").attr("src",fr.result);
				}
			});
		}
	}
	
	var proDel = {
		url : "/proDel/:pid",
		ajaxData : function() {
			var t = this;
			$._ajax({
				url : "/admin/product/" + t.params.pid,
				type : "delete"
			}).done( function( obj ){
				location.href = "/admin/index#/proList";
			});
			
			return false;
		}
	}
	
	
	var home = {
		url : "/",
		render : function() {
			return "<div><h1>欢迎</h1><div>"
		}
	}
	
	router.push(adminList)
		  .push(home)
		  .push(adminAdd)
		  .push(adminDel)
		  .push(typeList)
		  .push(typeAdd)
		  .push(typeDel)
		  .push(proList)
		  .push(proAdd)
		  .push(proDel)
		  .setDefault('/').init();
});