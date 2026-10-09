const apiBase = 'http://localhost:5000/api';

const overviewStats = document.getElementById('overviewStats');
const distributorsList = document.getElementById('distributorsList');
const productsList = document.getElementById('productsList');
const ordersList = document.getElementById('ordersList');
const commissionsList = document.getElementById('commissionsList');

const tabBtns = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

tabBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    const tabName = btn.getAttribute('data-tab');
    tabBtns.forEach((b) => b.classList.remove('active'));
    tabContents.forEach((c) => c.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById(`${tabName}-tab`).classList.add('active');
  });
});

const renderOverview = async () => {
  try {
    const response = await fetch(`${apiBase}/dashboard`);
    const data = await response.json();
    const dashboard = data.dashboard;

    const cards = [
      { label: 'Total Sales', value: `$${dashboard.totalSales.toFixed(2)}` },
      { label: 'Commissions Paid', value: `$${dashboard.totalCommissions.toFixed(2)}` },
      { label: 'Active Distributors', value: dashboard.totalDistributors },
      { label: 'Pending Payouts', value: `$${dashboard.pendingPayouts.toFixed(2)}` }
    ];

    overviewStats.innerHTML = cards
      .map(
        (card) => `
          <div class="stat-card">
            <div class="label">${card.label}</div>
            <div class="value">${card.value}</div>
          </div>
        `
      )
      .join('');
  } catch (error) {
    console.error('Error fetching overview:', error);
  }
};

const renderDistributors = async () => {
  try {
    const response = await fetch(`${apiBase}/distributors`);
    const data = await response.json();

    distributorsList.innerHTML = `
      <table style="width: 100%; border-collapse: collapse;">
        <thead>
          <tr style="background: #f5f5f5; border-bottom: 2px solid #ddd;">
            <th style="padding: 12px; text-align: left;">Name</th>
            <th style="padding: 12px; text-align: left;">Email</th>
            <th style="padding: 12px; text-align: left;">Rank</th>
            <th style="padding: 12px; text-align: left;">Team Volume</th>
            <th style="padding: 12px; text-align: left;">Wallet</th>
            <th style="padding: 12px; text-align: left;">Referral Code</th>
          </tr>
        </thead>
        <tbody>
          ${data.distributors.map((d) => `
            <tr style="border-bottom: 1px solid #eee;">
              <td style="padding: 12px;"><strong>${d.name}</strong></td>
              <td style="padding: 12px;">${d.email}</td>
              <td style="padding: 12px;"><span class="rank-pill">${d.rank}</span></td>
              <td style="padding: 12px;">$${d.teamVolume.toFixed(2)}</td>
              <td style="padding: 12px; font-weight: 600;">$${d.wallet.toFixed(2)}</td>
              <td style="padding: 12px; font-family: monospace;">${d.referralCode}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    `;
  } catch (error) {
    console.error('Error fetching distributors:', error);
  }
};

const renderProducts = async () => {
  try {
    const response = await fetch(`${apiBase}/products`);
    const data = await response.json();

    productsList.innerHTML = data.products
      .map(
        (p) => `
          <div class="product-card">
            <img src="${p.image}" alt="${p.name}" />
            <div class="product-info">
              <strong>${p.name}</strong>
              <div style="color: #666; font-size: 0.9rem; margin: 5px 0;">${p.category}</div>
              <div style="color: #333; font-weight: 600;">$${p.price}</div>
              <div style="color: #666; font-size: 0.85rem;">Stock: ${p.stock}</div>
              <div style="color: #666; font-size: 0.85rem;">Commission: ${(p.commissionRate * 100).toFixed(0)}%</div>
            </div>
          </div>
        `
      )
      .join('');
  } catch (error) {
    console.error('Error fetching products:', error);
  }
};

const renderOrders = async () => {
  try {
    const response = await fetch(`${apiBase}/dashboard`);
    const data = await response.json();
    // Mock orders - in real app, fetch from API
    ordersList.innerHTML = '<p>Orders feature coming soon. Integration with database required.</p>';
  } catch (error) {
    console.error('Error:', error);
  }
};

const renderCommissions = async () => {
  try {
    const response = await fetch(`${apiBase}/distributors`);
    const data = await response.json();

    let totalRetail = 0;
    let totalTeam = 0;

    const rows = data.distributors.map((d) => {
      totalRetail += d.wallet * 0.7; // Rough estimate
      totalTeam += d.wallet * 0.3;
      return `
        <tr style="border-bottom: 1px solid #eee;">
          <td style="padding: 12px;">${d.name}</td>
          <td style="padding: 12px;">$${(d.wallet * 0.7).toFixed(2)}</td>
          <td style="padding: 12px;">$${(d.wallet * 0.3).toFixed(2)}</td>
          <td style="padding: 12px; font-weight: 600;">$${d.wallet.toFixed(2)}</td>
          <td style="padding: 12px;"><span class="badge badge-pending">Pending Approval</span></td>
        </tr>
      `;
    });

    commissionsList.innerHTML = `
      <table style="width: 100%; border-collapse: collapse;">
        <thead>
          <tr style="background: #f5f5f5; border-bottom: 2px solid #ddd;">
            <th style="padding: 12px; text-align: left;">Distributor</th>
            <th style="padding: 12px; text-align: left;">Retail Earnings</th>
            <th style="padding: 12px; text-align: left;">Team Bonus</th>
            <th style="padding: 12px; text-align: left;">Total Earned</th>
            <th style="padding: 12px; text-align: left;">Status</th>
          </tr>
        </thead>
        <tbody>
          ${rows.join('')}
        </tbody>
      </table>
    `;
  } catch (error) {
    console.error('Error fetching commissions:', error);
  }
};

renderOverview();
renderDistributors();
renderProducts();
renderOrders();
renderCommissions();
