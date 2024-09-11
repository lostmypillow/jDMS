export default function(inputText) {
    //"paragraph1\nparagraph2\nparagraph3"
    return inputText.replace(/\n\n/g, "<br><br>");
  
  }