process.env.NODE_ENV = process.env.NODE_ENV || 'development';
process.env.APP_ENV  = process.env.APP_ENV  || 'development';
import dotenv = require('dotenv');
dotenv.config({
    path:`${__dirname}/../config/${process.env.APP_ENV}.env`
})

import express = require('express');
import loadContainer from './container';
import { TestService } from './services/test.service';
import { loadControllers } from 'awilix-express';

const app: express.Application = express();


app.use(express.json())//Json Support
loadContainer(app);//Container

app.use(loadControllers(//Controllers
    'controllers/*.ts',
    {cwd:__dirname}
))



export {app};