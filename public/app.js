$('#showIt').on('click', function() {

    $('.articlesHere').empty();

    $.getJSON('/all', function(data) {



        for (var i = 0; data.length; i++) {
            $('.articlesHere').append('<div> <p class="title">' + data[i].title + '</p class="author">' + '<p> By: ' + data[i].author + '</p>' + '<img data-toggle="modal" data-target="#myModal" class=imgArticle src=' + data[i].image + ' />' + "<p> " + data[i].body + '</p> </div>');



            // $('.modalTitle').append("<h1 class='idk'>" + data[i].title + "</h1>");
            // $('.modal-body').append("<h1> " + data[i].body + "</h1");


            // $('.imgArticle').on('click', function() {


            // });
        };
    });


});



$('#scrapeIt').on('click', function() {

    $.getJSON('/scrape');
});


// $ heroku config:get MONGODB_URI
// mongodb://heroku_t45plb8s:68lu1bj7pqgtot41i25tfprjmi@ds139082.mlab.com:39082/heroku_t45plb8s
