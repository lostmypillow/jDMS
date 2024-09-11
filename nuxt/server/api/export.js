export default defineEventHandler((event) => {
    const result = exportAsDocx()
    return {result: result}
 })