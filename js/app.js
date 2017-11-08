$(function () {
    //存放基础数据
    var data = {
        top: 100,
        left: 100,
        width: 200,
        height: 200,
        resizeRTop: 100,
        resizeRLeft: 290,
        resizeBTop: 290,
        resizeBLeft: 100,
        resizeRBTop: 280,
        resizeRBLeft: 280,
        lastID: 0,
        blocks: []
    };

    //章鱼控制器
    var octopus = {
        addBlock: function () {
            var thisID = ++data.lastID;
            var randomColor = function () {
                return '#' + ('00000' + (Math.random() * 0x1000000 << 0).toString(16)).substr(-6);
            };

            data.blocks.push({
                id: thisID,
                ranColor: randomColor(),
                visible: true,
                top: data.top,
                left: data.left,
                width: data.width,
                height: data.height,
                resizeRTop: data.resizeRTop,
                resizeRLeft: data.resizeRLeft,
                resizeBTop: data.resizeBTop,
                resizeBLeft: data.resizeBLeft,
                resizeRBTop: data.resizeRBTop,
                resizeRBLeft: data.resizeRBLeft,
                RisDrag: false,
                BisDrag: false,
                RBisDrag: false,
                isDrag: false,
                isResize: false
            });
            view.render();
        },

        //删除方块
        removeBlock: function (block) {
            var clickedBlock = data.blocks[block.id - 1];
            clickedBlock.visible = false;
            view.render();
        },

        //移动大方块位置
        mousedownBlock: function (e, block) {
            var clickedBlock = data.blocks[block.id - 1];
            clickedBlock.isDrag = true;
            mouseInitX = e.pageX - clickedBlock.left;
            mouseInitY = e.pageY - clickedBlock.top;
             // view.render();
        },
        //移动下边框位置
        Bdown: function (e, block) {
            var clickedBlock = data.blocks[block.id - 1];
            clickedBlock.BisDrag = true;
            BInitY = e.pageY - clickedBlock.resizeBTop;
            // view.render();
        },

        //移动右边框位置
        Rdown: function (e, block) {
            var clickedBlock = data.blocks[block.id - 1];
            clickedBlock.RisDrag = true;
            RInitX = e.pageX - clickedBlock.resizeRLeft;
            // view.render();
        },

        //移动右下小方块位置
        RBdown: function (e, block) {
            var clickedBlock = data.blocks[block.id - 1];
            clickedBlock.RBisDrag = true;
            RBInitX = e.pageX - clickedBlock.resizeRBLeft;
            RBInitY = e.pageY - clickedBlock.resizeRBTop;
            // view.render();
        },

        move: function (e, block) {
            var clickedBlock = data.blocks[block.id - 1];
            if(clickedBlock.isDrag === true){
                var moveX = e.pageX - mouseInitX;
                var moveY = e.pageY - mouseInitY;
                var Xmax = $(window).width() - clickedBlock.width;
                var Ymax = $(window).height() - clickedBlock.height;

                clickedBlock.top = Math.min(Ymax, Math.max(0, moveY));
                clickedBlock.left = Math.min(Xmax, Math.max(0, moveX));

                clickedBlock.resizeRTop = clickedBlock.top;
                clickedBlock.resizeRLeft = clickedBlock.left + clickedBlock.width - 10;

                clickedBlock.resizeBTop = clickedBlock.top + clickedBlock.height - 10;
                clickedBlock.resizeBLeft = clickedBlock.left;

                clickedBlock.resizeRBTop = clickedBlock.top + clickedBlock.height - 20;
                clickedBlock.resizeRBLeft = clickedBlock.left + clickedBlock.width - 20;

                view.render();

            }else if (clickedBlock.RisDrag === true) {
                var RX = e.pageX - RInitX;
                var RXmax = $(window).width() - 10;

                clickedBlock.resizeRLeft = Math.min(RXmax, Math.max(0, RX));

                clickedBlock.width = Math.max(50, clickedBlock.resizeRLeft - clickedBlock.left + 10);

                clickedBlock.resizeRBLeft = clickedBlock.left + clickedBlock.width - 20;

                view.render();

            }else if(clickedBlock.BisDrag === true){
                var BY = e.pageY - BInitY;
                var BYmax = $(window).height() - 10;

                clickedBlock.resizeBTop = Math.min(BYmax, Math.max(0, BY));

                clickedBlock.height = Math.max(50, clickedBlock.resizeBTop - clickedBlock.top + 10);

                clickedBlock.resizeRBTop = clickedBlock.top + clickedBlock.height - 20;

                view.render();

            }else if(clickedBlock.RBisDrag === true){
                var RBX = e.pageX - RBInitX;
                var RBY = e.pageY - RBInitY;
                var RBXmax = $(window).width() - 20;
                var RBYmax = $(window).height() - 20;

                clickedBlock.resizeRBTop = Math.min(RBYmax, Math.max(0, RBY));
                clickedBlock.resizeRBLeft = Math.min(RBXmax, Math.max(0, RBX));

                clickedBlock.width = Math.max(50, clickedBlock.resizeRBLeft - clickedBlock.left + 20);
                clickedBlock.height = Math.max(50, clickedBlock.resizeRBTop - clickedBlock.top + 20);

                clickedBlock.resizeRLeft = clickedBlock.left + clickedBlock.width - 10;
                clickedBlock.resizeBTop = clickedBlock.top + clickedBlock.height - 10;

                view.render();
            }
        },

        up: function (e, block) {
            var clickedBlock = data.blocks[block.id - 1];
            clickedBlock.isDrag = false;
            clickedBlock.RisDrag = false;
            clickedBlock.BisDrag = false;
            clickedBlock.RBisDrag = false;

            view.render()
        },

        getVisibleBlocks: function () {
            return data.blocks.filter(function (block) {
                return block.visible;
            });
        },

        init: function () {
            view.init();
        }
    };

    //视图
    var view = {
        init: function () {
            var addBlockBtn = $('.add-block');
            addBlockBtn.click(function () {
                octopus.addBlock();
            });

            // 获取元素和HTML内容供render函数使用
            this.blockList = $('.block-list');
            this.blockTemplate = $('script[data-template="block"]').html();

            this.blockList.on('mousedown', '.remove-block', function (e) {
                e.stopPropagation();
                var block = $(this).parent('.block').data();
                console.log(block);
                octopus.removeBlock(block);
                return false;
            }); //删除大方块


            this.blockList.on('mousedown','.block', function (e) {
                var block = $(this).data();
                octopus.mousedownBlock(e, block);
                $(document).mousemove(function (e) {
                    octopus.move(e, block);
                });
                $(document).mouseup(function (e) {
                    octopus.up(e, block);
                })
            }); //移动大方块

            this.blockList.on({
                mousedown: function (e) {
                    e.stopPropagation();
                    var block = $(this).parent('.block').data();
                    octopus.Rdown(e, block);
                    $(document).mousemove(function (e) {
                        octopus.move(e, block);
                    });
                    $(document).mouseup(function (e) {
                        octopus.up(e, block);
                    })
                }
            }, '.resizeR');//移动右边框

            this.blockList.on({
                mousedown: function (e) {
                    e.stopPropagation();
                    var block = $(this).parent('.block').data();
                    octopus.Bdown(e, block);
                    $(document).mousemove(function (e) {
                        octopus.move(e, block);
                    });
                    $(document).mouseup(function (e) {
                        octopus.up(e, block);
                    })
                }
            }, '.resizeB');//移动下边框

            this.blockList.on({
                mousedown: function (e) {
                    e.stopPropagation();
                    var block = $(this).parent('.block').data();
                    octopus.RBdown(e, block);
                    $(document).mousemove(function (e) {
                        octopus.move(e, block);
                    });
                    $(document).mouseup(function (e) {
                        octopus.up(e, block);
                    })
                }
            }, '.resizeRB');//移动右下小方块

            this.render();
        },

        render: _.debounce(function () {
            var blockList = this.blockList,
                blockTemplate = this.blockTemplate;

            // 清空渲染
            blockList.html('');
            octopus.getVisibleBlocks().forEach(function (block) {
                // 在页面中添加方块
                var thisTemplate = blockTemplate.replace(/{{id}}/g, block.id);
                blockList.append(thisTemplate);

                $("div[data-id=" + block.id + "]").offset({top: block.top, left: block.left})
                    .css({'width': block.width + 'px', 'height': block.height + 'px', 'background': block.ranColor});
                $("div[data-id=" + block.id + "] > .resizeR").offset({top: block.resizeRTop, left: block.resizeRLeft});
                $("div[data-id=" + block.id + "] > .resizeB").offset({top: block.resizeBTop, left: block.resizeBLeft});
                $("div[data-id=" + block.id + "] > .resizeRB").offset({top: block.resizeRBTop, left: block.resizeRBLeft});
            });
        },50)
    };

    octopus.init();
}());
