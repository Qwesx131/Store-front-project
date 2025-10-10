class ShoppingCart {
    constructor() {
        this.items = [];
        this.total = 0;
        this.loadCart();
    }

    addItem(product) {
        const existingItem = this.items.find(item => item.id === product.id);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.items.push({
                id: product.id,
                title: product.title,
                price: product.price,
                quantity: 1,
                thumbnail: product.thumbnail
            });
        }
        
        this.updateTotal();
        this.saveCart();
        this.updateCartDisplay();
    }

    removeItem(productId) {
        this.items = this.items.filter(item => item.id !== productId);
        this.updateTotal();
        this.saveCart();
        this.updateCartDisplay();
    }

    updateTotal() {
        this.total = this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    }

    saveCart() {
        localStorage.setItem('cart', JSON.stringify({
            items: this.items,
            total: this.total
        }));
    }

    loadCart() {
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
            const cart = JSON.parse(savedCart);
            this.items = cart.items;
            this.total = cart.total;
            this.updateCartDisplay();
        }
    }

    updateCartDisplay() {
        const cartCount = document.getElementById('cart-count');
        const totalItems = this.items.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalItems;
    }

    showCart() {
        const cartModal = document.createElement('div');
        cartModal.className = 'cart-modal';
        
        let cartContent = `
            <div class="cart-content">
                <h2>Shopping Cart</h2>
                <div class="cart-items">
                    ${this.items.map(item => `
                        <div class="cart-item">
                            <img src="${item.thumbnail}" alt="${item.title}">
                            <div class="item-details">
                                <h3>${item.title}</h3>
                                <p>Price: $${item.price}</p>
                                <p>Quantity: ${item.quantity}</p>
                            </div>
                            <button onclick="cart.removeItem(${item.id})">Remove</button>
                        </div>
                    `).join('')}
                </div>
                <div class="cart-total">
                    <h3>Total: $${this.total}</h3>
                </div>
                <button onclick="this.closest('.cart-modal').remove()">Close</button>
            </div>
        `;
        
        cartModal.innerHTML = cartContent;
        document.body.appendChild(cartModal);
    }
}

// Initialize cart
const cart = new ShoppingCart();

// Add click event to cart icon
document.getElementById('cart-icon').addEventListener('click', () => cart.showCart());