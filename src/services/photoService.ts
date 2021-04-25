import axios from "../redux/api-ref";
import { PhotoModel } from "../redux/photoType";
import { setIsLoading } from "../redux/appSlice";

export const deletePhotoById = (id: string): Promise<boolean> => {
  return new Promise<boolean>((resolve, reject) => {
    setIsLoading(true);
    axios
    .get("img/del/" + id)
    .then((response) => {
      // console.log("Photo delete response: " + JSON.stringify(response));
      resolve(true);
      setIsLoading(false);
    })
    .catch((err) => {
      console.log(">_>->_>->_>" + JSON.stringify(err));
      reject(err);
      setIsLoading(false);
    });
  });
};

export const addPhoto = (file: File, filename: string): Promise<PhotoModel> => {
  return new Promise<PhotoModel>((resolve, reject) => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("filename", filename);
    axios
      .post("img/", formData)
      .then((response) => {
        let returnPhoto: PhotoModel = {
          filename: response.data.image.filename,
          file_id: response.data.image.file_id,
          uploadDate: response.data.image.uploadDate,
        };
        resolve(returnPhoto);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(">_>->_>->_>" + JSON.stringify(err));
        reject(err);
        setIsLoading(false);
      });
  });
};
