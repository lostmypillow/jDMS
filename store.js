import { reactive } from "vue";
import { useStorage } from "@vueuse/core";
import { v4 as uuid } from 'uuid'
export const store = reactive({
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
  addCategory: "",
  addContent: "",
  getTitle(id) {
    return this.data
      .find((x) => x.id == id);
  },
  sortByPriority() {
    this.data.sort((a, b) => a.priority - b.priority);
  },
  addItem(item) {
    const inputCategory = item.category;
    item["priority"] =
      this.data.filter((x) => x.category == inputCategory).length + 1;
      item["id"] = uuid()
    this.data.push(item);
    this.sortByPriority();
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
});
