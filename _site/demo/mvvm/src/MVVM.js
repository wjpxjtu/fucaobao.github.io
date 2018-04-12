function MVVM(options) {
    this._options = options || {};
    this.data = this._options.data;
    this._proxy(this.data);
    observe(this.data);
    new Compiler(this._options.el || document.body, this);
}
MVVM.prototype._proxy = function(data) {
    let self = this;
    Object.keys(data).forEach(function(key) {
        Object.defineProperty(self, key, {
            enumerable: true,
            configurable: true,
            get: function() {
                return self.data[key];
            },
            set: function(newVal) {
                if (self.data[key] === newVal) {
                    return;
                }
                self.data[key] = newVal;
            }
        });
    });
};