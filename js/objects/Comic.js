class Comic{
  constructor(id, name, description,thumbnail){
    this.id=id;
    this.name=name;
    this.longDescription=description || 'No existe Descripción';
    this.thumbnail=thumbnail;
    this.shortDescription=(description || 'No existe Descripción').substring(0,20)+'...';
    this.element;
    this.shownLong=false;

    this.render();
    this.hideLong();
    this.setShowHideEvent();
    this.clickEvent();
  }

  getSaveObject(){
    const saveObject={
      id:this.id,
      name:this.name,
      description:this.longDescription,
      thumbnail:this.thumbnail
    }
    return saveObject;
  }

  clickEvent(){
    $('button',`#comic${this.id}`)
      .on('click',()=>voteComic(this));
  }

  setShowHideEvent(){
    $('.show-hide',`#comic${this.id}`)
      .on('click',this.toggleDescription.bind(this));
  }

  toggleDescription(){
    if(this.shownLong){
      this.hideLong();
    }else{
      this.showLong();
    }
  }
  hideLong(){
    this.element.find('.long-desc').hide();
    this.element.find('.short-desc').show();
    this.element.find('.show-hide').text('Ver Más');
    this.shownLong=false;
  }

  showLong(){
    this.element.find('.long-desc').show();
    this.element.find('.short-desc').hide();
    this.element.find('.show-hide').text('Ver Menos');
    this.shownLong=true;
  }

  getThumbnail(){
    return `${this.thumbnail.path}.${this.thumbnail.extension}`;
  }
  
  render() {
    $(CONFIG.comicsContainer).append(`
      <div class="comic" id="comic${this.id}">
        <img src="${this.getThumbnail()}"/>
        <div>
          <h2>${this.name}</h2><br/>
          <button>Votar</button>
          <p class="short-desc">${this.shortDescription}</p>
          <p class="long-desc">${this.longDescription}</p>
          <p class="show-hide">Ver Más</p>
        </div>
      </div>
    `);
    this.element=$(`#comic${this.id}`)
  }
}