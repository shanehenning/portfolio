//Hamburger Menu Animation
var container = document.getElementById('container');
var menu = document.getElementById('menu');
menu.addEventListener('click', move);

function move(){
  container.className += 'move';
  menu.removeEventListener('click', move);
  menu.addEventListener('click', remove);
}

function remove(){
  menu.removeEventListener('click', remove);
  menu.addEventListener('click', move);
  container.className = '';
}
