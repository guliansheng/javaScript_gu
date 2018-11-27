/*
* @Author: GU
* @Date:   2018-05-16 20:59:06
* @Last Modified by:   name
* @Last Modified time: 2018-05-16 21:22:05
*/
'use strict';
//获取元素transform:translate(X/Y)的值,asix参数为字符X或Y
var getTranslate = function(node,asix){
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