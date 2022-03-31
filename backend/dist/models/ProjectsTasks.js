"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ProjectsTasksSchema = new mongoose_1.Schema({
    project_id: { type: mongoose_1.Types.ObjectId, ref: 'Project', required: true },
    task_id: [{ type: mongoose_1.Types.ObjectId, ref: 'Task' }]
});
exports.default = (0, mongoose_1.model)('ProjectsTasks', ProjectsTasksSchema);
