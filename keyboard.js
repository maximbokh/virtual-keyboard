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

  clickButton(code) {
    const item = this.dictionary.find(value => value.code === code);
    const textarea = document.querySelector('.textarea');

    if (this.caseState && !item.isAdvance) {
      textarea.value = `${textarea.value}${item.keyEn.toUpperCase()}`;
    } else {
      textarea.value = `${textarea.value}${item.keyEn}`;
    }
    this.checkButton(code);
  }

  changeState(code) {
    const x = this.keyContainer.querySelector(`[data-code="${code}"]`);
    x.classList.toggle('press');
  }

  checkButton(code) {
    if (code === 'CapsLock') {
      this.changeCase();
    }
  }

  changeCase() {
    const mas = this.keyContainer.querySelectorAll('.keyboard__key');
    this.caseState = !this.caseState;
    for (let i = 0; i < mas.length; i += 1) {
      if (this.caseState && !this.dictionary[i].isAdvance) {
        mas[i].innerText = this.dictionary[i].keyEn.toUpperCase();
      } else if (!this.dictionary[i].isAdvance) {
        mas[i].innerText = this.dictionary[i].keyEn.toLowerCase();
      }
    }
  }
}

export default Keyboard;
