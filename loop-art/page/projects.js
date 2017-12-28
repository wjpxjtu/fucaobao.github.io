;
$(function () {
    $(document)
    .on('click', '.body .nav li', function(){
        var $this = $(this);
        $this.addClass('active').siblings('li').removeClass('active');
    })
    .on('click', '.demos li', function () {
        var $this = $(this);
        var p = $this.attr('data-p'),
            t = $this.attr('data-t');
        window.location.href = '../page/detail.html?p=' + p + '&t=' + t;
    })
    ;
});