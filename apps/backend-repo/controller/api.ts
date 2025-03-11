import { Request, Response } from "express";
import {
  generateUsersInCollection,
  getUsersSortedPaginated,
  updateUserInCollection,
} from "../repository/userCollection";
import { createResponse } from "../utils/responseWrapper";
import { User } from "shared/entities/user";
import { auth } from "../config/firebaseConfig";

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json(createResponse(false, "Email and password are required"));
  }

  try {
    const user = await auth.getUserByEmail(email);
    const customToken = await auth.createCustomToken(user.uid);

    return res.status(200).json(
      createResponse(true, "Login successful", {
        customToken,
      })
    );
  } catch (error) {
    return res
      .status(401)
      .json(
        createResponse(
          false,
          "Login failed, check email/password",
          undefined,
          error
        )
      );
  }
};

export const fetchUserData = async (req: Request, res: Response) => {
  try {
    let lastDoc = null;

    if (req.query.lastDoc) {
      try {
        lastDoc = JSON.parse(req.query.lastDoc as string);
      } catch (error) {
        return res
          .status(400)
          .json(createResponse(false, "Invalid lastDoc format"));
      }
    }

    const paginatedData = await getUsersSortedPaginated(lastDoc);

    return res.status(200).json(
      createResponse(true, "Users fetched successfully", {
        users: paginatedData.users,
        lastDoc: paginatedData.lastDoc
          ? {
              totalAverageWeightRatings:
                paginatedData.lastDoc.get("totalAverageWeightRatings") || 0,
              numberOfRents: paginatedData.lastDoc.get("numberOfRents") || 0,
              recentlyActive: paginatedData.lastDoc.get("recentlyActive") || 0,
            }
          : null,
        hasMore: paginatedData.hasMore,
      })
    );
  } catch (error) {
    return res
      .status(500)
      .json(
        createResponse(false, "Error fetching user data", undefined, error)
      );
  }
};

export const updateUserData = async (req: Request, res: Response) => {
  const user = req.body;

  try {
    const result = await updateUserInCollection(user as User);

    res.status(200).json(createResponse(true, result.message));
  } catch (error) {
    res
      .status(500)
      .json(
        createResponse(false, "Error updating user data", undefined, error)
      );
  }
};

export const generateAndSaveRandomUsers = async (
  req: Request,
  res: Response
) => {
  const { count } = req.body;

  try {
    const users = await generateUsersInCollection(parseInt(count) || 10);
    res
      .status(201)
      .json(
        createResponse(
          true,
          `${count} random users created successfully`,
          users
        )
      );
  } catch (error) {
    res
      .status(500)
      .json(
        createResponse(false, "Failed to create random users", undefined, error)
      );
  }
};
