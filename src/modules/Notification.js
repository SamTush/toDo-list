export default class Notification {
  static show = ($message, $className) => {
    const msg = document.createElement('div');
    msg.className = `alert alert-${$className}`;
    msg.appendChild(document.createTextNode($message));
    const containerELement = document.getElementsByTagName('form');
    const parentDiv = containerELement[0].parentNode;
    parentDiv.insertBefore(msg, parentDiv.lastElementChild);
    setTimeout(() => document.querySelector('.alert').remove(), 2000);
  }
}