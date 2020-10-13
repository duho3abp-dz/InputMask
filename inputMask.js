'use strict';

const inputMask = (inputClass) => {
    const input = document.querySelector(inputClass);
    let value = '',
        click = 0;

    const testValue = () => {
        if (value.length <= 3) {
            input.value = `+7 (${value}`;
        } else if (value.length > 3 && value.length <= 6) {
            let first = value.slice(0, 3),
                second = value.slice(3, 6);

            input.value = `+7 (${first}) ${second}`;
        } else if (value.length > 6 && value.length <= 8) {
            let first = value.slice(0, 3),
                second = value.slice(3, 6),
                third = value.slice(6, 8);
                
            input.value = `+7 (${first}) ${second}-${third}`;
        } else if (value.length > 8 && value.length <= 10) {
            let first = value.slice(0, 3),
                second = value.slice(3, 6),
                third = value.slice(6, 8),
                fourth = value.slice(8, 11);

            input.value = `+7 (${first}) ${second}-${third}-${fourth}`;
        }
    };

    const addValue = (num) => {
        if (value.length < 10) {
            value += num;
            testValue();
        } else {
            testValue();
        }
        
    };

    input.addEventListener('click', e => {
        click++;
        if (click === 1) {
            input.value = `+7 (`;
        }
    });

    input.addEventListener('input', e => {
        console.dir(e);
        if (+e.data || e.data === '0') {

            addValue(e.data);

        } else if (e.inputType === 'deleteContentBackward') {

            value = value.slice(0, value.length - 1);
            input.value = `+7 (${value}`;

        } else {

            input.value = `+7 (${value}`;
            
        }
    });
};

inputMask('.test-input');