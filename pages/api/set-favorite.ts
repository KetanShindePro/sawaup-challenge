import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";
import { Favourites } from "@prisma/client";

interface UserCourseIDsI {
  userId: string;
  courseId: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{}>
) {
  const { userId, courseId }: UserCourseIDsI = JSON.parse(req.body);
  if (userId && courseId) {
    const favourite: Favourites = await prisma.favourites.create({
      data: {
        userId,
        courseId,
      },
    });

    return res.status(200).json({ favourite });
  } else {
    return res.status(400).json({ errorMessage: "malformed request!" });
  }
}
