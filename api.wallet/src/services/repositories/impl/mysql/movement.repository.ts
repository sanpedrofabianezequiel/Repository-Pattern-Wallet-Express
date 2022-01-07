import { IMovementRepository } from '../../IMovement.repository';
import { Movement } from '../../model/movement';
import db from '../../../../common/persistence/mysql.pesistence';

export class MovementMySQLRepository implements IMovementRepository {
    public async find(id: number): Promise<Movement | null> {
      const [rows] :any[] = await db.execute(
          'SELECT * FROM wallet_movement WHERE id = ?',
          [id]
      );

      if(rows.length){
          return rows[0]
      }
      return null;
    }
    public async  all(): Promise<Movement[]> {
        const [rows] : any [] = await db.execute(
            'SELECET * FROM wallet_movement ORDER BY id DESC'
        );
        return rows as Movement[];
    }
    public async  store(entry: Movement): Promise<void> {
        const now =  new Date();

        await db.execute(
            'INSERT INTO wallet_movement(user_id, type ,amount , created_at) VALUES (?,?,?,?)',
            [entry.user_id,entry.type,entry.amount,now]
        );
    }
    public async  update(entry: Movement): Promise<void> {
        const now = new Date();

        await db.execute(
            'UPDATE wallet_movement SET user_id = ?, type = ? , amount = ? , updated_at = ? WHERE id  = ?',
            [entry.user_id,entry.type,entry.amount,now,entry.id]
        );
    }
    public async  remove(id: number): Promise<void> {
        await db.execute(
            'DELETE FROM wallet_movement WHERE id = ?',
            [id]
        )
    }

}