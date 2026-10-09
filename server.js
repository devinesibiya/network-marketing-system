const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: process.env.CORS_ORIGIN || '*' }));
app.use(express.json());
app.use(express.static('public'));

const state = {
  distributors: [
    {
      id: 'd-1001',
      name: 'Ava Smith',
      email: 'ava@example.com',
      sponsorId: null,
      referralCode: 'AVA1001',
      rank: 'Gold',
      wallet: 1250,
      teamVolume: 2300,
      team: []
    },
    {
      id: 'd-1002',
      name: 'Noah Brown',
      email: 'noah@example.com',
      sponsorId: 'd-1001',
      referralCode: 'NOAH1002',
      rank: 'Silver',
      wallet: 480,
      teamVolume: 960,
      team: []
    },
    {
      id: 'd-1003',
      name: 'Emma Johnson',
      email: 'emma@example.com',
      sponsorId: 'd-1001',
      referralCode: 'EMMA1003',
      rank: 'Bronze',
      wallet: 310,
      teamVolume: 780,
      team: []
    },
    {
      id: 'd-1004',
      name: 'Liam Wilson',
      email: 'liam@example.com',
      sponsorId: 'd-1002',
      referralCode: 'LIAM1004',
      rank: 'Starter',
      wallet: 120,
      teamVolume: 420,
      team: []
    }
  ],
  products: [
    // Skincare products
    {
      id: 'p-101',
      name: 'Glow Serum',
      category: 'Skincare',
      price: 89,
      commissionRate: 0.18,
      stock: 25,
      image: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=900&q=80',
      description: 'Vitamin C serum for radiant skin'
    },
    {
      id: 'p-102',
      name: 'Hydra Boost Cream',
      category: 'Skincare',
      price: 120,
      commissionRate: 0.2,
      stock: 30,
      image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?auto=format&fit=crop&w=900&q=80',
      description: 'Deep moisturizing face cream'
    },
    {
      id: 'p-103',
      name: 'Anti-Aging Night Mask',
      category: 'Skincare',
      price: 105,
      commissionRate: 0.19,
      stock: 28,
      image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?auto=format&fit=crop&w=900&q=80',
      description: 'Overnight renewal mask with retinol'
    },
    {
      id: 'p-104',
      name: 'Exfoliating Scrub',
      category: 'Skincare',
      price: 45,
      commissionRate: 0.17,
      stock: 40,
      image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?auto=format&fit=crop&w=900&q=80',
      description: 'Gentle body and face exfoliator'
    },

    // Home Use Products
    {
      id: 'p-201',
      name: 'Aromatherapy Diffuser',
      category: 'Home Use',
      price: 75,
      commissionRate: 0.16,
      stock: 20,
      image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?auto=format&fit=crop&w=900&q=80',
      description: 'Ultrasonic humidifier with essential oil diffusion'
    },
    {
      id: 'p-202',
      name: 'Premium Essential Oil Kit',
      category: 'Home Use',
      price: 110,
      commissionRate: 0.18,
      stock: 35,
      image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?auto=format&fit=crop&w=900&q=80',
      description: 'Set of 12 pure essential oils for home aromatherapy'
    },
    {
      id: 'p-203',
      name: 'Organic Laundry Detergent',
      category: 'Home Use',
      price: 35,
      commissionRate: 0.15,
      stock: 50,
      image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?auto=format&fit=crop&w=900&q=80',
      description: 'Eco-friendly laundry soap with natural ingredients'
    },
    {
      id: 'p-204',
      name: 'Bamboo Cleaning Brush Set',
      category: 'Home Use',
      price: 28,
      commissionRate: 0.14,
      stock: 60,
      image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?auto=format&fit=crop&w=900&q=80',
      description: 'Sustainable bamboo brushes for kitchen and bath'
    },
    {
      id: 'p-205',
      name: 'Natural Air Purifier Spray',
      category: 'Home Use',
      price: 32,
      commissionRate: 0.16,
      stock: 55,
      image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?auto=format&fit=crop&w=900&q=80',
      description: 'Chemical-free air freshener with botanical extracts'
    },

    // Supplements
    {
      id: 'p-301',
      name: 'Multivitamin Complex',
      category: 'Supplements',
      price: 65,
      commissionRate: 0.19,
      stock: 45,
      image: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=900&q=80',
      description: 'Daily essential vitamins and minerals'
    },
    {
      id: 'p-302',
      name: 'Omega-3 Fish Oil',
      category: 'Supplements',
      price: 55,
      commissionRate: 0.18,
      stock: 38,
      image: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=900&q=80',
      description: 'Premium marine source omega-3 supplement'
    },
    {
      id: 'p-303',
      name: 'Collagen Beauty Powder',
      category: 'Supplements',
      price: 78,
      commissionRate: 0.2,
      stock: 32,
      image: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=900&q=80',
      description: 'Hydrolyzed collagen for skin, hair, and nails'
    },
    {
      id: 'p-304',
      name: 'Vitamin D3 Plus K2',
      category: 'Supplements',
      price: 48,
      commissionRate: 0.17,
      stock: 50,
      image: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=900&q=80',
      description: 'Bone health support supplement'
    },
    {
      id: 'p-305',
      name: 'Probiotics Digestive Blend',
      category: 'Supplements',
      price: 62,
      commissionRate: 0.19,
      stock: 40,
      image: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=900&q=80',
      description: 'Multi-strain probiotic for gut health'
    },
    {
      id: 'p-306',
      name: 'Energy & Stamina Capsules',
      category: 'Supplements',
      price: 54,
      commissionRate: 0.18,
      stock: 36,
      image: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=900&q=80',
      description: 'Ginseng and caffeine-free energy boost'
    },

    // Teas
    {
      id: 'p-401',
      name: 'Organic Green Tea Collection',
      category: 'Teas',
      price: 42,
      commissionRate: 0.16,
      stock: 44,
      image: 'https://images.unsplash.com/photo-1597318013620-42b81319d4b9?auto=format&fit=crop&w=900&q=80',
      description: 'Premium loose leaf green tea blend'
    },
    {
      id: 'p-402',
      name: 'Herbal Detox Tea',
      category: 'Teas',
      price: 35,
      commissionRate: 0.15,
      stock: 52,
      image: 'https://images.unsplash.com/photo-1597318013620-42b81319d4b9?auto=format&fit=crop&w=900&q=80',
      description: 'Cleansing blend with turmeric and ginger'
    },
    {
      id: 'p-403',
      name: 'Sleep & Relaxation Tea',
      category: 'Teas',
      price: 38,
      commissionRate: 0.15,
      stock: 48,
      image: 'https://images.unsplash.com/photo-1597318013620-42b81319d4b9?auto=format&fit=crop&w=900&q=80',
      description: 'Chamomile and lavender blend for restful sleep'
    },
    {
      id: 'p-404',
      name: 'Weight Management Tea',
      category: 'Teas',
      price: 48,
      commissionRate: 0.17,
      stock: 40,
      image: 'https://images.unsplash.com/photo-1597318013620-42b81319d4b9?auto=format&fit=crop&w=900&q=80',
      description: 'Metabolism-boosting tea with natural ingredients'
    },
    {
      id: 'p-405',
      name: 'Immune Boost Tea',
      category: 'Teas',
      price: 45,
      commissionRate: 0.17,
      stock: 46,
      image: 'https://images.unsplash.com/photo-1597318013620-42b81319d4b9?auto=format&fit=crop&w=900&q=80',
      description: 'Elderberry and echinacea immune support'
    },
    {
      id: 'p-406',
      name: 'Premium Oolong Tea',
      category: 'Teas',
      price: 55,
      commissionRate: 0.18,
      stock: 38,
      image: 'https://images.unsplash.com/photo-1597318013620-42b81319d4b9?auto=format&fit=crop&w=900&q=80',
      description: 'Traditional oolong with antioxidants'
    }
  ],
  orders: [],
  commissions: [
    {
      id: 'c-1',
      distributorId: 'd-1001',
      type: 'retail',
      amount: 220,
      description: 'Monthly retail earnings',
      createdAt: new Date().toISOString()
    },
    {
      id: 'c-2',
      distributorId: 'd-1002',
      type: 'team',
      amount: 90,
      description: 'Downline sales bonus',
      createdAt: new Date().toISOString()
    }
  ]
};

const getDistributorById = (id) => state.distributors.find((item) => item.id === id);

const findDistributorTree = (id, depth = 0, maxDepth = 3) => {
  const distributor = getDistributorById(id);
  if (!distributor) return null;

  const result = {
    ...distributor,
    children: []
  };

  if (depth >= maxDepth) return result;

  for (const member of state.distributors) {
    if (member.sponsorId === id) {
      result.children.push(findDistributorTree(member.id, depth + 1, maxDepth));
    }
  }

  return result;
};

const buildDashboard = () => {
  const totalSales = state.orders.reduce((sum, order) => sum + order.total, 0);
  const totalCommissions = state.commissions.reduce((sum, bonus) => sum + bonus.amount, 0);
  const totalDistributors = state.distributors.length;

  const categorySales = {};
  state.products.forEach((product) => {
    if (!categorySales[product.category]) {
      categorySales[product.category] = 0;
    }
  });

  state.orders.forEach((order) => {
    order.items.forEach((item) => {
      const product = state.products.find((p) => p.id === item.productId);
      if (product && categorySales[product.category] !== undefined) {
        categorySales[product.category] += item.lineTotal;
      }
    });
  });

  return {
    totalSales,
    totalCommissions,
    totalDistributors,
    pendingPayouts: state.distributors.reduce((sum, distributor) => sum + distributor.wallet, 0),
    topProduct: state.products[0],
    categorySales
  };
};

const calculateCommissionSplit = (distributorId, orderTotal) => {
  const sponsor = getDistributorById(distributorId);
  if (!sponsor) return [];

  const retailCommission = Number((orderTotal * 0.15).toFixed(2));
  const teamBonus = Number((orderTotal * 0.05).toFixed(2));

  return [
    {
      distributorId,
      type: 'retail',
      amount: retailCommission,
      description: 'Retail sales commission'
    },
    {
      distributorId,
      type: 'team',
      amount: teamBonus,
      description: 'Team performance bonus'
    }
  ];
};

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'network-marketing-system' });
});

app.get('/api/products', (req, res) => {
  const category = req.query.category;
  let filteredProducts = state.products;

  if (category) {
    filteredProducts = state.products.filter((product) => product.category === category);
  }

  res.json({ products: filteredProducts });
});

app.get('/api/products/categories', (req, res) => {
  const categories = [...new Set(state.products.map((product) => product.category))];
  res.json({ categories });
});

app.get('/api/products/:id', (req, res) => {
  const product = state.products.find((p) => p.id === req.params.id);
  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }
  res.json({ product });
});

app.get('/api/dashboard', (req, res) => {
  res.json({ dashboard: buildDashboard() });
});

app.get('/api/distributors', (req, res) => {
  res.json({ distributors: state.distributors });
});

app.get('/api/distributors/:id', (req, res) => {
  const distributor = getDistributorById(req.params.id);
  if (!distributor) {
    return res.status(404).json({ message: 'Distributor not found' });
  }
  return res.json({ distributor });
});

app.get('/api/distributors/:id/tree', (req, res) => {
  const tree = findDistributorTree(req.params.id);
  if (!tree) {
    return res.status(404).json({ message: 'Distributor tree not found' });
  }
  return res.json({ tree });
});

app.get('/api/distributors/:id/commissions', (req, res) => {
  const distributor = getDistributorById(req.params.id);
  if (!distributor) {
    return res.status(404).json({ message: 'Distributor not found' });
  }

  const commissions = state.commissions.filter((item) => item.distributorId === req.params.id);
  res.json({ distributorId: req.params.id, commissions });
});

app.post('/api/register', (req, res) => {
  const { name, email, sponsorCode } = req.body;

  if (!name || !email) {
    return res.status(400).json({ message: 'Name and email are required.' });
  }

  const sponsor = sponsorCode
    ? state.distributors.find((member) => member.referralCode === sponsorCode)
    : state.distributors[0];

  if (!sponsor && sponsorCode) {
    return res.status(404).json({ message: 'Sponsor code not found.' });
  }

  const normalizedEmail = email.trim().toLowerCase();
  const exists = state.distributors.some((member) => member.email === normalizedEmail);
  if (exists) {
    return res.status(409).json({ message: 'Distributor with this email already exists.' });
  }

  const newDistributor = {
    id: `d-${Date.now()}`,
    name,
    email: normalizedEmail,
    sponsorId: sponsor ? sponsor.id : null,
    referralCode: `REF-${Math.random().toString(36).slice(2, 8).toUpperCase()}`,
    rank: 'Starter',
    wallet: 0,
    teamVolume: 0,
    team: []
  };

  state.distributors.push(newDistributor);

  res.status(201).json({
    message: 'Distributor registered successfully.',
    distributor: newDistributor
  });
});

app.post('/api/orders', (req, res) => {
  const { distributorId, items } = req.body;

  if (!distributorId || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ message: 'Distributor ID and order items are required.' });
  }

  const distributor = getDistributorById(distributorId);
  if (!distributor) {
    return res.status(404).json({ message: 'Distributor not found.' });
  }

  const orderItems = items.map((item) => {
    const product = state.products.find((entry) => entry.id === item.productId);
    if (!product) {
      throw new Error(`Product ${item.productId} not found`);
    }

    const quantity = Number(item.quantity || 1);
    const lineTotal = product.price * quantity;

    return {
      productId: product.id,
      productName: product.name,
      category: product.category,
      quantity,
      unitPrice: product.price,
      lineTotal
    };
  });

  const total = orderItems.reduce((sum, item) => sum + item.lineTotal, 0);
  const order = {
    id: `o-${Date.now()}`,
    distributorId,
    items: orderItems,
    total,
    createdAt: new Date().toISOString(),
    status: 'paid'
  };

  state.orders.push(order);

  const newEarnings = calculateCommissionSplit(distributorId, total);
  for (const earning of newEarnings) {
    state.commissions.push({
      id: `c-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      distributorId: earning.distributorId,
      type: earning.type,
      amount: earning.amount,
      description: earning.description,
      createdAt: new Date().toISOString()
    });

    const member = getDistributorById(earning.distributorId);
    if (member) {
      member.wallet = Number((member.wallet + earning.amount).toFixed(2));
    }
  }

  const currentDistributor = getDistributorById(distributorId);
  if (currentDistributor) {
    currentDistributor.teamVolume += total;
  }

  res.status(201).json({
    message: 'Order created successfully.',
    order,
    earnings: newEarnings
  });
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: 'Something went wrong with the request.' });
});

app.listen(PORT, () => {
  console.log(`Network marketing starter API listening on http://localhost:${PORT}`);
});
