export function generateUser(
  id: string,
  name: string,
  address: string,
  tel: string
): UserModel {
  return { id, name, address, tel };
}
type IndexedString = {
  [index: string]: string;
};
export type UserModel = IndexedString;
