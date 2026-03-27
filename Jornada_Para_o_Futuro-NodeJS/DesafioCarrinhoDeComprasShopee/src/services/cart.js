// Cart Service - Enhanced with new features

// Valid discount codes
const VALID_DISCOUNTS = {
  'SHOPEE10': 0.10,  // 10% off
  'SAVE20': 0.20,   // 20% off
  'VIP50': 0.50,    // 50% off
};

// Default quantity limits
const MIN_QUANTITY = 1;
const MAX_QUANTITY = 99;

// File system for persistence
import { readFileSync, writeFileSync, existsSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Get the current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Helper: Format price to Brazilian Real (R$)
function formatCurrency(value) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value);
}

// Helper: Validate quantity
function validateQuantity(quantity, operation = 'add') {
  if (operation === 'add') {
    if (quantity < MIN_QUANTITY) return { valid: false, message: 'Quantity must be at least 1' };
    if (quantity > MAX_QUANTITY) return { valid: false, message: `Quantity cannot exceed ${MAX_QUANTITY}` };
  }
  return { valid: true };
}

// Helper: Save cart to file
function saveCartToFile(userCart) {
  try {
    const cartPath = join(__dirname, '../../cart-data.json');
    const cartData = {
      items: userCart,
      savedAt: new Date().toISOString()
    };
    writeFileSync(cartPath, JSON.stringify(cartData, null, 2));
    console.log('✅ Cart saved to file');
  } catch (error) {
    console.error('❌ Error saving cart:', error.message);
  }
}

// Helper: Load cart from file
function loadCartFromFile() {
  try {
    const cartPath = join(__dirname, '../../cart-data.json');
    if (existsSync(cartPath)) {
      const data = JSON.parse(readFileSync(cartPath, 'utf-8'));
      const items = data.items || [];
      
      // Recreate the subtotal function for each item (functions can't be serialized to JSON)
      const reconstructedItems = items.map(item => ({
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        subtotal: () => item.price * item.quantity
      }));
      
      console.log('✅ Cart loaded from file');
      return reconstructedItems;
    }
  } catch (error) {
    console.error('❌ Error loading cart:', error.message);
  }
  return [];
}

// Apply discount code
function applyDiscount(code) {
  const discount = VALID_DISCOUNTS[code?.toUpperCase()];
  if (discount) {
    return { valid: true, percentage: discount, code: code.toUpperCase() };
  }
  return { valid: false, message: 'Invalid discount code' };
}

// ✅ Add item to cart (handles duplicates by incrementing quantity)
function addItem(userCart, item) {
  // Validate item
  if (!item || !item.name) {
    console.log('❌ Invalid item');
    return false;
  }

  // Validate quantity
  const qtyValidation = validateQuantity(item.quantity);
  if (!qtyValidation.valid) {
    console.log(`❌ ${qtyValidation.message}`);
    return false;
  }

  // Check for duplicate - if exists, increment quantity
  const existingItem = userCart.find(i => i.name === item.name);
  
  if (existingItem) {
    const newQuantity = existingItem.quantity + item.quantity;
    const newValidation = validateQuantity(newQuantity);
    
    if (!newValidation.valid) {
      console.log(`❌ Cannot add more: ${newValidation.message}`);
      return false;
    }
    
    existingItem.quantity = newQuantity;
    console.log(`📝 Updated "${item.name}" quantity: ${existingItem.quantity}`);
  } else {
    userCart.push(item);
    console.log(`✅ Added "${item.name}" to cart`);
  }
  
  // Auto-save after changes
  saveCartToFile(userCart);
  return true;
}

// ✅ Calculate total with discount support
function calculateTotal(userCart, discountCode = null) {
  console.log('\n🛒 Shopee Cart TOTAL:');
  console.log('─'.repeat(30));
  
  // Calculate subtotal
  const subtotal = userCart.reduce((total, item) => total + item.subtotal(), 0);
  console.log(`Subtotal: ${formatCurrency(subtotal)}`);
  
  // Apply discount if valid
  let discount = 0;
  if (discountCode) {
    const discountResult = applyDiscount(discountCode);
    if (discountResult.valid) {
      discount = subtotal * discountResult.percentage;
      console.log(`Discount (${discountResult.code}): -${formatCurrency(discount)}`);
    } else {
      console.log(`⚠️ ${discountResult.message}`);
    }
  }
  
  const total = subtotal - discount;
  console.log('─'.repeat(30));
  console.log(`🎁 TOTAL: ${formatCurrency(total)}`);
  
  return total;
}

// Delete item completely by name
function deleteItem(userCart, name) {
  const index = userCart.findIndex((item) => item.name === name);

  if (index !== -1) {
    const removed = userCart.splice(index, 1);
    console.log(`🗑️ Removed "${removed[0].name}" from cart`);
    saveCartToFile(userCart);
    return true;
  }
  
  console.log('❌ Item not found');
  return false;
}

// ✅ Remove item - decreases quantity, removes if reaches 0
function removeItem(userCart, item) {
  const indexFound = userCart.findIndex((p) => p.name === item.name);

  if (indexFound === -1) {
    console.log('❌ Item not found in cart');
    return false;
  }

  // If quantity > 1, subtract 1
  if (userCart[indexFound].quantity > 1) {
    userCart[indexFound].quantity -= 1;
    console.log(`📝 Decreased "${item.name}" quantity: ${userCart[indexFound].quantity}`);
  } 
  // If quantity = 1, remove the item
  else {
    console.log(`🗑️ Removed "${item.name}" from cart (quantity reached 0)`);
    userCart.splice(indexFound, 1);
  }
  
  saveCartToFile(userCart);
  return true;
}

// ✅ Display cart with formatted prices
function displayCart(userCart) {
  if (userCart.length === 0) {
    console.log('\n🛒 Cart is empty');
    return;
  }
  
  console.log('\n🛒 Shopee Cart Contents:');
  console.log('─'.repeat(50));
  
  userCart.forEach((item, index) => {
    console.log(
      `${index + 1}. ${item.name}` +
      `\n   Price: ${formatCurrency(item.price)} | Qty: ${item.quantity}x` +
      `\n   Subtotal: ${formatCurrency(item.subtotal())}`
    );
  });
  
  console.log('─'.repeat(50));
}

// Load cart on startup
function initCart() {
  return loadCartFromFile();
}

export { 
  addItem, 
  calculateTotal, 
  deleteItem, 
  removeItem, 
  displayCart,
  applyDiscount,
  initCart,
  formatCurrency
};
