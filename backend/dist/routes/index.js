"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const authController_1 = __importDefault(require("../controllers/authController"));
const router = (0, express_1.Router)();
router.post('/register', [
    (0, express_validator_1.check)('email', 'Invalid email').isEmail(),
    (0, express_validator_1.check)('password', 'Minimum password length - 6 characters').isLength({
        min: 6
    })
], authController_1.default.registerUser);
router.post('/login', [
    (0, express_validator_1.check)('email', 'Incorrect email').normalizeEmail().isEmail(),
    (0, express_validator_1.check)('password', 'Incorrect password').exists()
]);
module.exports = router;
