import dictionary from './dictionary.js';
import Keyboard from './keyboard.js';

const createPage = () => {
  const body = document.querySelector('body');
  body.classList.add('body');

  const textarea = document.createElement('textarea');
  textarea.classList.add('textarea');
  body.appendChild(textarea);
  const keyContainer = document.createElement('div');
  keyContainer.classList.add('keyboard');
  body.appendChild(keyContainer);
  const description = document.createElement('p');
  description.textContent = 'Клавиатура создана в операционной системе Windows. Для переключения языка нажмите клавиши: Left Ctrl +  Alt.';
  description.classList.add('description');
  body.appendChild(description);
  const keyboard = new Keyboard(dictionary, keyContainer);

  const clickPhysButton = (event) => {
    event.preventDefault();
    const key = keyContainer.querySelector(`[data-code="${event.code}"]`);
    if (key) {
      keyboard.clickButton(event.code, event.type);
    }
  };

  const clickVirtButton = (event) => {
    const { target: current } = event;
    if (current.tagName === 'BUTTON') {
      keyboard.clickButton(current.dataset.code, event.type);
    }
  };

  const changeState = (event) => {
    event.preventDefault();
    const key = keyContainer.querySelector(`[data-code="${event.code}"]`);
    if (key) {
      keyboard.changeState(event.code);
    }
  };

  window.addEventListener('keydown', clickPhysButton);
  window.addEventListener('keyup', clickPhysButton);
  keyContainer.addEventListener('mousedown', clickVirtButton);
  keyContainer.addEventListener('mouseup', clickVirtButton);

  window.addEventListener('keydown', changeState);
  window.addEventListener('keyup', changeState);
};

window.addEventListener('load', createPage);
