$(function(){
    var path = '../images/aboutus-bg.png';
    loadImage(path, function(){
        $('.body .img-wrapper').removeClass('loading').find('img').attr('src', path);
    });
});