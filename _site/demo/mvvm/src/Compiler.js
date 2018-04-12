/*
    Compiler将DOM元素解析，找出指令与占位符，建立Watcher，注册到Observer的监听队列中，在接收到通知后，
    根据不同的指令，进行更新DOM等不同处理
*/
function Compiler(el, vm) {
    this.el = CompileUtil.isNodeElement(el) ? el : document.querySelector(el);
    this.vm = vm;
    if (this.el) {
        // 文档碎片，遍历过程中会有多次的dom操作，为提高性能先将el节点转化为fragment文档碎片进行解析操作
        // 解析操作完成，将其添加回真实dom节点中
        this.fragment = this.nodeToFragment(this.el);
        this.compile(this.fragment);
        this.el.appendChild(this.fragment);
    }
}
Compiler.prototype = {
    nodeToFragment: function(el) {
        let child,
            fragment = document.createDocumentFragment();
        while (child = el.firstChild) {
            fragment.appendChild(child);
        }
        return fragment;
    },
    compile: function(el) {
        let self = this,
            childNodes = el.childNodes;
        if (CompileUtil.isNodeElement(el)) {
            self.compileNodeElement(el);
        } else if (CompileUtil.isTextElement(el)) {
            self.compileTextElement(el);
        }
        if (childNodes && childNodes.length) {
            //使用slice进行浅复制，生成一个新的数组，不会修改原数组childNodes。
            [].slice.call(childNodes).forEach(function(node) {
                self.compile(node);
            });
        }
    },
    compileNodeElement: function(el) {
        let self = this,
            attrs = el.attributes;
        [].forEach.call(attrs, function(attr) {
            let name = attr.name,
                exp = attr.value;
            if (CompileUtil.isDirective(name)) {
                let directive = name.substr(2);
                if (CompileUtil.isEventDirective(directive)) {
                    let eventType = directive.substr(3);
                    CompileUtil.handleEvent(el, self.vm, eventType, exp);
                } else {
                    self[directive] && self[directive](el, exp);
                }
            }
        });
    },
    compileTextElement: function(el) {
        let reg = /\{\{(.*?)\}\}/g,
            match;
        //因为TextElement中，可能不只有占位符，而是普通文本与占位符的混合，如下
        //1{{a}}2{{b}}3
        let lastIndex = 0,
            normalText;
        let content = el.textContent;
        if (!content.match(reg)) return; //没有绑定数据，不处理
        let element,
            fragment = document.createDocumentFragment();
        // exec用法参见http://www.w3school.com.cn/jsref/jsref_exec_regexp.asp
        while (match = reg.exec(content)) {
            if (match.index > lastIndex) { //普通文本
                normalText = content.slice(lastIndex, match.index);
                element = document.createTextNode(normalText);
                fragment.appendChild(element);
            }
            lastIndex = reg.lastIndex;
            //占位符
            let exp = match[1];
            element = document.createTextNode('');
            fragment.appendChild(element);
            //绑定占位符与表达式
            // debugger
            this.bind(element, exp, 'text');
        }
        if (lastIndex < content.length - 1) {
            //剩余的普通文本
            normalText = content.slice(lastIndex);
            element = document.createTextNode(normalText);
            fragment.appendChild(element);
        }
        this.replaceElement(el, fragment);
    },
    replaceElement: function(el, fragment) {
        el.parentNode.replaceChild(fragment, el);
    },
    model: function(node, exp) {
        let self = this,
            val = this._getVmVal(self.vm, exp);
        //v-model,exp只能是绑定到一个变量上，不能是表达式
        if (node.tagName.toLowerCase() === 'input') {
            node.addEventListener('input', function(e) {
                let newVal = e.target.value;
                if (val === newVal) {
                    return;
                }
                self._setVmVal(self.vm, exp, newVal);
            }, false);
            self.bind(node, exp, 'value');
        }
    },
    bind: function(node, exp, update) {
        //绑定view与model
        //添加一个Watcher，监听exp相关的所有字段变化，具体方法可以看Watcher的注释
        let self = this,
            updateFn = CompileUtil[update + 'Updater'];
        updateFn && new Watcher(exp, self.vm, function(newVal, oldVal) {
            updateFn(node, newVal, oldVal);
        });
    },
    /**
     * [获取挂载在vm实例上的value]
     * @param  {[type]} vm  [mvvm实例]
     * @param  {[type]} exp [expression]
     */
    _getVmVal: function(vm, exp) {
        let val = vm,
            exps = exp.split('.');
        exps.forEach(function(key) {
            key = key.trim();
            val = val[key];
        });
        return val;
    },
    /**
     * [设置挂载在vm实例上的value值]
     * @param  {[type]} vm    [mvvm实例]
     * @param  {[type]} exp   [expression]
     * @param  {[type]} value [新值]
     */
    _setVmVal: function(vm, exp, value) {
        let val = vm,
            exps = exp.split('.');
        exps.forEach(function(key, index) {
            key = key.trim();
            if (index < exps.length - 1) {
                val = val[key];
            } else {
                val[key] = value;
            }
        });
    }
};
const CompileUtil = {
    isNodeElement: function(node) {
        return node.nodeType === 1;
    },
    isTextElement: function(node) {
        return node.nodeType === 3;
    },
    isDirective: function(name) {
        return name.indexOf('v-') === 0;
    },
    isEventDirective: function(name) {
        return name.indexOf('on:') === 0;
    },
    textUpdater: function(node, newVal, oldVal) {
        node.textContent = typeof newVal === 'undefined' ? '' : newVal;
    },
    valueUpdater: function(node, newVal, oldVal) {
        node.value = typeof newVal === 'undefined' ? '' : newVal;
    },
    handleEvent: function(el, vm, evtType, exp) {
        let fn = vm._options.methods && vm._options.methods[exp];
        fn && el.addEventListener(evtType, fn.bind(vm), false);
    }
};