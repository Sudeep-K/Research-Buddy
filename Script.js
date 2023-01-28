const collections =[
                {
                    "collection_name": "smart farm",
                    "entries": [
                        {
                            "id": 1,
                            "title": "water resource book",
                            "author": "sameer",
                            "year": 2019,
                        },
                        {
                            "id": 2,
                            "title": "fertilizer book",
                            "author": "sudeep",
                            "year": 2019,
                        }               
                    ] 
                 },
                 {
                    "collection_name": "dorm den",
                    "entries": [
                        {
                            "id": 1,
                            "title": "react",
                            "author": "sameer",
                            "year": 2019,
                        },
                        {
                            "id": 2,
                            "title": "node",
                            "author": "sudeep",
                            "year": 2019,
                        },

                    ],
                 },
]
//  console.log(collections.length)
// chrome.extension.getBackgroundPage().console.log('foo'); 
emptydiv = document.querySelector('.emptydiv')
notemptydiv = document.querySelector('.notemptydiv')
newcitationbutton = document.querySelector('.newcitationbutton')
formatentry = document.querySelector('.formatentry')
// console.log(emptydiv, notemptydiv)

if(collections.length!==0){
    emptydiv.style.display = 'none'
    notemptydiv.style.display = 'flex'
}

newcitationbutton.addEventListener('click', ()=>{
    console.log('clicked')
    if( formatentry.style.display == 'flex')
    formatentry.style.display = 'none'
    else
    formatentry.style.display = 'flex'
})

// non empty populate in the home page
collections.forEach((collection)=>{
    console.log(collection.entries)
}
)