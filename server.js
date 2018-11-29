const express = require('express')
const app = express()
const port = 80

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

app.listen(port, () => console.log(`listening on port ${port}!`))
