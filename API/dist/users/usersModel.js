"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersModel = void 0;
var UsersModel = /** @class */ (function () {
    function UsersModel() {
        this.id = '';
        this.username = '';
        this.notes = '';
        this.note_id = '';
    }
    UsersModel.fromObject = function (object) {
        var p = new UsersModel();
        p.username = object.username;
        p.notes = object.notes;
        p.note_id = object.note_id;
        return p;
    };
    UsersModel.prototype.toObject = function () {
        return { username: this.username, notes: this.notes, note_id: this.note_id };
    };
    return UsersModel;
}());
exports.UsersModel = UsersModel;
//# sourceMappingURL=usersModel.js.map