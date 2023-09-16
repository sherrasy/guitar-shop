import { Request, Response } from 'express';
import { Controller } from '../../controller/controller.abstract.js';
import { AppComponent } from '../../../types/app-component.enum.js';
import { HttpMethod } from '../../../types/http-method.enum.js';
import { LoggerInterface } from '../../../types/core/logger.interface';
import { fillDTO } from '../../helpers/common.js';
import { ParamsDictionary } from 'express-serve-static-core';
import HttpError from '../../errors/http-error.js';
import { StatusCodes } from 'http-status-codes';
import { ControllerRoute, ObjectIdParam } from '../../../utils/constant.js';
import { LoggerInfoMessage } from '../../logger/logger.constant.js';
import { GuitarServiceInterface } from './guitar-service.interface.js';
import GuitarRdo from './rdo/guitar.rdo.js';
import UpdateGuitarDto from './dto/update-guitar.js';
import CreateGuitarDto from './dto/create-guitar.js';
import { RequestQuery } from '../../../types/request-query.type.js';
import { inject, injectable } from 'inversify';
import { ValidateDTOMiddleware } from '../../middleware/validate-dto.middleware.js';
import { ValidateObjectIdMiddleware } from '../../middleware/validate-objectId.middleware.js';

type ParamsGuitarDetails =
  | {
      guitarId: string;
    }
  | ParamsDictionary;

type UnknownRecord = Record<string, unknown>;

@injectable()
export default class GuitarController extends Controller {
  constructor(
    @inject(AppComponent.LoggerInterface)
    protected readonly logger: LoggerInterface,
    @inject(AppComponent.GuitarServiceInterface)
    private readonly guitarService: GuitarServiceInterface
  ) {
    super(logger);

    this.logger.info(
      LoggerInfoMessage.RegisterRoute.concat('GuitarController')
    );

    this.addRoute({
      path: ControllerRoute.Main,
      method: HttpMethod.Get,
      handler: this.index,
    });

    this.addRoute({
      path: ControllerRoute.Main,
      method: HttpMethod.Post,
      handler: this.create,
      middlewares:[
        new ValidateDTOMiddleware(CreateGuitarDto)
      ]
    });

    this.addRoute({
      path: ControllerRoute.Guitar,
      method: HttpMethod.Get,
      handler: this.showGuitar,
      middlewares:[
        new ValidateObjectIdMiddleware(ObjectIdParam.GuitarId),
      ]
    });

    this.addRoute({
      path: ControllerRoute.Guitar,
      method: HttpMethod.Patch,
      handler: this.update,
      middlewares:[
        new ValidateObjectIdMiddleware(ObjectIdParam.GuitarId),
        new ValidateDTOMiddleware(UpdateGuitarDto)
      ]
    });

    this.addRoute({
      path: ControllerRoute.Guitar,
      method: HttpMethod.Delete,
      handler: this.delete,
      middlewares:[
        new ValidateObjectIdMiddleware(ObjectIdParam.GuitarId),
      ]
    });
  }

  public async index(
    {
      query,
    }: Request<UnknownRecord, UnknownRecord, UnknownRecord, RequestQuery>,
    res: Response
  ): Promise<void> {
    const guitars = await this.guitarService.find(query.limit);
    const guitarsToResponse = fillDTO(GuitarRdo, guitars);
    this.ok(res, guitarsToResponse);
  }

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
    if (!guitar) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `Guitar with id ${guitarId} not found.`,
        'GuitarController'
      );
    }
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

    if (!updatedGuitar) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `Guitar with id ${params.guitarId} not found.`,
        'GuitarController'
      );
    }

    this.ok(res, fillDTO(GuitarRdo, updatedGuitar));
  }

  public async delete(
    { params }: Request<ParamsGuitarDetails>,
    res: Response
  ): Promise<void> {
    const { guitarId } = params;
    const guitar = await this.guitarService.deleteById(guitarId);

    if (!guitar) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `Guitar with id ${guitarId} not found.`,
        'GuitarController'
      );
    }

    this.noContent(res, guitar);
  }
}
