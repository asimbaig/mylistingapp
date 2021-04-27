import { useState, useEffect } from "react";
import { useCamera } from "@ionic/react-hooks/camera";
import { useFilesystem, base64FromPath } from "@ionic/react-hooks/filesystem";
import { useStorage } from "@ionic/react-hooks/storage";
import { isPlatform } from "@ionic/react";
import {
  CameraResultType,
  CameraSource,
  CameraPhoto,
  Capacitor,
  FilesystemDirectory,
} from "@capacitor/core";
import { defineCustomElements } from "@ionic/pwa-elements/loader";
import { addPhoto, deletePhotoById } from "../services/photoService";
import { PhotoModel } from "../redux/photoType";

// import { useDispatch } from "react-redux";
// import { addPhoto } from "../features/Photos/photoSlice";
// import { Image } from '../features/Photos/types';

const PHOTO_STORAGE = "photos";

export function usePhotoGallery() {
  defineCustomElements(window);
  const [returnPhoto, setReturnPhoto] = useState<PhotoModel>();
  const [photos, setPhotos] = useState<Photo[]>([]);
  const { getPhoto } = useCamera();
  const { deleteFile, readFile, writeFile } = useFilesystem();
  const { get, set } = useStorage();

  useEffect(() => {
    const loadSaved = async () => {
      const photosString = await get(PHOTO_STORAGE);
      const photosInStorage = (photosString
        ? JSON.parse(photosString)
        : []) as Photo[];
      // If running on the web...
      if (!isPlatform("hybrid")) {
        for (let photo of photosInStorage) {
          const file = await readFile({
            path: photo.filepath,
            directory: FilesystemDirectory.Data,
          });
          // Web platform only: Load the photo as base64 data
          photo.webviewPath = `data:image/jpeg;base64,${file.data}`;
        }
      }
      setPhotos(photosInStorage);
    };
    loadSaved();
  }, [get, readFile]);

  const takePhoto = async () => {
    const cameraPhoto = await getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 100,
    });
    if(cameraPhoto){
      const fileName = new Date().getTime() + "." + cameraPhoto.format;

    const savedFileImage = await savePicture(cameraPhoto, fileName);

    // const newPhotos = [savedFileImage, ...photos];
    // setPhotos(newPhotos);
    // set(PHOTO_STORAGE, JSON.stringify(newPhotos));
    }
  };

  const savePicture = async (
    photo: CameraPhoto,
    fileName: string
  ): Promise<Photo> => {
    let base64Data: string;
    // "hybrid" will detect Cordova or Capacitor;
    if (isPlatform("hybrid")) {
      const file = await readFile({
        path: photo.path!,
      });
      //console.log("Photos Type::>>>>>:::" + typeof file);
      base64Data = file.data;
    } else {
      base64Data = await base64FromPath(photo.webPath!);
      //console.log("Photos Type::>>>>>:::" + base64Data.length);
    }

    const savedFile = await writeFile({
      path: fileName,
      data: base64Data,
      directory: FilesystemDirectory.Data,
    });

    let d = new Date();
    if (
      base64Data.substring(0, 23) !== "data:image/jpeg;base64," &&
      base64Data.substring(0, 22) !== "data:image/png;base64,"
    ) {
      base64Data = "data:image/jpeg;base64," + base64Data;
    }

    fetch(base64Data)
      .then((res) => res.blob())
      .then((blob) => {
        const file = new File([blob], fileName, { type: "image/png" });
        addPhoto(file, fileName).then((res) => {
          setReturnPhoto(res as PhotoModel);
        }).catch(err=> console.log(err));
      });

    // dispatch(addPhoto(image));
    if (isPlatform("hybrid")) {
      // Display the new image by rewriting the 'file://' path to HTTP
      // Details: https://ionicframework.com/docs/building/webview#file-protocol
      return {
        filepath: savedFile.uri,
        webviewPath: Capacitor.convertFileSrc(savedFile.uri),
      };
    } else {
      // Use webPath to display the new image instead of base64 since it's
      // already loaded into memory
      return {
        filepath: fileName,
        webviewPath: photo.webPath,
      };
    }
  };

  const deletePhoto = async (photo: Photo) => {
    //deletePhotoById("6082c3218d71f700150046f5");
    // Remove this photo from the Photos reference data array
    const newPhotos = photos.filter((p) => p.filepath !== photo.filepath);

    // Update photos array cache by overwriting the existing photo array
    set(PHOTO_STORAGE, JSON.stringify(newPhotos));

    // delete photo file from filesystem
    const filename = photo.filepath.substr(photo.filepath.lastIndexOf("/") + 1);
    await deleteFile({
      path: filename,
      directory: FilesystemDirectory.Data,
    });
    setPhotos(newPhotos);
  };

  return {
    deletePhoto,
    photos,
    takePhoto,
    returnPhoto
  };
}

export interface Photo {
  filepath: string;
  webviewPath?: string;
}
