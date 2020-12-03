"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClassesModel = void 0;
var ClassesModel = /** @class */ (function () {
    function ClassesModel() {
        this.class_id = '';
        this.class = '';
        this.notes = '';
        this.note_id = '';
    }
    ClassesModel.fromObject = function (object) {
        var p = new ClassesModel();
        p.class = object.classes;
        p.notes = object.notes;
        p.note_id = object.note_id;
        return p;
    };
    ClassesModel.prototype.toObject = function () {
        return { class: this.class, notes: this.notes, note_id: this.note_id };
    };
    return ClassesModel;
}());
exports.ClassesModel = ClassesModel;
//# sourceMappingURL=classesModel.js.map