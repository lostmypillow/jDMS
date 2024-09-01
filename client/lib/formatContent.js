function formatForPreview(inputText) {
    //"paragraph1\nparagraph2\nparagraph3"
    return inputText.replace(/&#13;/g, '<br>')

}


