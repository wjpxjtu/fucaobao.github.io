;
$(function() {
    var TEXT_MAP = {
        '0':'固戍社区活动中心，作为社区文化活动设施的同时，提供了重建社区邻里文化及城市精神文化的契机以及面向社区的开放共享的公共服务空间。',
        '1':'逸秀新村人行天桥景观设计，用律动感的设计，有效的消解了原桁架结构的笨重感，与立面呼应的富有韵律感的灯光设计，<br>使人行天桥得以”重生”，成为龙华中心区的门户地标。',
        '2':'前海湾宝创紅禧公馆展示区,以前海湾及红树林为设计灵感，滨海湾区文化衍生出独特的装置艺术，<br>为原本空间局促的展示区，成功的打造出充满时尚感与艺术感的街区空间。',
        '3':'三亚国家水稻公园海鲜广场屋顶花园，优雅起伏的“麦浪”屋顶，海鲜雅座与广阔的稻田之间用独特的旋转构筑连接，增强步入稻田的体验感，<br>也提供了更浪漫的悬空VIP景观雅座，夜晚浪漫迷醉的田野景致，令人难忘的稻田海鲜大餐体验。',
        '4':'固戍白鹭公园，旨在唤起城市对红树林与大白鹭的记忆，同时为整个前海湾区域创建识别性、互动性及原创性的白鹭互动艺术装置，<br>打造一个自然生动环保的口袋儿童公园。'
    };
    $('#slideshow').cycle({
        fx: 'fade',
        timeout: 5000,
        speed: 1000,
        before: function(curr, next) {
            var index = $(next).index();
            $('.footer .page li').eq(index).addClass('active').siblings('li').removeClass('active');
            $('.footer .desc').html(TEXT_MAP[index]);
        }
    });
    $(document).on('click', '.footer .page li', function() {
        var $this = $(this),
            index = $this.index();
        $this.addClass('active').siblings('li').removeClass('active');
        $('.footer .desc').html(TEXT_MAP[index]);
        $('#slideshow img').eq(index).css({
            opacity: 1,
            display: 'block'
        }).siblings('img').css({
            opacity: 0,
            display: 'none'
        });
    });
});