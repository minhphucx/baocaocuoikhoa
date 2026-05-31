// Quản lý trạng thái giỏ hàng
let cart = [];

// Lấy các phần tử DOM cần thiết
const cartTrigger = document.getElementById('cart-trigger');
const cartModal = document.getElementById('cart-modal');
const closeModal = document.getElementById('close-modal');
const btnAddCarts = document.querySelectorAll('.btn-add-cart');
const cartCount = document.getElementById('cart-count');
const cartItemsContainer = document.getElementById('cart-items');
const cartTotalElement = document.getElementById('cart-total');

// 1. Hiển thị / Ẩn Giỏ hàng mượt mà
cartTrigger.addEventListener('click', () => cartModal.classList.add('open'));
closeModal.addEventListener('click', () => cartModal.classList.remove('open'));

// Đóng modal khi bấm ra ngoài vùng trống
window.addEventListener('click', (e) => {
    if (e.target === cartModal) {
        cartModal.classList.remove('open');
    }
});

// 2. Xử lý thêm sản phẩm vào giỏ hàng
btnAddCarts.forEach((button) => {
    button.addEventListener('click', (e) => {
        // Tìm thẻ product-card bao bọc nút vừa được bấm
        const productCard = e.target.closest('.product-card');
        
        // Thu thập thông tin sản phẩm
        const name = productCard.querySelector('.product-name').textContent;
        const price = parseInt(productCard.querySelector('.product-price').getAttribute('data-price'));

        // Đẩy thông tin vào mảng giỏ hàng
        cart.push({ name, price });

        // Cập nhật giao diện giỏ hàng ngay lập tức
        updateCartUI();
    });
});

// 3. Hàm cập nhật lại giao diện Giỏ hàng
function updateCartUI() {
    // Cập nhật số lượng hiển thị trên icon badge
    cartCount.textContent = cart.length;

    // Xóa danh sách cũ đi để render lại từ đầu
    cartItemsContainer.innerHTML = '';

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p class="empty-message">Giỏ hàng của bạn đang trống.</p>';
        cartTotalElement.textContent = '0 đ';
        return;
    }

    let total = 0;

    // Render từng hàng sản phẩm trong giỏ
    cart.forEach((item) => {
        total += item.price;

        const row = document.createElement('div');
        row.classList.add('cart-item-row');
        row.innerHTML = `
            <span class="cart-item-name">${item.name}</span>
            <span class="cart-item-price">${item.price.toLocaleString('vi-VN')} đ</span>
        `;
        cartItemsContainer.appendChild(row);
    });

    // Cập nhật tổng số tiền hiển thị định dạng chuẩn tiền tệ VNĐ
    cartTotalElement.textContent = total.toLocaleString('vi-VN') + ' đ';
}
