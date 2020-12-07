interface Note {
    classId: string,
    professor: string,
    note: string    
}

export class UsersModel{
    id='';
    username='';
    notes='';
    comments = '';
    classId = '';
    
    //Implementing the professor search
    professor = '';
    
    
    
    static fromObject(object:any):UsersModel{
        const p:UsersModel=new UsersModel();
        p.username=object.username;
        p.notes = object.notes;
        p.comments = object.comments;
        p.classId = object.classId;
        p.professor = object.professor;
        
        return p;
    }
    toObject():any{
        return {username:this.username, notes:this.notes, comments:this.comments, classId:this.classId, 
        professor: this.professor};
    }
}