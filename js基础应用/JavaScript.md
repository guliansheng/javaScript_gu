#JavaScript
##1 基础
####1.1 弹出框
- 弹出框的内容最后都会被转换为字符串输出(调用toString这个方法)
```javascript
    alert(1 + 1);//=>"2";
```

####1.2 控制台
- console.dir()  //比console.log()更加详细
- console.table()  //将json以表格形式展现出来

####1.3 命名规范
- 常用简写
    - info : information 信息
    - init : initialization 初始化
    - add / insert / create : 增加/创建/插入
    - remove / rm / clear / del / delete : 删除
    - get / query / select : 查询/获取
- 常规规范
    - var _XXX;//=>一般以下划线开头的代表变量是一个全局或者公用的变量
    - JS中很多的词都是有特殊含义的，我们这些词叫做关键字；现在没有特殊含义，以后可能会作为关键词的，我们叫做保留字；而关键字和保留字都不可以随便用来命名

####1.4 数据类型转换
- '==' 两边
    + 两个等于号比较，左右两边数据值的类型不一样，浏览器会把两边的类型使用Number()方法都转换为数字然后再比较，但是null和undefined除外
    ```
    null == undefined  //=> true
    null === undefined //=> false 
    null == 0 //=> false  null和undefined和其他任何值都不相等
    '' == 0 //=> true
    ```
    + 等号两边类型相同,进行 '===' 比较 (不会进行强制类型转换)

##2 内置函数
####2.1 Math
- random 获取[n,m]之间的随机整数
```
Math.round(Math.random()*(m-n)+n)
```

##3 DOM元素

####3.1 获取方法
- document.getElementById   (一个元素对象)

- [context].getElementsByTagName (元素集合)

- [context].getElementsByClassName (元素集合)

- document.getElementsByName  (节点集合[NodeList])

- document.documentElement (获取整个HTML对象)

- document.body  (获取整个BODY对象)

- document.head  (获取整个HEAD对象)

- [context].querySelector  (一个元素对象)

- [context].querySelectorAll  (获取元素集合)


####3.2 元素节点
- 元素节点
    + nodeType：1 
    + nodeName：大写标签名（在部分浏览器的怪异模式下，我们写的标签名是小写，它获取的就是小写.…）
    + nodeValue:null
    + [curEle].tagName：获取当前元素的标签名（获取的标签名一般都是大写）

- 文本节点
    + nodeType:3 
    + nodeName：#text 
    + nodeValue：文本内容

- 注释节点
    + nodeType:8
    + nodeName:#comment
    + nodeValue:注释内容

- 文档节点
    + nodeType:9
    + nodeName:#document
    + nodeValue：null 


####3.3 节点关系
- previousSibling：获取当前节点的上一个哥哥节点（不
一定是元素节点也可能是文本或者注释）

- nextSibling：获取当前节点的下一个弟弟节点

- firstChild：当前元素所有子节点中的第一个（也不一定是元素节点，可能是文本和注释）
- lastChild：当前元素所有子节点中的最后一个

- previousElementSibling：获取当前节点的上一个哥哥
元素节点

- nextElementSibling：获取当前节点的下一个弟弟元素节点

- firstElementChild：第一个子元素节点

- lastElementChild：最后一个子元素节点
> 获取[元素节点] (不是节点) 的属性都不兼容IE6~8;


####3.4 DOM渲染
- 回流(重排 reflow) : 当页面中的HTML结构发生变化(增加,删除元素,位置发生变化...),浏览器都需要重新计算一遍最新的DOM结构,重新对当前页面进行渲染

    > js中要尽量减少回流

- 重绘 : 某一个元素的部分样式发生改变,浏览器只需要重新渲染当前元素即可

####3.5 DOM映射机制
 - 页面中的标签和js中获取到的元素对象(元素集合)是紧紧的绑定在一起的,页面中的HTML结构发生改变了,js中不需要重新获取,集合里面的内容也会跟着自动改变
```JavaScript
    var oUl=document.getElementById("ul");
    var oLis=oUl.getElementsByTagName("li");
    console.log(oLis.length);//->6
    var oLi=document.createElement("li");
    oUl.appendChild(oLi);
    console.log(oLis.length);//->7 没有重新的获取，但是oLis这个集合中的长度和内容会自动跟着发生改变
```

##4 属性设置
####4.1 设置自定义属性方法的区别
- 1.xxx.index：是把当前操作的元素当做一个普通对象，为其设置一个属性名,和页面中的HTML标签没关系,不会在dom元素身上显示,但是可以在对象身上添加相应属性值

- 2.xxx.setAttribute：把元素当做特殊的元素对象来处理，设置的自定义属性是和页面结构中的DOM元素映射在一起的,可以在HTML结构中看到设置的属性,但是没有在对象身上添加相应属性

####4.2 自定属性和元素自带属性
- 与页面HTML结构无关的普通对象

- 与页面HTML结构存在映射关系的元素对象
> 元素对象中的内置属性，大部分都和页面的标签存在映射关系
> 
> xxx.style.backgroundColor='xxx'此时不仅把JS中对象对应的属性值改变了，而且也会映射到页面的HTML标签上（标签中有一个style行内样式、元素的样式改变了）
> 
> xxx.className='xxx'此时不仅是把S对象中的属性值改了，而且页面中的标签增加了class样式类（可以看见的）

##5 正则

####5.1 正则含义
- 他就是一个规则,用来处理字符串的一个规则(正则就是用来处理字符串)

####5.2 创建正则
- 字面量方式: 
    - var reg = /\d/;
    
- 实例创建方式:
    - var reg = new RegExp("");

- 正则两种创建方式是有区别的
    - 在字面量方式中 , //之间包起来的所有 内容都是元字符,有的具有特殊的意义,大部分都是代表本身含义的普通元字符
    ```javaScript
    var name = 'gu'
    var reg = /^\d+"+name+"\d+$/;//并不是字符串拼接
    console.log(reg.test('200gu222')) //->flase
    console.log(reg.test('200'''guuu'222)) //->true

    //所以这种需求只能用实例方式创建
    
    var name = 'gu';
    reg = new RegExp("^\\d+"+name+"\\d+$","g");
    console.log(reg.test('200gu222')) //->true;
    ```
    - 字面量中直接写\d就可以了,实例方式中需要转义 \\\d

####5.3 处理字符串
- 匹配 : 使用reg.test(str)判断一个字符串是否符合我们制定的规则
```JavaScript
var reg = /\d/;
console.log(reg.test('zhu')); //->false
console.log(reg.test('1')); //->true
console.log(reg.test('zhufeng01')); //->true
```

- 捕获 : 使用reg.exec(str)把字符串中符合我们正则规则的内容捕获到
```JavaScript
var reg = /\d/;
console.log(reg.exec('zhu')); //->null
console.log(reg.exec('1')); //-> 1
```

####5.4 正则捕获
- 没一次捕获的时候都是先进行默认匹配,如果没有匹配成功的,捕获的结果是null;只有有匹配的内容我们才能捕获到

- 捕获的内容:    
    - 捕获到的内容是一个数组
    
    - 数组中的第一项是当前正则捕获的内容
    
    - index:捕获内容在字符串中开始的索引位置
    
    - input:捕获的原始字符串

- 正则捕获特点:
    - 懒惰性 : 每一次执行exec只捕获第一匹配内容,在不进行任何处理的情况下,再次执行多次捕获,捕获内容还是第一匹配的内容
    
    > lastIndex : 是正则每一次捕获在字符串中开始查找的位置,默认值是0,如果不做任何处理,每一次值都是0,可以加全局修饰符 g 改变该值;
    
    - 贪婪性 : 正则每一次捕获都是按照匹配最长的结果捕获的,符合正则条件时,会完全捕获到
    
    > 解决贪婪性,在量词元字符后面加上?元字符
    
    ```JavaScript
    var reg = /\d+?/g;
    var str = "29839jlsafi78789";
    //不加?结果:["29839"...]
    console.log(reg.exec(str));//=>["2"...]
    ```

    - 字符串方法match()可以直接获取到所有符合正则的内容,不需要循环执行exec方法,但是match只能捕获大正则匹配的内容,而对小正则捕获的内容是无法获取的(不能获取到分组的正则匹配)
    
- 正则分组

    - 改变优先级
    
    - 分组引用 
    ```JavaScript
    // \1代表和第一个分组一模一样的内容,\2代表和第二个分组一模一样的内容,和对应的分组中的内容的值都要一样
    var reg = /^(\w)\1(\w)\2$/;
    console.log(reg.test("ffzz"));//true
    console.log(reg.test("fzz_"));//false
    ```

    - 分组捕获 : 正则捕获的时候,不仅仅把大正则匹配的内容捕获到,而且还可以吧小分组匹配的内容捕获到
    ```JavaScript
    // 在分组中使用 ?: 是只匹配不捕获
    var str = '342622199501013638';
    var reg=/^(\d{2})(\d{4})(\d{4})(\d{2})(\d{2})(\d{2})(\d)(?:\d|X)$/;
    console.log(reg.exec(str));// => ["342622199501013638", "34", "2622", "1995", "01", "01", "36", "3",  index: 0, input: "342622199501013638"]
    console.log(str.match(reg))//和上面效果相同

    var str2 = 'gu123gu234gu4560';
    var reg2 = /gu(\d+)/g;
    console.log(reg2.exec(str2)) //=>["gu123","123"...] 
    console.log(reg2.exec(str2)) //=>["gu234","234"...]
    console.log(reg2.exec(str2)) //=>["gu345","345"...]
    console.log(str2.match(reg2)) //=>["gu123","gu234","gu345"]
    ```

    - replace执行机制
    ```JavaScript
    //和exec的机制相似
    var str = 'gu2893gu898gu674';
    var reg = /gu(\d+)/g;
    str.replace(reg,function(){ //捕获几次,执行几次密名函数
        console.log(arguments) //arguments就是捕获到的值组成的类数组,同样可以捕获到分组的内容
        return 'gu捕获到了' //return的值就是要替换的值
    })
    ```


##6 事件
####6.1 非常用事件
- onmousewheel (鼠标滚轮滚动行为)

- onresize (window.onresize浏览器窗口大小改变事件)

- onunload (浏览器关闭事件)

####6.2 鼠标事件
- 原型链: MouseEvent --> UIEevent --> Event --> Object

- MouseEvent 记录的是页面中唯一一个鼠标每一次触发时候的相关信息,和到底在哪个元素上触发的没有关系

- pageX | Y兼容处理 : event.pageX | Y = event.pageX | Y || (e.clientX + (document.documentElement.scrollLeft | Top || document.body.scrollLeft | Top));

####6.3 事件传播机制
- 先进行捕获阶段,再到目标阶段(可以不加),最后是冒泡阶段

- 使用DOM零级事件给元素的某一个行为绑定的方法,都是在行为触发后的冒泡阶段把方法执行的

- 无论元素是否绑定行为方法,都会触发相关事件,并进行事件传播,只是不绑定方法的不会有方法被执行


##7 DOM二级事件绑定
####7.1 原理
- 是让元素对象通过原型链一直找到EventTarget这个内置类原型上的addEventListener方法实现的

####7.2 和DOM零级事件绑定的区别
- DOM零级事件绑定 : 只能给一个元素的某个行为绑定一次方法, 第二次绑定会把之前的覆盖掉

- DOM二级事件绑定 : 可以给某个元素同一个行为绑定多个 "不同" 的方法 , 如果方法相同只能留一个 , 但是在捕获和冒泡阶段可以为同一个行为绑定同一个方法,因为是在不同阶段执行的

- DOM零中的事件类型都可以绑定 , 并且DOM二级中提供了一些DOM零级没有的行为类型 (DOMContentLoaded : 当页面中的DOM结构[html结构]加载完成时触发的行为)
    
    - window.onload = function(){} -> 当页面中的所有资源加载完成(图片 , HTML结构 , 音视频 ...)才会执行后面的函数;并且同一个页面中只能用一次 , 后面再写会把前面的覆盖掉; => 因为他是采用DOM零级事件绑定的
    
    - jQuery: $(document).ready(function(){}) -> $(function(){}) 只要当前页面中的HTML结构加载完成就会执行对应的函数;并且同一个页面中可以出现多次;这是因为他采用DOM二级事件绑定 , 并且绑定的行为是DOM二级中新增的DOMContentLoaded

####7.3 绑定和移除
- 绑定: el.addEventListener('行为' , 方法名 , 传播方式);

- 移除: el.removeEventListener('行为' , 方法名 , 传播方式);

####7.4 执行过程
- 可以给某个元素同一个行为绑定多个 "不同" 的方法 , 如果方法相同只能留一个 , 但是在捕获和冒泡阶段可以为同一个行为绑定同一个方法,因为是在不同阶段执行的

- 当行为触发 , 会按照绑定的先后顺序依次把绑定的方法执行

- 执行的方法中的this就是当前被绑定事件的元素本身

####7.5 ie6~8兼容问题
- 顺序问题：执行的时候顺序是混乱的，标淮浏览器是按照绑定顺序依次执行的

- 重复问题：IE6～8可以给同一个元素的同一个行为绑定多个相同的方法

- this问题：IE6～8中当方法执行的时候，方法中的this不是当前绑定的元素而是window
