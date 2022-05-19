// import axios from 'axios';

const optiic = new require('optiic')
// ({
//   apiKey: 'api_test_key' // Not required, but having one removes limits (get your key at https://optiic.dev).
// });
let options = {
  image: 'https://via.placeholder.com/468x60?text=We+love+Optiic!', // url of the image
  mode: 'ocr', // ocr
};

optiic.process(options)
  .then(result => {
    console.log(result);
  })

// // AXIOS
// export const uploadImg = async (file) => {
//   //gets the file and upload it to cloudinary
//   // Defining our variables
//   const UPLOAD_PRESET = 'cajan_33'; //change it
//   const CLOUD_NAME = 'cajan33'; //change it
//   const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;
//   const FORM_DATA = new FormData();
//   // Building the request body
//   FORM_DATA.append('file', file);
//   FORM_DATA.append('upload_preset', UPLOAD_PRESET);
//   // Sending a post method request to Cloudniarys' API
//   try {
//     const res = await axios.post(UPLOAD_URL, FORM_DATA);
//     return res.data;
//   } catch (err) {
//     console.error('ERROR!', err);
//   }
// };
