class Keyboard {
  constructor(dictionary, keyContainer) {
    this.dictionary = dictionary;
    this.keyContainer = keyContainer;

    this.createKeyboard();

    this.caseState = false;
  }

  createKeyboard() {
    for (let i = 0; i < this.dictionary.length; i += 1) {
      let rowCount = 5;
      while (rowCount !== this.dictionary[i].row) {
        const row = document.createElement('div');
        row.classList.add('row');
        this.keyContainer.append(row);
        rowCount = this.dictionary[i].row;
      }
      const button = document.createElement('button');
      button.innerText = this.dictionary[i].keyEn;
      button.classList.add('keyboard__key');
      button.dataset.code = this.dictionary[i].code;
      document.querySelectorAll('.row')[rowCount].append(button);
    }
  }

  clickButton(code, type) {
    const item = this.dictionary.find(value => value.code === code);
    const textarea = document.querySelector('.textarea');
    if (type !== 'keyup' && type !== 'mouseup') {
      if (this.caseState && !item.isAdvance) {
        textarea.value = `${textarea.value}${item.keyEn.toUpperCase()}`;
      } else {
        textarea.value = `${textarea.value}${item.keyEn}`;
      }
    }
    this.checkButton(code, type);
  }

  changeState(code) {
    const x = this.keyContainer.querySelector(`[data-code="${code}"]`);
    x.classList.toggle('press');
  }

  checkButton(code, type) {
    if (code === 'CapsLock' || code === 'ShiftLeft' || code === 'ShiftRight') {
      this.changeCase(code, type);
    }
  }

  changeCase(code, type) {
    const mas = this.keyContainer.querySelectorAll('.keyboard__key');
    if (code === 'CapsLock' && (type !== 'keyup' && type !== 'mouseup')) {
      this.caseState = !this.caseState;
      this.changeState(code);
    }
    for (let i = 0; i < mas.length; i += 1) {
      let currentButton;
      if ((code === 'ShiftLeft' || code === 'ShiftRight') && (type === 'keydown' || type === 'mousedown') && !this.dictionary[i].isAdvance) {
        if (this.dictionary[i].shiftEn !== undefined) {
          currentButton = this.dictionary[i].shiftEn;
        } else {
          currentButton = this.dictionary[i].keyEn.toUpperCase();
        }
        mas[i].innerText = currentButton;
      } else if ((code === 'ShiftLeft' || code === 'ShiftRight') && type === 'keyup' && !this.caseState && !this.dictionary[i].isAdvance) {
        currentButton = this.dictionary[i].keyEn;
        mas[i].innerText = currentButton;
      } else if (this.caseState && !this.dictionary[i].isAdvance) {
        currentButton = this.dictionary[i].keyEn.toUpperCase();
        mas[i].innerText = currentButton;
      } else if (!this.caseState && !this.dictionary[i].isAdvance) {
        currentButton = this.dictionary[i].keyEn.toLowerCase();
        mas[i].innerText = currentButton;
      }
    }
  }
}

export default Keyboard;
