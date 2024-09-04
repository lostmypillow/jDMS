
export function formatAsNewLine(inputText) {
  //"paragraph1\nparagraph2\nparagraph3"
  return inputText.replace(/\n\n/g, "\n\n");

}

export function formatAsHTML(inputText) {
  //"paragraph1\nparagraph2\nparagraph3"
  return inputText.replace(/\n\n/g, "<br><br>");

}
function formatData(data) {
  const { title, date_source_author, link, content } = data;
  let newcontent = content
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
