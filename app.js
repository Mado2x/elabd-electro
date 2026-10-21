// ==========================================
// المحرك التشغيلي (app.js) - الجزء الأول (مصحح بالكامل)
// معرض أولاد العبد للأجهزة الكهربائية
// ==========================================

const STORAGE_KEY_AUTH_SESSION = 'elabd_auth_session_v1';
const STORAGE_KEY_SYSTEM_USERNAME = 'elabd_sys_user_v1';
const STORAGE_KEY_OWNER_PIN = 'elabd_owner_pin_v6';

function getSystemUsername() {
  return localStorage.getItem(STORAGE_KEY_SYSTEM_USERNAME) || 'admin';
}

function getOwnerPin() {
  return localStorage.getItem(STORAGE_KEY_OWNER_PIN) || '1234';
}

function checkAuthSession() {
  const isAuth = localStorage.getItem(STORAGE_KEY_AUTH_SESSION);
  const overlay = document.getElementById('appLoginOverlay');
  if (!overlay) return;

  if (isAuth === 'true') {
    overlay.style.display = 'none';
  } else {
    overlay.style.display = 'flex';
    const uInput = document.getElementById('loginUsernameInput');
    if (uInput) setTimeout(() => uInput.focus(), 150);
  }
}

function handleSystemLogin(e) {
  if (e && e.preventDefault) e.preventDefault();
  const uInput = document.getElementById('loginUsernameInput');
  const pInput = document.getElementById('loginPasswordInput');
  const errEl = document.getElementById('loginErrorMsg');

  const enteredUser = uInput ? uInput.value.trim().toLowerCase() : '';
  const enteredPass = pInput ? pInput.value.trim() : '';

  const correctUser = getSystemUsername().toLowerCase();
  const correctPass = getOwnerPin();

  // السماح بالدخول عبر البيانات المحفوظة، أو الافتراضية، أو بالماستر كي (0000)
  const isUserValid = (enteredUser === correctUser) || (enteredUser === 'admin');
  const isPassValid = (enteredPass === correctPass) || (enteredPass === '1234') || (enteredPass === '0000');

  if (isUserValid && isPassValid) {
    localStorage.setItem(STORAGE_KEY_AUTH_SESSION, 'true');
    const overlay = document.getElementById('appLoginOverlay');
    if (overlay) overlay.style.display = 'none';
    if (errEl) errEl.classList.add('hidden');
    if (uInput) uInput.value = '';
    if (pInput) pInput.value = '';
    showToast('تم تسجيل الدخول بنجاح', 'success');
  } else {
    if (errEl) {
      errEl.innerText = 'اسم المستخدم أو كلمة المرور غير صحيحة!';
      errEl.classList.remove('hidden');
    }
  }
}

function handleSystemLogout() {
  if (confirm('هل أنت متأكد من تسجيل الخروج وقفل النظام؟')) {
    localStorage.removeItem(STORAGE_KEY_AUTH_SESSION);
    const overlay = document.getElementById('appLoginOverlay');
    if (overlay) overlay.style.display = 'flex';
    showToast('تم تسجيل الخروج بنجاح', 'info');
  }
}

function openChangeCredentialsModal() {
  requireOwnerAuth(() => {
    const uInput = document.getElementById('newUsernameInput');
    const pInput = document.getElementById('newPasswordInput');
    if (uInput) uInput.value = getSystemUsername();
    if (pInput) pInput.value = getOwnerPin();
    openModal('changeCredentialsModal');
  });
}

function saveNewCredentials() {
  const uInput = document.getElementById('newUsernameInput');
  const pInput = document.getElementById('newPasswordInput');
  const newU = uInput ? uInput.value.trim() : '';
  const newP = pInput ? pInput.value.trim() : '';

  if (!newU || !newP) {
    alert('يرجى ملء اسم المستخدم وكلمة المرور!');
    return;
  }

  localStorage.setItem(STORAGE_KEY_SYSTEM_USERNAME, newU);
  localStorage.setItem(STORAGE_KEY_OWNER_PIN, newP);
  closeModal('changeCredentialsModal');
  showToast('تم تحديث بيانات الدخول بنجاح ✔', 'success');
}

function openForgotPasswordPrompt() {
  const recoveryKey = prompt('استعادة الحساب 🔑\nأدخل رمز الأمان الرئيسي لمالك المعرض (Master Key):');
  if (recoveryKey === null) return;

  if (recoveryKey.trim() === '0000') {
    const currentU = getSystemUsername();
    const currentP = getOwnerPin();
    alert(`بيانات حسابك الحالية:\nاسم المستخدم: ${currentU}\nكلمة المرور: ${currentP}`);
  } else {
    alert('رمز الأمان الرئيسي غير صحيح!');
  }
}

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

window.alert = function(msg) {
  msg = String(msg ?? '');
  const isError = msg.includes('يرجى') || msg.includes('عفواً') || msg.includes('أكبر') || msg.includes('تعذر') || msg.includes('خطأ') || msg.includes('غير صحيح');
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
const STORAGE_KEY_SHIFTS_ARCHIVE = 'elabd_shifts_archive_v6';
const STORAGE_KEY_PROMO_TEMPLATE = 'elabd_promo_template_v6';

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

function requireOwnerAuth(actionCallback) {
  const currentPin = getOwnerPin();

  if (window.Swal) {
    Swal.fire({
      title: 'صلاحيات المالك 🔒',
      text: 'يرجى إدخال الرقم السري لتأكيد العملية:',
      input: 'password',
      inputPlaceholder: 'أدخل الباسورد...',
      showCancelButton: true,
      confirmButtonText: 'تأكيد',
      cancelButtonText: 'إلغاء',
      confirmButtonColor: '#2563eb',
      cancelButtonColor: '#64748b',
      background: document.documentElement.classList.contains('dark') ? '#111726' : '#ffffff',
      color: document.documentElement.classList.contains('dark') ? '#ffffff' : '#1e293b',
      customClass: { popup: 'rounded-3xl border border-slate-700' },
      preConfirm: (enteredPin) => {
        if (!enteredPin) {
          Swal.showValidationMessage('يرجى كتابة الرقم السري!');
        } else if (enteredPin !== currentPin && enteredPin !== '0000') {
          Swal.showValidationMessage('الرقم السري غير صحيح!');
        }
        return enteredPin;
      }
    }).then((result) => {
      if (result.isConfirmed) {
        actionCallback();
      }
    });
  } else {
    const entered = prompt('صلاحيات المالك 🔒\nأدخل الرقم السري:');
    if (entered === currentPin || entered === '0000') {
      actionCallback();
    } else if (entered !== null) {
      alert('عفواً، الرقم السري غير صحيح!');
    }
  }
}

function getFormattedDateTimeNow() {
  const now = new Date();
  const dateStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
  let hours = now.getHours();
  const minutes = now.getMinutes().toString().padStart(2, '0');
  const ampm = hours >= 12 ? 'م' : 'ص';
  hours = hours % 12;
  hours = hours ? hours : 12;
  const timeStr = `${hours}:${minutes} ${ampm}`;
  return { date: dateStr, time: timeStr, full: `${dateStr} (${timeStr})` };
}

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

function getStoredShiftsArchive() { try { const d = localStorage.getItem(STORAGE_KEY_SHIFTS_ARCHIVE); if (d) return JSON.parse(d); } catch (e) {} return []; }
function setStoredShiftsArchive(d) { localStorage.setItem(STORAGE_KEY_SHIFTS_ARCHIVE, JSON.stringify(d)); }

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

  const inventoryItems = Object.values(inventoryMap);
  const normalizeItemName = value => String(value || '').trim().toLocaleLowerCase('ar');
  const findInventoryItem = soldItem => {
    if (soldItem && soldItem.itemId != null && inventoryMap[soldItem.itemId]) return inventoryMap[soldItem.itemId];
    if (soldItem && soldItem.barcode) {
      const byBarcode = inventoryItems.filter(x => String(x.barcode || '') === String(soldItem.barcode));
      if (byBarcode.length === 1) return byBarcode[0];
    }
    const name = normalizeItemName(soldItem && soldItem.name);
    if (!name) return null;
    const byExactName = inventoryItems.filter(x => normalizeItemName(x.name) === name);
    return byExactName.length === 1 ? byExactName[0] : null;
  };

  sales.forEach(sale => {
    if (Array.isArray(sale.items) && sale.items.length) {
      sale.items.forEach(soldItm => {
        const itemEntry = findInventoryItem(soldItm);
        if (itemEntry) itemEntry.currentQty -= Math.max(0, parseInt(soldItm.qty, 10) || 1);
      });
    } else {
      const legacyItems = parseItemsFromRecord(sale);
      legacyItems.forEach(soldItm => {
        const itemEntry = findInventoryItem(soldItm);
        if (itemEntry) itemEntry.currentQty -= Math.max(0, parseInt(soldItm.qty, 10) || 1);
      });
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

window.addEventListener('DOMContentLoaded', () => {
  checkAuthSession();
  initThemeMode();
  const dt = getFormattedDateTimeNow();
  const startDateInput = document.getElementById('instStartDate');
  if (startDateInput) startDateInput.value = dt.date;

  const expenseDate = document.getElementById('expenseDateInput');
  if (expenseDate) expenseDate.value = dt.date;

  const currentYearMonth = dt.date.substring(0, 7);
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

  ['dashboard', 'reports', 'suppliers', 'installments', 'inventory', 'sales', 'expenses', 'customers', 'shifts-archive'].forEach(v => {
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
  if (viewName === 'customers') renderCustomersDirectory();
  if (viewName === 'shifts-archive') renderShiftsArchive();
}

function openModal(id) { const el = document.getElementById(id); if (el) { el.classList.remove('hidden'); if (id === 'newSaleModal') clearSaleModalFields(); } }
function closeModal(id) { const el = document.getElementById(id); if (el) el.classList.add('hidden'); }

function openDailyShiftModal() {
  const dt = getFormattedDateTimeNow();
  const sales = getStoredSales();
  const contracts = getStoredContracts();
  const expenses = getStoredExpenses();

  let todaySalesCash = 0;
  sales.forEach(s => {
    if (s.date && s.date.startsWith(dt.date)) todaySalesCash += (parseFloat(s.paidImmediately) || 0);
  });

  let todayInstCash = 0;
  contracts.forEach(cnt => {
    (cnt.installments || []).forEach(inst => {
      if (inst.paidDate && inst.paidDate.startsWith(dt.date) && inst.paidActual > 0) todayInstCash += parseFloat(inst.paidActual);
    });
  });

  let todayExpenses = 0;
  expenses.forEach(e => {
    if (e.date && e.date.startsWith(dt.date)) todayExpenses += (parseFloat(e.amount) || 0);
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

function closeDailyShiftAndArchive() {
  const dt = getFormattedDateTimeNow();
  const archive = getStoredShiftsArchive();

  const existingShiftIndex = archive.findIndex(s => s.date === dt.date);

  const proceedWithSave = () => {
    const sales = getStoredSales();
    const contracts = getStoredContracts();
    const expenses = getStoredExpenses();

    let todaySalesCash = 0;
    sales.forEach(s => {
      if (s.date && s.date.startsWith(dt.date)) todaySalesCash += (parseFloat(s.paidImmediately) || 0);
    });

    let todayInstCash = 0;
    contracts.forEach(cnt => {
      (cnt.installments || []).forEach(inst => {
        if (inst.paidDate && inst.paidDate.startsWith(dt.date) && inst.paidActual > 0) todayInstCash += parseFloat(inst.paidActual);
      });
    });

    let todayExpenses = 0;
    expenses.forEach(e => {
      if (e.date && e.date.startsWith(dt.date)) todayExpenses += (parseFloat(e.amount) || 0);
    });

    const netDrawerCash = (todaySalesCash + todayInstCash) - todayExpenses;

    const shiftRecord = {
      id: existingShiftIndex !== -1 ? archive[existingShiftIndex].id : ('SHIFT-' + (archive.length + 1)),
      date: dt.date,
      time: dt.time,
      fullDateTime: dt.full,
      directSalesCash: todaySalesCash,
      installmentsCash: todayInstCash,
      expensesDeducted: todayExpenses,
      netDrawerCash: netDrawerCash
    };

    if (existingShiftIndex !== -1) {
      archive[existingShiftIndex] = shiftRecord;
    } else {
      archive.unshift(shiftRecord);
    }

    setStoredShiftsArchive(archive);
    exportCurrentDatabaseToExcel(true);
    closeModal('dailyShiftModal');
    renderShiftsArchive();
    showToast(`تم حفظ تقفيل الوردية بصافي (${netDrawerCash.toLocaleString()} ج.م)`, 'success');
  };

  if (existingShiftIndex !== -1) {
    if (confirm('تنبيه: تم تسجيل تقفيل وردية لهذا اليوم مسبقاً! هل تريد تحديث أرقام التقفيل بالمعاملات الحالية؟')) {
      proceedWithSave();
    }
  } else {
    proceedWithSave();
  }
}

function renderShiftsArchive() {
  const archive = getStoredShiftsArchive();
  const tbody = document.getElementById('shiftsArchiveTableBody');
  if (!tbody) return;
  tbody.innerHTML = '';

  let totalNet = 0, totalExp = 0;
  archive.forEach(s => {
    totalNet += (parseFloat(s.netDrawerCash) || 0);
    totalExp += (parseFloat(s.expensesDeducted) || 0);
  });

  const elNet = document.getElementById('archiveTotalNetCash');
  if (elNet) elNet.innerText = `${totalNet.toLocaleString()} ج.م`;
  const elCount = document.getElementById('archiveTotalShiftsCount');
  if (elCount) elCount.innerText = `${archive.length} وردية`;
  const elExp = document.getElementById('archiveTotalExpensesDeducted');
  if (elExp) elExp.innerText = `${totalExp.toLocaleString()} ج.م`;

  if (archive.length === 0) {
    tbody.innerHTML = `<tr><td colspan="8" class="p-6 text-center text-slate-500">لا يوجد تقفيلات وردية مسجلة بعد.</td></tr>`;
    return;
  }

  archive.forEach(s => {
    tbody.innerHTML += `
      <tr>
        <td class="p-2.5 font-bold font-mono text-blue-600 dark:text-cyan-400">#${s.id}</td>
        <td class="p-2.5 text-slate-800 dark:text-slate-200">${s.fullDateTime}</td>
        <td class="p-2.5 font-bold text-emerald-600">${s.directSalesCash.toLocaleString()} ج</td>
        <td class="p-2.5 font-bold text-blue-600 dark:text-cyan-400">${s.installmentsCash.toLocaleString()} ج</td>
        <td class="p-2.5 font-bold text-rose-600">-${s.expensesDeducted.toLocaleString()} ج</td>
        <td class="p-2.5 font-black text-emerald-600 dark:text-emerald-400 text-sm">${s.netDrawerCash.toLocaleString()} ج.م</td>
        <td class="p-2.5 text-center space-x-1 space-x-reverse">
          <button onclick="printArchivedShiftReport('${s.id}')" class="px-2.5 py-1 bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-white rounded-lg text-xs font-bold shadow">
            طباعة 🖨️
          </button>
          <button onclick="deleteArchivedShift('${s.id}')" class="px-2 py-1 bg-rose-100 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 border border-rose-300 dark:border-rose-800 rounded-lg text-xs font-bold hover:bg-rose-600 hover:text-white transition">
            <i class="fa-solid fa-trash-can"></i>
          </button>
        </td>
      </tr>
    `;
  });
}

function deleteArchivedShift(shiftId) {
  requireOwnerAuth(() => {
    if (confirm(`هل أنت متأكد من حذف الوردية رقم (#${shiftId}) من الأرشيف؟`)) {
      let archive = getStoredShiftsArchive();
      archive = archive.filter(s => s.id !== shiftId);
      setStoredShiftsArchive(archive);
      renderShiftsArchive();
      showToast('تم حذف الوردية وتحديث إجمالي الخزينة بنجاح', 'success');
    }
  });
}

function exportShiftsArchiveToExcel() {
  const archive = getStoredShiftsArchive();
  const data = archive.map(s => ({
    "رقم الوردية": s.id,
    "التاريخ والوقت": s.fullDateTime,
    "كاش المبيعات المباشرة": s.directSalesCash,
    "أقساط محصلة": s.installmentsCash,
    "المصاريف المخصومة": s.expensesDeducted,
    "الصافي الفعلي بالدرج": s.netDrawerCash
  }));
  const ws = XLSX.utils.json_to_sheet(data);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "أرشيف تقفيلات الوردية");
  XLSX.writeFile(wb, `أرشيف_ورديات_أولاد_العبد_${getFormattedDateTimeNow().date}.xlsx`);
}

function printDailyShiftReport() {
  const dt = getFormattedDateTimeNow();
  const sSales = document.getElementById('shiftTodaySalesCash')?.innerText || '0 ج.م';
  const sInst = document.getElementById('shiftTodayInstCash')?.innerText || '0 ج.م';
  const sExp = document.getElementById('shiftTodayExpenses')?.innerText || '0 ج.م';
  const sNet = document.getElementById('shiftNetDrawerCash')?.innerText || '0 ج.م';

  const html = `
    <div style="text-align: center; font-size: 13px; line-height: 1.6; direction: rtl; font-family: 'Cairo', sans-serif;">
      <h2 style="margin: 0; font-size: 16px; font-weight: bold;">معرض أولاد العبد</h2>
      <p style="margin: 2px 0; font-size: 12px; font-weight: bold;">تقرير تقفيل الوردية اليومية (Z-Report)</p>
      <p style="margin: 2px 0; font-size: 11px; color: #555;">الوقت: ${dt.full}</p>
      <div style="border-bottom: 1px dashed #000; margin: 8px 0;"></div>
      
      <table style="width: 100%; font-size: 12px; text-align: right; border-collapse: collapse;">
        <tr>
          <td style="padding: 5px 0;">مبيعات كاش اليوم:</td>
          <td style="text-align: left; font-weight: bold;">${sSales}</td>
        </tr>
        <tr>
          <td style="padding: 5px 0;">أقساط محصلة اليوم:</td>
          <td style="text-align: left; font-weight: bold;">${sInst}</td>
        </tr>
        <tr>
          <td style="padding: 5px 0;">مصاريف ونولون خارج:</td>
          <td style="text-align: left; font-weight: bold; color: #dc2626;">-${sExp}</td>
        </tr>
      </table>
      
      <div style="border-bottom: 1px solid #000; margin: 8px 0;"></div>
      <div style="text-align: right; font-size: 14px; font-weight: bold;">
        <span>الصافي بالدرج: </span>
        <span style="float: left; font-size: 15px;">${sNet}</span>
      </div>
      <div style="border-bottom: 1px dashed #000; margin: 10px 0;"></div>
      <p style="font-size: 10px; margin: 4px 0;">توقيع المسؤول: ....................</p>
    </div>
  `;

  windowPrintReceiptHTML(html);
}

function printArchivedShiftReport(shiftId) {
  const archive = getStoredShiftsArchive();
  const s = archive.find(x => x.id === shiftId);
  if (!s) return;

  const html = `
    <div style="text-align: center; font-size: 13px; line-height: 1.6; direction: rtl; font-family: 'Cairo', sans-serif;">
      <h2 style="margin: 0; font-size: 16px; font-weight: bold;">معرض أولاد العبد</h2>
      <p style="margin: 2px 0; font-size: 12px; font-weight: bold;">إيصال وردية مؤرشفة #${s.id}</p>
      <p style="margin: 2px 0; font-size: 11px; color: #555;">الوقت والتاريخ: ${s.fullDateTime}</p>
      <div style="border-bottom: 1px dashed #000; margin: 8px 0;"></div>
      
      <table style="width: 100%; font-size: 12px; text-align: right; border-collapse: collapse;">
        <tr>
          <td style="padding: 4px 0;">كاش مبيعات مباشرة:</td>
          <td style="text-align: left; font-weight: bold;">${s.directSalesCash.toLocaleString()} ج</td>
        </tr>
        <tr>
          <td style="padding: 4px 0;">أقساط محصلة:</td>
          <td style="text-align: left; font-weight: bold;">${s.installmentsCash.toLocaleString()} ج</td>
        </tr>
        <tr>
          <td style="padding: 4px 0;">مصاريف مخصومة:</td>
          <td style="text-align: left; font-weight: bold; color: #dc2626;">-${s.expensesDeducted.toLocaleString()} ج</td>
        </tr>
      </table>
      
      <div style="border-bottom: 1px solid #000; margin: 8px 0;"></div>
      <div style="text-align: right; font-size: 14px; font-weight: bold;">
        <span>الصافي المقفل: </span>
        <span style="float: left; font-size: 15px;">${s.netDrawerCash.toLocaleString()} ج.م</span>
      </div>
      <div style="border-bottom: 1px dashed #000; margin: 10px 0;"></div>
    </div>
  `;
  windowPrintReceiptHTML(html);
}

function exportLocalBackupJSON() {
  try {
    const keys = [
      STORAGE_KEY_DETAILED_SUPPLIERS, STORAGE_KEY_SELLING_PRICES, STORAGE_KEY_SALES,
      STORAGE_KEY_CONTRACTS, STORAGE_KEY_EXPENSES, STORAGE_KEY_SHIFTS_ARCHIVE,
      STORAGE_KEY_PROMO_TEMPLATE
    ];
    const snapshot = { schemaVersion: 1, exportedAt: new Date().toISOString(), data: {} };
    keys.forEach(key => {
      const value = localStorage.getItem(key);
      if (value !== null) snapshot.data[key] = value;
    });
    const blob = new Blob([JSON.stringify(snapshot, null, 2)], { type: 'application/json;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `نسخة_احتياطية_معرض_أولاد_العبد_${getFormattedDateTimeNow().date}.json`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
    return true;
  } catch (error) {
    console.error('Backup export failed:', error);
    alert('تعذر إنشاء النسخة الاحتياطية.');
    return false;
  }
}

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
        <p style="margin: 2px 0;"><b>التاريخ والوقت:</b> ${sale.date}</p>
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
    </div>
  `;

  windowPrintReceiptHTML(html);
}

function printInstallmentReceipt(contract, instNum, paidAmount, remainingOnContract) {
  const dt = getFormattedDateTimeNow();
  const html = `
    <div style="text-align: center; font-size: 13px; line-height: 1.5; direction: rtl;">
      <h2 style="margin: 0; font-size: 16px; font-weight: bold;">معرض أولاد العبد</h2>
      <p style="margin: 2px 0; font-size: 11px;">إيصال استلام وسداد قسط رسمي 🧾</p>
      <div style="border-bottom: 1px solid #000; margin: 8px 0;"></div>
      <div style="text-align: right; font-size: 11px;">
        <p style="margin: 2px 0;"><b>كود العميل:</b> #${contract.clientCode || 1}</p>
        <p style="margin: 2px 0;"><b>اسم العميل:</b> ${contract.customerName}</p>
        <p style="margin: 2px 0;"><b>الوقت والتاريخ:</b> ${dt.full}</p>
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
    </div>
  `;
  windowPrintReceiptHTML(html);
}
// ==========================================
// المحرك التشغيلي (app.js) - الجزء الثاني
// معرض أولاد العبد للأجهزة الكهربائية
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
                <button onclick="openCollectInstallmentModal('${cnt.id}',${inst.number})" class="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-[10px] font-bold shadow">
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
    const isLow = item.currentQty > 0 && item.currentQty <= 3;

    let qtyBadge = `<span class="font-black text-emerald-600 dark:text-emerald-400 text-base">${item.currentQty}</span>`;
    if (isOutOfStock) {
      qtyBadge = `<span class="px-2 py-0.5 rounded-full bg-rose-100 dark:bg-rose-500/20 text-rose-600 dark:text-rose-400 font-bold text-[10px]">نفذ تماماً (0) 🛑</span>`;
    } else if (isLow) {
      qtyBadge = `<span class="px-2.5 py-1 rounded-full bg-amber-100 dark:bg-amber-500/25 text-amber-600 dark:text-amber-300 font-extrabold text-[11px] border border-amber-500/40">⚠️ نواقص بالمخزن (${item.currentQty})</span>`;
    }

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
  XLSX.writeFile(wb, `جرد_مخزن_أولاد_العبد_${getFormattedDateTimeNow().date}.xlsx`);
}

function viewSingleInvoiceDetails(saleId) {
  currentViewedSaleIdForPrint = saleId;
  const sales = getStoredSales();
  const sale = sales.find(s => s.id === saleId);
  if (!sale) return;

  const idElem = document.getElementById('vsimInvoiceId');
  if (idElem) idElem.innerText = `#${sale.id}`;

  const metaElem = document.getElementById('vsimClientMeta');
  if (metaElem) metaElem.innerText = `العميل: ${sale.customerName} | الهاتف: ${sale.customerPhone} \vert{} النوع: ${sale.type}`;

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
        <td class="p-2.5 text-slate-500 dark:text-slate-400 font-mono text-xs">${s.date}</td>
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
  const dt = getFormattedDateTimeNow();
  const diff = currentCollectingRemainingAmount - paidVal;

  inst.paidActual = (inst.paidActual || 0) + paidVal;

  if (diff === 0) {
    inst.status = 'مدفوع بالكامل';
    inst.paidDate = dt.date;
  } else if (diff > 0) {
    const checkedRadio = document.querySelector('input[name="partialActionType"]:checked');
    const actionType = checkedRadio ? checkedRadio.value : 'keep_open';
    if (actionType === 'keep_open') {
      inst.status = 'مدفوع جزئياً';
      inst.paidDate = dt.date;
    } else {
      inst.status = 'مدفوع بالكامل';
      inst.paidDate = dt.date;
      const nextInst = cnt.installments[instIndex + 1];
      if (nextInst) nextInst.amount += diff;
    }
  } else {
    inst.status = 'مدفوع بالكامل';
    inst.paidDate = dt.date;
    const nextInst = cnt.installments[instIndex + 1];
    if (nextInst) nextInst.amount = Math.max(0, nextInst.amount - Math.abs(diff));
  }

  cnt.paidAmount = (cnt.paidAmount || 0) + paidVal;
  cnt.remainingAmount = Math.max(0, cnt.totalWithInterest - cnt.paidAmount);

  setStoredContracts(contracts);
  closeModal('collectInstallmentModal');

  renderDashboard();
  renderInstallmentsTable();

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
  const dt = getFormattedDateTimeNow();
  const msg = 
`إيصال استلام نقدية وسداد قسط 🧾
معرض أولاد العبد للأجهزة الكهربائية والمنزلية 🏢

عناية السيد / ${contract.customerName} المحترم (كود: #${contract.clientCode || 1})
تم بحمد الله استلام وتسوية دفعة:
━━━━━━━━━━━━━━━━━━━
💵 المبلغ المسدد: ${paidVal.toLocaleString()} ج.م
📌 بيان السداد: القسط رقم (#${instNum})
📦 الأجهزة المشتراة: ${contract.deviceName}
📅 توقيت السداد: ${dt.full}
━━━━━━━━━━━━━━━━━━━
💰 إجمالي المتبقي لإغلاق حسابك: ${contract.remainingAmount.toLocaleString()} ج.م

شاكرين لحسن تعاونكم والتزامكم بمواعيد السداد 🌸`;

  window.open(`https://wa.me/2${cleanPhone}?text=${encodeURIComponent(msg)}`, '_blank');
}

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
  const dt = getFormattedDateTimeNow();
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
      date: dt.full,
      rawDate: dt.date,
      time: dt.time,
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
    renderCustomersDirectory();
    showToast(`تم حفظ الفاتورة الكاش (${newInvoiceId}) بنجاح`, 'success');
  } else {
    const math = calculateInstallmentMath();
    const contracts = getStoredContracts();
    
    const existingClient = contracts.find(c => (c.customerPhone || '').toString().trim() === customerPhone.trim());
    const clientCodeToUse = existingClient && existingClient.clientCode ? existingClient.clientCode : (contracts.length > 0 ? (Math.max(...contracts.map(c => c.clientCode || 0)) + 1) : 1);

    const contractId = 'CNT-' + (contracts.length + 1);
    const stDateInput = document.getElementById('instStartDate');
    const startDateStr = (stDateInput && stDateInput.value) ? stDateInput.value : dt.date;

    const installmentsList = [];
    let currentMonthDate = new Date(startDateStr);
    for (let i = 1; i <= math.months; i++) {
      installmentsList.push({ number: i, dueDate: currentMonthDate.toISOString().split('T')[0], amount: math.monthlyAmount, status: 'قادم', paidDate: null, paidActual: 0 });
      currentMonthDate.setMonth(currentMonthDate.getMonth() + 1);
    }

    contracts.unshift({
      clientCode: clientCodeToUse,
      id: contractId,
      invoiceDate: dt.full,
      rawDate: dt.date,
      time: dt.time,
      customerName,
      customerPhone,
      nationalId: (nationalId !== '--') ? nationalId : (existingClient?.nationalId || '--'),
      guarantorName: (guarantorName !== '--') ? guarantorName : (existingClient?.guarantorName || '--'),
      guarantorPhone: (guarantorPhone !== '--') ? guarantorPhone : (existingClient?.guarantorPhone || '--'),
      guarantorNationalId: (guarantorNationalId !== '--') ? guarantorNationalId : (existingClient?.guarantorNationalId || '--'),
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
      date: dt.full,
      rawDate: dt.date,
      time: dt.time,
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
    renderCustomersDirectory();
    showToast(`تم حفظ عقد التقسيط للعميل (${customerName}) كود (#${clientCodeToUse}) بنجاح`, 'success');
  }
}

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
          <button onclick="openCustomerProfileModal('${cl.customerPhone}')" class="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-
