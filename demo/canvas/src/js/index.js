;
(function(window) {
    function Chart(options) {
        //this.options = options;
        //this.init(options);
        this.colors = ['#F7695A', '#F97F4B', '#FC963C', '#FEAC2D', '#FEC335', '#FED93E', '#FED93E', '#DCE250', '#BBD35A', '#73CD8C', '#73CD8C', '#4ED6B3', '#28DEDB', '#2FCBE4', '#37B9ED', '#3EA6F6', '#5F83DF', '#8060C9', '#A13DB2', '#BE4C95', '#DA5A77', '#FF988F', '#FFA57F', '#FFB36E', '#FFC05E', '#FFD166', '#FFE36F', '#FFF477', '#E5E77F', '#CADA88', '#B0CD90', '#91D5AC', '#73DEC7', '#54E6E3', '#5DDAEC', '#67CEF5', '#70C2FE', '#85A3E7', '#9983D1', '#AE64BA', '#C975AC', '#E4879D'];
    }
    Chart.prototype = {
        //画图-柱状图
        drawChart_bar: function(id, data, xOffset, yOffset, gap, textsplit) {
            /**
             * 参数说明:
             * id-父容器id, data-图表数据, xOffset-X轴偏移量, yOffset-Y轴偏移量, gap-柱状间隔
             */
            //生成容器
            var parentContent = $('#' + id);
            var canvWid = parentContent.width();
            var canvHei = parentContent.height();
            // console.log('canvWid: ' + canvWid + '\ncanvHei: ' + canvHei);
            $('#' + id).append('<canvas id="' + id + '-bar" width="' + canvWid + 'px" height="' + canvHei + 'px"></canvas>');
            var canvas = document.getElementById(id + '-bar');
            if (!canvas) {
                return;
            }
            var ctx = canvas.getContext('2d');
            var colors = this.colors;
            //合成图表数据
            var chartData = this.getChartData(data, canvWid, canvHei, xOffset, yOffset, gap);
            // console.log(chartData);
            //基线
            var baseLineX1 = xOffset - 10 || 10,
                baseLineY1 = yOffset || 30,
                baseLineX2 = canvWid - 50,
                baseLineY2 = canvHei - yOffset;
            ctx.strokeStyle = '#CCC';
            ctx.moveTo(baseLineX1 + 0.5, baseLineY1 + 0.5);
            ctx.lineTo(baseLineX1 + 0.5, baseLineY2 + 0.5);
            ctx.lineTo(baseLineX2 + 0.5, baseLineY2 + 0.5);
            // stroke() 方法会实际地绘制出通过 moveTo() 和 lineTo() 方法定义的路径。默认颜色是黑色。
            ctx.stroke();
            //文字
            ctx.font = '';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            //循环数据渲染图形
            for (var i = 0; i < chartData.length; i++) {
                var dt = chartData[i];
                ctx.fillStyle = colors[i];
                ctx.fillRect(dt.x1, dt.y2 - dt.y1, dt.x2 - dt.x1, dt.y1);
                ctx.fillStyle = '#777';
                if (textsplit && dt.name.length > textsplit) {
                    dt.name = dt.name.substring(0, textsplit);
                }
                ctx.fillText(dt.name, dt.x1 + (dt.x2 - dt.x1) * 0.5, dt.y2 + 15);
                ctx.fillText(dt.amount, dt.x1 + (dt.x2 - dt.x1) * 0.5, dt.y2 - dt.y1 - 10);
            }
        },
        //画图-圆饼图
        drawChart_arc: function(id, data, radius) {
            /**
             * 参数说明:
             * id-父容器id, data-图表数据, radius-圆半径
             */
            //生成容器
            var parentContent = $('#' + id);
            var canvWid = parentContent.width();
            var canvHei = parentContent.height();
            $('#' + id).append('<canvas id="' + id + '-arc" width="' + canvWid + 'px" height="' + canvHei + 'px"></canvas>');
            var canvas = document.getElementById(id + '-arc');
            if (!canvas) {
                return;
            }
            var ctx = canvas.getContext('2d');
            var colors = this.colors;
            //合成图表数据
            var chartData = this.getChartData(data, canvWid, canvHei, 30, 50);
            // console.log(chartData);
            var starAngle = 0,
                endAngle = 0,
                centerX = canvWid / 4,
                centerY = canvHei / 2;
            //遍历数据渲染圆形
            // ctx.arc(x, y, radius, starAngle, endAngle, anticlockwise);
            for (var i = 0; i < data.length; i++) {
                var dt = data[i];
                //结束角
                endAngle = starAngle + Math.PI * 2 * dt.perAll;
                ctx.beginPath();
                ctx.moveTo(centerX, centerY);
                ctx.fillStyle = colors[i];
                ctx.arc(centerX, centerY, radius, starAngle, endAngle);
                ctx.closePath();
                ctx.fill();
                //计算起始角
                starAngle = starAngle + Math.PI * 2 * dt.perAll;
                //图例
                var LegendX = centerX * 2 + 50,
                    LegendY = -15;
                if (i < (data.length / 2)) {
                    LegendY = LegendY + centerY - 30 * (data.length / 2 - (i + 1));
                } else {
                    LegendY = LegendY + centerY + 30 * (i + 1 - data.length / 2);
                }
                // console.log(LegendX, LegendY);
                ctx.beginPath();
                ctx.moveTo(LegendX, LegendY);
                ctx.arc(LegendX, LegendY, 10, 0, Math.PI * 2 * 1);
                ctx.closePath();
                ctx.fill();
                //图例文字
                //文字
                ctx.font = '20px'; //字体大小，字体类型等
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillStyle = '#777';
                ctx.fillText(dt.name, LegendX + 40, LegendY);
                ctx.fillText(dt.amount, LegendX + 100, LegendY);
                ctx.fillText((dt.perAll * 100).toFixed(0) + '%', LegendX + 160, LegendY);
            }
            //中间闭合形成圆环
            ctx.beginPath();
            ctx.moveTo(centerX, centerY);
            ctx.fillStyle = '#F9F9F9';
            ctx.arc(centerX, centerY, radius * 0.65, 0, Math.PI * 2 * 1);
            ctx.closePath();
            ctx.fill();
        },
        //重组数据(柱状图)
        getChartData: function(data, contWid, contHei, xOffset, yOffset, gap) {
            //获取最大值和总值
            var maximum = 0,
                total = 0;
            for (var i = 0; i < data.length; i++) {
                total += Number(data[i].amount);
                if (Number(data[i].amount) > maximum) {
                    maximum = data[i].amount;
                }
            }
            // console.log('maximum: ' + maximum + '\ntotal: ' + total);
            //数据坐标系
            var x1, y1, x2, y2;
            xOffset = xOffset || 30;
            yOffset = yOffset || 30;
            gap = gap || 0;
            var perWid = contWid / data.length - 10;
            // ctx.fillRect('起始位置x', '起始位置y', '矩形宽', '矩形高');
            var xyArr = [],
                perMax, perAll, maxHei = contHei - yOffset * 2;
            for (var i = 0; i < data.length; i++) {
                perMax = (data[i].amount / maximum);
                perAll = (data[i].amount / total);
                // console.log('perMax: ' + perMax + '\nperAll: ' + perAll);
                xyArr.push({
                    x1: Math.round(perWid * (i + 1) - perWid + xOffset),
                    // y1: Math.round(contHei - contHei * perMax + yOffset),
                    y1: maxHei * perMax,
                    x2: Math.round(perWid * (i + 1) - perWid / 2 + xOffset + gap),
                    y2: contHei - yOffset,
                    perMax: perMax,
                    perAll: perAll
                });
            }
            return $.extend(true, data, xyArr);
        }
    };
    window.Chart = Chart;
}(window));
//模拟数据
var charData = {
    code: 0,
    message: '产品交易额',
    data: [{
        name: '产品1',
        amount: '7000'
    }, {
        name: '产品2',
        amount: '6000'
    }, {
        name: '产品3',
        amount: '4000'
    }, {
        name: '产品4',
        amount: '6000'
    }, {
        name: '产品5',
        amount: '5000'
    }, {
        name: '产品6',
        amount: '7000'
    }, {
        name: '产品7',
        amount: '9000'
    }]
};
var chart = new Chart();
chart.drawChart_bar('chart-bar', charData.data, 50, 30);
chart.drawChart_arc('chart-arc', charData.data, 100);