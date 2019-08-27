'use strict';
/* global store, $ */

// eslint-disable-next-line no-unused-vars

const store = (function() {
  let adding = false;
  let minimumRating = 0;

  const bookmarks = [];

  const setError = function(error) {
    this.error = error;
  };

  const addItem = function(item) {
    this.bookmarks.push(item);
  };

  const findById = function(id) {
    return this.bookmarks.find(item => item.id === id);
  };

  const findAndDelete = function(id) {
    this.bookmarks = this.bookmarks.filter(item => item.id !== id);
  };

  const findAndUpdate = function(id, newData) {
    let findId = this.findById(id);
    return Object.assign(findId, newData);
  };

  function filterByRating(val)  {
    this.minimumRating = val;
  }

  function getFilteredBrockmarks() {
    return this.bookmarks.filter( bookmark => {
      return bookmark.rating >= this.minimumRating;
    });
  }

  return {
    bookmarks,
    adding,
    setError,
    addItem,
    findById,
    findAndDelete,
    findAndUpdate,
    filterByRating,
    getFilteredBrockmarks,
    minimumRating
  };
})();