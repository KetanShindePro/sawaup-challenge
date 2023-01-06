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
  console.log("req :", username);
  const user: Users | null = await prisma.users.findUnique({
    where: {
      name: username,
    },
    include: {
      favourites: true,
    },
  });

  console.log("user: ", user);

  res.status(200).json({ user });
}
