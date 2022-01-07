import createPool from '../../../../common/persistence/mysql.pesistence';
import { Subscription } from '../../domain/subscription';
import { SubscriptionRepository } from '../../subscription.repository';


export class SubscriptionMySQLRepository  implements SubscriptionRepository{
    public async all(): Promise<Subscription[]>{
        const [rows] = await createPool.execute(
            'SELECT * FROM wallet_subscription ORDER BY id DESC'
        );
        return rows as Subscription[];
    }

    public async find(id:number) :Promise<Subscription | null>{
        const [rows]: any [] = await createPool.execute(
            'SELECT * FROM wallet_subscription WHERE id = ?',
            [id]
        );

        if(rows.length){
            return rows[0] as Subscription;
        }
        return null;
    }

    public async findByUserAndCode(user_id: number,code:string):Promise<Subscription | null >{
        const [rows] :any[] = await createPool.execute(
            'SELECT * FROM wallet_subscription WHERE user_id = ? AND code = ?',
            [user_id, code]
        )

        if(rows.length) {
            return rows[0] as Subscription;
        }

        return null;
    }

    public async store(entry: Subscription) :Promise<void>{
        const now =  new Date();
        await createPool.execute(
            'INSERT INTO wallet_subscription(user_id, code, amount, cron, created_at) VALUES(?,?,?,?,?)',
            [entry.user_id,entry.code,entry.amount,entry.cron,now]
        )
    }

    public async update(entry:Subscription):Promise<void>{
        const now =  new Date();
        await createPool.execute(
            'UPDATE wallet_subscription SET user_id= ? , code= ? , amount = ? , cron = ?, updated_at = ? WHERE id = ?',
            [entry.user_id,entry.code,entry.amount,entry.cron,now,entry.id]
        )
    }

    public async remove(id:Number):Promise<void> {
        await createPool.execute(
            'DELETE FROM wallet_subscription WHERE id = ?',
            [id]
        )
    }
}