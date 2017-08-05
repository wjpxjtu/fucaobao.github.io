// 监听事件
// 每调用一次{{}}表达式，执行new Watcher()一次，期间，只执行this.depIds = []一次
// 下一次调用的时候，重新new Watcher()，然后重置this.depIds为[]
function Watcher(exp, vm, cb) {
    this.depIds = [];
    this.exp = exp;
    this.cb = cb;
    this.vm = vm;
    //初始化时，触发添加到监听队列
    this.value = null;
    this.getter = this.parseGetter(exp);
    this.update();
}
Watcher.prototype = {
    get: function() {
        Dep.target = this; //将当前订阅者指向自己
        /*
        这里的访问会逐级触发get，有两个作用
        1.在Watcher初始化时调用get，会逐级将自己添加到对象的监听列表中，如要监听a.b.c，则a、a.b、a.b.c的监听列表中都会添加这个Watcher
         这样做的目的是，在上级数据被修改时，也能接收到通知，如a.b = {c:1}时，原c元素被覆盖，不会发出变动通知，而b则会；
        2.同样是上述情况，新添加的c元素，需要添加监听原来c元素的Watcher到自己的监听列表中，在这个Watcher接收到b过来的通知时，会去取a.b.c的值与原值比较是否发生变动，
         这个取的过程中，触发新的c的get，就会添加到c的监听队列
        */
        let value = this.getter(this.vm); //触发getter，将自身添加到dep中，这里会调用Observer.js里面的get方法
        Dep.target = null; //添加成功后，重置
        return value;
    },
    addDep: function(dep) {
        var uid = dep.uid;
        if (this.depIds.indexOf(uid) === -1) {
            this.depIds.push(uid);
            dep.addSub(this);
        }
    },
    update: function() {
        let newVal = this.get();
        if (this.value !== newVal) {
            // 将newVal, oldVal挂载到MVVM实例上
            this.cb && this.cb(newVal, this.value);
            this.value = newVal;
        }
    },
    parseGetter: function(exp) {
        if (/[^\w.$]/.test(exp)) return;
        let exps = exp.split('.');
        // 简易的循环依赖处理
        return function(obj) {
            for (let i = 0, len = exps.length; i < len; i++) {
                if (!obj) return;
                obj = obj[exps[i]];
            }
            return obj;
        };
    }
};