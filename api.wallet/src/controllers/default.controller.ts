import { Request,Response } from "express";
import { GET, route } from "awilix-express";

@route('/')
export class DefaultController {


    @GET()
    public index(req:Request,res:Response){
        return res.status(200).json({
            msg:'GET Default'
        })
    }
}