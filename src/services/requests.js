import customAxios from "./axiosConfig";
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

function getFormSubscribe(threadId,subPage){
  let $ = cheerio.load(subPage);
  let bodyFormData = new FormData();
  $("td[width] > form").find('input').each((index, inp) => {
    let $inp = $(inp);
    if (inp.attribs.name !== 'url' && inp.attribs.type!== 'submit'){
      bodyFormData.append($inp.attr('name'), $inp.val() || '');
    }
  });
  bodyFormData.append('url', 'index.php');
  bodyFormData.append('emailupdate', '0');
  bodyFormData.append('folderid', '0');
  return bodyFormData;
}
function getFormSearch(data, query) {
  let $ = cheerio.load(data);
  let bodyFormData = new FormData();
  $('#navbar_search_menu > table > tbody > tr:nth-child(2) > td > form').find('input').each((index,inp) => {
    let $inp = $(inp);
    if (inp.attribs.type != 'submit' && inp.name.showposts != "showposts") {
      bodyFormData.append($inp.attr('name'), $inp.val() || '');
    }
  })
  bodyFormData.set('query',query);
  bodyFormData.set('showposts',0);
  return bodyFormData;
}
export default { getThreadsByF, getThreadData, quickReply,getFormSubscribe,getFormSearch};
