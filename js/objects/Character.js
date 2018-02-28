class Character{
  constructor(id, name,thumbnail){
    this.id=id;
    this.name=name;
    this.thumbnail=thumbnail;
    this.element;
    this.shownLong=false;

    this.render();
    this.clickEvent();
  }

  getSaveObject(){
    const saveObject={
      id:this.id,
      name:this.name,
      thumbnail:this.thumbnail
    }
    return saveObject;
  }

  clickEvent(){
    $('button',`#character${this.id}`)
      .on('click',()=>voteCharacter(this));
  }

  getThumbnail(){
    return `${this.thumbnail.path}.${this.thumbnail.extension}`;
  }

  render() {
    this.element=$(CONFIG.charactersContainer).append(`
      <div class="character" id="character${this.id}">
        <img src="${this.getThumbnail()}"/>
        <div>
          <h2>${this.name}</h2><br/>
          <button>Votar</button>
        </div>
      </div>
    `);
  }
}