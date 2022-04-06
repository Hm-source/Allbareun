const { User } = require("../Models/User");

let auth = (req, res, next) => {
    //인증 처리 부분

    //client cookie에서 token을 가져온다.
    let token = req.cookies.x_auth;

    //decode token를 하고 user를 찾는다.
    User.findByToken(token, (err, user) => {
        if(err) throw err;
        if(!user) return res.json( {isAuth: false, error: true});
        //req에 토큰과 유저를 넣어주는 이유는 user.js에서 사용 가능하도록.
        req.token = token;
        req.user = user;
        //middelware에서 할 거 다하고 넘어갈 수 있도록 next()사용.
        next();
    });
    //user가 없으면 인증 No

};


module.exports =  { auth };