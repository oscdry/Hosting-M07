export default interface User {
    email: string;
    password: string;
    createdAt?: Date;
    myCities: string[]; // Array de IDs de ciudades
  }