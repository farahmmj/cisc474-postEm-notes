import express, { RequestHandler } from 'express';
import { ClassesModel } from './classesModel';
import {UsersModel} from '../users/usersModel';
import { Database } from '../common/MongoDB';
import { Config } from '../config';

export class ClassesController {
    static db: Database = new Database(Config.url, "security");
    static ClassesTable = 'classes';

    


    getClass(req: express.Request, res: express.Response) {
        const classId = req.params.class_id;
        //const id = Database.stringToId(req.params.id);
        //const notes = req.params.notes;
        ClassesController.db.getOneRecord(ClassesController.ClassesTable, { classId: classId})
            .then((results) => res.send({ fn: 'getClass', status: 'success', data: results._id}).end())
            .catch((reason) => res.status(500).send(reason).end());
    }

    addClass(req: express.Request, res: express.Response) {
        let exist = false;
        const id = Database.stringToId(req.params.id);
        const classId = req.body.classId;
        ClassesController.db.getRecords(ClassesController.ClassesTable, { classId:classId})
        .then((results) => {
            console.log(results.classId);
            for(let i=0; i<results.length; i++){
            if (results[i].classId === classId){
                exist = true;
            }
        }
                //results.classId=[];
                if(!exist){
                const use: ClassesModel = ClassesModel.fromObject(req.body);
                ClassesController.db.addRecord(ClassesController.ClassesTable, use.toObject())
                    .then((result: boolean) => res.send({ fn: 'addClass', status: 'success' }).end())
                    .catch((reason) => res.status(500).send(reason).end());

                }
            //results.notes.push({classId:classId});

           
                
            /*ClassesController.db.updateRecord(ClassesController.ClassesTable, { id:id }, { $set: {classId:results.classId }})
            .then((results) => results ? (res.send({ fn: 'updateClasses', status: 'success' })) : (res.send({ fn: 'addClasses', status: 'failure', data: 'Not found' })).end())
            .catch(err => res.send({ fn: 'addClasses', status: 'failure', data: err }).end());*/
        })
        .catch((reason) => res.status(500).send(reason).end());

         
    }




    addNote(req: express.Request, res: express.Response){
        const id = Database.stringToId(req.params.id)
        const notes = req.body.notes;
        ClassesController.db.getOneRecord(ClassesController.ClassesTable, { _id:id})
                .then((results) => {
                    if (!results.notes){
                        results.notes=[];
                    }
                    
                    results.notes.push({id: Database.newId(),note: notes});
                    
                    ClassesController.db.updateRecord(ClassesController.ClassesTable, { _id:id }, { $set: {notes:results.notes }})
                    .then((results) => results ? (res.send({ fn: 'updateNotes', status: 'success' })) : (res.send({ fn: 'addNotes', status: 'failure', data: 'Not found' })).end())
                    .catch(err => res.send({ fn: 'addNotes', status: 'failure', data: err }).end());
                })
                .catch((reason) => res.status(500).send(reason).end());
        //const username = req.params.username;
    
    
            
        }

        getNote(req: express.Request, res: express.Response) {

            const username = req.params.username;
            const id = Database.stringToId(req.params.id);
            //const notes_id = req.params.notes_id;
            ClassesController.db.getOneRecord(ClassesController.ClassesTable, {_id: id })
                .then((results) => res.send({ fn: 'getUser', status: 'success', data: results }).end())
                .catch((reason) => res.status(500).send(reason).end());
    
        }

        updateClass(req: express.Request, res: express.Response) {
            const id = Database.stringToId(req.params.id);
            const username = req.body.username;
            delete username.authUser;
            ClassesController.db.updateRecord(ClassesController.ClassesTable, { _id: id }, { $set: req.body })
                .then((results) => results ? (res.send({ fn: 'updateUser', status: 'success' })) : (res.send({ fn: 'updateUser', status: 'failure', data: 'Not found' })).end())
                .catch(err => res.send({ fn: 'updateUser', status: 'failure', data: err }).end());
    
        }
    
        updateNotes(req: express.Request, res: express.Response) {
            const id = Database.stringToId(req.params.id);
            const notes = req.body.notes;
            delete notes.authUser;
            ClassesController.db.updateRecord(ClassesController.ClassesTable, { _id:id }, { $set: req.body })
                .then((results) => results ? (res.send({ fn: 'updateNotes', status: 'success' })) : (res.send({ fn: 'updateNotes', status: 'failure', data: 'Not found' })).end())
                .catch(err => res.send({ fn: 'updateNotes', status: 'failure', data: err }).end());
    
        }

        deleteNotes(req: express.Request, res: express.Response) {

            const id = Database.stringToId(req.params.id);
            const note_id = Database.stringToId(req.params.noteid);
    
            ClassesController.db.getOneRecord(ClassesController.ClassesTable, { _id:id})
            .then((results) => {
                if (results.notes){
                    
                    results.notes=results.notes.filter((item:any) =>!item.id.equals(note_id));            
                    ClassesController.db.updateRecord(ClassesController.ClassesTable, { _id:id }, { $set: {notes:results.notes }})
                        .then((results) => results ? (res.send({ fn: 'deleteNotes', status: 'success' })) : (res.send({ fn: 'addNotes', status: 'failure', data: 'Not found' })).end())
                        .catch(err => res.send({ fn: 'deleteNotes', status: 'failure', data: err }).end());
                }
            })
            .catch((reason) => res.status(500).send(reason).end());
        }


}