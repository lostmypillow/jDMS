import { reactive } from 'vue'


export const store = reactive({
    data: [],
    isSaving: false,
    isSaveFailure: false,
    allItems: [],
    navItems: []
})

