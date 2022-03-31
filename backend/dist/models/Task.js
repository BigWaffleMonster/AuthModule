"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const TaskSchema = new mongoose_1.Schema({
    title: { type: String, required: true, unique: true },
    text: { type: String, required: true },
    staus: { type: String, required: true },
    assigne: { type: mongoose_1.Types.ObjectId, ref: 'User', required: true },
    assigned_to: { type: mongoose_1.Types.ObjectId, ref: 'User', required: true },
    deadline: { type: Date, required: true }
});
exports.default = (0, mongoose_1.model)('Task', TaskSchema);
