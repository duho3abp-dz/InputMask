'use strict';

const inputMask = (inputClass) => {
    const input = document.querySelector(inputClass);
    let value = '';



    input.addEventListener('input', e => {
        if (+e.data) {
            value += e.data;
            input.value = `+7 (${value}`;
        }
    });
};

inputMask('.test-input');