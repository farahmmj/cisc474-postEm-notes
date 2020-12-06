"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClassesModel = void 0;
var ClassesModel = /** @class */ (function () {
    function ClassesModel() {
        this.classId = '';
        this.professor = '';
    }
    ClassesModel.fromObject = function (object) {
        var p = new ClassesModel();
        p.classId = object.classId;
        p.professor = object.professor;
        return p;
    };
    ClassesModel.prototype.toObject = function () {
        return { classId: this.classId, professor: this.professor };
    };
    return ClassesModel;
}());
exports.ClassesModel = ClassesModel;
//# sourceMappingURL=classesModel.js.map