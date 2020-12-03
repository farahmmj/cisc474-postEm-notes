export class UsersModel{
    id='';
    username='';
    notes= '';
    note_id= '';
    
    
    static fromObject(object:any):UsersModel{
        const p:UsersModel=new UsersModel();
        p.username=object.username;
        p.notes = object.notes;
        p.note_id = object.note_id;
        return p;
    }
    toObject():any{
        return {username:this.username, notes:this.notes, note_id:this.note_id};
    }
}