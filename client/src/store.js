import { reactive } from 'vue'


export const store = reactive({
  count: 0,
  meow: [1, 2, 3],
  newsContents: [],
  increment(num, content) {
    Object.assign((store.newsContents[num]).title, {title: content})
    
  },
  newsContentsByCat : {},
  isStandby: true,
  isImporting: false,
  isSaving: false,
  editContent: {},
  Qualcomm: [],
  MediaTek: [],
  Commu: [],
  Phone: [],
  Other: []



})