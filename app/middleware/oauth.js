const express = require('express');
const app = express();
const Oauth2Server = require('oauth2-server')
const Request = require('oauth2-server').Request
const Response = require('oauth2-server').Response

app.oauth = new Oauth2Server({
    model: require(`./oauth_model`),
    grants: ['password', 'authorization_code', 'refresh_token'],
    continueMiddleware: true,
    useErrorHandler: true,
    accessTokenLifetime: 60 * 60
})

module.exports = {
    authenticateHandler: async function (req, res, next) {
        var request = new Request(req);
        var response = new Response(res);
        return app.oauth.authenticate(request, response)
            .then(function (token) {
                // req.token = data
                res.locals.oauth = { token: token };
                next()
            }).catch(function (err) {
                res.status(400).send({
                    message: err.message
                })
                console.log(err.message)
            })
    },
    tokenHandler: async function (req, res, next) {
        if (req.is('json')) {
            req.headers['content-type'] = 'application/x-www-form-urlencoded';
        }
        let request = new Request(req, req.body.client_id = 'jordan.weng', req.body.grant_type = 'password');
        let response = new Response(res);
        app.oauth.token(request, response, options = { requireClientAuthentication: { password: false } })
            .then(function (token) {
                let Expiresdate = new Date(token.accessTokenExpiresAt);
                let expires_in = parseInt((Expiresdate.getTime() - Date.now()) / 1000)
                let user = {
                    name: token.user.name,
                    email: token.user.email,
                }
                if (token.user.admin) {
                    user.admin = token.user.admin
                }
                console.log({
                    access_token: token.accessToken,
                    expires: expires_in,
                    user: user
                })
                res.status(200).send({
                    access_token: token.accessToken,
                    expires: expires_in,
                    user: user
                })
            }).catch((err) => {
                console.log("OAuthToken ", err)
                res.status(400).send({
                    message: err.message
                })
            })

        // }
        // }
    }
}