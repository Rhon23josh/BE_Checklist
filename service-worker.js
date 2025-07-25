const CACHE_NAME = "be-checklist-v1";
const urlsToCache = [
  "/BE_Checklist/",         // main page
  "/BE_Checklist/index.html",
  "/BE_Checklist/styles.css",
  "/BE_Checklist/script.js",
  "/BE_Checklist/Policies/BE_1_Implementation%20of%20Existing%20Security%20Measures.pdf",
  "/BE_Checklist/Policies/BE_2_Cash%20Handling%20Guidelines_Reiteration.pdf",
  "/BE_Checklist/Policies/BE_3_Disbursement%20and%20Liquidation%20of%20the%20Fund.pdf",
  "/BE_Checklist/Policies/BE_4_Cash%20Within%20EO%20Common%20Areas.pdf",
  "/BE_Checklist/Policies/BE_5_Sales%20Invoice%20-%20Signaure%20of%20Branch%20Managers.pdf",
  "/BE_Checklist/Policies/BE_6_Memo%20on%20the%20Disposal%20of%20Blue%20Copies.pdf",
  "/BE_Checklist/Policies/BE_7_Guidelines%20for%20Accounts%20Receivables.pdf",
  "/BE_Checklist/Policies/BE_8_Accounts%20Receivables.pdf",
  "/BE_Checklist/Policies/BE_9_Conditions%20on%20Deposit%20Requirement.pdf",
  "/BE_Checklist/Policies/BE_11_ Guidelines%20in%20Forfeiture%20of%20Accounts%20Receivable.pdf",
  "/BE_Checklist/Policies/BE_13_RETURNING%20OF%20ENGINEERING%20ITEMS%20TO%20ED%20-%20UPDATED.pdf",
  "/BE_Checklist/Policies/BE_13_Fixed%20assets%20disposal.pdf",
  "/BE_Checklist/Policies/BE_14_EO-ED%20STOCK%20TRANSFER%20TO%20ENGINEERING%20-%20OPTICAL%20EQUIPMENT.pdf",
  "/BE_Checklist/Policies/BE_14_Fixed%20Asset%20Transaction.pdf",
  "/BE_Checklist/Policies/BE_15_COMPANY%20PHONE%20POLICY.pdf",
  "/BE_Checklist/Policies/BE_16_Guidelines%20for%20Handling%20Damaged%20Lenses.pdf",
  "/BE_Checklist/Policies/BE_16_Unposted%20and%20Un-uploaded%20DRs.pdf",
  "/BE_Checklist/Policies/BE_17_Policy%20on%20MB.pdf",
  "/BE_Checklist/Policies/Be_18_Reiteration%20of%20Damage%20Policy.pdf",
  "/BE_Checklist/Policies/BE_19_CL%20Expiration%20Policy.pdf",
  "/BE_Checklist/Policies/BE_20_Employee%20Product%20Purchase%20Benefits%20.pdf",
  "/BE_Checklist/Policies/BE_20_Memo%20on%20Reserved%20Items%20for%20EPPB%20(Internal%20Agreement).pdf",
  "/BE_Checklist/Policies/BE_21_Strict%20Implementation%20of%20Existing%20Security%20Measures.pdf",
  "/BE_Checklist/Policies/BE_22_2023%20Policy%20on%20Stock%20Transfer%20of%20Merchandise%20%20Merchandise%20Inventory.pdf",
  "/BE_Checklist/Policies/BE_24_Lifetime%20Guarantee%20Card.pdf",
  "/BE_Checklist/Policies/BE_26_COLLECTION%20DISPLAY%20GUIDELINES%202024.pdf",
  "/BE_Checklist/Policies/BE_26_HOUSE%20BRAND%20MEMO.pdf",
  "/BE_Checklist/Policies/BE_27_Operations%20Audit%20Mandate%20per%20Office%20of%20the%20President.pdf",
  "/BE_Checklist/Policies/BE_28_RE Permits%20%20Licenses.pdf",
  "/BE_Checklist/Policies/BE_30_Standard%20Charging%20for%20Non%20Displaying%20of%20Monthly%20POPs.pdf",
  "/BE_Checklist/Policies/BE_30_Amendment%20of%20Marketing%20Collaterals%20Guidelines.pdf",
  "/BE_Checklist/Policies/BE_31_Prohibition%20on%20Displaying%20Duplicate%20Items.pdf",
  "/BE_Checklist/Policies/BE_35_Spiel%20on%20CEG%20Processing%20Time.pdf",
  "/BE_Checklist/Policies/BE_37_Encoding%20and%20submission%20of%20Corporate%20Acct.pdf",
  "/BE_Checklist/Policies/BE_41_Timekeeping%20policy.pdf",
  "/BE_Checklist/Policies/BE_54_Simplified%20Policy%20on%20Lens%20Only%20Transaction%20.pdf",
  "/BE_Checklist/Policies/BE_55_Policy%20on%20Unclaimed%20Fully%20Paid%20Items.pdf",
  "/BE_Checklist/Policies/Be_56_Reiteration%20of%20Damage%20Policy.pdf",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
