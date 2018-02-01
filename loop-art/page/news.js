;
$(function() {
    var MAP = {
        bchx: 4,
        gdbs: 2,
        sygjsd: 6,
        syhtw: 8
    };

    $(document).on('click', '.more', function() {
        var $this = $(this);
        var type = $this.closest('li').attr('data-type');
        if (!MAP.hasOwnProperty(type)) {
            return;
        }
    });
});