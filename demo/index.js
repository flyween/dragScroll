(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.DragScroll = factory());
}(this, (function () { 'use strict';
    var startX = 0,
        diffX = 0,
        scrollPos = 0,
        startTime = 0,
        hoverTime = 0,
        anchorX = 0,
        disX = 0,
        enable = false;
    var dragScroll = function(opts){
        this.opts = opts;
        this.decayTime = opts.decayTime && opts.decayTime > .1 && opts.decayTime < 1 ? opts.decayTime : 1;
        this.bufferDis = opts.bufferDis ? opts.bufferDis / 50 : 1;
        this.ele = document.querySelector(opts.ele);
        this.eleLeft = this.ele.getBoundingClientRect().left;
        this.init();
    }

    dragScroll.prototype.init = function(){
        this.bindEvents();
    };

    dragScroll.prototype.move = function(){
        this.ele.scrollLeft = scrollPos - diffX;
    };

    dragScroll.prototype.scrollAnimate = function(){
        var intialSpeed = disX / hoverTime * 50 * this.bufferDis;
        var that = this
        var _run = function(){
            if(Math.floor(intialSpeed) !== 0){
                that.ele.scrollLeft = that.ele.scrollLeft - intialSpeed;
                intialSpeed = intialSpeed * 0.8 * that.decayTime;
            }else{
                return
            }
            window.requestAnimationFrame(_run);
        }
        _run();
    };

    dragScroll.prototype.leaveCon = function(e){
        if(!enable){
            return
        }
        hoverTime = new Date().getTime() - startTime;
        disX = e.pageX - this.eleLeft - anchorX;
        this.scrollAnimate();
    };

    dragScroll.prototype.handleMouseDown = function(e){
        enable = true;
        anchorX = e.pageX - this.eleLeft;
        startX = e.pageX - this.eleLeft;
        scrollPos = this.ele.scrollLeft;
        startTime = new Date().getTime();
    };

    dragScroll.prototype.handleMouseMove = function(e){
        diffX = e.pageX - this.eleLeft - startX;
        enable ? this.move() : '';
        startX = e.pageX - this.eleLeft;
        scrollPos = this.ele.scrollLeft;
    };

    dragScroll.prototype.handleMouseLeave = function(e){
        this.leaveCon(e);
        enable = false
    };

    dragScroll.prototype.handleMouseUp = function(e){
        this.leaveCon(e);
        enable = false
    };

    dragScroll.prototype.bindEvents = function(){
        this.ele.addEventListener('mousedown', this.handleMouseDown.bind(this));
        this.ele.addEventListener('mousemove', this.handleMouseMove.bind(this));
        this.ele.addEventListener('mouseleave', this.handleMouseLeave.bind(this));
        this.ele.addEventListener('mouseup', this.handleMouseUp.bind(this));
    };

    return dragScroll;

})));