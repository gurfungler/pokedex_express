const Poekmon = require("../models/pokemon");
const Type = require("../models/type");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
