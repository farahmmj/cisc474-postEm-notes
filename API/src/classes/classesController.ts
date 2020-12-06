import express, { RequestHandler } from 'express';
import { ClassesModel } from './classesModel';
import {UsersModel} from '../users/usersModel';
import { Database } from '../common/MongoDB';
import { Config } from '../config';

export class ClassesController {
    static db: Database = new Database(Config.url, "security");
    static ClassesTable = 'classes';

    


    getClassByID(req: express.Request, res: express.Response) {
        const classId = req.params.classId;
        
        ClassesController.db.getRecords(ClassesController.ClassesTable, { classId: classId })
            .then((results) => res.send({ fn: 'getClassByID', status: 'success', data: results }).end())
            .catch((reason) => res.status(500).send(reason).end());
    }

    getClassByProf(req: express.Request, res: express.Response) {
        const professor = req.params.professor;
        
        ClassesController.db.getRecords(ClassesController.ClassesTable, { professor: professor })
            .then((results) => res.send({ fn: 'getClassByProf', status: 'success', data: results }).end())
            .catch((reason) => res.status(500).send(reason).end());
    }

    addClass(req: express.Request, res: express.Response) {
        let class_exist = false;
        let prof_exist = false;
        const id = Database.stringToId(req.params.id);
        const classId = req.body.classId;
        const professor = req.body.professor;
        ClassesController.db.getRecords(ClassesController.ClassesTable, { classId:classId})
        .then((results) => {
            //console.log(results.classId);
            for(let i=0; i<results.length; i++){
            if (results[i].classId === classId){
                class_exist = true;
            }
            if (results[i].classId === classId && results[i].professor === professor) {
                prof_exist = true;
            }
        }
                //results.classId=[];
                if(!class_exist || (class_exist && !prof_exist)){
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