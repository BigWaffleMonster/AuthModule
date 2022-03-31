"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ProjectSchema = new mongoose_1.Schema({
    owner: { type: mongoose_1.Types.ObjectId, ref: 'User', required: true },
    members: [{ type: mongoose_1.Types.ObjectId, ref: 'User' }],
    name: { type: String, required: true, require: true },
    description: { type: String, required: true }
});
exports.default = (0, mongoose_1.model)('Project', ProjectSchema);
