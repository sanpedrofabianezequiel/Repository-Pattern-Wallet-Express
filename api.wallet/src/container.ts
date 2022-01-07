import express = require('express');
import { asClass, createContainer } from "awilix";
import { TestService } from './services/test.service';
import { scopePerRequest } from 'awilix-express';
import { SubscriptionMySQLRepository } from './services/repositories/impl/mysql/subscription.respository';
import { SubscriptionService } from './services/subscription.service';

export default (app: express.Application)=>{
    const container =  createContainer({
        injectionMode:'CLASSIC'
    });

    container.register({
        //repositories
        subscriptionRepository : asClass(SubscriptionMySQLRepository).scoped(),


        //Services //Mapiando depencias
        subscriptionService:asClass(SubscriptionService).scoped(),
        testService : asClass(TestService).scoped()
    });

    app.use(scopePerRequest(container));
}
