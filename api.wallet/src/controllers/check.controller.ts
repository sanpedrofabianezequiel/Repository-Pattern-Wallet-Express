import { Request,Response } from "express";
import { GET, route } from "awilix-express";
import { TestService } from '../services/test.service';

@route('/check')
export class CheckController {

    private readonly _testService: TestService;

    constructor(testService : TestService){
        this._testService = testService;
    }

    @GET()
    public index(req:Request,res:Response){
        return res.status(200).json({
            msg:'GET Check'
        })
    }

    @route('/test')
    @GET()
    public test(req:Request,res:Response){
        return res.status(200).json({
            msg:'GET Check/Test'
        })
    }
}