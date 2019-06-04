const _ = require('lodash')
const bcrypt = require('bcrypt');
const Model = require('../model');

function getAccessToken(bearerToken) {
  console.log("getAccessToken : ", bearerToken)
  return Model.AccessToken
    .findOne({ where: { accesstoken: bearerToken }, raw: true })
    .then(function (accessToken) {
      if (!accessToken) return false;
      var token = accessToken;
      token.user = token.user;
      token.client = token.client;
      token.scope = token.scope
      return token;
    })
    .catch(function (err) {
      console.log("getAccessToken - Err: ")
      console.log(err)
    });
}

async function getClient(clientId, clientSecret) {
  try {
    var client = {
      id: '5b220d446a238109e893f4e2',
      clientId: 'jordan.weng',
      clientSecret: '123456',
      redirectUri: 'http://127.0.0.1:3000',
      grants: 'password,authorization_code,refresh_token',
    }
    return {
      id: client.clientId,
      redirectUris: client.redirectUri,
      grants: client.grants.split(','),
    }
  } catch (err) {
    console.log("getClient - Err: ", err)
  };
}


async function getUser(username, password) {
  try {
    console.log('getUser:', username)
    let user = await Model.User.findOne({ where: { username: username }, raw: true })
    console.log("user", user)
    let error = new Error();
    if (!user) {
      console.log('Invalid user')
      // error.message = 'Invalid user'
      // error.name = "InvalidUser"
      // error.statusCode = 400
      // throw error
      throw new Error("Invalid user")
    }
    if (bcrypt.compareSync(password, user.password) == false) {
      console.log('Error Password')
      // error.message = 'Invalid user'
      // error.name = "ErrorPassword"
      // error.httpStatusCode = 400
      // throw error
      throw new Error("Error Password")
    } else {
      console.log(user)
      return user
    }
  } catch (err) {
    console.log("GetUser ", err)
    throw err
  }
}

async function revokeAuthorizationCode(code) {
  console.log("revokeAuthorizationCode", code)
  return Model.AuthorizationCode.findOne({
    where: {
      authorization_code: code.code
    },
    raw: true
  }).then(function (rCode) {
    //if(rCode) rCode.destroy();
    /***
     * As per the discussion we need set older date
     * revokeToken will expected return a boolean in future version
     * https://github.com/oauthjs/node-oauth2-server/pull/274
     * https://github.com/oauthjs/node-oauth2-server/issues/290
     */
    var expiredCode = code
    expiredCode.expiresAt = 60 * 60
    return expiredCode
  }).catch(function (err) {
    console.log("getUser - Err: ", err)
  });
}

async function revokeToken(token) {
  console.log("revokeToken", token)
  return Model.RefreshToken.findOne({
    where: {
      refreshtoken: token.refreshToken
    }, raw: true
  }).then(function (rT) {
    if (rT) rT.destroy();
    /***
     * As per the discussion we need set older date
     * revokeToken will expected return a boolean in future version
     * https://github.com/oauthjs/node-oauth2-server/pull/274
     * https://github.com/oauthjs/node-oauth2-server/issues/290
     */
    var expiredToken = token
    expiredToken.refreshTokenExpiresAt = 60 * 60
    return expiredToken
  }).catch(function (err) {
    console.log("revokeToken - Err: ", err)
  });
}

async function saveToken(token, client, user) {
  console.log("saveToken", {
    accesstoken: token.accessToken,
    accessTokenExpiresAt: token.accessTokenExpiresAt,
    client: client.id,
    user: user.id,
    scope: token.scope
  })
  return Promise.all([
    Model.AccessToken.create({
      accesstoken: token.accessToken,
      accessTokenExpiresAt: token.accessTokenExpiresAt,
      client: client.id,
      user: user.id,
      scope: token.scope
    }),
    token.refreshToken ? Model.RefreshToken.create({ // no refresh token for client_credentials
      refreshtoken: token.refreshToken,
      refreshTokenExpiresAt: token.refreshTokenExpiresAt,
      client: client.id,
      user: user.id,
      scope: token.scope
    }) : [],

  ])
    .then(function (resultsArray) {
      return _.assign(  // expected to return client and user, but not returning
        {
          client: client,
          user: user,
          access_token: token.accessToken, // proxy
          refresh_token: token.refreshToken, // proxy
        },
        token
      )
    })
    .catch(function (err) {
      console.log("revokeToken - Err: ", err)
    });
}

async function getAuthorizationCode(code) {
  console.log("getAuthorizationCode", code)
  return Model.AuthorizationCode
    .findOne({ where: { authorization_code: code }, raw: true })
    .then(function (authCodeModel) {
      if (!authCodeModel) return false;
      var client = authCodeModel.client
      var user = authCodeModel.user
      return reCode = {
        code: code,
        client: client,
        expires: authCodeModel.expires,
        redirectUri: client.redirect_uri,
        user: user,
        scope: authCodeModel.scope,
      };
    }).catch(function (err) {
      console.log("getAuthorizationCode - Err: ", err)
    });
}

async function saveAuthorizationCode(code, client, user) {
  console.log("saveAuthorizationCode", code, client, user)
  return Model.AuthorizationCode
    .create({
      expires: code.expiresAt,
      OAuthClient: client.id,
      authorization_code: code.authorizationCode,
      user: user.id,
      scope: code.scope
    })
    .then(function () {
      code.code = code.authorizationCode
      return code
    }).catch(function (err) {
      console.log("saveAuthorizationCode - Err: ", err)
    });
}

async function getRefreshToken(refreshToken) {
  console.log("getRefreshToken", refreshToken)
  if (!refreshToken || refreshToken === 'undefined') return false
  //[OAuthClient, User]
  return Model.RefreshToken
    .findOne({ where: { refreshtoken: refreshToken }, raw: true })
    .then(function (savedRT) {
      console.log("srt", savedRT)
      var tokenTemp = {
        user: savedRT ? savedRT.User : {},
        client: savedRT ? savedRT.OAuthClient : {},
        refreshTokenExpiresAt: savedRT ? new Date(savedRT.expires) : null,
        refreshToken: refreshToken,
        refreshtoken: refreshToken,
        scope: savedRT.scope
      };
      return tokenTemp;

    }).catch(function (err) {
      console.log("getRefreshToken - Err: ", err)
    });
}

async function getUserFromClient(client) {
  console.log("getUserFromClient", client)
  let options = { clientid: client.clientid };
  if (client.clientsecret) options.clientsecret = client.clientsecret;

  return OAuthClient
    .findOne({ where: options, raw: true })
    .then(function (client) {
      console.log(client)
      if (!client) return false;
      if (!client.user) return false;
      return client.user;
    }).catch(function (err) {
      console.log("getUserFromClient - Err: ", err)
    });
}

async function validateScope(token, client, scope) {
  console.log("validateScope", token, client, scope)
  return (user.scope === client.scope) ? scope : false
}

async function verifyScope(token, scope) {
  console.log("verifyScope", token, scope)
  return token.scope === scope
}
module.exports = {
  getAccessToken: getAccessToken,
  getAuthorizationCode: getAuthorizationCode, //getOAuthAuthorizationCode renamed to,
  getClient: getClient,
  getRefreshToken: getRefreshToken,
  getUser: getUser,
  getUserFromClient: getUserFromClient,
  //grantTypeAllowed, Removed in oauth2-server 3.0
  revokeAuthorizationCode: revokeAuthorizationCode,
  revokeToken: revokeToken,
  saveToken: saveToken,//saveOAuthAccessToken, renamed to
  saveAuthorizationCode: saveAuthorizationCode, //renamed saveOAuthAuthorizationCode,
  //validateScope: validateScope,
  verifyScope: verifyScope,
}