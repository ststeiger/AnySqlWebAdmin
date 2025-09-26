var Css;
(function (Css) {
    var StyleHelper = (function () {
        function StyleHelper(style) {
            this.fromStyle(style);
        }
        StyleHelper.prototype.removeStyle = function (key) {
            if (this.m_dict.hasOwnProperty(key))
                delete this.m_dict[key];
            return this;
        };
        StyleHelper.prototype.addStyle = function (key, value) {
            this.m_dict[key] = value;
            return this;
        };
        StyleHelper.prototype.fromStyle = function (style) {
            this.m_dict = null;
            this.m_dict = {};
            if (style == null)
                return this;
            var kvps = style.split(";");
            for (var i = 0; i < kvps.length; i++) {
                var kvp = kvps[i].split(':');
                var key = kvp[0].trim();
                if (key === "")
                    continue;
                this.m_dict[key] = kvp[i].trim();
            }
            return this;
        };
        StyleHelper.prototype.toStyle = function () {
            var style = "";
            var key;
            for (key in this.m_dict) {
                if (this.m_dict.hasOwnProperty(key)) {
                    style = style + key + ": " + this.m_dict[key] + "; ";
                }
            }
            return style;
        };
        return StyleHelper;
    }());
    Css.StyleHelper = StyleHelper;
})(Css || (Css = {}));
