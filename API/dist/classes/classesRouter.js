"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClassesRouter = void 0;
var AppRouter_1 = require("../common/AppRouter");
var securityMiddleware_1 = require("../security/securityMiddleware");
var classesController_1 = require("./classesController");
var ClassesRouter = /** @class */ (function (_super) {
    __extends(ClassesRouter, _super);
    function ClassesRouter() {
        return _super.call(this) || this;
    }
    //sets up the routes within this module shows an example of a route that requires authorization, and one that does not
    ClassesRouter.prototype.setupRoutes = function () {
        //For debugging purposes
        //this.expressRouter.get('/', UsersRouter.useController.getUsers); 
        //PLEASE REMEBER THAT NOTE-ID HAS TO BE IMPLEMENTED!
        this.expressRouter.get('/:class', ClassesRouter.useController.getClass);
        //this.expressRouter.get('/:username/notes', UsersRouter.useController.getNotes);
        this.expressRouter.get('/:class_id/notes', ClassesRouter.useController.getNote);
        this.expressRouter.post('/', [securityMiddleware_1.SecurityMiddleware.RequireAuth], ClassesRouter.useController.addClass);
        this.expressRouter.post('/:class_id/notes', [securityMiddleware_1.SecurityMiddleware.RequireAuth], ClassesRouter.useController.addNote);
        this.expressRouter.put('/:class/:class_id', [securityMiddleware_1.SecurityMiddleware.RequireAuth], ClassesRouter.useController.updateClass);
        this.expressRouter.put('/:class_id/notes', [securityMiddleware_1.SecurityMiddleware.RequireAuth], ClassesRouter.useController.updateNotes);
        //this.expressRouter.delete('/:username/:id',[SecurityMiddleware.RequireAuth],UsersRouter.useController.deleteUser);
        this.expressRouter.delete('/:class_id/notes/:noteid', [securityMiddleware_1.SecurityMiddleware.RequireAuth], ClassesRouter.useController.deleteNotes);
    };
    ClassesRouter.useController = new classesController_1.ClassesController();
    return ClassesRouter;
}(AppRouter_1.AppRouter));
exports.ClassesRouter = ClassesRouter;
//# sourceMappingURL=classesRouter.js.map