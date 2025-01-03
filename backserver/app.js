const dotenv = require('dotenv');
dotenv.config();

//module import
const express = require('express');
const {sequelize} = require('./models/model_index.js');
const cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
const passportSetting = require('./methods/passportSetting.js');
//router import
const indexRouter = require('./routers/router_index.js');
const adminRouter = require('./routers/router_admin.js');
const productRouter = require('./routers/router_products.js');// 1월1일 productRouter 추가
const listRouter = require('./routers/router_list.js');
const loginRouter = require('./routers/router_login.js');
const orderRouter = require('./routers/router_orders.js');// 1월2일 orderRouter 추가 (누리)
const profileRouter = require('./routers/router_profile.js');


//서번 생성
const app = express();
app.set('port',process.env.PORT);

//데이터베이스 연결
sequelize.sync({force:false})
.then(()=>{
    console.log('데이터베이스 연결 성공');
})
.catch((error)=>{
    console.log('데이터베이스 연결 실패');
    console.error(error);
});

//미들웨어 
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use('/',express.static(path.join(__dirname,'uploads')));
const corsOptions = {
    origin: process.env.FRONT_URL,
    credentials: true,
    optionsSuccessStatus: 200
};//cors 설정
app.use(cors(corsOptions));
passportSetting.passportSetting();
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
    resave:false,
    saveUninitialized:false,
    secret:process.env.COOKIE_SECRET,
    cookie:{
        httpOnly:true,
        secure:false,
        maxAge:60*1000*60*24,//1day
    }
}));//session 설정
app.use(passport.initialize());
app.use(passport.session());


//라우터 
app.use('/',indexRouter); //mainPage Router
app.use('/admin',adminRouter); //adminPage Router
app.use('/products',productRouter);// 1월1일 productRouter 추가
app.use('/login',loginRouter);
app.use('/liqueur',listRouter);
app.use('/orders',orderRouter);// 1월2일 orderRouter 추가 (누리)
app.use('/profile',profileRouter);




//404 에러 처리
app.use((req,res,next)=>{
    res.status(404).send('Router Not Found');
});

//500 에러 처리
app.use((err,req,res,next)=>{
    console.error(err.stack);
    res.status(500).send('Internal Server Error');
});


app.listen(app.get('port'),()=>{
    console.log(app.get('port'),'번 포트에서 대기중');
});

