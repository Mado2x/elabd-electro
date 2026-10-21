// ==========================================
// المحرك التشغيلي (app.js) - الجزء الأول
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
  const isAuth = sessionStorage.getItem(STORAGE_KEY_AUTH_SESSION);
  // لا نثق بجلسة قديمة محفوظة بشكل دائم من الإصدارات السابقة.
  localStorage.removeItem(STORAGE_KEY_AUTH_SESSION);
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

  if (enteredUser === correctUser && enteredPass === correctPass) {
    sessionStorage.setItem(STORAGE_KEY_AUTH_SESSION, 'true');
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
    sessionStorage.removeItem(STORAGE_KEY_AUTH_SESSION);
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
    if (pInput) pInput.value = ''; // لا نعرض كلمة المرور الحالية داخل النموذج
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
  if (newU.length < 3 || newP.length < 8) {
    alert('اسم المستخدم يجب أن يكون 3 أحرف على الأقل وكلمة المرور 8 أحرف على الأقل.');
    return;
  }

  localStorage.setItem(STORAGE_KEY_SYSTEM_USERNAME, newU);
  localStorage.setItem(STORAGE_KEY_OWNER_PIN, newP);
  closeModal('changeCredentialsModal');
  showToast('تم تحديث بيانات الدخول بنجاح ✔', 'success');
}

function openForgotPasswordPrompt() {
  alert('لا يوجد رمز استعادة عام في هذا الإصدار حفاظًا على بيانات المعرض. إذا كنت مسجل الدخول، غيّر بياناتك من إعدادات المالك. إذا نسيت كلمة المرور تمامًا، لا تمسح بيانات المتصفح حتى لا تفقد بيانات المعرض؛ يلزم استرداد آمن من نسخة احتياطية.');
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
  const isError = msg.includes('يرجى') || msg.includes('عفواً') || msg.includes('أكبر') || msg.includes('تعذر') || msg.includes('خطأ') || msg.includes('فشل');
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
        } else if (enteredPin !== currentPin) {
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
    if (entered === currentPin) {
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
    // لا نخصم من صنف عشوائي إذا كان الاسم مكررًا عند أكثر من مورد.
    return byExactName.length === 1 ? byExactName[0] : null;
  };

  sales.forEach(sale => {
    if (Array.isArray(sale.items) && sale.items.length) {
      sale.items.forEach(soldItm => {
        const itemEntry = findInventoryItem(soldItm);
        if (itemEntry) itemEntry.currentQty -= Math.max(0, parseInt(soldItm.qty, 10) || 1);
      });
    } else {
      // سجل قديم: نستخدم اسمًا مطابقًا بالكامل فقط، وليس includes، لتجنب خصم صنف مشابه.
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
