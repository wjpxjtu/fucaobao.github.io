;
$(function () {
    function getQuery(name, str) {
        var u = str || window.location.search,
            reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)'),
            r = u.substr(u.indexOf('\?') + 1).match(reg);
        return r != null ? r[2] : '';
    }

    var currentPage = getQuery('page', window.location.hash.substring(1)) || 1;//当前页面

    $(document)
    .on('click', '.body .nav li', function(){
        var $this = $(this);
        $this.addClass('active').siblings('li').removeClass('active');
    })
    .on('click', '.demos li', function () {
        var $this = $(this);
        var p = $this.attr('data-p'),
            t = $this.attr('data-t'),
            n = $this.attr('data-n');
        window.location.href = '../page/detail.html?p=' + p + '&t=' + t + '&n=' + n;
    })
    .on('click', '.page .left', function () {
        var total = +$('.page .num').attr('data-total'),
            num = +$('.page .num li.active').attr('data-num');
        if (num > 1) {
            changePage(num - 1);
            $('.page .num li').eq(num - 2).addClass('active').siblings('li').removeClass('active');
        }
    })
    .on('click', '.page .right', function () {
        var total = +$('.page .num').attr('data-total'),
            num = +$('.page .num li.active').attr('data-num');
        if (num < total) {
            changePage(num + 1);
            $('.page .num li').eq(num).addClass('active').siblings('li').removeClass('active');
        }
    })
    .on('click', '.page .num li', function () {
        var dest = +$(this).attr('data-num'),
            total = +$('.page .num').attr('data-total'),
            num = +$('.page .num li.active').attr('data-num');
        if (dest != num) {
            changePage(dest);
            $('.page .num li').eq(dest - 1).addClass('active').siblings('li').removeClass('active');
        }
    });

    var $selector = $('.demos li'),
        len = $selector.length,
        maxPage = Math.ceil(len / 10);

    function changePage(page) {
        page = page || currentPage;
        if (currentPage > maxPage) {
            page = 1;
        }
        [].forEach.call($selector, function (item, index) {
            if ((index >= 10 * (page - 1)) && (index < 10 * page)) {
                $(item).removeClass('dn');
            } else {
                $(item).addClass('dn');
            }
        });
        window.location.hash = '#page=' + page;
    }
    changePage();
    var pageList = [];
    for (var i = 0; i < maxPage; i++) {
        if (currentPage > maxPage && i === 0) {
            pageList.push('<li class="active" data-num="1"></li>');
        } else if (i + 1 == currentPage) {
            pageList.push('<li class="active" data-num="' + (i + 1) + '"></li>');
        } else {
            pageList.push('<li data-num="' + (i + 1) + '"></li>');
        }
    }
    $('.page .num').attr('data-total', pageList.length).html(pageList.join(''));
});