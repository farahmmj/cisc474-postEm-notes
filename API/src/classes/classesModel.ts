export class ClassesModel{
    classId='';
    
    
    
    static fromObject(object:any):ClassesModel{
        const p:ClassesModel=new ClassesModel();
        p.classId = object.classId;
       
        return p;
    }
    toObject():any{
        return {classId:this.classId};
    }
}