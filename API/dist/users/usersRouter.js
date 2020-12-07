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
exports.UsersRouter = void 0;
var AppRouter_1 = require("../common/AppRouter");
var securityMiddleware_1 = require("../security/securityMiddleware");
var usersController_1 = require("./usersController");
var UsersRouter = /** @class */ (function (_super) {
    __extends(UsersRouter, _super);
    function UsersRouter() {
        return _super.call(this) || this;
    }
    //sets up the routes within this module shows an example of a route that requires authorization, and one that does not
    UsersRouter.prototype.setupRoutes = function () {
        this.expressRouter.get('/:username', UsersRouter.useController.getUser);
        this.expressRouter.get('/:username/notes/:noteid', UsersRouter.useController.getNote);
        this.expressRouter.get('/:username/notes', UsersRouter.useController.getNotes);
        this.expressRouter.post('/', [securityMiddleware_1.SecurityMiddleware.RequireAuth], UsersRouter.useController.addUser);
        this.expressRouter.post('/:username/notes', [securityMiddleware_1.SecurityMiddleware.RequireAuth], UsersRouter.useController.addNote);
        this.expressRouter.post('/:username/notes/:noteid', [securityMiddleware_1.SecurityMiddleware.RequireAuth], UsersRouter.useController.addComments);
        //this.expressRouter.put('/:username/:id',[SecurityMiddleware.RequireAuth],UsersRouter.useController.updateUser);
        //this.expressRouter.put('/:id/notes',[SecurityMiddleware.RequireAuth],UsersRouter.useController.updateNotes);
        // Routers below can be implemented later. Not necessary for the presentation
        //this.expressRouter.delete('/:username/:id',[SecurityMiddleware.RequireAuth],UsersRouter.useController.deleteUser);
        /*this.expressRouter.delete('/:id/notes/:noteid',[SecurityMiddleware.RequireAuth],UsersRouter.useController.deleteNotes);
        */
        //Adding the comments end points
        //this.expressRouter.get('/:username/notes/:noteid/comments',[SecurityMiddleware.RequireAuth],UsersRouter.useController.getComments);
    };
    UsersRouter.useController = new usersController_1.UsersController();
    return UsersRouter;
}(AppRouter_1.AppRouter));
exports.UsersRouter = UsersRouter;
//# sourceMappingURL=usersRouter.js.map