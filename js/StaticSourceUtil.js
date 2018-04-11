// 加载本地数据的工具类:图片素材
(function () {
    window.StaticSourceUtil = Class.extend({
        init : function () {
            // 保存所有图片对象
            this.allImageObj = {};
        },

        // 加载游戏的资源
        // 需要返回:所有的图片dom对象,图片的个数,已经加载好图片的个数
        loadIamge : function (jsonUrl,callback) {
            // 0.备份this
            var self = this;
            // 1.创建请求对象
            var xhr = new XMLHttpRequest();
            // 2.Ajax三步走
            xhr.open('get',jsonUrl);
            // 发送请求
            xhr.send();
            // 3.当 readyState 等于 4 且状态为 200 时，表示响应已就绪,请求成功
            xhr.onreadystatechange = function()
            {
                if (xhr.readyState==4 && xhr.status==200)
                {
                    // 3.0 记录已经加载好的图片个数
                    var loadImageCount = 0;
                    // 3.1 获取请求数据--> JSON数据(字符串)
                    var responseText = xhr.responseText;
                    // 3.2 JSON解析--> JSON字符串--> 对象--> 下标索引获得图片
                    var responseJson = JSON.parse(responseText);
                    // 4.获取数组
                    var dataArray = responseJson.images;
                    // 5.遍历数组
                    for (var i = 0; i < dataArray.length; i++) {
                        // 创建图片对象
                        var image = new Image();
                        image.src = dataArray[i].src;
                        image.index = i;  // 备份图片索引
                        // 等到图片加载完毕后才返回
                        image.onload = function () {
                            // 累加已经加载好的图片个数
                            loadImageCount ++;
                            var key = dataArray[this.index].name;
                            // 保存所有的图片对象 (修改为新的对应关系key:image)
                            self.allImageObj[key] = this; // this-->image
                            // 返回需要的数据
                            callback(self.allImageObj,dataArray.length,loadImageCount);
                        }
                    }
                }
            }
        }
    });
})();