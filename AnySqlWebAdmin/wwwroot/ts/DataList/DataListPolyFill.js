'use strict';
if (!Element.prototype.matches)
    Element.prototype.matches = Element.prototype.msMatchesSelector ||
        Element.prototype.webkitMatchesSelector;
if (!Element.prototype.closest)
    Element.prototype.closest = function (s) {
        var el = this;
        if (!document.documentElement.contains(el))
            return null;
        do {
            if (el.matches(s))
                return el;
            el = el.parentElement;
        } while (el !== null);
        return null;
    };
document.addEventListener('DOMContentLoaded', function () {
    var lists = document.querySelectorAll('input[data-optgroup-list]');
    var _loop_1 = function (tbi) {
        var list = lists[tbi];
        console.log(list);
        var datalist = document.getElementById(list.getAttribute('data-optgroup-list'));
        var listOptions = list.parentElement.getElementsByClassName("list-options")[0];
        list.addEventListener('focus', function (event) {
            console.log('focus');
            listOptions.removeAttribute('hidden');
        });
        list.addEventListener('blur', function (event) {
            console.log('blur');
        });
        list.addEventListener('input', function (event) {
            var value = event.target.value;
            if (value != null)
                value = value.toLowerCase();
            var options = listOptions.querySelectorAll('.option');
            for (var i = 0; i < options.length; i++) {
                var option = options[i];
                var optionValue = option.querySelector('.value').innerHTML;
                if (optionValue == null)
                    optionValue = "";
                optionValue = optionValue.toLowerCase();
                var show = (optionValue.indexOf(value) != -1);
                if (show) {
                    option.removeAttribute('hidden');
                }
                else {
                    option.setAttribute('hidden', 'true');
                }
            }
            var details = listOptions.querySelectorAll('details');
            for (var dti = 0; dti < details.length; ++dti) {
                var detail = details[dti];
                var allHidden = true;
                var options_1 = detail.querySelectorAll('.option');
                for (var j = 0; j < options_1.length; j++) {
                    var _option = options_1[j];
                    if (!_option.hasAttribute('hidden')) {
                        allHidden = false;
                        break;
                    }
                }
                if (allHidden) {
                    detail.setAttribute('hidden', 'true');
                }
                else {
                    detail.removeAttribute('hidden');
                }
            }
        });
        listOptions.addEventListener('click', function (event) {
            var el = event.target;
            if (!el.classList.contains("option")) {
                el = el.closest('.option');
                if (el == null)
                    return;
            }
            list.value = el.dataset.value;
            listOptions.setAttribute('hidden', 'true');
        });
    };
    for (var tbi = 0; tbi < lists.length; ++tbi) {
        _loop_1(tbi);
    }
});
