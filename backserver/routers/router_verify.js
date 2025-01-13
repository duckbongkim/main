const express = require('express');
const router = express.Router();
const multer = require('multer');
const axios = require('axios');

// http://localhost:3000/verify


router.post('/', async (req, res) =>{
    // 프론트에서 보낸 사용자 imp_uid 꺼내기
    console.log('@@@@@@@@@@@@@@@@@@@@@    0000   @@@@@@@@@@@@@@@@@@@@@@@');
    const {imp_uid} = req.body;

    console.log(`@@@@@@@@@@@@@@@@@@@@@imp_uid${imp_uid}`);

    if (!imp_uid) {
        return res.status(400).json({ message : 'imp_uid 가 필요합니다.'});
    }

    try{

        // 1. 가맹점으로서 포트원에서 일회용 access 토큰 발급받기.
        const tokenResponse = await axios.post('https://api.iamport.kr/users/getToken', {
            imp_key : '3008565515570514',
            imp_secret : '57kArqfK5Ob6G6UcrgwZeuaSX5PnzoIMEM6ja5aWym7k2pfF1qeHRWW6QlQYkjpceNggHwacPggPbSRb',
        });

        console.log(`@@@@@@@@@@@@@@@@@@@@@tokenResponse : ${tokenResponse}`);
        
        const { access_token } = tokenResponse.data.response;
        
        console.log(`@@@@@@@@@@@@@@@@@@@@@access_token : ${access_token}`);

        ///////여기까지 작동//////////////////////////////////////////////////////////////////////////////////////////

        // @@@@@@@@@@@@@@@@@@@@@    0000   @@@@@@@@@@@@@@@@@@@@@@@
        // @@@@@@@@@@@@@@@@@@@@@imp_uidimp_685358621338
        // @@@@@@@@@@@@@@@@@@@@@tokenResponse : [object Object]
        // @@@@@@@@@@@@@@@@@@@@@access_token : f0993a78b3116ae06b3de15c23694856a8a9c264

        // 2. access 토큰을 (헤더로 포함하여) 보내 인증 후 고객정보 받아오기
        const certificationResponse = await axios(
            {   
                url: `https://api.iamport.kr/certifications/\${imp_uid}`,
                method : 'get',
                headers : { Authorization: access_token },
            }
        );


        console.log(`@@@@@@@@@@@@@@@@@@@@@ certificationResponse ${certificationResponse}  `);

        const certificationsInfo = certificationResponse.data.response;

        console.log(`@@@@@@@@@@@@@@@@@@@@@    certificationsInfo  ${certificationsInfo}  `);

        if(!certificationsInfo) {
            return res.status(403).json({message : `인증정보를 찾을 수 없다.`})
        }

        
        const { name, gender, birth, unique_key, phone } = certificationsInfo;

        console.log('@@@@@@@@@@@@@@@@@@@@@     5555   @@@@@@@@@@@@@@@@@@@@@@@');

        // 3. 연령 제한

        const birthDate = new Date(birth * 1000); 
        const birthYear = birthDate.gatFullYear(); //연도만 끊어오기
        const age = currentYear - birthYear ; 
        
        console.log(`@@@@@@@@@@@@@@@@@@@@@    age  ${age}  `);

        if (age >= 18) {
            res.status(200).json({
                message : '인증성공 및 연령제한 통과',
                data : {name, gender, birth : birthDate.toLocaleDateString(), unique_key, phone, age}, // 유저정보에 넣나?? : "계속 성인임"
            });
        } else {
            res.status(403).json({
                message : '연령제한',
                data : {name, age},
            });
        }

        console.log('@@@@@@@@@@@@@@@@@@@@@     7777  @@@@@@@@@@@@@@@@@@@@@@@');

    } catch(err) {
        res.status(500).json({
            message : '서버 오류로 인증 처리 실패',
            error : err.response?.data || err.message,
        });
    }

})

module.exports = router;