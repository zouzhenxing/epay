var adminRouter = express.Router();

adminRouter.all("/index",adminIndexControl.index);
//resetful规范
adminRouter.get("/admin",adminIndexControl.adminList);  //列表
adminRouter.post("/admin",adminIndexControl.adminAdd);  //增加
adminRouter.delete("/admin/:id",adminIndexControl.adminDel);//删除

//商品分类API
adminRouter.get("/producttype",productTypeControl.typeList);
adminRouter.get("/producttype/:pid",productTypeControl.typeList);
adminRouter.post("/producttype",productTypeControl.typeAdd);
adminRouter.delete("/producttype/:id",productTypeControl.typeDel);

//商品API
adminRouter.get("/product",productControl.proList);
adminRouter.post("/product",upload.single('upfile'),productControl.proAdd);
adminRouter.delete("/product/:pid",productControl.proDel);

//新闻API
adminRouter.get("/news",newsControl.newsList);
adminRouter.get("/news/:nid",newsControl.preview);
adminRouter.post("/news",newsControl.newsAdd);
adminRouter.delete("/news/:nid",newsControl.newsDel);

module.exports = adminRouter;