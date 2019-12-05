function formatLink(str){
  return str.trim().replace(new RegExp('src="/','g'), 'src="https://forums.voz.vn/').replace(new RegExp('href="/','g'), 'href="https://forums.voz.vn/');
}

function getYoutubeIdFromLink(url) {
  if (!url)
    return false;
  let regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  let match = url.match(regExp);

  if (match && match[2].length === 11) {
    return match[2];
  } else {
    return false;
  }
}

// data is node
function formatYoutubeLink(data){
  data.find('a').filter(function() {
    return (this.attribs['href'].includes('youtube') || this.attribs['href'].includes('youtu.be'));
  }).replaceWith(function() {
      let tmp = getYoutubeIdFromLink(this.attribs['href']);
      if (tmp)
        return `<iframe class="neo_player inner youtube" type="text/html" src="https://www.youtube.com/embed/${tmp}" frameborder="0" allowfullscreen=""></iframe>`;
  });
  return data.html();
}

function removeComment(str) {
  if (str)
    return str.replace(/<\!--.*?-->/g, "");
  return '';
}

// data is node
function format(data){
  return formatLink(removeComment(formatYoutubeLink(data)));
}

function abbreviateNumber(value) {
  var newValue = value;
  if (value >= 1000) {
    var suffixes = ["", "K", "M", "B","T"];
    var suffixNum = Math.floor( (""+value).length/3 );
    var shortValue = '';
    for (var precision = 2; precision >= 1; precision--) {
      shortValue = parseFloat( (suffixNum !== 0 ? (value / Math.pow(1000,suffixNum) ) : value).toPrecision(precision));
      var dotLessShortValue = (shortValue + '').replace(/[^a-zA-Z 0-9]+/g,'');
      if (dotLessShortValue.length <= 2) { break; }
    }
    if (shortValue % 1 !== 0)  shortValue = shortValue.toFixed(1);
    newValue = shortValue+suffixes[suffixNum];
  }
  return newValue;
}

export {formatLink,format,getYoutubeIdFromLink,removeComment, abbreviateNumber}
