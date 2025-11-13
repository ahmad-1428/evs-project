import bcrypt from "bcryptjs";
const users = [
  {
    name: "Ahmed Nadeem",
    email: "na901437@gmail.com",
    password: bcrypt.hashSync("14Ramadan1428AH", 10),
    isAdmin: true,
  },
];
export default users;
