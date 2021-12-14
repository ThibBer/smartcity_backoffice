function base64ToUTF8(data){
    return Buffer.from(data, 'base64').toString('utf-8')
}

const JWTManager = {
    decode: (jwt) => {
        if(jwt === null || jwt === undefined){
            return null;
        }

        const [header, payload] = jwt.split(".");

        return {header: JSON.parse(base64ToUTF8(header)), payload: JSON.parse(base64ToUTF8(payload))}
    },
    isValid: (jwt) => {
        if(jwt === null || jwt === undefined){
            return false;
        }

        return Date.now() < jwt.payload.exp * 1000;
    }
}


export default JWTManager;