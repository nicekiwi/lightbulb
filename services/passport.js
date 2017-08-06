import passport from "koa-passport";
import { Strategy as JwtStrategy } from 'passport-jwt';

const cookieExtractor = function(req) {
  if (req && req.cookies) return req.cookies.get('jwt');
  return null;
};

export const strategy = new JwtStrategy({
  passReqToCallback: true,
  jwtFromRequest: cookieExtractor,
  secretOrKey: process.env.JWT_SECRET
}, (request, payload, done) => {
  done(null, payload);
});

passport.use(strategy);

export default passport;