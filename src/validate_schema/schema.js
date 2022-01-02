import {z} from "zod";

export const email = z.string().nonempty("Email is required").max(32).email();
export const password = z.string().nonempty("Password is required").min(8, "Password need to be at least 8 characters and 16 characters max");
