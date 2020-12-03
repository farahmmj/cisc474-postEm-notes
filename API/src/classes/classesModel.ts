export class ClassesModel{
    class_id='';
    class='';
    notes= '';
    note_id= '';
    
    
    static fromObject(object:any):ClassesModel{
        const p:ClassesModel=new ClassesModel();
        p.class=object.classes;
        p.notes = object.notes;
        p.note_id = object.note_id;
        return p;
    }
    toObject():any{
        return {class:this.class, notes:this.notes, note_id:this.note_id};
    }
}