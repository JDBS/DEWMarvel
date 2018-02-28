function drawComics(list){
  const comicsList=list.map(
    (comic)=>{
      return new Comic(idAsigner.getId(),comic.title||comic.name,comic.description,comic.thumbnail).getSaveObject();
    }
  );
  reloadComicsPagination();
  save(comicsList,CONFIG.comicsLocalSaveId);
}

function drawComicsError(){
  toastr.error('Fallo al cargar los personajes');
}

function getComics() {
  const comicList = load(CONFIG.comicsLocalSaveId);
  if(comicList){
    drawComics(comicList);
    return;
  }

  $.ajax('https://gateway.marvel.com:443/v1/public/comics?limit=100&apikey=aa633e47b4a2efbdb458826fd0ed9b9a',{
      success:function(response){
        drawComics(response.data.results);
      },
      beforeSend:function(){
        $(CONFIG.comicsContainer).addClass('spinner');
      },
      timeout:3000,
      error:function(jqXHR,textStatus,errorThrown){ //Control de errores
        console.error(`${textStatus}: ${errorThrown}`);
        drawComicsError();
      },
      complete:function(response){
        $(CONFIG.comicsContainer).removeClass('spinner');
      },
      data:{/*DataToSend*/}
    }
  )
}