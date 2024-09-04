const content = "meoewf\n\nmewefw"
console.log(content.split('\n\n').map(item => ({ para: item })))