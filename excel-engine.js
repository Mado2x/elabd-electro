// ==========================================
// محرك الإكسيل المستقل لمعرض أولاد العبد
// ==========================================

// تصدير قاعدة البيانات بالكامل إلى ملف إكسيل بـ 5 شيتات
function exportCurrentDatabaseToExcel(downloadTriggeredByUser = false) {
  try {
    const wb = XLSX.utils.book_new();

    // 1. شيت الأقساط والعملاء والضامنين
    const contracts = getStoredContracts();
    const contractsRows = contracts.map(c => ({
      "كود العميل": c.clientCode,
      "اسم العميل": c.customerName,
      "هاتف العميل": c.customerPhone,
      "الرقم القومي للعميل": c.nationalId || "--",
      "اسم الضامن": c.guarantorName || "--",
      "هاتف الضامن": c.guarantorPhone || "--",
      "الرقم القومي للضامن": c.guarantorNationalId || "--",
      "الأجهزة": c.deviceName,
      "إجمالي العقد بالفوائد": c.totalWithInterest,
      "المسدد": c.paidAmount,
      "المتبقي المطلوب": c.remainingAmount,
      "القسط الشهري": c.monthlyAmount,
      "مدة التقسيط (شهور)": c.months,
      "نسبة الفائدة %": c.interestRate,
      "تاريخ الفاتورة": c.invoiceDate || c.startDate
    }));
    XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(contractsRows), "الأقساط والعملاء");

    // 2. شيت المخزن والأرصدة
    const inventory = buildDynamicInventory();
    const inventoryRows = inventory.map(i => ({
      "اسم الجهاز": i.name,
      "الباركود": i.barcode,
      "المورد": i.supplierName,
      "الرصيد المتاح بالمخزن": i.currentQty,
      "سعر الشراء (ج.م)": i.buyPrice,
      "سعر الكاش المعتمد (ج.م)": i.cashPrice,
      "إجمالي رأس مال الصنف": i.currentQty * i.buyPrice
    }));
    XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(inventoryRows), "المخزن والأرصدة");

    // 3. شيت فواتير المبيعات
    const sales = getStoredSales();
    const salesRows = sales.map(s => ({
      "رقم الفاتورة": s.id,
      "التاريخ": s.date,
      "العميل": s.customerName,
      "الهاتف": s.customerPhone,
      "الأصناف المباعة": s.deviceName,
      "نوع الفاتورة": s.type,
      "العدد": s.quantity,
      "إجمالي القيمة": s.totalPrice,
      "المدفوع فوراً": s.paidImmediately
    }));
    XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(salesRows), "سجل المبيعات");

    // 4. شيت الموردين
    const suppliers = getDetailedSuppliers();
    const suppliersRows = [];
    suppliers.forEach(sup => {
      (sup.items || []).forEach(it => {
        suppliersRows.push({
          "كود المورد": sup.id,
          "اسم المورد": sup.name,
          "هاتف المورد": sup.phone,
          "العنوان": sup.address || "--",
          "تاريخ التوريد": it.date,
          "الصنف": it.name,
          "الباركود": it.barcode || "--",
          "الكمية الموردة": it.qty,
          "سعر شراء القطعة": it.unitPrice,
          "إجمالي الفاتورة": it.total,
          "المسدد له": it.paid,
          "المتبقي له في ذمتنا": it.remaining
        });
      });
    });
    XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(suppliersRows), "الموردين والمشتريات");

    // 5. شيت المصاريف الخارجية
    const expenses = getStoredExpenses();
    const expensesRows = expenses.map(e => ({
      "التاريخ": e.date,
      "بند المصروف": e.title,
      "التصنيف": e.category,
      "المبلغ (ج.م)": e.amount,
      "ملاحظات": e.notes || "--"
    }));
    XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(expensesRows), "المصاريف والهوالك");

    const todayStr = new Date().toISOString().split('T')[0];
    XLSX.writeFile(wb, `معرض_أولاد_العبد_قاعدة_بيانات_${todayStr}.xlsx`);

    if (downloadTriggeredByUser) {
      alert("تم بنجاح تصدير وتنزيل أحدث شيت إكسيل لكافة حسابات المعرض!");
    }
  } catch (err) {
    console.error("Excel Export Error:", err);
  }
}

// قراءة واستيراد البيانات من شيت إكسيل إلى السيستم
function importDatabaseFromExcelFile(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function(e) {
    try {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });

      // قراءة شيت الأقساط
      if (workbook.Sheets["الأقساط والعملاء"]) {
        const rawContracts = XLSX.utils.sheet_to_json(workbook.Sheets["الأقساط والعملاء"]);
        if (rawContracts.length > 0) {
          const parsedContracts = rawContracts.map((r, idx) => ({
            clientCode: r["كود العميل"] || (idx + 1),
            id: 'CNT-' + (100 + idx + 1),
            invoiceDate: r["تاريخ الفاتورة"] || new Date().toISOString().split('T')[0],
            customerName: r["اسم العميل"],
            customerPhone: r["هاتف العميل"].toString(),
            nationalId: r["الرقم القومي للعميل"] || "--",
            guarantorName: r["اسم الضامن"] || "--",
            guarantorPhone: r["هاتف الضامن"] ? r["هاتف الضامن"].toString() : "--",
            guarantorNationalId: r["الرقم القومي للضامن"] || "--",
            deviceName: r["الأجهزة"],
            rawDeviceName: r["الأجهزة"],
            serialNumber: 'SN-EXCEL',
            quantity: 1,
            cashPrice: parseFloat(r["المسدد"]) + parseFloat(r["المتبقي المطلوب"]),
            downPayment: 0,
            months: parseInt(r["مدة التقسيط (شهور)"]) || 12,
            interestRate: parseFloat(r["نسبة الفائدة %"]) || 15,
            totalWithInterest: parseFloat(r["إجمالي العقد بالفوائد"]) || 0,
            monthlyAmount: parseFloat(r["القسط الشهري"]) || 0,
            paidAmount: parseFloat(r["المسدد"]) || 0,
            remainingAmount: parseFloat(r["المتبقي المطلوب"]) || 0,
            startDate: r["تاريخ الفاتورة"] || new Date().toISOString().split('T')[0],
            installments: []
          }));
          setStoredContracts(parsedContracts);
        }
      }

      // قراءة شيت المصاريف
      if (workbook.Sheets["المصاريف والهوالك"]) {
        const rawExpenses = XLSX.utils.sheet_to_json(workbook.Sheets["المصاريف والهوالك"]);
        if (rawExpenses.length > 0) {
          const parsedExpenses = rawExpenses.map((e, idx) => ({
            id: 'EXP-' + (idx + 1),
            date: e["التاريخ"] || new Date().toISOString().split('T')[0],
            title: e["بند المصروف"],
            category: e["التصنيف"] || "عام",
            amount: parseFloat(e["المبلغ (ج.م)"]) || 0,
            notes: e["ملاحظات"] || "--"
          }));
          setStoredExpenses(parsedExpenses);
        }
      }

      alert("تم بنجاح تحميل وتحديث كافة البيانات من ملف الإكسيل!");
      location.reload();
    } catch (err) {
      alert("حدث خطأ أثناء قراءة ملف الإكسيل. تأكد من سلامة أعمدة الشيت.");
    }
  };
  reader.readAsArrayBuffer(file);
}
