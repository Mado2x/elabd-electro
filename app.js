// ==========================================
// الجزء الثالث: المحرك التشغيلي (app.js)
// معرض أولاد العبد للأجهزة الكهربائية
// ==========================================

const STORAGE_KEY_DETAILED_SUPPLIERS = 'elabd_unified_suppliers';
const STORAGE_KEY_SELLING_PRICES = 'elabd_unified_prices';
const STORAGE_KEY_SALES = 'elabd_unified_sales';
const STORAGE_KEY_CONTRACTS = 'elabd_unified_contracts';
const STORAGE_KEY_EXPENSES = 'elabd_unified_expenses';
const STORAGE_KEY_CURRENT_TAB = 'elabd_unified_tab';

const defaultSuppliersData = [
  {
    id: 'SUP-01',
    name: 'شركة العربي (توشيبا وشارب)',
    phone: '01099887766',
    address: 'مخازن بنها',
    items: [
      { id: 'ITM-1', barcode: 'TOSH-16-REF', date: '2026-09-15', name: 'ثلاجة توشيبا 16 قدم نوفروست', qty: 5, unitPrice: 21000, total: 105000, paid: 70000, remaining: 35000 },
      { id: 'ITM-2', barcode: 'SHARP-25-MIC', date: '2026-09-28', name: 'ميكروويف شارب 25 لتر بالشواية', qty: 10, unitPrice: 5200, total: 52000, paid: 30000, remaining: 22000 }
    ]
  },
  {
    id: 'SUP-02',
    name: 'موزع غسالات وشاشات إل جي',
    phone: '01155443322',
    address: 'مصر الجديدة',
    items: [
      { id: 'ITM-3', barcode: 'LG-9K-WASH', date: '2026-10-01', name: 'غسالة إل جي 9 كيلو فول أوتوماتيك', qty: 6, unitPrice: 19500, total: 117000, paid: 117000, remaining: 0 },
      { id: 'ITM-4', barcode: 'SAM-55-4K', date: '2026-10-03', name: 'شاشة سامسونج 55 بوصة سمارت 4K', qty: 8, unitPrice: 14500, total: 116000, paid: 60000, remaining: 56000 }
    ]
  }
];

const defaultSellingPrices = {
  'ثلاجة توشيبا 16 قدم نوفروست': 25000,
  'ميكروويف شارب 25 لتر بالشواية': 6500,
  'غسالة إل جي 9 كيلو فول أوتوماتيك': 23500,
  'شاشة سامسونج 55 بوصة سمارت 4K': 17800
};

const defaultContracts = [
  {
    clientCode: 1,
    id: 'CNT-101',
    invoiceDate: '2026-08-01',
    customerName: 'محمود عبد الفتاح',
    customerPhone: '01012345678',
    nationalId: '29704141234567',
    guarantorName: 'إبراهيم السيد علي',
    guarantorPhone: '01123456789',
    guarantorNationalId: '29508129876543',
    items: [
      { name: 'غسالة إل جي 9 كيلو فول أوتوماتيك', qty: 1, unitPrice: 23500, total: 23500, serial: 'SN-LG9K-9921' }
    ],
    deviceName: 'غسالة إل جي 9 كيلو فول أوتوماتيك (عدد 1)',
    rawDeviceName: 'غسالة إل جي 9 كيلو فول أوتوماتيك',
    serialNumber: 'SN-LG9K-9921',
    quantity: 1,
    cashPrice: 23500,
    downPayment: 3500,
    months: 12,
    interestRate: 15,
    totalWithInterest: 26500,
    monthlyAmount: 1917,
    paidAmount: 7334,
    remainingAmount: 19166,
    startDate: '2026-08-01',
    installments: [
      { number: 1, dueDate: '2026-08-01', amount: 1917, status: 'مدفوع بالكامل', paidDate: '2026-08-01', paidActual: 1917 },
      { number: 2, dueDate: '2026-09-01', amount: 1917, status: 'مدفوع بالكامل', paidDate: '2026-09-02', paidActual: 1917 },
      { number: 3, dueDate: '2026-10-01', amount: 1917, status: 'مستحق', paidDate: null, paidActual: 0 },
      { number: 4, dueDate: '2026-11-01', amount: 1917, status: 'قادم', paidDate: null, paidActual: 0 }
    ]
  }
];

const defaultSales = [
  {
    id: 'INV-501',
    date: '2026-08-01',
    customerName: 'محمود عبد الفتاح',
    customerPhone: '01012345678',
    nationalId: '29704141234567',
    deviceName: 'غسالة إل جي 9 كيلو فول أوتوماتيك (عدد 1)',
    rawDeviceName: 'غسالة إل جي 9 كيلو فول أوتوماتيك',
    serialNumber: 'SN-LG9K-9921',
    type: 'تقسيط',
    quantity: 1,
    unitPrice: 23500,
    totalPrice: 26500,
    paidImmediately: 3500,
    contractId: 'CNT-101',
    items: [
      { name: 'غسالة إل جي 9 كيلو فول أوتوماتيك', qty: 1, unitPrice: 23500, total: 23500, serial: 'SN-LG9K-9921' }
    ]
  }
];

const defaultExpenses = [
  { id: 'EXP-1', date: '2026-10-02', title: 'شحن ونقل شاشات من الميناء', category: 'نقل وشحن', amount: 850, notes: 'نولون سيارة نقل' },
  { id: 'EXP-2', date: '2026-10-05', title: 'بوفيه وضيافة للمعرض', category: 'مصاريف شخصية وبوفيه', amount: 350, notes: 'مشروبات وضيافة عملاء' }
];

let currentSupplierShipmentCart = [];
let currentSaleInvoiceCart = [];
let selectedSupplierId = 'SUP-01';
let currentCollectingContractId = null;
let currentCollectingInstallmentNum = null;
let currentCollectingFullAmount = 0;
let currentCollectingRemainingAmount = 0;
let currentContractForWhatsApp = null;
let activeCustomerPhoneForProfile = null;
let activeInvoiceIdInProfile = null;
let currentEditingInvoiceId = null;

let html5QrCodeScannerInstance = null;
let currentTargetInputIdForScanner = null;
let lastInquiredDeviceObject = null;

// ==========================================
// دوال إدارة الذاكرة المحلية الآمنة
// ==========================================
function getDetailedSuppliers() {
  try {
    const d = localStorage.getItem(STORAGE_KEY_DETAILED_SUPPLIERS);
    if (d) {
      const parsed = JSON.parse(d);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch (e) {}
  localStorage.setItem(STORAGE_KEY_DETAILED_SUPPLIERS, JSON.stringify(defaultSuppliersData));
  return defaultSuppliersData;
}
function setDetailedSuppliers(d) {
  localStorage.setItem(STORAGE_KEY_DETAILED_SUPPLIERS, JSON.stringify(d));
}

function getSellingPrices() {
  try {
    const d = localStorage.getItem(STORAGE_KEY_SELLING_PRICES);
    if (d) return JSON.parse(d);
  } catch (e) {}
  localStorage.setItem(STORAGE_KEY_SELLING_PRICES, JSON.stringify(defaultSellingPrices));
  return defaultSellingPrices;
}
function setSellingPrices(d) {
  localStorage.setItem(STORAGE_KEY_SELLING_PRICES, JSON.stringify(d));
}

function getStoredContracts() {
  try {
    const d = localStorage.getItem(STORAGE_KEY_CONTRACTS);
    if (d) {
      const parsed = JSON.parse(d);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch (e) {}
  localStorage.setItem(STORAGE_KEY_CONTRACTS, JSON.stringify(defaultContracts));
  return defaultContracts;
}
function setStoredContracts(d) {
  localStorage.setItem(STORAGE_KEY_CONTRACTS, JSON.stringify(d));
}

function getStoredSales() {
  try {
    const d = localStorage.getItem(STORAGE_KEY_SALES);
    if (d) {
      const parsed = JSON.parse(d);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch (e) {}
  localStorage.setItem(STORAGE_KEY_SALES, JSON.stringify(defaultSales));
  return defaultSales;
}
function setStoredSales(d) {
  localStorage.setItem(STORAGE_KEY_SALES, JSON.stringify(d));
}

function getStoredExpenses() {
  try {
    const d = localStorage.getItem(STORAGE_KEY_EXPENSES);
    if (d) {
      const parsed = JSON.parse(d);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch (e) {}
  localStorage.setItem(STORAGE_KEY_EXPENSES, JSON.stringify(defaultExpenses));
  return defaultExpenses;
}
function setStoredExpenses(d) {
  localStorage.setItem(STORAGE_KEY_EXPENSES, JSON.stringify(d));
}

function resetSystemToDefaultData() {
  if (confirm('هل ترغب في إعادة ضبط البيانات إلى الحالة الافتراضية؟')) {
    localStorage.clear();
    location.reload();
  }
}

function calculateAllSuppliersTotalRemaining() {
  const suppliers = getDetailedSuppliers();
  let totalRemaining = 0;
  suppliers.forEach(sup => {
    (sup.items || []).forEach(it => {
      const rem = Math.max(0, (parseFloat(it.total) || 0) - (parseFloat(it.paid) || 0));
      totalRemaining += rem;
    });
  });
  return totalRemaining;
}

function calculateTotalExpenses() {
  const expenses = getStoredExpenses();
  return expenses.reduce((sum, item) => sum + (parseFloat(item.amount) || 0), 0);
}

function buildDynamicInventory() {
  const suppliers = getDetailedSuppliers();
  const sales = getStoredSales();
  const sellingPrices = getSellingPrices();
  const inventoryMap = {};

  suppliers.forEach(sup => {
    (sup.items || []).forEach(it => {
      if (!inventoryMap[it.id]) {
        inventoryMap[it.id] = {
          itemId: it.id,
          barcode: it.barcode || ('BAR-' + it.id),
          name: it.name,
          supplierId: sup.id,
          supplierName: sup.name,
          supplyDate: it.date || '',
          buyPrice: parseFloat(it.unitPrice) || 0,
          initialQty: parseInt(it.qty) || 0,
          currentQty: parseInt(it.qty) || 0,
          cashPrice: sellingPrices[it.name] || Math.round((parseFloat(it.unitPrice) || 0) * 1.2)
        };
      } else {
        inventoryMap[it.id].initialQty += parseInt(it.qty) || 0;
        inventoryMap[it.id].currentQty += parseInt(it.qty) || 0;
      }
    });
  });

  sales.forEach(sale => {
    const qtySold = parseInt(sale.quantity) || 1;
    const itemEntry = Object.values(inventoryMap).find(x => 
      sale.deviceName && (sale.deviceName.includes(x.name) || x.name === sale.rawDeviceName)
    );
    if (itemEntry) {
      itemEntry.currentQty = Math.max(0, itemEntry.currentQty - qtySold);
    }
  });

  return Object.values(inventoryMap);
}

function parseItemsFromRecord(record) {
  if (record.items && Array.isArray(record.items) && record.items.length > 0) {
    return record.items;
  }
  const str = record.deviceName || '';
  const parts = str.split('+');
  return parts.map(part => {
    const clean = part.trim();
    const matchQty = clean.match(/\(عدد\s*(\d+)\)/);
    const qty = matchQty ? parseInt(matchQty[1]) : 1;
    const name = clean.replace(/\(عدد\s*\d+\)/, '').trim();
    const totalCash = (record.cashPrice || record.totalPrice || 0);
    const totalCount = (record.quantity || 1);
    const unitPrice = Math.round(totalCash / totalCount);
    return {
      name: name || clean,
      qty: qty,
      unitPrice: unitPrice,
      total: unitPrice * qty,
      serial: record.serialNumber || 'SN-AUTO'
    };
  });
}

// ==========================================
// التهيئة والتنقل
// ==========================================
window.addEventListener('DOMContentLoaded', () => {
  getDetailedSuppliers();
  getStoredContracts();
  getStoredSales();
  getStoredExpenses();

  populateDeviceSelects();

  const today = new Date().toISOString().split('T')[0];
  const startDateInput = document.getElementById('instStartDate');
  if (startDateInput) startDateInput.value = today;

  const expenseDate = document.getElementById('expenseDateInput');
  if (expenseDate) expenseDate.value = today;

  const currentYearMonth = today.substring(0, 7);
  const reportMonthInput = document.getElementById('selectedReportMonthInput');
  if (reportMonthInput && !reportMonthInput.value) {
    reportMonthInput.value = currentYearMonth;
  }

  const savedTab = localStorage.getItem(STORAGE_KEY_CURRENT_TAB) || 'dashboard';
  switchView(savedTab);
});

function toggleSidebar() {
  const sb = document.getElementById('sidebar');
  const ov = document.getElementById('sidebarOverlay');
  if (!sb) return;
  const isClosed = sb.classList.contains('translate-x-full');
  sb.classList.toggle('translate-x-full', !isClosed);
  sb.classList.toggle('translate-x-0', isClosed);
  if (ov) ov.classList.toggle('hidden', !isClosed);
}

function switchView(viewName) {
  if (window.innerWidth < 768) {
    const sb = document.getElementById('sidebar');
    if (sb && !sb.classList.contains('translate-x-full')) toggleSidebar();
  }

  localStorage.setItem(STORAGE_KEY_CURRENT_TAB, viewName);

  ['dashboard', 'reports', 'suppliers', 'installments', 'inventory', 'sales', 'expenses'].forEach(v => {
    const section = document.getElementById(`view-${v}`);
    if (section) section.classList.add('hidden');
    const navBtn = document.getElementById(`nav-${v}`);
    if (navBtn) {
      navBtn.className = 'w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-300 hover:bg-slate-800 transition';
    }
  });

  const targetSection = document.getElementById(`view-${viewName}`);
  if (targetSection) targetSection.classList.remove('hidden');

  const activeBtn = document.getElementById(`nav-${viewName}`);
  if (activeBtn) {
    activeBtn.className = 'w-full flex items-center gap-3 px-3 py-2.5 rounded-xl bg-blue-600/20 text-blue-400 border border-blue-500/30 font-bold transition';
  }

  if (viewName === 'dashboard') renderDashboard();
  if (viewName === 'reports') renderAnnualReportsView();
  if (viewName === 'suppliers') renderSuppliersTable();
  if (viewName === 'installments') renderInstallmentsTable();
  if (viewName === 'inventory') renderInventoryTable();
  if (viewName === 'sales') renderSalesTable();
  if (viewName === 'expenses') renderExpensesTable();
}

function openModal(id) { 
  const el = document.getElementById(id);
  if (el) el.classList.remove('hidden'); 
}
function closeModal(id) { 
  const el = document.getElementById(id);
  if (el) el.classList.add('hidden'); 
}

// ==========================================
// 1. لوحة الموقف المالي (الرئيسية)
// ==========================================
function renderDashboard() {
  const sales = getStoredSales();
  const contracts = getStoredContracts();
  const inventory = buildDynamicInventory();
  const monthInput = document.getElementById('selectedReportMonthInput');
  const selectedMonthVal = (monthInput && monthInput.value) ? monthInput.value : new Date().toISOString().substring(0, 7);

  let totalSalesVal = 0;
  let cashCollectedVal = 0;
  let installmentsRemainingVal = 0;
  let overdueInstallmentsVal = 0;
  let grossProfitVal = 0;

  const salesCountMap = {};
  let filteredMonthPiecesCount = 0;

  sales.forEach(s => {
    totalSalesVal += (parseFloat(s.totalPrice) || 0);
    cashCollectedVal += (parseFloat(s.paidImmediately) || 0);

    const qtySold = parseInt(s.quantity) || 1;
    const invItem = inventory.find(d => s.deviceName && (s.deviceName.includes(d.name) || d.name === s.rawDeviceName));
    if (invItem) {
      grossProfitVal += Math.max(0, (parseFloat(s.totalPrice) || 0) - (invItem.buyPrice * qtySold));
    }

    if (s.date && s.date.startsWith(selectedMonthVal)) {
      const cleanName = invItem ? invItem.name : (s.deviceName ? s.deviceName.split(' (عدد')[0] : 'صنف');
      filteredMonthPiecesCount += qtySold;
      salesCountMap[cleanName] = (salesCountMap[cleanName] || 0) + qtySold;
    }
  });

  contracts.forEach(cnt => {
    installmentsRemainingVal += (parseFloat(cnt.remainingAmount) || 0);
  });

  const totalExpensesVal = calculateTotalExpenses();
  const netProfitVal = Math.max(0, grossProfitVal - totalExpensesVal);
  const suppliersDebtTotal = calculateAllSuppliersTotalRemaining();

  const elTotalSales = document.getElementById('dashTotalSalesVal');
  if (elTotalSales) elTotalSales.innerText = `${totalSalesVal.toLocaleString()} ج.م`;

  const elCash = document.getElementById('dashCashCollectedVal');
  if (elCash) elCash.innerText = `${cashCollectedVal.toLocaleString()} ج.م`;

  const elInstRem = document.getElementById('dashInstallmentsRemainingVal');
  if (elInstRem) elInstRem.innerText = `${installmentsRemainingVal.toLocaleString()} ج.م`;

  const elSupDebts = document.getElementById('dashSuppliersDebtsVal');
  if (elSupDebts) elSupDebts.innerText = `${suppliersDebtTotal.toLocaleString()} ج.م`;

  const elExpenses = document.getElementById('dashTotalExpensesVal');
  if (elExpenses) elExpenses.innerText = `${totalExpensesVal.toLocaleString()} ج.م`;

  const elNetProfit = document.getElementById('dashNetProfitVal');
  if (elNetProfit) elNetProfit.innerText = `${netProfitVal.toLocaleString()} ج.م`;

  renderTopSellingProductsReport(salesCountMap, filteredMonthPiecesCount, selectedMonthVal);

  const dueTableBody = document.getElementById('dueInstallmentsTableBody');
  if (!dueTableBody) return;
  dueTableBody.innerHTML = '';
  let dueCount = 0;

  contracts.forEach(cnt => {
    (cnt.installments || []).forEach(inst => {
      if (inst.status !== 'مدفوع بالكامل') {
        const isDueInSelectedMonth = inst.dueDate && inst.dueDate.startsWith(selectedMonthVal);
        if (isDueInSelectedMonth) {
          dueCount++;
          const remainingOnInst = inst.amount - (inst.paidActual || 0);
          overdueInstallmentsVal += remainingOnInst;

          dueTableBody.innerHTML += `
            <tr>
              <td class="p-2.5 font-bold text-white">${cnt.customerName}<br><span class="text-[10px] text-slate-400">${cnt.customerPhone}</span></td>
              <td class="p-2.5">${cnt.deviceName}</td>
              <td class="p-2.5 font-bold text-rose-400">${inst.dueDate}</td>
              <td class="p-2.5 font-black text-amber-300">
                ${remainingOnInst.toLocaleString()} ج.م
                ${inst.paidActual > 0 ? `<span class="block text-[9px] text-emerald-400 font-normal">(سدد منها ${inst.paidActual.toLocaleString()} ج)</span>` : ''}
              </td>
              <td class="p-2.5 text-center space-x-1 space-x-reverse">
                <button onclick="openCollectInstallmentModal('${cnt.id}', ${inst.number})" class="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-[10px] font-bold shadow">
                  تحصيل الآن 💰
                </button>
                <button onclick="openChooseWhatsAppModal('${cnt.id}')" class="px-2 py-1 bg-emerald-700/30 text-emerald-300 border border-emerald-500/40 rounded-lg text-[10px] font-bold">
                  <i class="fa-brands fa-whatsapp"></i> تذكير
                </button>
              </td>
            </tr>
          `;
        }
      }
    });
  });

  if (dueCount === 0) {
    dueTableBody.innerHTML = `<tr><td colspan="5" class="p-4 text-center text-slate-500">لا توجد أقساط مستحقة التحصيل خلال شهر (${selectedMonthVal}) 👏</td></tr>`;
  }

  const badgeElem = document.getElementById('dueCountBadge');
  if (badgeElem) badgeElem.innerText = `${dueCount} أقساط مستحقة بالشهر`;
}

function renderTopSellingProductsReport(salesCountMap, totalPiecesCount, selectedMonth) {
  const container = document.getElementById('topSellingReportContainer');
  if (!container) return;
  container.innerHTML = '';

  const sortedProducts = Object.keys(salesCountMap).map(name => ({
    name,
    count: salesCountMap[name]
  })).sort((a, b) => b.count - a.count);

  if (sortedProducts.length === 0) {
    container.innerHTML = `<p class="text-xs text-slate-500 text-center py-4">لم يتم تسجيل أي عمليات بيع أو سحب في شهر (${selectedMonth}).</p>`;
    return;
  }

  sortedProducts.forEach((prod, idx) => {
    const percentage = totalPiecesCount > 0 ? Math.round((prod.count / totalPiecesCount) * 100) : 0;
    const isTop = idx === 0;

    container.innerHTML += `
      <div class="bg-slate-900/60 border border-slate-800/80 p-3 rounded-2xl">
        <div class="flex justify-between items-center mb-1.5">
          <div class="flex items-center gap-2">
            <span class="w-5 h-5 rounded-lg flex items-center justify-center text-[10px] font-black ${isTop ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' : 'bg-slate-800 text-slate-400'}">
              ${idx + 1}
            </span>
            <span class="text-xs font-bold text-white">${prod.name}</span>
            ${isTop ? '<span class="text-[9px] px-1.5 py-0.2 bg-amber-500/20 text-amber-300 rounded font-semibold">الأكثر طلباً 🔥</span>' : ''}
          </div>
          <div class="text-left">
            <b class="text-xs text-cyan-400 font-bold">${prod.count} قطع مسحوبة</b>
            <span class="text-[10px] text-slate-400 mr-1">(${percentage}%)</span>
          </div>
        </div>
        <div class="w-full h-2 bg-slate-800 rounded-full overflow-hidden p-0.5">
          <div class="h-full rounded-full ${isTop ? 'bg-gradient-to-r from-amber-500 to-amber-300' : 'bg-gradient-to-r from-blue-500 to-cyan-400'}" style="width: ${percentage}%"></div>
        </div>
      </div>
    `;
  });
}

// ==========================================
// 2. تقارير المبيعات الشهرية والسنوية (1 إلى 12)
// ==========================================
function getAnnualReportData(year) {
  const sales = getStoredSales();
  const productMap = {};
  let totalAnnualRevenue = 0;
  let totalAnnualPieces = 0;
  const monthTotals = Array(13).fill(0);

  sales.forEach(sale => {
    if (!sale.date || !sale.date.startsWith(year.toString())) return;

    const saleMonth = parseInt(sale.date.split('-')[1], 10);
    if (isNaN(saleMonth) || saleMonth < 1 || saleMonth > 12) return;

    const rawName = sale.rawDeviceName || (sale.deviceName ? sale.deviceName.split(' (عدد')[0].trim() : 'جهاز');
    const qty = parseInt(sale.quantity) || 1;
    const totalAmount = parseFloat(sale.totalPrice) || 0;

    if (!productMap[rawName]) {
      productMap[rawName] = {
        name: rawName,
        monthlyPieces: Array(13).fill(0),
        totalPieces: 0,
        totalRevenue: 0
      };
    }

    productMap[rawName].monthlyPieces[saleMonth] += qty;
    productMap[rawName].totalPieces += qty;
    productMap[rawName].totalRevenue += totalAmount;

    totalAnnualRevenue += totalAmount;
    totalAnnualPieces += qty;
    monthTotals[saleMonth] += qty;
  });

  return {
    products: Object.values(productMap),
    totalAnnualRevenue,
    totalAnnualPieces,
    monthTotals
  };
}

function renderAnnualReportsView() {
  const yearSelect = document.getElementById('annualReportYearSelect');
  const year = yearSelect ? yearSelect.value : '2026';
  const searchInput = document.getElementById('annualReportSearchInput');
  const searchTxt = searchInput ? searchInput.value.trim().toLowerCase() : '';

  const reportData = getAnnualReportData(year);

  const elRev = document.getElementById('annualTotalRevenueVal');
  if (elRev) elRev.innerText = `${reportData.totalAnnualRevenue.toLocaleString()} ج.م`;

  const elPieces = document.getElementById('annualTotalPiecesVal');
  if (elPieces) elPieces.innerText = `${reportData.totalAnnualPieces.toLocaleString()} قطعة`;

  let topProduct = '--';
  let maxProdPieces = 0;
  reportData.products.forEach(p => {
    if (p.totalPieces > maxProdPieces) {
      maxProdPieces = p.totalPieces;
      topProduct = `${p.name} (${p.totalPieces} قطعة)`;
    }
  });
  const elTopProd = document.getElementById('annualTopProductVal');
  if (elTopProd) elTopProd.innerText = topProduct;

  const monthNames = ["", "ش 1", "ش 2", "ش 3", "ش 4", "ش 5", "ش 6", "ش 7", "ش 8", "ش 9", "ش 10", "ش 11", "ش 12"];
  let bestMonthNum = 1;
  let maxMonthPieces = 0;
  for (let m = 1; m <= 12; m++) {
    if (reportData.monthTotals[m] > maxMonthPieces) {
      maxMonthPieces = reportData.monthTotals[m];
      bestMonthNum = m;
    }
  }
  const elBestMonth = document.getElementById('annualBestMonthVal');
  if (elBestMonth) elBestMonth.innerText = maxMonthPieces > 0 ? `${monthNames[bestMonthNum]} (${maxMonthPieces} قطعة)` : 'لا توجد مبيعات';

  const tbody = document.getElementById('annualReportTableBody');
  if (!tbody) return;
  tbody.innerHTML = '';

  const filteredProducts = reportData.products.filter(p => !searchTxt || p.name.toLowerCase().includes(searchTxt));

  if (filteredProducts.length === 0) {
    tbody.innerHTML = `<tr><td colspan="15" class="p-8 text-center text-slate-500">لا توجد مبيعات مسجلة في سنة ${year} مطابقة للبحث.</td></tr>`;
    const foot = document.getElementById('annualReportTableFoot');
    if (foot) foot.innerHTML = '';
    return;
  }

  filteredProducts.forEach(prod => {
    let monthsHtml = '';
    for (let m = 1; m <= 12; m++) {
      const qty = prod.monthlyPieces[m];
      monthsHtml += `
        <td class="p-2 font-bold ${qty > 0 ? 'text-emerald-400 bg-emerald-500/10 rounded-lg' : 'text-slate-600'}">
          ${qty > 0 ? qty : '-'}
        </td>
      `;
    }

    tbody.innerHTML += `
      <tr class="hover:bg-slate-900/60 transition">
        <td class="p-2.5 text-right font-bold text-white sticky right-0 bg-[#111726] border-l border-slate-800">${prod.name}</td>
        ${monthsHtml}
        <td class="p-2.5 font-black text-cyan-400 bg-slate-950/80 text-sm">${prod.totalPieces}</td>
        <td class="p-2.5 font-black text-emerald-400 bg-slate-950/80 text-sm">${prod.totalRevenue.toLocaleString()} ج</td>
      </tr>
    `;
  });

  let footerMonthsHtml = '';
  for (let m = 1; m <= 12; m++) {
    footerMonthsHtml += `<td class="p-2 text-indigo-300 font-black">${reportData.monthTotals[m] > 0 ? reportData.monthTotals[m] : '-'}</td>`;
  }

  const foot = document.getElementById('annualReportTableFoot');
  if (foot) {
    foot.innerHTML = `
      <tr>
        <td class="p-2.5 text-right font-black text-white sticky right-0 bg-slate-900 border-l border-slate-800">إجمالي قطع الشهر:</td>
        ${footerMonthsHtml}
        <td class="p-2.5 font-black text-cyan-300 text-sm">${reportData.totalAnnualPieces} قطعة</td>
        <td class="p-2.5 font-black text-emerald-300 text-sm">${reportData.totalAnnualRevenue.toLocaleString()} ج</td>
      </tr>
    `;
  }
}

function exportAnnualReportToExcel() {
  const yearSelect = document.getElementById('annualReportYearSelect');
  const year = yearSelect ? yearSelect.value : '2026';
  const reportData = getAnnualReportData(year);

  const excelRows = reportData.products.map(p => ({
    "اسم المنتج": p.name,
    "ش 1": p.monthlyPieces[1],
    "ش 2": p.monthlyPieces[2],
    "ش 3": p.monthlyPieces[3],
    "ش 4": p.monthlyPieces[4],
    "ش 5": p.monthlyPieces[5],
    "ش 6": p.monthlyPieces[6],
    "ش 7": p.monthlyPieces[7],
    "ش 8": p.monthlyPieces[8],
    "ش 9": p.monthlyPieces[9],
    "ش 10": p.monthlyPieces[10],
    "ش 11": p.monthlyPieces[11],
    "ش 12": p.monthlyPieces[12],
    "إجمالي القطع المباعة بالسنة": p.totalPieces,
    "إجمالي المبالغ والمبيعات (ج.م)": p.totalRevenue
  }));

  const ws = XLSX.utils.json_to_sheet(excelRows);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, `تقرير_مبيعات_${year}`);
  XLSX.writeFile(wb, `تقرير_مبيعات_أولاد_العبد_شهري_سنوي_${year}.xlsx`);
}

// ==========================================
// 3. الموردين والمشتريات
// ==========================================
function renderSuppliersTable() {
  const suppliers = getDetailedSuppliers();
  const listContainer = document.getElementById('suppliersMasterList');
  if (!listContainer) return;
  listContainer.innerHTML = '';

  const grandTotalDebts = calculateAllSuppliersTotalRemaining();
  const debtElem = document.getElementById('allSuppliersGrandRemainingVal');
  if (debtElem) debtElem.innerText = `${grandTotalDebts.toLocaleString()} ج.م`;

  const badgeElem = document.getElementById('suppliersCountBadge');
  if (badgeElem) badgeElem.innerText = `${suppliers.length} موردين`;

  if (suppliers.length === 0) {
    listContainer.innerHTML = '<p class="text-xs text-slate-500 text-center py-4">لا يوجد موردين مسجلين.</p>';
    const detailContainer = document.getElementById('supplierDetailContainer');
    if (detailContainer) detailContainer.innerHTML = '';
    return;
  }

  if (!selectedSupplierId || !suppliers.find(s => s.id === selectedSupplierId)) {
    selectedSupplierId = suppliers[0].id;
  }

  suppliers.forEach(sup => {
    let totalBill = 0;
    let totalPaid = 0;
    (sup.items || []).forEach(it => {
      totalBill += (parseFloat(it.total) || 0);
      totalPaid += (parseFloat(it.paid) || 0);
    });
    const remaining = Math.max(0, totalBill - totalPaid);
    const isSelected = sup.id === selectedSupplierId;

    listContainer.innerHTML += `
      <div onclick="selectSupplierProfile('${sup.id}')" class="p-3 rounded-2xl cursor-pointer border transition ${isSelected ? 'bg-purple-950/40 border-purple-500' : 'bg-slate-900/80 border-slate-800 hover:border-slate-700'}">
        <div class="flex justify-between items-start">
          <h4 class="font-bold text-xs text-white truncate">${sup.name}</h4>
          <span class="text-[9px] px-1.5 py-0.5 rounded font-bold ${remaining > 0 ? 'bg-rose-500/20 text-rose-400' : 'bg-emerald-500/20 text-emerald-400'}">
            ${remaining > 0 ? remaining.toLocaleString() + ' ج متبقي' : 'خالص ✔'}
          </span>
        </div>
        <p class="text-[10px] text-slate-400 mt-1"><i class="fa-solid fa-phone text-slate-500"></i> ${sup.phone}</p>
        <div class="mt-2 pt-2 border-t border-slate-800/80 flex justify-between text-[10px]">
          <span class="text-slate-400">الإجمالي: <b class="text-slate-200">${totalBill.toLocaleString()} ج</b></span>
          <span class="text-emerald-400">المدفوع: <b>${totalPaid.toLocaleString()} ج</b></span>
        </div>
      </div>
    `;
  });

  renderSelectedSupplierDetails();
}

function selectSupplierProfile(supId) {
  selectedSupplierId = supId;
  renderSuppliersTable();
}

function renderSelectedSupplierDetails() {
  const suppliers = getDetailedSuppliers();
  const sup = suppliers.find(s => s.id === selectedSupplierId);
  const container = document.getElementById('supplierDetailContainer');
  if (!container) return;

  if (!sup) {
    container.innerHTML = '<p class="text-slate-500 text-center py-10">اختر مورداً من القائمة لعرض كشف حسابه.</p>';
    return;
  }

  let grandTotal = 0;
  let grandPaid = 0;
  let totalPieces = 0;
  let rowsHtml = '';

  (sup.items || []).forEach(it => {
    const itemTot = parseFloat(it.total) || 0;
    const itemPd = parseFloat(it.paid) || 0;
    const itemQty = parseInt(it.qty) || 0;
    const itemUnitPrice = parseFloat(it.unitPrice) || 0;
    const itemRem = Math.max(0, itemTot - itemPd);

    grandTotal += itemTot;
    grandPaid += itemPd;
    totalPieces += itemQty;

    rowsHtml += `
      <tr>
        <td class="p-2.5 text-slate-400">${it.date || '--'}</td>
        <td class="p-2.5 font-bold text-white">${it.name}</td>
        <td class="p-2.5 font-mono text-cyan-300 text-xs">${it.barcode || '--'}</td>
        <td class="p-2.5 text-center font-black text-cyan-400">${itemQty}</td>
        <td class="p-2.5 text-slate-300">${itemUnitPrice.toLocaleString()} ج</td>
        <td class="p-2.5 font-bold text-white">${itemTot.toLocaleString()} ج</td>
        <td class="p-2.5 font-bold text-emerald-400">${itemPd.toLocaleString()} ج</td>
        <td class="p-2.5 font-bold text-rose-400">${itemRem.toLocaleString()} ج</td>
        <td class="p-2.5 text-center">
          <button onclick="deleteSupplierItem('${sup.id}', '${it.id}')" class="text-rose-400 hover:text-rose-300 text-xs p-1" title="حذف الصنف">
            <i class="fa-solid fa-trash-can"></i>
          </button>
        </td>
      </tr>
    `;
  });

  const grandRemaining = Math.max(0, grandTotal - grandPaid);

  container.innerHTML = `
    <div class="bg-gradient-to-r from-purple-950/40 via-slate-900 to-[#111726] border border-purple-500/30 p-4 rounded-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
      <div>
        <div class="flex items-center gap-2">
          <h3 class="text-base font-black text-white">${sup.name}</h3>
          <span class="text-[10px] px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">كود: ${sup.id}</span>
        </div>
        <p class="text-xs text-slate-400 mt-1">هاتف: <a href="tel:${sup.phone}" class="text-blue-400 underline">${sup.phone}</a> | عنوان: ${sup.address || 'غير محدد'}</p>
      </div>
      <div class="flex gap-2 w-full md:w-auto">
        <button onclick="openAddShipmentModal('${sup.id}')" class="flex-1 md:flex-none px-3.5 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs font-bold shadow flex items-center justify-center gap-1.5">
          <i class="fa-solid fa-boxes-packing"></i> تنزيل فاتورة توريد كاملة
        </button>
        <button onclick="paySupplierPrompt('${sup.id}')" class="flex-1 md:flex-none px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow flex items-center justify-center gap-1.5">
          <i class="fa-solid fa-hand-holding-dollar"></i> سداد دفعة
        </button>
      </div>
    </div>

    <div class="grid grid-cols-3 gap-2.5 text-center text-xs my-3">
      <div class="p-2.5 bg-slate-900/90 rounded-2xl border border-slate-800">
        <span class="text-[10px] text-slate-400 block font-semibold">إجمالي المشتريات منه</span>
        <b class="text-sm md:text-base font-black text-white mt-0.5 block">${grandTotal.toLocaleString()} ج.م</b>
      </div>
      <div class="p-2.5 bg-slate-900/90 rounded-2xl border border-emerald-500/20">
        <span class="text-[10px] text-emerald-400 block font-semibold">المسدد له فعلياً</span>
        <b class="text-sm md:text-base font-black text-emerald-300 mt-0.5 block">${grandPaid.toLocaleString()} ج.م</b>
      </div>
      <div class="p-2.5 bg-slate-900/90 rounded-2xl border border-rose-500/20">
        <span class="text-[10px] text-rose-400 block font-semibold">المتبقي له في ذمتنا</span>
        <b class="text-sm md:text-base font-black text-rose-300 mt-0.5 block">${grandRemaining.toLocaleString()} ج.م</b>
      </div>
    </div>

    <div class="overflow-x-auto border border-slate-800 rounded-2xl">
      <table class="w-full text-right text-xs">
        <thead class="bg-slate-900/90 text-slate-400 border-b border-slate-800">
          <tr>
            <th class="p-2.5">التاريخ</th>
            <th class="p-2.5">الصنف والموديل</th>
            <th class="p-2.5">الباركود</th>
            <th class="p-2.5 text-center text-cyan-400">العدد</th>
            <th class="p-2.5">سعر القطعة</th>
            <th class="p-2.5 text-white font-bold">الإجمالي</th>
            <th class="p-2.5 text-emerald-400">المدفوع</th>
            <th class="p-2.5 text-rose-400">المتبقي</th>
            <th class="p-2.5 text-center">إجراء</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-800 text-slate-300">
          ${rowsHtml || '<tr><td colspan="9" class="p-6 text-center text-slate-500">لا توجد أصناف موردة مسجلة لهذا المورد.</td></tr>'}
        </tbody>
        <tfoot class="bg-slate-900 font-bold border-t-2 border-slate-700 text-white">
          <tr>
            <td colspan="3" class="p-2.5 text-right">إجمالي جميع القطع والتوريدات:</td>
            <td class="p-2.5 text-center text-cyan-400 text-sm font-black">${totalPieces}</td>
            <td>--</td>
            <td class="p-2.5 text-white text-sm font-black">${grandTotal.toLocaleString()} ج</td>
            <td class="p-2.5 text-emerald-400 text-sm font-black">${grandPaid.toLocaleString()} ج</td>
            <td class="p-2.5 text-rose-400 text-sm font-black">${grandRemaining.toLocaleString()} ج</td>
            <td></td>
          </tr>
        </tfoot>
      </table>
    </div>
  `;
}

function handleCreateSupplierProfile() {
  const nameInput = document.getElementById('newSupNameInput');
  const phoneInput = document.getElementById('newSupPhoneInput');
  const addrInput = document.getElementById('newSupAddressInput');

  if (!nameInput || !phoneInput) return;

  const name = nameInput.value.trim();
  const phone = phoneInput.value.trim();
  const address = addrInput ? addrInput.value.trim() : '';

  if (!name || !phone) {
    alert('يرجى إدخال اسم المورد ورقم الهاتف.');
    return;
  }

  const suppliers = getDetailedSuppliers();
  const newSup = {
    id: 'SUP-' + (suppliers.length + 10),
    name,
    phone,
    address,
    items: []
  };

  suppliers.push(newSup);
  setDetailedSuppliers(suppliers);
  selectedSupplierId = newSup.id;

  closeModal('addNewSupplierProfileModal');
  nameInput.value = '';
  phoneInput.value = '';
  if (addrInput) addrInput.value = '';

  renderSuppliersTable();
  populateDeviceSelects();
  exportCurrentDatabaseToExcel();
  alert(`تم إضافة المورد (${name}) بنجاح.`);
}

function deleteSupplierItem(supId, itemId) {
  if (confirm('هل أنت متأكد من حذف هذا الصنف من فاتورة المورد؟ سيتم حذفه تلقائياً من رصيد المخزن.')) {
    const suppliers = getDetailedSuppliers();
    const sup = suppliers.find(s => s.id === supId);
    if (sup) {
      sup.items = sup.items.filter(it => it.id !== itemId);
      setDetailedSuppliers(suppliers);
      renderSuppliersTable();
      populateDeviceSelects();
      renderDashboard();
      exportCurrentDatabaseToExcel();
      alert('تم حذف التوريدة واختفى الصنف من المخزن بنجاح.');
    }
  }
}

function paySupplierPrompt(supId) {
  const suppliers = getDetailedSuppliers();
  const sup = suppliers.find(s => s.id === supId);
  if (!sup) return;

  let totalBill = 0;
  let totalPaid = 0;
  (sup.items || []).forEach(it => { totalBill += (parseFloat(it.total) || 0); totalPaid += (parseFloat(it.paid) || 0); });
  const currentRem = Math.max(0, totalBill - totalPaid);

  const amt = prompt(`أدخل المبلغ المراد سداده للمورد (${sup.name}) - المتبقي: ${currentRem.toLocaleString()} ج:`);
  if (amt && !isNaN(amt) && parseFloat(amt) > 0) {
    let paymentToDistribute = parseFloat(amt);

    for (let it of (sup.items || [])) {
      if (paymentToDistribute <= 0) break;
      const itemRem = (parseFloat(it.total) || 0) - (parseFloat(it.paid) || 0);
      if (itemRem > 0) {
        const addPay = Math.min(itemRem, paymentToDistribute);
        it.paid = (parseFloat(it.paid) || 0) + addPay;
        it.remaining = (parseFloat(it.total) || 0) - it.paid;
        paymentToDistribute -= addPay;
      }
    }

    setDetailedSuppliers(suppliers);
    renderSuppliersTable();
    renderDashboard();
    exportCurrentDatabaseToExcel();
    alert('تم تسجيل سداد الدفعة للمورد بنجاح.');
  }
}

// ==========================================
// 4. المخزن والأرصدة
// ==========================================
function renderInventoryTable() {
  const inventory = buildDynamicInventory();
  const tbody = document.getElementById('inventoryTableBody');
  if (!tbody) return;
  tbody.innerHTML = '';

  if (inventory.length === 0) {
    tbody.innerHTML = `<tr><td colspan="7" class="p-8 text-center text-slate-500">المخزن فارغ حالياً.</td></tr>`;
    return;
  }

  inventory.forEach(item => {
    const isLow = item.currentQty <= 2;
    tbody.innerHTML += `
      <tr>
        <td class="p-2.5 font-bold text-white">${item.name}</td>
        <td class="p-2.5 font-mono text-cyan-300 text-xs">${item.barcode || '--'}</td>
        <td class="p-2.5 text-purple-300 font-semibold">${item.supplierName}</td>
        <td class="p-2.5 text-center font-black text-base ${isLow ? 'text-rose-400' : 'text-emerald-400'}">${item.currentQty}</td>
        <td class="p-2.5 text-slate-300">${item.buyPrice.toLocaleString()} ج</td>
        <td class="p-2.5 font-bold text-emerald-400">
          <input type="number" id="cash_price_input_${item.itemId}" value="${item.cashPrice}" class="w-24 bg-[#090d16] border border-slate-700 rounded-lg p-1 text-white text-xs font-bold text-center">
        </td>
        <td class="p-2.5 text-center">
          <button onclick="updateItemSellingPrice('${item.name}', '${item.itemId}')" class="px-2.5 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold shadow">تحديث</button>
        </td>
      </tr>
    `;
  });
}

function updateItemSellingPrice(itemName, itemId) {
  const input = document.getElementById(`cash_price_input_${itemId}`);
  if (!input) return;
  const newPrice = parseFloat(input.value);
  if (isNaN(newPrice) || newPrice <= 0) {
    alert('يرجى إدخال سعر بيع كاش صحيح.');
    return;
  }

  const sellingPrices = getSellingPrices();
  sellingPrices[itemName] = newPrice;
  setSellingPrices(sellingPrices);

  populateDeviceSelects();
  renderInventoryTable();
  exportCurrentDatabaseToExcel();
  alert(`تم تحديث سعر البيع الكاش لصنف (${itemName}) إلى ${newPrice.toLocaleString()} ج.م.`);
}

function exportInventoryToExcel() {
  const inventory = buildDynamicInventory();
  const data = inventory.map(i => ({
    "اسم الجهاز": i.name,
    "الباركود": i.barcode,
    "المورد": i.supplierName,
    "الكمية الحالية": i.currentQty,
    "سعر الشراء (ج.م)": i.buyPrice,
    "سعر الكاش (ج.م)": i.cashPrice,
    "إجمالي قيمة المخزون": i.currentQty * i.buyPrice
  }));
  const ws = XLSX.utils.json_to_sheet(data);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "جرد المخزن");
  XLSX.writeFile(wb, `جرد_مخزن_أولاد_العبد_${new Date().toISOString().split('T')[0]}.xlsx`);
}

// ==========================================
// 5. سجل وإدارة الأقساط وملفات العملاء
// ==========================================
function renderInstallmentsTable() {
  const contracts = getStoredContracts();
  const tbody = document.getElementById('installmentsContractsTableBody');
  if (!tbody) return;

  const searchInput = document.getElementById('searchInstallmentInput');
  const search = searchInput ? searchInput.value.trim().toLowerCase() : '';
  tbody.innerHTML = '';

  const clientsMap = {};

  contracts.forEach((cnt, idx) => {
    const phone = (cnt.customerPhone || '').toString().trim();
    if (!phone) return;

    if (!clientsMap[phone]) {
      clientsMap[phone] = {
        clientCode: cnt.clientCode || (idx + 1),
        customerName: cnt.customerName || 'عميل غير مسجل',
        customerPhone: phone,
        nationalId: cnt.nationalId || '--',
        guarantorName: cnt.guarantorName || '--',
        guarantorPhone: cnt.guarantorPhone || '--',
        invoices: [],
        totalGrand: 0,
        totalPaid: 0,
        totalRemaining: 0
      };
    }
    clientsMap[phone].invoices.push(cnt);
    clientsMap[phone].totalGrand += (parseFloat(cnt.totalWithInterest) || 0);
    clientsMap[phone].totalPaid += (parseFloat(cnt.paidAmount) || 0);
    clientsMap[phone].totalRemaining += (parseFloat(cnt.remainingAmount) || 0);
  });

  const clientsList = Object.values(clientsMap).filter(cl => {
    const codeMatch = (cl.clientCode || '').toString().toLowerCase().includes(search);
    const nameMatch = (cl.customerName || '').toLowerCase().includes(search);
    const phoneMatch = (cl.customerPhone || '').includes(search);
    const natMatch = (cl.nationalId || '').toString().includes(search);
    const gNameMatch = (cl.guarantorName || '').toLowerCase().includes(search);
    return codeMatch || nameMatch || phoneMatch || natMatch || gNameMatch;
  });

  if (clientsList.length === 0) {
    tbody.innerHTML = '<tr><td colspan="9" class="p-6 text-center text-slate-500">لا يوجد عملاء مسجلين أو مطابقين للبحث.</td></tr>';
    return;
  }

  clientsList.forEach(cl => {
    tbody.innerHTML += `
      <tr class="hover:bg-slate-900/50 transition">
        <td class="p-2.5 text-center font-black text-cyan-400 font-mono text-sm">#${cl.clientCode}</td>
        <td class="p-2.5 font-bold text-white cursor-pointer hover:text-blue-400 transition" onclick="openCustomerProfileModal('${cl.customerPhone}')">
          <span class="flex items-center gap-2">
            <i class="fa-solid fa-folder-open text-amber-400 text-xs"></i>
            <span class="underline decoration-slate-700 underline-offset-4">${cl.customerName}</span>
          </span>
          <span class="text-[10px] text-slate-400 font-normal block mt-0.5">بطاقة: ${cl.nationalId}</span>
        </td>
        <td class="p-2.5">
          <b class="text-slate-200 text-xs">${cl.guarantorName}</b>
          <span class="text-[10px] text-slate-400 block">${cl.guarantorPhone}</span>
        </td>
        <td class="p-2.5 text-center font-bold text-cyan-300">
          <span class="px-2 py-0.5 rounded bg-blue-500/20 text-blue-300">${cl.invoices.length} فواتير</span>
        </td>
        <td class="p-2.5 font-bold text-white">${cl.totalGrand.toLocaleString()} ج.م</td>
        <td class="p-2.5 font-bold text-emerald-400">${cl.totalPaid.toLocaleString()} ج.م</td>
        <td class="p-2.5 font-bold text-rose-400">${cl.totalRemaining.toLocaleString()} ج.م</td>
        <td class="p-2.5 text-center">
          <a href="tel:${cl.customerPhone}" class="inline-flex items-center justify-center w-8 h-8 rounded-xl bg-slate-800 hover:bg-slate-700 text-blue-400 border border-slate-700 transition" title="اتصال بالعميل">
            <i class="fa-solid fa-phone text-xs"></i>
          </a>
        </td>
        <td class="p-2.5 text-center">
          <button onclick="openCustomerProfileModal('${cl.customerPhone}')" class="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 mx-auto shadow">
            <i class="fa-solid fa-eye"></i> فتح الملف
          </button>
        </td>
      </tr>
    `;
  });
}

function openCustomerProfileModal(phone, preferredInvoiceId = null) {
  activeCustomerPhoneForProfile = phone;
  const contracts = getStoredContracts().filter(c => (c.customerPhone || '').toString().trim() === phone.trim());
  if (contracts.length === 0) return;

  const firstCnt = contracts[0];
  const elCode = document.getElementById('cpModalClientCode');
  if (elCode) elCode.innerText = `كود: #${firstCnt.clientCode || 1}`;

  const elName = document.getElementById('cpModalCustomerName');
  if (elName) elName.innerText = firstCnt.customerName || '--';

  const elPhLink = document.getElementById('cpModalCustomerPhoneLink');
  if (elPhLink) {
    elPhLink.innerText = firstCnt.customerPhone || '--';
    elPhLink.href = `tel:${firstCnt.customerPhone}`;
  }

  const elNat = document.getElementById('cpModalNationalId');
  if (elNat) elNat.innerText = firstCnt.nationalId || '--';

  const elG = document.getElementById('cpModalGuarantorDetails');
  if (elG) {
    elG.innerHTML = `الاسم: <b>${firstCnt.guarantorName || '--'}</b> | الهاتف: <b>${firstCnt.guarantorPhone || '--'}</b> | الرقم القومي: <b>${firstCnt.guarantorNationalId || '--'}</b>`;
  }

  let grandTotal = 0;
  let grandPaid = 0;
  let grandRemaining = 0;

  contracts.forEach(c => {
    grandTotal += (parseFloat(c.totalWithInterest) || 0);
    grandPaid += (parseFloat(c.paidAmount) || 0);
    grandRemaining += (parseFloat(c.remainingAmount) || 0);
  });

  const elGT = document.getElementById('cpModalGrandTotal');
  if (elGT) elGT.innerText = `${grandTotal.toLocaleString()} ج.م`;

  const elGP = document.getElementById('cpModalGrandPaid');
  if (elGP) elGP.innerText = `${grandPaid.toLocaleString()} ج.م`;

  const elGR = document.getElementById('cpModalGrandRemaining');
  if (elGR) elGR.innerText = `${grandRemaining.toLocaleString()} ج.م`;

  activeInvoiceIdInProfile = preferredInvoiceId || contracts[0].id;

  const tabsContainer = document.getElementById('cpModalInvoicesTabs');
  if (tabsContainer) {
    tabsContainer.innerHTML = '';
    contracts.forEach((cnt, idx) => {
      const isActive = cnt.id === activeInvoiceIdInProfile;
      const parsed = parseItemsFromRecord(cnt);
      const itemCount = parsed.length;
      tabsContainer.innerHTML += `
        <button onclick="selectInvoiceTabInProfile('${cnt.id}')" class="px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition flex items-center gap-1.5 ${isActive ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30' : 'bg-slate-900 text-slate-400 hover:bg-slate-800 hover:text-white border border-slate-800'}">
          <span>فاتورة #${idx + 1} (${itemCount} أصناف)</span>
          <span class="text-[10px] opacity-80">(${cnt.remainingAmount <= 0 ? 'خالصة ✔' : (parseFloat(cnt.remainingAmount) || 0).toLocaleString() + ' ج متبقي'})</span>
        </button>
      `;
    });
  }

  renderActiveInvoiceDetailsInProfile();
  openModal('customerProfileModal');
}

function selectInvoiceTabInProfile(invoiceId) {
  activeInvoiceIdInProfile = invoiceId;
  openCustomerProfileModal(activeCustomerPhoneForProfile, invoiceId);
}

function renderActiveInvoiceDetailsInProfile() {
  const contracts = getStoredContracts();
  const cnt = contracts.find(c => c.id === activeInvoiceIdInProfile);
  const container = document.getElementById('cpModalSelectedInvoiceContainer');
  if (!container) return;

  if (!cnt) {
    container.innerHTML = '<p class="text-xs text-slate-500 text-center py-6">لم يتم العثور على الفاتورة المختارة.</p>';
    return;
  }

  const isFullyPaid = (parseFloat(cnt.remainingAmount) || 0) <= 0;
  const purchasedItems = parseItemsFromRecord(cnt);

  const itemsTableRows = purchasedItems.map(item => `
    <tr class="hover:bg-slate-950/40 transition">
      <td class="p-2 text-center font-black text-cyan-400 text-sm">${item.qty}</td>
      <td class="p-2 font-bold text-white">${item.name}</td>
      <td class="p-2 font-mono text-[11px] text-blue-300">${item.serial || cnt.serialNumber || '--'}</td>
      <td class="p-2 text-slate-300">${(item.unitPrice || 0).toLocaleString()} ج.م</td>
      <td class="p-2 font-bold text-emerald-400">${(item.total || (item.qty * item.unitPrice) || 0).toLocaleString()} ج.م</td>
    </tr>
  `).join('');

  container.innerHTML = `
    <div class="bg-slate-900 border ${isFullyPaid ? 'border-emerald-500/40' : 'border-slate-800'} rounded-3xl p-4 space-y-3.5">
      <div class="space-y-1.5">
        <span class="text-xs font-bold text-cyan-400 flex items-center gap-1.5">
          <i class="fa-solid fa-cart-shopping"></i> قائمة الأجهزة المشتراة في هذه الفاتورة:
        </span>
        <div class="overflow-x-auto border border-slate-800 rounded-2xl bg-slate-950/60">
          <table class="w-full text-right text-xs">
            <thead class="bg-slate-950 text-slate-400 border-b border-slate-800">
              <tr>
                <th class="p-2 text-center">العدد</th>
                <th class="p-2">الصنف والموديل</th>
                <th class="p-2">السيريال نمبر</th>
                <th class="p-2">سعر الوحدة</th>
                <th class="p-2">السعر الإجمالي</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-800/80 text-slate-300">
              ${itemsTableRows}
            </tbody>
          </table>
        </div>
      </div>

      <div class="bg-slate-950/70 p-3 rounded-2xl border border-slate-800 grid grid-cols-2 md:grid-cols-5 gap-2 text-center text-xs">
        <div class="p-1.5">
          <span class="text-[10px] text-slate-400 block font-semibold">إجمالي الكاش</span>
          <b class="text-white">${(cnt.cashPrice || 0).toLocaleString()} ج</b>
        </div>
        <div class="p-1.5">
          <span class="text-[10px] text-blue-400 block font-semibold">نسبة الفائدة</span>
          <b class="text-blue-300 font-bold">${cnt.interestRate || 15}% سنوياً</b>
        </div>
        <div class="p-1.5">
          <span class="text-[10px] text-purple-400 block font-semibold">مدة التقسيط</span>
          <b class="text-purple-300 font-bold">${cnt.months || 12} شهر</b>
        </div>
        <div class="p-1.5">
          <span class="text-[10px] text-emerald-400 block font-semibold">المقدم المدفوع</span>
          <b class="text-emerald-300 font-bold">${(cnt.downPayment || 0).toLocaleString()} ج</b>
        </div>
        <div class="p-1.5">
          <span class="text-[10px] text-cyan-400 block font-semibold">القسط الشهري</span>
          <b class="text-cyan-300 font-black">${(cnt.monthlyAmount || 0).toLocaleString()} ج</b>
        </div>
      </div>

      <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-2 bg-slate-950/40 p-2.5 rounded-2xl border border-slate-800/80 text-xs">
        <div>
          <span class="text-slate-400">إجمالي الفاتورة بالفوائد: <b class="text-white">${(cnt.totalWithInterest || 0).toLocaleString()} ج</b></span> | 
          <span class="text-emerald-400">المحصل: <b>${(cnt.paidAmount || 0).toLocaleString()} ج</b></span> | 
          <span class="text-rose-400">المتبقي المطلوب: <b class="text-sm font-black">${(cnt.remainingAmount || 0).toLocaleString()} ج</b></span>
        </div>
        <div class="flex gap-2">
          <button onclick="openEditInvoiceModal('${cnt.id}')" class="px-3 py-1.5 bg-amber-600/20 hover:bg-amber-600 text-amber-300 hover:text-white border border-amber-500/30 rounded-xl text-xs font-bold flex items-center gap-1 transition">
            <i class="fa-solid fa-pen-to-square"></i> تعديل الفاتورة ✏️
          </button>
          <button onclick="openChooseWhatsAppModal('${cnt.id}')" class="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow">
            <i class="fa-brands fa-whatsapp text-sm"></i> إرسال تقرير الفاتورة
          </button>
        </div>
      </div>

      <div class="overflow-x-auto border border-slate-800 rounded-2xl max-h-56 custom-scrollbar">
        <table class="w-full text-right text-xs">
          <thead class="bg-slate-950 text-slate-400 sticky top-0 border-b border-slate-800">
            <tr>
              <th class="p-2">رقم القسط</th>
              <th class="p-2">تاريخ الاستحقاق</th>
              <th class="p-2">المبلغ الكلي</th>
              <th class="p-2">المسدد منه</th>
              <th class="p-2 text-rose-300">المتبقي للقسط</th>
              <th class="p-2">الحالة</th>
              <th class="p-2 text-center">إجراء السداد</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-800 text-slate-300">
            ${(cnt.installments || []).map(inst => {
              const paidSoFar = inst.paidActual || 0;
              const remaining = Math.max(0, inst.amount - paidSoFar);
              const isDone = inst.status === 'مدفوع بالكامل';
              const isPartial = inst.status === 'مدفوع جزئياً';

              let statusBadge = `<span class="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-500/20 text-rose-400">${inst.status}</span>`;
              if (isDone) statusBadge = `<span class="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-400">مدفوع بالكامل ✔</span>`;
              if (isPartial) statusBadge = `<span class="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-400">مدفوع جزئياً ⏳</span>`;

              return `
                <tr>
                  <td class="p-2 font-bold text-white">القسط #${inst.number}</td>
                  <td class="p-2 text-slate-300">${inst.dueDate}</td>
                  <td class="p-2 font-bold text-white">${inst.amount.toLocaleString()} ج</td>
                  <td class="p-2 text-emerald-400 font-bold">${paidSoFar.toLocaleString()} ج</td>
                  <td class="p-2 text-rose-300 font-bold">${remaining.toLocaleString()} ج</td>
                  <td class="p-2">${statusBadge}</td>
                  <td class="p-2 text-center">
                    ${!isDone ? `
                      <button onclick="openCollectInstallmentModal('${cnt.id}', ${inst.number})" class="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded text-[10px] font-bold shadow">
                        تحصيل دفعة 💰
                      </button>
                    ` : `<span class="text-[10px] text-slate-400">خالص: ${inst.paidDate}</span>`}
                  </td>
                </tr>
              `;
            }).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

// ==========================================
// 6. فواتير البيع والمبيعات
// ==========================================
function viewSingleInvoiceDetails(saleId) {
  const sales = getStoredSales();
  const sale = sales.find(s => s.id === saleId);
  if (!sale) return;

  const idElem = document.getElementById('vsimInvoiceId');
  if (idElem) idElem.innerText = `#${sale.id}`;

  const metaElem = document.getElementById('vsimClientMeta');
  if (metaElem) metaElem.innerText = `العميل: ${sale.customerName} | الهاتف: ${sale.customerPhone} | النوع: ${sale.type}`;

  const grandElem = document.getElementById('vsimGrandTotal');
  if (grandElem) grandElem.innerText = `${(sale.totalPrice || 0).toLocaleString()} ج.م`;

  const items = parseItemsFromRecord(sale);
  const tbody = document.getElementById('vsimItemsTbody');
  if (tbody) {
    tbody.innerHTML = items.map(it => `
      <tr>
        <td class="p-2 text-center font-bold text-cyan-400">${it.qty}</td>
        <td class="p-2 font-bold text-white">${it.name}</td>
        <td class="p-2 font-mono text-[11px] text-blue-300">${it.serial || sale.serialNumber || '--'}</td>
        <td class="p-2 text-slate-300">${(it.unitPrice || 0).toLocaleString()} ج.م</td>
        <td class="p-2 font-bold text-emerald-400">${(it.total || (it.qty * it.unitPrice) || 0).toLocaleString()} ج.م</td>
      </tr>
    `).join('');
  }

  openModal('viewSingleInvoiceModal');
}

function renderSalesTable() {
  const sales = getStoredSales();
  const tbody = document.getElementById('salesInvoicesTableBody');
  if (!tbody) return;
  tbody.innerHTML = '';

  if (sales.length === 0) {
    tbody.innerHTML = '<tr><td colspan="8" class="p-6 text-center text-slate-500">لا توجد فواتير مبيعات مسجلة حتى الآن.</td></tr>';
    return;
  }

  sales.forEach(s => {
    tbody.innerHTML += `
      <tr>
        <td class="p-2.5 font-bold text-white cursor-pointer hover:text-blue-400" onclick="viewSingleInvoiceDetails('${s.id}')">#${s.id}</td>
        <td class="p-2.5 text-slate-400">${s.date}</td>
        <td class="p-2.5">${s.customerName}<br><span class="text-[10px] text-slate-400">${s.customerPhone}</span></td>
        <td class="p-2.5 cursor-pointer hover:underline" onclick="viewSingleInvoiceDetails('${s.id}')">${s.deviceName}</td>
        <td class="p-2.5"><span class="px-2 py-0.5 rounded text-[10px] font-bold ${s.type === 'كاش' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-blue-500/20 text-blue-400'}">${s.type}</span></td>
        <td class="p-2.5 font-bold text-white">${(parseFloat(s.totalPrice) || 0).toLocaleString()} ج.م</td>
        <td class="p-2.5 font-bold text-emerald-400">${(parseFloat(s.paidImmediately) || 0).toLocaleString()} ج.م</td>
        <td class="p-2.5 text-center space-x-1 space-x-reverse">
          <button onclick="viewSingleInvoiceDetails('${s.id}')" class="px-2 py-1 bg-blue-600/20 hover:bg-blue-600 text-blue-300 hover:text-white border border-blue-500/30 rounded-lg text-xs font-bold transition">
            عرض الفاتورة 📄
          </button>
          <button onclick="openEditInvoiceModal('${s.id}')" class="px-2 py-1 bg-amber-600/20 hover:bg-amber-600 text-amber-300 hover:text-white border border-amber-500/30 rounded-lg text-xs font-bold transition">
            تعديل ✏️
          </button>
        </td>
      </tr>
    `;
  });
}

function openNewSaleForThisCustomer() {
  if (!activeCustomerPhoneForProfile) return;
  const contracts = getStoredContracts().filter(c => (c.customerPhone || '').toString().trim() === activeCustomerPhoneForProfile.trim());
  if (contracts.length > 0) {
    closeModal('customerProfileModal');
    const nameIn = document.getElementById('saleCustomerName');
    if (nameIn) nameIn.value = contracts[0].customerName;

    const phoneIn = document.getElementById('saleCustomerPhone');
    if (phoneIn) phoneIn.value = contracts[0].customerPhone;

    const natIn = document.getElementById('saleCustomerNationalId');
    if (natIn) natIn.value = contracts[0].nationalId || '';

    const gN = document.getElementById('saleGuarantorName');
    if (gN) gN.value = contracts[0].guarantorName || '';

    const gP = document.getElementById('saleGuarantorPhone');
    if (gP) gP.value = contracts[0].guarantorPhone || '';

    const gNat = document.getElementById('saleGuarantorNationalId');
    if (gNat) gNat.value = contracts[0].guarantorNationalId || '';

    openModal('newSaleModal');
  }
}

// ==========================================
// 7. سلة البيع وحفظ الفاتورة
// ==========================================
function filterSaleProductsLiveSearch() {
  const searchInput = document.getElementById('saleProductLiveSearch');
  const searchTxt = searchInput ? searchInput.value.trim().toLowerCase() : '';
  populateDeviceSelects(searchTxt);
}

function populateDeviceSelects(filterTxt = '') {
  const inventory = buildDynamicInventory();
  const select = document.getElementById('saleDeviceSelect');
  if (!select) return;
  select.innerHTML = '<option value="">-- اختر الجهاز من المخزن --</option>';

  const filtered = inventory.filter(dev => 
    !filterTxt || dev.name.toLowerCase().includes(filterTxt) || (dev.barcode && dev.barcode.toLowerCase().includes(filterTxt))
  );

  filtered.forEach(dev => {
    const disabled = dev.currentQty <= 0 ? 'disabled' : '';
    select.innerHTML += `
      <option value="${dev.itemId}" data-name="${dev.name}" data-price="${dev.cashPrice}" data-maxqty="${dev.currentQty}" data-barcode="${dev.barcode}" ${disabled}>
        ${dev.name} [المتوفر: ${dev.currentQty}] - ${dev.cashPrice.toLocaleString()} ج.م
      </option>
    `;
  });

  if (filtered.length > 0) {
    select.selectedIndex = 1;
    autoFillDevicePrice();
  }
}

function autoFillDevicePrice() {
  const select = document.getElementById('saleDeviceSelect');
  if (!select) return;
  const selectedOption = select.options[select.selectedIndex];
  if (selectedOption && selectedOption.value) {
    const unitPrice = parseFloat(selectedOption.getAttribute('data-price')) || 0;
    const maxQty = parseInt(selectedOption.getAttribute('data-maxqty')) || 1;

    const prInput = document.getElementById('saleItemPriceInput');
    if (prInput) prInput.value = unitPrice;

    const qtyInput = document.getElementById('saleItemQtyInput');
    if (qtyInput) {
      qtyInput.max = maxQty;
      qtyInput.value = 1;
    }
  }
}

function addItemToSaleCart() {
  const select = document.getElementById('saleDeviceSelect');
  if (!select) return;
  const selectedOption = select.options[select.selectedIndex];
  if (!selectedOption || !selectedOption.value) {
    alert('يرجى اختيار جهاز لإضافته للسلة.');
    return;
  }

  const name = selectedOption.getAttribute('data-name');
  const prInput = document.getElementById('saleItemPriceInput');
  const unitPrice = prInput ? (parseFloat(prInput.value) || 0) : 0;

  const qtyInput = document.getElementById('saleItemQtyInput');
  const qty = qtyInput ? (parseInt(qtyInput.value) || 1) : 1;

  const serInput = document.getElementById('saleItemSerialInput');
  const serial = (serInput && serInput.value.trim()) ? serInput.value.trim() : 'SN-AUTO';
  const maxQty = parseInt(selectedOption.getAttribute('data-maxqty')) || 1;

  if (qty > maxQty) {
    alert(`الكمية المطلوبة (${qty}) تتجاوز الرصيد المتوفر بالمخزن (${maxQty}).`);
    return;
  }

  currentSaleInvoiceCart.push({
    itemId: selectedOption.value,
    name,
    qty,
    unitPrice,
    total: qty * unitPrice,
    serial
  });

  if (serInput) serInput.value = '';
  renderSaleCartTbody();
}

function renderSaleCartTbody() {
  const tbody = document.getElementById('saleCartTbody');
  if (!tbody) return;
  tbody.innerHTML = '';
  let grandTotal = 0;

  currentSaleInvoiceCart.forEach((item, idx) => {
    grandTotal += item.total;
    tbody.innerHTML += `
      <tr>
        <td class="p-2 font-bold text-white">${item.name}</td>
        <td class="p-2 font-mono text-cyan-300 text-xs">${item.serial}</td>
        <td class="p-2 text-center font-bold text-cyan-400">${item.qty}</td>
        <td class="p-2 text-slate-300">${item.unitPrice.toLocaleString()} ج</td>
        <td class="p-2 font-bold text-white">${item.total.toLocaleString()} ج</td>
        <td class="p-2 text-center">
          <button onclick="removeSaleCartItem(${idx})" class="text-rose-400 hover:text-rose-300"><i class="fa-solid fa-xmark"></i></button>
        </td>
      </tr>
    `;
  });

  if (currentSaleInvoiceCart.length === 0) {
    tbody.innerHTML = '<tr><td colspan="6" class="p-4 text-center text-slate-500">السلة فارغة. اختر أجهزة لإضافتها للفاتورة.</td></tr>';
  }

  const grandDisplay = document.getElementById('saleCartGrandTotalDisplay');
  if (grandDisplay) grandDisplay.innerText = `${grandTotal.toLocaleString()} ج.م`;
  calculateInstallmentMath();
}

function removeSaleCartItem(idx) {
  currentSaleInvoiceCart.splice(idx, 1);
  renderSaleCartTbody();
}

function toggleInstallmentFields() {
  const typeSelect = document.getElementById('saleTypeSelect');
  if (!typeSelect) return;
  const isInst = typeSelect.value === 'installment';

  const box = document.getElementById('installmentFieldsBox');
  if (box) box.classList.toggle('hidden', !isInst);

  if (isInst) calculateInstallmentMath();
}

function calculateInstallmentMath() {
  let cashTotal = 0;
  currentSaleInvoiceCart.forEach(it => cashTotal += it.total);

  const dpInput = document.getElementById('instDownPayment');
  const downPayment = dpInput ? (parseFloat(dpInput.value) || 0) : 0;

  const mInput = document.getElementById('instMonths');
  const months = mInput ? (parseInt(mInput.value) || 12) : 12;

  const irInput = document.getElementById('instInterestRate');
  const interestRate = irInput ? (parseFloat(irInput.value) || 0) : 0;

  const remainingBase = Math.max(0, cashTotal - downPayment);
  const interestAmount = remainingBase * (interestRate / 100) * (months / 12);
  const totalRemainingWithInterest = remainingBase + interestAmount;
  const grandTotalContract = downPayment + totalRemainingWithInterest;
  const monthlyAmount = months > 0 ? Math.round(totalRemainingWithInterest / months) : 0;

  const totElem = document.getElementById('instCalculatedTotal');
  if (totElem) totElem.innerText = `${Math.round(grandTotalContract).toLocaleString()} ج.م`;

  const moElem = document.getElementById('instCalculatedMonthly');
  if (moElem) moElem.innerText = `${monthlyAmount.toLocaleString()} ج / شهر`;

  return {
    cashPrice: cashTotal,
    downPayment,
    months,
    interestRate,
    grandTotalContract: Math.round(grandTotalContract),
    monthlyAmount,
    totalRemainingWithInterest: Math.round(totalRemainingWithInterest)
  };
}

function handleSaveSaleInvoice() {
  if (currentSaleInvoiceCart.length === 0) {
    alert('يرجى إضافة جهاز واحد على الأقل إلى سلة الفاتورة.');
    return;
  }

  const nameInput = document.getElementById('saleCustomerName');
  const phoneInput = document.getElementById('saleCustomerPhone');

  if (!nameInput || !phoneInput) return;

  const customerName = nameInput.value.trim();
  const customerPhone = phoneInput.value.trim();

  const natIdInput = document.getElementById('saleCustomerNationalId');
  const nationalId = (natIdInput && natIdInput.value.trim()) ? natIdInput.value.trim() : '--';

  const gNameInput = document.getElementById('saleGuarantorName');
  const guarantorName = (gNameInput && gNameInput.value.trim()) ? gNameInput.value.trim() : '--';

  const gPhoneInput = document.getElementById('saleGuarantorPhone');
  const guarantorPhone = (gPhoneInput && gPhoneInput.value.trim()) ? gPhoneInput.value.trim() : '--';

  const gNatIdInput = document.getElementById('saleGuarantorNationalId');
  const guarantorNationalId = (gNatIdInput && gNatIdInput.value.trim()) ? gNatIdInput.value.trim() : '--';

  const typeSelect = document.getElementById('saleTypeSelect');
  const saleType = typeSelect ? typeSelect.value : 'installment';

  if (!customerName || !customerPhone) {
    alert('يرجى كتابة اسم العميل ورقم الهاتف.');
    return;
  }

  const today = new Date().toISOString().split('T')[0];
  const sales = getStoredSales();
  const newInvoiceId = 'INV-' + (sales.length + 501);

  const deviceNamesCombined = currentSaleInvoiceCart.map(i => `${i.name} (عدد ${i.qty})`).join(' + ');
  const serialsCombined = currentSaleInvoiceCart.map(i => i.serial).join(', ');
  let totalQty = 0;
  let totalCashPrice = 0;
  currentSaleInvoiceCart.forEach(i => { totalQty += i.qty; totalCashPrice += i.total; });

  if (saleType === 'cash') {
    sales.unshift({
      id: newInvoiceId,
      date: today,
      customerName,
      customerPhone,
      nationalId,
      guarantorName,
      guarantorPhone,
      guarantorNationalId,
      deviceName: deviceNamesCombined,
      rawDeviceName: currentSaleInvoiceCart[0].name,
      serialNumber: serialsCombined,
      type: 'كاش',
      quantity: totalQty,
      unitPrice: totalCashPrice / totalQty,
      totalPrice: totalCashPrice,
      paidImmediately: totalCashPrice,
      contractId: null,
      items: [...currentSaleInvoiceCart]
    });

    setStoredSales(sales);
    closeModal('newSaleModal');
    currentSaleInvoiceCart = [];
    renderSaleCartTbody();
    populateDeviceSelects();
    renderDashboard();
    renderInventoryTable();
    renderSalesTable();
    exportCurrentDatabaseToExcel();
    alert(`تم حفظ فاتورة البيع الكاش (${newInvoiceId}) بنجاح.`);
  } else {
    const math = calculateInstallmentMath();
    const contracts = getStoredContracts();

    const existingClientContract = contracts.find(c => (c.customerPhone || '').toString().trim() === customerPhone.trim());
    let clientCodeToUse;
    if (existingClientContract && existingClientContract.clientCode) {
      clientCodeToUse = existingClientContract.clientCode;
    } else {
      clientCodeToUse = contracts.length > 0 ? (Math.max(...contracts.map(c => c.clientCode || 0)) + 1) : 1;
    }

    const contractId = 'CNT-' + (contracts.length + 101);
    const stDateInput = document.getElementById('instStartDate');
    const startDateStr = (stDateInput && stDateInput.value) ? stDateInput.value : today;

    const installmentsList = [];
    let currentMonthDate = new Date(startDateStr);

    for (let i = 1; i <= math.months; i++) {
      const dueDateStr = currentMonthDate.toISOString().split('T')[0];
      installmentsList.push({
        number: i,
        dueDate: dueDateStr,
        amount: math.monthlyAmount,
        status: 'قادم',
        paidDate: null,
        paidActual: 0
      });
      currentMonthDate.setMonth(currentMonthDate.getMonth() + 1);
    }

    const newContract = {
      clientCode: clientCodeToUse,
      id: contractId,
      invoiceDate: today,
      customerName,
      customerPhone,
      nationalId,
      guarantorName,
      guarantorPhone,
      guarantorNationalId,
      items: [...currentSaleInvoiceCart],
      deviceName: deviceNamesCombined,
      rawDeviceName: currentSaleInvoiceCart[0].name,
      serialNumber: serialsCombined,
      quantity: totalQty,
      cashPrice: math.cashPrice,
      downPayment: math.downPayment,
      months: math.months,
      interestRate: math.interestRate,
      totalWithInterest: math.grandTotalContract,
      monthlyAmount: math.monthlyAmount,
      paidAmount: math.downPayment,
      remainingAmount: math.totalRemainingWithInterest,
      startDate: startDateStr,
      installments: installmentsList
    };

    contracts.unshift(newContract);
    setStoredContracts(contracts);

    sales.unshift({
      id: newInvoiceId,
      date: today,
      customerName,
      customerPhone,
      nationalId,
      guarantorName,
      guarantorPhone,
      guarantorNationalId,
      deviceName: deviceNamesCombined,
      rawDeviceName: currentSaleInvoiceCart[0].name,
      serialNumber: serialsCombined,
      type: 'تقسيط',
      quantity: totalQty,
      unitPrice: math.cashPrice / totalQty,
      totalPrice: math.grandTotalContract,
      paidImmediately: math.downPayment,
      contractId: contractId,
      items: [...currentSaleInvoiceCart]
    });

    setStoredSales(sales);
    closeModal('newSaleModal');
    currentSaleInvoiceCart = [];
    renderSaleCartTbody();
    populateDeviceSelects();
    renderDashboard();
    renderInventoryTable();
    renderInstallmentsTable();
    renderSalesTable();
    exportCurrentDatabaseToExcel();
    alert(`تم حفظ فاتورة التقسيط للعميل (${customerName}) تحت الكود (#${clientCodeToUse}).`);
  }
}

// ==========================================
// 8. التحصيل المرن وتعديل الفواتير
// ==========================================
function openCollectInstallmentModal(contractId, installmentNumber) {
  currentCollectingContractId = contractId;
  currentCollectingInstallmentNum = installmentNumber;

  const contracts = getStoredContracts();
  const cnt = contracts.find(c => c.id === contractId);
  if (!cnt) return;

  const inst = cnt.installments.find(i => i.number === installmentNumber);
  if (!inst) return;

  currentCollectingFullAmount = inst.amount;
  const alreadyPaid = inst.paidActual || 0;
  currentCollectingRemainingAmount = Math.max(0, inst.amount - alreadyPaid);

  const cNameElem = document.getElementById('colModalCustomerName');
  if (cNameElem) cNameElem.innerText = cnt.customerName;

  const descElem = document.getElementById('colModalInstallmentDesc');
  if (descElem) descElem.innerText = `فاتورة (${cnt.deviceName}) - القسط رقم (#${installmentNumber})`;

  const fullElem = document.getElementById('colModalFullAmount');
  if (fullElem) fullElem.innerText = `${currentCollectingFullAmount.toLocaleString()} ج.م`;

  const reqElem = document.getElementById('colModalRequiredAmount');
  if (reqElem) reqElem.innerText = `${currentCollectingRemainingAmount.toLocaleString()} ج.م`;

  const paidInput = document.getElementById('colModalPaidInput');
  if (paidInput) paidInput.value = currentCollectingRemainingAmount;

  updateCollectModalPreview();
  openModal('collectInstallmentModal');
}

function updateCollectModalPreview() {
  const paidInput = document.getElementById('colModalPaidInput');
  const paidVal = paidInput ? (parseFloat(paidInput.value) || 0) : 0;
  const diff = currentCollectingRemainingAmount - paidVal;
  const choiceBox = document.getElementById('colModalActionChoiceBox');
  const previewText = document.getElementById('colModalPreviewText');

  if (diff > 0) {
    if (choiceBox) choiceBox.classList.remove('hidden');
    const checkedRadio = document.querySelector('input[name="partialActionType"]:checked');
    const actionType = checkedRadio ? checkedRadio.value : 'keep_open';

    if (previewText) {
      if (actionType === 'keep_open') {
        previewText.innerHTML = `سيتم سداد <b>${paidVal.toLocaleString()} ج.م</b> ويبقى هذا القسط مفتوحاً بمتبقي <b>${diff.toLocaleString()} ج.م</b> ليسدده العميل لاحقاً خلال الشهر.`;
      } else {
        previewText.innerHTML = `سيتم إغلاق القسط وترحيل عجز <b>${diff.toLocaleString()} ج.م</b> ليضاف تلقائياً على القسط القادم.`;
      }
    }
  } else if (diff === 0) {
    if (choiceBox) choiceBox.classList.add('hidden');
    if (previewText) previewText.innerHTML = `سيتم سداد كامل المتبقي من هذا القسط <b>(${paidVal.toLocaleString()} ج.م)</b> وإغلاقه كـ مدفوع بالكامل ✔.`;
  } else {
    if (choiceBox) choiceBox.classList.add('hidden');
    if (previewText) previewText.innerHTML = `المبلغ أكبر من المطلوب: سيتم خصم الزيادة <b>${Math.abs(diff).toLocaleString()} ج.م</b> من القسط القادم.`;
  }
}

function confirmCollectInstallment() {
  if (!currentCollectingContractId || !currentCollectingInstallmentNum) return;

  const paidInput = document.getElementById('colModalPaidInput');
  const paidVal = paidInput ? parseFloat(paidInput.value) : 0;
  if (isNaN(paidVal) || paidVal <= 0) {
    alert('يرجى كتابة المبلغ المسدد بصورة صحيحة.');
    return;
  }

  const contracts = getStoredContracts();
  const cnt = contracts.find(c => c.id === currentCollectingContractId);
  if (!cnt) return;

  const instIndex = cnt.installments.findIndex(i => i.number === currentCollectingInstallmentNum);
  if (instIndex === -1) return;

  const inst = cnt.installments[instIndex];
  const today = new Date().toISOString().split('T')[0];
  const diff = currentCollectingRemainingAmount - paidVal;

  inst.paidActual = (inst.paidActual || 0) + paidVal;

  if (diff === 0) {
    inst.status = 'مدفوع بالكامل';
    inst.paidDate = today;
  } else if (diff > 0) {
    const checkedRadio = document.querySelector('input[name="partialActionType"]:checked');
    const actionType = checkedRadio ? checkedRadio.value : 'keep_open';
    if (actionType === 'keep_open') {
      inst.status = 'مدفوع جزئياً';
      inst.paidDate = today;
    } else {
      inst.status = 'مدفوع بالكامل';
      inst.paidDate = today;
      const nextInst = cnt.installments[instIndex + 1];
      if (nextInst) {
        nextInst.amount += diff;
        nextInst.rolloverNote = `(يشمل ${diff.toLocaleString()} ج مرحلة من القسط السابق)`;
      }
    }
  } else {
    inst.status = 'مدفوع بالكامل';
    inst.paidDate = today;
    const nextInst = cnt.installments[instIndex + 1];
    if (nextInst) {
      nextInst.amount = Math.max(0, nextInst.amount - Math.abs(diff));
      nextInst.rolloverNote = `(تم خصم ${Math.abs(diff).toLocaleString()} ج زيادة مسددة مسبقاً)`;
    }
  }

  cnt.paidAmount = (cnt.paidAmount || 0) + paidVal;
  cnt.remainingAmount = Math.max(0, cnt.totalWithInterest - cnt.paidAmount);

  setStoredContracts(contracts);
  closeModal('collectInstallmentModal');

  if (activeCustomerPhoneForProfile) {
    openCustomerProfileModal(activeCustomerPhoneForProfile, cnt.id);
  }

  renderDashboard();
  renderInstallmentsTable();
  exportCurrentDatabaseToExcel();
  alert(`تم بنجاح تسجيل تحصيل مبلغ ${paidVal.toLocaleString()} ج.م للعميل (${cnt.customerName}).`);
}

function openEditInvoiceModal(identifier) {
  const sales = getStoredSales();
  const contracts = getStoredContracts();

  let targetSale = sales.find(s => s.id === identifier || s.contractId === identifier);
  let targetContract = contracts.find(c => c.id === identifier || (targetSale && c.id === targetSale.contractId));

  if (!targetSale && !targetContract) {
    alert('لم يتم العثور على الفاتورة المطلوبة لتعديلها.');
    return;
  }

  currentEditingInvoiceId = targetSale ? targetSale.id : targetContract.id;
  const isInstallment = (targetSale && targetSale.type === 'تقسيط') || !!targetContract;

  const lbl = document.getElementById('editInvoiceIdLabel');
  if (lbl) lbl.innerText = `#${targetSale ? targetSale.id : targetContract.id}`;

  const nameIn = document.getElementById('editCustomerNameInput');
  if (nameIn) nameIn.value = targetSale ? targetSale.customerName : targetContract.customerName;

  const phoneIn = document.getElementById('editCustomerPhoneInput');
  if (phoneIn) phoneIn.value = targetSale ? targetSale.customerPhone : targetContract.customerPhone;

  const serIn = document.getElementById('editSerialInput');
  if (serIn) serIn.value = targetSale ? targetSale.serialNumber : targetContract.serialNumber;

  const rawDevice = targetContract ? targetContract.rawDeviceName : (targetSale.rawDeviceName || (targetSale.deviceName ? targetSale.deviceName.split(' (عدد')[0] : ''));
  const rawDevIn = document.getElementById('editDeviceRawNameInput');
  if (rawDevIn) rawDevIn.value = rawDevice;

  const qty = targetSale ? (targetSale.quantity || 1) : (targetContract.quantity || 1);
  const unitPrice = targetSale && targetSale.unitPrice ? targetSale.unitPrice : ((targetContract ? targetContract.cashPrice : targetSale.totalPrice) / qty);

  const qtyIn = document.getElementById('editQuantityInput');
  if (qtyIn) qtyIn.value = qty;

  const upIn = document.getElementById('editUnitPriceInput');
  if (upIn) upIn.value = unitPrice;

  const instBox = document.getElementById('editInstallmentBox');
  if (instBox) {
    if (isInstallment && targetContract) {
      instBox.classList.remove('hidden');
      const dpIn = document.getElementById('editDownPaymentInput');
      if (dpIn) dpIn.value = targetContract.downPayment || 0;

      const irIn = document.getElementById('editInterestRateInput');
      if (irIn) irIn.value = targetContract.interestRate || 15;

      const mIn = document.getElementById('editMonthsInput');
      if (mIn) mIn.value = targetContract.months || 12;
    } else {
      instBox.classList.add('hidden');
    }
  }

  calculateEditInvoiceMath();
  openModal('editSaleInvoiceModal');
}

function calculateEditInvoiceMath() {
  const qtyIn = document.getElementById('editQuantityInput');
  const qty = qtyIn ? (parseInt(qtyIn.value) || 1) : 1;

  const upIn = document.getElementById('editUnitPriceInput');
  const unitPrice = upIn ? (parseFloat(upIn.value) || 0) : 0;

  const cashTotal = qty * unitPrice;
  const totIn = document.getElementById('editCashTotalInput');
  if (totIn) totIn.value = cashTotal;

  const instBox = document.getElementById('editInstallmentBox');
  if (instBox && !instBox.classList.contains('hidden')) {
    const dpIn = document.getElementById('editDownPaymentInput');
    const downPayment = dpIn ? (parseFloat(dpIn.value) || 0) : 0;

    const irIn = document.getElementById('editInterestRateInput');
    const interestRate = irIn ? (parseFloat(irIn.value) || 0) : 0;

    const mIn = document.getElementById('editMonthsInput');
    const months = mIn ? (parseInt(mIn.value) || 12) : 12;

    const remainingBase = Math.max(0, cashTotal - downPayment);
    const interestAmount = remainingBase * (interestRate / 100) * (months / 12);
    const grandTotalContract = downPayment + remainingBase + interestAmount;
    const monthlyAmount = months > 0 ? Math.round((remainingBase + interestAmount) / months) : 0;

    const cTot = document.getElementById('editCalculatedTotal');
    if (cTot) cTot.innerText = `${Math.round(grandTotalContract).toLocaleString()} ج.م`;

    const cMo = document.getElementById('editCalculatedMonthly');
    if (cMo) cMo.innerText = `${monthlyAmount.toLocaleString()} ج / شهر`;
  }
}

function handleSaveInvoiceEdits() {
  const sales = getStoredSales();
  const contracts = getStoredContracts();

  let targetSale = sales.find(s => s.id === currentEditingInvoiceId || s.contractId === currentEditingInvoiceId);
  let targetContract = contracts.find(c => c.id === currentEditingInvoiceId || (targetSale && c.id === targetSale.contractId));

  const nameIn = document.getElementById('editCustomerNameInput');
  const phoneIn = document.getElementById('editCustomerPhoneInput');
  const serIn = document.getElementById('editSerialInput');
  const qtyIn = document.getElementById('editQuantityInput');
  const upIn = document.getElementById('editUnitPriceInput');
  const devIn = document.getElementById('editDeviceRawNameInput');

  if (!nameIn || !phoneIn || !qtyIn || !upIn) return;

  const newCustName = nameIn.value.trim();
  const newCustPhone = phoneIn.value.trim();
  const newSerial = serIn ? serIn.value.trim() : '';
  const newQty = parseInt(qtyIn.value) || 1;
  const newUnitPrice = parseFloat(upIn.value) || 0;
  const newCashTotal = newQty * newUnitPrice;
  const rawDevice = devIn ? devIn.value : '';
  const newDisplayName = `${rawDevice} (عدد ${newQty})`;

  if (!newCustName || !newCustPhone || newQty < 1 || newUnitPrice <= 0) {
    alert('يرجى التحقق من صحة كافة البيانات المدخلة.');
    return;
  }

  if (targetContract) {
    const dpIn = document.getElementById('editDownPaymentInput');
    const downPayment = dpIn ? (parseFloat(dpIn.value) || 0) : 0;

    const irIn = document.getElementById('editInterestRateInput');
    const interestRate = irIn ? (parseFloat(irIn.value) || 0) : 0;

    const mIn = document.getElementById('editMonthsInput');
    const months = mIn ? (parseInt(mIn.value) || 12) : 12;

    const remainingBase = Math.max(0, newCashTotal - downPayment);
    const interestAmount = remainingBase * (interestRate / 100) * (months / 12);
    const grandTotalContract = Math.round(downPayment + remainingBase + interestAmount);
    const monthlyAmount = months > 0 ? Math.round((remainingBase + interestAmount) / months) : 0;

    targetContract.customerName = newCustName;
    targetContract.customerPhone = newCustPhone;
    targetContract.serialNumber = newSerial;
    targetContract.quantity = newQty;
    targetContract.deviceName = newDisplayName;
    targetContract.rawDeviceName = rawDevice;
    targetContract.cashPrice = newCashTotal;
    targetContract.downPayment = downPayment;
    targetContract.interestRate = interestRate;
    targetContract.months = months;
    targetContract.totalWithInterest = grandTotalContract;
    targetContract.monthlyAmount = monthlyAmount;
    targetContract.remainingAmount = Math.max(0, grandTotalContract - targetContract.paidAmount);

    let currentMonthDate = new Date(targetContract.startDate);
    const newInstallments = [];
    for (let i = 1; i <= months; i++) {
      const dueDateStr = currentMonthDate.toISOString().split('T')[0];
      const oldInst = targetContract.installments ? targetContract.installments.find(x => x.number === i) : null;
      if (oldInst && oldInst.status === 'مدفوع بالكامل') {
        newInstallments.push(oldInst);
      } else {
        newInstallments.push({
          number: i,
          dueDate: dueDateStr,
          amount: monthlyAmount,
          status: (oldInst && oldInst.status === 'مدفوع جزئياً') ? 'مدفوع جزئياً' : 'قادم',
          paidDate: oldInst ? oldInst.paidDate : null,
          paidActual: oldInst ? oldInst.paidActual : 0
        });
      }
      currentMonthDate.setMonth(currentMonthDate.getMonth() + 1);
    }
    targetContract.installments = newInstallments;
  }

  if (targetSale) {
    targetSale.customerName = newCustName;
    targetSale.customerPhone = newCustPhone;
    targetSale.serialNumber = newSerial;
    targetSale.quantity = newQty;
    targetSale.unitPrice = newUnitPrice;
    targetSale.deviceName = newDisplayName;
    targetSale.rawDeviceName = rawDevice;
    if (targetSale.type === 'كاش') {
      targetSale.totalPrice = newCashTotal;
      targetSale.paidImmediately = newCashTotal;
    } else if (targetContract) {
      targetSale.totalPrice = targetContract.totalWithInterest;
      targetSale.paidImmediately = targetContract.downPayment;
    }
  }

  setStoredContracts(contracts);
  setStoredSales(sales);
  closeModal('editSaleInvoiceModal');

  if (activeCustomerPhoneForProfile) {
    openCustomerProfileModal(newCustPhone, targetContract ? targetContract.id : null);
  }

  renderDashboard();
  renderInstallmentsTable();
  renderSalesTable();
  renderInventoryTable();
  exportCurrentDatabaseToExcel();
  alert('تم بنجاح تعديل الفاتورة وحفظ التغييرات.');
}

// ==========================================
// 9. إدارة المصاريف الخارجية
// ==========================================
function renderExpensesTable() {
  const expenses = getStoredExpenses();
  const tbody = document.getElementById('expensesTableBody');
  if (!tbody) return;
  tbody.innerHTML = '';

  if (!expenses || expenses.length === 0) {
    tbody.innerHTML = '<tr><td colspan="6" class="p-6 text-center text-slate-500">لا توجد مصاريف مسجلة حتى الآن.</td></tr>';
    return;
  }

  expenses.forEach(exp => {
    const amt = parseFloat(exp.amount) || 0;
    tbody.innerHTML += `
      <tr class="hover:bg-slate-900/60 transition">
        <td class="p-2.5 text-slate-400 font-mono">${exp.date || '--'}</td>
        <td class="p-2.5 font-bold text-white">${exp.title || '--'}</td>
        <td class="p-2.5"><span class="px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 text-[10px] font-bold border border-rose-500/30">${exp.category || 'عام'}</span></td>
        <td class="p-2.5 text-rose-400 font-black text-sm">${amt.toLocaleString()} ج.م</td>
        <td class="p-2.5 text-slate-400">${exp.notes || '--'}</td>
        <td class="p-2.5 text-center">
          <button onclick="deleteExpense('${exp.id}')" class="text-rose-400 hover:text-rose-300 p-1 text-xs" title="حذف المصروف">
            <i class="fa-solid fa-trash-can"></i>
          </button>
        </td>
      </tr>
    `;
  });
}

function handleSaveExpense() {
  const titleInput = document.getElementById('expenseTitleInput');
  const catInput = document.getElementById('expenseCategorySelect');
  const amtInput = document.getElementById('expenseAmountInput');
  const dateInput = document.getElementById('expenseDateInput');
  const notesInput = document.getElementById('expenseNotesInput');

  if (!titleInput || !amtInput) return;

  const title = titleInput.value.trim();
  const category = catInput ? catInput.value : 'أخرى';
  const amount = parseFloat(amtInput.value);
  const date = (dateInput && dateInput.value) ? dateInput.value : new Date().toISOString().split('T')[0];
  const notes = notesInput ? notesInput.value.trim() : '';

  if (!title) {
    alert('يرجى كتابة بند المصروف (مثل: نقل أجهزة أو نولون).');
    return;
  }

  if (isNaN(amount) || amount <= 0) {
    alert('يرجى إدخال مبلغ صحيح أكبر من الصفر.');
    return;
  }

  const expenses = getStoredExpenses();
  const newExp = {
    id: 'EXP-' + Date.now(),
    date,
    title,
    category,
    amount,
    notes
  };

  expenses.unshift(newExp);
  setStoredExpenses(expenses);

  closeModal('addExpenseModal');

  titleInput.value = '';
  amtInput.value = '';
  if (notesInput) notesInput.value = '';

  renderExpensesTable();
  renderDashboard();
  exportCurrentDatabaseToExcel();
  alert(`تم بنجاح تسجيل مصروف (${title}) بمبلغ ${amount.toLocaleString()} ج.م.`);
}

function deleteExpense(expId) {
  if (confirm('هل أنت متأكد من حذف هذا المصروف؟')) {
    let expenses = getStoredExpenses();
    expenses = expenses.filter(e => e.id !== expId);
    setStoredExpenses(expenses);
    renderExpensesTable();
    renderDashboard();
    exportCurrentDatabaseToExcel();
  }
}

// ==========================================
// 10. رسائل الواتساب
// ==========================================
function openChooseWhatsAppModal(contractId) {
  const contracts = getStoredContracts();
  const c = contracts.find(x => x.id === contractId);
  if (!c) return;

  currentContractForWhatsApp = c;
  const nameElem = document.getElementById('waModalCustomerName');
  if (nameElem) nameElem.innerText = c.customerName;
  openModal('chooseWhatsAppTemplateModal');
}

function buildDetailedInstallmentsBreakdown(contract) {
  const arabicNumbers = ["الأول", "الثاني", "الثالث", "الرابع", "الخامس", "السادس", "السابع", "الثامن", "التاسع", "العاشر", "الحادي عشر", "الثاني عشر", "الثالث عشر", "الرابع عشر", "الخامس عشر"];
  const paidLines = [];
  const remainingLines = [];

  let totalPaidFromInst = 0;
  let totalRemainingFromInst = 0;
  let currentDueAmount = 0;

  (contract.installments || []).forEach((inst, index) => {
    const numLabel = arabicNumbers[index] || `رقم ${inst.number}`;

    if (inst.status === 'مدفوع بالكامل') {
      const actualPaid = inst.paidActual !== undefined ? inst.paidActual : inst.amount;
      totalPaidFromInst += actualPaid;
      paidLines.push(`• القسط ${numLabel}: ${actualPaid.toLocaleString()} ج.م ✅`);
    } else if (inst.status === 'مدفوع جزئياً') {
      const actualPaid = inst.paidActual || 0;
      const remOnInst = inst.amount - actualPaid;
      totalPaidFromInst += actualPaid;
      totalRemainingFromInst += remOnInst;
      if (currentDueAmount === 0) currentDueAmount = remOnInst;
      paidLines.push(`• القسط ${numLabel}: سُدد منه ${actualPaid.toLocaleString()} ج (متبقي منه ${remOnInst.toLocaleString()} ج) ⏳`);
    } else {
      totalRemainingFromInst += inst.amount;
      if (currentDueAmount === 0) currentDueAmount = inst.amount;
      const note = inst.rolloverNote ? ` ${inst.rolloverNote}` : '';
      remainingLines.push(`• القسط ${numLabel}: ${inst.amount.toLocaleString()} ج.م ⏳${note}`);
    }
  });

  return {
    paidText: paidLines.length > 0 ? paidLines.join('\n') : '• لم يتم تسجيل أقساط مسددة بعد.',
    remainingText: remainingLines.length > 0 ? remainingLines.join('\n') : '• تم سداد كامل الأقساط بحمد الله ✔',
    totalPaid: totalPaidFromInst,
    totalRemaining: totalRemainingFromInst,
    currentDueAmount: currentDueAmount || contract.monthlyAmount
  };
}

function executeSendWhatsAppTemplate(templateType) {
  if (!currentContractForWhatsApp) return;
  const c = currentContractForWhatsApp;
  const cleanPhone = (c.customerPhone || '').toString().replace(/[^0-9]/g, '');

  const breakdown = buildDetailedInstallmentsBreakdown(c);
  let message = '';

  if (templateType === 'friendly') {
    message = 
`مرحباً بك أستاذ ${c.customerName} المحترم 🌸
تحية طيبة من إدارة (معرض أولاد العبد للأجهزة الكهربائية والمنزلية) 🏢
كود العميل: #${c.clientCode || 1} | الأجهزة: ${c.deviceName}

نود تذكير سيادتكم ببيان الأقساط وموقف الحساب:
━━━━━━━━━━━━━━━━━━━
🟢 الأقساط المسددة (إجمالي ${breakdown.totalPaid.toLocaleString()} ج.م):
${breakdown.paidText}

🔴 الأقساط المتبقية (إجمالي ${breakdown.totalRemaining.toLocaleString()} ج.م):
${breakdown.remainingText}
━━━━━━━━━━━━━━━━━━━
💰 إجمالي المتبقي لإغلاق الفاتورة: ${breakdown.totalRemaining.toLocaleString()} ج.م
⚠️ القسط المستحق للتحصيل حالياً: ${breakdown.currentDueAmount.toLocaleString()} ج.م

شاكرين لتعاملكم وحرصكم الدائم على الالتزام بمواعيد السداد 🤝`;
  } else if (templateType === 'formal') {
    message = 
`عناية العميل المحترم / ${c.customerName} 
كود العميل: #${c.clientCode || 1} 
إشعار استحقاق قسط - معرض أولاد العبد للأجهزة الكهربائية ⚠️
الأجهزة: ${c.deviceName}

نلفت انتباه سيادتكم إلى ضرورة سداد القسط المستحق طرفكم:
━━━━━━━━━━━━━━━━━━━
🟢 المسدد (${breakdown.totalPaid.toLocaleString()} ج.م):
${breakdown.paidText}

🔴 المتبقي (${breakdown.totalRemaining.toLocaleString()} ج.م):
${breakdown.remainingText}
━━━━━━━━━━━━━━━━━━━
⚠️ المطلوب سداده فوراً: ${breakdown.currentDueAmount.toLocaleString()} ج.م
💰 صافي المديونية: ${breakdown.totalRemaining.toLocaleString()} ج.م

برجاء التكرم بالسداد اليوم بالمعرض لتسوية الدفعة وتجنب تراكم الأقساط.`;
  } else if (templateType === 'urgent') {
    message = 
`🛑 إنذار رسمي بالسداد - إدارة الشؤون والحسابات
معرض أولاد العبد للأجهزة الكهربائية والمنزلية 🏢

إلى السيد / ${c.customerName} (كود: #${c.clientCode || 1})
الضامن: ${c.guarantorName || 'المسجل بالعقد'} (${c.guarantorPhone || ''})
بخصوص عقد الشراء للأجهزة: ${c.deviceName}

نظراً لتأخر سداد القسط، نرفق لسيادتكم سجل السداد:
━━━━━━━━━━━━━━━━━━━
🟢 المسدد: ${breakdown.totalPaid.toLocaleString()} ج.م
🔴 المتبقي المستحق: ${breakdown.totalRemaining.toLocaleString()} ج.م
⚠️ القسط المتأخر المطلوب فوراً: ${breakdown.currentDueAmount.toLocaleString()} ج.م

نرجو التوجه لإدارة المعرض والتسوية خلال 48 ساعة من تاريخ هذه الرسالة، وذلك لتفادي وقف التسهيلات واتخاذ الإجراءات القانونية تجاه العميل والضامن.`;
  }

  closeModal('chooseWhatsAppTemplateModal');
  window.open(`https://wa.me/2${cleanPhone}?text=${encodeURIComponent(message)}`, '_blank');
}

// ==========================================
// 11. ماسح الكاميرا وفحص الباركود
// ==========================================
function openBarcodeScanner(targetMode) {
  currentTargetInputIdForScanner = targetMode;
  openModal('barcodeScannerModal');

  const instruction = document.getElementById('scannerInstructionText');
  if (instruction) {
    if (targetMode === 'home_inquiry') {
      instruction.innerText = "وجّه الكاميرا على باركود الجهاز لعرض كافة بياناته وأسعاره من المخزن فوراً.";
    } else if (targetMode === 'sale_barcode_detect') {
      instruction.innerText = "امسح باركود كرتونة الجهاز لإضافته تلقائياً إلى سلة الفاتورة.";
    } else {
      instruction.innerText = "وجّه كاميرا الهاتف على الباركود أو السيريال الملصق على الكرتونة مباشرة.";
    }
  }

  const config = { fps: 15, qrbox: { width: 250, height: 160 } };
  html5QrCodeScannerInstance = new Html5Qrcode("barcode-scanner-box");

  html5QrCodeScannerInstance.start(
    { facingMode: "environment" },
    config,
    (decodedText) => {
      handleBarcodeScannedSuccessfully(decodedText);
    },
    () => {}
  ).catch(() => {
    alert("تعذر الوصول إلى الكاميرا. يرجى التأكد من إعطاء إذن الكاميرا للمتصفح.");
    closeBarcodeScanner();
  });
}

function handleBarcodeScannedSuccessfully(scannedCode) {
  const codeClean = scannedCode.trim();
  closeBarcodeScanner();

  if (currentTargetInputIdForScanner === 'home_inquiry') {
    executeDeviceInquiryByBarcode(codeClean);
    return;
  }

  if (currentTargetInputIdForScanner === 'sale_barcode_detect') {
    executeAutoSelectDeviceForSaleByBarcode(codeClean);
    return;
  }

  const inputElem = document.getElementById(currentTargetInputIdForScanner);
  if (inputElem) {
    if (inputElem.value && inputElem.value.trim().length > 0) {
      inputElem.value = inputElem.value.trim() + ", " + codeClean;
    } else {
      inputElem.value = codeClean;
    }
  }
}

function closeBarcodeScanner() {
  if (html5QrCodeScannerInstance) {
    html5QrCodeScannerInstance.stop().then(() => {
      html5QrCodeScannerInstance.clear();
      html5QrCodeScannerInstance = null;
    }).catch(() => {
      html5QrCodeScannerInstance = null;
    });
  }
  closeModal('barcodeScannerModal');
}

function executeDeviceInquiryByBarcode(barcode) {
  const inventory = buildDynamicInventory();
  const matchedItem = inventory.find(i => 
    (i.barcode && i.barcode.toLowerCase() === barcode.toLowerCase()) ||
    (i.name && i.name.toLowerCase().includes(barcode.toLowerCase()))
  );

  const content = document.getElementById('deviceInquiryResultContent');
  if (!content) return;

  if (!matchedItem) {
    lastInquiredDeviceObject = null;
    content.innerHTML = `
      <div class="p-4 bg-rose-500/10 border border-rose-500/30 rounded-2xl text-center space-y-1">
        <i class="fa-solid fa-triangle-exclamation text-rose-400 text-xl"></i>
        <h4 class="font-bold text-white text-sm">الجهاز غير موجود بالمخزن!</h4>
        <p class="text-[11px] text-slate-400">الباركود المفحوص: <span class="font-mono text-rose-300">${barcode}</span></p>
      </div>
    `;
  } else {
    lastInquiredDeviceObject = matchedItem;
    const isOutOfStock = matchedItem.currentQty <= 0;

    content.innerHTML = `
      <div class="bg-slate-900 border border-cyan-500/30 rounded-2xl p-4 space-y-3">
        <div>
          <span class="text-[10px] text-cyan-400 font-bold block">باركود: ${matchedItem.barcode}</span>
          <h4 class="text-base font-black text-white mt-0.5">${matchedItem.name}</h4>
          <p class="text-xs text-slate-400 mt-0.5">المورد: <b class="text-purple-300">${matchedItem.supplierName}</b></p>
        </div>
        <div class="grid grid-cols-2 gap-2 text-center">
          <div class="p-2.5 bg-slate-950 rounded-xl border border-slate-800">
            <span class="text-[10px] text-slate-400 block font-semibold">الرصيد بالمخزن</span>
            <b class="text-base font-black ${isOutOfStock ? 'text-rose-400' : 'text-emerald-400'}">
              ${isOutOfStock ? 'نفذت الكمية ❌' : matchedItem.currentQty + ' أجهزة متوفرة'}
            </b>
          </div>
          <div class="p-2.5 bg-slate-950 rounded-xl border border-slate-800">
            <span class="text-[10px] text-emerald-400 block font-semibold">سعر الكاش</span>
            <b class="text-base font-black text-white">${matchedItem.cashPrice.toLocaleString()} ج.م</b>
          </div>
        </div>
      </div>
    `;
  }
  openModal('deviceInquiryModal');
}

function proceedToSellInquiredDevice() {
  if (!lastInquiredDeviceObject) return;
  closeModal('deviceInquiryModal');
  openModal('newSaleModal');
  const select = document.getElementById('saleDeviceSelect');
  if (select) {
    select.value = lastInquiredDeviceObject.itemId;
    autoFillDevicePrice();
  }
}

function executeAutoSelectDeviceForSaleByBarcode(barcode) {
  const inventory = buildDynamicInventory();
  const matched = inventory.find(i => 
    (i.barcode && i.barcode.toLowerCase() === barcode.toLowerCase()) ||
    (i.name && i.name.toLowerCase().includes(barcode.toLowerCase()))
  );

  if (matched) {
    const select = document.getElementById('saleDeviceSelect');
    if (select) {
      select.value = matched.itemId;
      autoFillDevicePrice();
    }
    alert(`تم التعرف على (${matched.name}) وتنزيله بقائمة الفاتورة.`);
  } else {
    alert(`لم يتم العثور على جهاز بهذا الباركود (${barcode}) في المخزن.`);
  }
}

// ==========================================
// إدارة المصاريف الخارجية والنقل والهوالك
// ==========================================
function renderExpensesTable() {
  const expenses = getStoredExpenses();
  const tbody = document.getElementById('expensesTableBody');
  if (!tbody) return;
  tbody.innerHTML = '';

  if (!expenses || expenses.length === 0) {
    tbody.innerHTML = '<tr><td colspan="6" class="p-6 text-center text-slate-500">لا توجد مصاريف مسجلة حتى الآن.</td></tr>';
    return;
  }

  expenses.forEach(exp => {
    const amt = parseFloat(exp.amount) || 0;
    tbody.innerHTML += `
      <tr class="hover:bg-slate-900/60 transition">
        <td class="p-2.5 text-slate-400 font-mono">${exp.date || '--'}</td>
        <td class="p-2.5 font-bold text-white">${exp.title || '--'}</td>
        <td class="p-2.5"><span class="px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 text-[10px] font-bold border border-rose-500/30">${exp.category || 'عام'}</span></td>
        <td class="p-2.5 text-rose-400 font-black text-sm">${amt.toLocaleString()} ج.م</td>
        <td class="p-2.5 text-slate-400">${exp.notes || '--'}</td>
        <td class="p-2.5 text-center">
          <button onclick="deleteExpense('${exp.id}')" class="text-rose-400 hover:text-rose-300 p-1 text-xs" title="حذف المصروف">
            <i class="fa-solid fa-trash-can"></i>
          </button>
        </td>
      </tr>
    `;
  });
}

function handleSaveExpense() {
  const titleInput = document.getElementById('expenseTitleInput');
  const catInput = document.getElementById('expenseCategorySelect');
  const amtInput = document.getElementById('expenseAmountInput');
  const dateInput = document.getElementById('expenseDateInput');
  const notesInput = document.getElementById('expenseNotesInput');

  if (!titleInput || !amtInput) return;

  const title = titleInput.value.trim();
  const category = catInput ? catInput.value : 'أخرى';
  const amount = parseFloat(amtInput.value);
  const date = (dateInput && dateInput.value) ? dateInput.value : new Date().toISOString().split('T')[0];
  const notes = notesInput ? notesInput.value.trim() : '';

  if (!title) {
    alert('يرجى كتابة بند المصروف (مثل: نولون شحن أجهزة).');
    return;
  }

  if (isNaN(amount) || amount <= 0) {
    alert('يرجى إدخال مبلغ صحيح أكبر من الصفر.');
    return;
  }

  const expenses = getStoredExpenses();
  const newExp = {
    id: 'EXP-' + Date.now(),
    date,
    title,
    category,
    amount,
    notes
  };

  expenses.unshift(newExp);
  setStoredExpenses(expenses);

  closeModal('addExpenseModal');

  titleInput.value = '';
  amtInput.value = '';
  if (notesInput) notesInput.value = '';

  renderExpensesTable();
  renderDashboard();
  if (typeof exportCurrentDatabaseToExcel === 'function') {
    exportCurrentDatabaseToExcel();
  }
  alert(`تم بنجاح تسجيل مصروف (${title}) بمبلغ ${amount.toLocaleString()} ج.م.`);
}

function deleteExpense(expId) {
  if (confirm('هل أنت متأكد من حذف هذا المصروف؟')) {
    let expenses = getStoredExpenses();
    expenses = expenses.filter(e => e.id !== expId);
    setStoredExpenses(expenses);
    renderExpensesTable();
    renderDashboard();
    if (typeof exportCurrentDatabaseToExcel === 'function') {
      exportCurrentDatabaseToExcel();
    }
  }
}
