const collections =[]
//  console.log(collections.length)
// chrome.extension.getBackgroundPage().console.log('foo'); 
emptydiv = document.querySelector('.emptydiv')
notemptydiv = document.querySelector('.notemptydiv')
// console.log(emptydiv, notemptydiv)

if(collections.length!==0){
    emptydiv.style.display = 'none'
    notemptydiv.style.display = 'flex'
}