(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.DragScroll = factory());
}(this, (function () { 'use strict';

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

var dragScroll = function () {
    // @param decayTime 缓动时间

    // @param bufferDis 缓动距离

    function dragScroll(opts) {
        classCallCheck(this, dragScroll);

        this.startX = 0;
        this.diffX = 0;
        this.scrollPos = 0;
        this.startTime = 0;
        this.hoverTime = 0;
        this.anchorX = 0;
        this.disX = 0;
        this.enable = false;
        this.decayTime = opts.decayTime && opts.decayTime > .1 && opts.decayTime < 1 ? opts.decayTime : 1;
        this.bufferDis = opts.bufferDis ? opts.bufferDis / 50 : 1;
        this.opts = opts;
        this.ele = this.getEle(opts.ele);
        this.eleLeft = this.ele.getBoundingClientRect().left;
        this.init();
    }

    createClass(dragScroll, [{
        key: 'init',
        value: function init() {
            this.bindEvents();
        }
    }, {
        key: 'getEle',
        value: function getEle(ele) {
            return document.querySelector(ele);
        }
    }, {
        key: 'move',
        value: function move() {
            this.ele.scrollLeft = this.scrollPos - this.diffX;
        }
    }, {
        key: 'scrollAnimate',
        value: function scrollAnimate() {
            var intialSpeed = this.disX / this.hoverTime * 50 * this.bufferDis;

            var _run = function () {
                if (Math.floor(intialSpeed) !== 0) {
                    this.ele.scrollLeft = this.ele.scrollLeft - intialSpeed;
                    intialSpeed = intialSpeed * 0.8 * this.decayTime;
                } else {
                    return;
                }
                window.requestAnimationFrame(_run);
            }.bind(this);
            _run();
        }
    }, {
        key: 'leaveCon',
        value: function leaveCon(e) {
            if (!this.enable) {
                return;
            }
            this.hoverTime = new Date().getTime() - this.startTime;
            this.disX = e.pageX - this.eleLeft - this.anchorX;
            this.scrollAnimate();
        }
    }, {
        key: 'handleMouseDown',
        value: function handleMouseDown(e) {
            this.enable = true;
            this.anchorX = e.pageX - this.eleLeft;
            this.startX = e.pageX - this.eleLeft;
            this.scrollPos = this.ele.scrollLeft;
            this.startTime = new Date().getTime();
        }
    }, {
        key: 'handleMouseMove',
        value: function handleMouseMove(e) {
            this.diffX = e.offsetX - this.eleLeft - this.startX;
            this.enable ? this.move() : '';
            this.startX = e.pageX - this.eleLeft;
            this.scrollPos = this.ele.scrollLeft;
        }
    }, {
        key: 'handleMouseLeave',
        value: function handleMouseLeave(e) {
            this.leaveCon(e);
            this.enable = false;
        }
    }, {
        key: 'handleMouseUp',
        value: function handleMouseUp(e) {
            this.leaveCon(e);
            this.enable = false;
        }
    }, {
        key: 'bindEvents',
        value: function bindEvents() {
            this.ele.addEventListener('mousedown', this.handleMouseDown.bind(this));
            this.ele.addEventListener('mousemove', this.handleMouseMove.bind(this));
            this.ele.addEventListener('mouseleave', this.handleMouseLeave.bind(this));
            this.ele.addEventListener('mouseup', this.handleMouseUp.bind(this));
        }
    }]);
    return dragScroll;
}();

return dragScroll;

})));
