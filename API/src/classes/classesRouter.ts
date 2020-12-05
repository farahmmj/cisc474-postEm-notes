import { AppRouter } from "../common/AppRouter";
import { SecurityMiddleware } from "../security/securityMiddleware";
import { ClassesController } from "./classesController";



export class ClassesRouter extends AppRouter{
    static useController: ClassesController = new ClassesController();
    constructor(){super();}

    //sets up the routes within this module shows an example of a route that requires authorization, and one that does not
    setupRoutes(): void {   
        

        this.expressRouter.get('/:classId',ClassesRouter.useController.getClass);
        //this.expressRouter.get('/:classId/notes', ClassesRouter.useController.getNote);
        //this.expressRouter.post('/',[SecurityMiddleware.RequireAuth],ClassesRouter.useController.addClass);
        //this.expressRouter.post('/:class_id/notes',[SecurityMiddleware.RequireAuth],ClassesRouter.useController.addNote);
        //this.expressRouter.put('/:class/:class_id',[SecurityMiddleware.RequireAuth],ClassesRouter.useController.updateClass);
        //this.expressRouter.put('/:class_id/notes',[SecurityMiddleware.RequireAuth],ClassesRouter.useController.updateNotes);
        //this.expressRouter.delete('/:class_id/notes/:noteid',[SecurityMiddleware.RequireAuth],ClassesRouter.useController.deleteNotes);

        
    }    
}