import { nanoid } from 'nanoid';
import multer, { diskStorage } from 'multer';
import { extension } from 'mime-types';
import { NextFunction, Request, Response } from 'express';
import { MiddlewareInterface } from '../../types/core/middleware.interface';
import { ErrorMessage, VALID_MIMETYPES } from '../../utils/constant.js';

export class UploadFileMiddleware implements MiddlewareInterface {
  constructor(
    private uploadDirectory: string,
    private fieldName: string,
  ) {}

  public async execute(req: Request, res: Response, next: NextFunction): Promise<void> {
    const storage = diskStorage({
      destination: this.uploadDirectory,
      filename: (_req, file, callback) => {
        let error:Error|null = null;
        const fileExtentions = extension(file.mimetype);
        if(!fileExtentions || !VALID_MIMETYPES.includes(fileExtentions)){
          error = new Error (ErrorMessage.InvalidMimetype);
        }
        const filename = nanoid();
        callback(error, `${filename}.${fileExtentions}`);
      }
    });

    const uploadSingleFileMiddleware = multer({storage})
      .single(this.fieldName);

    uploadSingleFileMiddleware(req, res, next);
  }
}
