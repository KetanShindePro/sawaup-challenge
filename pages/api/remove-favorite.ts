import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";
import { Favourites } from "@prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{}>
) {
  const { favoriteId } = JSON.parse(req.body);
  if (favoriteId) {
    const favourite: Favourites = await prisma.favourites.delete({
      where: {
        id: favoriteId,
      },
    });

    return res.status(200).json({ favourite });
  } else {
    return res.status(400).json({ errorMessage: "malformed request!" });
  }
}
