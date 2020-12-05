export class UsersModel{
    id='';
    username='';
    notes= '';
    comments = '';
    
    
    
    static fromObject(object:any):UsersModel{
        const p:UsersModel=new UsersModel();
        p.username=object.username;
        p.notes = object.notes;
        p.comments = object.comments;
        
        return p;
    }
    toObject():any{
        return {username:this.username, notes:this.notes, comments:this.comments};
    }
}