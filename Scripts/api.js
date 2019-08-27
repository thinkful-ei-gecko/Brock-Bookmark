'use strict';
/* global store, $ */

// eslint-disable-next-line no-unused-vars
const api = (function() {

  const BASE_URL = 'https://thinkful-list-api.herokuapp.com/brock';

  const getBookmarks = function() {
    return fetch(BASE_URL + '/bookmarks')
    .then(res => res.json()); 
  };

  const createItem = function(title, url, desc, rating, callback, onError) {
    const newItem = JSON.stringify(
      {
        title: title,
        url: url,
        desc: desc,
        rating: rating
      });

    $.ajax({
      url: BASE_URL + '/bookmarks',
      method: 'POST',
      contentType: 'application/json',
      data: newItem,
      success: callback,
      error: onError,
    });
  };

  const deleteItem = function(id) {
    return fetch(`${BASE_URL}/bookmarks/${id} `, {
      method: 'DELETE'
    });
  };

  return {
    getBookmarks,
    createItem,
    deleteItem
  };

})();


