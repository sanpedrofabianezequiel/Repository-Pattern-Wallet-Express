import { Subscription } from "./model/subscription";

export interface ISubscriptionRepository{
    all(): Promise<Subscription[]>;
    find(id:number) :Promise<Subscription | null>;
    store(entry: Subscription) :Promise<void>;
    update(entry:Subscription):Promise<void>;
    remove(id:Number):Promise<void>;
    findByUserIdAndCode(user_id: number,code:string):Promise<Subscription | null >
}