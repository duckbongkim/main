require('dotenv').config()

const {sequelize} = require('./models/model_index.js')
const express = require('express')
const cors = require('cors')

//라우터 임포트
const indexRouter = require('./routes/index')
const productsRouter = require('./routes/products')


const app = express();
app.set('port',process.env.PORT || 3000)

sequelize.sync({force: false})
    .then(()=>{
        console.log("데이터베이스 연결 성공")
    })
    .catch((err)=>{
        console.error(err)
    })


app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:false}))


app.use('/',indexRouter)
app.use('/products',productsRouter)


app.use((req,res,next)=>{
    res.status(404).send(`${req.method}  ${req.url} 라우터 없음`);
})

app.use((err,req,res,next)=>{
    const status = err.status || 500;
    console.error(err);
    res.status(status).json({error : err.message})
})

app.listen(app.get('port'),()=>{
    console.log(`${app.get('port')} 번 포트에서 서버 실행중`)
})





