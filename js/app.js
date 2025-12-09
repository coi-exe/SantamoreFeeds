
const mockBackend = {
  products: [],
  cart: [],
  user: null,
  
  init: function() {
    // Load products from JSON
    fetch('data/products.json')
      .then(response => response.json())
      .then(data => {
        this.products = data.products;
        console.log('Products loaded:', this.products);
      });
  },
  
  login: function(phone, password) {
    
    this.user = {
      name: "John Kamau",
      phone: phone,
      zone: "Nyeri Town",
      wallet: 2500
    };
    localStorage.setItem('user', JSON.stringify(this.user));
    return true;
  },
  
  addToCart: function(productId, quantity) {
    const product = this.products.find(p => p.id === productId);
    if (product) {
      this.cart.push({
        ...product,
        quantity: quantity
      });
      localStorage.setItem('cart', JSON.stringify(this.cart));
      return true;
    }
    return false;
  }
};

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
  mockBackend.init();
  
  // Check if user is logged in
  const userData = localStorage.getItem('user');
  if (userData) {
    mockBackend.user = JSON.parse(userData);
  }
  
  // Add event listeners for login form
  const loginForm = document.querySelector('form');
  if (loginForm && window.location.pathname.includes('login.html')) {
    loginForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const phone = document.getElementById('phoneNumber').value;
      const password = document.getElementById('password').value;
      
      if (mockBackend.login(phone, password)) {
        window.location.href = 'profile.html';
      }
    });
  }
  
  // Update cart total
  updateCartTotal();
});

function updateCartTotal() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const total = cart.reduce((sum, item) => sum + (item.group_price * item.quantity), 0);
  const cartElements = document.querySelectorAll('.cart-summary strong');
  cartElements.forEach(el => {
    if (el.textContent.includes('KES')) {
      el.textContent = `KES ${total}`;
    }
  });
}
