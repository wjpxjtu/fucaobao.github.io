;
$(function () {
    function loadImages(sources, cb) {
        var count = 0,
            imgNum = sources.length;
        for (var i = 0; i < sources.length; i++) {
            var src = sources[i];
            var image = new Image();
            image.onload = function () {
                if (++count >= imgNum) {
                    typeof cb === 'function' && cb(sources);
                }
            };
            image.src = src;
        }
    }
    var projectMap = {
        bchx: {
            design: 10,
            real: 9
        }
    };
    //获取URL中的值
    function getQuery(name, url) {
        var u = url || window.location.search,
            reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)'),
            r = u.substr(u.indexOf('\?') + 1).match(reg);
        return r != null ? r[2] : '';
    }
    var p = getQuery('p'),
        f = '.jpg';
    var parent = '../images/projects/' + p + '/';
    var images = [];
    for (var i = 1; i <= projectMap[p].design; i++) {
        images.push(parent + 'design/' + i + f);
    }
    for (var j = 1; j <= projectMap[p].real; j++) {
        images.push(parent + 'real/' + j + f);
    }
    loadImages(images, function(list){
        console.log(list);
    });
    $(document)
    .on('click', '.more', function () {
        $(this).toggleClass('active');
        $('.content .detail').toggleClass('dn');
    })
    .on('click', '.second', function () {
        window.location.href = MAP['projects'];
    });
});