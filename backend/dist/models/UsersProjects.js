"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const UsersProjectsShema = new mongoose_1.Schema({
    userd_id: { type: mongoose_1.Types.ObjectId, ref: 'User', required: true },
    projects_id: [{ type: mongoose_1.Types.ObjectId, ref: 'Projects' }]
});
exports.default = (0, mongoose_1.model)('UsersProjects', UsersProjectsShema);
