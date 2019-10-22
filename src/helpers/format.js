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
  data.find('a').replaceWith(function() {
    let tmp = getYoutubeIdFromLink(this.attribs['href']);
    if (!tmp)
      return this;
    return `<iframe class="neo_player inner youtube" type="text/html" src="https://www.youtube.com/embed/${tmp}" frameborder="0" allowfullscreen=""></iframe>`;
  });
  return data.html();
}

function removeComment(str) {
  let data = str.replace(/<\!--.*?-->/g, "");
  return data;
}

// data is node
function format(data){
  return formatLink(removeComment(formatYoutubeLink(data)));
}

export {formatLink,format,getYoutubeIdFromLink,removeComment}
