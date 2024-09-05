import { reactive } from 'vue'


export const store = reactive({
    data: [],
    isSaving: false,
    isSaveFailure: false,
})

export async function updateStore(params) {
    try {
        
    } catch (error) {
        console.log(error)
        isSaveFailure = true
    }
}