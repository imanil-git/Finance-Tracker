import bcrypt from "bcryptjs";

export const hashPassword = (plainPassword) => {
  return bcrypt.hashSync(plainPassword, 15);
};