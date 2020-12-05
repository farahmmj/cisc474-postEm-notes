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

        

}