var APIRouter = express.Router();

//API新闻列表
APIRouter.get("/news",newsControl.newsList);
APIRouter.get("/news/:nid",newsControl.preview);

//登录
APIRouter.post("/login",loginControl.login);

module.exports = APIRouter;