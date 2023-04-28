import { useState, useEffect } from "react";
import { PetImage } from "../models/Pet";
import ImageUploadService from "../services/ImageUploadService";

interface IProps {
  image: PetImage;
}

const ImageUpload: React.FC<IProps> = ({ image }) => {
  const [currentImage, setCurrentImage] = useState<File>();
  const [previewImage, setPreviewImage] = useState<string>(image.picture);
  const [progress, setProgress] = useState<number>(0);

  const selectImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files as FileList;
    setCurrentImage(selectedFiles?.[0]);
    setPreviewImage(URL.createObjectURL(selectedFiles?.[0]));
    setProgress(0);
  };

  const upload = () => {};

  return (
    <div>
      <div className="row">
        <div className="col-8">
          <label className="btn btn-default p-0">
            <input type="file" accept="image/*" onChange={selectImage} />
          </label>
        </div>

        <div className="col-4">
          <button
            className="btn btn-success btn-sm"
            disabled={!currentImage}
            onClick={upload}>
            Upload
          </button>
        </div>
      </div>

      {currentImage && progress > 0 && (
        <div className="progress my-3">
          <div
            className="progress-bar progress-bar-info"
            role="progressbar"
            aria-valuenow={progress}
            aria-valuemin={0}
            aria-valuemax={100}
            style={{ width: progress + "%" }}>
            {progress}%
          </div>
        </div>
      )}

      {previewImage && (
        <div>
          <img className="preview" src={previewImage} alt="" />
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
