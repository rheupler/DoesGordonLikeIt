const url = "https://www.googleapis.com/youtube/v3/search";
const API_KEY = "AIzaSyBZAOICmYahmk5fgmWE5MLXju6jZQpYabA";

/** Search form handling **/
document.addEventListener('DOMContentLoaded', () => {
  $('.search-form').submit(function (e) {
    e.preventDefault();
    let formValue = $('.query').val();
    if ( formValue === "" ) { return $("h1").html("Cannot be blank") };
    getRequest(formValue);
  });

  $('.query').value = null;
});

/** Function that makes API request;
 * @param {String} string               Value of form submission
 */
 function getRequest(formValue) {
   let searchTerm = `Gordon Ramsay ${formValue}`;
   let params = {
     part: 'snippet',
     key: API_KEY,
     maxResults: 10,
     q: searchTerm
   };

   $.getJSON(url, params, function (q) {
     showResults(q);
     const userValue = instanceCounter(document.body.innerHTML, `${formValue}`);
     const ramsayValue = instanceCounter(document.body.innerHTML, "ramsay");
     if ( userValue > 3 && ramsayValue > 3 ) {
       $("h1").html("He seems to have some strong opinions on that");
     } else {
       $("h1").html("I don't think he cares about that so much");
     }
   })

   .fail(function(jqxhr, textStatus) {
      const err = `Request Failed ${jqxhr.status} ${textStatus}`
    });
 }

/** Function that returns list of videos from YouTube API
 * @param {String} string               Will return list of results from API
 */
function showResults(results) {
  let html = "";
  let entries = results.items;


  $.each(entries, (index, value) => {
    if ( value === null ) { throw "Something went wrong" };
    let title = value.snippet.title;
    let thumbnail = value.snippet.thumbnails.default.url;
    let videoLink = value.id.videoId;
    html += `
      <div class="card video-items" onclick="videoItem('${videoLink}')" data-video-link="${videoLink}">
        <li>${title}</li>
        <img src="${thumbnail}"/>
        <p class="video-description">${value.snippet.description}</p>
      </div>
          `;
  });

  $('.results').html(html);
}

/** Function embeds YouTube video when given video ID;
 * @param {String} string               Video ID
 */
function videoItem(video) {
  let videoEmbed = "";
  const videoEmbedId = video;
  const URL = `https://www.youtube.com/embed/${videoEmbedId}`;

  videoEmbed += `<iframe className="embed-responsive-item" width="560" height="315" src=${URL}></iframe>`
  $(".video-embed").html(videoEmbed);
}

/** Function that count occurrences of a substring in a string;
 * @param {String} string               The string
 * @param {String} subString            Term you want to count
 */
 function instanceCounter(str, value) {
   const regExp = new RegExp(value, "gi");
   return (str.match(regExp) || []).length;
 }

$('.results-container').click(function(){
    $("html, body").animate({ scrollTop: 0 }, 600);
    return;
 });
