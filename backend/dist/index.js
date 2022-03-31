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
require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const router = require('./router/index');
const PORT = process.env.PORT || 5000;
const app = express();
app.use(express.json());
app.use(cors());
app.use('/api', router);
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mongoose.connect(process.env.DB_URI, {
            useUnifiedTopology: true
        });
        app.listen(PORT, () => console.log(`Server has been started on port ${PORT}`));
    }
    catch (e) {
        console.log(e);
    }
});
start();
