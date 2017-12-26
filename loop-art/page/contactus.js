$(function(){
    var path = '../images/map.jpg';
    loadImage(path, function(){
        $('.body .img-wrapper').removeClass('loading').find('img').attr('src', path);
    });
});