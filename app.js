// ==========================================
// المحرك التشغيلي المتطور (app.js)
// معرض أولاد العبد للأجهزة الكهربائية
// يشمل: الطباعة الحرارية، تقفيل الوردية، تنبيه النواقص، وإيصالات واتساب
// ==========================================

// إدارة وضع الرؤية (Light / Dark)
function initThemeMode() {
  const savedTheme = localStorage.getItem('elabd_theme_mode') || 'dark';
  applyTheme(savedTheme);
}

function toggleThemeMode() {
  const isDark = document.documentElement.classList.contains('dark');
  const targetTheme = isDark ? 'light' : 'dark';
  applyTheme(targetTheme);
  localStorage.setItem('elabd_theme_mode', targetTheme);
}

function applyTheme(theme) {
  const html = document.documentElement;
  const statusText = document.getElementById('themeStatusText');
  const switchIcon = document.getElementById('themeSwitchIcon');
  const mobileBtn = document.getElementById('mobileThemeToggleBtn');

  if (theme === 'dark') {
    html.classList.add('dark');
    html.classList.remove('light');
    if (statusText) statusText.innerHTML = '<i class="fa-solid fa-moon text-indigo-400"></i> الوضع الليلي';
    if (switchIcon) switchIcon.innerText = 'تغيير ☀️';
    if (mobileBtn) mobileBtn.innerText = '🌙';
  } else {
    html.classList.remove('dark');
    html.classList.add('light');
    if (statusText) statusText.innerHTML = '<i class="fa-solid fa-sun text-amber-500"></i> الوضع النهاري';
    if (switchIcon) switchIcon.innerText = 'تغيير 🌙';
    if (mobileBtn) mobileBtn.innerText = '☀️';
  }
}

// نظام التنبيهات العصري
window.alert = function(msg) {
  const isError = msg.includes('يرجى') || msg.includes('عفواً') || msg.includes('أكبر') || msg.includes('تعذر');
  if (window.Swal) {
    Swal.fire({
      title: isError ? 'تنبيه' : 'تمت العملية',
      text: msg,
      icon: isError ? 'warning' : 'success',
      confirmButtonText: 'تمام',
      confirmButtonColor: '#2563eb',
      background: document.documentElement.classList.contains('dark') ? '#111726' : '#ffffff',
      color: document.documentElement.classList.contains('dark') ? '#ffffff' : '#1e293b',
      customClass: { popup: 'rounded-3xl border border-slate-700' }
    });
  } else {
    showToast(msg, isError ? 'error' : 'success');
  }
};

let toastTimeoutInstance = null;
function showToast(message, type = 'success', title = '') {
  const box = document.getElementById('toastNotificationBox');
  const iconBox = document.getElementById('toastIconBox');
  const titleEl = document.getElementById('toastTitle');
  const msgEl = document.getElementById('toastMessage');

  if (!box) return;

  msgEl.innerText = message;
  titleEl.innerText = title || (type === 'success' ? 'عملية ناجحة' : (type === 'error' ? 'تنبيه' : 'إشعار'));

  if (type === 'success') {
    box.className = "fixed top-5 left-1/2 -translate-x-1/2 z-[100] transition-all duration-300 transform translate-y-0 opacity-100 flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-2xl border backdrop-blur-md max-w-sm w-[90%] md:w-auto bg-slate-900/95 border-emerald-500/40 text-emerald-400";
    iconBox.className = "w-8 h-8 rounded-xl flex items-center justify-center shrink-0 bg-emerald-500/20 text-emerald-400 text-sm";
    iconBox.innerHTML = '<i class="fa-solid fa-check"></i>';
  } else {
    box.className = "fixed top-5 left-1/2 -translate-x-1/2 z-[100] transition-all duration-300 transform translate-y-0 opacity-100 flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-2xl border backdrop-blur-md max-w-sm w-[90%] md:w-auto bg-slate-900/95 border-rose-500/40 text-rose-400";
    iconBox.className = "w-8 h-8 rounded-xl flex items-center justify-center shrink-0 bg-rose-500/20 text-rose-400 text-sm";
    iconBox.innerHTML = '<i class="fa-solid fa-triangle-exclamation"></i>';
  }

  if (toastTimeoutInstance) clearTimeout(toastTimeoutInstance);
  toastTimeoutInstance = setTimeout(() => {
    box.classList.remove('translate-y-0', 'opacity-100');
    box.classList.add('-translate-y-24', 'opacity-0');
  }, 2500);
}

const STORAGE_KEY_DETAILED_SUPPLIERS = 'elabd_clean_suppliers_v6';
const STORAGE_KEY_SELLING_PRICES = 'elabd_clean_prices_v6';
const STORAGE_KEY_SALES = 'elabd_clean_sales_v6';
const STORAGE_KEY_CONTRACTS = 'elabd_clean_contracts_v6';
const STORAGE_KEY_EXPENSES = 'elabd_clean_expenses_v6';
const STORAGE_KEY_CURRENT_TAB = 'elabd_clean_tab_v6';

let currentSupplierShipmentCart = [];
let currentSaleInvoiceCart = [];
let selectedSupplierId = null;
let currentCollectingContractId = null;
let currentCollectingInstallmentNum = null;
let currentCollectingFullAmount = 0;
let currentCollectingRemainingAmount = 0;
let currentContractForWhatsApp = null;
let activeCustomerPhoneForProfile = null;
let activeInvoiceIdInProfile = null;
let currentEditingInvoiceId = null;
let currentStrictSelectedDevice = null;
let currentViewedSaleIdForPrint = null;

let html5QrCodeScannerInstance = null;
let currentTargetInputIdForScanner = null;
let lastInquiredDeviceObject = null;

function getDetailedSuppliers() { try { const d = localStorage.getItem(STORAGE_KEY_DETAILED_SUPPLIERS); if (d) return JSON.parse(d); } catch (e) {} return []; }
function setDetailedSuppliers(d) { localStorage.setItem(STORAGE_KEY_DETAILED_SUPPLIERS, JSON.stringify(d)); }

function getSellingPrices() { try { const d = localStorage.getItem(STORAGE_KEY_SELLING_PRICES); if (d) return JSON.parse(d); } catch (e) {} return {}; }
function setSellingPrices(d) { localStorage.setItem(STORAGE_KEY_SELLING_PRICES, JSON.stringify(d)); }

function getStoredContracts() { try { const d = localStorage.getItem(STORAGE_KEY_CONTRACTS); if (d) return JSON.parse(d); } catch (e) {} return []; }
function setStoredContracts(d) { localStorage.setItem(STORAGE_KEY_CONTRACTS, JSON.stringify(d)); }

function getStoredSales() { try { const d = localStorage.getItem(STORAGE_KEY_SALES); if (d) return JSON.parse(d); } catch (e) {} return []; }
function setStoredSales(d) { localStorage.setItem(STORAGE_KEY_SALES, JSON.stringify(d)); }

function getStoredExpenses() { try { const d = localStorage.getItem(STORAGE_KEY_EXPENSES); if (d) return JSON.parse(d); } catch (e) {} return []; }
function setStoredExpenses(d) { localStorage.setItem(STORAGE_KEY_EXPENSES, JSON.stringify(d)); }

function calculateAllSuppliersTotalRemaining() {
  const suppliers = getDetailedSuppliers();
  let totalRemaining = 0;
  suppliers.forEach(sup => { (sup.items || []).forEach(it => { totalRemaining += Math.max(0, (parseFloat(it.total) || 0) - (parseFloat(it.paid) || 0)); }); });
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
    if (sale.items && Array.isArray(sale.items)) {
      sale.items.forEach(soldItm => {
        const itemEntry = Object.values(inventoryMap).find(x => x.itemId === soldItm.itemId || x.name === soldItm.name);
        if (itemEntry) itemEntry.currentQty = Math.max(0, itemEntry.currentQty - (parseInt(soldItm.qty) || 1));
      });
    } else {
      const qtySold = parseInt(sale.quantity) || 1;
      const itemEntry = Object.values(inventoryMap).find(x => sale.deviceName && (sale.deviceName.includes(x.name) || x.name === sale.rawDeviceName));
      if (itemEntry) itemEntry.currentQty = Math.max(0, itemEntry.currentQty - qtySold);
    }
  });

  return Object.values(inventoryMap);
}

function parseItemsFromRecord(record) {
  if (record.items && Array.isArray(record.items) && record.items.length > 0) return record.items;
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
    return { name: name || clean, qty, unitPrice, total: unitPrice * qty, serial: record.serialNumber || 'SN-AUTO' };
  });
}

// التهيئة
window.addEventListener('DOMContentLoaded', () => {
  initThemeMode();
  const today = new Date().toISOString().split('T')[0];
  const startDateInput = document.getElementById('instStartDate');
  if (startDateInput) startDateInput.value = today;

  const expenseDate = document.getElementById('expenseDateInput');
  if (expenseDate) expenseDate.value = today;

  const currentYearMonth = today.substring(0, 7);
  const reportMonthInput = document.getElementById('selectedReportMonthInput');
  if (reportMonthInput && !reportMonthInput.value) reportMonthInput.value = currentYearMonth;

  toggleInstallmentFields();
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
    if (navBtn) navBtn.className = 'w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60 transition';
  });

  const targetSection = document.getElementById(`view-${viewName}`);
  if (targetSection) targetSection.classList.remove('hidden');

  const activeBtn = document.getElementById(`nav-${viewName}`);
  if (activeBtn) activeBtn.className = 'w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl bg-blue-100 text-blue-700 dark:bg-blue-600/20 dark:text-cyan-400 border border-blue-200 dark:border-blue-500/30 font-bold transition';

  if (viewName === 'dashboard') renderDashboard();
  if (viewName === 'reports') renderAnnualReportsView();
  if (viewName === 'suppliers') renderSuppliersTable();
  if (viewName === 'installments') renderInstallmentsTable();
  if (viewName === 'inventory') renderInventoryTable();
  if (viewName === 'sales') renderSalesTable();
  if (viewName === 'expenses') renderExpensesTable();
}

function openModal(id) { const el = document.getElementById(id); if (el) { el.classList.remove('hidden'); if (id === 'newSaleModal') clearSaleModalFields(); } }
function closeModal(id) { const el = document.getElementById(id); if (el) el.classList.add('hidden'); }

// ==========================================
// ميزة 1: تقفيل الوردية اليومية (Z-Report)
// ==========================================
function openDailyShiftModal() {
  const today = new Date().toISOString().split('T')[0];
  const sales = getStoredSales();
  const contracts = getStoredContracts();
  const expenses = getStoredExpenses();

  let todaySalesCash = 0;
  sales.forEach(s => {
    if (s.date === today) todaySalesCash += (parseFloat(s.paidImmediately) || 0);
  });

  let todayInstCash = 0;
  contracts.forEach(cnt => {
    (cnt.installments || []).forEach(inst => {
      if (inst.paidDate === today && inst.paidActual > 0) todayInstCash += parseFloat(inst.paidActual);
    });
  });

  let todayExpenses = 0;
  expenses.forEach(e => {
    if (e.date === today) todayExpenses += (parseFloat(e.amount) || 0);
  });

  const netDrawerCash = (todaySalesCash + todayInstCash) - todayExpenses;

  const sSales = document.getElementById('shiftTodaySalesCash');
  if (sSales) sSales.innerText = `${todaySalesCash.toLocaleString()} ج.م`;

  const sInst = document.getElementById('shiftTodayInstCash');
  if (sInst) sInst.innerText = `${todayInstCash.toLocaleString()} ج.م`;

  const sExp = document.getElementById('shiftTodayExpenses');
  if (sExp) sExp.innerText = `${todayExpenses.toLocaleString()} ج.م`;

  const sNet = document.getElementById('shiftNetDrawerCash');
  if (sNet) sNet.innerText = `${netDrawerCash.toLocaleString()} ج.م`;

  openModal('dailyShiftModal');
}

// ==========================================
// ميزة 2: طباعة الإيصالات الحرارية (80mm)
// ==========================================
function windowPrintReceiptHTML(contentHtml) {
  const printArea = document.getElementById('printableReceiptArea');
  if (!printArea) return;
  printArea.innerHTML = contentHtml;
  printArea.classList.remove('hidden');
  window.print();
  setTimeout(() => {
    printArea.classList.add('hidden');
    printArea.innerHTML = '';
  }, 1000);
}

function printCurrentViewedSaleInvoice() {
  if (!currentViewedSaleIdForPrint) return;
  const sales = getStoredSales();
  const sale = sales.find(s => s.id === currentViewedSaleIdForPrint);
  if (!sale) return;

  const items = parseItemsFromRecord(sale);
  const rows = items.map(it => `
    <tr>
      <td style="border-bottom: 1px dashed #ccc; padding: 4px 0;">${it.name}<br><small>SN: ${it.serial || '--'}</small></td>
      <td style="border-bottom: 1px dashed #ccc; padding: 4px 0; text-align: center;">${it.qty}</td>
      <td style="border-bottom: 1px dashed #ccc; padding: 4px 0; text-align: left;">${it.total.toLocaleString()} ج</td>
    </tr>
  `).join('');

  const html = `
    <div style="text-align: center; font-size: 13px; line-height: 1.5; direction: rtl;">
      <h2 style="margin: 0; font-size: 16px; font-weight: bold;">معرض أولاد العبد</h2>
      <p style="margin: 2px 0; font-size: 11px;">للأجهزة الكهربائية والمنزلية</p>
      <div style="border-bottom: 1px solid #000; margin: 8px 0;"></div>
      <div style="text-align: right; font-size: 11px;">
        <p style="margin: 2px 0;"><b>رقم الفاتورة:</b> #${sale.id}</p>
        <p style="margin: 2px 0;"><b>التاريخ:</b> ${sale.date}</p>
        <p style="margin: 2px 0;"><b>العميل:</b> ${sale.customerName}</p>
        <p style="margin: 2px 0;"><b>الهاتف:</b> ${sale.customerPhone}</p>
        <p style="margin: 2px 0;"><b>نظام البيع:</b> ${sale.type}</p>
      </div>
      <div style="border-bottom: 1px solid #000; margin: 8px 0;"></div>
      <table style="width: 100%; font-size: 11px; text-align: right; border-collapse: collapse;">
        <thead>
          <tr style="border-bottom: 1px solid #000;">
            <th>الصنف</th>
            <th style="text-align: center;">العدد</th>
            <th style="text-align: left;">الإجمالي</th>
          </tr>
        </thead>
        <tbody>
          ${rows}
        </tbody>
      </table>
      <div style="border-bottom: 1px solid #000; margin: 8px 0;"></div>
      <div style="text-align: left; font-size: 13px; font-weight: bold;">
        <p style="margin: 3px 0;">الإجمالي: ${sale.totalPrice.toLocaleString()} ج.م</p>
        <p style="margin: 3px 0; color: #16a34a;">المدفوع: ${sale.paidImmediately.toLocaleString()} ج.م</p>
      </div>
      <div style="border-bottom: 1px dashed #666; margin: 10px 0;"></div>
      <p style="font-size: 10px; margin: 4px 0;">شكراً لتعاملكم مع معرض أولاد العبد 🌸</p>
      <p style="font-size: 9px; color: #666;">خدمة العملاء: ${sale.customerPhone}</p>
    </div>
  `;

  windowPrintReceiptHTML(html);
}

function printInstallmentReceipt(contract, instNum, paidAmount, remainingOnContract) {
  const html = `
    <div style="text-align: center; font-size: 13px; line-height: 1.5; direction: rtl;">
      <h2 style="margin: 0; font-size: 16px; font-weight: bold;">معرض أولاد العبد</h2>
      <p style="margin: 2px 0; font-size: 11px;">إيصال استلام وسداد قسط رسمي 🧾</p>
      <div style="border-bottom: 1px solid #000; margin: 8px 0;"></div>
      <div style="text-align: right; font-size: 11px;">
        <p style="margin: 2px 0;"><b>كود العميل:</b> #${contract.clientCode || 1}</p>
        <p style="margin: 2px 0;"><b>اسم العميل:</b> ${contract.customerName}</p>
        <p style="margin: 2px 0;"><b>التاريخ:</b> ${new Date().toISOString().split('T')[0]}</p>
        <p style="margin: 2px 0;"><b>الأجهزة:</b> ${contract.deviceName}</p>
      </div>
      <div style="border-bottom: 1px solid #000; margin: 8px 0;"></div>
      <div style="padding: 6px 0; font-size: 14px; font-weight: bold;">
        <p style="margin: 3px 0;">المبلغ المستلم: <span style="font-size: 16px;">${paidAmount.toLocaleString()} ج.م</span></p>
        <p style="margin: 3px 0; font-size: 11px; font-weight: normal;">(سداد القسط رقم #${instNum})</p>
      </div>
      <div style="border-bottom: 1px solid #000; margin: 8px 0;"></div>
      <div style="text-align: right; font-size: 11px;">
        <p style="margin: 2px 0;"><b>إجمالي المتبقي بالكامل طرفكم:</b> <span style="color: #dc2626; font-weight: bold;">${remainingOnContract.toLocaleString()} ج.م</span></p>
      </div>
      <div style="border-bottom: 1px dashed #666; margin: 10px 0;"></div>
      <p style="font-size: 10px; margin: 4px 0;">توقيع المستلم (الخزينة): ....................</p>
      <p style="font-size: 9px; color: #666;">معرض أولاد العبد يرحب بكم دائماً</p>
    </div>
  `;
  windowPrintReceiptHTML(html);
}

// ==========================================
// الريندر والوظائف الأساسية
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
  let grossProfitVal = 0;
  const salesCountMap = {};
  let filteredMonthPiecesCount = 0;

  sales.forEach(s => {
    totalSalesVal += (parseFloat(s.totalPrice) || 0);
    cashCollectedVal += (parseFloat(s.paidImmediately) || 0);
    const qtySold = parseInt(s.quantity) || 1;
    const invItem = inventory.find(d => s.deviceName && (s.deviceName.includes(d.name) || d.name === s.rawDeviceName));
    if (invItem) grossProfitVal += Math.max(0, (parseFloat(s.totalPrice) || 0) - (invItem.buyPrice * qtySold));

    if (s.date && s.date.startsWith(selectedMonthVal)) {
      const cleanName = invItem ? invItem.name : (s.deviceName ? s.deviceName.split(' (عدد')[0] : 'صنف');
      filteredMonthPiecesCount += qtySold;
      salesCountMap[cleanName] = (salesCountMap[cleanName] || 0) + qtySold;
    }
  });

  contracts.forEach(cnt => {
    installmentsRemainingVal += (parseFloat(cnt.remainingAmount) || 0);
    (cnt.installments || []).forEach(inst => {
      if (inst.paidActual && inst.paidActual > 0) cashCollectedVal += parseFloat(inst.paidActual);
    });
  });

  const suppliers = getDetailedSuppliers();
  let totalPaidToSuppliers = 0;
  suppliers.forEach(sup => { (sup.items || []).forEach(it => { totalPaidToSuppliers += (parseFloat(it.paid) || 0); }); });

  const totalExpensesVal = calculateTotalExpenses();
  const netProfitVal = Math.max(0, grossProfitVal - totalExpensesVal);
  const suppliersDebtTotal = calculateAllSuppliersTotalRemaining();
  const netCashFlowVal = cashCollectedVal - (totalPaidToSuppliers + totalExpensesVal);

  const elTotalSales = document.getElementById('dashTotalSalesVal');
  if (elTotalSales) {
    elTotalSales.innerText = `${netCashFlowVal.toLocaleString()} ج.م`;
    elTotalSales.className = netCashFlowVal >= 0 ? "text-3xl md:text-4xl font-black text-emerald-600 dark:text-emerald-400 tracking-tight" : "text-3xl md:text-4xl font-black text-rose-600 dark:text-rose-400 tracking-tight";
  }

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

  renderTopSellingProductsReport(salesCountMap, filteredMonthPiecesCount);

  const dueTableBody = document.getElementById('dueInstallmentsTableBody');
  if (!dueTableBody) return;
  dueTableBody.innerHTML = '';
  let dueCount = 0;

  contracts.forEach(cnt => {
    (cnt.installments || []).forEach(inst => {
      if (inst.status !== 'مدفوع بالكامل') {
        if (inst.dueDate && inst.dueDate.startsWith(selectedMonthVal)) {
          dueCount++;
          const remainingOnInst = inst.amount - (inst.paidActual || 0);
          dueTableBody.innerHTML += `
            <tr>
              <td class="p-2.5 font-bold text-slate-900 dark:text-white">${cnt.customerName}<br><span class="text-[10px] text-slate-500 dark:text-slate-400">${cnt.customerPhone}</span></td>
              <td class="p-2.5">${cnt.deviceName}</td>
              <td class="p-2.5 font-bold text-rose-600 dark:text-rose-400">${inst.dueDate}</td>
              <td class="p-2.5 font-black text-amber-600 dark:text-amber-300">
                ${remainingOnInst.toLocaleString()} ج.م
                ${inst.paidActual > 0 ? `<span class="block text-[9px] text-emerald-600 dark:text-emerald-400 font-normal">(سدد منها ${inst.paidActual.toLocaleString()} ج)</span>` : ''}
              </td>
              <td class="p-2.5 text-center space-x-1 space-x-reverse">
                <button onclick="openCollectInstallmentModal('${cnt.id}', ${inst.number})" class="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-[10px] font-bold shadow">
                  تحصيل 💰
                </button>
                <button onclick="openChooseWhatsAppModal('${cnt.id}')" class="px-2 py-1 bg-emerald-600/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30 rounded-lg text-[10px] font-bold">
                  <i class="fa-brands fa-whatsapp"></i>
                </button>
              </td>
            </tr>
          `;
        }
      }
    });
  });

  if (dueCount === 0) dueTableBody.innerHTML = `<tr><td colspan="5" class="p-4 text-center text-slate-500">لا توجد أقساط مستحقة للتحصيل 👏</td></tr>`;
  const badgeElem = document.getElementById('dueCountBadge');
  if (badgeElem) badgeElem.innerText = `${dueCount} عميل مستحق`;
}

function renderTopSellingProductsReport(salesCountMap, totalPiecesCount) {
  const container = document.getElementById('topSellingReportContainer');
  if (!container) return;
  container.innerHTML = '';
  const sorted = Object.keys(salesCountMap).map(n => ({ name: n, count: salesCountMap[n] })).sort((a, b) => b.count - a.count);

  if (sorted.length === 0) {
    container.innerHTML = `<p class="text-xs text-slate-500 text-center py-4">لم يتم تسجيل أي عمليات بيع هذا الشهر بعد.</p>`;
    return;
  }

  sorted.forEach((prod, idx) => {
    const percentage = totalPiecesCount > 0 ? Math.round((prod.count / totalPiecesCount) * 100) : 0;
    const isTop = idx === 0;
    container.innerHTML += `
      <div class="bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 p-3 rounded-2xl">
        <div class="flex justify-between items-center mb-1.5">
          <div class="flex items-center gap-2">
            <span class="w-5 h-5 rounded-lg flex items-center justify-center text-[10px] font-black ${isTop ? 'bg-amber-500/20 text-amber-500' : 'bg-slate-200 dark:bg-slate-800 text-slate-500'}">${idx + 1}</span>
            <span class="text-xs font-bold text-slate-900 dark:text-white">${prod.name}</span>
          </div>
          <div class="text-left">
            <b class="text-xs text-blue-600 dark:text-cyan-400 font-bold">${prod.count} قطع</b>
            <span class="text-[10px] text-slate-400 mr-1">(${percentage}%)</span>
          </div>
        </div>
        <div class="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
          <div class="h-full rounded-full ${isTop ? 'bg-amber-500' : 'bg-blue-600'}" style="width: ${percentage}%"></div>
        </div>
      </div>
    `;
  });
}

// المخزن وتنبيه النواقص
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
    const isOutOfStock = item.currentQty <= 0;
    const isLow = item.currentQty > 0 && item.currentQty <= 2;

    let qtyBadge = `<span class="font-black text-emerald-600 dark:text-emerald-400 text-base">${item.currentQty}</span>`;
    if (isOutOfStock) qtyBadge = `<span class="px-2 py-0.5 rounded-full bg-rose-100 dark:bg-rose-500/20 text-rose-600 dark:text-rose-400 font-bold text-[10px]">نفذ (0) ❌</span>`;
    else if (isLow) qtyBadge = `<span class="px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400 font-bold text-[10px]">نواقص (${item.currentQty}) ⚠️</span>`;

    tbody.innerHTML += `
      <tr>
        <td class="p-2.5 font-bold text-slate-900 dark:text-white">${item.name}</td>
        <td class="p-2.5 font-mono text-blue-600 dark:text-cyan-300 text-xs">${item.barcode || '--'}</td>
        <td class="p-2.5 text-purple-600 dark:text-purple-300 font-semibold">${item.supplierName}</td>
        <td class="p-2.5 text-center">${qtyBadge}</td>
        <td class="p-2.5 text-slate-600 dark:text-slate-300">${item.buyPrice.toLocaleString()} ج</td>
        <td class="p-2.5 font-bold text-emerald-600 dark:text-emerald-400">
          <input type="number" id="cash_price_input_${item.itemId}" value="${item.cashPrice}" class="w-24 bg-slate-50 dark:bg-[#090d16] border border-slate-300 dark:border-slate-700 rounded-lg p-1 text-slate-900 dark:text-white text-xs font-bold text-center">
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
  if (isNaN(newPrice) || newPrice <= 0) { alert('يرجى إدخال سعر بيع كاش صحيح.'); return; }
  const sellingPrices = getSellingPrices();
  sellingPrices[itemName] = newPrice;
  setSellingPrices(sellingPrices);
  renderInventoryTable();
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

// المبيعات والفواتير
function viewSingleInvoiceDetails(saleId) {
  currentViewedSaleIdForPrint = saleId;
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
        <td class="p-2 text-center font-bold text-blue-600 dark:text-cyan-400">${it.qty}</td>
        <td class="p-2 font-bold text-slate-900 dark:text-white">${it.name}</td>
        <td class="p-2 font-mono text-[11px] text-blue-500">${it.serial || sale.serialNumber || '--'}</td>
        <td class="p-2 text-slate-600 dark:text-slate-300">${(it.unitPrice || 0).toLocaleString()} ج.م</td>
        <td class="p-2 font-bold text-emerald-600 dark:text-emerald-400">${(it.total || (it.qty * it.unitPrice) || 0).toLocaleString()} ج.م</td>
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
  if (sales.length === 0) { tbody.innerHTML = '<tr><td colspan="8" class="p-6 text-center text-slate-500">لا توجد فواتير مبيعات مسجلة بعد.</td></tr>'; return; }

  sales.forEach(s => {
    tbody.innerHTML += `
      <tr>
        <td class="p-2.5 font-bold text-slate-900 dark:text-white cursor-pointer hover:text-blue-500" onclick="viewSingleInvoiceDetails('${s.id}')">#${s.id}</td>
        <td class="p-2.5 text-slate-500 dark:text-slate-400">${s.date}</td>
        <td class="p-2.5 font-bold">${s.customerName}<br><span class="text-[10px] text-slate-400 font-normal">${s.customerPhone}</span></td>
        <td class="p-2.5 cursor-pointer hover:underline" onclick="viewSingleInvoiceDetails('${s.id}')">${s.deviceName}</td>
        <td class="p-2.5"><span class="px-2 py-0.5 rounded text-[10px] font-bold ${s.type === 'كاش' ? 'bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400' : 'bg-blue-100 dark:bg-blue-500/20 text-blue-700 dark:text-blue-400'}">${s.type}</span></td>
        <td class="p-2.5 font-bold text-slate-900 dark:text-white">${(parseFloat(s.totalPrice) || 0).toLocaleString()} ج.م</td>
        <td class="p-2.5 font-bold text-emerald-600 dark:text-emerald-400">${(parseFloat(s.paidImmediately) || 0).toLocaleString()} ج.م</td>
        <td class="p-2.5 text-center space-x-1 space-x-reverse">
          <button onclick="viewSingleInvoiceDetails('${s.id}')" class="px-2 py-1 bg-blue-100 dark:bg-blue-600/20 text-blue-700 dark:text-cyan-400 rounded-lg text-xs font-bold">
            عرض 📄
          </button>
          <button onclick="openEditInvoiceModal('${s.id}')" class="px-2 py-1 bg-amber-100 dark:bg-amber-600/20 text-amber-700 dark:text-amber-400 rounded-lg text-xs font-bold">
            تعديل ✏️
          </button>
        </td>
      </tr>
    `;
  });
}

// السداد والتحصيل + الإيصالات وواتساب السداد
function confirmCollectInstallment() {
  if (!currentCollectingContractId || !currentCollectingInstallmentNum) return;
  const paidInput = document.getElementById('colModalPaidInput');
  const paidVal = paidInput ? parseFloat(paidInput.value) : 0;
  if (isNaN(paidVal) || paidVal <= 0) { alert('يرجى كتابة المبلغ المسدد بصورة صحيحة.'); return; }

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
      if (nextInst) nextInst.amount += diff;
    }
  } else {
    inst.status = 'مدفوع بالكامل';
    inst.paidDate = today;
    const nextInst = cnt.installments[instIndex + 1];
    if (nextInst) nextInst.amount = Math.max(0, nextInst.amount - Math.abs(diff));
  }

  cnt.paidAmount = (cnt.paidAmount || 0) + paidVal;
  cnt.remainingAmount = Math.max(0, cnt.totalWithInterest - cnt.paidAmount);

  setStoredContracts(contracts);
  closeModal('collectInstallmentModal');

  renderDashboard();
  renderInstallmentsTable();

  // تنبيه بعد السداد مع خيار طباعة أو إرسال الإيصال
  if (window.Swal) {
    Swal.fire({
      title: 'تم تحصيل القسط بنجاح! 💰',
      html: `تم استلام مبلغ <b>${paidVal.toLocaleString()} ج.م</b> من العميل (${cnt.customerName}).<br>المتبقي عليه: <b>${cnt.remainingAmount.toLocaleString()} ج.م</b>`,
      icon: 'success',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'إرسال إيصال واتساب 📱',
      denyButtonText: 'طباعة إيصال حراري 🖨️',
      cancelButtonText: 'تم',
      confirmButtonColor: '#16a34a',
      denyButtonColor: '#2563eb'
    }).then((result) => {
      if (result.isConfirmed) {
        sendInstantPaymentWhatsAppReceipt(cnt, currentCollectingInstallmentNum, paidVal);
      } else if (result.isDenied) {
        printInstallmentReceipt(cnt, currentCollectingInstallmentNum, paidVal, cnt.remainingAmount);
      }
    });
  } else {
    showToast(`تم تحصيل ${paidVal.toLocaleString()} ج.م بنجاح`, 'success');
  }
}

function sendInstantPaymentWhatsAppReceipt(contract, instNum, paidVal) {
  const cleanPhone = (contract.customerPhone || '').toString().replace(/[^0-9]/g, '');
  const msg = 
`إيصال استلام نقدية وسداد قسط 🧾
معرض أولاد العبد للأجهزة الكهربائية والمنزلية 🏢

عناية السيد / ${contract.customerName} المحترم (كود: #${contract.clientCode || 1})
تم بحمد الله استلام وتسوية دفعة:
━━━━━━━━━━━━━━━━━━━
💵 المبلغ المسدد: ${paidVal.toLocaleString()} ج.م
📌 بيان السداد: القسط رقم (#${instNum})
📦 الأجهزة المشتراة: ${contract.deviceName}
📅 تاريخ السداد: ${new Date().toISOString().split('T')[0]}
━━━━━━━━━━━━━━━━━━━
💰 إجمالي المتبقي لإغلاق حسابك: ${contract.remainingAmount.toLocaleString()} ج.م

شاكرين لحسن تعاونكم والتزامكم بمواعيد السداد 🌸`;

  window.open(`https://wa.me/2${cleanPhone}?text=${encodeURIComponent(msg)}`, '_blank');
}

// البحث التوقعي المباشر من المخزن
function handleDeviceSearchInput(term) {
  const dropdown = document.getElementById('deviceSearchResultsList');
  if (!dropdown) return;
  const query = (term || '').trim().toLowerCase();
  const inventory = buildDynamicInventory();

  const matches = inventory.filter(dev => !query || dev.name.toLowerCase().includes(query) || (dev.barcode && dev.barcode.toLowerCase().includes(query)));

  if (matches.length === 0) {
    dropdown.innerHTML = `<div class="p-3 text-center text-slate-500 text-xs">لا يوجد صنف مطابق في المخزن.</div>`;
    dropdown.classList.remove('hidden');
    return;
  }

  let html = '';
  matches.forEach(item => {
    const isOut = item.currentQty <= 0;
    html += `
      <div onclick="applyDeviceFromStock('${item.itemId}')" class="p-2.5 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer border-b border-slate-200 dark:border-slate-800 last:border-0 flex justify-between items-center transition">
        <div>
          <b class="text-xs text-slate-900 dark:text-white block">${item.name}</b>
          <span class="text-[10px] text-slate-500 dark:text-slate-400">المورد: ${item.supplierName}</span>
        </div>
        <div class="text-left">
          <span class="text-xs font-bold text-emerald-600 dark:text-emerald-400 block">${item.cashPrice.toLocaleString()} ج</span>
          <span class="text-[10px] font-bold ${isOut ? 'text-rose-500' : 'text-blue-600 dark:text-cyan-400'}">${isOut ? 'نفذت الكمية' : 'المتاح: ' + item.currentQty}</span>
        </div>
      </div>
    `;
  });
  dropdown.innerHTML = html;
  dropdown.classList.remove('hidden');
}

function applyDeviceFromStock(itemId) {
  const inventory = buildDynamicInventory();
  const item = inventory.find(i => i.itemId === itemId);
  if (!item) return;
  currentStrictSelectedDevice = item;

  const input = document.getElementById('saleDeviceInput');
  const dropdown = document.getElementById('deviceSearchResultsList');
  const priceInput = document.getElementById('saleItemPriceInput');
  const qtyInput = document.getElementById('saleItemQtyInput');
  const badge = document.getElementById('selectedDeviceBadge');

  if (input) input.value = item.name;
  if (dropdown) dropdown.classList.add('hidden');
  if (priceInput) priceInput.value = item.cashPrice;
  if (qtyInput) { qtyInput.max = item.currentQty; qtyInput.value = 1; }
  if (badge) badge.innerHTML = `<span class="text-emerald-600 dark:text-emerald-400 font-bold">✔ تم اختيار: (${item.name})</span> - الرصيد: <b>${item.currentQty}</b> قطع.`;
}

document.addEventListener('click', function(e) {
  const dropdown = document.getElementById('deviceSearchResultsList');
  const input = document.getElementById('saleDeviceInput');
  if (dropdown && !dropdown.contains(e.target) && e.target !== input) dropdown.classList.add('hidden');
});

function addItemToSaleCart() {
  const input = document.getElementById('saleDeviceInput');
  const devName = input ? input.value.trim() : '';
  const inventory = buildDynamicInventory();
  const matched = inventory.find(i => i.name.toLowerCase() === devName.toLowerCase()) || currentStrictSelectedDevice;

  if (!matched || matched.name !== devName) {
    alert('عفواً! يرجى اختيار الصنف من قائمة المخزن لضمان خصم الرصيد.');
    return;
  }

  const priceInput = document.getElementById('saleItemPriceInput');
  const unitPrice = priceInput ? (parseFloat(priceInput.value) || 0) : matched.cashPrice;
  const qtyInput = document.getElementById('saleItemQtyInput');
  const qty = qtyInput ? (parseInt(qtyInput.value) || 1) : 1;

  if (qty > matched.currentQty) {
    alert(`الكمية المطلوبة (${qty}) أكبر من رصيد المخزن المتوفر (${matched.currentQty}).`);
    return;
  }

  const serialInput = document.getElementById('saleItemSerialInput');
  const serial = (serialInput && serialInput.value.trim()) ? serialInput.value.trim() : 'SN-AUTO';

  currentSaleInvoiceCart.push({
    itemId: matched.itemId,
    name: matched.name,
    rawName: matched.name,
    qty,
    unitPrice,
    total: qty * unitPrice,
    serial
  });

  input.value = '';
  currentStrictSelectedDevice = null;
  if (priceInput) priceInput.value = '';
  if (serialInput) serialInput.value = '';
  const badge = document.getElementById('selectedDeviceBadge');
  if (badge) badge.innerHTML = '';
  renderSaleCartTbody();
}

function clearSaleModalFields() {
  currentSaleInvoiceCart = [];
  currentStrictSelectedDevice = null;
  ['saleCustomerName', 'saleCustomerPhone', 'saleCustomerNationalId', 'saleGuarantorName', 'saleGuarantorPhone', 'saleGuarantorNationalId', 'saleDeviceInput', 'saleItemPriceInput', 'saleItemSerialInput'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.value = '';
  });
  const badge = document.getElementById('selectedDeviceBadge');
  if (badge) badge.innerHTML = '';
  const typeSelect = document.getElementById('saleTypeSelect');
  if (typeSelect) typeSelect.value = 'cash';
  toggleInstallmentFields();
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
        <td class="p-2 font-bold text-slate-900 dark:text-white">${item.name}</td>
        <td class="p-2 font-mono text-blue-600 dark:text-cyan-300 text-xs">${item.serial}</td>
        <td class="p-2 text-center font-bold text-blue-600 dark:text-cyan-400">${item.qty}</td>
        <td class="p-2 text-slate-600 dark:text-slate-300">${item.unitPrice.toLocaleString()} ج</td>
        <td class="p-2 font-bold text-slate-900 dark:text-white">${item.total.toLocaleString()} ج</td>
        <td class="p-2 text-center">
          <button onclick="removeSaleCartItem(${idx})" class="text-rose-500 hover:text-rose-400"><i class="fa-solid fa-xmark"></i></button>
        </td>
      </tr>
    `;
  });

  if (currentSaleInvoiceCart.length === 0) tbody.innerHTML = '<tr><td colspan="6" class="p-4 text-center text-slate-400">السلة فارغة.</td></tr>';
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
  const isInstallment = typeSelect.value === 'installment';
  const installmentBox = document.getElementById('installmentFieldsBox');
  if (installmentBox) installmentBox.classList.toggle('hidden', !isInstallment);
  const guarantorBox = document.getElementById('guarantorAndNationalIdBox');
  if (guarantorBox) guarantorBox.classList.toggle('hidden', !isInstallment);
  if (isInstallment) calculateInstallmentMath();
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
  const grandTotalContract = downPayment + remainingBase + interestAmount;
  const monthlyAmount = months > 0 ? Math.round((remainingBase + interestAmount) / months) : 0;

  const totElem = document.getElementById('instCalculatedTotal');
  if (totElem) totElem.innerText = `${Math.round(grandTotalContract).toLocaleString()} ج.م`;
  const moElem = document.getElementById('instCalculatedMonthly');
  if (moElem) moElem.innerText = `${monthlyAmount.toLocaleString()} ج / شهر`;

  return { cashPrice: cashTotal, downPayment, months, interestRate, grandTotalContract: Math.round(grandTotalContract), monthlyAmount, totalRemainingWithInterest: Math.round(remainingBase + interestAmount) };
}

function handleSaveSaleInvoice() {
  if (currentSaleInvoiceCart.length === 0) { alert('يرجى إضافة جهاز واحد على الأقل للسلة.'); return; }
  const nameInput = document.getElementById('saleCustomerName');
  const phoneInput = document.getElementById('saleCustomerPhone');
  if (!nameInput || !phoneInput) return;
  const customerName = nameInput.value.trim();
  const customerPhone = phoneInput.value.trim();
  if (!customerName || !customerPhone) { alert('يرجى كتابة اسم العميل ورقم الهاتف.'); return; }

  const natIdInput = document.getElementById('saleCustomerNationalId');
  const nationalId = (natIdInput && natIdInput.value.trim()) ? natIdInput.value.trim() : '--';
  const gNameInput = document.getElementById('saleGuarantorName');
  const guarantorName = (gNameInput && gNameInput.value.trim()) ? gNameInput.value.trim() : '--';
  const gPhoneInput = document.getElementById('saleGuarantorPhone');
  const guarantorPhone = (gPhoneInput && gPhoneInput.value.trim()) ? gPhoneInput.value.trim() : '--';
  const gNatIdInput = document.getElementById('saleGuarantorNationalId');
  const guarantorNationalId = (gNatIdInput && gNatIdInput.value.trim()) ? gNatIdInput.value.trim() : '--';

  const typeSelect = document.getElementById('saleTypeSelect');
  const saleType = typeSelect ? typeSelect.value : 'cash';
  const today = new Date().toISOString().split('T')[0];
  const sales = getStoredSales();
  const newInvoiceId = 'INV-' + (sales.length + 1);

  const deviceNamesCombined = currentSaleInvoiceCart.map(i => `${i.name} (عدد ${i.qty})`).join(' + ');
  const serialsCombined = currentSaleInvoiceCart.map(i => i.serial).join(', ');
  let totalQty = 0;
  let totalCashPrice = 0;
  currentSaleInvoiceCart.forEach(i => { totalQty += i.qty; totalCashPrice += i.total; });

  if (saleType === 'cash') {
    const newSale = {
      id: newInvoiceId,
      date: today,
      customerName,
      customerPhone,
      nationalId: '--',
      guarantorName: '--',
      guarantorPhone: '--',
      guarantorNationalId: '--',
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
    };
    sales.unshift(newSale);
    setStoredSales(sales);
    closeModal('newSaleModal');
    clearSaleModalFields();
    renderDashboard();
    renderInventoryTable();
    renderSalesTable();
    showToast(`تم حفظ الفاتورة الكاش (${newInvoiceId}) بنجاح`, 'success');
  } else {
    const math = calculateInstallmentMath();
    const contracts = getStoredContracts();
    const existingClient = contracts.find(c => (c.customerPhone || '').toString().trim() === customerPhone.trim());
    const clientCodeToUse = existingClient && existingClient.clientCode ? existingClient.clientCode : (contracts.length > 0 ? (Math.max(...contracts.map(c => c.clientCode || 0)) + 1) : 1);

    const contractId = 'CNT-' + (contracts.length + 1);
    const stDateInput = document.getElementById('instStartDate');
    const startDateStr = (stDateInput && stDateInput.value) ? stDateInput.value : today;

    const installmentsList = [];
    let currentMonthDate = new Date(startDateStr);
    for (let i = 1; i <= math.months; i++) {
      installmentsList.push({ number: i, dueDate: currentMonthDate.toISOString().split('T')[0], amount: math.monthlyAmount, status: 'قادم', paidDate: null, paidActual: 0 });
      currentMonthDate.setMonth(currentMonthDate.getMonth() + 1);
    }

    contracts.unshift({
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
    });
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
    clearSaleModalFields();
    renderDashboard();
    renderInventoryTable();
    renderInstallmentsTable();
    renderSalesTable();
    showToast(`تم حفظ عقد التقسيط للعميل (${customerName}) كود (#${clientCodeToUse}) بنجاح`, 'success');
  }
}

// الأقساط وملفات العملاء
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
    return (cl.clientCode || '').toString().toLowerCase().includes(search) ||
           (cl.customerName || '').toLowerCase().includes(search) ||
           (cl.customerPhone || '').includes(search) ||
           (cl.nationalId || '').toString().includes(search) ||
           (cl.guarantorName || '').toLowerCase().includes(search);
  });

  if (clientsList.length === 0) { tbody.innerHTML = '<tr><td colspan="9" class="p-6 text-center text-slate-500">لا يوجد عملاء أو أقساط مسجلة بعد.</td></tr>'; return; }

  clientsList.forEach(cl => {
    tbody.innerHTML += `
      <tr class="hover:bg-slate-50 dark:hover:bg-slate-900/50 transition">
        <td class="p-2.5 text-center font-black text-blue-600 dark:text-cyan-400 font-mono text-sm">#${cl.clientCode}</td>
        <td class="p-2.5 font-bold text-slate-900 dark:text-white cursor-pointer hover:text-blue-500 transition" onclick="openCustomerProfileModal('${cl.customerPhone}')">
          <span class="flex items-center gap-2">
            <i class="fa-solid fa-folder-open text-amber-500 text-xs"></i>
            <span class="underline decoration-slate-400 dark:decoration-slate-700 underline-offset-4">${cl.customerName}</span>
          </span>
          <span class="text-[10px] text-slate-400 font-normal block mt-0.5">بطاقة: ${cl.nationalId}</span>
        </td>
        <td class="p-2.5">
          <b class="text-slate-700 dark:text-slate-200 text-xs">${cl.guarantorName}</b>
          <span class="text-[10px] text-slate-400 block">${cl.guarantorPhone}</span>
        </td>
        <td class="p-2.5 text-center font-bold text-blue-600 dark:text-cyan-300">
          <span class="px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-500/20 text-blue-700 dark:text-blue-300">${cl.invoices.length} فواتير</span>
        </td>
        <td class="p-2.5 font-bold text-slate-900 dark:text-white">${cl.totalGrand.toLocaleString()} ج.م</td>
        <td class="p-2.5 font-bold text-emerald-600 dark:text-emerald-400">${cl.totalPaid.toLocaleString()} ج.م</td>
        <td class="p-2.5 font-bold text-rose-600 dark:text-rose-400">${cl.totalRemaining.toLocaleString()} ج.م</td>
        <td class="p-2.5 text-center">
          <a href="tel:${cl.customerPhone}" class="inline-flex items-center justify-center w-8 h-8 rounded-xl bg-slate-100 dark:bg-slate-800 text-blue-600 dark:text-blue-400 border border-slate-200 dark:border-slate-700 transition">
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
  if (elPhLink) { elPhLink.innerText = firstCnt.customerPhone || '--'; elPhLink.href = `tel:${firstCnt.customerPhone}`; }
  const elNat = document.getElementById('cpModalNationalId');
  if (elNat) elNat.innerText = firstCnt.nationalId || '--';
  const elG = document.getElementById('cpModalGuarantorDetails');
  if (elG) elG.innerHTML = `الاسم: <b>${firstCnt.guarantorName || '--'}</b> | الهاتف: <b>${firstCnt.guarantorPhone || '--'}</b> | الرقم القومي: <b>${firstCnt.guarantorNationalId || '--'}</b>`;

  let grandTotal = 0, grandPaid = 0, grandRemaining = 0;
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
      tabsContainer.innerHTML += `
        <button onclick="selectInvoiceTabInProfile('${cnt.id}')" class="px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition flex items-center gap-1.5 ${isActive ? 'bg-blue-600 text-white shadow' : 'bg-slate-100 dark:bg-slate-900 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-800'}">
          <span>فاتورة #${idx + 1} (${parsed.length} أصناف)</span>
          <span class="text-[10px] opacity-80">(${cnt.remainingAmount <= 0 ? 'خالصة ✔' : (parseFloat(cnt.remainingAmount) || 0).toLocaleString() + ' ج'})</span>
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
  if (!container || !cnt) return;

  const purchasedItems = parseItemsFromRecord(cnt);
  const itemsTableRows = purchasedItems.map(item => `
    <tr>
      <td class="p-2 text-center font-black text-blue-600 dark:text-cyan-400 text-sm">${item.qty}</td>
      <td class="p-2 font-bold text-slate-900 dark:text-white">${item.name}</td>
      <td class="p-2 font-mono text-[11px] text-blue-500">${item.serial || cnt.serialNumber || '--'}</td>
      <td class="p-2 text-slate-600 dark:text-slate-300">${(item.unitPrice || 0).toLocaleString()} ج</td>
      <td class="p-2 font-bold text-emerald-600 dark:text-emerald-400">${(item.total || (item.qty * item.unitPrice) || 0).toLocaleString()} ج</td>
    </tr>
  `).join('');

  container.innerHTML = `
    <div class="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-4 space-y-3.5">
      <div class="overflow-x-auto border border-slate-200 dark:border-slate-800 rounded-2xl bg-white dark:bg-slate-950/60">
        <table class="w-full text-right text-xs">
          <thead class="bg-slate-100 dark:bg-slate-950 text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-slate-800">
            <tr>
              <th class="p-2 text-center">العدد</th>
              <th class="p-2">الصنف</th>
              <th class="p-2">السيريال</th>
              <th class="p-2">سعر الوحدة</th>
              <th class="p-2">الإجمالي</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-200 dark:divide-slate-800/80 text-slate-700 dark:text-slate-300">
            ${itemsTableRows}
          </tbody>
        </table>
      </div>

      <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-2 bg-white dark:bg-slate-950/40 p-2.5 rounded-2xl border border-slate-200 dark:border-slate-800 text-xs">
        <div>
          <span>الإجمالي بالفوائد: <b class="text-slate-900 dark:text-white">${(cnt.totalWithInterest || 0).toLocaleString()} ج</b></span> | 
          <span>المحصل: <b class="text-emerald-600 dark:text-emerald-400">${(cnt.paidAmount || 0).toLocaleString()} ج</b></span> | 
          <span>المتبقي: <b class="text-rose-600 dark:text-rose-400 text-sm font-black">${(cnt.remainingAmount || 0).toLocaleString()} ج</b></span>
        </div>
        <div class="flex gap-2">
          <button onclick="openEditInvoiceModal('${cnt.id}')" class="px-3 py-1.5 bg-amber-500/10 text-amber-600 dark:text-amber-300 border border-amber-500/30 rounded-xl text-xs font-bold">
            <i class="fa-solid fa-pen-to-square"></i> تعديل
          </button>
          <button onclick="openChooseWhatsAppModal('${cnt.id}')" class="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow">
            <i class="fa-brands fa-whatsapp text-sm"></i> تذكير واتساب
          </button>
        </div>
      </div>

      <div class="overflow-x-auto border border-slate-200 dark:border-slate-800 rounded-2xl max-h-56 custom-scrollbar">
        <table class="w-full text-right text-xs">
          <thead class="bg-slate-100 dark:bg-slate-950 text-slate-500 dark:text-slate-400 sticky top-0 border-b border-slate-200 dark:border-slate-800">
            <tr>
              <th class="p-2">رقم القسط</th>
              <th class="p-2">الاستحقاق</th>
              <th class="p-2">المبلغ</th>
              <th class="p-2">المسدد</th>
              <th class="p-2 text-rose-500">المتبقي</th>
              <th class="p-2">الحالة</th>
              <th class="p-2 text-center">إجراء</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-200 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
            ${(cnt.installments || []).map(inst => {
              const paidSoFar = inst.paidActual || 0;
              const remaining = Math.max(0, inst.amount - paidSoFar);
              const isDone = inst.status === 'مدفوع بالكامل';
              return `
                <tr>
                  <td class="p-2 font-bold text-slate-900 dark:text-white">#${inst.number}</td>
                  <td class="p-2">${inst.dueDate}</td>
                  <td class="p-2 font-bold">${inst.amount.toLocaleString()} ج</td>
                  <td class="p-2 text-emerald-600 dark:text-emerald-400 font-bold">${paidSoFar.toLocaleString()} ج</td>
                  <td class="p-2 text-rose-500 font-bold">${remaining.toLocaleString()} ج</td>
                  <td class="p-2"><span class="px-2 py-0.5 rounded text-[10px] font-bold ${isDone ? 'bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400' : 'bg-rose-100 dark:bg-rose-500/20 text-rose-600 dark:text-rose-400'}">${inst.status}</span></td>
                  <td class="p-2 text-center space-x-1 space-x-reverse">
                    ${!isDone ? `
                      <button onclick="openCollectInstallmentModal('${cnt.id}', ${inst.number})" class="px-2.5 py-1 bg-emerald-600 text-white rounded text-[10px] font-bold shadow">
                        تحصيل 💰
                      </button>
                    ` : `
                      <button onclick="printInstallmentReceipt(cnt, ${inst.number}, ${paidSoFar}, ${cnt.remainingAmount})" class="px-2 py-0.5 bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded text-[10px]">
                        إيصال 🖨️
                      </button>
                    `}
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
    if (previewText) previewText.innerHTML = `سيتم سداد <b>${paidVal.toLocaleString()} ج.م</b> ويبقى عجز <b>${diff.toLocaleString()} ج.م</b>.`;
  } else {
    if (choiceBox) choiceBox.classList.add('hidden');
    if (previewText) previewText.innerHTML = `سيتم إغلاق القسط كـ <b>مدفوع بالكامل ✔</b>.`;
  }
}

// تعديل الفواتير
function openEditInvoiceModal(identifier) {
  const sales = getStoredSales();
  const contracts = getStoredContracts();
  let targetSale = sales.find(s => s.id === identifier || s.contractId === identifier);
  let targetContract = contracts.find(c => c.id === identifier || (targetSale && c.id === targetSale.contractId));
  if (!targetSale && !targetContract) return;

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
    if (cTot) cTot.innerText = `${Math.round(grandTotalContract).toLocaleString()} ج`;
    const cMo = document.getElementById('editCalculatedMonthly');
    if (cMo) cMo.innerText = `${monthlyAmount.toLocaleString()} ج`;
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

  if (!newCustName || !newCustPhone || newQty < 1 || newUnitPrice <= 0) { alert('يرجى التحقق من صحة البيانات.'); return; }

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

  renderDashboard();
  renderInstallmentsTable();
  renderSalesTable();
  renderInventoryTable();
  showToast('تم حفظ التعديلات بنجاح.', 'success');
}

// الموردين والتوريدات
function renderSuppliersTable() {
  const suppliers = getDetailedSuppliers();
  const listContainer = document.getElementById('suppliersMasterList');
  if (!listContainer) return;
  listContainer.innerHTML = '';
  const detailContainer = document.getElementById('supplierDetailContainer');
  const badgeElem = document.getElementById('suppliersCountBadge');
  if (badgeElem) badgeElem.innerText = `${suppliers.length} مورد`;

  if (suppliers.length === 0) {
    listContainer.innerHTML = '<p class="text-xs text-slate-500 text-center py-4">لا يوجد موردين بعد.</p>';
    if (detailContainer) detailContainer.innerHTML = '<p class="text-xs text-slate-500 text-center py-10">اضغط (+ إضافة مورد جديد) للبدء.</p>';
    return;
  }

  if (!selectedSupplierId || !suppliers.find(s => s.id === selectedSupplierId)) selectedSupplierId = suppliers[0].id;

  suppliers.forEach(sup => {
    let totalBill = 0, totalPaid = 0;
    (sup.items || []).forEach(it => { totalBill += (parseFloat(it.total) || 0); totalPaid += (parseFloat(it.paid) || 0); });
    const remaining = Math.max(0, totalBill - totalPaid);
    const isSelected = sup.id === selectedSupplierId;

    listContainer.innerHTML += `
      <div onclick="selectSupplierProfile('${sup.id}')" class="p-3 rounded-2xl cursor-pointer border transition ${isSelected ? 'bg-purple-100 dark:bg-purple-950/40 border-purple-500' : 'bg-slate-50 dark:bg-slate-900/80 border-slate-200 dark:border-slate-800'}">
        <div class="flex justify-between items-start">
          <h4 class="font-bold text-xs text-slate-900 dark:text-white truncate">${sup.name}</h4>
          <span class="text-[9px] px-1.5 py-0.5 rounded font-bold ${remaining > 0 ? 'bg-rose-100 dark:bg-rose-500/20 text-rose-600 dark:text-rose-400' : 'bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400'}">
            ${remaining > 0 ? remaining.toLocaleString() + ' ج' : 'خالص ✔'}
          </span>
        </div>
        <p class="text-[10px] text-slate-400 mt-1">${sup.phone}</p>
      </div>
    `;
  });
  renderSelectedSupplierDetails();
}

function selectSupplierProfile(supId) { selectedSupplierId = supId; renderSuppliersTable(); }

function renderSelectedSupplierDetails() {
  const suppliers = getDetailedSuppliers();
  const sup = suppliers.find(s => s.id === selectedSupplierId);
  const container = document.getElementById('supplierDetailContainer');
  if (!container || !sup) return;

  let grandTotal = 0, grandPaid = 0;
  let rowsHtml = '';
  (sup.items || []).forEach(it => {
    const itemTot = parseFloat(it.total) || 0;
    const itemPd = parseFloat(it.paid) || 0;
    grandTotal += itemTot; grandPaid += itemPd;
    rowsHtml += `
      <tr>
        <td class="p-2.5 text-slate-500 dark:text-slate-400">${it.date || '--'}</td>
        <td class="p-2.5 font-bold text-slate-900 dark:text-white">${it.name}</td>
        <td class="p-2.5 text-center font-bold text-blue-600 dark:text-cyan-400">${it.qty}</td>
        <td class="p-2.5">${(parseFloat(it.unitPrice) || 0).toLocaleString()} ج</td>
        <td class="p-2.5 font-bold">${itemTot.toLocaleString()} ج</td>
        <td class="p-2.5 text-emerald-600 dark:text-emerald-400 font-bold">${itemPd.toLocaleString()} ج</td>
        <td class="p-2.5 text-rose-600 dark:text-rose-400 font-bold">${Math.max(0, itemTot - itemPd).toLocaleString()} ج</td>
        <td class="p-2.5 text-center">
          <button onclick="deleteSupplierItem('${sup.id}', '${it.id}')" class="text-rose-500 hover:text-rose-400"><i class="fa-solid fa-trash-can"></i></button>
        </td>
      </tr>
    `;
  });

  const grandRemaining = Math.max(0, grandTotal - grandPaid);
  container.innerHTML = `
    <div class="bg-slate-50 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 p-4 rounded-2xl flex justify-between items-center">
      <div>
        <h3 class="text-base font-black text-slate-900 dark:text-white">${sup.name}</h3>
        <p class="text-xs text-slate-500 dark:text-slate-400">هاتف: ${sup.phone} | متبقي له: <b class="text-rose-500">${grandRemaining.toLocaleString()} ج</b></p>
      </div>
      <div class="flex gap-2">
        <button onclick="openAddShipmentModal('${sup.id}')" class="px-3 py-1.5 bg-purple-600 text-white rounded-xl text-xs font-bold shadow">
          <i class="fa-solid fa-boxes-packing"></i> تنزيل توريد
        </button>
        <button onclick="paySupplierPrompt('${sup.id}')" class="px-3 py-1.5 bg-emerald-600 text-white rounded-xl text-xs font-bold shadow">
          <i class="fa-solid fa-hand-holding-dollar"></i> سداد دفعة
        </button>
      </div>
    </div>
    <div class="overflow-x-auto border border-slate-200 dark:border-slate-800 rounded-2xl">
      <table class="w-full text-right text-xs">
        <thead class="bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400">
          <tr>
            <th class="p-2.5">التاريخ</th>
            <th class="p-2.5">الصنف</th>
            <th class="p-2.5 text-center">العدد</th>
            <th class="p-2.5">سعر الشراء</th>
            <th class="p-2.5">الإجمالي</th>
            <th class="p-2.5 text-emerald-600">المدفوع</th>
            <th class="p-2.5 text-rose-500">المتبقي</th>
            <th class="p-2.5 text-center">حذف</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-200 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
          ${rowsHtml || '<tr><td colspan="8" class="p-6 text-center text-slate-400">لا توجد أصناف موردة بعد.</td></tr>'}
        </tbody>
      </table>
    </div>
  `;
}

function handleCreateSupplierProfile() {
  const name = document.getElementById('newSupNameInput').value.trim();
  const phone = document.getElementById('newSupPhoneInput').value.trim();
  const address = document.getElementById('newSupAddressInput').value.trim();
  if (!name || !phone) { alert('يرجى كتابة الاسم ورقم الهاتف.'); return; }

  const suppliers = getDetailedSuppliers();
  const newSup = { id: 'SUP-' + (suppliers.length + 1), name, phone, address, items: [] };
  suppliers.push(newSup);
  setDetailedSuppliers(suppliers);
  selectedSupplierId = newSup.id;
  closeModal('addNewSupplierProfileModal');
  renderSuppliersTable();
  alert(`تمت إضافة المورد (${name}) بنجاح.`);
}

function openAddShipmentModal(supId) {
  selectedSupplierId = supId;
  currentSupplierShipmentCart = [];
  renderSupplierCartTbody();
  const dateInput = document.getElementById('supplierCartDateInput');
  if (dateInput) dateInput.value = new Date().toISOString().split('T')[0];
  openModal('addSupplierShipmentModal');
}

function addItemToSupplierCart() {
  const name = document.getElementById('shipItemNameInput').value.trim();
  const barcode = document.getElementById('shipItemBarcodeInput').value.trim();
  const qty = parseInt(document.getElementById('shipItemQtyInput').value) || 1;
  const unitPrice = parseFloat(document.getElementById('shipItemPriceInput').value) || 0;
  if (!name || unitPrice <= 0) { alert('يرجى إدخال اسم الصنف وسعر الشراء.'); return; }

  currentSupplierShipmentCart.push({
    id: 'ITM-' + Date.now() + '-' + Math.floor(Math.random() * 1000),
    name, barcode: barcode || ('BAR-' + Date.now().toString().slice(-6)),
    qty, unitPrice, total: qty * unitPrice
  });

  document.getElementById('shipItemNameInput').value = '';
  document.getElementById('shipItemBarcodeInput').value = '';
  document.getElementById('shipItemPriceInput').value = '';
  renderSupplierCartTbody();
}

function renderSupplierCartTbody() {
  const tbody = document.getElementById('supplierCartTbody');
  if (!tbody) return;
  tbody.innerHTML = '';
  let grandTotal = 0;
  currentSupplierShipmentCart.forEach((item, idx) => {
    grandTotal += item.total;
    tbody.innerHTML += `
      <tr>
        <td class="p-2 font-bold">${item.name}</td>
        <td class="p-2 font-mono text-xs">${item.barcode}</td>
        <td class="p-2 text-center font-bold">${item.qty}</td>
        <td class="p-2">${item.unitPrice.toLocaleString()} ج</td>
        <td class="p-2 font-bold">${item.total.toLocaleString()} ج</td>
        <td class="p-2 text-center"><button onclick="removeSupplierCartItem(${idx})" class="text-rose-500"><i class="fa-solid fa-xmark"></i></button></td>
      </tr>
    `;
  });
  if (currentSupplierShipmentCart.length === 0) tbody.innerHTML = '<tr><td colspan="6" class="p-3 text-center text-slate-400">الفاتورة فارغة.</td></tr>';
  const gDisp = document.getElementById('supplierCartGrandTotal');
  if (gDisp) gDisp.innerText = `${grandTotal.toLocaleString()} ج.م`;
}

function removeSupplierCartItem(idx) { currentSupplierShipmentCart.splice(idx, 1); renderSupplierCartTbody(); }

function handleSaveMultiItemSupplierInvoice() {
  if (currentSupplierShipmentCart.length === 0) { alert('يرجى إضافة صنف واحد على الأقل.'); return; }
  const suppliers = getDetailedSuppliers();
  const sup = suppliers.find(s => s.id === selectedSupplierId);
  if (!sup) return;

  const date = document.getElementById('supplierCartDateInput').value || new Date().toISOString().split('T')[0];
  const paidNow = parseFloat(document.getElementById('supplierCartPaidInput').value) || 0;
  let paidToDistribute = paidNow;

  currentSupplierShipmentCart.forEach(it => {
    let itemPaid = 0;
    if (paidToDistribute > 0) {
      itemPaid = Math.min(it.total, paidToDistribute);
      paidToDistribute -= itemPaid;
    }
    if (!sup.items) sup.items = [];
    sup.items.push({
      id: it.id, date, name: it.name, barcode: it.barcode, qty: it.qty, unitPrice: it.unitPrice,
      total: it.total, paid: itemPaid, remaining: it.total - itemPaid
    });
  });

  setDetailedSuppliers(suppliers);
  closeModal('addSupplierShipmentModal');
  currentSupplierShipmentCart = [];
  renderSuppliersTable();
  renderInventoryTable();
  renderDashboard();
  alert('تم اعتماد فاتورة التوريد وإدخال البضاعة للمخزن بنجاح.');
}

function deleteSupplierItem(supId, itemId) {
  if (confirm('هل أنت متأكد من حذف هذا الصنف من حساب المورد؟')) {
    const suppliers = getDetailedSuppliers();
    const sup = suppliers.find(s => s.id === supId);
    if (sup) {
      sup.items = sup.items.filter(it => it.id !== itemId);
      setDetailedSuppliers(suppliers);
      renderSuppliersTable();
      renderDashboard();
    }
  }
}

function paySupplierPrompt(supId) {
  const suppliers = getDetailedSuppliers();
  const sup = suppliers.find(s => s.id === supId);
  if (!sup) return;
  const amt = prompt(`أدخل المبلغ المسدد للمورد (${sup.name}):`);
  if (amt && !isNaN(amt) && parseFloat(amt) > 0) {
    let toPay = parseFloat(amt);
    for (let it of (sup.items || [])) {
      if (toPay <= 0) break;
      const rem = (parseFloat(it.total) || 0) - (parseFloat(it.paid) || 0);
      if (rem > 0) {
        const p = Math.min(rem, toPay);
        it.paid = (parseFloat(it.paid) || 0) + p;
        toPay -= p;
      }
    }
    setDetailedSuppliers(suppliers);
    renderSuppliersTable();
    renderDashboard();
    alert('تم تسجيل السداد للمورد بنجاح.');
  }
}

// تقارير المبيعات السنوية
function renderAnnualReportsView() {
  const year = document.getElementById('annualReportYearSelect').value || '2026';
  const searchTxt = (document.getElementById('annualReportSearchInput').value || '').trim().toLowerCase();
  const sales = getStoredSales();
  const productMap = {};
  let totalRev = 0, totalPcs = 0;
  const monthTotals = Array(13).fill(0);

  sales.forEach(sale => {
    if (!sale.date || !sale.date.startsWith(year)) return;
    const m = parseInt(sale.date.split('-')[1], 10);
    if (isNaN(m) || m < 1 || m > 12) return;
    const rawName = sale.rawDeviceName || (sale.deviceName ? sale.deviceName.split(' (عدد')[0] : 'جهاز');
    const qty = parseInt(sale.quantity) || 1;
    const tot = parseFloat(sale.totalPrice) || 0;

    if (!productMap[rawName]) productMap[rawName] = { name: rawName, monthly: Array(13).fill(0), totalQty: 0, totalRevenue: 0 };
    productMap[rawName].monthly[m] += qty;
    productMap[rawName].totalQty += qty;
    productMap[rawName].totalRevenue += tot;
    totalRev += tot; totalPcs += qty; monthTotals[m] += qty;
  });

  document.getElementById('annualTotalRevenueVal').innerText = `${totalRev.toLocaleString()} ج.م`;
  document.getElementById('annualTotalPiecesVal').innerText = `${totalPcs.toLocaleString()} قطعة`;

  let topProd = '--', maxP = 0;
  Object.values(productMap).forEach(p => { if (p.totalQty > maxP) { maxP = p.totalQty; topProd = `${p.name} (${p.totalQty} قطعة)`; } });
  document.getElementById('annualTopProductVal').innerText = topProd;

  const tbody = document.getElementById('annualReportTableBody');
  if (!tbody) return;
  tbody.innerHTML = '';

  const filtered = Object.values(productMap).filter(p => !searchTxt || p.name.toLowerCase().includes(searchTxt));
  if (filtered.length === 0) { tbody.innerHTML = `<tr><td colspan="15" class="p-6 text-center text-slate-500">لا توجد مبيعات في سنة ${year}.</td></tr>`; return; }

  filtered.forEach(p => {
    let mHtml = '';
    for (let m = 1; m <= 12; m++) mHtml += `<td class="p-2 font-bold ${p.monthly[m] > 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-400'}">${p.monthly[m] || '-'}</td>`;
    tbody.innerHTML += `
      <tr>
        <td class="p-2.5 text-right font-bold sticky right-0 bg-white dark:bg-[#0c1222]">${p.name}</td>
        ${mHtml}
        <td class="p-2.5 font-bold text-blue-600 dark:text-cyan-400">${p.totalQty}</td>
        <td class="p-2.5 font-bold text-emerald-600 dark:text-emerald-400">${p.totalRevenue.toLocaleString()} ج</td>
      </tr>
    `;
  });
}

function exportAnnualReportToExcel() {
  const year = document.getElementById('annualReportYearSelect').value || '2026';
  const sales = getStoredSales();
  const map = {};
  sales.forEach(sale => {
    if (!sale.date || !sale.date.startsWith(year)) return;
    const m = parseInt(sale.date.split('-')[1], 10);
    const name = sale.rawDeviceName || (sale.deviceName ? sale.deviceName.split(' (عدد')[0] : 'جهاز');
    const qty = parseInt(sale.quantity) || 1;
    if (!map[name]) map[name] = { "اسم الجهاز": name, "إجمالي القطع": 0, "إجمالي المبيعات": 0 };
    map[name][`ش ${m}`] = (map[name][`ش ${m}`] || 0) + qty;
    map[name]["إجمالي القطع"] += qty;
    map[name]["إجمالي المبيعات"] += (parseFloat(sale.totalPrice) || 0);
  });
  const ws = XLSX.utils.json_to_sheet(Object.values(map));
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, `تقرير_${year}`);
  XLSX.writeFile(wb, `تقرير_مبيعات_أولاد_العبد_${year}.xlsx`);
}

// المصاريف
function renderExpensesTable() {
  const expenses = getStoredExpenses();
  const tbody = document.getElementById('expensesTableBody');
  if (!tbody) return;
  tbody.innerHTML = '';
  if (expenses.length === 0) { tbody.innerHTML = '<tr><td colspan="6" class="p-6 text-center text-slate-500">لا توجد مصاريف مسجلة.</td></tr>'; return; }

  expenses.forEach(exp => {
    tbody.innerHTML += `
      <tr>
        <td class="p-2.5 text-slate-500 font-mono">${exp.date}</td>
        <td class="p-2.5 font-bold">${exp.title}</td>
        <td class="p-2.5"><span class="px-2 py-0.5 rounded bg-rose-100 dark:bg-rose-500/20 text-rose-600 dark:text-rose-300 text-[10px] font-bold">${exp.category}</span></td>
        <td class="p-2.5 text-rose-600 dark:text-rose-400 font-black">${(parseFloat(exp.amount) || 0).toLocaleString()} ج.م</td>
        <td class="p-2.5 text-slate-400">${exp.notes || '--'}</td>
        <td class="p-2.5 text-center"><button onclick="deleteExpense('${exp.id}')" class="text-rose-500"><i class="fa-solid fa-trash-can"></i></button></td>
      </tr>
    `;
  });
}

function handleSaveExpense() {
  const title = document.getElementById('expenseTitleInput').value.trim();
  const amount = parseFloat(document.getElementById('expenseAmountInput').value);
  const category = document.getElementById('expenseCategorySelect').value;
  const date = document.getElementById('expenseDateInput').value || new Date().toISOString().split('T')[0];
  const notes = document.getElementById('expenseNotesInput').value.trim();
  if (!title || isNaN(amount) || amount <= 0) { alert('يرجى التحقق من بند ومبلغ المصروف.'); return; }

  const expenses = getStoredExpenses();
  expenses.unshift({ id: 'EXP-' + Date.now(), date, title, category, amount, notes });
  setStoredExpenses(expenses);
  closeModal('addExpenseModal');
  document.getElementById('expenseTitleInput').value = '';
  document.getElementById('expenseAmountInput').value = '';
  renderExpensesTable();
  renderDashboard();
  showToast(`تم تسجيل مصروف (${title}) بمبلغ ${amount.toLocaleString()} ج`, 'success');
}

function deleteExpense(expId) {
  if (confirm('هل أنت متأكد من حذف هذا المصروف؟')) {
    let exp = getStoredExpenses().filter(e => e.id !== expId);
    setStoredExpenses(exp);
    renderExpensesTable();
    renderDashboard();
  }
}

// واتساب التذكير الدوري
function openChooseWhatsAppModal(contractId) {
  const contracts = getStoredContracts();
  currentContractForWhatsApp = contracts.find(x => x.id === contractId);
  if (!currentContractForWhatsApp) return;
  document.getElementById('waModalCustomerName').innerText = currentContractForWhatsApp.customerName;
  openModal('chooseWhatsAppTemplateModal');
}

function executeSendWhatsAppTemplate(type) {
  if (!currentContractForWhatsApp) return;
  const c = currentContractForWhatsApp;
  const cleanPhone = (c.customerPhone || '').toString().replace(/[^0-9]/g, '');
  let msg = '';
  if (type === 'friendly') {
    msg = `تحية طيبة أستاذ ${c.customerName} من معرض أولاد العبد للأجهزة الكهربائية 🌸\nنود تذكير سيادتكم بميعاد القسط القادم لفاتورة (${c.deviceName}).\nالمتبقي الإجمالي: ${(c.remainingAmount || 0).toLocaleString()} ج.م.\nشاكرين لتعاملكم الراقي معنا 🤝`;
  } else if (type === 'formal') {
    msg = `إشعار استحقاق قسط ⚠️\nالسيد / ${c.customerName} المحترم (كود: #${c.clientCode || 1})\nيرجى التكرم بسداد القسط المستحق طرفكم لمعرض أولاد العبد للأجهزة الكهربائية عن (${c.deviceName}).\nالمتبقي الإجمالي: ${(c.remainingAmount || 0).toLocaleString()} ج.م.`;
  } else {
    msg = `🛑 إنذار نهائي بالسداد\nإلى السيد / ${c.customerName} والضامن (${c.guarantorName || ''})\nنظراً لتأخركم في سداد الأقساط المستحقة لمعرض أولاد العبد، يرجى التوجه لمقر المعرض خلال 48 ساعة لتسوية المديونية (${(c.remainingAmount || 0).toLocaleString()} ج) تفادياً للإجراءات القانونية.`;
  }
  closeModal('chooseWhatsAppTemplateModal');
  window.open(`https://wa.me/2${cleanPhone}?text=${encodeURIComponent(msg)}`, '_blank');
}

// ماسح الكاميرا
function openBarcodeScanner(targetMode) {
  currentTargetInputIdForScanner = targetMode;
  openModal('barcodeScannerModal');
  const config = { fps: 15, qrbox: { width: 250, height: 160 } };
  html5QrCodeScannerInstance = new Html5Qrcode("barcode-scanner-box");
  html5QrCodeScannerInstance.start({ facingMode: "environment" }, config, (decoded) => {
    closeBarcodeScanner();
    if (currentTargetInputIdForScanner === 'home_inquiry') {
      executeDeviceInquiryByBarcode(decoded.trim());
    } else {
      const inEl = document.getElementById(currentTargetInputIdForScanner);
      if (inEl) inEl.value = decoded.trim();
    }
  }, () => {}).catch(() => { alert("تعذر فتح الكاميرا."); closeBarcodeScanner(); });
}

function closeBarcodeScanner() {
  if (html5QrCodeScannerInstance) {
    html5QrCodeScannerInstance.stop().then(() => { html5QrCodeScannerInstance.clear(); html5QrCodeScannerInstance = null; }).catch(() => { html5QrCodeScannerInstance = null; });
  }
  closeModal('barcodeScannerModal');
}

function executeDeviceInquiryByBarcode(barcode) {
  const inventory = buildDynamicInventory();
  const item = inventory.find(i => (i.barcode && i.barcode.toLowerCase() === barcode.toLowerCase()) || (i.name && i.name.toLowerCase().includes(barcode.toLowerCase())));
  const content = document.getElementById('deviceInquiryResultContent');
  if (!content) return;

  if (!item) {
    lastInquiredDeviceObject = null;
    content.innerHTML = `<div class="p-4 bg-rose-500/10 text-rose-500 rounded-2xl text-center text-xs">الصنف غير مسجل بالمخزن!</div>`;
  } else {
    lastInquiredDeviceObject = item;
    content.innerHTML = `
      <div class="p-3 bg-slate-50 dark:bg-slate-900 rounded-2xl space-y-2 text-xs">
        <h4 class="font-bold text-slate-900 dark:text-white">${item.name}</h4>
        <p>المورد: ${item.supplierName} | باركود: ${item.barcode}</p>
        <p>الرصيد المتاح: <b class="text-blue-600 dark:text-cyan-400">${item.currentQty} قطع</b></p>
        <p>سعر الكاش: <b class="text-emerald-600 dark:text-emerald-400">${item.cashPrice.toLocaleString()} ج</b></p>
      </div>
    `;
  }
  openModal('deviceInquiryModal');
}

function proceedToSellInquiredDevice() {
  if (!lastInquiredDeviceObject) return;
  closeModal('deviceInquiryModal');
  openModal('newSaleModal');
  applyDeviceFromStock(lastInquiredDeviceObject.itemId);
}
