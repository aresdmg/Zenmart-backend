import { NextFunction, Request, Response } from "express";
import { ExtendedRequest } from "../middlewares/auth.middleware";

export type AsyncRequestHandler = (req: Request | ExtendedRequest, res: Response, next: NextFunction) => unknown;