import express from 'express'
import { AppRouter } from './common/AppRouter';
import { SecurityRouter } from './security/securityrouter';
import { ProjectsRouter } from './projects/projectsRouter';
import {UsersRouter} from './users/usersRouter';
import { ClassesRouter } from './classes/classesRouter';

//root router for the API

export class MainRouter extends AppRouter{
    constructor(){super();}

    //adds the child routers to various paths to form the overall API. 
    setupRoutes(): void {
        this.addRouter('/security',new SecurityRouter());        
        this.addRouter('/projects',new ProjectsRouter());

        //Adding my stuff here
        this.addRouter('/users', new UsersRouter());
        this.addRouter('/classes', new ClassesRouter());
    }
    
}