function drawCharacters(list){
  const characterList=list.map(
    (character)=>{
      return new Character(idAsigner.getId(),character.name,character.thumbnail).getSaveObject();
    }
  );
  reloadCharactersPagination();
  save(characterList,CONFIG.charactersLocalSaveId);
}

function drawCharactersError(){
  toastr.error('Fallo al cargar los personajes');
}

function getCharacters() {
  const charList = load(CONFIG.charactersLocalSaveId);
  if(charList){
    drawCharacters(charList);
    return;
  }
  $.ajax('https://gateway.marvel.com:443/v1/public/characters?limit=100&apikey=aa633e47b4a2efbdb458826fd0ed9b9a',{
      success:function(response){
        drawCharacters(response.data.results);
      },
      beforeSend:function(){
        $(CONFIG.charactersContainer).addClass('spinner');
      },
      timeout:3000,
      error:function(jqXHR,textStatus,errorThrown){
        console.error(`${textStatus}: ${errorThrown}`);
        drawCharactersError();
      },
      complete:function(response){
        $(CONFIG.charactersContainer).removeClass('spinner');
      },
      data:{/*DataToSend*/}
    }
  )
}