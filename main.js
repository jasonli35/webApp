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
          html.push(listView(id, picture, jobTitle, jobDescription,rating));
        });
        $(".list-view").append(html);
      }
    );
  };

  var listView = function(id, picture, jobTitle, jobDescription ,rating) {
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
      <h3>Rating</h3>
      
      <p>${"⭐️".repeat(rating)} </p>
      <p>${rating}/10</p>
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
            medianHourlySalary

          )
        );
        $(".detail-view").append(html);
      }
    );
  };

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
            medianHourlySalary

  ) {
    return `
    <div id="dV">
    <div style="color: white; background-color: black; padding-top:0em; padding-bottom: 0.5em"> <h2 class="leftSpace">Top career Jobs In Tech Industry</h2></div>
    
    
   <div id="intro-grid-container">
   <div id="introLeft">
    <div id="detailViewIntro"> 
    <h1>${jobTitle}</h1>
    <h2>Rating: ${rating}/10</h2>
    <h4>Median Yearly Salary: ${medianYearlySalary}</h2>
    <h4>Median Hourly Salary: ${medianHourlySalary}</h2>
    </div>
    </div>
    <div id="introRight>${picture
       ? `<img id="jobPicture" src="${picture[0].url}" alt="error">` : ``}
    </div>
    
  
    </div>

    <h2 class="leftSpace"> What a ${jobTitle} do?</h2>
    <div id="grid-container">
    <div id="left"><p class="leftSpace para">${description}</p></div>
    <div id="right">
    
      ${salary ? `<img id="jobPicture" src="${salary[0].url}">` : ``}
    
    </div>

    </div>
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