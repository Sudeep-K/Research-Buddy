const collections =[
                {
                    "collection_emoji": "🔥",
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
                    "collection_emoji": "😶‍🌫️",
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
                 {
                    "collection_emoji": "✋",
                    "collection_name": "den",
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
//new citation toggle
newcitationbutton.addEventListener('click', ()=>{
    // console.log('clicked')
    if( formatentry.style.display == 'flex')
    formatentry.style.display = 'none'
    else
    formatentry.style.display = 'flex'
})




// non empty populate in the home page
collections.forEach((collection)=>{
    console.log(collection.collection_name)

    const collectiondiv = document.createElement('div')
    collectiondiv.classList.add('collectiondiv')

    const collectionheader = document.createElement('div')
    collectionheader.classList.add('collectionheader')
    collectionheader.innerHTML = collection.collection_emoji+ collection.collection_name
    collectiondiv.appendChild(collectionheader)

    const entrydiv = document.createElement('div')
    entrydiv.classList.add('entrydiv')
    
    collection.entries.forEach((entry)=>{
        const entrytitle = document.createElement('div')
        const title =document.createElement('div')
        entrytitle.classList.add('entrytitle')
        title.innerHTML = entry.title

        const bookmarkimage =document.createElement('img')
        bookmarkimage.setAttribute('src', './images/bookmark.png')
        entrytitle.appendChild(bookmarkimage)
        entrytitle.appendChild(title)

        entrydiv.appendChild(entrytitle)
    })
    
    collectiondiv.appendChild(entrydiv)
    notemptydiv.appendChild(collectiondiv)

}
)

//view collection toggle
const collectionheader = document.querySelectorAll('.collectionheader')
collectionheader.forEach((header)=>{
    header.addEventListener('click', ()=>{
        if(header.nextElementSibling.style.display == 'flex')
        header.nextElementSibling.style.display = 'none'
        else
        header.nextElementSibling.style.display = 'flex'
    })
})