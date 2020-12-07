"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersController = void 0;
var usersModel_1 = require("./usersModel");
var classesController_1 = require("../classes/classesController");
var MongoDB_1 = require("../common/MongoDB");
var config_1 = require("../config");
var UsersController = /** @class */ (function () {
    function UsersController() {
    }
    //Might not need it because of web token
    UsersController.prototype.getUser = function (req, res) {
        var username = req.params.username;
        //const id = Database.stringToId(req.params.id);
        //const notes = req.params.notes;
        UsersController.db.getOneRecord(UsersController.usersTable, { username: username })
            .then(function (results) { return res.send({ fn: 'getUser', status: 'success', data: results.notes }).end(); })
            .catch(function (reason) { return res.status(500).send(reason).end(); });
    };
    UsersController.prototype.getUserNotes = function (req, res) {
        var username = req.params.username;
        //const id = Database.stringToId(req.params.id);
        //const notes = req.params.notes;
        UsersController.db.getOneRecord(UsersController.usersTable, { username: username })
            .then(function (results) { return res.send({ fn: 'getUser', status: 'success', data: results }).end(); })
            .catch(function (reason) { return res.status(500).send(reason).end(); });
    };
    UsersController.prototype.addUser = function (req, res) {
        var use = usersModel_1.UsersModel.fromObject(req.body);
        UsersController.db.addRecord(UsersController.usersTable, use.toObject())
            .then(function (result) { return res.send({ fn: 'addUser', status: 'success' }).end(); })
            .catch(function (reason) { return res.status(500).send(reason).end(); });
    };
    UsersController.prototype.addNote = function (req, res) {
        var id = MongoDB_1.Database.stringToId(req.params.id);
        var username = req.params.username;
        var notes = req.body.notes;
        var professor = req.body.professor;
        var classId = req.body.classId;
        var data = req.body;
        console.log(data.authUser);
        var note_id;
        UsersController.db.getOneRecord(UsersController.usersTable, { username: username })
            .then(function (results) {
            /*if (!results.notes){
                results.notes
            }
            
            console.log(notes);
            note_id = JSON.stringify(Database.newId())
            results.notes[note_id] = {classId:classId, professor:professor, note: notes};*/
            if (!results.notes) {
                results.notes = [];
            }
            results.notes.push({ id: MongoDB_1.Database.newId(), note: notes, classId: classId, professor: professor });
            UsersController.classController.addClass(req, res);
            UsersController.db.updateRecord(UsersController.usersTable, { username: username }, { $set: { notes: results.notes } })
                .then(function (results) { return results ? (res.send({ fn: 'updateNotes', status: 'success' })) : (res.send({ fn: 'addNotes', status: 'failure', data: 'Not found' })).end(); })
                .catch(function (err) { return res.send({ fn: 'addNotes', status: 'failure', data: err }).end(); });
        })
            .catch(function (reason) { return res.status(500).send(reason).end(); });
    };
    UsersController.prototype.getNote = function (req, res) {
        var username = req.params.username;
        var id = MongoDB_1.Database.stringToId(req.params.noteid);
        console.log(id);
        UsersController.db.getOneRecord(UsersController.usersTable, { username: username })
            .then(function (results) {
            for (var i = 0; i < results.notes.length; i++) {
                console.log(results.notes[i].id);
                console.log(id);
                if (JSON.stringify(results.notes[i].id) === JSON.stringify(id)) {
                    res.send({ fn: 'getUser', status: 'success', data: results.notes[i] }).end();
                }
            }
        })
            .catch(function (reason) { return res.status(500).send(reason).end(); });
    };
    UsersController.prototype.getNotes = function (req, res) {
        var id = MongoDB_1.Database.stringToId(req.params.id);
        var username = req.params.username;
        var classId = req.params.classId;
        var professor = req.params.professor;
        UsersController.db.getRecords(UsersController.usersTable)
            .then(function (results) {
            var notes_list = [];
            for (var i = 0; i < results.length; i++) {
                for (var j = 0; results[i].notes && j < results[i].notes.length; j++) {
                    var current = results[i].notes[j];
                    //console.log(JSON.stringify(current.classId)===JSON.stringify(classId) && JSON.stringify(current.professor)===JSON.stringify(professor));
                    if (JSON.stringify(current.classId) === JSON.stringify(classId) && JSON.stringify(current.professor) === JSON.stringify(professor)) {
                        notes_list.push(results[i].notes[j]);
                        console.log(notes_list);
                    }
                }
            }
            console.log(notes_list);
            res.send({ fn: 'getUser', status: 'success', data: notes_list }).end();
        })
            .catch(function (reason) { return res.status(500).send(reason).end(); });
    };
    UsersController.prototype.updateUser = function (req, res) {
        var id = MongoDB_1.Database.stringToId(req.params.id);
        var username = req.body.username;
        delete username.authUser;
        UsersController.db.updateRecord(UsersController.usersTable, { _id: id }, { $set: req.body })
            .then(function (results) { return results ? (res.send({ fn: 'updateUser', status: 'success' })) : (res.send({ fn: 'updateUser', status: 'failure', data: 'Not found' })).end(); })
            .catch(function (err) { return res.send({ fn: 'updateUser', status: 'failure', data: err }).end(); });
    };
    UsersController.prototype.updateNotes = function (req, res) {
        var id = MongoDB_1.Database.stringToId(req.params.id);
        var notes = req.body.notes;
        delete notes.authUser;
        UsersController.db.updateRecord(UsersController.usersTable, { _id: id }, { $set: req.body })
            .then(function (results) { return results ? (res.send({ fn: 'updateNotes', status: 'success' })) : (res.send({ fn: 'updateNotes', status: 'failure', data: 'Not found' })).end(); })
            .catch(function (err) { return res.send({ fn: 'updateNotes', status: 'failure', data: err }).end(); });
    };
    UsersController.prototype.deleteUser = function (req, res) {
        var id = MongoDB_1.Database.stringToId(req.params.id);
        var username = req.params.username;
        UsersController.db.deleteRecord(UsersController.usersTable, { _id: id, username: username })
            .then(function (results) { return results ? (res.send({ fn: 'deleteUser', status: 'success' })) : (res.send({ fn: 'deleteNotes', status: 'failure', data: 'Not found' })).end(); })
            .catch(function (reason) { return res.status(500).send(reason).end(); });
    };
    UsersController.prototype.deleteNotes = function (req, res) {
        var id = MongoDB_1.Database.stringToId(req.params.id);
        var note_id = MongoDB_1.Database.stringToId(req.params.noteid);
        UsersController.db.getOneRecord(UsersController.usersTable, { _id: id })
            .then(function (results) {
            if (results.notes) {
                results.notes = results.notes.filter(function (item) { return !item.id.equals(note_id); });
                UsersController.db.updateRecord(UsersController.usersTable, { _id: id }, { $set: { notes: results.notes } })
                    .then(function (results) { return results ? (res.send({ fn: 'deleteNotes', status: 'success' })) : (res.send({ fn: 'addNotes', status: 'failure', data: 'Not found' })).end(); })
                    .catch(function (err) { return res.send({ fn: 'deleteNotes', status: 'failure', data: err }).end(); });
            }
        })
            .catch(function (reason) { return res.status(500).send(reason).end(); });
    };
    UsersController.prototype.addComments = function (req, res) {
        var id = MongoDB_1.Database.stringToId(req.params.id);
        var note_id = MongoDB_1.Database.stringToId(req.params.noteid);
        var username = req.params.username;
        var comments = req.body.comments;
        UsersController.db.getOneRecord(UsersController.usersTable, { username: username })
            .then(function (results) {
            var notes = results.notes.filter(function (item) { return item.id.equals(note_id); });
            if (notes.length == 0) {
                return res.send({ status: 'error' });
            }
            if (!notes[0].comments) {
                notes[0].comments = [];
            }
            notes[0].comments.push(comments);
            UsersController.db.updateRecord(UsersController.usersTable, { username: username }, { $set: { notes: results.notes } })
                .then(function (results) { return results ? (res.send({ fn: 'addComments', status: 'success' })) : (res.send({ fn: 'addComments', status: 'failure', data: 'Not found' })).end(); })
                .catch(function (err) { return res.send({ fn: 'addComments', status: 'failure', data: err }).end(); });
        })
            .catch(function (reason) { return res.status(500).send(reason).end(); });
    };
    UsersController.db = new MongoDB_1.Database(config_1.Config.url, "security");
    UsersController.usersTable = 'users';
    UsersController.classController = new classesController_1.ClassesController();
    return UsersController;
}());
exports.UsersController = UsersController;
//# sourceMappingURL=usersController.js.map