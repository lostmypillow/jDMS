import { reactive } from "vue";
import { useStorage } from "@vueuse/core";
export const store = reactive({
  data: [],
  allItems: [],
  docx: '',
  addItem(item) {
    this.data.push(item);
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
  },
});
