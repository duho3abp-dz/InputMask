'use strict';

const inputMask = ({ inputNameIdentifier }) => {
    const phoneInputs = document.querySelectorAll(inputNameIdentifier);

    if ( !phoneInputs.length ) return;

    let value = '';
    let cursorPosition = 0;

    const addValue = input => input.value = value;

    const focusPhoneEvent = e => {
        if ( !value.length ) {
            value = '+7(';
            addValue(e.currentTarget);
        };
    };

    const blurPhoneEvent = e => {
        if ( value ===  '+7(' ) {
            value = '';
            addValue(e.currentTarget);
        };
    };

    const checkSizeNumbers = () => {
        if (value.length < 3) value = '+7(';
        if (value.length > 16) value = value.slice(0, 16); 
    };

    const changeValue = value => {
        const firstNumeral = value[0];  
        cursorPosition++;

        return `${firstNumeral}${value.slice(2)}`;
    }

    const transformationValue = ( currentValue, enteredCharacter ) => {
        const dirtyValue = currentValue.replace(/\D/igm, '');
        const clearValue = !dirtyValue ? dirtyValue : currentValue[0] === '+' ? dirtyValue.slice(1) : changeValue(dirtyValue) ;
        const valueLength = clearValue.length;

        const numeral1 = clearValue.slice(0, 1);
        const numeral2 = clearValue.slice(1, 2);
        const numeral3 = clearValue.slice(2, 3);
        const numeral4 = clearValue.slice(3, 4);
        const numeral5 = clearValue.slice(4, 5);
        const numeral6 = clearValue.slice(5, 6);
        const numeral7 = clearValue.slice(6, 7);
        const numeral8 = clearValue.slice(7, 8);
        const numeral9 = clearValue.slice(8, 9);
        const numeral10 = clearValue.slice(9, 10);

        value = valueLength < 4
        ? `+7(${numeral1}${numeral2}${numeral3}`
        : valueLength >= 4 && valueLength < 7
        ? `+7(${numeral1}${numeral2}${numeral3})${numeral4}${numeral5}${numeral6}`
        : valueLength >= 7 && valueLength < 9
        ? `+7(${numeral1}${numeral2}${numeral3})${numeral4}${numeral5}${numeral6}-${numeral7}${numeral8}`
        : `+7(${numeral1}${numeral2}${numeral3})${numeral4}${numeral5}${numeral6}-${numeral7}${numeral8}-${numeral9}${numeral10}` ;

        cursorPosition = enteredCharacter === null ? cursorPosition 
        : cursorPosition === 7 || cursorPosition === 11 || cursorPosition === 14 ? cursorPosition + 1 : cursorPosition ;
    }

    const inputPhoneEvent = e => {
        const enteredCharacter = e.data;
        const input = e.currentTarget;

        cursorPosition = input.selectionStart < 3 ? 3 : input.selectionStart ;
        value = +enteredCharacter || enteredCharacter === null ?  input.value : value ;

        transformationValue(input.value, enteredCharacter);
        checkSizeNumbers();
        addValue(input);
        input.setSelectionRange(cursorPosition, cursorPosition);
    };

    phoneInputs.forEach(input => {
        input.addEventListener('focus', focusPhoneEvent);
        input.addEventListener('input', inputPhoneEvent);
        input.addEventListener('blur',  blurPhoneEvent);
    });
};

// export default inputMask;

inputMask({
    inputNameIdentifier: '.test-input'
});

// ---------------------------------------------------------------------------- \\

// const inputMask = ({
//     inputIdentifier,
//     placeholder = '+7 (___) ___-__-__'
// }) => {
//     const input = document.querySelector(inputIdentifier);
//     let value = '';

//     const checkForAvailability = (num) => num ? num : '_';

//     const valueProcessing = () => {
//         const numeral1 = checkForAvailability(value.slice(0, 1)),
//               numeral2 = checkForAvailability(value.slice(1, 2)),
//               numeral3 = checkForAvailability(value.slice(2, 3)),
//               numeral4 = checkForAvailability(value.slice(3, 4)),
//               numeral5 = checkForAvailability(value.slice(4, 5)),
//               numeral6 = checkForAvailability(value.slice(5, 6)),
//               numeral7 = checkForAvailability(value.slice(6, 7)),
//               numeral8 = checkForAvailability(value.slice(7, 8)),
//               numeral9 = checkForAvailability(value.slice(8, 9)),
//               numeral10 = checkForAvailability(value.slice(9, 10));

//         input.value = `+7 (${numeral1}${numeral2}${numeral3}) ${numeral4}${numeral5}${numeral6}-${numeral7}${numeral8}-${numeral9}${numeral10}`;
//     };

//     const addNumber = (num) => {
//         if (value.length < 10) {
//             value += num;
//             valueProcessing();
//         } else {
//             valueProcessing();
//         }
        
//     };

//     const removeValue = () => {
//         value = value.slice(0, value.length - 1);
//         valueProcessing();
//     };

//     input.placeholder = placeholder
//     input.style.caretColor = 'transparent';

//     input.addEventListener('blur', () => {
//         if (!value.length) {
//             input.value = ''
//         }
//     });

//     input.addEventListener('input', e => {
//         if (+e.data || e.data === '0') {
//             addNumber(e.data);
//         } else if (e.inputType === 'deleteContentBackward') {
//             removeValue();
//         } else {
//             valueProcessing();
//         }
//     });
// };

// // *** If you want to test, uncomment the code below and comment out the export *** //

// // export default inputMask;

// inputMask({
//     inputIdentifier: '.test-input'
// });