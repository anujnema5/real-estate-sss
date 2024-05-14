import { NextFunction, Request, Response } from "express";
import { CustomError } from "./api.error";
import { BAD_REQUEST_HTTP_CODE, MISSING_REQUIRED_FIELDS } from "../constants/constants";

export const use = function (fn: any, { reqBody = true }: { reqBody?: boolean } = { reqBody: false }) {
    return function (req: Request, res: Response, next: NextFunction) {

        if (reqBody) {
            const body = req.body;

            if (!body || Object.keys(body).length === 0) {
                throw new CustomError(BAD_REQUEST_HTTP_CODE, MISSING_REQUIRED_FIELDS)
            }
        }
        return Promise.resolve(fn(req, res, next)).catch(next);
    };
};
