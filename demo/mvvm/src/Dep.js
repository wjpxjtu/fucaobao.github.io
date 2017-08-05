let uid = 0;
Dep.target = null;

function Dep() {
    this.uid = uid++;
    this.subs = [];
}
Dep.prototype.addSub = function(sub) {
    this.subs.push(sub);
};
Dep.prototype.notify = function() {
    this.subs.forEach(function(sub) {
        // 执行sub的update更新函数
        sub.update();
    });
};
Dep.prototype.depend = function() {
    Dep.target.addDep(this);
};