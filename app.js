import Koa from 'koa';
import views from 'koa-views';
import serve from 'koa-static';
import logger from 'koa-logger';
import bodyParser from 'koa-bodyparser'
import passport from './services/passport';
import router from './routes';

// Connect Database
import db from './services/database';

const app = new Koa();

app
  .use(logger())
  .use(bodyParser())
  .use(serve(__dirname + '/public'))
  .use(views(__dirname + '/views'))
  .use(passport.initialize())
  .use(router.middleware());

if(process.env.NODE_ENV !== 'development') {
  // do production thing
}

app.listen(process.env.PORT);