    <!-- VIEW 6: فواتير البيع -->
    <section id="view-sales" class="hidden space-y-4">
      <div class="glass-card border border-slate-200 dark:border-slate-800/90 rounded-3xl p-4 md:p-5 space-y-4 shadow-xl">
        <div class="flex justify-between items-center border-b border-slate-200 dark:border-slate-800 pb-3">
          <h3 class="text-sm md:text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <i class="fa-solid fa-receipt text-blue-600 dark:text-cyan-400"></i> فواتير المبيعات المسجلة
          </h3>
          <button onclick="openModal('newSaleModal')" class="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:brightness-110 text-white rounded-2xl text-xs font-bold transition shadow flex items-center gap-2">
            <i class="fa-solid fa-plus"></i> فاتورة بيع جديدة
          </button>
        </div>
        <div class="overflow-x-auto border border-slate-200 dark:border-slate-800 rounded-2xl custom-scrollbar">
          <table class="w-full text-right text-xs">
            <thead class="bg-slate-100 dark:bg-slate-900/90 text-slate-600 dark:text-slate-400 border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th class="p-3">رقم الفاتورة</th>
                <th class="p-3">التاريخ والوقت</th>
                <th class="p-3">العميل</th>
                <th class="p-3">الأجهزة المباعة</th>
                <th class="p-3">النوع</th>
                <th class="p-3">الإجمالي</th>
                <th class="p-3 text-emerald-600 dark:text-emerald-400">المدفوع فوراً</th>
                <th class="p-3 text-center">إجراءات</th>
              </tr>
            </thead>
            <tbody id="salesInvoicesTableBody" class="divide-y divide-slate-200 dark:divide-slate-800 text-slate-700 dark:text-slate-300"></tbody>
          </table>
        </div>
      </div>
    </section>

    <!-- VIEW 7: المصاريف -->
    <section id="view-expenses" class="hidden space-y-4">
      <div class="glass-card border border-slate-200 dark:border-slate-800/90 rounded-3xl p-4 md:p-5 space-y-4 shadow-xl">
        <div class="flex justify-between items-center border-b border-slate-200 dark:border-slate-800 pb-3">
          <div>
            <h3 class="text-sm md:text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <i class="fa-solid fa-money-bill-transfer text-rose-500 dark:text-rose-400"></i> سجل المصاريف والنثريات والشحن
            </h3>
            <p class="text-xs text-slate-500 dark:text-slate-400 mt-0.5">تسجيل نولون السيارات، الشحن، البوفيه، ومصاريف المعرض التشغيلية.</p>
          </div>
          <button onclick="openModal('addExpenseModal')" class="px-4 py-2 bg-gradient-to-r from-rose-600 to-pink-600 hover:brightness-110 text-white rounded-2xl text-xs font-bold transition shadow flex items-center gap-2">
            <i class="fa-solid fa-plus"></i> تسجيل مصروف جديد
          </button>
        </div>
        <div class="overflow-x-auto border border-slate-200 dark:border-slate-800 rounded-2xl custom-scrollbar">
          <table class="w-full text-right text-xs">
            <thead class="bg-slate-100 dark:bg-slate-900/90 text-slate-600 dark:text-slate-400 border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th class="p-3">التاريخ والوقت</th>
                <th class="p-3">بند المصروف</th>
                <th class="p-3">التصنيف</th>
                <th class="p-3 text-rose-600 dark:text-rose-400">المبلغ</th>
                <th class="p-3">ملاحظات</th>
                <th class="p-3 text-center">حذف</th>
              </tr>
            </thead>
            <tbody id="expensesTableBody" class="divide-y divide-slate-200 dark:divide-slate-800 text-slate-700 dark:text-slate-300"></tbody>
          </table>
        </div>
      </div>
    </section>

    <!-- VIEW 8: دليل العملاء وحملات الدعاية والواتساب -->
    <section id="view-customers" class="hidden space-y-4">
      <div class="glass-card border border-slate-200 dark:border-slate-800/90 rounded-3xl p-4 md:p-5 space-y-4 shadow-xl">
        <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-slate-200 dark:border-slate-800 pb-3">
          <div>
            <h3 class="text-sm md:text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <i class="fa-solid fa-bullhorn text-emerald-500"></i> قاعدة بيانات العملاء والعروض الترويجية
            </h3>
            <p class="text-xs text-slate-500 dark:text-slate-400 mt-1">تواصل مع عملائك وابعت أحدث عروض وأجهزة المعرض عبر واتساب.</p>
          </div>
          <button onclick="openBroadcastPromoModal()" class="px-4 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-2xl text-xs font-bold flex items-center gap-2 shadow-lg shadow-emerald-600/30">
            <i class="fa-brands fa-whatsapp text-sm"></i> كتابة رسالة عروض جماعية
          </button>
        </div>

        <div>
          <input type="text" id="customersSearchInput" oninput="renderCustomersDirectory()" placeholder="بحث باسم العميل أو رقم الهاتف..." class="w-full bg-slate-50 dark:bg-[#0b101e] border border-slate-200 dark:border-slate-800 rounded-2xl p-3 text-xs text-slate-900 dark:text-white outline-none focus:border-emerald-500 transition">
        </div>

        <div class="overflow-x-auto border border-slate-200 dark:border-slate-800 rounded-2xl custom-scrollbar">
          <table class="w-full text-right text-xs">
            <thead class="bg-slate-100 dark:bg-slate-900/90 text-slate-600 dark:text-slate-400 border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th class="p-3">كود</th>
                <th class="p-3">اسم العميل</th>
                <th class="p-3">رقم الهاتف</th>
                <th class="p-3">نوع التعامل</th>
                <th class="p-3">إجمالي المسحوبات</th>
                <th class="p-3 text-center">إرسال عرض ترويجي</th>
              </tr>
            </thead>
            <tbody id="customersDirectoryTableBody" class="divide-y divide-slate-200 dark:divide-slate-800 text-slate-700 dark:text-slate-300"></tbody>
          </table>
        </div>
      </div>
    </section>

    <!-- VIEW 9: أرشيف تقفيلات الوردية والدرج -->
    <section id="view-shifts-archive" class="hidden space-y-4">
      <div class="glass-card border border-slate-200 dark:border-slate-800/90 rounded-3xl p-4 md:p-5 space-y-4 shadow-xl">
        <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-slate-200 dark:border-slate-800 pb-3">
          <div>
            <h3 class="text-sm md:text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <i class="fa-solid fa-vault text-blue-500"></i> أرشيف تقفيلات الوردية وحركة الدرج اليومية
            </h3>
            <p class="text-xs text-slate-500 dark:text-slate-400 mt-1">مراجعة تاريخية للدرج اليومي، الشهري، والسنوي مع الأوقات الدقيقة.</p>
          </div>
          <button onclick="exportShiftsArchiveToExcel()" class="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-2xl text-xs font-bold flex items-center gap-1.5 shadow">
            <i class="fa-solid fa-file-excel"></i> تصدير إكسيل
          </button>
        </div>

        <div class="grid grid-cols-2 md:grid-cols-3 gap-3 text-center text-xs">
          <div class="p-3 bg-slate-50 dark:bg-[#0b101e] rounded-2xl border border-slate-200 dark:border-slate-800">
            <span class="text-[10px] text-slate-500 block">إجمالي صافي الورديات المودعة</span>
            <b id="archiveTotalNetCash" class="text-base font-black text-emerald-600 dark:text-emerald-400 mt-1 block">0 ج.م</b>
          </div>
          <div class="p-3 bg-slate-50 dark:bg-[#0b101e] rounded-2xl border border-slate-200 dark:border-slate-800">
            <span class="text-[10px] text-slate-500 block">عدد الورديات المقفلة</span>
            <b id="archiveTotalShiftsCount" class="text-base font-black text-blue-600 dark:text-cyan-400 mt-1 block">0 وردية</b>
          </div>
          <div class="col-span-2 md:col-span-1 p-3 bg-slate-50 dark:bg-[#0b101e] rounded-2xl border border-slate-200 dark:border-slate-800">
            <span class="text-[10px] text-slate-500 block">إجمالي المصاريف المخصومة</span>
            <b id="archiveTotalExpensesDeducted" class="text-base font-black text-rose-600 dark:text-rose-400 mt-1 block">0 ج.م</b>
          </div>
        </div>

        <div class="overflow-x-auto border border-slate-200 dark:border-slate-800 rounded-2xl custom-scrollbar">
          <table class="w-full text-right text-xs">
            <thead class="bg-slate-100 dark:bg-slate-900/90 text-slate-600 dark:text-slate-400 border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th class="p-3">رقم الوردية</th>
                <th class="p-3">التاريخ والوقت</th>
                <th class="p-3">كاش البيع المباشر</th>
                <th class="p-3">تحصيل الأقساط</th>
                <th class="p-3 text-rose-500">المصاريف</th>
                <th class="p-3 text-emerald-600 font-bold">الصافي الفعلي</th>
                <th class="p-3 text-center">إجراءات</th>
              </tr>
            </thead>
            <tbody id="shiftsArchiveTableBody" class="divide-y divide-slate-200 dark:divide-slate-800 text-slate-700 dark:text-slate-300"></tbody>
          </table>
        </div>
      </div>
    </section>

  </main>

  <!-- ========================================== -->
  <!-- النوافذ المنبثقة والطباعة -->
  <!-- ========================================== -->

  <!-- Modal: تقفيل الوردية اليومية (Z-Report) -->
  <div id="dailyShiftModal" class="fixed inset-0 bg-black/80 backdrop-blur-md z-50 hidden flex items-center justify-center p-3.5">
    <div class="bg-white dark:bg-[#0e1628] border border-slate-200 dark:border-slate-700/80 w-full max-w-md rounded-3xl p-5 shadow-2xl space-y-4">
      <div class="flex justify-between items-center border-b border-slate-200 dark:border-slate-800 pb-3">
        <h3 class="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-2">
          <i class="fa-solid fa-calculator text-blue-500"></i> تقفيل الوردية اليومية وحساب الدرج
        </h3>
        <button onclick="closeModal('dailyShiftModal')" class="text-slate-400 hover:text-slate-800 dark:hover:text-white p-1 rounded-xl"><i class="fa-solid fa-xmark"></i></button>
      </div>
      <div class="space-y-2.5 text-xs">
        <div class="p-3 bg-slate-50 dark:bg-[#080d19] rounded-2xl border border-slate-200 dark:border-slate-800 flex justify-between items-center">
          <span class="text-slate-600 dark:text-slate-400">كاش المبيعات المباشرة اليوم:</span>
          <b class="text-emerald-600 dark:text-emerald-400 text-sm font-bold" id="shiftTodaySalesCash">0 ج</b>
        </div>
        <div class="p-3 bg-slate-50 dark:bg-[#080d19] rounded-2xl border border-slate-200 dark:border-slate-800 flex justify-between items-center">
          <span class="text-slate-600 dark:text-slate-400">أقساط محصلة في الدرج اليوم:</span>
          <b class="text-emerald-600 dark:text-emerald-400 text-sm font-bold" id="shiftTodayInstCash">0 ج</b>
        </div>
        <div class="p-3 bg-slate-50 dark:bg-[#080d19] rounded-2xl border border-slate-200 dark:border-slate-800 flex justify-between items-center">
          <span class="text-slate-600 dark:text-slate-400">مصاريف ونولون خرجت اليوم:</span>
          <b class="text-rose-600 dark:text-rose-400 text-sm font-bold" id="shiftTodayExpenses">0 ج</b>
        </div>
        <div class="p-4 bg-blue-50 dark:bg-blue-950/40 rounded-2xl border border-blue-200 dark:border-blue-500/30 flex justify-between items-center">
          <div>
            <span class="block text-slate-500 dark:text-slate-400 text-[11px] font-semibold">الصافي الفعلي الواجب وجوده في الدرج:</span>
            <b class="text-xl font-black text-blue-700 dark:text-cyan-400 mt-0.5 block" id="shiftNetDrawerCash">0 ج.م</b>
          </div>
          <button onclick="printDailyShiftReport()" class="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow">
            طباعة تقرير 🖨️
          </button>
        </div>
      </div>
      <div class="flex gap-2 pt-2 border-t border-slate-200 dark:border-slate-800">
        <button onclick="closeDailyShiftAndArchive()" class="flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl text-xs font-bold shadow">
          حفظ إكسيل وتقفيل الوردية في الأرشيف
        </button>
        <button onclick="closeModal('dailyShiftModal')" class="px-5 py-2.5 bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-2xl text-xs font-bold">إلغاء</button>
      </div>
    </div>
  </div>

  <!-- منطقة الطباعة الحرارية للإيصالات (Thermal Printer 80mm) -->
  <div id="printableReceiptArea" class="hidden"></div>

  <!-- Modal 1: فاتورة بيع جديدة -->
  <div id="newSaleModal" class="fixed inset-0 bg-black/80 backdrop-blur-md z-50 hidden flex items-center justify-center p-3.5">
    <div class="bg-white dark:bg-[#0e1628] border border-slate-200 dark:border-slate-700/80 w-full max-w-2xl rounded-3xl p-5 shadow-2xl space-y-4 max-h-[92vh] overflow-y-auto custom-scrollbar">
      <div class="flex justify-between items-center border-b border-slate-200 dark:border-slate-800 pb-3">
        <h3 class="font-bold text-slate-900 dark:text-white text-base flex items-center gap-2.5">
          <span class="w-8 h-8 rounded-xl bg-blue-100 dark:bg-blue-600/20 text-blue-600 dark:text-blue-400 flex items-center justify-center text-sm"><i class="fa-solid fa-cart-plus"></i></span>
          إنشاء فاتورة بيع جديدة
        </h3>
        <button onclick="closeModal('newSaleModal')" class="text-slate-400 hover:text-slate-800 dark:hover:text-white p-1 rounded-xl transition">
          <i class="fa-solid fa-xmark text-lg"></i>
        </button>
      </div>

      <div>
        <label class="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">نظام البيع *</label>
        <select id="saleTypeSelect" onchange="toggleInstallmentFields()" class="w-full bg-slate-50 dark:bg-[#080d19] border border-slate-300 dark:border-slate-700 rounded-2xl p-3 text-slate-900 dark:text-white text-xs outline-none focus:border-blue-500 font-bold">
          <option value="cash" selected>بيع كاش</option>
          <option value="installment">بيع بالتقسيط</option>
        </select>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div>
          <label class="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">اسم العميل *</label>
          <input type="text" id="saleCustomerName" placeholder="مثال: محمود محمد" class="w-full bg-slate-50 dark:bg-[#080d19] border border-slate-300 dark:border-slate-800 rounded-2xl p-3 text-slate-900 dark:text-white text-xs outline-none focus:border-blue-500 transition">
        </div>
        <div>
          <label class="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">هاتف العميل *</label>
          <input type="tel" id="saleCustomerPhone" placeholder="010xxxxxxxx" class="w-full bg-slate-50 dark:bg-[#080d19] border border-slate-300 dark:border-slate-800 rounded-2xl p-3 text-slate-900 dark:text-white text-xs outline-none focus:border-blue-500 transition">
        </div>
      </div>

      <div id="guarantorAndNationalIdBox" class="space-y-3 bg-slate-100 dark:bg-slate-900/60 p-4 rounded-3xl border border-slate-200 dark:border-slate-800 hidden">
        <div>
          <label class="block text-xs font-semibold text-blue-600 dark:text-cyan-400 mb-1">الرقم القومي للعميل</label>
          <input type="text" id="saleCustomerNationalId" maxlength="14" placeholder="الرقم القومي للعميل (14 رقم)" class="w-full bg-white dark:bg-[#080d19] border border-slate-300 dark:border-slate-800 rounded-2xl p-2.5 text-slate-900 dark:text-white text-xs outline-none focus:border-cyan-500">
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-2.5">
          <div>
            <label class="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">اسم الضامن</label>
            <input type="text" id="saleGuarantorName" placeholder="الاسم رباعي" class="w-full bg-white dark:bg-[#080d19] border border-slate-300 dark:border-slate-800 rounded-2xl p-2.5 text-slate-900 dark:text-white text-xs outline-none focus:border-cyan-500">
          </div>
          <div>
            <label class="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">هاتف الضامن</label>
            <input type="tel" id="saleGuarantorPhone" placeholder="هاتف الضامن" class="w-full bg-white dark:bg-[#080d19] border border-slate-300 dark:border-slate-800 rounded-2xl p-2.5 text-slate-900 dark:text-white text-xs outline-none focus:border-cyan-500">
          </div>
          <div>
            <label class="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">الرقم القومي للضامن</label>
            <input type="text" id="saleGuarantorNationalId" maxlength="14" placeholder="14 رقم" class="w-full bg-white dark:bg-[#080d19] border border-slate-300 dark:border-slate-800 rounded-2xl p-2.5 text-slate-900 dark:text-white text-xs outline-none focus:border-cyan-500">
          </div>
        </div>
      </div>

      <!-- اختيار الجهاز من المخزن -->
      <div class="bg-slate-50 dark:bg-[#080d19] p-4 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-3.5 relative">
        <div class="relative">
          <label class="block text-xs font-semibold text-blue-600 dark:text-cyan-400 mb-1.5">ابحث عن صنف من المخزن *</label>
          <div class="relative">
            <input type="text" id="saleDeviceInput" oninput="handleDeviceSearchInput(this.value)" onfocus="handleDeviceSearchInput(this.value)" placeholder="اكتب حرف (ت، غ، ش...) للاختيار من المخزن..." autocomplete="off" class="w-full bg-white dark:bg-[#0e1628] border border-slate-300 dark:border-slate-700/80 rounded-2xl p-3 text-slate-900 dark:text-white text-xs outline-none focus:border-cyan-500 pr-10 transition">
            <span class="absolute right-3.5 top-3.5 text-slate-400"><i class="fa-solid fa-magnifying-glass"></i></span>
          </div>
          <div id="deviceSearchResultsList" class="absolute z-50 right-0 left-0 mt-1.5 bg-white dark:bg-[#0b101e] border border-slate-200 dark:border-slate-700 rounded-2xl shadow-2xl max-h-48 overflow-y-auto custom-scrollbar hidden"></div>
          <p id="selectedDeviceBadge" class="text-xs text-slate-500 dark:text-slate-400 mt-1"></p>
        </div>

        <div class="grid grid-cols-2 gap-2.5">
          <div>
            <label class="block text-xs text-slate-600 dark:text-slate-400 mb-1">الكمية المطلوبة</label>
            <input type="number" id="saleItemQtyInput" value="1" min="1" oninput="calculateInstallmentMath()" class="w-full bg-white dark:bg-[#0e1628] border border-slate-300 dark:border-slate-800 rounded-2xl p-2.5 text-slate-900 dark:text-white text-xs outline-none focus:border-cyan-500 text-center font-black">
          </div>
          <div>
            <label class="block text-xs text-slate-600 dark:text-slate-400 mb-1">سعر القطعة كاش (ج.م)</label>
            <input type="number" id="saleItemPriceInput" placeholder="0" class="w-full bg-white dark:bg-[#0e1628] border border-slate-300 dark:border-slate-800 rounded-2xl p-2.5 text-emerald-600 dark:text-emerald-400 text-xs outline-none focus:border-cyan-500 font-bold">
          </div>
        </div>

        <div>
          <label class="block text-xs text-slate-600 dark:text-slate-400 mb-1">السيريال نمبر للأجهزة (اختياري)</label>
          <div class="flex gap-2">
            <input type="text" id="saleItemSerialInput" placeholder="اكتب السيريال أو افحصه بالكاميرا" class="flex-1 bg-white dark:bg-[#0e1628] border border-slate-300 dark:border-slate-800 rounded-2xl p-2.5 text-slate-900 dark:text-white text-xs outline-none focus:border-cyan-500">
            <button type="button" onclick="openBarcodeScanner('saleItemSerialInput')" class="px-3.5 py-2.5 bg-slate-200 dark:bg-slate-800 text-blue-600 dark:text-cyan-400 rounded-2xl border border-slate-300 dark:border-slate-700 text-xs">
              <i class="fa-solid fa-camera"></i>
            </button>
          </div>
        </div>

        <button type="button" onclick="addItemToSaleCart()" class="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:brightness-110 text-white rounded-2xl text-xs font-bold shadow-lg shadow-blue-600/25 flex items-center justify-center gap-2 transition">
          <i class="fa-solid fa-plus"></i> إضافة الجهاز للسلة
        </button>
      </div>

      <!-- سلة الفاتورة -->
      <div class="overflow-x-auto border border-slate-200 dark:border-slate-800 rounded-2xl bg-slate-50 dark:bg-[#080d19]/60 custom-scrollbar">
        <table class="w-full text-right text-xs">
          <thead class="bg-slate-100 dark:bg-slate-900/80 text-slate-600 dark:text-slate-400 border-b border-slate-200 dark:border-slate-800">
            <tr>
              <th class="p-2.5">الجهاز</th>
              <th class="p-2.5">السيريال</th>
              <th class="p-2.5 text-center">العدد</th>
              <th class="p-2.5">السعر</th>
              <th class="p-2.5">الإجمالي</th>
              <th class="p-2.5 text-center">حذف</th>
            </tr>
          </thead>
          <tbody id="saleCartTbody" class="divide-y divide-slate-200 dark:divide-slate-800/80 text-slate-800 dark:text-slate-300">
            <tr><td colspan="6" class="p-4 text-center text-slate-400">السلة فارغة. اختر صنفاً من المخزن لإضافته.</td></tr>
          </tbody>
        </table>
      </div>

      <div class="flex justify-between items-center p-3 bg-slate-100 dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 text-xs">
        <span class="font-bold text-slate-700 dark:text-slate-300">إجمالي الأجهزة بالسلة:</span>
        <b id="saleCartGrandTotalDisplay" class="text-sm font-black text-emerald-600 dark:text-emerald-400">0 ج.م</b>
      </div>

      <!-- حقول التقسيط -->
      <div id="installmentFieldsBox" class="space-y-3 bg-blue-50 dark:bg-gradient-to-r dark:from-blue-950/30 dark:to-indigo-950/30 p-4 rounded-3xl border border-blue-200 dark:border-blue-500/20 hidden">
        <div class="grid grid-cols-2 gap-2.5">
          <div>
            <label class="block text-xs text-slate-700 dark:text-slate-300 mb-1">المقدم المدفوع (ج.م)</label>
            <input type="number" id="instDownPayment" value="0" oninput="calculateInstallmentMath()" class="w-full bg-white dark:bg-[#080d19] border border-slate-300 dark:border-slate-800 rounded-2xl p-2.5 text-emerald-600 dark:text-emerald-400 font-bold text-xs outline-none focus:border-blue-500">
          </div>
          <div>
            <label class="block text-xs text-slate-700 dark:text-slate-300 mb-1">مدة التقسيط (شهور)</label>
            <input type="number" id="instMonths" value="12" min="1" oninput="calculateInstallmentMath()" class="w-full bg-white dark:bg-[#080d19] border border-slate-300 dark:border-slate-800 rounded-2xl p-2.5 text-slate-900 dark:text-white font-bold text-xs outline-none focus:border-blue-500">
          </div>
        </div>

        <div class="grid grid-cols-2 gap-2.5">
          <div>
            <label class="block text-xs text-slate-700 dark:text-slate-300 mb-1">نسبة الفائدة السنوية (%)</label>
            <input type="number" id="instInterestRate" value="15" oninput="calculateInstallmentMath()" class="w-full bg-white dark:bg-[#080d19] border border-slate-300 dark:border-slate-800 rounded-2xl p-2.5 text-blue-600 dark:text-cyan-400 font-bold text-xs outline-none focus:border-blue-500">
          </div>
          <div>
            <label class="block text-xs text-slate-700 dark:text-slate-300 mb-1">تاريخ أول قسط</label>
            <input type="date" id="instStartDate" class="w-full bg-white dark:bg-[#080d19] border border-slate-300 dark:border-slate-800 rounded-2xl p-2.5 text-slate-900 dark:text-white text-xs outline-none focus:border-blue-500">
          </div>
        </div>

        <div class="p-3 bg-white dark:bg-slate-900/90 rounded-2xl border border-slate-200 dark:border-slate-800 flex justify-between items-center text-xs">
          <div>
            <span class="text-slate-500 dark:text-slate-400 block text-[10px]">إجمالي العقد بالفوائد:</span>
            <b id="instCalculatedTotal" class="text-slate-900 dark:text-white text-sm font-black">0 ج.م</b>
          </div>
          <div class="text-left">
            <span class="text-slate-500 dark:text-slate-400 block text-[10px]">القسط الشهري:</span>
            <b id="instCalculatedMonthly" class="text-blue-600 dark:text-cyan-400 text-sm font-black">0 ج / شهر</b>
          </div>
        </div>
      </div>

      <div class="flex gap-2.5 pt-2 border-t border-slate-200 dark:border-slate-800">
        <button type="button" onclick="handleSaveSaleInvoice()" class="flex-1 py-3 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-500 hover:brightness-110 text-white rounded-2xl text-xs font-black shadow-xl shadow-blue-600/30 transition">
          حفظ الفاتورة
        </button>
        <button type="button" onclick="closeModal('newSaleModal')" class="px-5 py-3 bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-2xl text-xs font-bold transition">
          إلغاء
        </button>
      </div>
    </div>
  </div>

  <!-- Modal 2: إضافة مورد جديد -->
  <div id="addNewSupplierProfileModal" class="fixed inset-0 bg-black/80 backdrop-blur-md z-50 hidden flex items-center justify-center p-3.5">
    <div class="bg-white dark:bg-[#0e1628] border border-slate-200 dark:border-slate-700/80 w-full max-w-md rounded-3xl p-5 shadow-2xl space-y-4">
      <div class="flex justify-between items-center border-b border-slate-200 dark:border-slate-800 pb-3">
        <h3 class="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-2.5">
          <span class="w-8 h-8 rounded-xl bg-purple-100 dark:bg-purple-600/20 text-purple-600 dark:text-purple-400 flex items-center justify-center text-sm"><i class="fa-solid fa-truck-ramp-box"></i></span>
          إضافة حساب مورد جديد
        </h3>
        <button onclick="closeModal('addNewSupplierProfileModal')" class="text-slate-400 hover:text-slate-800 dark:hover:text-white p-1 rounded-xl"><i class="fa-solid fa-xmark"></i></button>
      </div>
      <div class="space-y-3">
        <div>
          <label class="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">اسم المورد أو الشركة *</label>
          <input type="text" id="newSupNameInput" placeholder="مثال: شركة العربي جروب" class="w-full bg-slate-50 dark:bg-[#080d19] border border-slate-300 dark:border-slate-800 rounded-2xl p-3 text-slate-900 dark:text-white text-xs outline-none focus:border-purple-500 transition">
        </div>
        <div>
          <label class="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">رقم الهاتف *</label>
          <input type="tel" id="newSupPhoneInput" placeholder="010xxxxxxxx" class="w-full bg-slate-50 dark:bg-[#080d19] border border-slate-300 dark:border-slate-800 rounded-2xl p-3 text-slate-900 dark:text-white text-xs outline-none focus:border-purple-500 transition">
        </div>
        <div>
          <label class="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">العنوان أو مكان المخزن</label>
          <input type="text" id="newSupAddressInput" placeholder="مثال: مخازن بنها" class="w-full bg-slate-50 dark:bg-[#080d19] border border-slate-300 dark:border-slate-800 rounded-2xl p-3 text-slate-900 dark:text-white text-xs outline-none focus:border-purple-500 transition">
        </div>
      </div>
      <div class="flex gap-2.5 pt-2 border-t border-slate-200 dark:border-slate-800">
        <button onclick="handleCreateSupplierProfile()" class="flex-1 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:brightness-110 text-white rounded-2xl text-xs font-bold transition shadow-lg shadow-purple-600/30">حفظ المورد</button>
        <button onclick="closeModal('addNewSupplierProfileModal')" class="px-5 py-3 bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-2xl text-xs font-bold">إلغاء</button>
      </div>
    </div>
  </div>

  <!-- Modal 3: تنزيل فاتورة توريد من مورد -->
  <div id="addSupplierShipmentModal" class="fixed inset-0 bg-black/80 backdrop-blur-md z-50 hidden flex items-center justify-center p-3.5">
    <div class="bg-white dark:bg-[#0e1628] border border-slate-200 dark:border-slate-700/80 w-full max-w-2xl rounded-3xl p-5 shadow-2xl space-y-4 max-h-[92vh] overflow-y-auto custom-scrollbar">
      <div class="flex justify-between items-center border-b border-slate-200 dark:border-slate-800 pb-3">
        <div>
          <h3 class="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-2">
            <i class="fa-solid fa-boxes-packing text-purple-600 dark:text-purple-400"></i> تنزيل فاتورة توريد جديدة
          </h3>
          <p class="text-xs text-slate-500 dark:text-slate-400 mt-0.5">المورد: <b class="text-purple-600 dark:text-purple-300" id="shipmentSupplierName">--</b></p>
        </div>
        <button onclick="closeModal('addSupplierShipmentModal')" class="text-slate-400 hover:text-slate-800 dark:hover:text-white p-1"><i class="fa-solid fa-xmark"></i></button>
      </div>

      <div class="bg-slate-50 dark:bg-[#080d19] p-4 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-3">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-2.5">
          <div>
            <label class="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">اسم الصنف والموديل *</label>
            <input type="text" id="shipItemNameInput" placeholder="مثال: غسالة إل جي 9 كيلو" class="w-full bg-white dark:bg-[#0e1628] border border-slate-300 dark:border-slate-800 rounded-2xl p-2.5 text-slate-900 dark:text-white text-xs outline-none focus:border-purple-500">
          </div>
          <div>
            <label class="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">الباركود (اختياري)</label>
            <div class="flex gap-2">
              <input type="text" id="shipItemBarcodeInput" placeholder="الباركود المطبوع" class="flex-1 bg-white dark:bg-[#0e1628] border border-slate-300 dark:border-slate-800 rounded-2xl p-2.5 text-slate-900 dark:text-white text-xs outline-none focus:border-purple-500">
              <button onclick="openBarcodeScanner('shipItemBarcodeInput')" class="px-3 py-2 bg-slate-200 dark:bg-slate-800 text-cyan-600 dark:text-cyan-400 rounded-2xl border border-slate-300 dark:border-slate-700 text-xs">📷</button>
            </div>
          </div>
        </div>

        <div class="grid grid-cols-2 gap-2.5">
          <div>
            <label class="block text-xs text-slate-600 dark:text-slate-400 mb-1">الكمية الموردة *</label>
            <input type="number" id="shipItemQtyInput" value="1" min="1" class="w-full bg-white dark:bg-[#0e1628] border border-slate-300 dark:border-slate-800 rounded-2xl p-2.5 text-slate-900 dark:text-white text-xs text-center font-bold">
          </div>
          <div>
            <label class="block text-xs text-slate-600 dark:text-slate-400 mb-1">سعر شراء القطعة (ج.م) *</label>
            <input type="number" id="shipItemPriceInput" placeholder="0" class="w-full bg-white dark:bg-[#0e1628] border border-slate-300 dark:border-slate-800 rounded-2xl p-2.5 text-slate-900 dark:text-white text-xs font-bold">
          </div>
        </div>

        <button onclick="addItemToSupplierCart()" class="w-full py-2.5 bg-purple-600/20 hover:bg-purple-600 text-purple-700 dark:text-purple-300 hover:text-white border border-purple-500/30 rounded-2xl text-xs font-bold transition flex items-center justify-center gap-2">
          <i class="fa-solid fa-plus"></i> إضافة الصنف للفاتورة
        </button>
      </div>

      <div class="overflow-x-auto border border-slate-200 dark:border-slate-800 rounded-2xl bg-slate-50 dark:bg-[#080d19]/60 custom-scrollbar">
        <table class="w-full text-right text-xs">
          <thead class="bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 border-b border-slate-200 dark:border-slate-800">
            <tr>
              <th class="p-2.5">الصنف</th>
              <th class="p-2.5">الباركود</th>
              <th class="p-2.5 text-center">الكمية</th>
              <th class="p-2.5">سعر الشراء</th>
              <th class="p-2.5">الإجمالي</th>
              <th class="p-2.5 text-center">حذف</th>
            </tr>
          </thead>
          <tbody id="supplierCartTbody" class="divide-y divide-slate-200 dark:divide-slate-800 text-slate-800 dark:text-slate-300"></tbody>
        </table>
      </div>

      <div class="flex justify-between items-center p-3 bg-slate-100 dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 text-xs">
        <span class="text-slate-700 dark:text-slate-300 font-bold">إجمالي الفاتورة:</span>
        <b id="supplierCartGrandTotal" class="text-sm font-black text-slate-900 dark:text-white">0 ج.م</b>
      </div>

      <div class="grid grid-cols-2 gap-2.5">
        <div>
          <label class="block text-xs text-slate-700 dark:text-slate-300 mb-1">تاريخ التوريد</label>
          <input type="date" id="supplierCartDateInput" class="w-full bg-slate-50 dark:bg-[#080d19] border border-slate-300 dark:border-slate-800 rounded-2xl p-2.5 text-slate-900 dark:text-white text-xs">
        </div>
        <div>
          <label class="block text-xs text-emerald-600 dark:text-emerald-400 mb-1">المدفوع كاش للمورد (ج.م)</label>
          <input type="number" id="supplierCartPaidInput" value="0" class="w-full bg-slate-50 dark:bg-[#080d19] border border-slate-300 dark:border-slate-800 rounded-2xl p-2.5 text-emerald-600 dark:text-emerald-300 font-bold text-xs">
        </div>
      </div>

      <div class="flex gap-2.5 pt-2 border-t border-slate-200 dark:border-slate-800">
        <button onclick="handleSaveMultiItemSupplierInvoice()" class="flex-1 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:brightness-110 text-white rounded-2xl text-xs font-bold transition shadow-lg shadow-purple-600/30">
          اعتماد الفاتورة وتنزيلها بالمخزن
        </button>
        <button onclick="closeModal('addSupplierShipmentModal')" class="px-5 py-3 bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-2xl text-xs font-bold">إلغاء</button>
      </div>
    </div>
  </div>

  <!-- Modal 4: ملف العميل المتكامل -->
  <div id="customerProfileModal" class="fixed inset-0 bg-black/80 backdrop-blur-md z-50 hidden flex items-center justify-center p-3.5">
    <div class="bg-white dark:bg-[#0e1628] border border-slate-200 dark:border-slate-700/80 w-full max-w-3xl rounded-3xl p-5 shadow-2xl space-y-4 max-h-[92vh] overflow-y-auto custom-scrollbar">
      <div class="flex justify-between items-start border-b border-slate-200 dark:border-slate-800 pb-3">
        <div>
          <div class="flex items-center gap-2">
            <span id="cpModalClientCode" class="text-xs px-3 py-0.5 rounded-full bg-blue-100 dark:bg-blue-500/20 text-blue-700 dark:text-cyan-400 border border-blue-200 dark:border-blue-500/30 font-bold font-mono">كود: #1</span>
            <h3 id="cpModalCustomerName" class="text-base font-black text-slate-900 dark:text-white">--</h3>
          </div>
          <p class="text-xs text-slate-500 dark:text-slate-400 mt-1">هاتف: <a id="cpModalCustomerPhoneLink" href="#" class="text-blue-600 dark:text-blue-400 underline">--</a> | الرقم القومي: <span id="cpModalNationalId" class="text-slate-700 dark:text-slate-300 font-mono">--</span></p>
          <p id="cpModalGuarantorDetails" class="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5"></p>
        </div>
        <button onclick="closeModal('customerProfileModal')" class="text-slate-400 hover:text-slate-800 dark:hover:text-white p-1"><i class="fa-solid fa-xmark text-lg"></i></button>
      </div>

      <div class="grid grid-cols-3 gap-2.5 text-center text-xs">
        <div class="p-3 bg-slate-50 dark:bg-[#080d19] rounded-2xl border border-slate-200 dark:border-slate-800">
          <span class="text-[10px] text-slate-500 dark:text-slate-400 block font-semibold">إجمالي مشترياته</span>
          <b id="cpModalGrandTotal" class="text-sm font-black text-slate-900 dark:text-white mt-0.5 block">0 ج.م</b>
        </div>
        <div class="p-3 bg-slate-50 dark:bg-[#080d19] rounded-2xl border border-emerald-200 dark:border-emerald-500/20">
          <span class="text-[10px] text-emerald-600 dark:text-emerald-400 block font-semibold">المسدد منه</span>
          <b id="cpModalGrandPaid" class="text-sm font-black text-emerald-600 dark:text-emerald-300 mt-0.5 block">0 ج.م</b>
        </div>
        <div class="p-3 bg-slate-50 dark:bg-[#080d19] rounded-2xl border border-rose-200 dark:border-rose-500/20">
          <span class="text-[10px] text-rose-600 dark:text-rose-400 block font-semibold">المتبقي المطلوب</span>
          <b id="cpModalGrandRemaining" class="text-sm font-black text-rose-600 dark:text-rose-300 mt-0.5 block">0 ج.م</b>
        </div>
      </div>

      <div class="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-2">
        <span class="text-xs font-bold text-slate-700 dark:text-slate-300">فواتير وعقود العميل:</span>
        <button onclick="openNewSaleForThisCustomer()" class="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow">
          <i class="fa-solid fa-plus"></i> فاتورة جديدة لهذا العميل
        </button>
      </div>
      <div id="cpModalInvoicesTabs" class="flex gap-2 overflow-x-auto pb-1 custom-scrollbar"></div>
      <div id="cpModalSelectedInvoiceContainer" class="space-y-3"></div>
    </div>
  </div>

  <!-- Modal 5: تحصيل قسط -->
  <div id="collectInstallmentModal" class="fixed inset-0 bg-black/80 backdrop-blur-md z-50 hidden flex items-center justify-center p-3.5">
    <div class="bg-white dark:bg-[#0e1628] border border-slate-200 dark:border-slate-700/80 w-full max-w-md rounded-3xl p-5 shadow-2xl space-y-4">
      <div class="flex justify-between items-center border-b border-slate-200 dark:border-slate-800 pb-3">
        <div>
          <h3 class="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-2">
            <i class="fa-solid fa-hand-holding-dollar text-emerald-600 dark:text-emerald-400"></i> تحصيل دفعة قسط
          </h3>
          <p class="text-xs text-slate-500 dark:text-slate-400 mt-0.5" id="colModalCustomerName">--</p>
        </div>
        <button onclick="closeModal('collectInstallmentModal')" class="text-slate-400 hover:text-slate-800 dark:hover:text-white p-1"><i class="fa-solid fa-xmark"></i></button>
      </div>

      <div class="bg-slate-50 dark:bg-[#080d19] p-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-1.5 text-xs">
        <p class="text-slate-700 dark:text-slate-300 font-semibold" id="colModalInstallmentDesc">--</p>
        <div class="flex justify-between text-slate-500 dark:text-slate-400 pt-1">
          <span>قيمة القسط: <b class="text-slate-900 dark:text-white" id="colModalFullAmount">0 ج</b></span>
          <span>المتبقي المطلوب: <b class="text-amber-600 dark:text-amber-400" id="colModalRequiredAmount">0 ج</b></span>
        </div>
      </div>

      <div>
        <label class="block text-xs font-semibold text-emerald-600 dark:text-emerald-400 mb-1">المبلغ المسدد الآن بالدرج (ج.م) *</label>
        <input type="number" id="colModalPaidInput" oninput="updateCollectModalPreview()" class="w-full bg-slate-50 dark:bg-[#080d19] border border-emerald-400 dark:border-emerald-500/40 rounded-2xl p-3 text-slate-900 dark:text-white text-base font-black text-center outline-none focus:border-emerald-500">
      </div>

      <div id="colModalActionChoiceBox" class="p-3 bg-slate-100 dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2 text-xs hidden">
        <span class="text-amber-600 dark:text-amber-300 font-bold block">خيارات العجز في حالة السداد الجزئي:</span>
        <label class="flex items-center gap-2 cursor-pointer">
          <input type="radio" name="partialActionType" value="keep_open" checked onchange="updateCollectModalPreview()" class="accent-blue-500">
          <span class="text-slate-700 dark:text-slate-300">إبقاء القسط مفتوحاً لحين سداد الباقي</span>
        </label>
        <label class="flex items-center gap-2 cursor-pointer">
          <input type="radio" name="partialActionType" value="rollover" onchange="updateCollectModalPreview()" class="accent-blue-500">
          <span class="text-slate-700 dark:text-slate-300">ترحيل باقي المبلغ تلقائياً على القسط القادم</span>
        </label>
      </div>

      <p id="colModalPreviewText" class="text-xs text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-950/40 p-3 rounded-2xl border border-slate-200 dark:border-slate-800/80 leading-relaxed"></p>

      <div class="flex gap-2.5 pt-2 border-t border-slate-200 dark:border-slate-800">
        <button onclick="confirmCollectInstallment()" class="flex-1 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:brightness-110 text-white rounded-2xl text-xs font-bold transition shadow-lg shadow-emerald-600/30">تأكيد استلام المبلغ</button>
        <button onclick="closeModal('collectInstallmentModal')" class="px-5 py-3 bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-2xl text-xs font-bold">إلغاء</button>
      </div>
    </div>
  </div>

  <!-- Modal 6: قوالب رسائل الواتساب -->
  <div id="chooseWhatsAppTemplateModal" class="fixed inset-0 bg-black/80 backdrop-blur-md z-50 hidden flex items-center justify-center p-3.5">
    <div class="bg-white dark:bg-[#0e1628] border border-slate-200 dark:border-slate-700/80 w-full max-w-md rounded-3xl p-5 shadow-2xl space-y-4">
      <div class="flex justify-between items-center border-b border-slate-200 dark:border-slate-800 pb-3">
        <div>
          <h3 class="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-2">
            <i class="fa-brands fa-whatsapp text-emerald-500 dark:text-emerald-400 text-base"></i> إرسال تذكير عبر واتساب
          </h3>
          <p class="text-xs text-slate-500 dark:text-slate-400 mt-0.5" id="waModalCustomerName">--</p>
        </div>
        <button onclick="closeModal('chooseWhatsAppTemplateModal')" class="text-slate-400 hover:text-slate-800 dark:hover:text-white p-1"><i class="fa-solid fa-xmark"></i></button>
      </div>
      <div class="space-y-2.5">
        <button onclick="executeSendWhatsAppTemplate('friendly')" class="w-full p-3.5 rounded-2xl bg-slate-50 hover:bg-emerald-50 dark:bg-slate-900 dark:hover:bg-emerald-950/40 border border-slate-200 dark:border-slate-800 hover:border-emerald-500/50 text-right transition group">
          <b class="text-xs text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-300 block">رسالة تذكير ودية 🌸</b>
          <span class="text-[10px] text-slate-500 dark:text-slate-400 block mt-1">تذكير لطيف بموعد القسط وموقف الحساب.</span>
        </button>
        <button onclick="executeSendWhatsAppTemplate('formal')" class="w-full p-3.5 rounded-2xl bg-slate-50 hover:bg-amber-50 dark:bg-slate-900 dark:hover:bg-amber-950/40 border border-slate-200 dark:border-slate-800 hover:border-amber-500/50 text-right transition group">
          <b class="text-xs text-slate-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-300 block">إشعار رسمي بالاستحقاق ⚠️</b>
          <span class="text-[10px] text-slate-500 dark:text-slate-400 block mt-1">مطالبة رسمية بالسداد مع بيان تفصيلي بالأقساط.</span>
        </button>
        <button onclick="executeSendWhatsAppTemplate('urgent')" class="w-full p-3.5 rounded-2xl bg-slate-50 hover:bg-rose-50 dark:bg-slate-900 dark:hover:bg-rose-950/40 border border-slate-200 dark:border-slate-800 hover:border-rose-500/50 text-right transition group">
          <b class="text-xs text-slate-900 dark:text-white group-hover:text-rose-600 dark:group-hover:text-rose-300 block">إنذار نهائي شديد اللهجة 🛑</b>
          <span class="text-[10px] text-slate-500 dark:text-slate-400 block mt-1">إنذار قبل اتخاذ الإجراءات القانونية تجاه العميل والضامن.</span>
        </button>
      </div>
    </div>
  </div>

  <!-- Modal 7: ماسح الباركود بالكاميرا -->
  <div id="barcodeScannerModal" class="fixed inset-0 bg-black/90 backdrop-blur-md z-50 hidden flex items-center justify-center p-3.5">
    <div class="bg-white dark:bg-[#0e1628] border border-slate-200 dark:border-slate-700/80 w-full max-w-sm rounded-3xl p-4 shadow-2xl space-y-3">
      <div class="flex justify-between items-center border-b border-slate-200 dark:border-slate-800 pb-2">
        <h3 class="font-bold text-slate-900 dark:text-white text-xs flex items-center gap-2">
          <i class="fa-solid fa-camera text-blue-600 dark:text-cyan-400"></i> ماسح الكاميرا وقارئ الباركود
        </h3>
        <button onclick="closeBarcodeScanner()" class="text-slate-400 hover:text-slate-800 dark:hover:text-white p-1"><i class="fa-solid fa-xmark"></i></button>
      </div>
      <div id="barcode-scanner-box" class="overflow-hidden rounded-2xl bg-black border border-slate-200 dark:border-slate-800 min-h-[220px]"></div>
      <p id="scannerInstructionText" class="text-[11px] text-slate-500 dark:text-slate-400 text-center"></p>
      <button onclick="closeBarcodeScanner()" class="w-full py-2.5 bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-2xl text-xs font-bold">إغلاق الكاميرا</button>
    </div>
  </div>

  <!-- Modal 8: استعلام الجهاز بالباركود -->
  <div id="deviceInquiryModal" class="fixed inset-0 bg-black/80 backdrop-blur-md z-50 hidden flex items-center justify-center p-3.5">
    <div class="bg-white dark:bg-[#0e1628] border border-slate-200 dark:border-slate-700/80 w-full max-w-sm rounded-3xl p-5 shadow-2xl space-y-4">
      <div class="flex justify-between items-center border-b border-slate-200 dark:border-slate-800 pb-2">
        <h3 class="font-bold text-slate-900 dark:text-white text-xs flex items-center gap-1.5"><i class="fa-solid fa-circle-info text-blue-600 dark:text-cyan-400"></i> بيانات الجهاز المفحوص</h3>
        <button onclick="closeModal('deviceInquiryModal')" class="text-slate-400 hover:text-slate-800 dark:hover:text-white p-1"><i class="fa-solid fa-xmark"></i></button>
      </div>
      <div id="deviceInquiryResultContent"></div>
      <div class="flex gap-2">
        <button onclick="proceedToSellInquiredDevice()" class="flex-1 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-2xl text-xs font-bold shadow-lg shadow-blue-600/30">بيع هذا الجهاز فوراً 🛒</button>
        <button onclick="closeModal('deviceInquiryModal')" class="px-5 py-3 bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-2xl text-xs font-bold">إغلاق</button>
      </div>
    </div>
  </div>

  <!-- Modal 9: عرض تفاصيل فاتورة بيع فردية -->
  <div id="viewSingleInvoiceModal" class="fixed inset-0 bg-black/80 backdrop-blur-md z-50 hidden flex items-center justify-center p-3.5">
    <div class="bg-white dark:bg-[#0e1628] border border-slate-200 dark:border-slate-700/80 w-full max-w-lg rounded-3xl p-5 shadow-2xl space-y-4">
      <div class="flex justify-between items-center border-b border-slate-200 dark:border-slate-800 pb-3">
        <div>
          <h3 class="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-2">
            <i class="fa-solid fa-receipt text-blue-600 dark:text-cyan-400"></i> تفاصيل الفاتورة <span id="vsimInvoiceId" class="text-blue-600 dark:text-cyan-400 font-mono">--</span>
          </h3>
          <p class="text-xs text-slate-500 dark:text-slate-400 mt-0.5" id="vsimClientMeta">--</p>
        </div>
        <button onclick="closeModal('viewSingleInvoiceModal')" class="text-slate-400 hover:text-slate-800 dark:hover:text-white p-1"><i class="fa-solid fa-xmark"></i></button>
      </div>
      <div class="overflow-x-auto border border-slate-200 dark:border-slate-800 rounded-2xl bg-slate-50 dark:bg-[#080d19]/60 custom-scrollbar">
        <table class="w-full text-right text-xs">
          <thead class="bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 border-b border-slate-200 dark:border-slate-800">
            <tr>
              <th class="p-2.5 text-center">العدد</th>
              <th class="p-2.5">الصنف</th>
              <th class="p-2.5">السيريال</th>
              <th class="p-2.5">سعر الوحدة</th>
              <th class="p-2.5">الإجمالي</th>
            </tr>
          </thead>
          <tbody id="vsimItemsTbody" class="divide-y divide-slate-200 dark:divide-slate-800 text-slate-800 dark:text-slate-300"></tbody>
        </table>
      </div>
      <div class="flex justify-between items-center p-3 bg-slate-100 dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 text-xs">
        <span class="text-slate-700 dark:text-slate-300 font-bold">إجمالي الفاتورة:</span>
        <b id="vsimGrandTotal" class="text-sm font-black text-emerald-600 dark:text-emerald-400">0 ج.م</b>
      </div>
      <div class="flex gap-2">
        <button onclick="printCurrentViewedSaleInvoice()" class="flex-1 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl text-xs font-bold transition flex items-center justify-center gap-2 shadow">
          <i class="fa-solid fa-print"></i> طباعة إيصال الفاتورة (80mm)
        </button>
        <button onclick="closeModal('viewSingleInvoiceModal')" class="px-5 py-3 bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-white rounded-2xl text-xs font-bold transition">إغلاق</button>
      </div>
    </div>
  </div>

  <!-- Modal 10: تعديل الفاتورة -->
  <div id="editSaleInvoiceModal" class="fixed inset-0 bg-black/80 backdrop-blur-md z-50 hidden flex items-center justify-center p-3.5">
    <div class="bg-white dark:bg-[#0e1628] border border-slate-200 dark:border-slate-700/80 w-full max-w-lg rounded-3xl p-5 shadow-2xl space-y-4 max-h-[92vh] overflow-y-auto custom-scrollbar">
      <div class="flex justify-between items-center border-b border-slate-200 dark:border-slate-800 pb-3">
        <h3 class="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-2">
          <i class="fa-solid fa-pen-to-square text-amber-500 dark:text-amber-400"></i> تعديل بيانات الفاتورة <span id="editInvoiceIdLabel" class="text-blue-600 dark:text-cyan-400 font-mono">--</span>
        </h3>
        <button onclick="closeModal('editSaleInvoiceModal')" class="text-slate-400 hover:text-slate-800 dark:hover:text-white p-1"><i class="fa-solid fa-xmark"></i></button>
      </div>

      <div class="space-y-3">
        <div class="grid grid-cols-2 gap-2.5">
          <div>
            <label class="block text-xs text-slate-700 dark:text-slate-300 mb-1">اسم العميل *</label>
            <input type="text" id="editCustomerNameInput" class="w-full bg-slate-50 dark:bg-[#080d19] border border-slate-300 dark:border-slate-800 rounded-2xl p-2.5 text-slate-900 dark:text-white text-xs">
          </div>
          <div>
            <label class="block text-xs text-slate-700 dark:text-slate-300 mb-1">هاتف العميل *</label>
            <input type="tel" id="editCustomerPhoneInput" class="w-full bg-slate-50 dark:bg-[#080d19] border border-slate-300 dark:border-slate-800 rounded-2xl p-2.5 text-slate-900 dark:text-white text-xs">
          </div>
        </div>

        <div>
          <label class="block text-xs text-slate-600 dark:text-slate-400 mb-1">اسم الصنف أو الموديل</label>
          <input type="text" id="editDeviceRawNameInput" class="w-full bg-slate-50 dark:bg-[#080d19] border border-slate-300 dark:border-slate-800 rounded-2xl p-2.5 text-slate-900 dark:text-white text-xs">
        </div>

        <div class="grid grid-cols-2 gap-2.5">
          <div>
            <label class="block text-xs text-slate-600 dark:text-slate-400 mb-1">العدد</label>
            <input type="number" id="editQuantityInput" min="1" oninput="calculateEditInvoiceMath()" class="w-full bg-slate-50 dark:bg-[#080d19] border border-slate-300 dark:border-slate-800 rounded-2xl p-2.5 text-slate-900 dark:text-white text-xs text-center font-bold">
          </div>
          <div>
            <label class="block text-xs text-slate-600 dark:text-slate-400 mb-1">سعر الوحدة كاش</label>
            <input type="number" id="editUnitPriceInput" oninput="calculateEditInvoiceMath()" class="w-full bg-slate-50 dark:bg-[#080d19] border border-slate-300 dark:border-slate-800 rounded-2xl p-2.5 text-slate-900 dark:text-white text-xs font-bold">
          </div>
        </div>

        <div>
          <label class="block text-xs text-slate-600 dark:text-slate-400 mb-1">السيريال نمبر</label>
          <input type="text" id="editSerialInput" class="w-full bg-slate-50 dark:bg-[#080d19] border border-slate-300 dark:border-slate-800 rounded-2xl p-2.5 text-slate-900 dark:text-white text-xs">
        </div>

        <div>
          <label class="block text-xs text-slate-600 dark:text-slate-400 mb-1">إجمالي الكاش للأصناف</label>
          <input type="number" id="editCashTotalInput" readonly class="w-full bg-slate-100 dark:bg-[#080d19] border border-slate-300 dark:border-slate-800 rounded-2xl p-2.5 text-emerald-600 dark:text-emerald-400 text-xs font-bold">
        </div>

        <div id="editInstallmentBox" class="space-y-2.5 bg-slate-50 dark:bg-[#080d19] p-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 hidden">
          <div class="grid grid-cols-3 gap-2">
            <div>
              <label class="block text-[10px] text-slate-500 dark:text-slate-400 mb-1">المقدم</label>
              <input type="number" id="editDownPaymentInput" oninput="calculateEditInvoiceMath()" class="w-full bg-white dark:bg-[#0e1628] border border-slate-300 dark:border-slate-800 rounded-xl p-1.5 text-emerald-600 dark:text-emerald-400 text-xs font-bold">
            </div>
            <div>
              <label class="block text-[10px] text-slate-500 dark:text-slate-400 mb-1">نسبة الفائدة %</label>
              <input type="number" id="editInterestRateInput" oninput="calculateEditInvoiceMath()" class="w-full bg-white dark:bg-[#0e1628] border border-slate-300 dark:border-slate-800 rounded-xl p-1.5 text-blue-600 dark:text-cyan-400 text-xs font-bold">
            </div>
            <div>
              <label class="block text-[10px] text-slate-500 dark:text-slate-400 mb-1">الشهور</label>
              <input type="number" id="editMonthsInput" oninput="calculateEditInvoiceMath()" class="w-full bg-white dark:bg-[#0e1628] border border-slate-300 dark:border-slate-800 rounded-xl p-1.5 text-slate-900 dark:text-white text-xs text-center font-bold">
            </div>
          </div>
          <div class="flex justify-between items-center text-xs pt-1 border-t border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400">
            <span>الإجمالي: <b class="text-slate-900 dark:text-white" id="editCalculatedTotal">0 ج</b></span>
            <span>القسط: <b class="text-blue-600 dark:text-cyan-400" id="editCalculatedMonthly">0 ج</b></span>
          </div>
        </div>
      </div>

      <div class="flex gap-2.5 pt-2 border-t border-slate-200 dark:border-slate-800">
        <button onclick="handleSaveInvoiceEdits()" class="flex-1 py-3 bg-amber-600 hover:bg-amber-500 text-white rounded-2xl text-xs font-bold transition shadow-lg shadow-amber-600/30">حفظ التعديلات</button>
        <button onclick="closeModal('editSaleInvoiceModal')" class="px-5 py-3 bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-2xl text-xs font-bold">إلغاء</button>
      </div>
    </div>
  </div>

  <!-- Modal 11: إضافة مصروف جديد -->
  <div id="addExpenseModal" class="fixed inset-0 bg-black/80 backdrop-blur-md z-50 hidden flex items-center justify-center p-3.5">
    <div class="bg-white dark:bg-[#0e1628] border border-slate-200 dark:border-slate-700/80 w-full max-w-md rounded-3xl p-5 shadow-2xl space-y-4">
      <div class="flex justify-between items-center border-b border-slate-200 dark:border-slate-800 pb-3">
        <h3 class="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-2">
          <i class="fa-solid fa-money-bill-transfer text-rose-500 dark:text-rose-400"></i> تسجيل مصروف أو نولون جديد
        </h3>
        <button onclick="closeModal('addExpenseModal')" class="text-slate-400 hover:text-slate-800 dark:hover:text-white p-1"><i class="fa-solid fa-xmark"></i></button>
      </div>
      <div class="space-y-3">
        <div>
          <label class="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">بند المصروف أو الوصف *</label>
          <input type="text" id="expenseTitleInput" placeholder="مثال: نولون نقل شاشات، فاتورة كهرباء" class="w-full bg-slate-50 dark:bg-[#080d19] border border-slate-300 dark:border-slate-800 rounded-2xl p-3 text-slate-900 dark:text-white text-xs outline-none focus:border-rose-500 transition">
        </div>
        <div class="grid grid-cols-2 gap-2.5">
          <div>
            <label class="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">التصنيف</label>
            <select id="expenseCategorySelect" class="w-full bg-slate-50 dark:bg-[#080d19] border border-slate-300 dark:border-slate-800 rounded-2xl p-2.5 text-slate-900 dark:text-white text-xs">
              <option value="نقل وشحن">نقل وشحن ونولون</option>
              <option value="بوفيه وضيافة">بوفيه ومشروبات</option>
              <option value="صيانة وهوالك">صيانة وتلفيات</option>
              <option value="كهرباء ومرافق">كهرباء وفواتير</option>
              <option value="أخرى">مصاريف أخرى</option>
            </select>
          </div>
          <div>
            <label class="block text-xs font-semibold text-rose-600 dark:text-rose-400 mb-1">المبلغ (ج.م) *</label>
            <input type="number" id="expenseAmountInput" placeholder="0" class="w-full bg-slate-50 dark:bg-[#080d19] border border-slate-300 dark:border-slate-800 rounded-2xl p-2.5 text-rose-600 dark:text-rose-400 font-bold text-xs outline-none focus:border-rose-500">
          </div>
        </div>
        <div>
          <label class="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">التاريخ</label>
          <input type="date" id="expenseDateInput" class="w-full bg-slate-50 dark:bg-[#080d19] border border-slate-300 dark:border-slate-800 rounded-2xl p-2.5 text-slate-900 dark:text-white text-xs">
        </div>
        <div>
          <label class="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">ملاحظات إضافية</label>
          <input type="text" id="expenseNotesInput" placeholder="أي تفاصيل خاصة بالمصروف" class="w-full bg-slate-50 dark:bg-[#080d19] border border-slate-300 dark:border-slate-800 rounded-2xl p-2.5 text-slate-900 dark:text-white text-xs">
        </div>
      </div>
      <div class="flex gap-2.5 pt-2 border-t border-slate-200 dark:border-slate-800">
        <button onclick="handleSaveExpense()" class="flex-1 py-3 bg-gradient-to-r from-rose-600 to-pink-600 hover:brightness-110 text-white rounded-2xl text-xs font-bold transition shadow-lg shadow-rose-600/30">تسجيل وخصم المصروف</button>
        <button onclick="closeModal('addExpenseModal')" class="px-5 py-3 bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-2xl text-xs font-bold">إلغاء</button>
      </div>
    </div>
  </div>

  <!-- Modal 12: كتابة رسالة عروض جماعية للعملاء -->
  <div id="broadcastPromoModal" class="fixed inset-0 bg-black/80 backdrop-blur-md z-50 hidden flex items-center justify-center p-3.5">
    <div class="bg-white dark:bg-[#0e1628] border border-slate-200 dark:border-slate-700/80 w-full max-w-md rounded-3xl p-5 shadow-2xl space-y-4">
      <div class="flex justify-between items-center border-b border-slate-200 dark:border-slate-800 pb-3">
        <h3 class="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-2">
          <i class="fa-brands fa-whatsapp text-emerald-500 text-base"></i> تجهيز رسالة العرض الترويجي
        </h3>
        <button onclick="closeModal('broadcastPromoModal')" class="text-slate-400 hover:text-slate-800 dark:hover:text-white p-1"><i class="fa-solid fa-xmark"></i></button>
      </div>
      <div>
        <label class="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">نص العرض الترويجي:</label>
        <textarea id="promoCustomMessageInput" rows="5" class="w-full bg-slate-50 dark:bg-[#080d19] border border-slate-300 dark:border-slate-800 rounded-2xl p-3 text-slate-900 dark:text-white text-xs outline-none focus:border-emerald-500 leading-relaxed"></textarea>
      </div>
      <p class="text-[11px] text-slate-400">سيتم حفظ نص الرسالة واستخدامه عند الضغط على زر إرسال لأي عميل في الدليل.</p>
      <div class="flex gap-2">
        <button onclick="saveAndApplyPromoMessage()" class="flex-1 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl text-xs font-bold shadow">حفظ الرسالة</button>
        <button onclick="closeModal('broadcastPromoModal')" class="px-5 py-3 bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-2xl text-xs font-bold">إلغاء</button>
      </div>
    </div>
  </div>

  <script src="excel-engine.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
  <script src="app.js?v=final_auth_v30"></script>
</body>
</html>
// ==========================================
// المحرك التشغيلي المتطور (app.js) - الجزء الثاني
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

function openNewSaleForThisCustomer() {
  if (!activeCustomerPhoneForProfile) return;
  const contracts = getStoredContracts().filter(c => (c.customerPhone || '').toString().trim() === activeCustomerPhoneForProfile.trim());
  if (contracts.length === 0) return;
  const cl = contracts[0];

  closeModal('customerProfileModal');
  openModal('newSaleModal');

  const nameInput = document.getElementById('saleCustomerName');
  if (nameInput) nameInput.value = cl.customerName || '';
  const phoneInput = document.getElementById('saleCustomerPhone');
  if (phoneInput) phoneInput.value = cl.customerPhone || '';
  const natInput = document.getElementById('saleCustomerNationalId');
  if (natInput) natInput.value = cl.nationalId || '';
  const gName = document.getElementById('saleGuarantorName');
  if (gName) gName.value = cl.guarantorName || '';
  const gPhone = document.getElementById('saleGuarantorPhone');
  if (gPhone) gPhone.value = cl.guarantorPhone || '';
  const gNat = document.getElementById('saleGuarantorNationalId');
  if (gNat) gNat.value = cl.guarantorNationalId || '';
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

function openEditInvoiceModal(identifier) {
  requireOwnerAuth(() => {
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
  });
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
        <td class="p-2.5 text-slate-500 dark:text-slate-400 font-mono text-xs">${it.date || '--'}</td>
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
  if (dateInput) dateInput.value = getFormattedDateTimeNow().date;
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

  const dt = getFormattedDateTimeNow();
  const date = document.getElementById('supplierCartDateInput').value || dt.date;
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
  requireOwnerAuth(() => {
    if (confirm('هل أنت متأكد من حذف هذا الصنف من حساب المورد؟')) {
      const suppliers = getDetailedSuppliers();
      const sup = suppliers.find(s => s.id === supId);
      if (sup) {
        sup.items = sup.items.filter(it => it.id !== itemId);
        setDetailedSuppliers(suppliers);
        renderSuppliersTable();
        renderDashboard();
        showToast('تم حذف الصنف بنجاح', 'success');
      }
    }
  });
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

function renderAnnualReportsView() {
  const year = document.getElementById('annualReportYearSelect').value || '2026';
  const searchTxt = (document.getElementById('annualReportSearchInput').value || '').trim().toLowerCase();
  const sales = getStoredSales();
  const productMap = {};
  let totalRev = 0, totalPcs = 0;

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
    totalRev += tot; totalPcs += qty;
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

function renderExpensesTable() {
  const expenses = getStoredExpenses();
  const tbody = document.getElementById('expensesTableBody');
  if (!tbody) return;
  tbody.innerHTML = '';
  if (expenses.length === 0) { tbody.innerHTML = '<tr><td colspan="6" class="p-6 text-center text-slate-500">لا توجد مصاريف مسجلة.</td></tr>'; return; }

  expenses.forEach(exp => {
    tbody.innerHTML += `
      <tr>
        <td class="p-2.5 text-slate-500 font-mono text-xs">${exp.date}</td>
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
  const dt = getFormattedDateTimeNow();
  const dateInput = document.getElementById('expenseDateInput').value;
  const date = dateInput ? `${dateInput} (${dt.time})` : dt.full;
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
  requireOwnerAuth(() => {
    if (confirm('هل أنت متأكد من حذف هذا المصروف؟')) {
      let exp = getStoredExpenses().filter(e => e.id !== expId);
      setStoredExpenses(exp);
      renderExpensesTable();
      renderDashboard();
      showToast('تم حذف المصروف بنجاح', 'success');
    }
  });
}

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

  const paidCount = (c.installments || []).filter(i => i.status === 'مدفوع بالكامل').length;
  const totalInstallmentsCount = (c.installments || []).length;
  const nextDueInst = (c.installments || []).find(i => i.status !== 'مدفوع بالكامل');

  const instRequiredAmount = nextDueInst ? (nextDueInst.amount - (nextDueInst.paidActual || 0)) : (c.monthlyAmount || 0);
  const instNumber = nextDueInst ? nextDueInst.number : (paidCount + 1);
  const instDueDate = nextDueInst ? nextDueInst.dueDate : '--';

  let msg = '';
  if (type === 'friendly') {
    msg = `تحية طيبة أستاذ ${c.customerName} من معرض أولاد العبد للأجهزة الكهربائية 🌸\n` +
          `نود تذكير سيادتكم بميعاد سداد القسط الشهري المستحق:\n` +
          `━━━━━━━━━━━━━━━━━━━\n` +
          `📌 القسط المطلوب سداده: القسط رقم (#${instNumber}) بمبلغ (${instRequiredAmount.toLocaleString()} ج.م)\n` +
          `📅 تاريخ الاستحقاق: ${instDueDate}\n` +
          `📦 عن شراء: ${c.deviceName}\n` +
          `━━━━━━━━━━━━━━━━━━━\n` +
          `📊 موقف العقد:\n` +
          `• الأقساط المسددة: (${paidCount} من إجمالي ${totalInstallmentsCount} قسط)\n` +
          `• إجمالي باقي العقد كاملاً: ${(c.remainingAmount || 0).toLocaleString()} ج.م\n\n` +
          `شاكرين لحسن تعاونكم والتزامكم الراقي 🤝`;
  } else if (type === 'formal') {
    msg = `إشعار رسمي باستحقاق قسط ⚠️\n` +
          `السيد / ${c.customerName} المحترم (كود: #${c.clientCode || 1})\n` +
          `يرجى التكرم بسداد القسط المستحق طرفكم لمعرض أولاد العبد:\n` +
          `━━━━━━━━━━━━━━━━━━━\n` +
          `💵 القسط المطلوب حالياً: (${instRequiredAmount.toLocaleString()} ج.م) - القسط (#${instNumber})\n` +
          `📅 مستحق بتاريخ: ${instDueDate}\n` +
          `📦 الأجهزة المشتراة: ${c.deviceName}\n` +
          `━━━━━━━━━━━━━━━━━━━\n` +
          `• إجمالي المسدد سابقاً: ${(c.paidAmount || 0).toLocaleString()} ج.م\n` +
          `• إجمالي المتبقي لإغلاق الحساب: ${(c.remainingAmount || 0).toLocaleString()} ج.م\n\n` +
          `شاكرين سرعة التوجه للمعرض للسداد.`;
  } else {
    msg = `🛑 إنذار نهائي بالسداد قبل اتخاذ الإجراءات\n` +
          `إلى العميل / ${c.customerName} والضامن (${c.guarantorName || 'المحترم'})\n` +
          `نحيطكم علماً بتأخركم عن سداد القسط رقم (#${instNumber}) بمبلغ (${instRequiredAmount.toLocaleString()} ج.م) والخاص بشراء (${c.deviceName}).\n` +
          `إجمالي المديونية المتبقية طرفكم: ${(c.remainingAmount || 0).toLocaleString()} ج.م.\n\n` +
          `يرجى التوجه لمقر معرض أولاد العبد خلال 48 ساعة كحد أقصى لتسوية القسط تجنباً للإجراءات القانونية.`;
  }

  closeModal('chooseWhatsAppTemplateModal');
  window.open(`https://wa.me/2${cleanPhone}?text=${encodeURIComponent(msg)}`, '_blank');
}

function renderCustomersDirectory() {
  const contracts = getStoredContracts();
  const sales = getStoredSales();
  const tbody = document.getElementById('customersDirectoryTableBody');
  if (!tbody) return;
  tbody.innerHTML = '';

  const search = (document.getElementById('customersSearchInput')?.value || '').trim().toLowerCase();
  const clientsMap = {};

  sales.forEach(s => {
    const phone = (s.customerPhone || '').toString().trim();
    if (!phone) return;
    if (!clientsMap[phone]) {
      clientsMap[phone] = {
        name: s.customerName,
        phone: phone,
        type: s.type,
        totalBought: 0,
        devices: []
      };
    }
    clientsMap[phone].totalBought += (parseFloat(s.totalPrice) || 0);
    if (s.deviceName) clientsMap[phone].devices.push(s.deviceName);
  });

  contracts.forEach(c => {
    const phone = (c.customerPhone || '').toString().trim();
    if (phone && clientsMap[phone]) {
      clientsMap[phone].code = c.clientCode;
    }
  });

  const list = Object.values(clientsMap).filter(cl => {
    return cl.name.toLowerCase().includes(search) || cl.phone.includes(search);
  });

  if (list.length === 0) {
    tbody.innerHTML = `<tr><td colspan="6" class="p-6 text-center text-slate-500">لا يوجد عملاء مسجلين.</td></tr>`;
    return;
  }

  list.forEach((cl, idx) => {
    tbody.innerHTML += `
      <tr class="hover:bg-slate-50 dark:hover:bg-slate-900/50">
        <td class="p-3 font-mono font-bold text-blue-600 dark:text-cyan-400">#${cl.code || (idx + 1)}</td>
        <td class="p-3 font-bold text-slate-900 dark:text-white">${cl.name}</td>
        <td class="p-3 font-mono text-slate-600 dark:text-slate-300">${cl.phone}</td>
        <td class="p-3"><span class="px-2 py-0.5 rounded text-[10px] font-bold ${cl.type === 'كاش' ? 'bg-emerald-100 text-emerald-700' : 'bg-blue-100 text-blue-700'}">${cl.type}</span></td>
        <td class="p-3 font-bold text-slate-900 dark:text-white">${cl.totalBought.toLocaleString()} ج.م</td>
        <td class="p-3 text-center">
          <button onclick="sendPromoWhatsAppToCustomer('${cl.name}', '${cl.phone}')" class="px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 mx-auto shadow">
            <i class="fa-brands fa-whatsapp"></i> إرسال العرض
          </button>
        </td>
      </tr>
    `;
  });
}

function openBroadcastPromoModal() {
  const saved = localStorage.getItem(STORAGE_KEY_PROMO_TEMPLATE) || 
`عميلنا العزيز 🌸\nتحية طيبة من معرض أولاد العبد للأجهزة الكهربائية والمنزلية 🏢\nيسعدنا إبلاغ سيادتكم بوصول تشكيلة جديدة من الأجهزة الكهربائية (شاشات، غسالات، ثلاجات) بأفضل الأسعار وأنظمة تقسيط ميسرة وخصومات حصرية لعملائنا الكرام!\nتشرفنا زيارتكم في المعرض للاستفادة من العروض ✨`;
  document.getElementById('promoCustomMessageInput').value = saved;
  openModal('broadcastPromoModal');
}

function saveAndApplyPromoMessage() {
  const text = document.getElementById('promoCustomMessageInput').value.trim();
  localStorage.setItem(STORAGE_KEY_PROMO_TEMPLATE, text);
  closeModal('broadcastPromoModal');
  showToast('تم حفظ نص العرض الترويجي بنجاح ✔', 'success');
}

function sendPromoWhatsAppToCustomer(name, phone) {
  const template = localStorage.getItem(STORAGE_KEY_PROMO_TEMPLATE) || 'أقوى العروض من معرض أولاد العبد للأجهزة الكهربائية!';
  const cleanPhone = phone.replace(/[^0-9]/g, '');
  const finalMsg = `أهلاً بحضرتك أستاذ ${name} 🌸\n` + template;
  window.open(`https://wa.me/2${cleanPhone}?text=${encodeURIComponent(finalMsg)}`, '_blank');
}

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
