"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClassesController = void 0;
var classesModel_1 = require("./classesModel");
var MongoDB_1 = require("../common/MongoDB");
var config_1 = require("../config");
var ClassesController = /** @class */ (function () {
    function ClassesController() {
    }
    ClassesController.prototype.getClass = function (req, res) {
        var classId = req.params.class_id;
        //const id = Database.stringToId(req.params.id);
        //const notes = req.params.notes;
        ClassesController.db.getOneRecord(ClassesController.ClassesTable, { classId: classId })
            .then(function (results) { return res.send({ fn: 'getClass', status: 'success', data: results._id }).end(); })
            .catch(function (reason) { return res.status(500).send(reason).end(); });
    };
    ClassesController.prototype.addClass = function (req, res) {
        var exist = false;
        var id = MongoDB_1.Database.stringToId(req.params.id);
        var classId = req.body.classId;
        ClassesController.db.getRecords(ClassesController.ClassesTable, { classId: classId })
            .then(function (results) {
            console.log(results.classId);
            for (var i = 0; i < results.length; i++) {
                if (results[i].classId === classId) {
                    exist = true;
                }
            }
            //results.classId=[];
            if (!exist) {
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
    ClassesController.prototype.addNote = function (req, res) {
        var id = MongoDB_1.Database.stringToId(req.params.id);
        var notes = req.body.notes;
        ClassesController.db.getOneRecord(ClassesController.ClassesTable, { _id: id })
            .then(function (results) {
            if (!results.notes) {
                results.notes = [];
            }
            results.notes.push({ id: MongoDB_1.Database.newId(), note: notes });
            ClassesController.db.updateRecord(ClassesController.ClassesTable, { _id: id }, { $set: { notes: results.notes } })
                .then(function (results) { return results ? (res.send({ fn: 'updateNotes', status: 'success' })) : (res.send({ fn: 'addNotes', status: 'failure', data: 'Not found' })).end(); })
                .catch(function (err) { return res.send({ fn: 'addNotes', status: 'failure', data: err }).end(); });
        })
            .catch(function (reason) { return res.status(500).send(reason).end(); });
        //const username = req.params.username;
    };
    ClassesController.prototype.getNote = function (req, res) {
        var username = req.params.username;
        var id = MongoDB_1.Database.stringToId(req.params.id);
        //const notes_id = req.params.notes_id;
        ClassesController.db.getOneRecord(ClassesController.ClassesTable, { _id: id })
            .then(function (results) { return res.send({ fn: 'getUser', status: 'success', data: results }).end(); })
            .catch(function (reason) { return res.status(500).send(reason).end(); });
    };
    ClassesController.prototype.updateClass = function (req, res) {
        var id = MongoDB_1.Database.stringToId(req.params.id);
        var username = req.body.username;
        delete username.authUser;
        ClassesController.db.updateRecord(ClassesController.ClassesTable, { _id: id }, { $set: req.body })
            .then(function (results) { return results ? (res.send({ fn: 'updateUser', status: 'success' })) : (res.send({ fn: 'updateUser', status: 'failure', data: 'Not found' })).end(); })
            .catch(function (err) { return res.send({ fn: 'updateUser', status: 'failure', data: err }).end(); });
    };
    ClassesController.prototype.updateNotes = function (req, res) {
        var id = MongoDB_1.Database.stringToId(req.params.id);
        var notes = req.body.notes;
        delete notes.authUser;
        ClassesController.db.updateRecord(ClassesController.ClassesTable, { _id: id }, { $set: req.body })
            .then(function (results) { return results ? (res.send({ fn: 'updateNotes', status: 'success' })) : (res.send({ fn: 'updateNotes', status: 'failure', data: 'Not found' })).end(); })
            .catch(function (err) { return res.send({ fn: 'updateNotes', status: 'failure', data: err }).end(); });
    };
    ClassesController.prototype.deleteNotes = function (req, res) {
        var id = MongoDB_1.Database.stringToId(req.params.id);
        var note_id = MongoDB_1.Database.stringToId(req.params.noteid);
        ClassesController.db.getOneRecord(ClassesController.ClassesTable, { _id: id })
            .then(function (results) {
            if (results.notes) {
                results.notes = results.notes.filter(function (item) { return !item.id.equals(note_id); });
                ClassesController.db.updateRecord(ClassesController.ClassesTable, { _id: id }, { $set: { notes: results.notes } })
                    .then(function (results) { return results ? (res.send({ fn: 'deleteNotes', status: 'success' })) : (res.send({ fn: 'addNotes', status: 'failure', data: 'Not found' })).end(); })
                    .catch(function (err) { return res.send({ fn: 'deleteNotes', status: 'failure', data: err }).end(); });
            }
        })
            .catch(function (reason) { return res.status(500).send(reason).end(); });
    };
    ClassesController.db = new MongoDB_1.Database(config_1.Config.url, "security");
    ClassesController.ClassesTable = 'classes';
    return ClassesController;
}());
exports.ClassesController = ClassesController;
//# sourceMappingURL=classesController.js.map