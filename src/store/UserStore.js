export default class UserStore {
    constructor(){
        this._email = '',
        this._password = '';
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
}