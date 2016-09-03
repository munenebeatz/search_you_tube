/**
 * Created by CORDELIA on 31-Aug-16.
 */

(function ($){
    //searchField animation
    searchFieldAnimation();
    //for fancybox
    activateFancy();

    //prevent formSubmission
    stopFormSubmit();
})(jQuery);


function activateFancy(){
    $('.fancy').fancybox();
}

function searchFieldAnimation(){
    //searchbar handler
    var searchField = $('#query'),
        icon = $('#search-btn'),
        animateSpeed = 300;

    searchField.on('focus', function () {
        $(this).animate({
            width: '100%'
        },animateSpeed);
        icon.animate({
            right: '10px',
            opacity: 0.5
        },animateSpeed*2.5);
    });

    searchField.on('blur', function () {
        if(searchField.val() == ''){
            $(this).animate({
                width:  '45%'
            },animateSpeed);
            icon.animate({
                right: '360px',
                opacity: 0.5
            },animateSpeed);
        }
    });
}

function stopFormSubmit(){
    $('#search-form').on('submit',function (e){
        e.preventDefault();
    });
}

function getOutput(item){
    var videoID = item.id.videoId,title = item.snippet.title,
        description = item.snippet.description,channelTitle = item.snippet.channelTitle,
        thumb = item.snippet.thumbnails.high.url,videoDate = item.snippet.publishedAt;

    var output = '<li>';
    output += '<div class="list-left">';
        output += '<img src="'+thumb+'"/>';
    output += '</div>';
    output += '<div class="list-right">';
        output += '<h3>'+title+'</h3>';
        output += '<small> By <span class="cTitle">'+channelTitle+'</span> on '+videoDate+'</small>';
        output += '<p>'+description+'</p>';
    output += '</div>';
    output += '</li>';
    output += '<div class="cf"></div>';

    return output;
}

function getButtons(prev, next){
    var btnOutput = '';

    if(!prev){
        btnOutput = '<div class="button-container">';
        btnOutput += '<button id="next-button" class="paging-button" data-query="q" data-token="'+next+'" onclick="return nextPage();">';
        btnOutput += 'Next Page</button>';
        btnOutput += '</div>';
    }else{
        btnOutput = '<div class="button-container">';
        btnOutput += '<button id="prev-button" class="paging-button" data-query="q" data-token="'+prev+'" onclick="return prevPage();">';
        btnOutput += 'Prev Page</button>';

        btnOutput += '<button id="next-button" class="paging-button" data-query="q" data-token="'+next+'" onclick="return nextPage();">';
        btnOutput += 'Next Page</button>';
        btnOutput += '</div>';
    }

    return btnOutput;
}

function nextPage(){
    console.log('NEXT page');
    return;
}

function prevPage(){
    return;
}

function search(){
    //clear results
    $('#results').html('');
    $('#buttons').html('');

    //Get form input
    var q = $('#query').val();

    //Run GET request on YouTube API
    $.get(
        'https://www.googleapis.com/youtube/v3/search',{
            part: 'snippet, id',
            q: q,
            type: 'video',
            key: ' AIzaSyBgsSYN2Gq-3GPvo7gONAtw-PYtVyIEtKQ'},
        function (data) {
            var nextPageToken, prevPageToken;
            nextPageToken = data.nextPageToken;
            prevPageToken = data.prevPageToken;

            console.log(data);

            $.each(data.items, function (i, item) {
                //Get Results
                var output = getOutput(item);

                //Display Rsults
                $('#results').append(output);
            });

            var buttons = getButtons(prevPageToken, nextPageToken);
            //display buttons
            $('#buttons').append(buttons);
        }

    );
}