// import asyncHandler from 'express-async-handler'
// // /**
// // * @param {import('express').Request} req - The Express request object.
// //  * @param {import('express').Response} res - The Express response object.
// //  * @param {import('express').NextFunction} next - The Express next middleware function.
// //  * @throws {Error}
// // */
// const asyncHandler = (fn) => (req, res, next) =>
//     Promise.resolve(fn(req, res, next)).catch(next);

// export default asyncHandler;



// const asyncHandler = (fn) => (req, res, next) =>
//     Promise.resolve(fn(req, res, next)).catch(next);

// export default asyncHandler;


import { NextFunction, Request, Response } from 'express';

export interface IFunction {
    (req: Request, res: Response, next: NextFunction): Promise<unknown>;
}

const asyncHandler = (fn: IFunction) => {
    return (req: Request, res: Response, next: NextFunction) => {
        fn(req, res, next).catch((err) => next(err));
    };
};

export default asyncHandler;




