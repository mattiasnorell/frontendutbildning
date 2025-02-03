// Då vi redan har en funktion som heter reverse ger importen ett alias för att undvika konflikter
import {reverse as lodashReverse} from 'lodash-es';

function reverse(input) {
    return lodashReverse(input);
}

function length(input) {
    return input.length;
}

export { reverse, length }