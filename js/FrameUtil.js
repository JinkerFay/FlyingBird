// 帧工具类:计算每秒的传输的帧数和当前的总帧数
(function () {
    window.FrameUtil = Class.extend({
        init : function () {
            // 1.开始的时间
            this.sTime = new Date();
            // 2.开始的帧数
            this.sFrame = 0;
            // 3.当前的总帧数
            this.currentFrame = 0;
            // 4.真实的fps
            this.realFps = 0;
        },

        // 计算真实的fps
        countFps : function () {
            // 1.累加当前的帧数
            this.currentFrame ++;
            // 2.当前的时间
            var currentTime = new Date();
            // 3.判断是否走过了1秒 (判断临界值)
            if(currentTime - this.sTime >= 1000){ // 走过了1秒
                // 计算真实的fps
                this.realFps = this.currentFrame - this.sFrame;
                // 更新开始的时间
                this.sTime = currentTime;
                // 更新开始的帧数
                this.sFrame = this.currentFrame;
            }
        }
    });

})();