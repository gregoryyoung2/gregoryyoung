const fs = require('fs')
const express = require('express')
const http = require('http')
const https = require('https')
const app = express()
const domain = `gregoryyou.ng`
const port = 80
const httpsPort = 443

const privateKey = fs.readFileSync(`/etc/letsencrypt/live/${domain}/privkey.pem`, `utf8`)
const certificate = fs.readFileSync(`/etc/letsencrypt/live/${domain}/cert.pem`, `utf8`)
const ca = fs.readFileSync(`/etc/letsencrypt/live/${domain}/chain.pem`, `utf8`)

const credentials = {
	key: privateKey,
	cert: certificate,
	ca: ca
}

app.use('/scripts', express.static(__dirname + '/frontend/scripts'))
app.use('/styles', express.static(__dirname + '/frontend/styles'))
app.use('/pixels', express.static(__dirname + '/frontend/pixels'))
app.use('/words', express.static(__dirname + '/frontend/words'))
app.use('/content/left.html', express.static(__dirname + '/frontend/content/left.html'))

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/frontend/content/main.html');
})

app.get('/api/getProjects', function(req, res) {
    let projects = require(__dirname + `/data/projects`)
    projects.projects.sort((a,b) => {
        return b.date - a.date
    })
    res.send(projects)
})

app.get('/api/getResume', function(req, res) {
    res.download(__dirname + `/data/Gregory Young Resume 29-11-18.pdf`)
})

const httpServer = http.createServer()

http.get('*', function(req, res) {  
    res.redirect('https://' + req.headers.host + req.url);
})

const httpsServer = https.createServer(credentials, app)

httpServer.listen(80, () => console.log(`http listening on port ${port}!`))
httpsServer.listen(443, () => console.log(`https listening on port ${httpsPort}`))

