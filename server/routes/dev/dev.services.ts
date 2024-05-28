import { Request, Response } from "express"


export const getSomething = (req: Request, res: Response)=> {
    return res.status(200).json({message: "Test"})
}