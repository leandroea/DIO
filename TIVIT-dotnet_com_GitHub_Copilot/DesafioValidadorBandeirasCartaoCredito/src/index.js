const { detectCardBrand } = require('./detector');

const cardNumber = prompt("Enter a credit card number: ");
const brand = detectCardBrand(cardNumber);

if (brand) {
    console.log(`The credit card brand is: ${brand}`);
} else {
    console.log("Invalid credit card number.");
}