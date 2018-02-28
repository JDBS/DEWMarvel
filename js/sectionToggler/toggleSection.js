var section='comics';



$(function(){
  $(CONFIG.charactersSection).hide();
  
  $('#toggleCharacters').on('click',function(){
    $(CONFIG.charactersSection).show();
    $(CONFIG.comicsSection).hide();
  })
  
  $('#toggleComics').on('click',function(){
    $(CONFIG.comicsSection).show();
    $(CONFIG.charactersSection).hide();
  })
})
