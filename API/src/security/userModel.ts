import bcrypt from 'bcrypt';

//represents a user in the system
export class UserModel{
    id?='';
    email = '';
    username = '';
    notes= '';
    comments = '';
    private _password='';

    //when user password is set through here, it is stored encrypted
    set password(val:string){
        this._password=UserModel.encryptString(val);
    }
    //returns encrypted password
    get password():string{return this._password;}

    //encrypts password
    public constructor(email:string,password:string, username:string){
        this.email=email;
        this.password=password;
        this.username = username;
    }

    //does not encrypt password, expects already encrypted password
    static fromObject=(obj:any):UserModel=>{
        const mdl=new UserModel(obj.email,'',obj.username);
        mdl._password=obj.password;
        mdl.username=obj.username;
        return mdl;
    }

    //includes encrypted password
    toObject=(): any=> ({email: this.email,password: this.password, username:this.username});

    //compares unencrypted password to encrypted password
    validatePassword(password:string):boolean{
        if (this.password==='*') {return false;}
        return bcrypt.compareSync(password,this.password);
    }
    
    //encrypt a string using the bcrypt library
    static encryptString(inval:string):string{
        try {
            var salt  = bcrypt.genSaltSync(10);
            return bcrypt.hashSync(inval, salt);
        }catch (err){
            return '*';
        }
    }
}