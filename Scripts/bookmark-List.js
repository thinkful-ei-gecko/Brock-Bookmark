'use strict';
/* global store, $ */

// eslint-disable-next-line no-unused-vars
const bookmarkList = (function() {

  function generateBookmarkItem(item) {
    return `
        <li class="bookmark-list-items js-bookmark-list-items" data-item-id="${item.id}" aria-label="click to expand bookmark item">
        <h3 class="list-title js-list-title">${item.title}</h3>
        <a class="list-link js-list-link" href="${item.url}" target="_blank">${item.url}</a>
        <section class="star-rating js-star-rating">
          <p class="star-number js-star-number" aria-label="${item.rating} star">${item.rating} STAR</p>
        </section>
        <button class="delete-buttton-clicked" data-item-id="${item.id}" type="submit">Delete</button>
      </li>`;   
  }

  function generateCreateBookmarkView() {
    return `
        <li class="create-bookmark-view js-create-bookmark-view" aria-live="polite">
          <h2>Create a Bookmark</h2>
            <form for="close-button" id="js-close-expanded" class="close-header-right js-header-right" id="close-button">
              <button class="create-close-button js-close-button" type="submit" aria-label="click to close expanded view">Close</button>
            </form>
            <form id="js-add-bookmark">
              <label for="add-bookmark-title"></label>
              <input class="add-bookmark add-bookmark-title js-add-bookmark-title" id="add-bookmark-title" name="title" type="text" placeholder="title" required aria-label="please enter a name for your bookmark">
              <label for="add-bookmark-link"></label>
              <input class="add-bookmark add-bookmark-link js-add-bookmark-link" id="add-bookmark-link" name="url" type="url" aria-label="please enter a url for your bookmark"value="http://" placeholder="http://url-address.com" required>
              <label for="add-bookmark-desc"></label>
              <input class="add-bookmark add-bookmark-desc js-add-bookmark-desc" id="add-bookmark-desc" name="desc" type="text" placeholder="Add long description here" aria-label="please enter a long description for your bookmark"align="top">
              <div id="add-star-rating js-add-star-rating">
                <div class="add-bookmark rate-radio-button js-rate-radio-buttons" aria-label="please select rating for new bookmark">
                  <fieldset>
                    <Legend required>STARS</Legend>
                    <label aria-label="select rating 5 star"for="5-stars">5</label>
                    <input type="radio" id="5-stars"
                      name="rate" value="5" required>
                    <label aria-label="select rating 4 star"for="4-stars">4</label>
                    <input type="radio" id="4-stars"
                      name="rate" value="4">
                    <label aria-label="select rating 3 star"for="3-stars">3</label>
                    <input type="radio" id="3-stars"
                      name="rate" value="3">
                    <label aria-label="select rating 2 star"for="2-stars">2</label>
                    <input type="radio" id="2-stars"
                      name="rate" value="2">
                    <label aria-label="select rating 1 star" for="1-stars">1
                    <input type="radio" id="1-star"
                      name="rate" value="1">
                  </fieldset>
                </div>
              </div>
              <div>
                <button class="add-button-submit js-add-button-submit" type="submit" aria-label="click to add bookmark">ADD</button>
              </div>
            </form>
          </li>`;
  }

  function generateBookmarkString(bookmarkList) {
    const items = bookmarkList.map((item) => generateBookmarkItem(item));
    return items.join('');
  }

  function render() {
    $('.js-bookmark-list').empty();
   
    if(store.adding) {
      const bookmarkForm = generateCreateBookmarkView();
      $('.js-bookmark-list').prepend(bookmarkForm);
    }

    //get current items
    let items = store.bookmarks;

    // create element string
    const bookmarkString = generateBookmarkString(items);

    //insert html into DOM
    $('.js-bookmark-list').append(bookmarkString);

  }
  
  // click to create a new bookmark
  function handleCreateBookmarkClicked() {
    $('#js-create-bookmark-form').on('submit', (function(event) {
      event.preventDefault();
      store.adding = true;
      render();
    }));
  }

  // to add a new bookmark
  function handleAddBookmarkClicked() {
    // TODO: clicking add needs to add the item to the bookmark list.
    $('body').on('submit', '#js-add-bookmark', (function(event) {
      event.preventDefault();
      const title = event.currentTarget.title.value;
      const url = event.currentTarget.url.value;
      const desc = event.currentTarget.desc.value;
      const rate = event.currentTarget.rate.value;

      api.createItem(title, url, desc, rate, function(response) {
        store.addItem(response);
        store.adding = false;
        render();
      });
    }));
  }

  function deleteBookmarkClicked() {
    $('body').on('click', '.delete-buttton-clicked', event =>{
      event.preventDefault();
      const id = $(event.target).data('item-id');

      api.deleteItem(id)
        .then(() => {
          store.findAndDelete(id);
          render();
        });
  
    });
  }



  function bindEventListeners() {
    handleCreateBookmarkClicked();
    handleAddBookmarkClicked();
    deleteBookmarkClicked();
  }
  return {
    bindEventListeners,
    render
  };


})();