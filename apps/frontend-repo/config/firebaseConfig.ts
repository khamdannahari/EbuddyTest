import { initializeApp } from "firebase/app";
import { getAuth, connectAuthEmulator } from "firebase/auth";

const firebaseConfig = {
  apiKey: "fake-api-key",
  authDomain: "fake-auth-domain",
  projectId: "demo-project",
  appId: "fake-app-id",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

if (typeof window !== "undefined" && window.location.hostname === "localhost") {
  connectAuthEmulator(auth, "http://localhost:9099");
}

export { auth };
