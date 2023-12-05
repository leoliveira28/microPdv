<<<<<<< HEAD
=======
// import { PrismaClient } from "@prisma/client";
>>>>>>> ea167906ddab5ed2a2bb306c5713898336f4e984
import { PrismaClient } from "../generated/client";
let prisma;

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient();
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
  prisma = global.prisma;
}

export default prisma;
