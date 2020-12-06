export class ClassesModel{
    classId='';
    professor = '';
    
    
    
    static fromObject(object:any):ClassesModel{
        const p:ClassesModel=new ClassesModel();
        p.classId = object.classId;
        p.professor = object.professor;
       
        return p;
    }
    toObject():any{
        return {classId:this.classId, professor:this.professor};
    }
}