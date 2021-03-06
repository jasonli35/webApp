function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
      results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return "";
    return decodeURIComponent(results[2].replace(/\+/g, " "));
  }

  function toCommas(value) {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  } 

  var getAllRecords = function() {
    $.getJSON(
      "https://api.airtable.com/v0/appaHUIRhhiRaZ1M7/Jobs?api_key=keydPFFsEoSQZlCym",
      function(airtable) {
        var html = [];
        $.each(airtable.records, function(index, record) {
          var id = record.id;
          var picture = record.fields["Image"];
          var jobTitle = record.fields["Job"];
          var jobDescription = record.fields["Description"];
          var rating =record.fields["Rating"];
          var medianHourlySalary = record.fields["MHS"];
        var unemploymentRate = record.fields["UnRate"];
          html.push(listView(id, picture, jobTitle, jobDescription,rating, medianHourlySalary, unemploymentRate));
        });
        $(".list-view").append(html);
      }
    );
  };

  var listView = function(id, picture, jobTitle, jobDescription ,rating,medianHourlySalary, unemploymentRate) {
    return `
      
   
  <div class="box">
  <div class="row">
    <div class="col-5">
    <div  class="item">
    ${picture ? `<img id="jobPicture" src="${picture[0].url}">` : ``}
    </div>
    </div>
    <div class="col">
    <h2><a href="index.html?id=${id}">${jobTitle}</h2></a>
    <div class="jobDescription">
    <p>${jobDescription}</p> </div>
    <a style="display:inline-block;" href="index.html?id=${id}">learn more</a>
    
    

    </div>
    <div class="col">
      <h3>Rating:</h3>
      
      <h4>${"⭐️".repeat(rating)} </h4>
      <h4>${rating}/10</h4>
      <h5>Median Hourly Salary: $${medianHourlySalary}</h5>
    <h5>Unemployment Rate: ${unemploymentRate}%</h5>
    </div>
  </div>
</div>
</div>
    `;
  };

  var getOneRecord = function(id) {
    $.getJSON(
      `https://api.airtable.com/v0/appaHUIRhhiRaZ1M7/Jobs/${id}?api_key=keydPFFsEoSQZlCym`,
      function(record) {
        console.log(record);
        var html = [];
        var jobTitle = record.fields["Job"];
        var qualification = record.fields["Qualification"];
        var description = record.fields["Description"];
        var picture = record.fields["Image"];
        var rating = record.fields["Rating"];
        var quality = record.fields["Quality"];
        var outlook =record.fields["Outlook"];
        var salary = record.fields["Salaries"];
        var medianYearlySalary = record.fields["MYS"];
        var medianHourlySalary = record.fields["MHS"];
        var unemploymentRate = record.fields["UnRate"];
        var fitting = record.fields["quality 2"]


        

       
       
        html.push(
          detailView(
            jobTitle,
            qualification,
            description,
            picture,
            rating,
            quality,
            outlook,
            salary,
            medianYearlySalary,
            medianHourlySalary,
            unemploymentRate,
            fitting,
            formattedString

          )
        );
        $(".detail-view").append(html);
      }
    );
  };
  
  function formattedString(value) {
    return value.split("+").join("<li>");
  }

  var detailView = function(
            jobTitle,
            qualification,
            description,
            picture,
            rating,
            quality,
            outlook,
            salary,
            medianYearlySalary,
            medianHourlySalary,
            unemploymentRate,
            fitting

  ) 
  
  {
    return `
    <div id="dV">
    <div style=" width: 100%; color: white; background-color: black; padding-top:0em; padding-bottom: 0.5em; float: left;"> 
    

    <h2 class="leftSpace" style=" display: inline;">Top career Jobs In Tech Industry</h2>
    <a href="index.html" class="btn-outline-primary btn-lg" role="button" aria-pressed="true" style="display: inline;padding-bottom: 0em;padding-top: 0em; top: 25px;left: 1650px; font-size: 2em">Home</a>
    
    
    
    
    </div>
    
    
   <div id="intro-grid-container">
   <div id="introLeft">
   ${picture ? `<img id="introPic" src="${picture[0].url}">` : ``}
    </div>
    <div id="introRight>
    <div id="detailViewIntro" style = "padding-top: 0em; padding-left: 0em;"> 
    <h1 style="font-size: 4em; ">${jobTitle}</h1>
    
    <h2 style="font-size: 3.5em; ">Rating: ${rating}/10</h2>
    <h4 class="threeEmFront">Median Yearly Salary: $${medianYearlySalary}</h2>
    <h4 class="threeEmFront">Median Hourly Salary: $${medianHourlySalary}</h2>
    <h4 class="threeEmFront">Unemployment Rate: ${unemploymentRate}%</h4>
    
    </div>

    
    </div>
    
  
  

    <h2 class="leftSpace">What a ${jobTitle} do?</h2>
    <div id="grid-container">
   
    <div id="left" class="leftSpace"><p class="leftSpace para">${description}</p> </div>
  
    <div id="right">
    ${salary ? `<img id="introPic" src="${salary[0].url}">` : ``}
    </div>

    </div>
    <h2 class="topSpace leftSpace">Qualification:</h2>
    <p class="leftSapcePara para">${qualification}</p>
    <h2 class="topSpace leftSpace">Fitting:</h2>
    
    <div class="leftSapcePara para"><ol>${formattedString(quality)}</ol></div>

    <h2 class="topSpace leftSpace">Career Outlook:</h2>
    <p class="leftSapcePara para">${outlook}</p>
    <br><br><br>
    </div>
   
    
  `;
};


var id = getParameterByName("id");
if (id) {
  getOneRecord(id);
} else {
  getAllRecords();
  // We hide the intro for the detail view, but wan to show it only in the list view
  $('#intro').css('display', 'grid');
};