;
(function() {
    window.MAP = {
        'home': '../page/home.html',
        'projects': '../page/projects.html',
        'loopart': '../page/loopart.html',
        'aboutus': '../page/aboutus.html',
        'news': '../page/news.html',
        'contactus': '../page/contactus.html'
    };
    $(document).on('click', '.header .nav li', function() {
        var $this = $(this),
            link = $this.attr('data-eng');
        if ($this.hasClass('active')) {
            return;
        }
        var route = link.replace(/\W+/g, '').toLowerCase();
        window.location.href = MAP[route];
    });

    function loadscript(url, cb) {
        var script = document.createElement('script');
        script.onload = function() {
            script.onload = null;
            typeof cb === 'function' && cb();
        };
        script.src = url;
        document.getElementsByTagName('head')[0].appendChild(script);
    }
})();