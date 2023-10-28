emptydiv = document.querySelector('.emptydiv')
notemptydiv = document.querySelector('.notemptydiv')
newcitationbutton = document.querySelector('.newcitationbutton')
formatentry = document.querySelector('.formatentry')
const book_title = document.getElementById('book-title');
const author_container = document.querySelector('.author-container');
const author_first_name = document.querySelector('#first-name');
const author_last_name = document.querySelector('#last-name');

/* what is the form type */
let form_type = 'book'

const add_author_btn = document.querySelector('#add-author');

let collections = []

global_authors = []

function To_MLA(entry, format_type){
    let citation = ''
    if(format_type == "book"){
        if(entry.author.length == 1){
            citation = `${entry.author[0].last_name}, ${entry.author[0].first_name}. ${entry.title}. ${entry.volume?entry.volume:""}, ${entry.edition?entry.edition:""}, ${entry.publisher_name?entry.publisher_name:""}, ${entry.published_date.year}.`
        }
        else if(entry.author.length == 2){
            citation = `${entry.author[0].last_name}, ${entry.author[0].first_name} and ${entry.author[1].last_name}, ${entry.author[1].last_name} . ${entry.title}. ${entry.volume?entry.volume:""}, ${entry.edition?entry.edition:""}, ${entry.publisher_name?entry.publisher_name:""}, ${entry.published_date.year}.`
        }
        else if(entry.author.length > 2){
            citation = `${entry.author[0].last_name}, ${entry.author[0].first_name}, et al.. ${entry.title}. ${entry.volume?entry.volume:""}, ${entry.edition?entry.edition:""}, ${entry.publisher_name?entry.publisher_name:""}, ${entry.published_date.year}.`
        }
    }
    else if(format_type == "journal"){
        if(entry.author.length == 1){
            citation = `${entry.author[0].last_name}, ${entry.author[0].first_name}. "${entry.article_title}." ${entry.title}, ${entry.volume?entry.volume:""}, ${entry.issue?  'no.'+entry.issue: ""},${entry.published_date.month} ${entry.page_range?"pp."+entry.page_range:""}, ${entry.doi?entry.doi:""} `
        }
        else if(entry.author.length == 2){
            citation = `${entry.author[0].last_name}, ${entry.author[0].first_name} and ${entry.author[1].last_name}, ${entry.author[1].last_name} . "${entry.article_title}." ${entry.title}, ${entry.volume?entry.volume:""}, ${entry.issue?  'no.'+entry.issue: ""},${entry.published_date.month} ${entry.page_range?"pp."+entry.page_range:""}, ${entry.doi?entry.doi:""} `
        }
        else if(entry.author.length > 2){
            citation = `${entry.author[0].last_name}, ${entry.author[0].first_name}, et al.. "${entry.article_title}." ${entry.title}, ${entry.volume?entry.volume:""}, ${entry.issue?  'no.'+entry.issue: ""},${entry.published_date.month} ${entry.page_range?"pp."+entry.page_range:""}, ${entry.doi?entry.doi:""} `
        }
    }
    return citation;
}
 
// to APA format
function To_APA(entry, format_type){
    let citation = ''
    console.log(entry)
    if(format_type == "book"){
        if(entry.author.length == 1){
            citation = `${entry.author[0].last_name}, ${entry.author[0].first_name[0]}. (${entry.published_date.year}). ${entry.title} (${entry.edition?entry.edition:""}). ${entry.publisher_name?entry.publisher_name:""}.`
        }
        else if(entry.author.length == 2){
            citation = `${entry.author[0].last_name}, ${entry.author[0].first_name[0]}, & ${entry.author[1].last_name}, ${entry.author[1].first_name[0]}. (${entry.published_date.year}). ${entry.title} (${entry.edition?entry.edition:""}). ${entry.publisher_name?entry.publisher_name:""}.`
        }
        else if(entry.author.length > 2){
            citation = `${entry.author[0].last_name}, ${entry.author[0].first_name[0]}, ${entry.author[1].last_name},${entry.author[1].first_name[0]}, , ${entry.author[2].last_name},${entry.author[2].first_name[0]}. (${entry.published_date.year}). ${entry.title} (${entry.edition?entry.edition:""}). ${entry.publisher_name?entry.publisher_name:""}.`
        }
    }
    else if(format_type == "journal"){
        if(entry.author.length == 1){
            citation = `${entry.author[0].last_name}, ${entry.author[0].first_name[0]}. (${entry.published_date.year}). ${entry.article_title}. ${entry.title}, ${entry.volume}(${entry.issue}), ${entry.page_range?entry.page_range:""}. ${entry.doi?entry.doi:""}.`
        }
        else if(entry.author.length == 2){
            citation = `${entry.author[0].last_name}, ${entry.author[0].first_name[0]}, & ${entry.author[1].last_name}, ${entry.author[1].first_name[0]}. (${entry.published_date.year}). ${entry.article_title}. ${entry.title}, ${entry.volume}(${entry.issue}), ${entry.page_range?entry.page_range:""}. ${entry.doi?entry.doi:""}.`
        }
        else if(entry.author.length > 2){
            citation = `${entry.author[0].last_name}, ${entry.author[0].first_name[0]}, ${entry.author[1].last_name},${entry.author[1].first_name[0]}, , ${entry.author[2].last_name},${entry.author[2].first_name[0]}. (${entry.published_date.year}). ${entry.article_title}. ${entry.title}, ${entry.volume}(${entry.issue}), ${entry.page_range?entry.page_range:""}. ${entry.doi?entry.doi:""}.`
        }
    }
    return citation;
}

// display none for both forms
document.querySelector('.main').style.display = 'none'
document.querySelector('.journal-form').style.display = 'none'

const create_entry_for_book = () => {
    authors = []
    document.querySelectorAll('.author>p').forEach((author) => {
        const newObj = {}
        newObj["first_name"] = author.textContent.split(' ')[0]
        newObj["last_name"] = author.textContent.split(' ')[1]
        authors.push(newObj)
    })
    console.log(authors)

    const entry_book = {
        "format_type": "book",
        "title": document.querySelector('#book-title').value,
        "author": authors,
        "published_date": {
            "year": document.querySelector('#year').value,
            "month": document.querySelector('#month').value,
            "day": document.querySelector('#day').value,
        },
        "publisher_name": document.querySelector("#publisher").value,
        "edition": document.querySelector("#edition").value,
        "volume": document.querySelector("#volume").value,
    }
    return entry_book;
}

const create_entry_for_journal = () => {
    authors = []
    document.querySelectorAll('.journal-authors>*>p').forEach((author) => {
        const newObj = {}
        newObj["first_name"] = author.textContent.split(' ')[0]
        newObj["last_name"] = author.textContent.split(' ')[1]
        authors.push(newObj)
    })
    console.log(authors)
    const entry_journal = {
        "format_type": "journal",
        "title": document.querySelector('#journal-name').value,
        "author": authors,
        "published_date": {
            "year": document.querySelector('#year').value,
            "month": document.querySelector('#month').value,
            "day": document.querySelector('#day').value,
        },
        "article_title": document.querySelector('#article-title-holder').value,
        "volume": document.querySelector("#volume-holder").value,
        "issue": document.querySelector("#issue").value,
        "page_range": document.querySelector("#page-range").value,
        "doi": document.querySelector("#doi-link").value,
    }
    return entry_journal;
}

fill_up_book = (entry) => {
    document.querySelector('#book-title').value = entry.title;
    entry.author.forEach((a) => {
        const author_list = document.querySelector('.author-list');

        const author = document.createElement('div');
        author.classList.add('author');
        author.style.border = 'none';
        author.style.borderRadius = '5px';
        author.style.backgroundColor = '#11d8a3';
        author.style.margin = '5px';

        const author_info = document.createElement('p');
        author_info.textContent = `${a.first_name} ${a.last_name}`;
        author_info.style.color = 'white';

        const edit_btn = document.createElement('button');
        edit_btn.classList.add("edit-author");
        edit_btn.style.backgroundColor = '#e32636';
        edit_btn.style.border = 'none';
        edit_btn.style.borderRadius = '5px';
        edit_btn.style.display = 'flex';
        edit_btn.innerHTML = `
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clip-path="url(#clip0_72_4)">
            <path d="M5.99998 14.6667H9.99998C13.3333 14.6667 14.6666 13.3334 14.6666 10V6.00004C14.6666 2.66671 13.3333 1.33337 9.99998 1.33337H5.99998C2.66665 1.33337 1.33331 2.66671 1.33331 6.00004V10C1.33331 13.3334 2.66665 14.6667 5.99998 14.6667Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M11.6667 5.8L6.77337 9.46M11.6667 10.1867L6.77337 6.52667M5.61337 7.26666C5.95285 7.26666 6.27842 7.13181 6.51847 6.89176C6.75852 6.65171 6.89337 6.32614 6.89337 5.98666C6.89337 5.64719 6.75852 5.32161 6.51847 5.08157C6.27842 4.84152 5.95285 4.70667 5.61337 4.70667C5.2739 4.70667 4.94832 4.84152 4.70828 5.08157C4.46823 5.32161 4.33337 5.64719 4.33337 5.98666C4.33337 6.32614 4.46823 6.65171 4.70828 6.89176C4.94832 7.13181 5.2739 7.26666 5.61337 7.26666ZM5.61337 11.2933C5.95285 11.2933 6.27842 11.1585 6.51847 10.9184C6.75852 10.6784 6.89337 10.3528 6.89337 10.0133C6.89337 9.67386 6.75852 9.34828 6.51847 9.10824C6.27842 8.86819 5.95285 8.73333 5.61337 8.73333C5.2739 8.73333 4.94832 8.86819 4.70828 9.10824C4.46823 9.34828 4.33337 9.67386 4.33337 10.0133C4.33337 10.3528 4.46823 10.6784 4.70828 10.9184C4.94832 11.1585 5.2739 11.2933 5.61337 11.2933Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </g>
            <defs>
            <clipPath id="clip0_72_4">
            <rect width="16" height="16" fill="white"/>
            </clipPath>
            </defs>
        </svg>
        `
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
        delete_btn.style.backgroundColor = '#e32636';
        delete_btn.style.border = 'none';
        delete_btn.style.borderRadius = '5px';
        delete_btn.style.display = 'flex';
        delete_btn.innerHTML = `
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clip-path="url(#clip0_72_7)">
                <path d="M9.20661 10.4867L6.84661 8.12671M9.17995 8.15338L6.81995 10.5134" stroke="white" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M14.6667 7.33337V11.3334C14.6667 14 14 14.6667 11.3334 14.6667H4.66671C2.00004 14.6667 1.33337 14 1.33337 11.3334V4.66671C1.33337 2.00004 2.00004 1.33337 4.66671 1.33337H5.66671C6.66671 1.33337 6.88671 1.62671 7.26671 2.13337L8.26671 3.46671C8.52004 3.80004 8.66671 4.00004 9.33337 4.00004H11.3334C14 4.00004 14.6667 4.66671 14.6667 7.33337Z" stroke="white" stroke-width="1.5" stroke-miterlimit="10"/>
                </g>
                <defs>
                <clipPath id="clip0_72_7">
                <rect width="16" height="16" fill="white"/>
                </clipPath>
                </defs>
            </svg>
        `
        delete_btn.setAttribute('type', 'button');
        delete_btn.addEventListener('click', () => {
            delete_btn.parentElement.remove();
        })

        author.appendChild(author_info);
        author.appendChild(edit_btn);
        author.appendChild(delete_btn);

        author_list.appendChild(author);

        author_first_name.value = '';
        author_last_name.value = '';
        })
    document.querySelector('#year').value = entry.published_date.year;
    document.querySelector('#month').value = entry.published_date.month;
    document.querySelector('#day').value = entry.published_date.day;
    document.querySelector('#publisher').value = entry.publisher_name;
    document.querySelector('#edition').value = entry.edition;
    document.querySelector('#volume').value = entry.volume;
    
    collections.forEach((collection) => {
        collection.entries = collection.entries.filter((e) => e.title != entry.title)
    })
}

fill_up_journal = (entry) => {
    document.querySelector('#journal-name').value = entry.title;
    entry.author.forEach((a) => {
        const author_list = document.querySelector('.journal-authors');

        const author = document.createElement('div');
        author.classList.add('author-journal');
        author.style.border = 'none';
        author.style.borderRadius = '5px';
        author.style.backgroundColor = '#11d8a3';
        author.style.margin = '5px';
    
        const author_info = document.createElement('p');
        author_info.textContent = `${a.first_name} ${a.last_name}`;
        author_info.style.color = 'white';
    
        const edit_btn = document.createElement('button');
        edit_btn.classList.add("edit-author-journal");
        edit_btn.style.backgroundColor = '#e32636';
        edit_btn.style.border = 'none';
        edit_btn.style.borderRadius = '5px';
        edit_btn.style.display = 'flex';
        edit_btn.innerHTML = `
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clip-path="url(#clip0_72_4)">
            <path d="M5.99998 14.6667H9.99998C13.3333 14.6667 14.6666 13.3334 14.6666 10V6.00004C14.6666 2.66671 13.3333 1.33337 9.99998 1.33337H5.99998C2.66665 1.33337 1.33331 2.66671 1.33331 6.00004V10C1.33331 13.3334 2.66665 14.6667 5.99998 14.6667Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M11.6667 5.8L6.77337 9.46M11.6667 10.1867L6.77337 6.52667M5.61337 7.26666C5.95285 7.26666 6.27842 7.13181 6.51847 6.89176C6.75852 6.65171 6.89337 6.32614 6.89337 5.98666C6.89337 5.64719 6.75852 5.32161 6.51847 5.08157C6.27842 4.84152 5.95285 4.70667 5.61337 4.70667C5.2739 4.70667 4.94832 4.84152 4.70828 5.08157C4.46823 5.32161 4.33337 5.64719 4.33337 5.98666C4.33337 6.32614 4.46823 6.65171 4.70828 6.89176C4.94832 7.13181 5.2739 7.26666 5.61337 7.26666ZM5.61337 11.2933C5.95285 11.2933 6.27842 11.1585 6.51847 10.9184C6.75852 10.6784 6.89337 10.3528 6.89337 10.0133C6.89337 9.67386 6.75852 9.34828 6.51847 9.10824C6.27842 8.86819 5.95285 8.73333 5.61337 8.73333C5.2739 8.73333 4.94832 8.86819 4.70828 9.10824C4.46823 9.34828 4.33337 9.67386 4.33337 10.0133C4.33337 10.3528 4.46823 10.6784 4.70828 10.9184C4.94832 11.1585 5.2739 11.2933 5.61337 11.2933Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </g>
            <defs>
            <clipPath id="clip0_72_4">
            <rect width="16" height="16" fill="white"/>
            </clipPath>
            </defs>
        </svg>
        `
        edit_btn.setAttribute('type', 'button');
        edit_btn.addEventListener('click', () => {
            const author_info_new = edit_btn.parentElement.querySelector('p');
            document.querySelector('#first-name-journal').value = author_info_new.textContent.split(' ')[0];
            document.querySelector('#last-name-journal').value = author_info_new.textContent.split(' ')[1];
            edit_btn.parentElement.remove();
        })
    
        const delete_btn = document.createElement('button');
        delete_btn.classList.add("remove-author-journal");
        delete_btn.style.backgroundColor = '#e32636';
        delete_btn.style.border = 'none';
        delete_btn.style.borderRadius = '5px';
        delete_btn.style.display = 'flex';
        delete_btn.innerHTML = `
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clip-path="url(#clip0_72_7)">
                <path d="M9.20661 10.4867L6.84661 8.12671M9.17995 8.15338L6.81995 10.5134" stroke="white" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M14.6667 7.33337V11.3334C14.6667 14 14 14.6667 11.3334 14.6667H4.66671C2.00004 14.6667 1.33337 14 1.33337 11.3334V4.66671C1.33337 2.00004 2.00004 1.33337 4.66671 1.33337H5.66671C6.66671 1.33337 6.88671 1.62671 7.26671 2.13337L8.26671 3.46671C8.52004 3.80004 8.66671 4.00004 9.33337 4.00004H11.3334C14 4.00004 14.6667 4.66671 14.6667 7.33337Z" stroke="white" stroke-width="1.5" stroke-miterlimit="10"/>
                </g>
                <defs>
                <clipPath id="clip0_72_7">
                <rect width="16" height="16" fill="white"/>
                </clipPath>
                </defs>
            </svg>
        `
        delete_btn.setAttribute('type', 'button');
        delete_btn.addEventListener('click', () => {
            delete_btn.parentElement.remove();
        })
    
        author.appendChild(author_info);
        author.appendChild(edit_btn);
        author.appendChild(delete_btn);
    
        author_list.appendChild(author);
    
        document.querySelector('#first-name-journal').value = '';
        document.querySelector('#last-name-journal').value = '';
    })
    document.querySelector('#year').value = entry.published_date.year;
    document.querySelector('#month').value = entry.published_date.month;
    document.querySelector('#day').value = entry.published_date.day;
    document.querySelector('#article-title-holder').value = entry.article_title;
    document.querySelector("#volume-holder").value = entry.volume;
    document.querySelector("#issue").value = entry.issue;
    document.querySelector("#page-range").value = entry.page_range;
    document.querySelector("#doi-link").value = entry.doi;

    collections.forEach((collection) => {
        collection.entries = collection.entries.filter((e) => e.title != entry.title)
    })
}

const edit_collection_entry = (title_of_entry) => {
    collections.forEach((collection) => {
        collection.entries.forEach((entry) => {
            if (entry.format_type == 'book' && entry.title == title_of_entry) {
                document.querySelector('.main').style.display = 'block'
                document.querySelector('.journal-form').style.display = 'none'
                document.querySelector('.extension').style.display = 'none'
                form_type = 'book'
                fill_up_book(entry)
            } else if (entry.format_type == 'journal' && entry.title == title_of_entry) {
                document.querySelector('.main').style.display = 'none'
                document.querySelector('.journal-form').style.display = 'block'
                document.querySelector('.extension').style.display = 'none'
                form_type = 'journal'
                fill_up_journal(entry)
            }
        })
    })
}

const call_all_these_on_get = () => {
    document.querySelector('.notemptydiv').innerHTML = ''
    if (collections.length !== 0) {
        emptydiv.style.display = 'none'
        notemptydiv.style.display = 'flex'
    }

    collections.forEach((collection) => {
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

    document.querySelector('.dropdown-citation-collection-name-journal').addEventListener('click', () => {
        if (document.querySelector('.citation-collections-journal').style.display == 'flex')
            document.querySelector('.citation-collections-journal').style.display = 'none'
        else
            document.querySelector('.citation-collections-journal').style.display = 'flex'
    })

    /* drop down to select the collection for citation */
    const citation_collections = document.querySelector('.citation-collections');
    collections.forEach((collection) => {
        const collection_div = document.createElement('div');
        collection_div.classList.add('collection-name');
        collection_div.textContent = collection.collection_name
        collection_div.addEventListener('click', () => {
            present_collection_name = collection.collection_name
            document.querySelector('.dropdown-citation-collection-name').textContent = present_collection_name
            document.querySelector('.citation-collections').style.display = 'none'
        })
        citation_collections.appendChild(collection_div)
    })

    const citation_collections_journal = document.querySelector('.citation-collections-journal');
    collections.forEach((collection) => {
        const collection_div = document.createElement('div');
        collection_div.classList.add('collection-name');
        collection_div.textContent = collection.collection_name
        collection_div.addEventListener('click', () => {
            present_collection_name = collection.collection_name
            console.log('this collection name is saved', present_collection_name)
            document.querySelector('.dropdown-citation-collection-name-journal').textContent = present_collection_name
            document.querySelector('.citation-collections-journal').style.display = 'none'
        })
        citation_collections_journal.appendChild(collection_div)
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
            if (present_citation_format == 'MLA' && form_type == 'book'){
                const result = create_entry_for_book()
                console.log(result)
                converted_reference = To_MLA(result, 'book')
                document.querySelector('.preview-text').textContent = converted_reference
            } else if (present_citation_format == 'APA' && form_type == 'book') {
                const result = create_entry_for_book()
                console.log(result)
                converted_reference = To_APA(result, 'book')
                document.querySelector('.preview-text').textContent = converted_reference
            }
        })
    })

    document.querySelector('.dropdown-journal').addEventListener('click', () => {
        if (document.querySelector('.citation-formats-journal').style.display == 'flex')
            document.querySelector('.citation-formats-journal').style.display = 'none'
        else
            document.querySelector('.citation-formats-journal').style.display = 'flex'
    })
    const citation_formats_journal = document.querySelectorAll('.citation-format');

    citation_formats_journal.forEach((citation_format) => {
        citation_format.addEventListener('click', () => {
            present_citation_format = citation_format.textContent
            console.log('this citation_format is saved', present_citation_format)
            document.querySelector('.dropdown-journal').textContent = present_citation_format
            document.querySelector('.citation-formats-journal').style.display = 'none'
            if (present_citation_format == 'MLA' && form_type == 'journal'){
                const result = create_entry_for_journal()
                console.log(result)
                converted_reference = To_MLA(result,'journal')
                document.querySelector('.journal-preview-text').textContent = converted_reference
            } else if (present_citation_format == 'APA' && form_type == 'journal') {
                const result = create_entry_for_journal()
                console.log(result)
                converted_reference = To_APA(result, 'journal')
                document.querySelector('.journal-preview-text').textContent = converted_reference
            }
        })
    })

    /* adds to collection */
    const add_to_collection_btn = document.querySelector('.add-to-collection');
    add_to_collection_btn.addEventListener('click', () => {
        adds_book_to_collection();
        revert_back_to_homepage();
    })

    /* adds to collection for journal only */
    const add_to_collection_btn_journal = document.querySelector('.add-to-collection-journal');
    add_to_collection_btn_journal.addEventListener('click', () => {
        adds_journal_to_collection();
        revert_back_to_homepage();
    })

    /* checks for each entry click to edit the entry */
    document.querySelectorAll('.entrytitle > div').forEach((entry) => {
        entry.addEventListener('click', () => {
            edit_collection_entry(entry.textContent)
        })
    })
}

// present collection name
let present_collection_name = ''
let present_citation_format = ''

const revert_back_to_homepage = () => {
    document.querySelector('.main').style.display = 'none'
    document.querySelector('.journal-form').style.display = 'none'
    document.querySelector('.extension').style.display = 'block'
    form_type = ''
}

const adds_book_to_collection = () => {
    const entry_book = {
        "format_type": "book",
        "title": document.querySelector('#book-title').value,
        "author": [
            document.querySelectorAll('.author>p').forEach((author) => {
                return {
                    "first_name": author.textContent.split(' ')[0],
                    "last_name": author.textContent.split(' ')[1]
                }
            })
        ],
        "published_date": {
            "year": document.querySelector('#year').value,
            "month": document.querySelector('#month').value,
            "day": document.querySelector('#day').value,
        },
        "publisher_name": document.querySelector("#publisher").value,
        "edition": document.querySelector("#edition").value,
        "volume": document.querySelector("#volume").value,
    }
    collections.forEach((collection) => {
        if (collection.collection_name == present_collection_name) {
            collection.entries.push(entry_book)
        }
    })

    chrome.storage.local.set({ "collections": collections }, async () => {
        await console.log("data saved😉", collections);
        call_all_these_on_get();
    })
}

const adds_journal_to_collection = () => {
    const entry_journal = {
        "format_type": "journal",
        "title": document.querySelector('#journal-name').value,
        "author": [
            document.querySelectorAll('.author>p').forEach((author) => {
                return {
                    "first_name": author.textContent.split(' ')[0],
                    "last_name": author.textContent.split(' ')[1]
                }
            })
        ],
        "published_date": {
            "year": document.querySelector('#year').value,
            "month": document.querySelector('#month').value,
            "day": document.querySelector('#day').value,
        },
        "article_title": document.querySelector('#article-title-holder').value,
        "volume": document.querySelector("#volume-holder").value,
        "issue": document.querySelector("#issue").value,
        "page_range": document.querySelector("#page-range").value,
        "doi": document.querySelector("#doi-link").value,
    }
    collections.forEach((collection) => {
        if (collection.collection_name == present_collection_name) {
            collection.entries.push(entry_journal)
        }
    })

    chrome.storage.local.set({ "collections": collections }, async () => {
        await console.log("data saved😉", collections);
        call_all_these_on_get();
    })
}

const save_collection = [
    {
        "collection_name": "The Dorm Den",
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
                "published_date": {
                    "year": "2011",
                    "month": "06",
                    "day": "12",
                },
                "edition": "1st",
                "volume": "IX"
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
                "published_date": {
                    "year": "2012",
                    "month": "05",
                    "day": "17",
                },
                "edition": "3rd",
                "volume": "925"
            },
            {
                "format_type": "book",
                "title": "The Gloom of the morning",
                "author": [
                    {
                        "first_name": "Ranjit",
                        "last_name": "Gupta"
                    }
                ],
                "published_date": {
                    "year": "2001",
                    "month": "05",
                    "day": "11",
                },
                "publisher_name": "GL book house",
                "edition": "9th",
                "volume": "VII",
            }
        ]
    },
    {
        "collection_name": "UXCam Codecamp",
        "collection_emoji": "🙉",
        "entries": [
            {
                "format_type": "journal",
                "title": "The ROMANS",
                "author": [ 
                    {
                        "first_name": "Bikram",
                        "last_name": "Pandey"
                    }
                ],
                "published_date": {
                    "year": 2015,
                    "month": 09,
                    "day": 10,
                },
                "article_title": "The UX journey",
                "volume": "VI",
                "issue": "09",
                "page_range": "12-24",
                "doi": "https:www.youtube.com/watch=xyHgt"
            }
        ]
    },
    {
        "collection_name": "The Rise of the Apes",
        "collection_emoji": "🐼",
        "entries": [
            {
                "format_type": "book",
                "title": "The geospatial data",
                "author": [
                    {
                        "first_name": "Apenath",
                        "last_name": "Pandey"
                    }
                ],
                "published_date": {
                    "year": "2011",
                    "month": "06",
                    "day": "12",
                },
                "edition": "1st",
                "volume": "IX"
            },
            {
                "format_type": "book",
                "title": "The first human",
                "author": [
                    {
                        "first_name": "Ramesh",
                        "last_name": "Gupta"
                    }
                ],
                "published_date": {
                    "year": "2012",
                    "month": "05",
                    "day": "17",
                },
                "edition": "3rd",
                "volume": "925"
            },
            {
                "format_type": "book",
                "title": "The money maker",
                "author": [
                    {
                        "first_name": "Ranjit",
                        "last_name": "Gupta"
                    }
                ],
                "published_date": {
                    "year": "2001",
                    "month": "05",
                    "day": "11",
                },
                "publisher_name": "GL book house",
                "edition": "9th",
                "volume": "VII",
            }
        ]
    }
]

chrome.storage.local.set({ "collections": save_collection }, () => {
    console.log("data saved");
})

chrome.storage.local.get(["collections"], (result) => {
    collections = result.collections
    // non empty populate in the home page
    call_all_these_on_get()
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
            const journalpage = document.querySelector('.journal-form');
            homepage.style.display = 'none'
            journalpage.style.display = 'none'
            const bookform = document.querySelector('.main');
            bookform.style.display = 'block'
            form_type = 'book'
        } else if (reference_type.textContent == 'Journal') {
            const homepage = document.querySelector('.extension');
            const bookform = document.querySelector('.main');
            homepage.style.display = 'none'
            bookform.style.display = 'none'
            const journalpage = document.querySelector('.journal-form');
            journalpage.style.display = 'block'
            form_type = 'journal'
        }
    })
})

document.querySelector('#add-author-journal').addEventListener('click', () => {
    const author_list = document.querySelector('.journal-authors');

    const author = document.createElement('div');
    author.classList.add('author-journal');
    author.style.border = 'none';
    author.style.borderRadius = '5px';
    author.style.backgroundColor = '#11d8a3';
    author.style.margin = '5px';

    const author_info = document.createElement('p');
    author_info.textContent = `${document.querySelector('#first-name-journal').value} ${document.querySelector('#last-name-journal').value}`;
    author_info.style.color = 'white';

    const edit_btn = document.createElement('button');
    edit_btn.classList.add("edit-author-journal");
    edit_btn.style.backgroundColor = '#e32636';
        edit_btn.style.border = 'none';
        edit_btn.style.borderRadius = '5px';
        edit_btn.style.display = 'flex';
        edit_btn.innerHTML = `
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clip-path="url(#clip0_72_4)">
            <path d="M5.99998 14.6667H9.99998C13.3333 14.6667 14.6666 13.3334 14.6666 10V6.00004C14.6666 2.66671 13.3333 1.33337 9.99998 1.33337H5.99998C2.66665 1.33337 1.33331 2.66671 1.33331 6.00004V10C1.33331 13.3334 2.66665 14.6667 5.99998 14.6667Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M11.6667 5.8L6.77337 9.46M11.6667 10.1867L6.77337 6.52667M5.61337 7.26666C5.95285 7.26666 6.27842 7.13181 6.51847 6.89176C6.75852 6.65171 6.89337 6.32614 6.89337 5.98666C6.89337 5.64719 6.75852 5.32161 6.51847 5.08157C6.27842 4.84152 5.95285 4.70667 5.61337 4.70667C5.2739 4.70667 4.94832 4.84152 4.70828 5.08157C4.46823 5.32161 4.33337 5.64719 4.33337 5.98666C4.33337 6.32614 4.46823 6.65171 4.70828 6.89176C4.94832 7.13181 5.2739 7.26666 5.61337 7.26666ZM5.61337 11.2933C5.95285 11.2933 6.27842 11.1585 6.51847 10.9184C6.75852 10.6784 6.89337 10.3528 6.89337 10.0133C6.89337 9.67386 6.75852 9.34828 6.51847 9.10824C6.27842 8.86819 5.95285 8.73333 5.61337 8.73333C5.2739 8.73333 4.94832 8.86819 4.70828 9.10824C4.46823 9.34828 4.33337 9.67386 4.33337 10.0133C4.33337 10.3528 4.46823 10.6784 4.70828 10.9184C4.94832 11.1585 5.2739 11.2933 5.61337 11.2933Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </g>
            <defs>
            <clipPath id="clip0_72_4">
            <rect width="16" height="16" fill="white"/>
            </clipPath>
            </defs>
        </svg>
        `
    edit_btn.setAttribute('type', 'button');
    edit_btn.addEventListener('click', () => {
        const author_info_new = edit_btn.parentElement.querySelector('p');
        document.querySelector('#first-name-journal').value = author_info_new.textContent.split(' ')[0];
        document.querySelector('#last-name-journal').value = author_info_new.textContent.split(' ')[1];
        edit_btn.parentElement.remove();
    })

    const delete_btn = document.createElement('button');
    delete_btn.classList.add("remove-author-journal");
    delete_btn.style.backgroundColor = '#e32636';
    delete_btn.style.border = 'none';
    delete_btn.style.borderRadius = '5px';
    delete_btn.style.display = 'flex';
    delete_btn.innerHTML = `
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clip-path="url(#clip0_72_7)">
            <path d="M9.20661 10.4867L6.84661 8.12671M9.17995 8.15338L6.81995 10.5134" stroke="white" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M14.6667 7.33337V11.3334C14.6667 14 14 14.6667 11.3334 14.6667H4.66671C2.00004 14.6667 1.33337 14 1.33337 11.3334V4.66671C1.33337 2.00004 2.00004 1.33337 4.66671 1.33337H5.66671C6.66671 1.33337 6.88671 1.62671 7.26671 2.13337L8.26671 3.46671C8.52004 3.80004 8.66671 4.00004 9.33337 4.00004H11.3334C14 4.00004 14.6667 4.66671 14.6667 7.33337Z" stroke="white" stroke-width="1.5" stroke-miterlimit="10"/>
            </g>
            <defs>
            <clipPath id="clip0_72_7">
            <rect width="16" height="16" fill="white"/>
            </clipPath>
            </defs>
        </svg>
    `
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

    document.querySelector('#first-name-journal').value = '';
    document.querySelector('#last-name-journal').value = '';
})

add_author_btn.addEventListener('click', () => {
    const author_list = document.querySelector('.author-list');

    const author = document.createElement('div');
    author.classList.add('author');
    author.style.border = 'none';
    author.style.borderRadius = '5px';
    author.style.backgroundColor = '#11d8a3';
    author.style.margin = '5px';

    const author_info = document.createElement('p');
    author_info.textContent = `${author_first_name.value} ${author_last_name.value}`;
    author_info.style.color = 'white';

    const edit_btn = document.createElement('button');
    edit_btn.classList.add("edit-author");
    edit_btn.style.backgroundColor = '#e32636';
    edit_btn.style.border = 'none';
    edit_btn.style.borderRadius = '5px';
    edit_btn.style.display = 'flex';
    edit_btn.innerHTML = `
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clip-path="url(#clip0_72_4)">
        <path d="M5.99998 14.6667H9.99998C13.3333 14.6667 14.6666 13.3334 14.6666 10V6.00004C14.6666 2.66671 13.3333 1.33337 9.99998 1.33337H5.99998C2.66665 1.33337 1.33331 2.66671 1.33331 6.00004V10C1.33331 13.3334 2.66665 14.6667 5.99998 14.6667Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M11.6667 5.8L6.77337 9.46M11.6667 10.1867L6.77337 6.52667M5.61337 7.26666C5.95285 7.26666 6.27842 7.13181 6.51847 6.89176C6.75852 6.65171 6.89337 6.32614 6.89337 5.98666C6.89337 5.64719 6.75852 5.32161 6.51847 5.08157C6.27842 4.84152 5.95285 4.70667 5.61337 4.70667C5.2739 4.70667 4.94832 4.84152 4.70828 5.08157C4.46823 5.32161 4.33337 5.64719 4.33337 5.98666C4.33337 6.32614 4.46823 6.65171 4.70828 6.89176C4.94832 7.13181 5.2739 7.26666 5.61337 7.26666ZM5.61337 11.2933C5.95285 11.2933 6.27842 11.1585 6.51847 10.9184C6.75852 10.6784 6.89337 10.3528 6.89337 10.0133C6.89337 9.67386 6.75852 9.34828 6.51847 9.10824C6.27842 8.86819 5.95285 8.73333 5.61337 8.73333C5.2739 8.73333 4.94832 8.86819 4.70828 9.10824C4.46823 9.34828 4.33337 9.67386 4.33337 10.0133C4.33337 10.3528 4.46823 10.6784 4.70828 10.9184C4.94832 11.1585 5.2739 11.2933 5.61337 11.2933Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </g>
        <defs>
        <clipPath id="clip0_72_4">
        <rect width="16" height="16" fill="white"/>
        </clipPath>
        </defs>
    </svg>
    `
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
    delete_btn.style.backgroundColor = '#e32636';
    delete_btn.style.border = 'none';
    delete_btn.style.borderRadius = '5px';
    delete_btn.style.display = 'flex';
    delete_btn.innerHTML = `
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clip-path="url(#clip0_72_7)">
            <path d="M9.20661 10.4867L6.84661 8.12671M9.17995 8.15338L6.81995 10.5134" stroke="white" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M14.6667 7.33337V11.3334C14.6667 14 14 14.6667 11.3334 14.6667H4.66671C2.00004 14.6667 1.33337 14 1.33337 11.3334V4.66671C1.33337 2.00004 2.00004 1.33337 4.66671 1.33337H5.66671C6.66671 1.33337 6.88671 1.62671 7.26671 2.13337L8.26671 3.46671C8.52004 3.80004 8.66671 4.00004 9.33337 4.00004H11.3334C14 4.00004 14.6667 4.66671 14.6667 7.33337Z" stroke="white" stroke-width="1.5" stroke-miterlimit="10"/>
            </g>
            <defs>
            <clipPath id="clip0_72_7">
            <rect width="16" height="16" fill="white"/>
            </clipPath>
            </defs>
        </svg>
    `
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