import { reactive } from "vue";

export const store = reactive({
  count: 0,
  atext: "meow",
  alist: [],
  data: [],
  isSaving: false,
  isSaveFailure: false,
  allItems: [],
  addItem(item) {
    this.allItems.push(item);
  },
});
