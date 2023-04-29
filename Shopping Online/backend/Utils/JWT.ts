import jwt from "jsonwebtoken";

// secret key of token
const JWT_SECRET_KEY = "i_am_a_secret_key_no_one_knows_me";
// get JWT token
const getJWT = (email: string) => {
    let data = {
        // Today date
        "timeStamp": Date(),
        user: email,
        // expiration of token (30 min)
        exp: Math.floor(Date.now() / 1000) + (60 * 30),
    }
    return jwt.sign(data, JWT_SECRET_KEY);
}
// check if token is valid
const checkJWT = (token: string): Promise<boolean> => {
    const trueToken = token.split(" ")[1];
    return new Promise<boolean>((resolve, reject) => {
        try {
            jwt.verify(trueToken, JWT_SECRET_KEY, (err: any, user: any) => {
                if (err) {
                    resolve(false)
                }
                resolve(true);
            })
        } catch (err: any) {
            console.log(err);
            resolve(false)
        }
    });
}
// get username from token
const getUserNameFromJWT = (token:any) => {
    try {
        //const myToken:any = jwt.decode(token);
        // if we need to decode token with Bearer
        const myToken:any = jwt.decode(token.split(" ")[1]);
        //console.log(myToken.user);
        return myToken.user;
    } catch (err) {
        //console.log(err);
        console.log("error getting user...");
    }
}

export {
    getJWT,
    checkJWT,
    getUserNameFromJWT
}