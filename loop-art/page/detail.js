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
            real: 8
        },
        bletgy: {
            design: 8,
            real: 0
        },
        gssq: {
            design: 9,
            real: 0
        },
        yxxc: {
            design: 10,
            real: 0
        },
        sygjsd: {
            design: 10,
            real: 0
        }
    };
    var projectDescMap = {
        bchx: {
            chn :{
                title:'深圳前海湾宝创紅禧公馆展示区景观设计',
                desc: '宝创紅禧公馆展示区景观设计是一个位于固戍红湾村的城市更新项目，这个曾经的小渔村，30年来见证了深圳的飞速发展，原来临海而渔的村落随着不断的填海逐渐变成内陆，沧海变桑田，新一代的居民已渐渐遗忘了傍海的生活。设计师旨在找回“红湾村”对大海的记忆，以红树林和前海湾为设计灵感，滨海湾区文化衍生出独特的装置艺术，为原本空间局促的展示区，成功的打造出充满时尚感与艺术感的商业街区空间。路口醒目的“红树林”艺术装置，在整面垂直绿化墙的衬托下，纯白无暇，夜幕降临更是光彩夺目，仿佛村口老树一般稳稳矗立；流线型的铺装系统，浪淘沙与浪花白的交相跳跃，仿佛能听见海浪声，大海以艺术的形式再一次与红湾村相遇，唤起居民们对海的原始记忆。'
            },
            eng :{
                title:'Baochuang hongxi gongguan exhibition area landscape design of Qianhai Bay, Shenzhen',
                desc: 'This is a urban renewal projects which is located in Hongwan village，Gushu. The former fishing village, 30 years witnessed the fast development of shenzhen, the fishing villages became inland after reclaiming land from sea years by years, a new generation of people have gradually forgotten the seafront life.<br/>Designers aims to find the memory of the sea, mangrove and Qianhai bay as the design inspiration, coastal bay culture become the unique art installation,successful create fashion sense and artistic commercial space for the exhibition area.<br/>The eye-catching "mangrove" art installation is pure white, in front of the vertical green wall,it is more dazzling when the night fall;Streamlined paving system, two kind of wave details granite, the sea in the form of art met Hongwan village again.'
            }
        },
        bletgy: {
            chn :{
                title:'深圳白鹭儿童公园景观设计',
                desc: '深圳白鹭儿童公园，旨在唤起城市对红树林与大白鹭的记忆，同时为整个前海湾区域创建识别性、互动性及原创性的白鹭互动艺术装置，打造一个自然生动环保的口袋儿童公园，提供一个“与白鹭为友”的儿童成长空间。'
            },
            eng :{
                title:'Shenzhen Egret Children\'s Park landscape design',
                desc: 'Shenzhen egrets children\'s park, aims to arouse the city memories of mangroves and great, at the same time create a attractive，interactive,original installation art for Qianhai bay area, create a green natural pocket park, provides a "Be friends with egrets" children growth space.'
            }
        },
        gssq: {
            chn :{
                title:'深圳固戍社区活动中心景观设计',
                desc: '固戍社区活动中心，作为社区文化活动设施的同时，提供了重建社区邻里文化及城市精神文化的契机以及面向社区开放共享的公共服务空间。在这块三角形场地中，设计师以“文化宝盒”为概念，使柔和的建筑形体有机融入，充分利用屋顶空间，将地面景观与屋顶花园打造为一个趣味的整体性立体景观系统。室内功能布局在满足文化运动等基本需求的前提下，加入了可经营性的茶座空间，为项目增加了可持续的活力。'
            },
            eng :{
                title:'Shenzhen Gushu community center landscape design',
                desc: 'The project not only provides facilities for community cultural activities, Project aims to create urban open public stage, increase urban vitality, become a unique Landmark of the City.The project provide comfortable space and attracts the citizens.The citizens can entertain, exercise and enjoy the cityscape.'
            }
        },
        yxxc: {
            chn :{
                title:'深圳龙华逸秀新村人行天桥景观设计',
                desc: '逸秀新村人行天桥景观设计，设计师从场地出发，以比邻的音乐公园为灵感的延续，律动感的设计语言，有效的消解了原桁架结构的笨重感，使人行天桥得以”重生”。设计师以创意为本，经济实用，易维护为原则，参数化的立面设计，大气动感的灯光效果，精致及人性化的的细节思考，全方位的为龙华中心区创造了一个崭新的门户地标。'
            },
            eng :{
                title:'Shenzhen Longhua Yixiu xincun pedestrian bridge landscape design',
                desc: 'Designer research the site and the music park nearby. Find the Idea from the music rhythm. Reduce the heavy sense of the original trusswork structure. Make the pedestrian bridge rebirth as a new landmark of Longhua district.'
            }
        },
        sygjsd: {
            chn :{
                title:'三亚国家水稻公园景观设计',
                desc: '项目位于海棠湾国家海岸，作为农旅融合示范项目，以绿油油、金灿灿地水稻和南繁育种为载体，刷新着三亚旅游市场的纵深。设计师首要的挑战是挖掘水稻的旅游及景观价值，将设计融入自然，利用水稻等自然景观元素打造符合三亚乡土文化的农业旅游新体验。海鲜广场屋顶花园设计，优雅起伏的“麦浪”屋顶，海鲜雅座与广阔的稻田之间用独特的旋转构筑连接，增强步入稻田的体验感，也提供了更浪漫的悬空VIP景观雅座，夜晚浪漫迷醉的田野景致，令人难忘的稻田海鲜大餐体验。'
            },
            eng :{
                title:'Hainan Sanya rice national park landscape design',
                desc: 'The project is located on the national coast of Haitang bay, as a demonstration project of the integration of agriculture and tourism, the project has been extent the range of sanya tourism market with rice and south breeding center.The first challenge for designers is to explore the tourism and landscape value of rice, integrate design into nature, and use natural landscape elements such as rice to create a new agricultural tourism experience that conforms to the local culture of Sanya.'
            }
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
    if (projectDescMap[p] && projectDescMap[p].chn && projectDescMap[p].eng) {
        var $selector = $('.body .content .detail');
        $selector.find('.chn .title p').html(projectDescMap[p].chn.title);
        $selector.find('.chn .desc p').html(projectDescMap[p].chn.desc);
        $selector.find('.eng .title p').html(projectDescMap[p].eng.title);
        $selector.find('.eng .desc p').html(projectDescMap[p].eng.desc);
    }
    if (projectMap[p] && projectMap[p].design) {
        for (var i = 1; i <= projectMap[p].design; i++) {
            images.push(parent + 'design/' + i + f);
        }
    }
    if (projectMap[p] && projectMap[p].real) {
        for (var j = 1; j <= projectMap[p].real; j++) {
            images.push(parent + 'real/' + j + f);
        }
    }
    var INIT_NUM = 5;//初始加载图片数量
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
                afterImgs.push('<img src="' + arr[i] + '"/>');
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
        $('.content .detail').fadeToggle(1000);
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