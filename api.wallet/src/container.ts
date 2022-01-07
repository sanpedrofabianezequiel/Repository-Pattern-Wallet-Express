import express = require('express');
import { asClass, createContainer } from "awilix";
import { TestService } from './services/test.service';
import { scopePerRequest } from 'awilix-express';
import { SubscriptionMySQLRepository } from './services/repositories/impl/mysql/subscription.respository';
import { SubscriptionService } from './services/subscription.service';
import { MovementMySQLRepository } from './services/repositories/impl/mysql/movement.repository';
import { BalanceMySQLRepository } from './services/repositories/impl/mysql/balance.repository';
import { MovementService } from './services/movemnt.service';
import { SubscriptionMSSQLRepository } from './services/repositories/impl/mssql/subscription.repository';
import { BalanceMSSQLRepository } from './services/repositories/impl/mssql/balance.repository';
import { MovementMSSQLRepository } from './services/repositories/impl/mssql/movement.repository';

export default (app: express.Application)=>{
    const container =  createContainer({
        injectionMode:'CLASSIC'
    });

    container.register({
        //repositories
        /*subscriptionRepository : asClass(SubscriptionMySQLRepository).scoped(),
        movementRepository:asClass(MovementMySQLRepository).scoped(),
        balanceRepository:asClass(BalanceMySQLRepository).scoped(),
        */
        

        subscriptionRepository : asClass(SubscriptionMSSQLRepository).scoped(),
        movementRepository:asClass(MovementMSSQLRepository).scoped(),
        balanceRepository:asClass(BalanceMSSQLRepository).scoped(),


        //Services //Mapiando depencias
        subscriptionService:asClass(SubscriptionService).scoped(),
        movementService:asClass(MovementService).scoped(),
        testService : asClass(TestService).scoped()
    });

    app.use(scopePerRequest(container));
}
