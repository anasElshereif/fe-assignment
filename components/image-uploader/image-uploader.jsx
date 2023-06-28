import { useRef } from 'react';
import Image from 'next/image';
import { message } from 'antd';
import CancelIcon from '../../public/icons/cancel.svg';
import EditIcon from '../../public/icons/edit.svg';

export default function ImageUploader({ imageFile, cmpType, sizeValidation, children }) {
  // uploader elements
  const uploadInput = useRef();
  const displayImage = useRef();
  const displayImageContainer = useRef();

  // passing image file value to parent with props
  const setImageFileValue = (file) => {
    imageFile(file);
  };

  // controlling image container with actions
  const controlImageContainer = (status) => {
    if (status) {
      displayImageContainer.current.classList.add('show');
      setImageFileValue(uploadInput.current.files[0]);
    } else {
      displayImageContainer.current.classList.remove('show');
    }
  };

  // checking size of upload image
  const checkImageSize = () => {
    const { width } = displayImage.current;
    const { height } = displayImage.current;
    if (width > sizeValidation?.width || height > sizeValidation?.height) {
      // Image size error
      message.error('Image dimensions should be less than or equal to 800px x 400px');
      controlImageContainer(false);
      return false;
    }
    controlImageContainer(true);
    return true;
  };

  // rendering image file
  const fileHandler = (file, type) => {
    if (type.split('/')[0] !== 'image') {
      // File Type Error
      message.error('Please upload an image file');
      return false;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      // image src setter
      displayImage.current.src = reader.result;
      return reader.result;
    };
    return true;
  };

  // image upload function
  const imageUpload = () => {
    const file = uploadInput.current.files[0];
    if (file) fileHandler(file, file.type);
  };

  // cancel upload function
  const cancelUpload = () => {
    uploadInput.current.value = '';
    controlImageContainer(false);
    setImageFileValue('');
  };

  // edit upload function
  const editUpload = () => {
    uploadInput.current.click();
  };

  return (
    <section className={`flex-row-c m-gc upload-container ${cmpType}`}>
      <label htmlFor="upload-input" className="flex-col-c f-14 center upload-label">
        <input
          type="file"
          ref={uploadInput}
          className="upload-input pnt"
          id="upload-input"
          accept="image/*"
          onChange={imageUpload}
        />
        {/* children passed as slot  */}
        {children}
        {/* image display with actions buttons */}
        <div className="flex-row-c display-image-container pnt" ref={displayImageContainer}>
          <img
            ref={displayImage}
            id="display-image"
            className="display-image"
            alt="thumbnail"
            onLoad={checkImageSize}
          />
          <div className="flex gap-5 uploader-btns">
            <button type="button" className="uploader-btn" onClick={cancelUpload}>
              <Image src={CancelIcon} alt="cancel" />
            </button>
            <button type="button" className="uploader-btn" onClick={editUpload}>
              <Image src={EditIcon} alt="edit" />
            </button>
          </div>
        </div>
      </label>
    </section>
  );
}
