import { hash, compare } from "bcryptjs";

export async function hassPassword(password) {
  const hashedPassword = await hash(password, 12);
  return hashedPassword;
}

export async function comparePassword(password, hashedPassword) {
  const isValid = await compare(password, hashedPassword);
  return isValid;
}
