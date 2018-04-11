// 管道类
(function () {
    window.Pipe = Class.extend({
        init : function () {
            // 1.管道方向:  0向下, 1向上
            this.dir = _.random(0,1);
            // 2.宽高
            this.width = 148;  // 管道图片的宽度为148
            this.height = _.random(100,(game.canvas.height-48)*0.5);
            // 3.坐标
            this.x = game.canvas.width;
            this.y = this.dir == 0 ? 0 : game.canvas.height- this.height - 48;
            // 4.速度
            this.speed = 4;
        },

        // 绘制
        render : function () {
            // 判断管道方向
            if(this.dir == 0){ // 0向下,   管道开始剪切的y=管道图片的高度1664-管道显示高度
                game.ctx.drawImage(game.allImageObj['pipe1'],0,1664-this.height,this.width,this.height,this.x,this.y,this.width,this.height);
            } else if (this.dir == 1){ // 1向上
                game.ctx.drawImage(game.allImageObj['pipe0'],0,0,this.width,this.height,this.x,this.y,this.width,this.height);
            }
        },

        // 更新
        update : function () {
            this.x -= this.speed;
            // 为避免过多管道占用内存,销毁离开屏幕的管道 (性能优化)
            if(this.x <= -this.width){
                game.pipeArr = _.without(game.pipeArr,this);
            }
            // 检测小鸟和管道是否碰撞 (碰撞检测)
            // 判断小鸟是否进入管道区域
            // 碰撞管道条件: (小鸟x坐标+小鸟自身宽度) > 管道x坐标 && 小鸟x坐标 < (管道x坐标+管道自身宽度)
            if(game.bird.x + game.bird.width > this.x && game.bird.x < this.x + this.width){   // 鸟已进入管道区域危险
                if(this.dir == 0 && game.bird.y < this.height){ // 0向下
                    // 游戏结束
                    game.gameOver();
                } else if(this.dir == 1 && game.bird.y + game.bird.height > this.y){ // 1向上
                    // 碰撞地板条件: 小鸟下落状态 && (小鸟y坐标+小鸟自身高度) > 管道y坐标
                    // 游戏结束
                    game.gameOver();
                }
            }
        },

        // 暂停
        pause : function () {
            this.speed = 0;
        }
    });
})();