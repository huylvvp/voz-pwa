import cheerio from 'cheerio';

import {format} from '../helpers/format'

// any forum page
function getUserId(data){
  let $ = cheerio.load(data);
  let id = $('body div.neo_width.page > div > table:nth-child(2) > tbody > tr > td.alt2 > div > strong > a');
  let tp = id.attr('href');
  if (tp){
    return tp.split('=')[1]
  }
  return false;
}

function getPageNumber($) {
  let tmp = $('.pagenav td.vbmenu_control[style]').html();
  if (tmp)
    return {
      subject: $('td.navbar').text().trim(),
      last_page: tmp.split('of')[1].trim(),
      page : tmp.split('of')[0].split('Page')[1].trim(),
    };
  return {
    subject: $('td.navbar').text().trim(),
    last_page: 1,
    page: 1,
  }
}

// template bbcode_quote
function getQuoteFromDivQuote($, quote) {
  let out = {};
  out.by = $(quote).find('tr > td.alt2 > div:first-child > strong').text();
  out.url = $(quote).find('tr > td > div:first-child > a').attr('href');
  if ($(quote).find('tr > td.alt2').length) {
    if ($(quote).find('tr > td.alt2 > div:last-child').length)
      out.content = format($(quote).find('tr > td.alt2 > div:last-child'));
    else out.content = format($(quote).find('tr > td.alt2'));
  }
  else out.content = format($(quote));
  return out;
}

//template message voz-post-message
function getQuoteAndContentFromDiv($, tmp){
  const quotes = tmp.find('div[style]:has(div.smallfont)').get().map(quote=>{
    return getQuoteFromDivQuote($, quote);
  });
  tmp.find('>div[style]:has(div.smallfont)').remove();
  return {
    quotes: quotes,
    content: format(tmp)
  }
}

//template showthread threadbit td:threadtitle
function getTitle($,td) {
  let thread={};
  thread.intro = td.attr('title');
  thread.id = td.attr('id').split('_')[2];
  thread.title = $(td).find(`div:nth-child(1) #thread_title_${thread.id}`).text();
  thread.author = $(td).find(`div:nth-child(2) > span:last-child`).text();

  let tmp = $(td).find(`div:nth-child(2) > span > img`).attr('alt');
  if (tmp){
    thread.votes = tmp.split(',')[0].split(':')[1].split('votes')[0].trim();
    thread.rates = tmp.split(',')[1].split('average')[0].trim();
  }
  return thread;
}

//template showthread threadbit td:replies-views
function getBasicDetails($, td) {
  let tmp = $(td).find('div:first-child');
  let thread = {};
  thread.lastpost = {
    date: tmp.contents().first().text().trim(),
    time: $(tmp).children('.time').text(),
    by: $(tmp).children('a').text(),
    last_post_url: $(tmp).find(':last-child').attr('href'),
    by_url: $(tmp).children('a').attr('href'),
  };
  tmp = $(td).attr('title').split('Views:');
  thread.views = tmp[1].trim();
  thread.replies = tmp[0].split(':')[1].trim();
  return thread;
}


//template postbit
function extractPostFromDiv($, post){
  let p = {};
  let tmp;
  
  p.number = $(post).find('.thead > .normal > a').text();
  p.time = $(post).find('.thead > div:nth-child(2).normal ').text().trim();
  p.user = {
    username: $(post).find('.bigusername').text(),
    id: $(post).find('.bigusername').attr('href').split('=')[1],
    avatar: $(post).find('td.alt2 > a > img').attr('src'),
    description: $(post).find('tr > td > div.smallfont').first().text(),
  };
  tmp = $(post).find('tr > td[valign] > div.smallfont');
  p.user.joinDate = $(tmp).find('div:first-child').text().split(':')[1].trim();
  if(tmp.children().length>3){
    p.user.location = $(tmp).find('div:nth-child(2)').text().split(':')[1].trim();
    p.user.posts = $(tmp).find('div:nth-child(3)').text().split(':')[1].trim();
  } else {
    p.user.posts = $(tmp).find('div:nth-child(2)').text().split(':')[1].trim();
  }
  p.user.online = $(post).find('> tbody > tr table > tbody > tr > td[nowrap] img').attr('src').includes('online');

  tmp = $(post).find('> tbody > tr:last-child div.voz-post-message');
  p.data = {};
  let tmp2 = getQuoteAndContentFromDiv($, tmp);
  p.data.quotes = tmp2.quotes;
  p.data.comment = tmp2.content;

  p.signature = {};
  tmp2 = tmp.next();
  if (!tmp2.attr('align') && !tmp2.attr('class')){
    const temp = getQuoteAndContentFromDiv($, tmp2);
    p.signature.quotes = temp.quotes;
    p.signature.comment = temp.content;
  };

  tmp = $(post).find('> tbody > tr:last-child > td > div.smallfont').last();
  if (tmp.children().length > 1){
    p.last_edit = tmp.html().trim();
  }
  return p;
}

// template forumdisplay
function extractDataForum(data) {
  let $ = cheerio.load(data);
  let threads = $(`#threadslist > tbody[id] > tr`).get()
    .map(tr=>{
      let thread = {};
      let td = $(tr).children(':nth-child(2)');
      if (td.attr("id")) {
        thread = getTitle($,td);
        td = $(tr).children(':nth-child(3)');
      } else {
        td = $(tr).children(':nth-child(3)');
        thread = getTitle($, td);
        td = $(tr).children(':nth-child(4)');
      }
      const tmp = getBasicDetails($,td);
      return {
        ...thread,
        ...tmp
      };
    });

  return {
    ...getPageNumber($),
    time: new Date(),
    data: threads,
  };
}

//template showthread
function extractDataThread(data) {
  let $ = cheerio.load(data);

  let tmp;
  let output = getPageNumber($);
  output.data = [];
  $('#posts > div[id]').get()
    .forEach(wpost=>{
      // wpost is template postbit_wraper
      if (!$(wpost).find('> table').length)
        return;
      let post = $(wpost).find('>table');
      tmp = extractPostFromDiv($,post);
      tmp.id = $(wpost).attr('id').split('edit')[1];
      output.data.push(tmp);
    });

  return output;
}

//inbox page
function extractDataInbox(data){
  let $ = cheerio.load(data);
  let list_inbox = $('#pmform > table > tbody[id] > tr').get().map((row)=>{
    // row template pm_messagelistbit
    let output = {};
    let content = $(row).children('td[id]');
    output.id = content.attr('id').split('m')[1];
    output.date = content.find('> div > span').first().text();
    output.title = content.find('> div > a').text();
    output.time = content.find('> div > span[class="time"] ').text();
    let tmp = content.find('> div[class] > span:last-child');
    output.author = {
      id: tmp.attr('onclick').split('=')[2],
      name: tmp.text(),
    };
    return output
  })
  return  list_inbox;
}

//message page
function extractMessageContent(data){
  let $ = cheerio.load(data);
  let tmp = $('#post');
  return extractPostFromDiv($,tmp);
}

//subscription page
function extractSubscription(data){
  let $ = cheerio.load(data);
  let out = [];
  $('body > div.neo_width.page > div > table:nth-child(9) > tbody > tr > td:nth-child(3) > form:nth-child(4) > table > tbody >tr')
    .get().forEach(row=>{
      if (!$(row).find('> td:first-child').attr('id'))
        return;

      let td = $(row).find('>td:nth-child(3)');
      let thread = getTitle($, td);

      td = $(row).find('>td:nth-child(4)');
      let tmp = getBasicDetails($, td);
      out.push({
        ...thread,
        ...tmp
      });
    });
  return {
    ...getPageNumber($),
    data: out
  }
}

//search page
function extractSearchContent(data){
  let $ = cheerio.load(data);
  let out = [];
  $('#threadslist > tbody > tr').get().forEach(row =>{
    if (!$(row).find('> td:first-child').attr('id'))
      return;

    let td = $(row).find('>td:nth-child(3)');
    let thread = getTitle($, td);

    td = $(row).find('>td:nth-child(4)');
    let tmp = getBasicDetails($, td);
    td = $(row).find('>td:nth-child(7)');
    out.push({
      ...thread,
      ...tmp,
      category: {
        name: td.text(),
        url: $(td).children('a').attr('href')
      },
    });
  });
  return {
    ...getPageNumber($),
    data: out
  };
}

function getMemberInfo(data) {
  let $ = cheerio.load(data);
  let out = {};
  $('#main_userinfo > table > tbody > tr')
  .get().forEach(row => {
    let td = $(row).find('#profilepic_cell > img');
    out.avaSrc = (td) ? td.attr('src') : ''; 
    td = $(row).find('#username_box');
    out.username = td.find('h1').text();
    let img = td.find('h1 > img');
    out.isOnline = img.attr('alt').includes('online') ? true : false;
    out.level = td.find('h2').text();
  });
  return out;
}
export default {
  extractDataForum,extractDataThread, getUserId, extractDataInbox, extractMessageContent, extractSubscription,extractSearchContent,
  getMemberInfo
};
