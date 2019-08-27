'use strict';
/* global store, $ */

// eslint-disable-next-line no-unused-vars

// this will happen everytime the program laods
 
$(document).ready(function(){
  api.getBookmarks().then(bookmarks =>{
    bookmarks.forEach(bookmark => {
      store.addItem(bookmark);
    });
    bookmarkList.render();
  });
  bookmarkList.bindEventListeners();
});