webpackJsonp([17],{I46d:function(t,s,e){"use strict";Object.defineProperty(s,"__esModule",{value:!0});var a={data:function(){return{list:[]}},created:function(){this._getTradeRecordList()},methods:{back:function(){this.$router.back()},_getTradeRecordList:function(){for(var t=0;t<20;t++){this.list.push({time:"2018-02-07",traderNo:"2018020710000",reduce:"200",num:"2000.00"})}}},components:{Scroll:e("qwAB").a}},i={render:function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("transition",{attrs:{name:"slide"}},[e("div",{staticClass:"wrapper"},[e("div",{staticClass:"header"},[e("i",{staticClass:"back",on:{click:t.back}}),t._v(" "),e("span",{staticClass:"text"},[t._v("交易记录")])]),t._v(" "),e("div",{staticClass:"content-wrapper"},[e("scroll",{staticClass:"content"},[e("ul",{staticClass:"list"},t._l(t.list,function(s,a){return e("li",{staticClass:"item"},[e("div",{staticClass:"order"},[e("label",[t._v(t._s(s.time))]),t._v(" "),e("span",[t._v(t._s(s.tradeNo))])]),t._v(" "),e("div",{staticClass:"money"},[e("div",{staticClass:"reduce"},[e("label",[t._v("扣除补贴：")]),t._v(" "),e("span",[t._v(t._s(s.reduce))])]),t._v(" "),e("div",{staticClass:"num"},[t._v("\n                "+t._s(s.num)+"\n              ")])])])}))])],1)])])},staticRenderFns:[]};var n=e("VU/8")(a,i,!1,function(t){e("qeoQ")},"data-v-5f7e36a3",null);s.default=n.exports},qeoQ:function(t,s){}});
//# sourceMappingURL=17.2aa719a133212bc685a1.js.map