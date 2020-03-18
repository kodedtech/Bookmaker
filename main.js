// listen to for submit
document.querySelector("#myForm").addEventListener("submit", saveBookmark);

function saveBookmark(e) {
    // prevent default submission
    e.preventDefault();

    // getting values from input fields
    let siteName = document.querySelector("#siteName").value;
    let siteUrl = document.querySelector("#siteUrl").value;

    if (!validateForm(siteName, siteUrl)) {
        return false;
    }

    // create an object to hold our values
    let bookmark ={
        site: siteName,
        url: siteUrl
    }

// pass data into localStorage
if(localStorage.getItem("bookmark") === null) {
    // init bookmarks array
    let bookmarks = [];
    
    // add data to array
    bookmarks.push(bookmark);

    // set our localstorage
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
} else {
    // get bookmarks from localstorage
    let bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
    // add data to array
    bookmarks.push(bookmark);

    // set our localstorage
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
}

// reset my input fields
document.querySelector('#myForm').reset();
fetchBookmarks();
}

function fetchBookmarks(){
    // get bookmarks from localstorage
    let bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
    // get output id
    let bookmarksResults = document.querySelector("#bookmarksResults");

    // build output
    bookmarksResults.innerHTML = '';
    for(i = 0; i < bookmarks.length; i++ ) {
        let site = bookmarks[i].site;
        let url = bookmarks[i].url;

        bookmarksResults.innerHTML += 
        '<div class="well">' +
        "<h3>" + 
        site +
        '<a class="btn btn-primary ml-2" target="_blank" href=""> Visit </a>' +
        '<a onclick="deleteBookmark(url)" class="btn btn-danger ml-2" href="#"> Delete </a>' + 
        "</h3" +
        "</div";
    }

}

// validate form
function validateForm(siteName, siteUrl){
if(!siteName || !siteUrl) {
    alert("Please fill the two form field");
    return false;
    }


let expression = /[-a-zA-Z0-9@:%\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%\+.~#?&//=]*)?/gi;
let regex = new RegExp(expression);

if(!siteUrl.match(regex)) {
    alert("Please enter a valid url");
    return false;
}

return true;
}

// delete bookmarker
function deleteBookmark(url) {
    // get bookmark from localstorage
    let bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
    // loop through the bookmarks
    for (i =0; i < bookmarks.length; i++) {
        if (bookmarks[i].url == url) {
            // remove from array
            bookmarks.splice(i, 1);
        }
    }
    // set our localstorage
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));

    // re-fetch our bookmarks
    fetchBookmarks();
}
