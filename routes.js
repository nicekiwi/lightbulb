import passport from 'passport';
import multer from 'koa-multer';
import Router from 'koa-better-router';
import AuthCo from './controllers/auth';
import AccountCo from './controllers/account';

const router = Router().loadMethods();
const authenticate = passport.authenticate('jwt', { session: false });
const upload = multer({ storage: multer.memoryStorage() });

// Auth
router.post('/ping', authenticate, AuthCo.handlePing);
router.post('/token-refresh', authenticate, AuthCo.handleTokenRefresh);
router.post('/logout', authenticate, AuthCo.handleLogout);
router.post('/login', AuthCo.handleLogin);

// Account
router.post('/account/change-password', authenticate, AccountCo.changePassword);

// Default Views
router.get('*', async ctx => await ctx.render('index.pug'));

export default router;