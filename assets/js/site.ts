require('./monitor');

document.body.className = 'has-js';

let welcome = document.getElementById('welcome');
welcome.style.opacity = '1';
let elements = welcome.getElementsByTagName('i');
let i = 0;
let type = () => {
	
	if(i < elements.length) {
		elements[i].style.opacity = '1';
		setTimeout(type, 150);
	}
	if(i > 0) {
		elements[i-1].className = 'r';
	}
	i++
}
setTimeout(type, 500);