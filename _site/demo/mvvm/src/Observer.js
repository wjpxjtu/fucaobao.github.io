/**
 Observer是将输入的Plain Object进行处理,利用Object.defineProperty转化为getter与setter,从而在赋值与取值时进行拦截
 这是Vue响应式框架的基础
 */
function isObject(obj) {
    return obj != null && typeof obj === 'object';
}

function isPlainObject(obj) {
    return Object.prototype.toString(obj) == '[object Object]';
}

function observe(data) {
    if (!isObject(data) || !isPlainObject(data)) {
        return;
    }
    return new Observer(data);
}

function Observer(data) {
    this.dep = new Dep();
    this.data = data;
    this.walk(data);
}
Observer.prototype.walk = function(data) {
    let self = this;
    Object.keys(data).forEach(function(key) {
        self.defineReactive(data, key, data[key]);
    });
};
Observer.prototype.defineReactive = function(data, key, value) {
    // 同一个key对应同一个dep，同一个this.subs
    let dep = new Dep();
    let childOb = observe(value);
    // 这里是递归，将b.c.d observer完后，倒序d->c->b defineProperty
    // 例如{b:{c:{d:1}}}observer后，倒序defineProperty {d:1} {c:{d:1}} {b:{c:{d:1}}}
    Object.defineProperty(data, key, {
        enumerable: true,
        configurable: false,
        get: function() {
            // 如果Dep.target这里不为null，说明是Watcher引起的，不是我们自己在查看赋值
            if (Dep.target) {
                //JS的浏览器单线程特性，保证这个全局变量在同一时间内，只会有同一个监听器使用
                dep.depend();

                if (childOb) {
                    childOb.dep.depend();
                }
            }
            return value;
        },
        set: function(newVal) {
            if (newVal == value) {
                return;
            }
            //修改value,get取值时也会变化
            //不能使用data[key]=newVal
            //因为在set中继续调用set赋值，引起递归调用
            value = newVal;
            //监视新值
            childOb = observe(newVal);
            dep.notify();
        }
    });
};