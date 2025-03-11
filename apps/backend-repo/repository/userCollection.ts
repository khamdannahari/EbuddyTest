import { User } from "../../../packages/shared/entities/user";
import { db } from "../config/firebaseConfig";

export const USERS_COLLECTION = "USERS";
export const PAGE_SIZE = 10;

const getUserCollection = () => db.collection(USERS_COLLECTION);

// Sorting priority follows a mathematical ranking model:
// We can define a theoretical "score" for each user:
//
// Score = (totalAverageWeightRatings * 10^6)
//       + (numberOfRents * 10^3)
//       + (recentlyActive)
//
// Example ranking based on this formula:
// User A: (4.3 * 10^6) + (30 * 10^3) + 1738938812
// User B: (4.3 * 10^6) + (30 * 10^3) + 1738679612
// User C: (4.3 * 10^6) + (28 * 10^3) + 1738679612
//
// Since Firestore does not support computed fields in queries,
// we use multi-field sorting in descending order, ensuring that
// users are ranked correctly by importance.

export const getUsersSortedPaginated = async (lastDoc: any = null) => {
  // Firestore query with multi-field sorting:
  // 1. Sort by totalAverageWeightRatings (higher is better)
  // 2. If equal, sort by numberOfRents (higher is better)
  // 3. If still equal, sort by recentlyActive (more recent is better)
  let query = getUserCollection()
    .orderBy("totalAverageWeightRatings", "desc") // Primary sorting priority
    .orderBy("numberOfRents", "desc") // Secondary sorting priority
    .orderBy("recentlyActive", "desc") // Tertiary sorting priority
    .limit(PAGE_SIZE);

  // Pagination: Start the next query after the last document retrieved in the previous page
  if (lastDoc) {
    query = query.startAfter(
      lastDoc.totalAverageWeightRatings, // Ensures new query starts after the last ranked user
      lastDoc.numberOfRents,
      lastDoc.recentlyActive
    );
  }

  // Execute the query and retrieve the users
  const snapshot = await query.get();
  const users = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return {
    users, // List of users sorted based on defined priorities
    lastDoc: snapshot.docs[snapshot.docs.length - 1], // Save last document for pagination
    hasMore: snapshot.docs.length === PAGE_SIZE, // Check if there are more users to fetch
  };
};

export const updateUserInCollection = async (user: User) => {
  try {
    const userRef = getUserCollection().doc(user.id);

    const doc = await userRef.get();
    if (!doc.exists) {
      console.error(`User with ID ${user.id} not found.`);
      throw new Error("User document not found");
    }

    const userDataToUpdate = Object.entries(user).reduce(
      (acc, [key, value]) => {
        if (value !== undefined) acc[key] = value;
        return acc;
      },
      {} as Record<string, any>
    );

    await userRef.update(userDataToUpdate);

    return { success: true, message: "User updated successfully" };
  } catch (error: any) {
    throw new Error("Failed to update user");
  }
};

export const generateUsersInCollection = async (
  count: number
): Promise<User[]> => {
  const batch = db.batch();
  const users: User[] = [];

  console.log("Generating users in collection", count);
  const baseNames = [
    "John",
    "Jane",
    "Alex",
    "Sarah",
    "Mike",
    "Emma",
    "David",
    "Lisa",
    "James",
    "Emily",
    "Daniel",
    "Sofia",
    "Michael",
    "Olivia",
    "William",
    "Ava",
    "Thomas",
    "Isabella",
    "Robert",
    "Mia",
    "Richard",
    "Charlotte",
    "Joseph",
    "Amelia",
    "Christopher",
    "Harper",
    "Andrew",
    "Evelyn",
    "Kevin",
    "Abigail",
    "Brian",
    "Elizabeth",
    "George",
    "Sophie",
    "Edward",
    "Victoria",
    "Peter",
    "Grace",
    "Paul",
    "Zoe",
    "Mark",
    "Lily",
    "Steven",
    "Hannah",
    "Jason",
    "Natalie",
    "Ryan",
    "Lucy",
    "Eric",
    "Anna",
    "Justin",
    "Chloe",
    "Adrian",
    "Benjamin",
    "Caleb",
    "Dylan",
    "Ethan",
    "Felix",
    "Gabriel",
    "Henry",
    "Isaac",
    "Joshua",
    "Kyle",
    "Lucas",
    "Mason",
    "Nathan",
    "Oliver",
    "Patrick",
    "Quinn",
    "Samuel",
    "Theodore",
    "Vincent",
    "Wesley",
    "Xavier",
    "Zachary",
    "Adam",
    "Brandon",
    "Cameron",
    "Dominic",
    "Eleanor",
    "Faith",
    "Gabriella",
    "Hazel",
    "Iris",
    "Julia",
    "Katherine",
    "Layla",
    "Madison",
    "Nora",
    "Penelope",
    "Rachel",
    "Scarlett",
    "Taylor",
    "Uma",
    "Violet",
    "Willow",
    "Ximena",
    "Yara",
    "Zara",
    "Alice",
    "Bella",
    "Clara",
    "Diana",
    "Eva",
    "Fiona",
    "Gemma",
    "Helen",
    "Ivy",
    "Jasmine",
    "Kylie",
    "Luna",
    "Maya",
    "Nina",
    "Octavia",
    "Piper",
    "Quinn",
    "Rose",
    "Stella",
    "Thea",
    "Uma",
    "Valentina",
    "Winter",
    "Xena",
    "Yasmine",
    "Zelda",
  ];

  for (let i = 0; i < count; i++) {
    const userRef = getUserCollection().doc();
    const randomName = `${baseNames[i % baseNames.length]} ${Math.floor(
      Math.random() * 1000
    )}`;

    const userData = {
      id: userRef.id,
      name: randomName,
      totalAverageWeightRatings: parseFloat(
        (Math.random() * (5 - 1) + 1).toFixed(1)
      ),
      numberOfRents: Math.floor(Math.random() * 100),
      recentlyActive:
        Math.floor(Date.now() / 1000) - Math.floor(Math.random() * 31536000),
    };

    batch.set(userRef, userData);
    users.push(userData);
  }

  await batch.commit();
  return users;
};
