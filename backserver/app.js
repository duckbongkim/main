const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const {sequelize} = require('./models/model_index.js');
const cors = require('cors');
const path = require('path');
const indexRouter = require('./routers/router_index.js');
const adminRouter = require('./routers/router_admin.js');
const productsRouter = require('./routers/router_products.js');

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
};
app.use(cors(corsOptions));




//라우터 
app.use('/',indexRouter);
app.use('/admin',adminRouter);
app.use('/products',productsRouter);

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

