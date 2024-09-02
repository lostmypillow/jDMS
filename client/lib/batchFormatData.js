// function getFormattedDate() {
//     const today = new Date();

//     const year = today.getFullYear();
//     const month = String(today.getMonth() + 1).padStart(2, '0');
//     const day = String(today.getDate()).padStart(2, '0');

//     return `${year}-${month}-${day}`;
//   }

// function collateAll(x) {
//     let finalCopy;
// for (let i=0; i<x.length; i++) {
// finalCopy += formatData(i) + '\n'
// }
// }

function formatData(data) {
  const { title, date_source_author, link, content } = data;
  let newcontent = content.replace(/<br><br>/g, "\n\n");

  return `${title}\n${date_source_author}\n${link}\n${newcontent}\n\n`;
}

export function batchFormatData(listOfData) {
  let wallOfText = "";
  for (let obj of listOfData) {
    wallOfText += formatData(obj);
  }
  return wallOfText
}
// "file:///c:\users\johnny.lin\desktop\2024-08-06 qualcomm dms.docx#TOP"
