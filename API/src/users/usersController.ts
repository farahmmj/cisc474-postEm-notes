import express, { RequestHandler } from 'express';
import { UsersModel } from './usersModel';
import { Database } from '../common/MongoDB';
import { Config } from '../config';

export class UsersController {
    static db: Database = new Database(Config.url, "security");
    static usersTable = 'users';
    



    getUser(req: express.Request, res: express.Response) {
        const username = req.params.username;
        //const id = Database.stringToId(req.params.id);
        //const notes = req.params.notes;
        UsersController.db.getOneRecord(UsersController.usersTable, { username: username})
            .then((results) => res.send({ fn: 'getUser', status: 'success', data: results._id}).end())
            .catch((reason) => res.status(500).send(reason).end());
    }

    addUser(req: express.Request, res: express.Response) {
        
        const use: UsersModel = UsersModel.fromObject(req.body);
        UsersController.db.addRecord(UsersController.usersTable, use.toObject())
            .then((result: boolean) => res.send({ fn: 'addUser', status: 'success' }).end())
            .catch((reason) => res.status(500).send(reason).end());
    }

   addNote(req: express.Request, res: express.Response){
    const id = Database.stringToId(req.params.id)
    const notes = req.body.notes;
    UsersController.db.getOneRecord(UsersController.usersTable, { _id:id})
            .then((results) => {
                if (!results.notes){
                    results.notes=[];
                }
                
                results.notes.push({id: Database.newId(),note: notes});
                
                UsersController.db.updateRecord(UsersController.usersTable, { _id:id }, { $set: {notes:results.notes }})
                .then((results) => results ? (res.send({ fn: 'updateNotes', status: 'success' })) : (res.send({ fn: 'addNotes', status: 'failure', data: 'Not found' })).end())
                .catch(err => res.send({ fn: 'addNotes', status: 'failure', data: err }).end());
            })
            .catch((reason) => res.status(500).send(reason).end());

        
    }


    getNote(req: express.Request, res: express.Response) {

       // const username = req.params.username;
        const id = Database.stringToId(req.params.id);
        //const notes_id = req.params.notes_id;
        UsersController.db.getOneRecord(UsersController.usersTable, {_id: id })
            .then((results) => res.send({ fn: 'getUser', status: 'success', data: results }).end())
            .catch((reason) => res.status(500).send(reason).end());

    }

    updateUser(req: express.Request, res: express.Response) {
        const id = Database.stringToId(req.params.id);
        const username = req.body.username;
        delete username.authUser;
        UsersController.db.updateRecord(UsersController.usersTable, { _id: id }, { $set: req.body })
            .then((results) => results ? (res.send({ fn: 'updateUser', status: 'success' })) : (res.send({ fn: 'updateUser', status: 'failure', data: 'Not found' })).end())
            .catch(err => res.send({ fn: 'updateUser', status: 'failure', data: err }).end());

    }

    updateNotes(req: express.Request, res: express.Response) {
        const id = Database.stringToId(req.params.id);
        const notes = req.body.notes;
        delete notes.authUser;
        UsersController.db.updateRecord(UsersController.usersTable, { _id:id }, { $set: req.body })
            .then((results) => results ? (res.send({ fn: 'updateNotes', status: 'success' })) : (res.send({ fn: 'updateNotes', status: 'failure', data: 'Not found' })).end())
            .catch(err => res.send({ fn: 'updateNotes', status: 'failure', data: err }).end());

    }

    
    deleteUser(req: express.Request, res: express.Response) {

        const id = Database.stringToId(req.params.id);
        const username = req.params.username;
        UsersController.db.deleteRecord(UsersController.usersTable, { _id: id, username:username })
            .then((results) => results ? (res.send({ fn: 'deleteUser', status: 'success' })) : (res.send({ fn: 'deleteNotes', status: 'failure', data: 'Not found' })).end())
            .catch((reason) => res.status(500).send(reason).end());

    }

    /*deleteNotes(req: express.Request, res: express.Response) {

        const id = Database.stringToId(req.params.id);
        const note_id = Database.stringToId(req.params.noteid);

        UsersController.db.getOneRecord(UsersController.usersTable, { _id:id})
        .then((results) => {
            if (results.notes){
                
                results.notes=results.notes.filter((item:any) =>!item.id.equals(note_id));            
                UsersController.db.updateRecord(UsersController.usersTable, { _id:id }, { $set: {notes:results.notes }})
                    .then((results) => results ? (res.send({ fn: 'deleteNotes', status: 'success' })) : (res.send({ fn: 'addNotes', status: 'failure', data: 'Not found' })).end())
                    .catch(err => res.send({ fn: 'deleteNotes', status: 'failure', data: err }).end());
            }
        })
        .catch((reason) => res.status(500).send(reason).end());
    }*/

    addComments(req: express.Request, res: express.Response){
        const id = Database.stringToId(req.params.id);
        const note_id = Database.stringToId(req.params.noteid);
        const comments = req.body.comments;

        UsersController.db.getOneRecord(UsersController.usersTable, { _id:id})
        .then((results) => {
            let notes=results.notes.filter((item:any)=>item.id.equals(note_id));
            if (notes.length==0){
                return res.send({status: 'error'});
            }
            
            if (!notes[0].comments){
                notes[0].comments=[];
            }
            notes[0].comments.push(comments);
            
            UsersController.db.updateRecord(UsersController.usersTable, { _id:id }, { $set: {notes: results.notes }})
            .then((results) => results ? (res.send({ fn: 'addComments', status: 'success' })) : (res.send({ fn: 'addComments', status: 'failure', data: 'Not found' })).end())
            .catch(err => res.send({ fn: 'addComments', status: 'failure', data: err }).end());
        })
        .catch((reason) => res.status(500).send(reason).end());

    }


    //Might be implemented depending on what the outcome of getting notes is...
    getComments(req: express.Request, res: express.Response){
        
    }

}