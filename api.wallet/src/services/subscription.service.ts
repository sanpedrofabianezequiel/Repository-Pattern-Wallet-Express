import { Subscription } from "./repositories/model/subscription";
import { ISubscriptionRepository } from "./repositories/ISubscription.repository";
import { SubscriptionCreateDto, SubscriptionUpdateDto } from '../dtos/subscription.dto';
import { ApplicationException } from '../common/exceptions/application.exception';


export class SubscriptionService {
    constructor(private readonly subscriptionRepository : ISubscriptionRepository){
    }

    public async find(id:number) : Promise<Subscription | null> {
        return await this.subscriptionRepository.find(id);
    }

    public async all():Promise<Subscription[]> {
        return await this.subscriptionRepository.all();
    }

    public async store(entry: SubscriptionCreateDto):Promise<void>{
        const originalEntry =  await  this.subscriptionRepository.findByUserIdAndCode(entry.user_id,entry.code);

        if(!originalEntry){
            await this.subscriptionRepository.store(entry as Subscription);
        }else {
            throw new ApplicationException('Subscription already exists');
        }
    }

    public async update(id:number,entry : SubscriptionUpdateDto):Promise<void>{
        let originalEntry = await this.subscriptionRepository.find(id);
        console.log(originalEntry);
        console.log(entry);
        if(originalEntry){
            originalEntry.code = entry.code;
            originalEntry.amount =  entry.amount;
            originalEntry.cron = entry.cron;

            this.subscriptionRepository.update(originalEntry);
        }else {
            throw new ApplicationException('Subscription not found')
        }
    }

    public async remove(id:number):Promise<void>{
        await this.subscriptionRepository.remove(id);
    }
}