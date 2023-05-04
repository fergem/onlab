import axios from "axios";

const uploadPetPictures = async (ID: number, file: File) => {
  let formData = new FormData();

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
  let formData = new FormData();
  if (file != undefined) formData.append("file", file);

  const response = await axios.post<string>(
    "/api/users/addpetimage",
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
