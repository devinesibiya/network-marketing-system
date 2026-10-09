const apiBase = 'http://localhost:5000/api';

const categoryFilterButtons = document.querySelectorAll('.filter-btn');
const productsGrid = document.getElementById('productsGrid');
const enrollmentForm = document.getElementById('enrollmentForm');

let allProducts = [];

const renderProducts = (products) => {
  productsGrid.innerHTML = products
    .map(
      (product) => `
        <div class="product-card">
          <img src="${product.image}" alt="${product.name}" />
          <div class="product-info">
            <div class="product-category">${product.category}</div>
            <h3>${product.name}</h3>
            <p class="product-desc">${product.description}</p>
            <div class="product-footer">
              <span class="price">$${product.price}</span>
              <button class="add-btn" onclick="alert('Add to cart functionality - coming soon!')">Add</button>
            </div>
          </div>
        </div>
      `
    )
    .join('');
};

const fetchProducts = async () => {
  try {
    const response = await fetch(`${apiBase}/products`);
    const data = await response.json();
    allProducts = data.products;
    renderProducts(allProducts);
  } catch (error) {
    console.error('Error fetching products:', error);
  }
};

categoryFilterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    categoryFilterButtons.forEach((btn) => btn.classList.remove('active'));
    button.classList.add('active');

    const category = button.getAttribute('data-category');
    const filtered = category === 'all' ? allProducts : allProducts.filter((p) => p.category === category);
    renderProducts(filtered);
  });
});

enrollmentForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const name = `${document.getElementById('fname').value} ${document.getElementById('lname').value}`;
  const email = document.getElementById('enroll-email').value;
  const sponsorCode = document.getElementById('sponsor-code').value.trim();

  try {
    const response = await fetch(`${apiBase}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, sponsorCode })
    });

    const result = await response.json();
    if (!response.ok) throw new Error(result.message);

    alert(`Success! Welcome to Wellness Hub. Your referral code is: ${result.distributor.referralCode}`);
    enrollmentForm.reset();
  } catch (error) {
    alert(`Error: ${error.message}`);
  }
});

fetchProducts();
