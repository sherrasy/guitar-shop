import { Request, Response } from 'express';
import { Controller } from '../../controller/controller.abstract.js';
import { AppComponent } from '../../../types/app-component.enum.js';
import { HttpMethod } from '../../../types/http-method.enum.js';
import { LoggerInterface } from '../../../types/core/logger.interface';
import { fillDTO } from '../../helpers/common.js';
import { ControllerRoute, EntityName, ObjectIdParam, PhotoUploadParam } from '../../../utils/constant.js';
import { LoggerInfoMessage } from '../../logger/logger.constant.js';
import { GuitarServiceInterface } from './guitar-service.interface.js';
import GuitarRdo from './rdo/guitar.rdo.js';
import UpdateGuitarDto from './dto/update-guitar.js';
import CreateGuitarDto from './dto/create-guitar.js';
import { inject, injectable } from 'inversify';
import { ValidateDTOMiddleware } from '../../middleware/validate-dto.middleware.js';
import { ValidateObjectIdMiddleware } from '../../middleware/validate-objectId.middleware.js';
import { DocumentExistsMiddleware } from '../../middleware/document-exists.middleware.js';
import { UnknownRecord } from '../../../types/unknown-record.type.js';
import { ParamsGuitarDetails } from '../../../types/request-details.type.js';
import { PrivateRouteMiddleware } from '../../middleware/private-route.middleware.js';
import { ConfigInterface } from '../../../types/core/config.interface.js';
import { ConfigSchema } from '../../../types/core/config-schema.type.js';
import { UploadFileMiddleware } from '../../middleware/upload-file.middleware.js';
import UploadPhotoRdo from './rdo/upload-photo.rdo.js';
import { GuitarQuery } from './query/guitar-query.js';
// import { DEFAULT_GUITARS_AMOUNT } from './guitar.constant.js';
@injectable()
export default class GuitarController extends Controller {
  private readonly name = 'GuitarController';

  constructor(
    @inject(AppComponent.LoggerInterface)
    protected readonly logger: LoggerInterface,
    @inject(AppComponent.GuitarServiceInterface)
    private readonly guitarService: GuitarServiceInterface,
    @inject(AppComponent.ConfigInterface)
    protected readonly configService: ConfigInterface<ConfigSchema>,
  ) {
    super(logger, configService);

    this.logger.info(
      LoggerInfoMessage.RegisterRoute.concat(this.name)
    );

    this.addRoute({
      path: ControllerRoute.Main,
      method: HttpMethod.Get,
      handler: this.index,
    });

    // this.addRoute({
    //   path: ControllerRoute.GuitarsPagesAmount,
    //   method: HttpMethod.Get,
    //   handler: this.showPages,
    // });

    this.addRoute({
      path: ControllerRoute.Main,
      method: HttpMethod.Post,
      handler: this.create,
      middlewares:[
        new PrivateRouteMiddleware(),
        new ValidateDTOMiddleware(CreateGuitarDto)
      ]
    });

    this.addRoute({
      path: ControllerRoute.Guitar,
      method: HttpMethod.Get,
      handler: this.showGuitar,
      middlewares:[
        new PrivateRouteMiddleware(),
        new ValidateObjectIdMiddleware(ObjectIdParam.GuitarId),
        new DocumentExistsMiddleware(this.guitarService, EntityName.Guitar, ObjectIdParam.GuitarId)
      ]
    });

    this.addRoute({
      path: ControllerRoute.Guitar,
      method: HttpMethod.Patch,
      handler: this.update,
      middlewares:[
        new PrivateRouteMiddleware(),
        new ValidateObjectIdMiddleware(ObjectIdParam.GuitarId),
        new ValidateDTOMiddleware(UpdateGuitarDto),
        new DocumentExistsMiddleware(this.guitarService, EntityName.Guitar, ObjectIdParam.GuitarId)
      ]
    });

    this.addRoute({
      path: ControllerRoute.Guitar,
      method: HttpMethod.Delete,
      handler: this.delete,
      middlewares:[
        new PrivateRouteMiddleware(),
        new ValidateObjectIdMiddleware(ObjectIdParam.GuitarId),
        new DocumentExistsMiddleware(this.guitarService, EntityName.Guitar, ObjectIdParam.GuitarId)
      ]
    });
    this.addRoute({
      path: ControllerRoute.Guitar.concat('/', PhotoUploadParam.ResourseField),
      method: HttpMethod.Post,
      handler: this.uploadPhoto,
      middlewares: [
        new ValidateObjectIdMiddleware(ObjectIdParam.GuitarId),
        new UploadFileMiddleware(this.configService.get('UPLOAD_DIRECTORY'), PhotoUploadParam.ResourseField),
      ]
    });
  }

  public async index(
    req: Request<UnknownRecord, UnknownRecord, GuitarQuery>,
    res: Response
  ): Promise<void> {
    const guitars = await this.guitarService.find(req.query);
    const guitarsToResponse = fillDTO(GuitarRdo, guitars);
    this.ok(res, guitarsToResponse);
  }

  // public async showPages(
  //   _req: Request<UnknownRecord, UnknownRecord, UnknownRecord>,
  //   res: Response
  // ): Promise<void> {
  //   const guitars = await this.guitarService.findAll();
  //   const pages = Math.round(guitars.length / DEFAULT_GUITARS_AMOUNT);
  //   this.ok(res, pages);
  // }

  public async create(
    { body }: Request<UnknownRecord, UnknownRecord, CreateGuitarDto>,
    res: Response
  ): Promise<void> {
    const result = await this.guitarService.create(body);
    const guitar = await this.guitarService.findById(result.id);
    this.created(res, fillDTO(GuitarRdo, guitar));
  }

  public async showGuitar(
    { params }: Request<ParamsGuitarDetails>,
    res: Response
  ): Promise<void> {
    const { guitarId } = params;
    const guitar = await this.guitarService.findById(guitarId);
    this.ok(res, fillDTO(GuitarRdo, guitar));
  }

  public async update(
    {
      body,
      params,
    }: Request<ParamsGuitarDetails, UnknownRecord, UpdateGuitarDto>,
    res: Response
  ): Promise<void> {
    const updatedGuitar = await this.guitarService.updateById(
      params.guitarId,
      body
    );
    this.ok(res, fillDTO(GuitarRdo, updatedGuitar));
  }

  public async delete(
    { params }: Request<ParamsGuitarDetails>,
    res: Response
  ): Promise<void> {
    const { guitarId } = params;
    const guitar = await this.guitarService.deleteById(guitarId);
    this.noContent(res, guitar);
  }

  public async uploadPhoto(req: Request<ParamsGuitarDetails>, res: Response) {
    const {guitarId} = req.params;
    const updatedPhoto = { photo: req.file?.filename };
    await this.guitarService.updateById(guitarId, updatedPhoto);
    this.created(res, fillDTO(UploadPhotoRdo, updatedPhoto));
  }
}
