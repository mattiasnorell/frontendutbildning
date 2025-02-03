const { test, expect } = require('@playwright/test');
import { reverse, length } from "../stringHelpers";

test.describe('StringHelpers', () => {
    test('String can be reversed', () => {
        const testString = "Hello";
        const expectedResult = "olleH";
        const result = reverse(testString);
        
        expect(result).toBe(expectedResult);
    });

    test('Can check length', () => {
        const testString = "Hello";
        const expectedResult = 5;
        const result = length(testString);

        expect(result).toBe(expectedResult);
    });

    test('Length wont crasch if input is undefined', () => {
        const testString = undefined;
        const expectedResult = 0;
        const result = length(testString);

        expect(result).toBe(expectedResult);
    });
});