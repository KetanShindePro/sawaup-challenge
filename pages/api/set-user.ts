// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";
import { Users } from "@prisma/client";

type Data = {
  name: string;
};

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

    console.log("new user: ", user);

    return res.status(200).json({ user });
  }

  return res.status(200).json({ });
}
