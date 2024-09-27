import { reactive } from "vue";

import { v4 as uuid } from "uuid";
const currentDate = new Date();


// Initialize Firebase


export const store = reactive({
  fireDb: null,
  startFbService() {
    const app = initializeApp(firebaseConfig);
    this.fireDb = getFirestore(app);
    // connectFirestoreEmulator(this.fireDb, "127.0.0.1", 8080)
  },
  returnTargetColRef(category) {
    return collection(
      this.fireDb,
      this.currentYear,
      this.currentDate,
      category
    )
  },
  currentYear: currentDate.getFullYear().toString(),
  currentDate:
    String(currentDate.getMonth() + 1).padStart(2, "0") +
    String(currentDate.getDate()).padStart(2, "0"),
  data: [],
  docx: "",
  tab: "import",
  unsupportedLinks: [],
  errorMsg: "",
  isImporting: false,
  isImportingLINE: false,
  addTitle: "",
  addDate: "",
  addSource: "",
  addAuthor: "",
  addURL: "",
  addCategory: "",
  addContent: "",
  getSingleObj(id) {
    return this.data.find((x) => x.id == id);
  },
  sortByPriority() {
    function isSequential(arr, key = "priority") {
      if (arr.length === 0) return false;

      if (arr[0][key] !== 1) return false;

      for (let i = 1; i < arr.length; i++) {
        if (arr[i][key] !== arr[i - 1][key] + 1) {
          return false;
        }
      }
      return true;
    }

    for (const nav of this.navCategories) {
      if (!isSequential(this.data.filter((x) => x.category == nav))) {
        for (
          let i = 0;
          i < this.data.filter((x) => x.category == nav).length;
          i++
        ) {
          this.data.filter((x) => x.category == nav)[i]["priority"] = i + 1;
        }
      }
    }

    this.data.sort((a, b) => a.priority - b.priority);
  },
  changeCategory(objID, changedCategory) {
    this.data.find((x) => x.id == objID).priority = this.data.filter(
      (x) => x.category == changedCategory
    ).length;
    this.sortByPriority();
  },
  addItem(item) {
    console.log("addItem started");
    const inputCategory = item.category;
    if (item["id"] == undefined) {
      item["id"] = uuid();
    }
    item["priority"] =
      this.data.filter((x) => x.category == inputCategory).length + 1;
    this.data.push(item);
    this.sortByPriority();
    console.log("addItem ended");
  },
  addUnsupported(item) {
    this.unsupportedLinks.push(item);
  },
  swapPriorities(category, originalPriority, direction) {
    if (direction == "down") {
      const nextPriority = originalPriority + 1;
      this.data.find(
        (x) => x.category == category && x.priority == originalPriority
      ).priority = 0;
      this.data.find(
        (x) => x.category == category && x.priority == nextPriority
      ).priority = originalPriority;
      this.data.find(
        (x) => x.category == category && x.priority == 0
      ).priority = nextPriority;
    } else {
      const prevPriority = originalPriority - 1;
      this.data.find(
        (x) => x.category == category && x.priority == originalPriority
      ).priority = 0;
      this.data.find(
        (x) => x.category == category && x.priority == prevPriority
      ).priority = originalPriority;
      this.data.find(
        (x) => x.category == category && x.priority == 0
      ).priority = prevPriority;
    }
    this.sortByPriority();
  },
  navCategories: [
    "Qualcomm相關新聞",
    "MediaTek相關新聞",
    "無線通訊市場",
    "智慧型手機/消費性電子產品",
    "其他業界重要訊息",
  ],
  count: 0,
});
