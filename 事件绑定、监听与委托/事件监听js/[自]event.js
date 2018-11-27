var Event = {
  //参数: 绑定元素 , 事件类型(不加on) , 绑定的方法
  addEvent: function(element, type, callback) {
    if (element.addEventListener) {
      element.addEventListener(type, callback, false);
      return;
    }
    //解决ie6~8下绑定中的this问题
    //
    //element['e'+type+callback]=callback 作用:
    //因为在ie中，事件侦听器即事件处理函数内部的this默认指向window对象，W3C中指向所绑定的对象本身。因此为了使事件处理函数内部的this指向所绑定的对象，可以将函数赋值为该对象的某个属性成为他的方法，那么this指针就指向了所绑定的对象本身。
    if (element['e' + type + callback]) {
      return;
    } //先判断对象身上有没有该方法,有的话就不执行下面的代码,防止重复绑定同一个函数
    element['e' + type + callback] = callback;
    element[type + callback] = function() {
      element['e' + type + callback](window.event);
    }
    element.attachEvent('on' + type, element[type + callback]);
  },
  removeEvent: function(element, type, callback) {
    if (element.removeEventListener) {
      element.removeEventListener(type, callback, false);
      return;
    }
    element.detachEvent('on' + type, element[type + callback]);
    element[type + callback] = null;
  },
  getEvent: function(event) {
    return event || window.event;
  },
  getTarget: function(event) {
    return event.target || event.srcElement;
  },
  //阻止事件冒泡传递
  stopPropagation: function(event) {
    if (event.stopPropagation) {
      event.stopPropagation();
    } else {
      event.cancelBubble = true;
    }
  },
  //阻止浏览器默认行为
  preventDefault: function(event) {
    if (event.prevenDefault) {
      event.preventDefault();
    } else {
      event.returnValue = false;
    }
  }
}
