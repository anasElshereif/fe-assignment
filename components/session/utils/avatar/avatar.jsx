import Image from 'next/image';
import ImageUploader from '../../../image-uploader/image-uploader';
import AvatarUploadIcon from '../../../../public/avatar-upload.png';

export default function AvatarUploader({ file }) {
  return (
    <ImageUploader
      imageFile={(imgFile) => {
        file(imgFile);
      }}
      mode="avatar"
      sizeValidation={{ width: 800, height: 800 }}
    >
      <Image src={AvatarUploadIcon} alt="upload" className="uploader-container-img" />
    </ImageUploader>
  );
}
