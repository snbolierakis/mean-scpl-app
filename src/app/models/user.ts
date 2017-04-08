export class User {

constructor(
  public email: string ,
  public password: string ,
  public profile:{
    firstName: string ,
    lastName: string,
    lastLogged?: Date,
    timesLogged?: Number,
    poisCreated?:  Number,
    campaignsCreated?: Number,
    language?: string
  },
  public role?: string,
  public resetPasswordToken?: string,
  public resetPasswordExpires?: Date,
  public id?: string,
  ){ };

}
