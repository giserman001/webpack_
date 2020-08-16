import './index.scss'
// import './test.css'
var root= document.getElementById('app')

root.innerHTML = '<div class="iconfont iconshengdanhuoche"></div>'

import avatar from './images/avatar.jpg';

var img = new Image();
img.src = avatar;
img.classList.add('avatar');
root.append(img);