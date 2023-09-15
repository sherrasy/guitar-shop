import {Expose} from 'class-transformer';

export default class UploadPhotoRdo {
  @Expose()
  public photo!: string;
}
