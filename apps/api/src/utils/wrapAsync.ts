import type { Request, Response, NextFunction } from "express";

type AsyncHandler = (
  req: Request<any>,
  res: Response,
  next: NextFunction
) => Promise<any>;

const wrapAsync = (fn: AsyncHandler) => {
  return (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next).catch(next);
  };
};

export default wrapAsync;