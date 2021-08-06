"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClassesRouter = void 0;
var AppRouter_1 = require("../common/AppRouter");
var classesController_1 = require("./classesController");
var ClassesRouter = /** @class */ (function (_super) {
    __extends(ClassesRouter, _super);
    function ClassesRouter() {
        return _super.call(this) || this;
    }
    //sets up the routes within this module shows an example of a route that requires authorization, and one that does not
    ClassesRouter.prototype.setupRoutes = function () {
        this.expressRouter.get('/courses/:classId', ClassesRouter.useController.getClassByID);
        this.expressRouter.get('/professors/:professor', ClassesRouter.useController.getClassByProf);
        //this.expressRouter.get('/:classId/notes', ClassesRouter.useController.getNote);
        //this.expressRouter.post('/',[SecurityMiddleware.RequireAuth],ClassesRouter.useController.addClass);
        //this.expressRouter.post('/:class_id/notes',[SecurityMiddleware.RequireAuth],ClassesRouter.useController.addNote);
        //this.expressRouter.put('/:class/:class_id',[SecurityMiddleware.RequireAuth],ClassesRouter.useController.updateClass);
        //this.expressRouter.put('/:class_id/notes',[SecurityMiddleware.RequireAuth],ClassesRouter.useController.updateNotes);
        //this.expressRouter.delete('/:class_id/notes/:noteid',[SecurityMiddleware.RequireAuth],ClassesRouter.useController.deleteNotes);
    };
    ClassesRouter.useController = new classesController_1.ClassesController();
    return ClassesRouter;
}(AppRouter_1.AppRouter));
exports.ClassesRouter = ClassesRouter;
//# sourceMappingURL=classesRouter.js.map