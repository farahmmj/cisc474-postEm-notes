import { AppRouter } from "../common/AppRouter";
import { SecurityMiddleware } from "../security/securityMiddleware";
import { UsersController } from "./usersController";


export class UsersRouter extends AppRouter{
    static useController: UsersController=new UsersController();
    constructor(){super();}

    //sets up the routes within this module shows an example of a route that requires authorization, and one that does not
    setupRoutes(): void {   
       
        this.expressRouter.get('/:username',UsersRouter.useController.getUser);
        this.expressRouter.get('/:username/notes/:noteid', UsersRouter.useController.getNote);
        this.expressRouter.get('/:username/notes', UsersRouter.useController.getNotes);
        this.expressRouter.post('/',[SecurityMiddleware.RequireAuth],UsersRouter.useController.addUser);
        this.expressRouter.post('/:username/notes',[SecurityMiddleware.RequireAuth],UsersRouter.useController.addNote);
        this.expressRouter.post('/:username/notes/:noteid',[SecurityMiddleware.RequireAuth],UsersRouter.useController.addComments);
        //this.expressRouter.put('/:username/:id',[SecurityMiddleware.RequireAuth],UsersRouter.useController.updateUser);
        //this.expressRouter.put('/:id/notes',[SecurityMiddleware.RequireAuth],UsersRouter.useController.updateNotes);

       // Routers below can be implemented later. Not necessary for the presentation
        //this.expressRouter.delete('/:username/:id',[SecurityMiddleware.RequireAuth],UsersRouter.useController.deleteUser);
        /*this.expressRouter.delete('/:id/notes/:noteid',[SecurityMiddleware.RequireAuth],UsersRouter.useController.deleteNotes);
        */
        //Adding the comments end points
        //this.expressRouter.get('/:username/notes/:noteid/comments',[SecurityMiddleware.RequireAuth],UsersRouter.useController.getComments);
    

        
    }    
}