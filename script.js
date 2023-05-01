import dictionary from './dictionary.js';
import Keyboard from './keyboard.js';

function createPage() {
  const body = document.querySelector('body');

  const textarea = document.createElement('textarea');
  textarea.classList.add('textarea');
  body.appendChild(textarea);
  const keyContainer = document.createElement('div');
  keyContainer.classList.add('keyboard');
  body.appendChild(keyContainer);

  const keyboard = new Keyboard(dictionary, keyContainer);

  function clickPhysButton(event) {
    event.preventDefault();
    const key = keyContainer.querySelector(`[data-code="${event.code}"]`);
    if (key) {
      keyboard.clickButton(event.code, event.type);
    }
  }

  function clickVirtButton(event) {
    const target = event.target;
    if (target.tagName === 'BUTTON') {
      keyboard.clickButton(target.dataset.code, event.type);
    }
  }

  function changeState(event) {
    event.preventDefault();
    const key = keyContainer.querySelector(`[data-code="${event.code}"]`);
    if (key) {
      keyboard.changeState(event.code);
    }
  }

  window.addEventListener('keydown', clickPhysButton);
  window.addEventListener('keyup', clickPhysButton);
  keyContainer.addEventListener('mousedown', clickVirtButton);
  keyContainer.addEventListener('mouseup', clickVirtButton);

  window.addEventListener('keydown', changeState);
  window.addEventListener('keyup', changeState);
}

window.addEventListener('load', createPage);
