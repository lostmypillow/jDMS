import { reactive } from 'vue'


export const store = reactive({
    data: [],
    isSaving: false,
    isSaveFailure: false,
    allItems: [],
    navItems: [],
    qualcomm: [],
    mediatek: [],
    commu: [],
    phone: [],
    other: []
})

