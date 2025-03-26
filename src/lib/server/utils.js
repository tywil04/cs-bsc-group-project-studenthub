import crypto from "node:crypto"

export function generateRandomString(length, characters="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789") {
    let result = "";
    const randomBytes = crypto.randomBytes(length);    
    for (let i = 0; i < length; i++) {
        result += characters[randomBytes[i] % characters.length];
    }
    return result;
}
