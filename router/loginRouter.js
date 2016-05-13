var loginrouter = express.Router();

loginrouter.all("/login",loginControl.login);
loginrouter.all("/logout",loginControl.logout);

module.exports = loginrouter;