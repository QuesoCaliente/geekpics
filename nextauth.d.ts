// nextauth.d.ts
import { DefaultSession, DefaultUser } from "next-auth";

interface Role {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  enabled: boolean;
}

interface IUser extends DefaultUser {
  /**
   * Roles del usuario
   */
  role: Role;
  /**
   * Agregar cualquier otro campo que tu manejas
   */
}

declare module "next-auth" {
  interface User extends IUser {}

  interface Session {
    user?: User;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends IUser {}
}
