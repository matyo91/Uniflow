import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as express from 'express';
import * as helmet from 'helmet';
import { AuthController, ContactController, FolderController, ProgramController, UserController, VersionController } from '../api/controllers';
import { NextFunction, Request, Response, Router } from "express";
import { errors, isCelebrateError } from 'celebrate';
import { ParamsConfig } from '../config';
import { LoaderInterface } from '../types';
import { Service } from 'typedi';

@Service()
export default class ServerLoader implements LoaderInterface {
  private app: express.Application;

  constructor(
    private authController: AuthController,
    private contactController: ContactController,
    private folderController: FolderController,
    private programController: ProgramController,
    private userController: UserController,
    private versionController: VersionController,
    private paramsConfig: ParamsConfig
  ) {}

	public getApp(): express.Application {
		return this.app;
	}

  public async load() {
    this.app = express()
    this.app.enable('trust proxy');
    this.app.use(cors({
      "origin": this.paramsConfig.getConfig().get('corsAllowOrigin')
    }));
    this.app.use(helmet());
    this.app.use(bodyParser.json());
    this.app.use(errors());
  
    const router = Router();
    this.authController.routes(router);
    this.contactController.routes(router);
    this.folderController.routes(router);
    this.programController.routes(router);
    this.userController.routes(router);
    this.versionController.routes(router);
  
    this.app.use('/api', router);
    this.app.use('/', express.static('./public'));
  
    /// catch 404 and forward to error handler
    this.app.use((req: Request, re: Response, next: NextFunction) => {
      const error: any = new Error('Not Found');
      error['status'] = 404;
      next(error);
    });
  
    /// error handlers
    this.app.use((err: any, req: Request, res: Response, next: NextFunction) => {
      /**
       * Handle 401 thrown by express-jwt library
       */
      if (err.name === 'UnauthorizedError') {
        return res
          .status(err.status)
          .send({ message: err.message })
          .end();
      }
  
      /**
       * Handle validation error thrown by Celebrate + Joi
       */
      if (isCelebrateError(err)) {
        return res
          .status(422)
          .send({ error: err.message })
          .end();
      }
      return next(err);
    });
  
    this.app.use((err: any, req: Request, res: Response, next: NextFunction) => {
      res.status(err.status || 500);
      res.json({
        errors: {
          message: err.message,
        },
      });
    });
  }
}
