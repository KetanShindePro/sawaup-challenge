import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";
import { Users } from "@prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{}>
) {
  const username = JSON.parse(req.body)?.username;
  if (username) {
    const user: Users = await prisma.users.create({
      data: {
        name: username,
      },
    });

    return res.status(200).json({ user });
  }
  else{
    return res.status(400).json({ errorMessage: "malformed request!" });
  }
}
