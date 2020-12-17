exports.gen_key = async function (options) {
    //https://github.com/speakeasyjs/speakeasy
    //https://github.com/soldair/node-qrcode

    const qr = require('qrcode');
    const speakeasy = require("speakeasy");
    const secretObj = await speakeasy.generateSecret();
    const secret = secretObj.base32;

    let dataURL = await qr.toDataURL(secretObj.otpauth_url)
        .then(url => {
            return url;
        })
        .catch(err => {
            console.error(err)
        })

    return { secret, dataURL };


};

exports.verify_token = async function (options) {
    const speakeasy = require("speakeasy");
    let user_token = this.parseRequired(options.user_token, 'string', 'parameter user_token is required.');

    let base32Secret = this.parseRequired(options.secret, 'string', 'parameter secret is required.');


    let valid_token = speakeasy.totp.verify({ secret: base32Secret, encoding: "base32", token: user_token, window: options.window, step: options.step });

    return { "valid_token": valid_token };



};