const dotenv = require('dotenv');
dotenv.config();
const passport = require('passport');
const KakaoStrategy = require('passport-kakao').Strategy;

passport.use( new KakaoStrategy({
        clientID: process.env.KAKAO_CLIENT_ID,
        callbackURL: process.env.KAKAO_REDIRECT_URI,
    },
    (accessToken, refreshToken, profile, done) => {
        try{
            const user = profile;
            return done(null, user);
        }
        catch(error){
            console.error(error);
            return done(error);
        }
    })
);

//serializeUser, deserializeUser 메서드는 세션에 저장할 때 사용됨.여기는 사용을 위해 오버라이딩 해서 초기화 하는 단계
//authenticate전에만 사용하면 됨.
passport.serializeUser((user, done) => {
    done(null, user);
});
passport.deserializeUser((user, done) => {
    done(null, user);
});

exports.kakaoLogin = passport.authenticate('kakao');
exports.kakaoCallback = passport.authenticate('kakao', {
    successRedirect: 'http://localhost:8080?success=true',
    failureRedirect: 'http://localhost:8080?success=false',
});