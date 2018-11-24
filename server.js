const express = require('express')
const app = express()
const port = 3000

app.use('/scripts', express.static(__dirname + '/frontend/scripts'))
app.use('/styles', express.static(__dirname + '/frontend/styles'))
app.use('/pixels', express.static(__dirname + '/frontend/pixels'))
app.use('/words', express.static(__dirname + '/frontend/words'))
app.use('/content/left.html', express.static(__dirname + '/frontend/content/left.html'))


app.get('/', function(req, res) {
    res.sendFile(__dirname + '/frontend/content/main.html');
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))