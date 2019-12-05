import cheerio from 'cheerio';
import {forumData} from '../components/Counter/tmp'
import md5 from 'md5';
function getFormDataLogin(username, password) { 
  let $ = cheerio.load(forumData)
  $("#navbar_username").val(username);
  $("#navbar_password").val(password);
  $("input[name*='vb_login_md5password']").val(md5(password));
  $("input[name*='vb_login_md5password_utf']").val(md5(password));
  let bodyFormData = new FormData();
  $("form").first().find('input').each((index, inp) => {
    let $inp = $(inp)
    bodyFormData.append($inp.attr('name'), $inp.val() || '');
  })
  return bodyFormData;
}
function checkLogin() {
  
}
export default {getFormDataLogin}