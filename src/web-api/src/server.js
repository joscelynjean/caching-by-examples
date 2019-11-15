const express = require('express');
const cors = require('cors');
const app = express();
const mung = require('express-mung');

// CORS
const corsOptions = {
    origin: '*'
};
app.use(cors(corsOptions));

// Console body
app.use(mung.json(
    function transform(body, req, res) {
        console.log(`${req.url} [${res.statusCode}] ${JSON.stringify(body)}`);
        return body;
    }
));

app.get('/cached-resources/:id', function(req, res) {
    res.set('Cache-Control', 'public, max-age=30')
    res.set('Etag', '12345');

    let cached = false;
    if(req.header('if-none-match')) {
        const ifNoneMatch = req.header('if-none-match');
        console.log('if-none-match = ' + ifNoneMatch);
        if(ifNoneMatch == 12345) {
            console.log('Cached!!!');
            cached = true;
            res.statusCode = 304;
            res.json();
        }
    }

    if(!cached) {
        res.statusCode = 200;
        res.json({
            id: req.params.id,
            version: '12345'
        })
    }
});

app.listen(3000, function() {
    console.log('Listening on 3000!');
});