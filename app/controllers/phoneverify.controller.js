const bcrypt = require('bcrypt');
const db = require("../models/reservation.model");
var request = require('request');
const saltRounds = 10;
var apiKey = process.env.ACCOUNT_API_KEY;
var VERSION = "0.1";

function PhoneVerification({ apiKey = "zyeHp1r37Qr6ZBMYybzqjyIDWh9Lg1ZC", apiUrl = "https://api.authy.com" }) {
    this.apiKey = apiKey;
    this.apiURL = apiUrl;
    this.user_agent = "PhoneVerificationRegNode/" + VERSION + " (node " + process.version + ")";
    this.headers = {};

    this.init();
}

PhoneVerification.prototype.init = function () {
    this.headers = {
        "User-Agent": this.user_agent
    };
};

/**
 * Verify a phone number
 *
 * @param {!string} phone_number
 * @param {!string} country_code
 * @param {!string} token
 * @param {!function} callback
 */

exports.findAllRegistrationotp = (req, res) => {
    PhoneVerification.prototype._request.call(this, "get", "/protected/json/phones/verification/check", {
        "api_key": 'FhOiFsC3bqW0RIaNLetlny0EaxGx9bBk',
        "verification_code": req.body.token,
        "phone_number": req.body.phoneNumber,
        "country_code": req.body.countryCode
    },
        (nuldata, data) => {
            if (data.success) {
                res.status(200).send({
                    message: "Send OTP on Verify in Your Phone Number!" + data.message
                });
            } else {
                res.status(400).send({
                    message: data.message
                });
            }

        }
    );
};


/**
 * Request a phone verification
 *
 * @param {!string} phone_number
 * @param {!string} country_code
 * @param {!string} via
 * @param {!function} callback
 */
exports.findAllRegistration = (req, res) => {
    // if (!(req.body.phoneNumber && req.body.countryCode)) {
    //     res.status(400).send({
    //         message: "Content can not be empty!"
    //     });
    //     return;
    // }
    PhoneVerification.prototype._request.call(this, "post", "/protected/json/phones/verification/start", {
        "api_key": 'FhOiFsC3bqW0RIaNLetlny0EaxGx9bBk',
        "phone_number": req.body.phoneNumber,
        "via": 'SMS',
        "country_code": req.body.countryCode,
        "code_length": 4
    },
        (nuldata, data) => {
            if (data.success) {
                res.status(200).send({
                    message: "Send OTP on Your Phone Number!" + data.message
                });
            } else {
                res.status(400).send({
                    message: data.message
                });
            }

        }
    );
};


PhoneVerification.prototype._request = function (type, path, params, callback, qs) {
    qs = qs || {};
    qs['api_key'] = 'FhOiFsC3bqW0RIaNLetlny0EaxGx9bBk';

    options = {
        url: 'https://api.authy.com' + path,
        form: params,
        headers: this.headers,
        qs: qs,
        json: true,
        jar: false,
        strictSSL: true
    };

    var callback_check = function (err, res, body) {
        console.log(res.statusCode, body)
        if (!err) {
            if (res.statusCode === 200) {
                callback && callback(null, body);
            } else {
                callback && callback(null, body);
            }
        } else {
            callback && callback(err);
        }
    };

    switch (type) {
        case "post":
            request.post(options, callback_check);
            break;

        case "get":
            request.get(options, callback_check);
            break;
    }
};