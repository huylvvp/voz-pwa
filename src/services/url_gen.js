class LinkGen {
  static linkForum(f = '17', page ='1'){
    return `/forumdisplay.php?f=${f}&page=${page}`;
  }

  static linkThread(id,post="") {
    const tmp = post ? `#post${post}` : '';
    return `/showthread.php?t=${id}${tmp}`;
  }
  static linkPostsInThread(id, page="1") {
    return `/showthread.php?t=${id}&page=${page}`;
  }
  static linkInbox() {
    return `/private.php`;
  }

  static linkShowMessage(id){
    return `/private.php?do=showpm&pmid=${id}`;
  }

  static linkShowSubscription(){
    return `/subscription.php`;
  }

  static linkShowSearch(id){
    return `/search.php?searchid=${id}`;
  }

  static linkLogin() {
    return `/login.php?do=login`;
  }

}

export default LinkGen;
