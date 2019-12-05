import customAxios from '../services/axiosConfig'
import LinkGen from '../services/url_gen'
import parser from '../services/parser'
import auth from '../services/auth';
import rq from '../services/requests';
import Axios from 'axios';
const config = {
  "withCredentials" : true
};
export function getDataForum(forum,page) {
  let data = '';
  return dispatch => {
    dispatch({type: 'setLoading', payload: true});
    customAxios.get(LinkGen.linkForum(forum, page),config).then(response => {
      data = parser.extractDataForum(response.data);
      dispatch({
        type: 'pushForum', payload: {
          forum: forum,
          page: page,
          last_page: data.last_page,
          data: data
        }
      });
    })
    .catch(err=> console.error(err))
    .finally(()=> dispatch({type: 'setLoading', payload: false}));
  }
}

export function getDataSub(page) {
  return dispatch => {
    dispatch({type: 'setLoading', payload: true});
    customAxios.get(`/subscription.php`, config).then(response => {
      let tmp = parser.extractSubscription(response.data);
      dispatch({
        type: 'pushSubscription', payload: {
          page: page,
          last_page: tmp.last_page,
          data: tmp
        }
      });
      dispatch({ type: 'setTitle', payload: 'Subscriptions' });
    })
      .catch(err=> console.error(err))
      .finally(()=> dispatch({type: 'setLoading', payload: false}))
    }
}

export function getDataThread(thread,page) {
  return dispatch => {
    dispatch({type: 'setLoading', payload: true});
    customAxios.get(LinkGen.linkPostsInThread(thread, page), config).then(response => {
      let tmp = parser.extractDataThread(response.data);
      dispatch({  
        type: 'pushThread', payload: {
          thread: thread,
          page: page,
          last_page: tmp.last_page,
          data: tmp,
          subscribed: tmp.subscribed
        }
      });
      dispatch({ type: 'setTitle', payload: tmp.subject });
    })
      .catch(err=> console.error(err))
      .finally(()=> dispatch({type: 'setLoading', payload: false}))
  }
}

export function getDataMess(page=1) {
  return async (dispatch)=>{

    let data = {};
    dispatch({type: 'setLoading', payload: true});
    Axios.all([
      customAxios.get("/private.php", config),
      customAxios.get("private.php?folderid=-1",config)
    ]).then(responseArr => {
      data['inbox'] = parser.extractDataInbox(responseArr[0].data);
      data['outbox'] = parser.extractDataInbox(responseArr[1].data);
      dispatch({
        type: 'pushMessage', payload: {
          // page: page ||1,
          // last_page: tmp.last_page || 1,
          data: data
        }
      });
      dispatch({ type: 'setTitle', payload: 'Messages' });
    })
      .catch(err=> console.error(err))
      .finally(()=> dispatch({type: 'setLoading', payload: false}))
  }
}

export function getMessDetail(id) {
  return async (dispatch)=>{
    dispatch({type: 'setLoading', payload: true});
    try {
      const res = await customAxios.get(LinkGen.linkShowMessage(id), config);
      const data = parser.extractMessageContent(res.data);
      dispatch({
        type: 'pushMessageDetail', payload: {
          id: id,
          data: data
        }
      });
    } catch (err) {
      console.log(err);
    } finally {
      dispatch({type: 'setLoading', payload: false});
    }
  }
}

export function saveForum(id) {
  return {type: 'saveForum', payload: id};
}

export function saveThread(id,text) {
  return {
    type: 'saveThread',
    payload: {
      id: id,
      text: text,
    },
  };
}

export function doLogin(username, password) {
  return async (dispatch) => {
    let formData = auth.getFormDataLogin(username, password);
    try {
      let res = await customAxios.post("/login.php?do=login", formData, config);
      if (res.status == 200  && res.data.includes("Thank you for logging in")) {
        res = await customAxios.get('/index.php',config);
        const id = parser.getUserId(res.data);
        res = await customAxios(`/member.php?u=${id}`, config);
        let info = parser.getMemberInfo(res.data);
        dispatch({
          type : 'doLogin',
          payload: {
            login: true,
            username: info.username,
            avatar: info.avaSrc,
            isOnline: info.isOnline,
            level: info.level
          }
        })
      }
    } catch (error) {
      console.log(error)
    }
  }
}

export function getSearchContent(keyword) {
  return async (dispatch)=>{
    dispatch({type: 'setLoading', payload: true});
    try {
      const tmp = {"subject":"Search Results","last_page":"7","page":"1","data":[{"intro":"Tất cả các thể loại report ở f17 các bạn có thể cho vào đây, tiện lúc nào xử lý lúc đó.","id":"4289698","title":"Report for f17","author":"lebao","lastpost":{"date":"Today","time":"16:28","by":"TraiVungCao","last_post_url":"showthread.php?p=154595167#post154595167","by_url":"member.php?find=lastposter&t=4289698"},"views":"2,034,406","replies":"2,045,","category":{"name":"Chuyện trò linh tinh™","url":"forumdisplay.php?f=17"}},{"intro":"Đang ở cùng phòng với một thằng phóng khoáng, thấy nó toàn xem mấy cái hề nhảm, trai giả gái, bê đê bóng chó. Như cc:sogood::sogood: \\n \\nvia vozForums...","id":"7617498","title":"bọn phóng khoáng bao dung bê đê bóng chó","author":"voz131194","lastpost":{"date":"30-08-2019","time":"15:56","by":"Shadow_Clone_No1","last_post_url":"showthread.php?p=153650887#post153650887","by_url":"member.php?find=lastposter&t=7617498"},"views":"1,472","replies":"12,","category":{"name":"Chuyện trò linh tinh™","url":"forumdisplay.php?f=17"}},{"intro":"Thấy mấy hôm nay thím này lên cơn động kinh hay sao mà đi chửi bới khắp f17 diễn đàn,các vozer đua nhau vào report kín hết cái f17 mà sao vẫn thấy...","id":"7607809","title":"Thím canh sat giao thong ra đảo chưa ạ","author":"Jesus.MyLord","lastpost":{"date":"17-08-2019","time":"16:04","by":"Vozer_2018","last_post_url":"showthread.php?p=153426968#post153426968","by_url":"member.php?find=lastposter&t=7607809"},"views":"605","replies":"9,","category":{"name":"Chuyện trò linh tinh™","url":"forumdisplay.php?f=17"}},{"intro":"https://2.pik.vn/20199f6f95b6-148e-4f1f-b341-640f69b3a240.png \\n:sosad:Idol của tui","id":"7549486","title":"Plane: Đa nhân cách hay hoang tưởng?","author":"simon778","lastpost":{"date":"20-05-2019","time":"21:59","by":"simon778","last_post_url":"showthread.php?p=151866431#post151866431","by_url":"member.php?find=lastposter&t=7549486"},"views":"8,112","replies":"192,","category":{"name":"Chuyện trò linh tinh™","url":"forumdisplay.php?f=17"}},{"intro":"http://m.bongdaplus.vn/messi-o-argentina-tat-dien-vi-thieu-dong-doi-an-y-va-chiu-hy-sinh-2455551903.html","id":"7535524","title":"Messi ở Argentina 'tắt điện' vì thiếu đồng đội ăn ý và chịu hy sinh","author":"sluogn","lastpost":{"date":"27-03-2019","time":"13:13","by":"vn_7","last_post_url":"showthread.php?p=151516808#post151516808","by_url":"member.php?find=lastposter&t=7535524"},"views":"38,233","replies":"654,","category":{"name":"Điểm báo","url":"forumdisplay.php?f=33"}},{"intro":"Xây cho ngài cái miếu mới, đm me tàu :canny:","id":"7478938","title":"Miếu Sọp Đen - Khói hương nghi ngút...","author":"gelu567890","lastpost":{"date":"Today","time":"17:16","by":"thich an dua luoi","last_post_url":"showthread.php?p=154596103#post154596103","by_url":"member.php?find=lastposter&t=7478938"},"views":"451,976","replies":"5,165,","category":{"name":"League of Legends","url":"forumdisplay.php?f=253"}},{"intro":"Tối về vào f33 đọc báo, thấy bị ban nick, chưa kịp hiểu đã vi phạm nội quy gì. \\nVào lý do ban thì thật là vl, trò chơi hiến tế:...","id":"7473217","title":"Thằng mod nào chơi trò hiến tế f17 vào đây tao hỏi","author":"cauquan101","lastpost":{"date":"25-12-2018","time":"08:00","by":"Vos","last_post_url":"showthread.php?p=149766142#post149766142","by_url":"member.php?find=lastposter&t=7473217"},"views":"125,829","replies":"977,","category":{"name":"Chuyện trò linh tinh™","url":"forumdisplay.php?f=17"}},{"intro":"https://imgur.com/PsB4Eji.png \\nMình đang đòi lại sign thì ko phù hợp chỗ nào bạn? Box chuyện trò linh tinh sai thì box nào đúng? :sogood: \\nĐừng để...","id":"7452701","title":"Mod voz quá dễ thương","author":"chetmethangthread","lastpost":{"date":"26-11-2018","time":"11:32","by":"kinglove.pro","last_post_url":"showthread.php?p=149217835#post149217835","by_url":"member.php?find=lastposter&t=7452701"},"views":"5,738","replies":"61,","category":{"name":"Chuyện trò linh tinh™","url":"forumdisplay.php?f=17"}},{"intro":"ví dụ như súc vật này. nó dùng icon cỡ lớn để thờ tổ nó à, đm kéo phát hết trang","id":"7436802","title":"sao mod không ban mấy thằng nghiệt súc dùng icon cỡ lớn?","author":"82.KonTum","lastpost":{"date":"02-11-2018","time":"09:32","by":"askri79","last_post_url":"showthread.php?p=148811660#post148811660","by_url":"member.php?find=lastposter&t=7436802"},"views":"2,022","replies":"13,","category":{"name":"Chuyện trò linh tinh™","url":"forumdisplay.php?f=17"}},{"intro":"Source VNE","id":"7431746","title":"Nữ tuyển thủ xinh đẹp bị loại khỏi U19 Việt Nam vì hộ chiếu","author":"cyan1.618","lastpost":{"date":"30-10-2018","time":"15:52","by":"galaxyangelzz","last_post_url":"showthread.php?p=148774801#post148774801","by_url":"member.php?find=lastposter&t=7431746"},"views":"19,353","replies":"87,","category":{"name":"Điểm báo","url":"forumdisplay.php?f=33"}},{"intro":"nguồn :https://lag.vn/tin/Cong-Nghe/Lua-dao-Khach-Hang--1-shop-linh-kien-PC-nhan-cai-ket.html \\nlink bán hàng bên f68 : ...","id":"7426071","title":"Lừa Đảo Khách Hàng, Mạnh Hùng Computer nhận cái kết đắng khi dám chống đối với cộng đồng mạng","author":"bai tru te nan xa hoi","lastpost":{"date":"17-10-2018","time":"12:04","by":"online62017","last_post_url":"showthread.php?p=148559572#post148559572","by_url":"member.php?find=lastposter&t=7426071"},"views":"49,343","replies":"143,","category":{"name":"Chuyện trò linh tinh™","url":"forumdisplay.php?f=17"}},{"intro":"Rảnh rỗi sinh nông nổi ngồi viết cái tool cho các thím: https://github.com/lnquy/vozer \\nPhục vụ cho thím nào thích hít hà drama voz mà lười lội page...","id":"7383017","title":"[VOZ Tool] Tải ảnh hàng loạt từ VOZ thread","author":"asymptotic","lastpost":{"date":"01-03-2019","time":"22:01","by":"Master Of Report","last_post_url":"showthread.php?p=151010308#post151010308","by_url":"member.php?find=lastposter&t=7383017"},"views":"127,360","replies":"46,","category":{"name":"Phần mềm","url":"forumdisplay.php?f=13"}},{"intro":"https://www.facebook.com/dangtrenny/posts/923133457871117 \\nLùm xùm vụ bản quyền \\n \\nChuyện là thế này: Bạn em là fan ca sĩ Khánh Linh,...","id":"7223941","title":"Biến vụ bản quyền âm nhạc","author":"bebosua2180","lastpost":{"date":"11-05-2018","time":"10:24","by":"tqanvn","last_post_url":"showthread.php?p=143780949#post143780949","by_url":"member.php?find=lastposter&t=7223941"},"views":"11,782","replies":"71,","category":{"name":"Chuyện trò linh tinh™","url":"forumdisplay.php?f=17"}},{"intro":"http://soha.vn/nong-nga-dot-nhien-bao-dong-san-sang-chien-dau-toan-bo-quan-doi-ca-o-syria-lan-trong-nuoc-20180409221324599.htm","id":"7139549","title":"Nga đột ngột báo động sẵn sàng chiến đấu toàn bộ quân đội cả ở Syria lẫn trong nước ?","author":"Lock-On","lastpost":{"date":"11-04-2018","time":"10:37","by":"Lock-On","last_post_url":"showthread.php?p=141373997#post141373997","by_url":"member.php?find=lastposter&t=7139549"},"views":"13,348","replies":"83,","category":{"name":"Điểm báo","url":"forumdisplay.php?f=33"}},{"intro":"Mình đang tìm trung tâm để học Java J2EE ở Hồ Chí Minh này mà chỉ thấy mỗi imic là PR tốt, các trung tốt khác như TechMaster hay TechKid... thì chỉ...","id":"6986129","title":"Hỏi trung tâm dạy J2EE ở Hồ Chí Minh","author":"TinDoan","lastpost":{"date":"25-02-2018","time":"00:07","by":"TinDoan","last_post_url":"showthread.php?p=137732261#post137732261","by_url":"member.php?find=lastposter&t=6986129"},"views":"1,884","replies":"31,","category":{"name":"Chuyện trò linh tinh™","url":"forumdisplay.php?f=17"}},{"intro":"Như chúng ta đã biết Trường kỳ kháng chiến đang rất chi là gay cấn. Đánh từ page con sang to, từ appstore tới playstore. \\nViệc chúng ta cần làm là...","id":"6947153","title":"Đề xuất chuyển giờ report","author":"locdinhky2008","lastpost":{"date":"08-02-2018","time":"13:25","by":"ATKLight","last_post_url":"showthread.php?p=136717285#post136717285","by_url":"member.php?find=lastposter&t=6947153"},"views":"219","replies":"2,","category":{"name":"Chuyện trò linh tinh™","url":"forumdisplay.php?f=17"}},{"intro":"Kính gửi tất cả các anh em chơi Liên Minh Huyền Thoại \\n \\nBảy năm trước, League of Legends ra đời. Bảy năm trước, đó là giai đoạn kinh hoàng nhất của...","id":"5255753","title":"Thư ngỏ gửi toàn thể box League of Legends","author":"gelu567890","lastpost":{"date":"28-08-2016","time":"09:46","by":"gelu567890","last_post_url":"showthread.php?p=98770309#post98770309","by_url":"member.php?find=lastposter&t=5255753"},"views":"991,913,994","replies":"0,","category":{"name":"League of Legends","url":"forumdisplay.php?f=253"}},{"intro":"Sắp tới sinh nhật ba em, sở thích duy nhất của ba em chỉ có nhậu mà em ko cùng chí hướng, bia bọt cũng chưa từng đụng đến nên ko rành mấy chất cồn...","id":"6759253","title":"[Help] Tư vấn mua rượu tặng sinh nhật ông già","author":"sasuke_ango","lastpost":{"date":"10-12-2017","time":"21:36","by":"vietcong4","last_post_url":"showthread.php?p=132063369#post132063369","by_url":"member.php?find=lastposter&t=6759253"},"views":"822","replies":"14,","category":{"name":"Điểm báo","url":"forumdisplay.php?f=33"}},{"intro":"nguồn \\n \\nBài viết gốc :","id":"6420277","title":"Cô gái 28 tuổi nghỉ việc một năm để đi du lịch khắp châu Á","author":"Chiette","lastpost":{"date":"22-08-2017","time":"23:05","by":"haitaybachan","last_post_url":"showthread.php?p=124114385#post124114385","by_url":"member.php?find=lastposter&t=6420277"},"views":"81,237","replies":"441,","category":{"name":"Điểm báo","url":"forumdisplay.php?f=33"}},{"intro":"Topic mới ,luật như cũ \\n \\n- Cấm clone tên cầu thủ, HLV, clb ... KIA tuỳ thích \\n- Chửi nhau, spam .... KIA tuỳ thích \\n......................... \\n...","id":"5844317","title":"Bóng đá mùa giải 2016-2017 .SAVE KLOPP","author":"NCQ","lastpost":{"date":"12-06-2017","time":"11:22","by":"NCQ","last_post_url":"showthread.php?p=118556393#post118556393","by_url":"member.php?find=lastposter&t=5844317"},"views":"2,219,735","replies":"36,794,","category":{"name":"Chuyện trò linh tinh™","url":"forumdisplay.php?f=17"}}]};
      dispatch({ type: 'search', payload: tmp });
    } catch (err) {
      console.log(err);
    } finally {
      dispatch({type: 'setLoading', payload: false});
    }
  }
}

export function subscribeThread(thread) {
  return async (dispatch)=>{
    const tmp = await customAxios.get(`/subscription.php?do=addsubscription&t=${thread}`, config);
    let formData = rq.getFormSubscribe(thread, tmp.data);

    try {
      let res = await customAxios.post(`/subscription.php?do=doaddsubscription&threadid=${thread}`, formData, config);

      if (res.status == 200)
        console.log('Subscribe thread'+thread);
      else
        console.log('Subcribe unsuccessfully');
    } catch (error) {
      console.log(error)
    }
  }
}

export function unSubscribeThread(thread) {
  return async (dispatch)=>{
    try {
      let res = await customAxios.get(`/subscription.php?do=removesubscription&t=${thread}`, config);

      if (res.status == 200)
        console.log('Unsubscribe thread '+thread);
      else
        console.log('Unsubcribe unsuccessfully');
    } catch (error) {
      console.log(error)
    }
  }
}
