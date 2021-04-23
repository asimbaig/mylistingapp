import axios from "../redux/api-ref";
import { PhotoModel } from "../redux/photoType";

export const deletePhotoById = (id: string) => {
  axios
    .get("img/del/" + id)
    .then((response) => {
      console.log("Photo delete response: " + JSON.stringify(response));
    })
    .catch((err) => {
      console.log(">_>->_>->_>" + JSON.stringify(err));
    });
};
export const addPhoto = (file: File, filename: string): Promise<PhotoModel> => {
  return new Promise<PhotoModel>((resolve, reject) => {
    //let returnPhoto: PhotoModel = {};
    const formData = new FormData();
    formData.append("file", file);
    formData.append("filename", filename);
    axios
      .post("img/", formData)
      .then((response) => {
        //console.log("Photo response: " + JSON.stringify(response.data.image));
        let returnPhoto: PhotoModel = {
          filename: response.data.image.filename,
          file_id: response.data.image.file_id,
          uploadDate: response.data.image.uploadDate,
        };
        resolve(returnPhoto);
      })
      .catch((err) => {
        console.log(">_>->_>->_>" + JSON.stringify(err));
        reject(err);
      });
  });
};
// export function addPhoto(file: File, filename: string) {
//   let returnPhoto: PhotoModel = {};
//   const formData = new FormData();
//   formData.append("file", file);
//   formData.append("filename", filename);
//   axios
//     .post("img/", formData)
//     .then((response) => {
//       //console.log("Photo response: " + JSON.stringify(response.data.image));
//       returnPhoto = {
//         filename: response.data.image.filename,
//         file_id: response.data.image.file_id,
//         uploadDate: response.data.image.uploadDate,
//       };
//       console.log("returnPhoto : " + JSON.stringify(returnPhoto));

//     })
//     .catch((err) => {
//       console.log(">_>->_>->_>" + JSON.stringify(err));

//     });

// }

// export const loadItems = (): AppThunk => async (dispatch: AppDispatch) => {
//   axios.get("items")
//         .then((res) => {
//           dispatch(itemsSlice.actions.loadItems(res.data as Item[]));
//         })
//         .catch((err) => {});
// };
