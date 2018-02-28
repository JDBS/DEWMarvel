const pageItems=10;

function setPaginationFor(controller,itemSelector){
  $(controller).pagination({
    items: 100,
    itemsOnPage: pageItems,
    cssStyle: 'dark-theme',
    displayedPages:3,
    edges:1,
    onPageClick: function (pageNumber) {
      var start = pageItems * (pageNumber - 1);
      var end = start + pageItems;
      $(itemSelector,'.content').hide()
          .slice(start, end).show();
      return false;
    }
  });
}

function reloadComicsPagination(){
  $('.comics-pagination').pagination('selectPage', 1);
}

function reloadCharactersPagination(){
  $('.characters-pagination').pagination('selectPage', 1);
}

function paginate(){
  setPaginationFor('.comics-pagination','.comic');
  setPaginationFor('.characters-pagination','.character');
}