const apiBase = 'http://localhost:5000/api';
const distributorId = new URLSearchParams(window.location.search).get('id') || 'd-1001';

const statsGrid = document.getElementById('statsGrid');
const distributorInfo = document.getElementById('distributorInfo');
const treeView = document.getElementById('treeView');
const commissionsTable = document.getElementById('commissionsTable');
const productSelect = document.getElementById('productId');
const orderForm = document.getElementById('orderForm');
const refCode = document.getElementById('refCode');

const copyToClipboard = () => {
  refCode.select();
  document.execCommand('copy');
  alert('Referral code copied!');
};

const renderDistributorInfo = (distributor) => {
  distributorInfo.innerHTML = `
    <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px;">
      <div>
        <strong>Name:</strong> ${distributor.name}
      </div>
      <div>
        <strong>Email:</strong> ${distributor.email}
      </div>
      <div>
        <strong>Rank:</strong> <span class="rank-pill">${distributor.rank}</span>
      </div>
      <div>
        <strong>Team Volume:</strong> $${distributor.teamVolume.toFixed(2)}
      </div>
      <div>
        <strong>Wallet Balance:</strong> $${distributor.wallet.toFixed(2)}
      </div>
      <div>
        <strong>Referral Code:</strong> ${distributor.referralCode}
      </div>
    </div>
  `;
  refCode.value = distributor.referralCode;
};

const renderStats = (distributor) => {
  const cards = [
    { label: 'Wallet Balance', value: `$${distributor.wallet.toFixed(2)}` },
    { label: 'Team Volume (Monthly)', value: `$${distributor.teamVolume.toFixed(2)}` },
    { label: 'Current Rank', value: distributor.rank },
    { label: 'Team Members', value: distributor.team ? distributor.team.length : 0 }
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

const renderTreeNode = (node, level = 0) => {
  if (!node) return '';
  return `
    <div style="margin-left: ${level * 20}px; padding: 10px; border-left: 2px solid #ccc; margin-bottom: 8px;">
      <strong>${node.name}</strong> (${node.rank})
      <br />
      <small>${node.email}</small>
      ${node.children && node.children.length > 0 ? node.children.map((child) => renderTreeNode(child, level + 1)).join('') : ''}
    </div>
  `;
};

const fetchDistributor = async () => {
  try {
    const response = await fetch(`${apiBase}/distributors/${distributorId}`);
    const data = await response.json();
    renderDistributorInfo(data.distributor);
    renderStats(data.distributor);
  } catch (error) {
    console.error('Error fetching distributor:', error);
  }
};

const fetchTree = async () => {
  try {
    const response = await fetch(`${apiBase}/distributors/${distributorId}/tree`);
    const data = await response.json();
    treeView.innerHTML = renderTreeNode(data.tree);
  } catch (error) {
    console.error('Error fetching tree:', error);
  }
};

const fetchCommissions = async () => {
  try {
    const response = await fetch(`${apiBase}/distributors/${distributorId}/commissions`);
    const data = await response.json();
    commissionsTable.innerHTML = `
      <table style="width: 100%; border-collapse: collapse;">
        <thead>
          <tr style="background: #f5f5f5; border-bottom: 2px solid #ddd;">
            <th style="padding: 12px; text-align: left;">Type</th>
            <th style="padding: 12px; text-align: left;">Amount</th>
            <th style="padding: 12px; text-align: left;">Description</th>
            <th style="padding: 12px; text-align: left;">Date</th>
          </tr>
        </thead>
        <tbody>
          ${data.commissions.map((c) => `
            <tr style="border-bottom: 1px solid #eee;">
              <td style="padding: 12px;"><span class="badge badge-${c.type}">${c.type}</span></td>
              <td style="padding: 12px; font-weight: 600;">$${c.amount.toFixed(2)}</td>
              <td style="padding: 12px;">${c.description}</td>
              <td style="padding: 12px; font-size: 0.9rem;">${new Date(c.createdAt).toLocaleDateString()}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    `;
  } catch (error) {
    console.error('Error fetching commissions:', error);
  }
};

const fetchProducts = async () => {
  try {
    const response = await fetch(`${apiBase}/products`);
    const data = await response.json();
    productSelect.innerHTML = data.products.map((p) => `<option value="${p.id}">${p.name} - $${p.price}</option>`).join('');
  } catch (error) {
    console.error('Error fetching products:', error);
  }
};

orderForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const items = [{ productId: productSelect.value, quantity: Number(document.getElementById('quantity').value) }];

  try {
    const response = await fetch(`${apiBase}/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ distributorId, items })
    });

    const result = await response.json();
    if (!response.ok) throw new Error(result.message);

    alert(`Order placed! Earnings: ${result.earnings.map((e) => `${e.type}: $${e.amount}`).join(', ')}`);
    orderForm.reset();
    fetchDistributor();
    fetchCommissions();
  } catch (error) {
    alert(`Error: ${error.message}`);
  }
});

fetchDistributor();
fetchTree();
fetchCommissions();
fetchProducts();
