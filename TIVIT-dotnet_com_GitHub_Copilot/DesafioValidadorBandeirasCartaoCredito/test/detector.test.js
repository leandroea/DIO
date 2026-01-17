const { detectCardBrand } = require('../src/detector');

describe('Credit Card Brand Detector', () => {
    test('should identify Visa card', () => {
        expect(detectCardBrand('4111111111111111')).toBe('Visa');
    });

    test('should identify MasterCard card', () => {
        expect(detectCardBrand('5111111111111111')).toBe('MasterCard');
    });

    test('should identify American Express card', () => {
        expect(detectCardBrand('371449635398431')).toBe('American Express');
    });

    test('should identify Discover card', () => {
        expect(detectCardBrand('6011000990139424')).toBe('Discover');
    });

    test('should return Unknown for invalid card number', () => {
        expect(detectCardBrand('1234567890123456')).toBe('Unknown');
    });
});