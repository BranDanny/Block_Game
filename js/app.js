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

        mousemoveBlock: function (e, block) {
            var clickedBlock = data.blocks[block.id - 1];
            if (clickedBlock.isDrag === true) {
                var moveX = e.pageX - mouseInitX;
                var moveY = e.pageY - mouseInitX;

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
            }
        },

        mouseupBlock: function (e, block) {
            var clickedBlock = data.blocks[block.id - 1];
            clickedBlock.isDrag = false;
            view.render()
        },

        //移动右边框位置
        Rdown: function (e, block) {
            var clickedBlock = data.blocks[block.id - 1];
            clickedBlock.RisDrag = true;
            mouseInitX = e.pageX - clickedBlock.resizeRLeft;
            // view.render();
        },

        Rmove: function (e, block) {
            var clickedBlock = data.blocks[block.id - 1];
            if (clickedBlock.RisDrag === true) {
                var moveX = e.pageX - mouseInitX;
                var Xmax = $(window).width() - clickedBlock.width;
                clickedBlock.resizeRLeft = Math.min(Xmax, Math.max(0, moveX));
                clickedBlock.width = Math.max(50, clickedBlock.resizeRLeft - clickedBlock.left + 10);
                clickedBlock.resizeRBLeft = clickedBlock.left + clickedBlock.width - 20;
                view.render();
            }
        },

        Rup: function (e, block) {
            var clickedBlock = data.blocks[block.id - 1];
            clickedBlock.RisDrag = false;
            view.render()
        },

        //移动下边框位置
        Bdown: function (e, block) {
            var clickedBlock = data.blocks[block.id - 1];
            clickedBlock.BisDrag = true;
            mouseInitY = e.pageY - clickedBlock.resizeBTop;
            // view.render();
        },

        Bmove: function (e, block) {
            var clickedBlock = data.blocks[block.id - 1];
            if (clickedBlock.BisDrag === true) {
                var moveY = e.pageY - mouseInitY;
                var Ymax = $(window).height() - clickedBlock.height;
                clickedBlock.resizeBTop = Math.min(Ymax, Math.max(0, moveY));
                clickedBlock.height = Math.max(50, clickedBlock.resizeBTop - clickedBlock.top + 10);
                clickedBlock.resizeRBTop = clickedBlock.top + clickedBlock.height - 20;
                view.render();
            }
        },

        Bup: function (e, block) {
            var clickedBlock = data.blocks[block.id - 1];
            clickedBlock.BisDrag = false;
            view.render()
        },

        //移动右下小方块位置
        RBdown: function (e, block) {
            var clickedBlock = data.blocks[block.id - 1];
            clickedBlock.RBisDrag = true;
            mouseInitX = e.pageX - clickedBlock.resizeRBLeft;
            mouseInitY = e.pageY - clickedBlock.resizeRBTop;
            // view.render();
        },

        RBmove: function (e, block) {
            var clickedBlock = data.blocks[block.id - 1];
            if (clickedBlock.RBisDrag === true) {
                var moveX = e.pageX - mouseInitX;
                var moveY = e.pageY - mouseInitX;

                var Xmax = $(window).width() - clickedBlock.width;
                var Ymax = $(window).height() - clickedBlock.height;

                clickedBlock.resizeRBTop = Math.min(Ymax, Math.max(0, moveY));
                clickedBlock.resizeRBLeft = Math.min(Xmax, Math.max(0, moveX));

                clickedBlock.width = Math.max(50, clickedBlock.resizeRBLeft - clickedBlock.left + 20);
                clickedBlock.height = Math.max(50, clickedBlock.resizeRBTop - clickedBlock.top + 20);
                clickedBlock.resizeRLeft = clickedBlock.left + clickedBlock.width - 10;
                clickedBlock.resizeBTop = clickedBlock.top + clickedBlock.height - 10;

                view.render();
            }
        },

        RBup: function (e, block) {
            var clickedBlock = data.blocks[block.id - 1];
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
                octopus.removeBlock(block);
                return false;
            }); //删除大方块

            this.blockList.on({
                mousedown: function (e) {
                    var block = $(this).data();
                    octopus.mousedownBlock(e, block);
                },
                mousemove: function (e) {
                    var block = $(this).data();
                    octopus.mousemoveBlock(e, block);
                },
                mouseup: function (e) {
                    var block = $(this).data();
                    octopus.mouseupBlock(e, block);
                }
            }, '.block');//移动大方块

            this.blockList.on({
                mousedown: function (e) {
                    e.stopPropagation();
                    var block = $(this).parent('.block').data();
                    octopus.Rdown(e, block);
                },
                mousemove: function (e) {
                    e.stopPropagation();
                    var block = $(this).parent('.block').data();
                    octopus.Rmove(e, block);
                },
                mouseup: function (e) {
                    e.stopPropagation();
                    var block = $(this).parent('.block').data();
                    octopus.Rup(e, block);
                }
            }, '.resizeR');//移动右边框

            this.blockList.on({
                mousedown: function (e) {
                    e.stopPropagation();
                    var block = $(this).parent('.block').data();
                    octopus.Bdown(e, block);
                },
                mousemove: function (e) {
                    e.stopPropagation();
                    var block = $(this).parent('.block').data();
                    octopus.Bmove(e, block);
                },
                mouseup: function (e) {
                    e.stopPropagation();
                    var block = $(this).parent('.block').data();
                    octopus.Bup(e, block);
                }
            }, '.resizeB');//移动下边框

            this.blockList.on({
                mousedown: function (e) {
                    e.stopPropagation();
                    var block = $(this).parent('.block').data();
                    octopus.RBdown(e, block);
                },
                mousemove: function (e) {
                    e.stopPropagation();
                    var block = $(this).parent('.block').data();
                    octopus.RBmove(e, block);
                },
                mouseup: function (e) {
                    e.stopPropagation();
                    var block = $(this).parent('.block').data();
                    octopus.RBup(e, block);
                }
            }, '.resizeRB');//移动右下小方块

            this.render();
        },

        render: function () {
            // Cache vars for use in forEach() callback (performance)
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
        }
    };

    octopus.init();
}());
