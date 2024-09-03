const now = new Date();
const year = now.getFullYear();
const monthDay = `${String(now.getMonth() + 1).padStart(2, "0")}${String(now.getDate()).padStart(2, "0")}`;

const collectionName = String(year); // e.g., 2024
const documentName = monthDay; // e.g., 0824
console.log(collectionName)
console.log(documentName)