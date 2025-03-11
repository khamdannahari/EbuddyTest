"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = exports.db = void 0;
const app_1 = require("firebase-admin/app");
const auth_1 = require("firebase-admin/auth");
const firestore_1 = require("firebase-admin/firestore");
const firebase_functions_1 = require("firebase-functions");
const firebaseConfig = (0, firebase_functions_1.config)(); // Ambil konfigurasi dari Firebase Functions
if (!firebaseConfig.firebase ||
    !firebaseConfig.firebase.project_id ||
    !firebaseConfig.firebase.client_email ||
    !firebaseConfig.firebase.private_key) {
    throw new Error("❌ Firebase config is missing! Set it with `firebase functions:config:set`.");
}
const app = (0, app_1.initializeApp)({
    credential: (0, app_1.cert)({
        projectId: firebaseConfig.firebase.project_id,
        clientEmail: firebaseConfig.firebase.client_email,
        privateKey: firebaseConfig.firebase.private_key.replace(/\\n/g, "\n"),
    }),
    databaseURL: `https://${firebaseConfig.firebase.project_id}.firebaseio.com`,
});
const db = (0, firestore_1.getFirestore)(app);
exports.db = db;
const auth = (0, auth_1.getAuth)(app);
exports.auth = auth;
// 🛠 Firestore Emulator Setup
if (firebaseConfig.firebase.functions_emulator === "true") {
    db.settings({
        host: "localhost:8080",
        ssl: false,
    });
    console.log("🔥 Firestore Emulator Connected on localhost:8080");
}
