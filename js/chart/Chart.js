
var chart;
var options;
$(()=>{
  setChangeEvent();
  drawBars();
  drawPie();
  drawDonut();
  setToggleChart();
  $(".chart").addClass("not-displayed");
  $(".barschart").removeClass("not-displayed");
  $('.character-charts').toggleClass('not-displayed');
});


function setToggleChart(){
  $('#toggleChart').on('click',()=>{
    $('.comic-charts').toggleClass('not-displayed');
    $('.character-charts').toggleClass('not-displayed');
  })
}

function setChangeEvent(){
  $('input[name="comicchartselect"]').change(
    (event)=>{
    let mode=$(event.target).val();
    switch(mode){
      case 'bars':
        $(".chart",'.comic-charts').addClass("not-displayed");
        $(".barschart",'.comic-charts').removeClass("not-displayed");
        break;
      case 'pie':
        $(".chart",'.comic-charts').addClass("not-displayed");
        $(".piechart",'.comic-charts').removeClass("not-displayed");
        break;
      case 'donut':
        $(".chart",'.comic-charts').addClass("not-displayed");
        $(".donutchart",'.comic-charts').removeClass("not-displayed");
        break;
      default:
        break;
    }
  }); 
  $('input[name="charchartselect"]').change(
    (event)=>{
    let mode=$(event.target).val();
    switch(mode){
      case 'bars':
        $(".chart",'.character-charts').addClass("not-displayed");
        $(".barschart",'.comic-charts').removeClass("not-displayed");
        break;
      case 'pie':
        $(".chart",'.character-charts').addClass("not-displayed");
        $(".piechart",'.comic-charts').removeClass("not-displayed");
        break;
      case 'donut':
        $(".chart",'.character-charts').addClass("not-displayed");
        $(".donutchart",'.comic-charts').removeClass("not-displayed");
        break;
      default:
        break;
    }
  }); 
}


function getMovieTitleById(movieId){
  let movie = MOVIES.find(
    (movie)=>movie.id==movieId
  );
  if(movie)
    return movie.title;
  else
    return undefined;
}

function findItem(list,name){
  return list.find(
    (item)=>item.name==name
  );
}

function getComics(users){
  const comics=[];
  users.forEach(
    (user)=>{
      if(user.vote.type=='comic'){
        const item=findItem(comics,user.vote.name);
        if(!item){
          comics.push(
            [
              user.vote.name,
              1
            ]
          )
        }else{
          item[1]++;
        }
      }
    }
  );
  return comics;
}

function getCharacters(users){
  const characters=[];
  users.forEach(
    (user)=>{
      if(user.vote.type=='character'){
        const item=findItem(comics,user.vote.name);
        if(!item){
          comics.push(
            [
              user.vote.name,
              1
            ]
          )
        }else{
          item[1]++;
        }
      }
    }
  );
  return characters;
}


function getData(){
  let users=loadUsers();
  const comics=[['Comic','Votos']].concat(getComics(users));;
  const characters=[['Personaje','Votos']].concat(getCharacters(users));

  return {comics,characters};
}



function drawBars(){
  google.charts.load('current', {'packages':['bar']});
  google.charts.setOnLoadCallback(renderBars);
}

function renderBars(){
  charOptions = {
    chart: {
      title: 'Personajes Votados',
      subtitle: 'Personajes',
    },
    bars: 'vertical' // Required for Material Bar Charts.
  };  
  comOptions = {
    chart: {
      title: 'Comics Votados',
      subtitle: 'Comics',
    },
    bars: 'vertical' // Required for Material Bar Charts.
  };

  const data=getData();
  var comData = google.visualization.arrayToDataTable(data.comics);
  var charData = google.visualization.arrayToDataTable(data.characters);

  comicChart = new google.charts.Bar($('.barschart', '.comic-charts')[0]);
  charChart = new google.charts.Bar($('.barschart', '.character-charts')[0]);

  comicChart.draw(comData, google.charts.Bar.convertOptions(comOptions));
  charChart.draw(charData, google.charts.Bar.convertOptions(charOptions));
}

function drawPie(){
  google.charts.load('current', {'packages':['corechart']});
  google.charts.setOnLoadCallback(renderPie);
}

function renderPie(){
  charOptions = {
    title: 'Personajes',
    is3D: true,
  };  
  comOptions = {
    title: 'Comics',
    is3D: true,
  };

  
  const data=getData();
  var comData = google.visualization.arrayToDataTable(data.comics);
  var charData = google.visualization.arrayToDataTable(data.characters);

  comicChart = new google.visualization.PieChart($('.piechart', '.comic-charts')[0]);
  charChart = new google.visualization.PieChart($('.piechart', '.character-charts')[0]);

  comicChart.draw(comData, comOptions);
  charChart.draw(charData, charOptions);
}

function drawDonut(){
  google.charts.load('current', {'packages':['corechart']});
  google.charts.setOnLoadCallback(renderDonut);
}

function renderDonut(){
  charOptions = {
    title: 'Personajes',
    pieHole: 0.4
  };  
  comOptions = {
    title: 'Comics',
    pieHole: 0.4
  };
  
  const data=getData();
  var comData = google.visualization.arrayToDataTable(data.comics);
  var charData = google.visualization.arrayToDataTable(data.characters);

  comicChart = new google.visualization.PieChart($('.donutchart', '.comic-charts')[0]);
  charChart = new google.visualization.PieChart($('.donutchart', '.character-charts')[0]);

  comicChart.draw(comData, comOptions);
  charChart.draw(charData, charOptions);
}
