;
$(function() {
    var MAP = {
        bchx: 4,
        gdbs: 2,
        sygjsd: 6,
        syhtw: 8
    };

    var loading = '../images/loading.gif';

    function loadImage(src) {
        var img = new Image();
        img.src = src;
    }
    for (var key in MAP) {
        for (var i = 0; i < MAP[key]; i++) {
            var src = '../images/news/' + key + '/' + (i + 1) + '.jpg';
            loadImage(src);
        }
    }

    window.imgOnload = function() {
        var el = arguments[0];
        $(el).closest('li.loading').removeClass('loading');
    };

    $(document).on('click', '.more', function() {
        var $this = $(this);
        var type = $this.closest('li').attr('data-type');
        if (!MAP.hasOwnProperty(type)) {
            return;
        }
        var list = [];
        var $selector = $this.closest('.detail').siblings('.img').find('.more-img');
        if ($selector.is(':hidden')) {
            $this.text('折叠');
            if (!$selector.find('li').length) {
                for (var i = 0; i < MAP[type]; i++) {
                    var src = '../images/news/' + type + '/' + (i + 1) + '.jpg';
                    list.push('<li class="loading"><img src="' + src + '" onload="imgOnload(this)"/></li>');
                }
                $selector.html(list.join(''));
            }
            $selector.fadeIn();
        } else {
            $this.text('更多');
            $selector.fadeOut();
        }
    });
});