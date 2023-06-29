import Image from 'next/image';
import ImageUploader from '../../../image-uploader/image-uploader';
import UploadIcon from '../../../../public/icons/upload.svg';

export default function ThumbnailUploader({ file, prefilledImage }) {
  return (
    <ImageUploader
      imageFile={(imgFile) => {
        file(imgFile);
      }}
      mode="thumbnail"
      sizeValidation={{ width: 800, height: 400 }}
      prefilledImage={prefilledImage}
    >
      <Image src={UploadIcon} alt="upload" />
      <span className="mt-14 mb-4">
        <span className="wc fw-7">Click to upload</span> or drag and drop
      </span>
      <span>SVG, PNG, JPG or GIF (max. 800x400px)</span>
    </ImageUploader>
  );
}
