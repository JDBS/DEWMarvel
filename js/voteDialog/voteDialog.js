const SAVE_VOTE_MOVIE_ID='votemovie'; // Id de guardado
                                      // de la movie seleccionada
const SAVE_VOTE_USER_ID='voteuser';

var dialog;
$(function() {
  if(!dialog){
    var form,

    emailRegex = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
    name = $( "#name" ),
    email = $( "#email" ),
    phone = $( "#phone" ),
    allFields = $( [] ).add( name ).add( email ).add( phone ),
    tips = $( ".validateTips" );


    function updateTips( t ) {
      tips
        .text( t )
        .addClass( "ui-state-highlight" );
      setTimeout(function() {
        tips.removeClass( "ui-state-highlight", 1500 );
      }, 500 );
    }

    function checkLength( o, n, min, max ) {
      if ( o.val().length > max || o.val().length < min ) {
        o.addClass( "ui-state-error" );
        updateTips( "La longitud de " + n + " debe estar entre " +
          min + " y " + max + "." );
        return false;
      } else {
        return true;
      }
    }

    function checkRegexp( o, regexp, n ) {
      if ( !( regexp.test( o.val() ) ) ) {
        o.addClass( "ui-state-error" );
        updateTips( n );
        return false;
      } else {
        return true;
      }
    }

    function addUser() {
      var valid = true;
      allFields.removeClass( "ui-state-error" );

      valid = valid && checkLength( name, "username", 3, 16 );
      valid = valid && checkLength( email, "email", 6, 80 );
      valid = valid && checkLength( phone, "phone", 9, 9 );

      valid = valid && checkRegexp( name, /^[a-z]([0-9a-z_\s])+$/i, "Un nombre solo puede contener a-z, 0-9, barras bajas, espacios y debe empezar por una letra." );
      valid = valid && checkRegexp( email, emailRegex, "Debe ser un email válido ej: voto@peliculas.com" );
      valid = valid && checkRegexp( phone, /^[0-9]+$/, "Ún teléfono está únicamente compuesto por números." );

      if ( valid ) {

        //SAVE_VOTE_MOVIE_ID

        let user= new User({
          name:name.val(),
          email:email.val(),
          phone:phone.val(),
          vote:load(CONFIG.voteSave),
          subscription:true
        });

        saveSingleUser(user);

        dialog.dialog( "close" );
        window.location.href="results.html";
      }
      return valid;
    }

    dialog = $( "#dialog-form" ).dialog({
      autoOpen: false,
      height: 650,
      width: 350,
      modal: true,
      buttons: {
        "Votar Película": addUser,
        "Cancelar": function() {
          dialog.dialog( "close" );
        }
      },
      close: function() {
        form[ 0 ].reset();
        allFields.removeClass( "ui-state-error" );
      }
    });

    form = dialog.find( "form" ).on( "submit", function( event ) {
      event.preventDefault();
      addUser();
    });
  }
});


function setDialogInfo(item){
  $('.ui-dialog-title')
    .text(`Votar por ${item.name}`);

  dialog
    .find('img')
      .attr('src',item.getThumbnail());
}

function voteComic(comic){
  save(undefined,CONFIG.characterVoteSave);
  save({type:'comic',name:comic.name},CONFIG.voteSave);
  setDialogInfo(comic);
  dialog.dialog( "open" );
}

function voteCharacter(character){
  save(undefined,CONFIG.comicVoteSave);
  save({type:'character',name:comic.name},CONFIG.voteSave);
  setDialogInfo(character);
  dialog.dialog( "open" );
}

