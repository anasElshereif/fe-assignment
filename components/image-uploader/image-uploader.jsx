import { useRef } from 'react';
import Image from 'next/image';
import { message } from 'antd';
import CancelIcon from '../../public/icons/cancel.svg';
import EditIcon from '../../public/icons/edit.svg';

export default function ImageUploader({ imageFile, mode, sizeValidation, children }) {
  // uploader elements refs
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
      message.success('Successfully uploaded image');
    } else {
      displayImageContainer.current.classList.remove('show');
    }
  };

  // checking size of uploaded image
  const checkImageSize = (img) =>
    new Promise((resolve, reject) => {
      const { width } = img;
      const { height } = img;
      const { width: validWidth } = sizeValidation;
      const { height: validHeight } = sizeValidation;
      if (width > validWidth || height > validHeight) {
        const errorMessage = `Image dimensions should be less than or equal to ${validWidth}px x ${validHeight}px`;
        // Reject the promise with the error message
        reject(new Error(errorMessage));
      } else {
        // Resolve the promise
        resolve();
      }
    });

  // image src setter
  const imagSetter = (src) => {
    const validatingImg = document.createElement('img'); // creating image in the dom to validate dimensions
    validatingImg.src = src;
    validatingImg.addEventListener('load', () => {
      checkImageSize(validatingImg)
        .then(() => {
          displayImage.current.src = src;
          controlImageContainer(true);
        })
        .catch((error) => {
          message.error(error.message);
        });
    });
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
      const readerResult = reader.result;
      imagSetter(readerResult);
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
    <section className={`flex-row-c m-gc upload-container ${mode}`}>
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
            // onLoad={checkImageSize}
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
