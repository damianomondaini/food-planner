let readline = require('readline')
let {google} = require('googleapis')
let fs = require('fs')
let SCOPES = ['https://www.googleapis.com/auth/drive']
let TOKEN_PATH = 'token.json'

exports.uploadImage = (req, res, next) => {
    fs.readFile('credentials.json', (err, content) => {
        if (err)
            return console.log('Error loading client secret file:', err)
        authorize(JSON.parse(content), uploadFile)
    })
    function authorize(credentials, callback) {
        const {client_secret, client_id, redirect_uris} = credentials.installed
        const oAuth2Client = new google
            .auth
            .OAuth2(client_id, client_secret, redirect_uris[0])
        fs.readFile(TOKEN_PATH, (err, token) => {
            if (err)
                return getAccessToken(oAuth2Client, callback)
            oAuth2Client.setCredentials(JSON.parse(token))
            callback(oAuth2Client)
        })
    }
    function getAccessToken(oAuth2Client, callback) {
        const authUrl = oAuth2Client.generateAuthUrl({access_type: 'offline', scope: SCOPES})
        console.log('Authorize this app by visiting this url:', authUrl)
        const rl = readline.createInterface({input: process.stdin, output: process.stdout})
        rl.question('Enter the code from that page here: ', (code) => {
            rl.close()
            oAuth2Client.getToken(code, (err, token) => {
                if (err)
                    return console.error('Error retrieving access token', err)
                oAuth2Client.setCredentials(token)
                fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
                    if (err)
                        return console.error(err)
                    console.log('Token stored to', TOKEN_PATH)
                })
                callback(oAuth2Client)
            })
        });
    }

    let path = './src/public/img/temp/' + req.file.filename
    let fileMetadata = {
        'name': req.file.filename,
        parents: ['1ITIuUmoX7BM9A8n3LdB56AiCQ0k6IUGf']
    }
    let media = {
        mimeType: req.file.mimeType,
        body: fs.createReadStream(path)
    }

    function uploadFile(auth) {
        const drive = google.drive({version: 'v3', auth})
        drive
            .files
            .create({
                resource: fileMetadata,
                media: media,
                fields: 'id'
            }, async function (err, file) {
                if (err) {
                    console.error(err)
                } else {
                    fs.unlink(path, (err) => {
                        if (err) throw err
                    })
                    res.locals['imageId'] = file.data.id
                    await next()
                }
            })
    }
}

exports.deleteImage = (req, res, next) => {
    fs.readFile('credentials.json', (err, content) => {
        if (err)
            return console.log('Error loading client secret file:', err)
        authorize(JSON.parse(content), deleteFile)
    })
    function authorize(credentials, callback) {
        const {client_secret, client_id, redirect_uris} = credentials.installed
        const oAuth2Client = new google
            .auth
            .OAuth2(client_id, client_secret, redirect_uris[0])
        fs.readFile(TOKEN_PATH, (err, token) => {
            if (err)
                return getAccessToken(oAuth2Client, callback)
            oAuth2Client.setCredentials(JSON.parse(token))
            callback(oAuth2Client)
        })
    }
    function getAccessToken(oAuth2Client, callback) {
        const authUrl = oAuth2Client.generateAuthUrl({access_type: 'offline', scope: SCOPES})
        console.log('Authorize this app by visiting this url:', authUrl)
        const rl = readline.createInterface({input: process.stdin, output: process.stdout})
        rl.question('Enter the code from that page here: ', (code) => {
            rl.close()
            oAuth2Client.getToken(code, (err, token) => {
                if (err)
                    return console.error('Error retrieving access token', err)
                oAuth2Client.setCredentials(token)
                fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
                    if (err)
                        return console.error(err)
                    console.log('Token stored to', TOKEN_PATH)
                })
                callback(oAuth2Client)
            })
        });
    }

    let imageId = req.body.imageId

    function deleteFile(auth) {
        const drive = google.drive({version: 'v3', auth})
        drive
            .files
            .delete({
                fileId: imageId
            }, function (err) {
                if (err) {
                    next()
                } else {
                    next()
                }
            })
    }
}
