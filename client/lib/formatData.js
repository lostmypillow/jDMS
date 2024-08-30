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

export function formatData(data) {
  const { title, date_source_author, link, content } = data;

  const contentArray = JSON.parse(content);

  const contentString = contentArray.join("\n\n");

  return `${title}\n${date_source_author}\n${link}\n${contentString}`;
}

// "file:///c:\users\johnny.lin\desktop\2024-08-06 qualcomm dms.docx#TOP"
