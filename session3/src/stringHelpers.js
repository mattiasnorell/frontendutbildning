export function reverse(input){
    return input.split('').reverse().join('');
}

export function length(input){
    if(!input) return 0;
    
    return input.length;
}