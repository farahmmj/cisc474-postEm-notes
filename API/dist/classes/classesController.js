"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClassesController = void 0;
var classesModel_1 = require("./classesModel");
var MongoDB_1 = require("../common/MongoDB");
var config_1 = require("../config");
var ClassesController = /** @class */ (function () {
    function ClassesController() {
    }
    ClassesController.prototype.getClassByID = function (req, res) {
        var classId = req.params.classId;
        ClassesController.db.getRecords(ClassesController.ClassesTable, { classId: classId })
            .then(function (results) { return res.send({ fn: 'getClassByID', status: 'success', data: results }).end(); })
            .catch(function (reason) { return res.status(500).send(reason).end(); });
    };
    ClassesController.prototype.getClassByProf = function (req, res) {
        var professor = req.params.professor;
        ClassesController.db.getRecords(ClassesController.ClassesTable, { professor: professor })
            .then(function (results) { return res.send({ fn: 'getClassByProf', status: 'success', data: results }).end(); })
            .catch(function (reason) { return res.status(500).send(reason).end(); });
    };
    ClassesController.prototype.addClass = function (req, res) {
        var class_exist = false;
        var prof_exist = false;
        var id = MongoDB_1.Database.stringToId(req.params.id);
        var classId = req.body.classId;
        var professor = req.body.professor;
        ClassesController.db.getRecords(ClassesController.ClassesTable, { classId: classId })
            .then(function (results) {
            //console.log(results.classId);
            for (var i = 0; i < results.length; i++) {
                if (results[i].classId === classId) {
                    class_exist = true;
                }
                if (results[i].classId === classId && results[i].professor === professor) {
                    prof_exist = true;
                }
            }
            //results.classId=[];
            if (!class_exist || (class_exist && !prof_exist)) {
                var use = classesModel_1.ClassesModel.fromObject(req.body);
                ClassesController.db.addRecord(ClassesController.ClassesTable, use.toObject())
                    .then(function (result) { return res.send({ fn: 'addClass', status: 'success' }).end(); })
                    .catch(function (reason) { return res.status(500).send(reason).end(); });
            }
            //results.notes.push({classId:classId});
            /*ClassesController.db.updateRecord(ClassesController.ClassesTable, { id:id }, { $set: {classId:results.classId }})
            .then((results) => results ? (res.send({ fn: 'updateClasses', status: 'success' })) : (res.send({ fn: 'addClasses', status: 'failure', data: 'Not found' })).end())
            .catch(err => res.send({ fn: 'addClasses', status: 'failure', data: err }).end());*/
        })
            .catch(function (reason) { return res.status(500).send(reason).end(); });
    };
    ClassesController.db = new MongoDB_1.Database(config_1.Config.url, "security");
    ClassesController.ClassesTable = 'classes';
    return ClassesController;
}());
exports.ClassesController = ClassesController;
//# sourceMappingURL=classesController.js.map