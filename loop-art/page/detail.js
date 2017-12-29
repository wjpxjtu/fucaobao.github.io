;
$(function () {
    function loadImage(src, cb) {
        var image = new Image();
        image.onload = function () {
            typeof cb === 'function' && cb(src);
        };
        image.src = src;
    }
    function loadImages(sources, cb) {
        var count = 0,
            imgNum = sources.length;
        for (var i = 0; i < sources.length; i++) {
            loadImage(sources[i], function(){
                if (++count >= imgNum) {
                    typeof cb === 'function' && cb(sources);
                }
            });
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

    var INIT_NUM = 4;//初始加载图片数量
    var preLoadImages = images.slice(0, INIT_NUM),
        afterLoadImages = images.slice(INIT_NUM);
    loadImages(preLoadImages, function(list){
        var imgs = [],
            dots = [],
            len = list.length;
        for (var i = 0; i < len; i++) {
            imgs.push('<img src="' + list[i] + '"' + (i === 0 ? ' style="display:block;opacity:1;"' : '') + '/>');
            dots.push('<li' + (i === 0 ? ' class="active"' : '') + '></li>');
        }
        $('.content .img-wrapper').removeClass('loading').append(imgs.join(''));
        $('.content .slide').append(dots.join('')).css({
            'width': len * 25 + 'px',
            'margin-left': (- len * 12.5) + 'px'
        });

        loadImages(afterLoadImages, function (arr) {
            var afterImgs = [],
                afterDots = [],
                length = images.length;
            for (var i = 0; i < arr.length; i++) {
                afterImgs.push('<img src="' + arr[i] + '")/>');
                afterDots.push('<li></li>');
            }
            $('.content .img-wrapper').append(afterImgs.join(''));
            $('.content .slide').append(afterDots.join('')).css({
                'width': length * 25 + 'px',
                'margin-left': (- length * 12.5) + 'px'
            });
            doCycle();
        });
    });

    function doCycle() {
        $('.img-wrapper').cycle({
            fx: 'fade',
            timeout: 5000,
            speed: 1000,
            before: function (curr, next) {
                var index = $(next).index();
                $('.content .slide li').eq(index).addClass('active').siblings('li').removeClass('active');
            }
        });
    }
    $(document)
    .on('click', '.more', function () {
        $(this).toggleClass('active');
        $('.content .detail').toggleClass('dn');
    })
    .on('click', '.second', function () {
        window.location.href = MAP['projects'];
    })
    .on('click', '.content .slide li', function () {
        var $this = $(this),
            index = $this.index();
        $this.addClass('active').siblings('li').removeClass('active');
        $('.img-wrapper img').eq(index).css({
            opacity: 1,
            display: 'block'
        }).siblings('img').css({
            opacity: 0,
            display: 'none'
        });
    });
});