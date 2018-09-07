var utils = (function(){
        //flag变量不会销毁,存储的是判断当前浏览器是否兼容getComputedStyle,兼容的话是标准浏览器,如果flag = false说明当前浏览器是IE6~8
        var flag = "getComputedStyle" in window;
        //运动动画算法
        var Effect = {
            Linear: function(t, b, c, d) {
                return c * t / d + b;
            },
            Bounce: {
                easeIn: function(t, b, c, d) {
                    return c - Effect.Bounce.easeOut(d - t, 0, c, d) + b;
                },
                easeOut: function(t, b, c, d) {
                    if ((t /= d) < (1 / 2.75)) {
                        return c * (7.5625 * t * t) + b;
                    } else if (t < (2 / 2.75)) {
                        return c * (7.5625 * (t -= (1.5 / 2.75)) * t + .75) + b;
                    } else if (t < (2.5 / 2.75)) {
                        return c * (7.5625 * (t -= (2.25 / 2.75)) * t + .9375) + b;
                    } else {
                        return c * (7.5625 * (t -= (2.625 / 2.75)) * t + .984375) + b;
                    }
                },
                easeInOut: function(t, b, c, d) {
                    if (t < d / 2) {
                        return Effect.Bounce.easeIn(t * 2, 0, c, d) * .5 + b;
                    }
                    return Effect.Bounce.easeOut(t * 2 - d, 0, c, d) * .5 + c * .5 + b;
                }
            },
            Quad: {
                easeIn: function(t, b, c, d) {
                    return c * (t /= d) * t + b;
                },
                easeOut: function(t, b, c, d) {
                    return -c * (t /= d) * (t - 2) + b;
                },
                easeInOut: function(t, b, c, d) {
                    if ((t /= d / 2) < 1) {
                        return c / 2 * t * t + b;
                    }
                    return -c / 2 * ((--t) * (t - 2) - 1) + b;
                }
            },
            Cubic: {
                easeIn: function(t, b, c, d) {
                    return c * (t /= d) * t * t + b;
                },
                easeOut: function(t, b, c, d) {
                    return c * ((t = t / d - 1) * t * t + 1) + b;
                },
                easeInOut: function(t, b, c, d) {
                    if ((t /= d / 2) < 1) {
                        return c / 2 * t * t * t + b;
                    }
                    return c / 2 * ((t -= 2) * t * t + 2) + b;
                }
            },
            Quart: {
                easeIn: function(t, b, c, d) {
                    return c * (t /= d) * t * t * t + b;
                },
                easeOut: function(t, b, c, d) {
                    return -c * ((t = t / d - 1) * t * t * t - 1) + b;
                },
                easeInOut: function(t, b, c, d) {
                    if ((t /= d / 2) < 1) {
                        return c / 2 * t * t * t * t + b;
                    }
                    return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
                }
            },
            Quint: {
                easeIn: function(t, b, c, d) {
                    return c * (t /= d) * t * t * t * t + b;
                },
                easeOut: function(t, b, c, d) {
                    return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
                },
                easeInOut: function(t, b, c, d) {
                    if ((t /= d / 2) < 1) {
                        return c / 2 * t * t * t * t * t + b;
                    }
                    return c / 2 * ((t -= 2) * t * t * t * t + 2) + b;
                }
            },
            Sine: {
                easeIn: function(t, b, c, d) {
                    return -c * Math.cos(t / d * (Math.PI / 2)) + c + b;
                },
                easeOut: function(t, b, c, d) {
                    return c * Math.sin(t / d * (Math.PI / 2)) + b;
                },
                easeInOut: function(t, b, c, d) {
                    return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
                }
            },
            Expo: {
                easeIn: function(t, b, c, d) {
                    return (t == 0) ? b : c * Math.pow(2, 10 * (t / d - 1)) + b;
                },
                easeOut: function(t, b, c, d) {
                    return (t == d) ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b;
                },
                easeInOut: function(t, b, c, d) {
                    if (t == 0) return b;
                    if (t == d) return b + c;
                    if ((t /= d / 2) < 1) return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
                    return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
                }
            },
            Circ: {
                easeIn: function(t, b, c, d) {
                    return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
                },
                easeOut: function(t, b, c, d) {
                    return c * Math.sqrt(1 - (t = t / d - 1) * t) + b;
                },
                easeInOut: function(t, b, c, d) {
                    if ((t /= d / 2) < 1) {
                        return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
                    }
                    return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
                }
            },
            Back: {
                easeIn: function(t, b, c, d, s) {
                    if (s == undefined) s = 1.70158;
                    return c * (t /= d) * t * ((s + 1) * t - s) + b;
                },
                easeOut: function(t, b, c, d, s) {
                    if (s == undefined) s = 1.70158;
                    return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
                },
                easeInOut: function(t, b, c, d, s) {
                    if (s == undefined) s = 1.70158;
                    if ((t /= d / 2) < 1) {
                        return c / 2 * (t * t * (((s *= (1.525)) + 1) * t - s)) + b;
                    }
                    return c / 2 * ((t -= 2) * t * (((s *= (1.525)) + 1) * t + s) + 2) + b;
                }
            },
            Elastic: {
                easeIn: function(t, b, c, d, a, p) {
                    if (t == 0) return b;
                    if ((t /= d) == 1) return b + c;
                    if (!p) p = d * .3;
                    var s;
                    !a || a < Math.abs(c) ? (a = c, s = p / 4) : s = p / (2 * Math.PI) * Math.asin(c / a);
                    return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
                },
                easeOut: function(t, b, c, d, a, p) {
                    if (t == 0) return b;
                    if ((t /= d) == 1) return b + c;
                    if (!p) p = d * .3;
                    var s;
                    !a || a < Math.abs(c) ? (a = c, s = p / 4) : s = p / (2 * Math.PI) * Math.asin(c / a);
                    return (a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b);
                },
                easeInOut: function(t, b, c, d, a, p) {
                    if (t == 0) return b;
                    if ((t /= d / 2) == 2) return b + c;
                    if (!p) p = d * (.3 * 1.5);
                    var s;
                    !a || a < Math.abs(c) ? (a = c, s = p / 4) : s = p / (2 * Math.PI) * Math.asin(c / a);
                    if (t < 1) return -.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
                    return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p) * .5 + c + b;
                }
            }
        }

        //First item
        //0.兼容获取和设置浏览器宽高
        function win(attr,value){
            if(typeof value === "undefined" ){
                return document.documentElement[attr] || document.body[attr];
            }
            else{
                document.documentElement[attr] = value;
                document.body[attr] = value;
            }
        }
        //1.将类数组转化为数组(传入一个类数组)
        function listToArray(likeAry){
            if(flag){
                return Array.prototype.slice.call(likeAry);
            }
            var ary=[];
            for(var i=0;i<likeAry.length;i++){
                ary[ary.length]=likeAry[i];
            }
            return ary;
        }
        //2.获取所有元素节点(传入一个元素),传入两个参数获取该元素下的所有目标元素(传入一个元素和目标元素)
        function children(curEle,tagName){
            var arr = [];
            //ie6~8下使用
            if(!flag){
                var nodeList = curEle.childNodes;
                for (var i = 0; i < nodeList.length; i++) {
                    var curNode = nodeList[i];
                    if(curNode.nodeType === 1){
                        arr[arr.length] = curNode;
                    }
                }
            }else{//标准浏览器下直接使用children即可
                arr = Array.prototype.slice.call(curEle.children);
            }
            if(typeof tagName === "string"){
                for (var j = 0; j < arr.length; j++) {
                    var curEleNode = arr[j];
                    if(curEleNode.nodeName.toLowerCase() !== tagName.toLowerCase()){
                        arr.splice(j,1);
                        j--;
                    }
                };
            }
            return arr;
        }
        //3.兼容获取元素经过浏览器计算过的样式(元素对象,属性名)
        function getCss(curEle,attr){
            var val = null, reg = null;
            if(flag){
                val = window.getComputedStyle(curEle,null)[attr];//获取元素对象的css属性,可以获取到所有属性,包括设置了和没设置的属性,第一个参数是要操作的对象,第二个是伪类,在ie6~8下不兼容
            }else{
                if(attr === "opacity"){//兼容获取透明度
                    val = curEle.currentStyle["fliter"]; //=>"alpha(opacity = num)"
                    reg = /^alpha\(opacity=(\d+(?:\.\d+)?)\)$/i;
                    val = reg.test(val) ? reg.exec(val)[1]/100 : 1;
                }else{
                    val = curEle.currentStyle[attr];//ie6~8下获取
                }
            }
            reg = /^(-?\d+(\.\d+)?)(cm|px|pt|rem|em|%)?$/i;//去除部分样式单位
            return reg.test(val) ? parseFloat(val) : val;
        }
        //3.1 给当前元素某个样式设置值(增加到行内样式上的),val可以是数字和字符串
        function setCss(curEle,attr,val){
            if (attr === "float") {
                curEle["style"]["cssFloat"] =val;
                curEle["style"]["styleFloat"] = val;
                return;
            };
            if (attr === "opacity") {
                curEle["style"]["opacity"] =val;
                curEle["style"]["filter"] = "alpha(opacity=" + val * 100 +")";
                return;
            };
            var reg = /^(width|height|top|bottom|left|right|fontSize|((margin|padding)(Top|Bottom|Left|Right)?))$/;
            if (reg.test(attr)) {
                if(!isNaN(val)){//判断传进来的值是否为数字,如果为数字补加单位
                    val += 'px';
                }
            };
            curEle["style"][attr] = val;
        }
        //3.2 给当前元素批量设置样式属性值,options是json对象形式
        function setGroupCss(curEle,options){
            if(Object.prototype.toString.call(options) !== "[object Object]"){
                return;
            }
            for(var key in options){
                if (options.hasOwnProperty(key)) {
                    this.setCss(curEle,key,options[key]);
                };
            }
        }
        //3.3 实现获取,单独设置,批量设置元素的样式值
        function css(curEle){
            var argTow = arguments[1];
            if(typeof argTow === "string"){//判断第二个参数是一个字符串,再判断是否存在第三个参数
                var argThree = arguments[2];
                if (typeof argThree === "undefined") {//第三个参数不存在
                    return this.getCss.apply(this, arguments);
                };
                //第三个参数存在
                this.setCss.apply(this, arguments);
            }
            argTow = argTow || 0;
            if(argTow.toString() === "[object Object]"){
                //批量设置样式属性值
                this.setGroupCss.apply(this, arguments);
            }

        }
        //3.4 获取元素transform样式
        function getTransform(curEle){
            var iboxtransf = utils.getCss(curEle,'transform');
            console.log(iboxtransf)
            var reg = /\((.+)\)/g , arr = [];
            iboxtransf.replace(reg,function(){
                arr = arguments[1].split(", ")
            })
            return arr;
        }
        //4.获取元素到body的左/上偏移,无论父级参照物是谁(传入元素对象)
        function offset(curEle){
            var totalLeft = null,totalTop = null,par = curEle.offsetParent;
            totalLeft += curEle.offsetLeft;
            totalTop +=curEle.offsetTop;
            while(par){
                if(navigator.userAgent.indexOf("MSIE 8.0") === -1){//ie8中已经加过了
                    //累加父级参照物的边框
                    totalLeft += par.clientLeft;
                    totalTop +=par.clientTop;
                }
                //累加父级参照物本身的偏移
                totalLeft += par.offsetLeft;
                totalTop +=par.offsetTop;
                par = par.offsetParent;
            }
            return {left:totalLeft,top:totalTop}
        }
        //5.获取链接中的参数部分(传入字符串形式的url,返回json格式)
        function queryURLParameter(url){
            var quesIndex = url.indexOf('?');
            if(quesIndex === -1){
                return {}
            }
            else{
                var str2 = str.substr(quesIndex+1);
                var arr2=[];
                var json={};
                arr = str2.split('&')
                for(var i = 0;i < arr.length;i++){
                    arr2 = arr[i].split('=');
                    json[arr2[0]] = arr2[1];
                }
                return json;
            }
        }
        //6.获取元素transform:translate(X/Y)的值,asix参数为字符X或Y
        function getTranslate(node,asix){
            var regRule = eval('/translate('+asix+'|\\dd)?\\(\\s*(\\w+\\s*,)?\\s*([^,]+)(\\s*,[^)]+)?\\s*\\)/');
            var regRule2 = /matrix\(.*,\s*(\w+)\s*\)/;
            var transform = node.style.transform;
            var reg;
            if(!transform){
                return null;
            }
            reg = regRule.exec(transform);
            if(null === reg){
                reg = regRule2.exec(transform);
                return reg ? reg[1] : null;
            }
            return reg[3];
        }
        //7.获取上一个哥哥元素节点
        function prev(curEle){
            if(flag){
                return curEle.previousElementSibling;
            }
            var pre = curEle.previousSibling;
            while(pre && pre.nodeName !== 1){
                pre = pre.previousSibling;
            }
            return pre;
        }
        //8.获取下一个弟弟元素节点
        function next(curEle){
            if(flag){
                return curEle.nextElementSibling;
            }
            var nex = curEle.nextSibling;
            while (nex && nex.nodeType !== 1){
                nex = nex.nextSibling;
            }
            return nex;
        }
        //9.获取所有的哥哥元素节点
        function prevAll(curEle){
            var arr = [];
            var pre = this.prev(curEle);
            while(pre){
                arr.unshift(pre);
                pre = this.prev(pre);
            }
            return arr;
        }
        //10.获取所有的弟弟元素节点
        function nextAll(curEle){
            var arr = [];
            var nex = this.next(curEle);
            while(nex){
                arr.push(nex);
                nex = this.next(nex);
            }
            return arr;
        }
        //11.获取相邻的两个兄弟元素节点
        function sibling(curEle){
            var pre = this.prev(curEle);
            var nex = this.next(curEle);
            var arr = [];
            pre ? arr.push(pre) : null;
            nex ? arr.push(nex) :null;
            return arr;
        }
        //12.获取所有兄弟元素节点
        function siblings(curEle){
            return this.prevAll(curEle).concat(this.nextAll(curEle));
        }
        //13.index:获取当前元素在自己父级元素中的索引
        function index(curEle){
            return this.prevAll(curEle).length;
        }
        //14.获取第一个元素子节点
        function firstChild(curEle){
            var chs = this.children(curEle);
            return chs.length > 0 ? chs[0] : null;
        }
        //15.获取最后一个元素子节点
        function lastChild(curEle){
            var chs = this.children(curEle);
            return chs.length > 0 ? chs[chs.length - 1] : null;
        }
        //16.向指定容器的末尾追加元素
        function append(newEle,container){
            container.appendChid(newEle);
        }
        //17.向指定容器的开头追加元素
        function prepend(newEle,container){
            var fir = this.firstChild(container);
            if(fir){
                container.insertBefore(newEle,fir);
                return;
            }
            container.appendChid(newEle);
        }
        //18.把新元素(newEle)追加到指定元素(oldEle)的前面
        function insertBefore(newEle,oldEle){
            oldEle.parentNode.insertBefore(newEle,oldEle);
        }
        //19.把新元素(newEle)追加到指定元素(oldEle)的后面
        function insertAfter(newEle,oldEle){
            var nex = this.next(oldEle);
            if (nex) {
                oldEle.parentNode.insertBefore(newEle,nex);
                return ;
            }
            oldEle.parentNode.appendChid(newEle);
        }
        //20.判断当前元素(curEle)中是否包含className这个样式类名
        function hasClass(curEle,className){
            var reg = new RegExp("(^| +)"+className+"( +|$)");
            return reg.test(curEle.className);
        }
        //21.给元素增加样式类名
        function addClass(curEle,className){
            //为了防止className传递进来的值包含多个样式类名("class1 class2"),我们把传递进来的字符串按照1到多个空格拆分成数组中的每一项
            var arr = className.replace(/(^ +| +$)/g,"").split(/ +/g);//先用replace去除字符串首尾空格
            for (var i = 0; i < arr.length; i++) {
                var curName = arr[i];
                if (!this.hasClass(curEle,curName)) {
                    curEle.className += " " +curName;
                };
            };
        }
        //22.移除元素样式类名
        function removeClass(curEle,className){
            var arr = className.replace(/(^ +| +$)/g,"").split(/ +/g);
            for (var i = 0; i < arr.length; i++) {
                var curName = arr[i];
                if (this.hasClass(curEle,curName)) {
                    var reg = new RegExp("(^| +)" + curName +"( +|$)","g");
                    curEle.className = curEle.className.replace(reg," ");
                };
            };
        }
        //23.通过元素的样式类名获取一组元素集合
        //className:要获取的样式类名(可能是一个也可能是多个)
        //context:获取元素上下文(如果不传,默认document)
        function getElementsByClassName(className,context){
            context = context || document;
            if (flag) {
                return this.listToArray(context.getElementsByClassName(className))
            }
            var classNameArr = className.replace(/(^ +| +$)/g,"").split(/ +/g);
            var nodeList = context.getElementsByTagName('*');//获取上下文所有元素标签
            var arr = [];
            for (var i = 0; i < nodeList.length; i++) {
                var curNode = nodeList[i];
                var isOk= true;
                for (var j = 0; j < classNameArr.length; j++) {
                    var curName = classNameArr[j];
                    var reg = new RegExp("(^| +)"+classNameArr[j]+"( +|$)");
                    if(!reg.test(curNode.className)){
                        isOk = false;
                        break;
                    }
                }
                if(isOk){
                    arr.push(curNode);
                }
            }
            return arr;
        }



        //Tow item
        //1.选项卡插件(容器,设置初始状态所在位置,触发的事件[后面两个可省略])
        function Tab(tab,num,ev){
            num = num || 0;
            ev = ev || 'onclick';
            var tabFirst = utils.firstChild(tab) ,
                tabFirstChild = utils.children(tabFirst) ,
                divList = utils.children(tab).slice(1,utils.children(tab).length);
            for (var i = 0; i < tabFirstChild.length; i++) {
                utils.removeClass(tabFirstChild[i],'select');
                utils.removeClass(divList[i],'select');
            };
            utils.addClass(tabFirstChild[num],'select');
            utils.addClass(divList[num],'select');
            tabFirst[ev] = function(e){
                e = e || window.event;
                e.target = e.target || e.srcElement;
                if(e.target.tagName.toLowerCase() === "li"){
                    var index = utils.index(e.target);
                    for (var i = 0; i < tabFirstChilds.length; i++) {
                        utils.removeClass(tabFirstChilds[i],'select')
                        utils.removeClass(divList[i],'select')
                    };
                    utils.addClass(e.target,'select');
                    utils.addClass(divList[index],'select')
                }
            }
        }
        //2.动画库(目标元素,运动到目的地[可以是对象形式],运动总时间,运动方式,回调函数[后面两个可省略])
        function Animate(curEle,target,duration,effect,callback){
            // 处理需要的动画效果
            var tempEffect = Effect.Linear;
            if(effect instanceof Array){
                tempEffect = effect.length >= 2 ? Effect[effect[0]][effect[1]] : Effect[effect[0]];
            }
            else if(typeof effect ==='function'){
                callback = effect;
            }
            clearInterval(curEle.timer);
            //根据target获取每一个方向的起始值begin和总距离change
            var begin = {}, change = {};
            for(var key in target){
                //key :方向,例如:top/left...
                if(target.hasOwnProperty(key)){
                    begin[key] = utils.css(curEle,key);
                    change[key] = target[key] - begin[key];
                }
            }
            //实现多方向运动动画
            var time = 0
            curEle.timer = setInterval(function(){
                time += 10;
                //到达目标: 结束动画,让当前元素样式等于目标值
                if (time >= duration) {
                    utils.css(curEle,target)
                    clearInterval(curEle.timer);
                    if(typeof callback === 'function'){
                        callback.call(curEle);
                    }
                    return;
                };
                //没有达到目标:分别获取每个方向的当前位置,给当前元素设置样式即可
                for(var key in target){
                    if(target.hasOwnProperty(key)){
                        var curPos = tempEffect(time,begin[key],change[key],duration);
                        utils.css(curEle,key,curPos);
                    }
                }
            },10)
        }
        //3.轮播图插件(参数 : 容器,存储img数据的数组,每次切换间隔时间,切换图片所用时间[后面两个可省略])
        function Carousel(bannerObj,data,timeInt,timeTra){
            ~function(){
                //1 默认参数设置:
                timeInt = timeInt || 3000;
                timeTra = timeTra || 400;
                //2 获取和绑定数据
                var str = '';
                for (var i = 0; i < data.length; i++) {
                    str += "<img src='' height = '"+data[i].height+"' width = '"+data[i].width+"' isSrc = '"+data[i].isSrc+"'>"
                };
                var contentObj = utils.children(bannerObj)[0];
                contentObj.innerHTML = str;
                var dot = utils.children(bannerObj)[1],
                    leftObj = utils.children(bannerObj)[2],
                    rightObj = utils.children(bannerObj)[3],
                    contentImg = utils.children(contentObj,'img'),
                    imgNum = contentImg.length,
                    imgWidth = contentImg[0].offsetWidth;
                str = '';
                //3 创建对应数量的li并定义index属性,克隆相关img插入content中
                for (var i = 0; i < contentImg.length; i++) {
                    if(i == 0){
                        utils.append(contentObj,contentImg[i].cloneNode(true));
                        str += "<li class = 'on' index = "+ (i+1) +"></li>"
                        continue;
                    }
                    if(i == contentImg.length-1){utils.prepend(contentObj,contentImg[i].cloneNode(true))}
                        str += "<li index = "+ (i+1) +"></li>"
                };
                dot.innerHTML = str;
                var dotLi = dot.getElementsByTagName('li');
                contentImg = utils.children(contentObj,'img');
                //4 图片延时加载
                setTimeout(function(){
                    for (var i = 0; i < contentImg.length; i++) {
                        ~function(i){
                            var newImg = new Image;
                            newImg.src = contentImg[i].getAttribute('isSrc');
                            newImg.onload = function(){
                                contentImg[i].src = this.src;
                                Animate(contentImg[i],{opacity:1},500)
                                newImg = null;
                            }
                        }(i)
                    };
                },2000)
                //5 设置dom元素相关样式:
                bannerObj.style.width = imgWidth + 'px';
                contentObj.style.width = (imgNum+2)*imgWidth + 'px';
                contentObj.style.left = -imgWidth + 'px';
                //6 设置动画相关属性:
                var index = 1 , animated = false , timer = null;
                //7 点击右侧按键动画:
                rightObj.onclick = function(){
                    if(!animated){
                        animate(-imgWidth);
                        if(index == imgNum){
                            index = 1
                        }
                        else{
                            index++
                        }
                        showdot()
                    }
                }
                //8 点击左侧按键动画:
                leftObj.onclick=function(){
                    if(!animated){
                        animate(imgWidth)
                        if(index == 1){
                            index = imgNum
                        }
                        else{
                            index--
                        }
                        showdot()
                    }
                }
                //9 点击li动画
                bannerObj.onclick = function(event){
                    event = event || window.event
                    var target = event.target || event.srcElement
                    if(target.tagName.toLowerCase() === 'li'){
                        if(!animated){
                            var myindex = target.getAttribute('index')
                            var newindex = -imgWidth*(myindex-index)
                            animate(newindex)
                            index = myindex
                            showdot()
                        }
                    }
                }
                //10 li样式切换:
                function showdot(){
                    for(var i = 0; i < dotLi.length; i++){
                        if(dotLi[i].className == 'on'){
                            dotLi[i].className = '';
                        }
                    }
                    dotLi[index-1].className = 'on';
                }
                //11 开始动画
                var star = function(){
                    timer = setInterval(function(){
                        rightObj.click();
                    },timeInt);
                };
                //12 停止动画
                var stop = function(){
                    clearInterval(timer);
                }
                bannerObj.onmouseover=stop;
                bannerObj.onmouseout=star;
                star();
                //13 运动函数
                function animate(offset){
                    animated = true;
                    var newleft = parseInt(contentObj.style.left)+offset;//改变后的left值
                    var time = timeTra;//位移时间
                    var interval = 4;//位移间隔时间
                    var speed=offset/(time/interval);//每次移动的偏移量
                    ~function go(){
                        if((speed < 0 && parseInt(contentObj.style.left) > newleft) || (speed > 0 && parseInt(contentObj.style.left) < newleft)){
                             contentObj.style.left = parseInt(contentObj.style.left) + speed + 'px';
                             setTimeout(go,interval);//超时器，一次性运行
                        }
                        else{
                            if(newleft > -imgWidth){
                                contentObj.style.left = -(imgWidth*imgNum) + 'px';
                            }
                            if(newleft < -(imgWidth*imgNum)){
                                contentObj.style.left = -imgWidth + 'px';
                            }
                            animated = false;
                        }
                    }();
                }
            }();
        }
        return {
            //0.兼容获取和设置浏览器宽高
            win:win,
            //1.将类数组转化为数组(传入一个类数组)
            listToArray:listToArray,
            //2.只传入一个参数获取所有元素节点(传入一个元素),传入两个参数获取该元素下的所有目标元素(传入一个元素和目标元素)
            children:children,
            //3.兼容获取元素经过浏览器计算过的样式(元素对象,属性名)
            getCss:getCss,
            //3.1 给当前元素某个样式设置值(增加到行内样式上的)
            setCss:setCss,
            //3.2 给当前元素批量设置样式属性值,options是json对象形式
            setGroupCss:setGroupCss,
            //3.3 实现获取,单独设置,批量设置元素的样式值
            css:css,
            //3.4 获取元素transform样式
            getTransform:getTransform,
            //4.获取元素到body的左/上偏移,无论父级参照物是谁(传入元素对象)
            offset:offset,
            //5.获取链接中的参数部分(传入字符串形式的url,返回json格式)
            queryURLParameter:queryURLParameter,
            //6.获取元素transform:translate(X/Y)的值,asix参数为字符X或Y
            getTranslate:getTranslate,
            //7.获取上一个哥哥元素节点
            prev:prev,
            //8.获取下一个弟弟元素节点
            next:next,
            //9.获取所有的哥哥元素节点
            prevAll:prevAll,
            //10.获取所有的弟弟元素节点
            nextAll:nextAll,
            //11.获取相邻的两个兄弟元素节点
            sibling:sibling,
            //12.获取所有兄弟元素节点
            siblings:siblings,
            //13.index:获取当前元素索引
            index:index,
            //14.获取第一个元素子节点
            firstChild:firstChild,
            //15.获取最后一个元素子节点
            lastChild:lastChild,
            //16.向指定元素末尾追加元素
            append:append,
            //17.向指定容器的开头追加元素
            prepend:prepend,
            //18.把新元素(newEle)追加到指定元素(oldEle)的前面
            insertBefore:insertBefore,
            //19.把新元素(newEle)追加到指定元素(oldEle)的后面
            insertAfter:insertAfter,
            //20.判断当前元素中是否包含className这个样式类名
            hasClass:hasClass,
            //21.给元素增加样式类名
            addClass:addClass,
            //22.移除元素样式类名
            removeClass:removeClass,
            //23.通过元素的样式类名获取一组元素集合
            getElementsByClassName:getElementsByClassName,



            //Tow item
            //1.选项卡插件(容器,设置初始状态显示,触发的事件[后面两个可省略])
            Tab:Tab,
            //2.动画库(目标元素,运动到目的地[可以是对象形式],运动总时间,运动方式,回调函数[后面两个可省略])
            Animate:Animate,
            //3.轮播图插件(容器,存储img数据的数组,每次切换间隔时间,切换图片所用时间)
            Carousel:Carousel,
        }
    })();