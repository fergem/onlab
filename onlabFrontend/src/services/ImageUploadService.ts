import axios from "axios";
import { UserInformation } from "../models/User";

const uploadPetPictures = async (ID: number, file: File) => {
  const formData = new FormData();

  formData.append("file", file);

  const response = await axios.post<string>(
    "/api/users/addpetimage",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
        petID: ID,
      },
    }
  );

  return response.data;
};

const uploadProfilePicture = async (file: File | undefined) => {
  const formData = new FormData();
  if (file !== undefined) formData.append("file", file);

  const response = await axios.post<UserInformation>(
    "/api/users/addprofilepicture",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};

const ImageUploadService = {
  uploadPetPictures,
  uploadProfilePicture,
};

export default ImageUploadService;
