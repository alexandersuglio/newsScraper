var express = require('express');
var app = express();
var mongojs = require('mongojs');
var databaseUrl = 'scraper';
var collections = ['articles'];
var db = mongojs(databaseUrl, collections);

var request = require('request');
var cheerio = require('cheerio');
db.on('error', function(error) {
    console.log('Database error', error);
})
app.use(express.static("public"));
var url = ['http://www.latimes.com/business/la-fi-wholefoods-stock-bidding-20170619-story.html', 'http://www.latimes.com/nation/la-na-pol-gop-baseball-shooting-20170614-story.html', 'http://www.latimes.com/local/lanow/la-me-ln-carrie-fisher-autopsy-report-20170619-story.html', 'http://www.latimes.com/local/california/la-me-playboys-church-20170620-story.html'];

var bodyParser = require("body-parser");
var path = require('path');


var PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));


app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/scrape', function(req, res) {
    for (var i = 0; i < url.length; i++) {

        request(url[i], function(err, res, body) {
            var $ = cheerio.load(body);
            var title = $('.trb_ar_hl_t ');
            var titleText = title.text();

            var author = $('.trb_ar_by_nm_au');
            var authorText = author.text();

            var img = $('.trb_em_ic_img');
            var imgLink = img.attr('data-baseurl');

            if (imgLink === undefined) {

                var imgLink = 'http://ipinfrapower.com/images/Img%20not%20available.png';
            };

            var body = $('.trb_ar_page p');
            var bodyText = body.text();

// var id = 4;

            var article = {
                // id: id,
                title: titleText,
                author: authorText,
                image: imgLink,
                body: bodyText
            }

            var idk = db.articles.insert(article, function(err, doc) {

                if (err) {
                    console.log(err);
                } else {
                    console.log(doc);
                }

            });
        });

    };
    res.end();
});


app.get('/all', function(req, res) {

    db.articles.find({}, function(error, found) {

        if (error) {
            console.log(error);
        } else {
            res.json(found);
        }
    })

})

app.listen(PORT, function() {
    console.log('app connected and listening');
});
