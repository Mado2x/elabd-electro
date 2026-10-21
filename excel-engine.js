// ==========================================
// محرك الإكسيل - معرض أولاد العبد
// تصدير كامل + استيراد متحقق منه مع نسخة احتياطية قبل التغيير
// ==========================================

function localDateString() {
  if (typeof getFormattedDateTimeNow === 'function') return getFormattedDateTimeNow().date;
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

function exportCurrentDatabaseToExcel(downloadTriggeredByUser = false) {
  try {
    if (!window.XLSX) throw new Error('مكتبة Excel غير محملة');
    const wb = XLSX.utils.book_new();
    const addSheet = (name, rows, headers = []) => {
      const ws = rows.length ? XLSX.utils.json_to_sheet(rows) : XLSX.utils.aoa_to_sheet([headers]);
      XLSX.utils.book_append_sheet(wb, ws, name);
    };

    const contracts = getStoredContracts();
    addSheet('الأقساط والعملاء', contracts.map(c => ({
      'كود العميل': c.clientCode ?? '', 'معرف العقد': c.id ?? '', 'اسم العميل': c.customerName ?? '',
      'هاتف العميل': c.customerPhone ?? '', 'الرقم القومي للعميل': c.nationalId ?? '',
      'اسم الضامن': c.guarantorName ?? '', 'هاتف الضامن': c.guarantorPhone ?? '',
      'الرقم القومي للضامن': c.guarantorNationalId ?? '', 'الأجهزة': c.deviceName ?? '',
      'إجمالي العقد بالفوائد': Number(c.totalWithInterest) || 0, 'المسدد': Number(c.paidAmount) || 0,
      'المتبقي المطلوب': Number(c.remainingAmount) || 0, 'القسط الشهري': Number(c.monthlyAmount) || 0,
      'مدة التقسيط (شهور)': Number(c.months) || 0, 'نسبة الفائدة %': Number(c.interestRate) || 0,
      'تاريخ الفاتورة': c.invoiceDate || c.startDate || '',
      // الحفاظ على تفاصيل الأقساط عند التصدير ثم إعادة الاستيراد
      'تفاصيل الأقساط JSON': JSON.stringify(Array.isArray(c.installments) ? c.installments : [])
    })), ['كود العميل','معرف العقد','اسم العميل','هاتف العميل','الأجهزة','إجمالي العقد بالفوائد','المسدد','المتبقي المطلوب']);

    const inventory = buildDynamicInventory();
    addSheet('المخزن والأرصدة', inventory.map(i => ({
      'معرف الصنف': i.itemId ?? '', 'اسم الجهاز': i.name ?? '', 'الباركود': i.barcode ?? '',
      'المورد': i.supplierName ?? '', 'الرصيد المتاح بالمخزن': Number(i.currentQty) || 0,
      'سعر الشراء (ج.م)': Number(i.buyPrice) || 0, 'سعر الكاش المعتمد (ج.م)': Number(i.cashPrice) || 0,
      'إجمالي رأس مال الصنف': (Number(i.currentQty) || 0) * (Number(i.buyPrice) || 0)
    })), ['معرف الصنف','اسم الجهاز','الباركود','المورد','الرصيد المتاح بالمخزن','سعر الشراء (ج.م)','سعر الكاش المعتمد (ج.م)']);

    const sales = getStoredSales();
    addSheet('سجل المبيعات', sales.map(s => ({
      'رقم الفاتورة': s.id ?? '', 'التاريخ': s.date ?? '', 'العميل': s.customerName ?? '',
      'الهاتف': s.customerPhone ?? '', 'الأصناف المباعة': s.deviceName ?? '', 'نوع الفاتورة': s.type ?? '',
      'العدد': Number(s.quantity) || 0, 'إجمالي القيمة': Number(s.totalPrice) || 0,
      'المدفوع فوراً': Number(s.paidImmediately) || 0, 'تفاصيل الأصناف JSON': JSON.stringify(Array.isArray(s.items) ? s.items : [])
    })), ['رقم الفاتورة','التاريخ','العميل','الأصناف المباعة','العدد','إجمالي القيمة','المدفوع فوراً']);

    const supplierRows = [];
    getDetailedSuppliers().forEach(sup => (sup.items || []).forEach(it => supplierRows.push({
      'كود المورد': sup.id ?? '', 'اسم المورد': sup.name ?? '', 'هاتف المورد': sup.phone ?? '',
      'العنوان': sup.address ?? '', 'تاريخ التوريد': it.date ?? '', 'معرف الصنف': it.id ?? '',
      'الصنف': it.name ?? '', 'الباركود': it.barcode ?? '', 'الكمية الموردة': Number(it.qty) || 0,
      'سعر شراء القطعة': Number(it.unitPrice) || 0, 'إجمالي الفاتورة': Number(it.total) || 0,
      'المسدد له': Number(it.paid) || 0, 'المتبقي له في ذمتنا': Number(it.remaining) || 0
    })));
    addSheet('الموردين والمشتريات', supplierRows, ['كود المورد','اسم المورد','هاتف المورد','العنوان','تاريخ التوريد','معرف الصنف','الصنف','الباركود','الكمية الموردة','سعر شراء القطعة','إجمالي الفاتورة','المسدد له','المتبقي له في ذمتنا']);

    const expenses = getStoredExpenses();
    addSheet('المصاريف والهوالك', expenses.map(e => ({
      'معرف المصروف': e.id ?? '', 'التاريخ': e.date ?? '', 'بند المصروف': e.title ?? '',
      'التصنيف': e.category ?? '', 'المبلغ (ج.م)': Number(e.amount) || 0, 'ملاحظات': e.notes ?? ''
    })), ['معرف المصروف','التاريخ','بند المصروف','التصنيف','المبلغ (ج.م)','ملاحظات']);

    XLSX.writeFile(wb, `معرض_أولاد_العبد_قاعدة_بيانات_${localDateString()}.xlsx`);
    if (downloadTriggeredByUser) alert('تم تصدير قاعدة البيانات إلى Excel بنجاح.');
  } catch (err) {
    console.error('Excel Export Error:', err);
    alert('تعذر تصدير ملف Excel. تأكد من تحميل مكتبة Excel ثم حاول مرة أخرى.');
  }
}

function excelCell(row, key, fallback = '') {
  const value = row ? row[key] : undefined;
  return value === undefined || value === null ? fallback : value;
}
function excelNumber(value, fallback = 0) {
  if (value === '' || value === null || value === undefined) return fallback;
  const n = Number(value);
  return Number.isFinite(n) ? n : fallback;
}
function excelString(value) { return value === null || value === undefined ? '' : String(value).trim(); }
function safeJsonArray(value) {
  if (!value) return [];
  try { const parsed = JSON.parse(String(value)); return Array.isArray(parsed) ? parsed : []; } catch (_) { return []; }
}
function downloadImportSafetyBackup() {
  // نسخة JSON من بيانات النظام الحالية قبل الاستيراد؛ لا تتضمن جلسة الدخول.
  const keys = [
    'elabd_clean_suppliers_v6','elabd_clean_prices_v6','elabd_clean_sales_v6',
    'elabd_clean_contracts_v6','elabd_clean_expenses_v6','elabd_shifts_archive_v6','elabd_promo_template_v6'
  ];
  const snapshot = { schemaVersion: 1, exportedAt: new Date().toISOString(), data: {} };
  keys.forEach(key => { const value = localStorage.getItem(key); if (value !== null) snapshot.data[key] = value; });
  const blob = new Blob([JSON.stringify(snapshot, null, 2)], { type: 'application/json;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a'); a.href = url; a.download = `نسخة_قبل_استيراد_Excel_${localDateString()}.json`;
  document.body.appendChild(a); a.click(); a.remove(); URL.revokeObjectURL(url);
}

function importDatabaseFromExcelFile(event) {
  const input = event && event.target;
  const file = input && input.files && input.files[0];
  if (!file) return;
  const resetInput = () => { if (input) input.value = ''; };
  if (!/\.(xlsx|xls)$/i.test(file.name)) { alert('يرجى اختيار ملف Excel بصيغة XLSX أو XLS.'); resetInput(); return; }
  if (!window.XLSX) { alert('تعذر استيراد الملف لأن مكتبة Excel غير محملة.'); resetInput(); return; }
  if (!confirm('تنبيه: سيتم استبدال البيانات الموجودة فقط للشيتات التي تحتوي على صفوف صالحة. سيتم تنزيل نسخة احتياطية قبل التعديل. هل تريد المتابعة؟')) { resetInput(); return; }

  const reader = new FileReader();
  reader.onerror = () => { alert('تعذر قراءة الملف المحدد.'); resetInput(); };
  reader.onload = function(e) {
    try {
      const workbook = XLSX.read(new Uint8Array(e.target.result), { type: 'array' });
      const sheetRows = name => workbook.Sheets[name] ? XLSX.utils.sheet_to_json(workbook.Sheets[name], { defval: '' }) : null;
      const rawContracts = sheetRows('الأقساط والعملاء');
      const rawExpenses = sheetRows('المصاريف والهوالك');
      const rawSuppliers = sheetRows('الموردين والمشتريات');
      const rawSales = sheetRows('سجل المبيعات');
      const hasAnyRows = [rawContracts, rawExpenses, rawSuppliers, rawSales].some(rows => rows && rows.length);
      if (!hasAnyRows) throw new Error('لم يتم العثور على صفوف بيانات قابلة للاستيراد في الشيتات المدعومة.');

      const parsedContracts = rawContracts && rawContracts.length ? rawContracts.filter(r => excelString(excelCell(r, 'اسم العميل')) || excelString(excelCell(r, 'الأجهزة'))).map((r, idx) => {
        const paid = excelNumber(excelCell(r, 'المسدد'));
        const remaining = excelNumber(excelCell(r, 'المتبقي المطلوب'));
        return {
          clientCode: excelCell(r, 'كود العميل', idx + 1), id: excelString(excelCell(r, 'معرف العقد')) || `CNT-IMP-${Date.now()}-${idx}`,
          invoiceDate: excelString(excelCell(r, 'تاريخ الفاتورة')) || localDateString(),
          customerName: excelString(excelCell(r, 'اسم العميل')), customerPhone: excelString(excelCell(r, 'هاتف العميل')),
          nationalId: excelString(excelCell(r, 'الرقم القومي للعميل')), guarantorName: excelString(excelCell(r, 'اسم الضامن')),
          guarantorPhone: excelString(excelCell(r, 'هاتف الضامن')), guarantorNationalId: excelString(excelCell(r, 'الرقم القومي للضامن')),
          deviceName: excelString(excelCell(r, 'الأجهزة')), rawDeviceName: excelString(excelCell(r, 'الأجهزة')),
          serialNumber: 'SN-EXCEL', quantity: 1, cashPrice: paid + remaining, downPayment: 0,
          months: Math.max(1, parseInt(excelCell(r, 'مدة التقسيط (شهور)'), 10) || 12),
          interestRate: excelNumber(excelCell(r, 'نسبة الفائدة %'), 15),
          totalWithInterest: excelNumber(excelCell(r, 'إجمالي العقد بالفوائد'), paid + remaining),
          monthlyAmount: excelNumber(excelCell(r, 'القسط الشهري')), paidAmount: paid, remainingAmount: remaining,
          startDate: excelString(excelCell(r, 'تاريخ الفاتورة')) || localDateString(),
          installments: safeJsonArray(excelCell(r, 'تفاصيل الأقساط JSON'))
        };
      }) : null;

      const parsedExpenses = rawExpenses && rawExpenses.length ? rawExpenses.filter(r => excelString(excelCell(r, 'بند المصروف'))).map((r, idx) => ({
        id: excelString(excelCell(r, 'معرف المصروف')) || `EXP-IMP-${Date.now()}-${idx}`,
        date: excelString(excelCell(r, 'التاريخ')) || localDateString(), title: excelString(excelCell(r, 'بند المصروف')),
        category: excelString(excelCell(r, 'التصنيف')) || 'عام', amount: Math.max(0, excelNumber(excelCell(r, 'المبلغ (ج.م)'))),
        notes: excelString(excelCell(r, 'ملاحظات'))
      })) : null;

      let parsedSuppliers = null;
      if (rawSuppliers && rawSuppliers.length) {
        const map = new Map();
        rawSuppliers.filter(r => excelString(excelCell(r, 'اسم المورد')) && excelString(excelCell(r, 'الصنف'))).forEach((r, idx) => {
          const supplierId = excelString(excelCell(r, 'كود المورد')) || `SUP-IMP-${idx}`;
          if (!map.has(supplierId)) map.set(supplierId, { id: supplierId, name: excelString(excelCell(r, 'اسم المورد')), phone: excelString(excelCell(r, 'هاتف المورد')), address: excelString(excelCell(r, 'العنوان')), items: [] });
          map.get(supplierId).items.push({
            id: excelString(excelCell(r, 'معرف الصنف')) || `ITEM-IMP-${Date.now()}-${idx}`,
            date: excelString(excelCell(r, 'تاريخ التوريد')) || localDateString(), name: excelString(excelCell(r, 'الصنف')),
            barcode: excelString(excelCell(r, 'الباركود')), qty: Math.max(0, parseInt(excelCell(r, 'الكمية الموردة'), 10) || 0),
            unitPrice: Math.max(0, excelNumber(excelCell(r, 'سعر شراء القطعة'))),
            total: Math.max(0, excelNumber(excelCell(r, 'إجمالي الفاتورة'))),
            paid: Math.max(0, excelNumber(excelCell(r, 'المسدد له'))),
            remaining: Math.max(0, excelNumber(excelCell(r, 'المتبقي له في ذمتنا')))
          });
        });
        parsedSuppliers = Array.from(map.values());
      }

      const parsedSales = rawSales && rawSales.length ? rawSales.filter(r => excelString(excelCell(r, 'رقم الفاتورة')) || excelString(excelCell(r, 'الأصناف المباعة'))).map((r, idx) => ({
        id: excelString(excelCell(r, 'رقم الفاتورة')) || `SALE-IMP-${Date.now()}-${idx}`,
        date: excelString(excelCell(r, 'التاريخ')) || localDateString(), customerName: excelString(excelCell(r, 'العميل')),
        customerPhone: excelString(excelCell(r, 'الهاتف')), deviceName: excelString(excelCell(r, 'الأصناف المباعة')),
        type: excelString(excelCell(r, 'نوع الفاتورة')), quantity: Math.max(0, parseInt(excelCell(r, 'العدد'), 10) || 0),
        totalPrice: Math.max(0, excelNumber(excelCell(r, 'إجمالي القيمة'))), paidImmediately: Math.max(0, excelNumber(excelCell(r, 'المدفوع فوراً'))),
        items: safeJsonArray(excelCell(r, 'تفاصيل الأصناف JSON'))
      })) : null;

      const summary = [];
      if (parsedContracts) summary.push(`العقود: ${parsedContracts.length}`);
      if (parsedExpenses) summary.push(`المصروفات: ${parsedExpenses.length}`);
      if (parsedSuppliers) summary.push(`الموردون: ${parsedSuppliers.length}`);
      if (parsedSales) summary.push(`فواتير المبيعات: ${parsedSales.length}`);
      if (!confirm(`تمت قراءة البيانات التالية:\n${summary.join('\n')}\n\nسيتم استبدال بيانات هذه الأقسام فقط، أما الشيتات غير الموجودة أو الفارغة فستبقى كما هي. هل تؤكد الاستيراد؟`)) { resetInput(); return; }

      downloadImportSafetyBackup();
      if (parsedContracts) setStoredContracts(parsedContracts);
      if (parsedExpenses) setStoredExpenses(parsedExpenses);
      if (parsedSuppliers) setDetailedSuppliers(parsedSuppliers);
      if (parsedSales) setStoredSales(parsedSales);
      // أسعار البيع من شيت المخزن إن وجد؛ لا نعيد بناء أسعار من بيانات غير موجودة.
      const inventoryRows = sheetRows('المخزن والأرصدة');
      if (inventoryRows && inventoryRows.length) {
        const prices = getSellingPrices();
        inventoryRows.forEach(r => { const name = excelString(excelCell(r, 'اسم الجهاز')); if (name) prices[name] = Math.max(0, excelNumber(excelCell(r, 'سعر الكاش المعتمد (ج.م)'))); });
        setSellingPrices(prices);
      }
      alert('تم استيراد البيانات بنجاح، وتم تنزيل نسخة احتياطية قبل التعديل.');
      location.reload();
    } catch (err) {
      console.error('Excel Import Error:', err);
      alert(`تعذر استيراد الملف: ${err && err.message ? err.message : 'تحقق من أسماء الشيتات والأعمدة.'}`);
    } finally {
      resetInput();
    }
  };
  reader.readAsArrayBuffer(file);
}
