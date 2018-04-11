// Game类-中介者对象
(function () {
    window.Game = Class.extend({
        init : function (option) {
            option = option || {};
            // 0.备份this
            var self = this;
            // 1.fps
            this.fps = option.fps || 60;
            // 2.实例化帧工具类
            this.frameUtil = new FrameUtil();
            // 3.通过id获取画布和上下文
            this.canvas = document.getElementById(option.canvasId);
            this.ctx = this.canvas.getContext('2d');
            // 4.实例化本地数据工具类
            this.staticSourceUtil = new StaticSourceUtil();
            // 5.保存加载好的数据
            this.allImageObj = {};
            // 5.加载数据
            // 参数：所有的图片dom对象,图片的个数,已加载好图片的个数
            this.staticSourceUtil.loadIamge('r.json',function (allImageObj,imageCount,loadImageCount) {
                if(imageCount == loadImageCount){ // 图片加载完毕:已加载数=图库总数
                    // 保存所有的图片数据
                    self.allImageObj = allImageObj;
                    // 运行游戏
                    self.run();
                }
            });
            // 6.记录游戏运行的状态
            this.isRun = true;
        },

        // 开始游戏
        run : function () {
            // 备份 this
            var self = this;
           this.timer = setInterval(function () {
               self.runLoop();
           },1000/self.fps); // 每一帧需要的时间  FPS:50 1s/50 (s)  -->1000/50

            // 创建房子
            this.house = new Background({
                image : this.allImageObj['house'],
                y : this.canvas.height - 256 - 100,
                width : 300,
                height : 256,
                speed : 2
            });
            // 创建树
            this.tree = new Background({
                image : this.allImageObj['tree'],
                y : this.canvas.height - 216 - 48,
                width : 300,
                height : 216,
                speed : 3
            });
            // 创建地板
            this.floor = new Background({
                image : this.allImageObj['floor'],
                y : this.canvas.height - 48, // 地板图片的高度为48
                width : 48,
                height : 48,
                speed : 4  // 模拟真实场景: 近处 运动快
            });
            // 管道数组: 游戏刚开始未达100帧前先默认创建一个管道占位 (容错处理)
            this.pipeArr = [new Pipe()];
            // 创建鸟
            this.bird = new Bird();
        },

        // 游戏运行循环-->每一帧要调用一次
        runLoop : function () {
            // 0.清屏（消除干扰）
            this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
            // 1.计算真实的fps
            this.frameUtil.countFps();
            // 2.绘制FPS /FNO
            this.ctx.fillText('FPS/'+this.frameUtil.realFps,15,15);
            this.ctx.fillText('FNO/'+this.frameUtil.currentFrame,15,30);
            // 3.更新和渲染房子
            this.house.update();
            this.house.render();
            // 4.更新和渲染树
            this.tree.update();
            this.tree.render();
            // 5.更新和渲染地板
            this.floor.update();
            this.floor.render();
            // 6.每隔100帧且游戏运行时,创建一个新管道并放进管道数组
            if(this.frameUtil.currentFrame % 100 == 0 && this.isRun){
                this.pipeArr.push(new Pipe());
            }
            // 7.更新和渲染管道 (分开进行)
            // 先更新得到新的管道, 然后绘制已有的旧管道 (容错处理)
            // 避免因创建管道速度过慢，导致render找不到管道渲染而报错
            // 先更新
            for (var i = 0; i < this.pipeArr.length; i++) {
                this.pipeArr[i].update();
            }
            // 后绘制
            for (var i = 0; i < this.pipeArr.length; i++) {
                this.pipeArr[i].render();
            }
            // 8.更新和渲染小鸟
            this.bird.update();
            this.bird.render();
        },

        // 暂停游戏
        pause : function () {
            clearInterval(this.timer);
        },

        // 游戏结束
        gameOver : function () {
            // 游戏结束,改变游戏的状态
            this.isRun = false;
            // 暂停背景移动
            this.house.pause();
            this.tree.pause();
            this.floor.pause();
            // 暂停管道移动
            for (var i = 0; i < this.pipeArr.length; i++) {
                this.pipeArr[i].pause();
            }
            // 发出小鸟死亡的通知
            game.bird.die = true;
        }
    });
})();