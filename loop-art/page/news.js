;
$(function() {
    var MAP = {
        bchx: 4,
        gdbs: 2,
        sygjsd: 6,
        syhtw: 8
    };

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

    $(document).on('click', '.more', function() {
        var $this = $(this);
        var type = $this.closest('li').attr('data-type');
        if (!MAP.hasOwnProperty(type)) {
            return;
        }
    });
});