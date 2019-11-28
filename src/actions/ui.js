export function toggleSearch(show=true){
  return {type:'setOpenSearch',payload: show}
}
export function toggleDrawer(position, show=true){
  let tmp = {
    left: false,
    right: false
  };
  tmp[position] = show;
  return {type:'setOpenDrawer',payload: tmp}
}
