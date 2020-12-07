import express, { query, RequestHandler } from 'express';
import { UsersModel } from './usersModel';
import {ClassesController} from '../classes/classesController'
import { Database } from '../common/MongoDB';
import { Config } from '../config';
import { JsonObjectExpressionStatement } from 'typescript';




export class UsersController {
    static db: Database = new Database(Config.url, "security");
    static usersTable = 'users';



    static classController: ClassesController=new ClassesController();

    


        //Might not need it because of web token
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
    const username = req.params.username;
    const notes = req.body.notes;
    const professor = req.body.professor;
    const classId = req.body.classId;
    const data = req.body;
    console.log(data.authUser);
    let note_id
    UsersController.db.getOneRecord(UsersController.usersTable, { username:username})
            .then((results) => {
                /*if (!results.notes){
                    results.notes
                }
                
                console.log(notes);
                note_id = JSON.stringify(Database.newId())
                results.notes[note_id] = {classId:classId, professor:professor, note: notes};*/

                if (!results.notes){
                    results.notes=[];
                }
                
                results.notes.push({id: Database.newId(),note: notes, classId:classId, professor:professor});

                
            
                UsersController.classController.addClass(req,res);
                UsersController.db.updateRecord(UsersController.usersTable, { username:username }, { $set: {notes:results.notes}})
                .then((results) => results ? (res.send({ fn: 'updateNotes', status: 'success' })) : (res.send({ fn: 'addNotes', status: 'failure', data: 'Not found' })).end())
                .catch(err => res.send({ fn: 'addNotes', status: 'failure', data: err }).end());
            })
            .catch((reason) => res.status(500).send(reason).end());

        
    }


    getNote(req: express.Request, res: express.Response) {
        const username = req.params.username;
        const id = Database.stringToId(req.params.noteid);
        console.log(id)
        UsersController.db.getOneRecord(UsersController.usersTable, {username: username})
            .then((results) => {
                for(let i=0; i<results.notes.length; i++) {
                    console.log(results.notes[i].id);
                    console.log(id);
                    if(JSON.stringify(results.notes[i].id) === JSON.stringify(id)) { res.send({ fn: 'getUser', status: 'success', data: results.notes[i]}).end()} 
                }
            })
            .catch((reason) => res.status(500).send(reason).end());

    }

    getNotes(req: express.Request, res: express.Response) {
         const id = Database.stringToId(req.params.id);
         const username = req.params.username;
         const classId = req.params.classId;
         const professor = req.params.professor;
         UsersController.db.getRecords(UsersController.usersTable)
             .then((results) => {
                 var notes_list=[]
                 for(let i =0; i<results.length;i++) {
                     for(let j=0; j<results[i].notes.length;j++) {

                         var current = results[i].notes[j]
                         //console.log(JSON.stringify(current.classId)===JSON.stringify(classId) && JSON.stringify(current.professor)===JSON.stringify(professor));
                         if(JSON.stringify(current.classId)===JSON.stringify(classId) && JSON.stringify(current.professor)===JSON.stringify(professor)) {
                             notes_list.push(results[i].notes[j])
                            console.log(current)      
                         }
                     }
                 }
                 console.log(current)
                 res.send({ fn: 'getUser', status: 'success', data: notes_list }).end()
                })
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

    deleteNotes(req: express.Request, res: express.Response) {

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
    }

    addComments(req: express.Request, res: express.Response){
        const id = Database.stringToId(req.params.id);
        const note_id = Database.stringToId(req.params.noteid);
        const username = req.params.username;
        const comments = req.body.comments;

        UsersController.db.getOneRecord(UsersController.usersTable, { username:username})
        .then((results) => {
            let notes=results.notes.filter((item:any)=>item.id.equals(note_id));
            if (notes.length==0){
                return res.send({status: 'error'});
            }
            
            if (!notes[0].comments){
                notes[0].comments=[];
            }
            notes[0].comments.push(comments);
            
            UsersController.db.updateRecord(UsersController.usersTable, { username:username }, { $set: {notes: results.notes }})
            .then((results) => results ? (res.send({ fn: 'addComments', status: 'success' })) : (res.send({ fn: 'addComments', status: 'failure', data: 'Not found' })).end())
            .catch(err => res.send({ fn: 'addComments', status: 'failure', data: err }).end());
        })
        .catch((reason) => res.status(500).send(reason).end());

    }


    //Might be implemented depending on what the outcome of getting notes is...
    /*getComments(req: express.Request, res: express.Response){
        
    }*/

}