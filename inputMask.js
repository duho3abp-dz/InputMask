'use strict';

const inputMask = ({
    inputIdentifier,
    placeholder = '+7 (___) ___-__-__'
}) => {
    const input = document.querySelector(inputIdentifier);
    let value = '';

    const checkForAvailability = (num) => num ? num : '_';

    const valueProcessing = () => {
        const numeral1 = checkForAvailability(value.slice(0, 1)),
              numeral2 = checkForAvailability(value.slice(1, 2)),
              numeral3 = checkForAvailability(value.slice(2, 3)),
              numeral4 = checkForAvailability(value.slice(3, 4)),
              numeral5 = checkForAvailability(value.slice(4, 5)),
              numeral6 = checkForAvailability(value.slice(5, 6)),
              numeral7 = checkForAvailability(value.slice(6, 7)),
              numeral8 = checkForAvailability(value.slice(7, 8)),
              numeral9 = checkForAvailability(value.slice(8, 9)),
              numeral10 = checkForAvailability(value.slice(9, 10));

        input.value = `+7 (${numeral1}${numeral2}${numeral3}) ${numeral4}${numeral5}${numeral6}-${numeral7}${numeral8}-${numeral9}${numeral10}`;
    };

    const addNumber = (num) => {
        if (value.length < 10) {
            value += num;
            valueProcessing();
        } else {
            valueProcessing();
        }
        
    };

    const removeValue = () => {
        value = value.slice(0, value.length - 1);
        valueProcessing();
    };

    input.placeholder = placeholder
    input.style.caretColor = 'transparent';

    input.addEventListener('blur', e => {
        if (!value.length) {
            input.value = ''
        }
    });

    input.addEventListener('input', e => {
        if (+e.data || e.data === '0') {
            addNumber(e.data);
        } else if (e.inputType === 'deleteContentBackward') {
            removeValue();
        } else {
            valueProcessing();
        }
    });
};

// *** If you want to test, uncomment the code below and comment out the export *** //

export default inputMask;

// inputMask({
//     inputIdentifier: '.test-input'
// });