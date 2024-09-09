function formatData(data) {
    const { title, date_source_author, url, content } = data;
    return `${title}\n${date_source_author}\n${url}\n${content}\n\n`;
  }
  
  export default function (listOfData) {
    let wallOfText = "";
    for (let obj of listOfData) {
      wallOfText += formatData(obj);
    }
    return wallOfText
  }