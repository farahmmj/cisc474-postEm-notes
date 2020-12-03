import { AppRouter } from "../common/AppRouter";
import { SecurityMiddleware } from "../security/securityMiddleware";
import { UsersController } from "./usersController";


export class UsersRouter extends AppRouter{
    static useController: UsersController=new UsersController();
    constructor(){super();}

    //sets up the routes within this module shows an example of a route that requires authorization, and one that does not
    setupRoutes(): void {   
        //For debugging purposes
        //this.expressRouter.get('/', UsersRouter.useController.getUsers); 
        
        //PLEASE REMEBER THAT NOTE-ID HAS TO BE IMPLEMENTED!

        this.expressRouter.get('/:username',UsersRouter.useController.getUser);
        //this.expressRouter.get('/:username/notes', UsersRouter.useController.getNotes);
        this.expressRouter.get('/:id/notes', UsersRouter.useController.getNote);
        this.expressRouter.post('/',[SecurityMiddleware.RequireAuth],UsersRouter.useController.addUser);
        this.expressRouter.post('/:id/notes',[SecurityMiddleware.RequireAuth],UsersRouter.useController.addNote);
        this.expressRouter.put('/:username/:id',[SecurityMiddleware.RequireAuth],UsersRouter.useController.updateUser);
        this.expressRouter.put('/:id/notes',[SecurityMiddleware.RequireAuth],UsersRouter.useController.updateNotes);
        //this.expressRouter.delete('/:username/:id',[SecurityMiddleware.RequireAuth],UsersRouter.useController.deleteUser);
        this.expressRouter.delete('/:id/notes/:noteid',[SecurityMiddleware.RequireAuth],UsersRouter.useController.deleteNotes);

        
    }    
}