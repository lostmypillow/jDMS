const title = document.getElementById("testtitle")
const author = document.getElementById("testauthor")
const testdate = document.getElementById("testdate")
const getTitle = document.querySelector("li.breadcrumb-item.active").querySelector("span")
const getAuthor =  document.querySelector("div.author").querySelector("a")
const getDate = document.querySelector("div.created.slacken").querySelectorAll("span")[1]
const getContent = document.querySelector("div.row.content").querySelector("div").querySelectorAll("p")
const converted_date = getDate.textContent.split(' ')[0].replace(/\./g, '-') +  " / Cool3c / " + getAuthor.textContent 
console.log(getContent)
var allContent
var count = 0


getContent.forEach(function(a) {
    if (a.innerHTML.startsWith('<img')) {
        return
    } else {
        console.log(count)
    console.log(a.innerHTML)
    count++
    allContent += (a.textContent.trim() + '<br>')
    }
    
})
title.textContent = getTitle.textContent
author.textContent = converted_date
testdate.textContent = allContent