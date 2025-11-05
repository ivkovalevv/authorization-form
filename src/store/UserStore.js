export default class UserStore {
    constructor(){
        this._id = null,
        this._email = ''
        this._password = '';
        this._name = '';
    }

    get id(){
        return this._id;
    }

    setId(id){
        this._id = id;
    }

    get email(){
        return this._email;
    }

    setEmail(email){
        this._email = email;
    }

    get password(){
        return this._password;
    }

    setPassword(password){
        this._password = password;
    }

    get name(){
        return this._name;
    }

    setName(name){
        this._name = name;
    }
}