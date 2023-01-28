emptydiv = document.querySelector('.emptydiv')
notemptydiv = document.querySelector('.notemptydiv')
newcitationbutton = document.querySelector('.newcitationbutton')
formatentry = document.querySelector('.formatentry')
const book_title = document.getElementById('book-title');
const author_container = document.querySelector('.author-container');
const author_first_name = document.querySelector('#first-name');
const author_last_name = document.querySelector('#last-name');

const add_author_btn = document.querySelector('#add-author');

// present collection name
let present_collection_name = ''
let present_citation_format = ''

const save_collection = [
    {
        "collection_name": "The Dorn Den",
        "collection_emoji": "🦖",
        "entries": [
            {
                "format_type": "book",
                "title": "The MERN stack",
                "author": [
                    {
                        "first_name": "Manoj",
                        "last_name": "Kumar"
                    }
                ],
                "published_date": "2021-01-01",
                "publisher_place": "India",
                "edition": "1st",
                "volume": "Book volume"
            },
            {
                "format_type": "book",
                "title": "The Human Stack",
                "author": [
                    {
                        "first_name": "Ramesh",
                        "last_name": "Gupta"
                    }
                ],
                "published_date": "2021-01-15",
                "publisher_place": "Pakistan",
                "edition": "3rd",
                "volume": "925"
            }
        ]
    }
]

chrome.storage.local.set({ "collections": save_collection }, () => {
    console.log("data saved");
})

collections = []

chrome.storage.local.get(["collections"], (result) => {
    collections = result.collections
    // non empty populate in the home page
    if (collections.length !== 0) {
        emptydiv.style.display = 'none'
        notemptydiv.style.display = 'flex'
    }

    collections.forEach((collection) => {
        console.log(collection)

        const collectiondiv = document.createElement('div')
        collectiondiv.classList.add('collectiondiv')

        const collectionheader = document.createElement('div')
        collectionheader.classList.add('collectionheader')
        collectionheader.innerHTML = collection.collection_emoji + collection.collection_name
        collectiondiv.appendChild(collectionheader)

        const entrydiv = document.createElement('div')
        entrydiv.classList.add('entrydiv')

        collection.entries.forEach((entry) => {
            const entrytitle = document.createElement('div')
            const title = document.createElement('div')
            entrytitle.classList.add('entrytitle')
            title.innerHTML = entry.title

            const bookmarkimage = document.createElement('img')
            bookmarkimage.setAttribute('src', './images/bookmark.png')
            entrytitle.appendChild(bookmarkimage)
            entrytitle.appendChild(title)

            entrydiv.appendChild(entrytitle)
        })

        collectiondiv.appendChild(entrydiv)
        notemptydiv.appendChild(collectiondiv)



    })
    const collectionheader = document.querySelectorAll('.collectionheader')
    collectionheader.forEach((header) => {
        header.addEventListener('click', () => {
            if (header.nextElementSibling.style.display == 'flex')
                header.nextElementSibling.style.display = 'none'
            else
                header.nextElementSibling.style.display = 'flex'
        })
    })

    document.querySelector('.dropdown-citation-collection-name').addEventListener('click', () => {
        if (document.querySelector('.citation-collections').style.display == 'flex')
            document.querySelector('.citation-collections').style.display = 'none'
        else
            document.querySelector('.citation-collections').style.display = 'flex'
    })

    /* drop down to select the collection for citation */
    const citation_collections = document.querySelector('.citation-collections');
    collections.forEach((collection) => {
        const collection_div = document.createElement('div');
        collection_div.classList.add('collection-name');
        collection_div.textContent = collection.collection_name
        collection_div.addEventListener('click', () => {
            present_collection_name = collection.collection_name
            console.log('this collection name is saved', present_collection_name)
            document.querySelector('.dropdown-citation-collection-name').textContent = present_collection_name
            document.querySelector('.citation-collections').style.display = 'none'
        })
        citation_collections.appendChild(collection_div)
    })

    /* drop down to select the type of format */
    document.querySelector('.dropdown').addEventListener('click', () => {
        if (document.querySelector('.citation-formats').style.display == 'flex')
            document.querySelector('.citation-formats').style.display = 'none'
        else
            document.querySelector('.citation-formats').style.display = 'flex'
    })
    const citation_formats = document.querySelectorAll('.citation-format');
    
    citation_formats.forEach((citation_format) => {
        citation_format.addEventListener('click', () => {
            present_citation_format = citation_format.textContent
            console.log('this citation_format is saved', present_citation_format)
            document.querySelector('.dropdown').textContent = present_citation_format
            document.querySelector('.citation-formats').style.display = 'none'
        })
    })

    /* scrap all the data from the input to add to the collection */
    const entry_book = {
        "format_type": "book",
        "title": document.querySelector('#book-title').textContent,
        "author": [
            {
                "first_name": "Manoj",
                "last_name": "Kumar"
            }
        ],
        "published_date": {
            "year": document.querySelector('#year').textContent,
            "month": document.querySelector('#month').textContent,
            "day": document.querySelector('#day').textContent,
        },
        "publisher_name": document.querySelector("#publisher").textContent,
        "edition": document.querySelector("#edition").textContent,
        "volume": document.querySelector("#volume").textContent,
    }
})



//new citation toggle
newcitationbutton.addEventListener('click', () => {
    // console.log('clicked')
    if (formatentry.style.display == 'flex')
        formatentry.style.display = 'none'
    else
        formatentry.style.display = 'flex'
})

// opens up the book form when books reference type is clicked
let reference_types = document.querySelectorAll('.formatentrytype');
reference_types.forEach((reference_type) => {
    reference_type.addEventListener('click', () => {
        if (reference_type.textContent == 'Books') {
            const homepage = document.querySelector('.extension');
            homepage.style.display = 'none'
            const bookform = document.querySelector('.main');
            bookform.style.display = 'block'
        }
    })
})


add_author_btn.addEventListener('click', () => {
    const author_list = document.querySelector('.author-list');

    const author = document.createElement('div');
    author.classList.add('author');

    const author_info = document.createElement('p');
    author_info.textContent = `${author_first_name.value} ${author_last_name.value}`;

    const edit_btn = document.createElement('button');
    edit_btn.classList.add("edit-author");
    edit_btn.textContent = 'Edit';
    edit_btn.attributes = 'type="button"';
    edit_btn.setAttribute('type', 'button');
    edit_btn.addEventListener('click', () => {
        const author_info_new = edit_btn.parentElement.querySelector('p');
        author_first_name.value = author_info_new.textContent.split(' ')[0];
        author_last_name.value = author_info_new.textContent.split(' ')[1];
        edit_btn.parentElement.remove();
    })

    const delete_btn = document.createElement('button');
    delete_btn.classList.add("remove-author");
    delete_btn.textContent = 'Remove';
    delete_btn.setAttribute('type', 'button');
    delete_btn.addEventListener('click', () => {
        delete_btn.parentElement.remove();
    })

    author.appendChild(author_info);
    author.appendChild(edit_btn);
    author.appendChild(delete_btn);
    console.log(author)

    author_list.appendChild(author);
    console.log(author_list)

    author_first_name.value = '';
    author_last_name.value = '';
})