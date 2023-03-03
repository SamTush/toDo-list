import './style.css';
import Todo from './modules/Apps.js';

window.addEventListener('load', () => {
  const todo = new Todo();
  todo.show();
  todo.events();
});