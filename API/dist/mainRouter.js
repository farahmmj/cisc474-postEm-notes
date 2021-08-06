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
exports.MainRouter = void 0;
var AppRouter_1 = require("./common/AppRouter");
var securityrouter_1 = require("./security/securityrouter");
var projectsRouter_1 = require("./projects/projectsRouter");
var usersRouter_1 = require("./users/usersRouter");
var classesRouter_1 = require("./classes/classesRouter");
//root router for the API
var MainRouter = /** @class */ (function (_super) {
    __extends(MainRouter, _super);
    function MainRouter() {
        return _super.call(this) || this;
    }
    //adds the child routers to various paths to form the overall API. 
    MainRouter.prototype.setupRoutes = function () {
        this.addRouter('/security', new securityrouter_1.SecurityRouter());
        this.addRouter('/projects', new projectsRouter_1.ProjectsRouter());
        //Adding stuff here
        this.addRouter('/users', new usersRouter_1.UsersRouter());
        this.addRouter('/classes', new classesRouter_1.ClassesRouter());
    };
    return MainRouter;
}(AppRouter_1.AppRouter));
exports.MainRouter = MainRouter;
//# sourceMappingURL=mainRouter.js.map