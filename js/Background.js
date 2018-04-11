// 背景类
(function () {
    window.Background = Class.extend({
        init : function (option) {
            option = option || {};
            // 1.图片对象
            this.image = option.image;
            // 2.坐标
            this.x = 0;
            this.y = option.y || 0;
            // 3.宽高
            this.width = option.width || 0;
            this.height = option.height || 0;
            // 4.绘制房子的总个数: 取整 + 1 , 避免屏幕出现缺房空位 (容错处理)
            this.count = parseInt(game.canvas.width / this.width) + 1;
            // 5.速度
            this.speed = option.speed || 1;
        },

        // 绘制
        render : function () {
            for (var i = 0; i < 2 * this.count; i++) {
                game.ctx.drawImage(this.image,this.x + i * this.width,this.y,this.width,this.height);
            }
        },

        // 更新
        update : function () {
            // 向左运动: x值变小
            this.x -= this.speed;
            // 还原位置
            if (this.x <= -this.count*this.width){
                this.x = 0;
            }
        },

        // 暂停
        pause : function () {
            this.speed = 0;
        }
    });
})();