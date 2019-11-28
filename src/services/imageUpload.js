import axios from 'axios';

export async function getImageLink(image) {
  return await axios.post('http://localhost:8080/https://api.imgur.com/3/upload', image, {
    headers:{
      Authorization: 'Client-ID aa5d0a56546e75e',
    },
    timeout: 10000
  })
    .then(res => {
      console.log(res.data);
      return res.data.data.link;
    })
    .catch(err => {
      console.log(err);
      return false;
    });

  // return "https://i.imgur.com/XNuzjaB.png";
}
