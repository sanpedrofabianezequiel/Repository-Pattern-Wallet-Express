import { DELETE, GET, POST, PUT, route } from 'awilix-express';
import { Request, Response } from 'express';
import { SubscriptionService } from '../services/subscription.service';
import { SubscriptionCreateDto, SubscriptionUpdateDto } from '../dtos/subscription.dto';
import { BaseController } from '../common/controllers/base.controller';

@route('/subscriptions')
export class SubscriptionController extends BaseController {
    constructor(private readonly subscriptionService : SubscriptionService){
        super(); //Debemos llamar el super ya que usamos BaseController
    }

    @GET()
    public async all(req:Request,res:Response){
        try {
         
            res.status(200).json({
                value: await this.subscriptionService.all()
            })   
        } catch (error) {
            this.handleException(error,res);
        }
    }

    //localhost:3001/subscriptions/1
    @route('/:id')
    @GET()
    public async find(req:Request,res:Response) {
        const id = parseInt(req.params.id);

        try {
         
            const result = await this.subscriptionService.find(id);
            if(result){    
                res.status(200).json({
                    value : result
                })  
            }else {    
                res.status(404).json({
                    value : 'Not Found'
                })  
            }
        } catch (error) {
            this.handleException(error,res);
        }
    }

    @POST()
    public async store(req:Request,res:Response){
        try {
            
            await this.subscriptionService.store({
                user_id:req.body.user_id,
                code:req.body.code,
                amount:req.body.amount,
                cron: req.body.cron
            } as SubscriptionCreateDto);

            return res.status(200).json({msg:'POST DONE'})   
        } catch (error) {
            console.log(error)
            this.handleException(error,res);
        }
    }

    @route('/:id')
    @PUT()
    public async update(req:Request,res:Response ){
        const id =  parseInt(req.params.id);
        try {   
            await this.subscriptionService.update(id,{
                code:req.body.code,
                amount:req.body.amount,
                cron:req.body.cron
            } as SubscriptionUpdateDto);

            return res.status(200).json({msg:'PUT DONE'})   
        } catch (error) {
            console.log(error);
            this.handleException(error,res);
        }
    }

    @route(':id')
    @DELETE()
    public async delete(req:Request,res:Response){
        try {    
            const id =  parseInt(req.params.id);
            await this.subscriptionService.remove(id);
            res.status(200).json({msg:'DELETE'})   
        } catch (error) {
            this.handleException(error,res);
        }
    }
}