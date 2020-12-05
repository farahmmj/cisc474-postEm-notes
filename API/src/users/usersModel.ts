export class UsersModel{
    id='';
    username='';
    notes= '';
    comments = '';
    classId = '';
    
    
    
    static fromObject(object:any):UsersModel{
        const p:UsersModel=new UsersModel();
        p.username=object.username;
        p.notes = object.notes;
        p.comments = object.comments;
        p.classId = object.classId;
        
        return p;
    }
    toObject():any{
        return {username:this.username, notes:this.notes, comments:this.comments, classId:this.classId};
    }
}