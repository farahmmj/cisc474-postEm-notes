"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersModel = void 0;
var UsersModel = /** @class */ (function () {
    function UsersModel() {
        this.id = '';
        this.username = '';
        this.notes = '';
        this.comments = '';
        this.classId = '';
    }
    UsersModel.fromObject = function (object) {
        var p = new UsersModel();
        p.username = object.username;
        p.notes = object.notes;
        p.comments = object.comments;
        p.classId = object.classId;
        return p;
    };
    UsersModel.prototype.toObject = function () {
        return { username: this.username, notes: this.notes, comments: this.comments, classId: this.classId };
    };
    return UsersModel;
}());
exports.UsersModel = UsersModel;
//# sourceMappingURL=usersModel.js.map