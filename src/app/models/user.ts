export class User {
  id: string;
  email: string;
  password: string;
  profile: {
    firstName: string;
    lastName: string;
  };
  role: string;
  resetPasswordToken: string;
  resetPasswordExpires: Date;
}
