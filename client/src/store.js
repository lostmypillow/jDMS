import { reactive } from 'vue'

export const store = reactive({
  count: 0,
  meow: [1, 2, 3],
  newsContents: [],
  newsContentsByCat : {},
  isStandby: true,
  isImporting: false,
  isSaving: false,
  editContent: {}



})