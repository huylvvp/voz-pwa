import customAxios from "./custom_axios";
import LinkGen from "./url_gen";
import parser from './parser';
import cheerio from 'cheerio';
var dataForum = '';
function getThreadsByF(f, page='1') {
  customAxios.get(LinkGen.linkForum(f,page), {
    'withCredentials':true
  }).then(response => {
    dataForum = response.data;
    console.log(parser.extractDataForum(dataForum));
    return dataForum;
  })
  .catch(console.error());
}

function getThreadData(threadId, page= '1') {
  var dataForum = '';
  customAxios.get(LinkGen.linkPostsInThread(threadId, page), {
    'withCredentials': true
  }).then(response => {
    console.log(response);
    dataForum = response.data;
    console.log(parser.extractDataThread(response.data));
  })
    .catch(console.error());
  return dataForum;
}

function quickReply(threadId, comment, dataForum) {
  let $ = cheerio.load(dataForum);
  let formData = getFormDataQuickReply($, "#qrform");
  formData.append('message',comment);
  formData.delete('preview');
  customAxios.post("/newreply.php?do=postreply&t=" + threadId, formData, {
    "withCredentials" :true
  }).then(response => {
    console.log("success");
    console.log(response);
  }).catch(console.error());
}

function getFormDataQuickReply($, form) {
  let bodyFormData = new FormData();
  $(form).find('input').each((index, inp) => {
    let $inp = $(inp);
    bodyFormData.append($inp.attr('name'), $inp.val() || '');
  })
  return bodyFormData;
}

export default { getThreadsByF, getThreadData, quickReply };
