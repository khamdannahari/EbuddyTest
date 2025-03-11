import { initializeApp, cert } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";

const PRIVATE_KEY =
  "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQChSerRuz0m2e86\n7z7HEeNFJAO/1UtYXntVGbrrT/m/9NVqGQk/yb7YiUFUw8JYR0of+olGfTU+LuHS\nWuFWHlnuOLb85n5ICmGCHzY8gspWmK0VjOS3Dg7oLQc63spzX+BZFHRE1ZZCAhEp\nv79SWrKPuA3zrqxEzEz4NrKA/+NG9cwIrOuf1ywoHxyWCMHpf687BR4tKYectMdC\n/Q86zivzfb2ZNHOhQ9NT7A7+jfxKOOYxV54L8OFvnMmDjFhF7twWGyqVdQ3JYjgg\n94jkoEwUy2l9WF/PpO6LtHOETL5yehDdBQzBHGLRArfIX/tuySinXokoQ2CL09wC\n/DCCAYQ3AgMBAAECggEADa6fEGahU+Pl8upruWhvjqR0+veFmjv9m2UA4chZh+ql\nlggErFgZa/YMyDuJB4MYqyjOL2AcvactefJCrlMJzvcZss98w/C5f9fU+oIf1wPB\nnxPiLRMwuYpkVB6lLu9hsTzWdiZmRjg1q4R8HujZv+5dpJ/bNkTcfKvrLZ1HcvPx\ncJbTklioLinWmZR9bndb/lhCBVnR6H7Pp/L2jNZz9cBy2oSZWKY7i3aZeRcYUWwk\nGNiqnh5+T46UTngkRACTtJd6miyDfYkJWdAzE6Tc4HjZsY28YicWIFOPpR16wRHu\nrNhyXfTmbC1XUQPRkTckYg/9m2iTq5SjhTloxa7WlQKBgQDXFSZ4dRaLbt6sJGoF\nV3wByCAAZhZQUyWp5PdFIvFRSDsP3XKzvh4KWn7HiHepS0NZuCzEa+ou1MtvZZ/2\n6BunmcF8aV5kpHOtGgWP//ltaQr6YS7bCAIdraPQ+IxPfK90rM9Rk2HS31+t3wW/\nrMNawoEpxnno/yVD4Wp0vO5VkwKBgQC/+OxqCquDj5nfvnIjpjc6tmlqmkFd0H2W\nNNnQdPhgczO7P/X5NGrevuTj1EYaPehg2BTu6Kkh/anToixxwLIiLJZ/+tAEPyGp\nLAizn0jLUMw8zshuSnUxdKdw8eD+sctEOaTbRy49GeqHB1iYT7k+//JFL4p4fHtu\nWXlUHPN9TQKBgEyibZWn6oN92nstclU66aVc4AIkXbj7F0VknrIUlDUo7lplxfPD\nPsLjoZ6IwlIgzfuOwuytosBS87VaWVfJNelOwIEKriZf7hN0XR0E0KOqNM4niGFk\nhhR7BQ51MNE1lPKWjDv9rnJLQrUZ7NtxvB1/hjQTUuaw2l9IVv0HQEhfAoGABQbL\nietFmmhEKyudaXmMsKjeEcCAPaib4Tb5DRBDAKODkz+VfTT2J2bwL1b7juxYDVEb\nGzZUV2OA8t2oNEJLZ8GrHya+E55jjz5r6+gby9cNwfnYHastbmITkE2FCqY1IFAy\nFNvERi1LisWSeEp+GzwwZ8da5NS9lqIZHy6y4XECgYEAy57oZoGQtBlYhPnYCE2B\nlmXzBozzPL5bmdbsa8qcQ0PdWizOLIEfCh2RuW9uSc9yVULQdxFd0FIWsLPgeKWO\nkJ5kKakN6Ny36kP+USFSDt9oSutv3xr+P9qzYN8XCzmyFcQFoXZN6ezeolbiTOvy\nbdt/btQH3y0bvhS0gmrrotY=\n-----END PRIVATE KEY-----\n";

const firebaseConfig = {
  projectId: "ebuddy",
  clientEmail: "firebase-adminsdk@ebuddy-iam.gserviceaccount.com",
  privateKey: PRIVATE_KEY,
  functionsEmulator: "true",
};

const dummyUser = {
  email: "kenny@gmail.com",
  password: "kenny123",
};

const app = initializeApp({
  credential: cert({
    projectId: firebaseConfig.projectId,
    clientEmail: firebaseConfig.clientEmail,
    privateKey: firebaseConfig.privateKey.replace(/\\n/g, "\n"),
  }),
  databaseURL: `https://${firebaseConfig.projectId}.firebaseio.com`,
});

const db = getFirestore(app);
const auth = getAuth(app);

if (firebaseConfig.functionsEmulator === "true") {
  db.settings({
    host: "localhost:8080",
    ssl: false,
  });

  console.log("🔥 Firestore Emulator Connected on localhost:8080");
}

auth
  .createUser(dummyUser)
  .then((userRecord) => {
    console.log("Dummy user successfully created:", userRecord.uid);
  })
  .catch((error) => {
    console.error("Error create dummy user:", error);
  });

export { db, auth };
