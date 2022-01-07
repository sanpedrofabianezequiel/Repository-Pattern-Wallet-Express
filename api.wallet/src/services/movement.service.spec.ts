
import { MovementMockRepository } from './repositories/impl/mock/movement.repository';
import { BalanceMockRepository } from './repositories/impl/mock/balance.repository';
import assert = require('assert');
import { MovementService } from './movemnt.service';
import { MovementCreateDto } from '../dtos/movement.dto';
import { MovementType } from '../common/enums/movement-type';

const movementService = new MovementService(
    new MovementMockRepository(),
    new BalanceMockRepository()
);

describe('Movement.Service', () => {
    describe('Store', () => {
        it('tries to register an income movement', async () => {
            await movementService.store({
                user_id: 1,
                type: 0,
                amount: 200
            } as MovementCreateDto);
        });

        it('tries to register an outcome movement', async () => {
            await movementService.store({
                user_id: 2,
                type: 1,
                amount: 100
            } as MovementCreateDto);
        });

        it('tries to register an outcome movement with insufficient balance', async () => {
            try {
                await movementService.store({
                    user_id: 1,
                    type: 1,
                    amount: 200
                } as MovementCreateDto);
            } catch (error :any) {
                assert.equal(error.message, 'User does not have enough balance.');
            }
        });

        it('tries to register an unexpected movement', async () => {
            try {
                await movementService.store({
                    user_id: 1,
                    type: MovementType.outcome,
                    amount: 100
                } as MovementCreateDto);
            } catch (error:any) {
                assert.equal(error.message, 'Invalid movement type supplied.');
            }
        });
    });
});