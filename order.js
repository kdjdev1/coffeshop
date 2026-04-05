document.addEventListener('DOMContentLoaded', () => {
    const menuItems = [
        { id: 1, name: 'Premium Cappuccino', price: 3.50, img: 'assets/cappuccino.png', desc: 'Rich espresso with intentionally frothed milk.' },
        { id: 2, name: 'Matcha Latte', price: 4.20, img: 'assets/matcha_latte.png', desc: 'Ceremonial grade matcha blended with steamed milk.' },
        { id: 3, name: 'Deluxe Hot Chocolate', price: 3.80, img: 'assets/hot_chocolate.png', desc: 'Decadent melted cocoa with fluffy marshmallows.' },
        { id: 4, name: 'London Fog', price: 4.00, img: 'assets/hero_bg.png', desc: 'Earl grey tea latte with vanilla syrup.' },
        { id: 5, name: 'Flat White', price: 3.30, img: 'assets/cappuccino.png', desc: 'Smooth, double shot espresso with microfoam.' },
        { id: 6, name: 'Iced Americano', price: 3.00, img: 'assets/hero_bg.png', desc: 'Chilled espresso over water and ice.' },
    ];

    let cart = [];

    const menuList = document.getElementById('menuList');
    const cartItemsDiv = document.getElementById('cartItems');
    const cartTotalSpan = document.getElementById('cartTotal');
    const checkoutBtn = document.getElementById('checkoutBtn');
    
    // Render Menu
    menuItems.forEach(item => {
        const card = document.createElement('div');
        card.className = 'menu-card glass-panel fade-in appear';
        card.innerHTML = `
            <div class="menu-img-container" style="height: 200px;">
                <img src="${item.img}" alt="${item.name}" loading="lazy">
                <div class="price-tag">£${item.price.toFixed(2)}</div>
            </div>
            <div class="menu-info">
                <h3>${item.name}</h3>
                <p>${item.desc}</p>
                <button class="btn btn-outline btn-block add-to-cart" data-id="${item.id}" style="margin-top: 1rem;">Add to Cart</button>
            </div>
        `;
        menuList.appendChild(card);
    });

    // Handle Add to Cart
    document.querySelectorAll('.add-to-cart').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = parseInt(e.target.getAttribute('data-id'));
            const item = menuItems.find(i => i.id === id);
            cart.push(item);
            updateCart();
        });
    });

    function updateCart() {
        if (cart.length === 0) {
            cartItemsDiv.innerHTML = '<p style="color: var(--text-secondary); text-align: center; margin-top: 2rem;">Your cart is empty.</p>';
            checkoutBtn.disabled = true;
            cartTotalSpan.textContent = '£0.00';
            return;
        }

        checkoutBtn.disabled = false;
        cartItemsDiv.innerHTML = '';
        let total = 0;

        cart.forEach((item, index) => {
            total += item.price;
            const el = document.createElement('div');
            el.className = 'cart-item';
            el.innerHTML = `
                <div class="cart-item-info">
                    <h4>${item.name}</h4>
                    <p>£${item.price.toFixed(2)}</p>
                </div>
                <button class="cart-item-remove" onclick="removeFromCart(${index})">&times;</button>
            `;
            cartItemsDiv.appendChild(el);
        });

        const totalStr = '£' + total.toFixed(2);
        cartTotalSpan.textContent = totalStr;
        document.querySelectorAll('.checkout-total-display').forEach(el => el.textContent = totalStr);
    }

    window.removeFromCart = (index) => {
        cart.splice(index, 1);
        updateCart();
    };

    // Modal Logic
    const modal = document.getElementById('checkoutModal');
    const closeBtn = document.getElementById('closeModal');

    checkoutBtn.addEventListener('click', () => {
        modal.classList.add('active');
    });

    closeBtn.addEventListener('click', () => {
        modal.classList.remove('active');
    });

    // Tab Logic
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            e.target.classList.add('active');
            document.getElementById('tab-' + e.target.getAttribute('data-tab')).classList.add('active');
        });
    });

    // Mock Payment Handlers
    document.getElementById('payCardBtn').addEventListener('click', handlePaymentStr);
    document.getElementById('payBankBtn').addEventListener('click', handlePaymentStr);

    function handlePaymentStr() {
        alert('Payment Success! Your order will be prepared shortly.');
        cart = [];
        updateCart();
        modal.classList.remove('active');
    }
});
