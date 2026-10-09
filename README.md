const apiBase = 'http://localhost:5000/api';

const statsGrid = document.getElementById('statsGrid');
const productSelect = document.getElementById('productId');
const distributorSelect = document.getElementById('distributorId');
const productsGrid = document.getElementById('productsGrid');
const leaderboardList = document.getElementById('leaderboardList');

const renderStats = (dashboard) => {
  const cards = [
    { label: 'Total sales', value: `$${dashboard.totalSales.toFixed(2)}` },
    { label: 'Commissions paid', value: `$${dashboard.totalCommissions.toFixed(2)}` },
    { label: 'Distributors', value: dashboard.totalDistributors },
    { label: 'Pending payouts', value: `$${dashboard.pendingPayouts.toFixed(2)}` }
  ];

  statsGrid.innerHTML = cards
    .map(
      (card) => `
        <div class="stat-card">
          <div class="label">${card.label}</div>
          <div class="value">${card.value}</div>
        </div>
      `
    )
    .join('');
};

const renderProducts = (products) => {
  productsGrid.innerHTML = products
    .map(
      (product) => `
        <div class="product-card">
          <img src="${product.image}" alt="${product.name}" />
          <div class="product-card-body">
            <h3>${product.name}</h3>
            <div class="product-meta">
              <span>${product.category}</span>
              <span>$${product.price}</span>
            </div>
            <div class="product-meta" style="margin-top:8px;">
              <span>Stock: ${product.stock}</span>
              <span>Commission: ${(product.commissionRate * 100).toFixed(0)}%</span>
            </div>
          </div>
        </div>
      `
    )
    .join('');
};

const renderDistributors = (distributors) => {
  distributorSelect.innerHTML = distributors
    .map((distributor) => `<option value="${distributor.id}">${distributor.name} (${distributor.referralCode})</option>`)
    .join('');

  leaderboardList.innerHTML = distributors
    .sort((a, b) => b.teamVolume - a.teamVolume)
    .map(
      (member, index) => `
        <div class="leader-row">
          <div>
            <strong>#${index + 1} ${member.name}</strong><br />
            <small>${member.email}</small>
          </div>
          <div>
            <div class="rank-pill">${member.rank}</div>
            <small>Volume: $${member.teamVolume}</small>
          </div>
        </div>
      `
    )
    .join('');
};

const renderProductsOptions = (products) => {
  productSelect.innerHTML = products
    .map((product) => `<option value="${product.id}">${product.name} - $${product.price}</option>`)
    .join('');
};

const fetchData = async () => {
  try {
    const [dashboardResponse, productsResponse, distributorsResponse] = await Promise.all([
      fetch(`${apiBase}/dashboard`),
      fetch(`${apiBase}/products`),
      fetch(`${apiBase}/distributors`)
    ]);

    const dashboardData = await dashboardResponse.json();
    const productsData = await productsResponse.json();
    const distributorsData = await distributorsResponse.json();

    renderStats(dashboardData.dashboard);
    renderProducts(productsData.products);
    renderProductsOptions(productsData.products);
    renderDistributors(distributorsData.distributors);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

const registerDistributor = async (event) => {
  event.preventDefault();

  const payload = {
    name: document.getElementById('name').value,
    email: document.getElementById('email').value,
    sponsorCode: document.getElementById('sponsorCode').value.trim()
  };

  try {
    const response = await fetch(`${apiBase}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const result = await response.json();
    if (!response.ok) throw new Error(result.message || 'Unable to register distributor');

    alert(`Success: ${result.message}`);
    document.getElementById('registerForm').reset();
    fetchData();
  } catch (error) {
    alert(error.message);
  }
};

const submitOrder = async (event) => {
  event.preventDefault();

  const payload = {
    distributorId: distributorSelect.value,
    items: [
      {
        productId: productSelect.value,
        quantity: Number(document.getElementById('quantity').value || 1)
      }
    ]
  };

  try {
    const response = await fetch(`${apiBase}/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const result = await response.json();
    if (!response.ok) throw new Error(result.message || 'Unable to create order');

    alert(`Order created successfully. Total: $${result.order.total}`);
    document.getElementById('orderForm').reset();
    fetchData();
  } catch (error) {
    alert(error.message);
  }
};

document.getElementById('registerForm').addEventListener('submit', registerDistributor);
document.getElementById('orderForm').addEventListener('submit', submitOrder);
document.getElementById('refreshBtn').addEventListener('click', fetchData);

fetchData();
