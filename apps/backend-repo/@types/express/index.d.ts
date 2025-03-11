import { Request } from "express";
import { User } from "../../../../packages/shared/entities/user";

declare module "express-serve-static-core" {
  interface Request {
    user?: User;
  }
}
