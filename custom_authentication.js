exports.gen_key = async function (options) {
    //https://github.com/speakeasyjs/speakeasy
    //https://github.com/soldair/node-qrcode

    // get dynamic variables
    let appName = this.parseRequired(options.applicationName, 'string', 'parameter application name is required.');

    // setup qr provider
    const qr = require('qrcode');

    // setup auth provider
    const speakeasy = require("speakeasy");
    const secretObj = await speakeasy.generateSecret({ name: appName });

    // gen secret
    const secret = secretObj.base32;

    // get the dataURL for qr display
    let dataURL = await qr.toDataURL(secretObj.otpauth_url)
        .then(url => {
            return url;
        })
        .catch(err => {
            console.error(err)
        })

    // return the secret and data url
    return { secret, dataURL };


};

exports.verify_token = async function (options) {

    // setup the auth object
    const speakeasy = require("speakeasy");

    // get dynamic variables
    let user_token = this.parseRequired(options.user_token, 'string', 'parameter user_token is required.');
    let base32Secret = this.parseRequired(options.secret, 'string', 'parameter secret is required.');

    // validate the token
    let valid_token = speakeasy.totp.verify({ secret: base32Secret, encoding: "base32", token: user_token, window: options.window, step: options.step });

    // return the result
    return { "valid_token": valid_token };



};
