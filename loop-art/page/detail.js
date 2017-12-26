;
$(function () {
    //获取URL中的值
    function getQuery(name, url) {
        var u = url || window.location.search,
            reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)'),
            r = u.substr(u.indexOf('\?') + 1).match(reg);
        return r != null ? r[2] : '';
    }
    var p = getQuery('p'),
        t = getQuery('t'),
        n = getQuery('n'),
        f = '.jpg';
    var path = '../images/projects/' + p + '/' + t + '/' + n + f;
    loadImage(path, function(){
        $('.content>.img-wrapper').removeClass('loading').find('img').attr('src', path);
    });

    $(document)
    .on('click', '.more', function(){
        $(this).toggleClass('active');
        $('.content .detail').toggleClass('dn');
    })
    .on('click', '.second', function(){
        window.location.href = MAP['projects'];
    });
});