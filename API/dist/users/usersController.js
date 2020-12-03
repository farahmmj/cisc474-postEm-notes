"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersController = void 0;
var usersModel_1 = require("./usersModel");
var MongoDB_1 = require("../common/MongoDB");
var config_1 = require("../config");
var UsersController = /** @class */ (function () {
    function UsersController() {
    }
    //static notesTable = 'notes';
    //getUsers
    //sends a json object with all users in the system that match :name
    /*getUsers(req: express.Request, res: express.Response) {
        const username = req.params.username;
        UsersController.db.getRecords(UsersController.usersTable, { username: username })
            .then((results) => res.send({ fn: 'getUsers', status: 'success', data: results }).end())
            .catch((reason) => res.status(500).send(reason).end());

    }*/
    UsersController.prototype.getUser = function (req, res) {
        var username = req.params.username;
        //const id = Database.stringToId(req.params.id);
        //const notes = req.params.notes;
        UsersController.db.getOneRecord(UsersController.usersTable, { username: username })
            .then(function (results) { return res.send({ fn: 'getUser', status: 'success', data: results._id }).end(); })
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
        var notes = req.body.notes;
        UsersController.db.getOneRecord(UsersController.usersTable, { _id: id })
            .then(function (results) {
            if (!results.notes) {
                results.notes = [];
            }
            results.notes.push({ id: MongoDB_1.Database.newId(), note: notes });
            UsersController.db.updateRecord(UsersController.usersTable, { _id: id }, { $set: { notes: results.notes } })
                .then(function (results) { return results ? (res.send({ fn: 'updateNotes', status: 'success' })) : (res.send({ fn: 'addNotes', status: 'failure', data: 'Not found' })).end(); })
                .catch(function (err) { return res.send({ fn: 'addNotes', status: 'failure', data: err }).end(); });
        })
            .catch(function (reason) { return res.status(500).send(reason).end(); });
        //const username = req.params.username;
    };
    /*getNotes(req: express.Request, res: express.Response) {

        const username = req.params.username;
        const notes = req.body.notes;
        //const id = Database.stringToId(req.params.id);
        UsersController.db.getOneRecord(UsersController.usersTable, { username: username, notes:notes })
            .then((results) => res.send({ fn: 'getNotes', status: 'success', data: results}).end())
            .catch((reason) => res.status(500).send(reason).end());

            UsersController.db.getRecords(UsersController.usersTable)
            .then(results => {
                //extracts just the semester
                let notes = results.map((x: any) => x.notes);
                //removes duplciates
                notes = notes.filter((value: string, index: number, array: any[]) =>
                    !array.filter((v, i) => value === v && i < index).length);
                res.send({ fn: 'getNotes', status: 'success', data: { notes: notes } })
            })
            .catch((reason) => res.status(500).send(reason).end());

    }*/
    UsersController.prototype.getNote = function (req, res) {
        var username = req.params.username;
        var id = MongoDB_1.Database.stringToId(req.params.id);
        //const notes_id = req.params.notes_id;
        UsersController.db.getOneRecord(UsersController.usersTable, { _id: id })
            .then(function (results) { return res.send({ fn: 'getUser', status: 'success', data: results }).end(); })
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
    //Ask: Can you just delete a user and leave the notes in the system?
    /*deleteUser(req: express.Request, res: express.Response) {

        const id = Database.stringToId(req.params.id);
        const username = req.params.username;
        UsersController.db.deleteRecord(UsersController.usersTable, { _id: id, username:username })
            .then((results) => results ? (res.send({ fn: 'deleteUser', status: 'success' })) : (res.send({ fn: 'deleteNotes', status: 'failure', data: 'Not found' })).end())
            .catch((reason) => res.status(500).send(reason).end());

    }*/
    //Question follow-up
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
    UsersController.db = new MongoDB_1.Database(config_1.Config.url, "users");
    UsersController.usersTable = 'users';
    return UsersController;
}());
exports.UsersController = UsersController;
//# sourceMappingURL=usersController.js.map