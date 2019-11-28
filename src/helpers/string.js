export function truncate(input,length) {
  if (input.length > length)
    return input.substring(0,length) + '...';
  else
    return input;
};
export function html2text(html) {
  var tag = document.createElement('div');
  tag.innerHTML = html;

  return tag.innerText;
}
