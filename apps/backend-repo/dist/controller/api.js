"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateAndSaveRandomUsers = exports.updateUserData = exports.fetchUserData = void 0;
const userCollection_1 = require("../repository/userCollection");
const responseWrapper_1 = require("../utils/responseWrapper");
const fetchUserData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let lastDoc = null;
        if (req.query.lastDoc) {
            try {
                lastDoc = JSON.parse(req.query.lastDoc);
            }
            catch (error) {
                return res
                    .status(400)
                    .json((0, responseWrapper_1.createResponse)(false, "Invalid lastDoc format"));
            }
        }
        const paginatedData = yield (0, userCollection_1.getUsersSortedPaginated)(lastDoc);
        return res.status(200).json((0, responseWrapper_1.createResponse)(true, "Users fetched successfully", {
            users: paginatedData.users,
            lastDoc: paginatedData.lastDoc
                ? {
                    totalAverageWeightRatings: paginatedData.lastDoc.get("totalAverageWeightRatings") || 0,
                    numberOfRents: paginatedData.lastDoc.get("numberOfRents") || 0,
                    recentlyActive: paginatedData.lastDoc.get("recentlyActive") || 0,
                }
                : null,
            hasMore: paginatedData.hasMore,
        }));
    }
    catch (error) {
        return res
            .status(500)
            .json((0, responseWrapper_1.createResponse)(false, "Error fetching user data", undefined, error));
    }
});
exports.fetchUserData = fetchUserData;
const updateUserData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.body;
    try {
        const result = yield (0, userCollection_1.updateUserInCollection)(user);
        res.status(200).json((0, responseWrapper_1.createResponse)(true, result.message));
    }
    catch (error) {
        res
            .status(500)
            .json((0, responseWrapper_1.createResponse)(false, "Error updating user data", undefined, error));
    }
});
exports.updateUserData = updateUserData;
const generateAndSaveRandomUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const count = parseInt(req.query.count) || 10;
    try {
        const users = yield (0, userCollection_1.generateUsersInCollection)(count);
        res
            .status(201)
            .json((0, responseWrapper_1.createResponse)(true, `${count} random users created successfully`, users));
    }
    catch (error) {
        res
            .status(500)
            .json((0, responseWrapper_1.createResponse)(false, "Failed to create random users", undefined, error));
    }
});
exports.generateAndSaveRandomUsers = generateAndSaveRandomUsers;
