import * as cartService from "./services/cart.js";
import createItem from "./services/item.js";

console.log("🛒 Welcome to Shopee Cart! (Enhanced Version)\n");

// Initialize cart (load from file if exists)
const myCart = cartService.initCart();

// Create items
const item1 = await createItem("HotWheels Ferrari", 20.99, 2);
const item2 = await createItem("HotWheels Lamborghini", 39.99, 3);
const item3 = await createItem("HotWheels Porsche", 15.50, 1);

// Test duplicate handling - adding item1 again should increment quantity
console.log("\n📦 Testing duplicate item handling:");
await cartService.addItem(myCart, item1);

// Add items to cart
console.log("\n➕ Adding items to cart:");
await cartService.addItem(myCart, item2);
await cartService.addItem(myCart, item3);

// Display cart
cartService.displayCart(myCart);

// Test quantity limits
console.log("\n🔢 Testing quantity limits:");
const maxItem = await createItem("Test Item", 10.00, 100); // Exceeds max (99)
cartService.addItem(myCart, maxItem);

// Remove items
console.log("\n➖ Removing items:");
await cartService.removeItem(myCart, item2);
await cartService.removeItem(myCart, item2); // Should remove completely after 3 removals

// Display updated cart
cartService.displayCart(myCart);

// Calculate total with discount code
console.log("\n💰 Testing discount codes:");
console.log("Without discount:");
cartService.calculateTotal(myCart);

console.log("\nWith valid discount (SHOPEE10 - 10% off):");
cartService.calculateTotal(myCart, "SHOPEE10");

console.log("\nWith invalid discount:");
cartService.calculateTotal(myCart, "INVALID");

// Try to load cart again to verify persistence
console.log("\n💾 Verifying persistence - loaded cart:");
const loadedCart = cartService.initCart();
cartService.displayCart(loadedCart);
cartService.calculateTotal(loadedCart);
