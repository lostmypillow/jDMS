<script setup>
// import axios from "axios";
// async function getDocx(params) {
//   try {
//     const response = await axios.get("http://localhost:3002/docx", {
//       responseType: "blob", // Important: tells axios to treat the response as a binary Blob
//     });

//     const { filename, file } = await response.json();

//     // Convert base64 to a Blob
//     const blob = this.base64ToBlob(
//       file,
//       "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
//     );

//     // Create a link element and trigger a download
//     const link = document.createElement("a");
//     link.href = URL.createObjectURL(blob);
//     link.download = filename;
//     link.click();

//     // Clean up
//     URL.revokeObjectURL(link.href);
//   } catch (error) {
//     console.error("Error downloading the document:", error);
//   }
// }
</script>
<template>
  <p>i am export</p>
  <button class="btn btn-primary">Get Docx</button>
</template>
