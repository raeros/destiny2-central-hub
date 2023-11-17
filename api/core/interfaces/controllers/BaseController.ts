import { Request, Response } from "express";

export interface BaseController {
    handleRequest(req: Request, res: Response): void;
}