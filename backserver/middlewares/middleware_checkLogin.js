exports.isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
        next();
    } else {
        console.log("세션 정보:", req.session);
        console.log("인증 상태:", req.isAuthenticated());
        console.log("사용자 정보:", req.user);
        res.status(403).json({message: 'need login'});
    }
};
exports.isNotLoggedIn = (req,res,next)=>{
    if(!req.isAuthenticated()){
        next();
    }
    else{
        res.status(403).json({message:'already logged in'});
    }
}