import axios from "axios";

const uploadPetPicture = async (ID: number, file: File) => {
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

const getPetPicture = async () => {
  const response = await axios.get<string>("/files");
  return response.data;
};

const ImageUploadService = {
  uploadPetPicture,
  getPetPicture,
};

export default ImageUploadService;
