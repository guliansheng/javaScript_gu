//��ȡID����
function getId(id) {
  return document.getElementById(id);
}
//��ȡclass����
function getClass(cla) {
  return document.getElementsByClassName(cla);
}
//��ȡ��ǩ��
function getTag(ta) {
  return document.getElementsByTagName(ta);
}
//��ȡ��name���Ե���ض���
function getName(name) {
  return document.getElementsByName(name);
}
//�ж�������Ƿ�Ϊ�ȸ�
function isChrome() {
  nu = navigator.userAgent;
  if (nu.match(/chrome/i)) {
    return true;
  } else {
    return false;
  }
}
//���ڱ��������ֵ�޸�
function set(i, j, value) {
  tidobj.rows[i - 1].cells[j - 1].innerHTML = value;
}
//ȥ���ַ������ҿո�
function trim(str) {
  return str.replace(/(^\s*)|(\s*$)/g, "");
}
//������������
asc = function(i, j) {
  return i - j;
};
//���齵������
asc = function(i, j) {
  return j - i;
};
