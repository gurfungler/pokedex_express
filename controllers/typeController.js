const Type = require("../models/type");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

//display all types
exports.type_list = asyncHandler(async (req, res, next) => {
  const allTypes = await Type.find().sort({ name: 1 }).exec();
  res.render("type_list", {
    title: "Type List",
    type_list: allTypes,
  });
});

//display details for a specific type
exports.type_detail = asyncHandler(async (req, res, next) => {
  // Get details of the pokemon and ?? (in parallel)
  const [type, allTypes] = await Promise.all([
    Type.findById(req.params.id).exec(),
  ]);

  if (type === null) {
    // No results.
    const err = new Error("Type not found");
    err.status = 404;
    return next(err);
  }

  res.render("type_detail", {
    title: "Type Detail",
    type: type,
  });
});

//display type create form on get
exports.pokmon_create_get = (req, res, next) => {
  res.render("pokemon_form", { title: "Make pokemon" });
};

//handle type create form on post
exports.pokemon_create_post = [
  // Validate and sanitize fields.
  body("name")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("Name must be specified.")
    .isAlphanumeric()
    .withMessage("Name has non-alphanumeric characters."),
  body("number", "Invalid number")
    .optional({ checkFalsy: true })
    .isISO8601()
    .toDate(),
  body("description", "Description must not be empty")
    .trim()
    .isLength({ min: 1 })
    .escape(),

  // Process request after validation and sanitization.
  asyncHandler(async (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    // Create Pokemon object with escaped and trimmed data
    const pokemon = new Pokemon({
      name: req.body.first_name,
      description: req.body.family_name,
    });

    if (!errors.isEmpty()) {
      // There are errors. Render form again with sanitized values/errors messages.
      res.render("pokemon_form", {
        title: "Create Pokemon",
        pokemon: pokemon,
        errors: errors.array(),
      });
      return;
    } else {
      // Data from form is valid.

      // Save pokemon.
      await pokemon.save();
      // Redirect to new pokemon entry.
      res.redirect(pokemon.url);
    }
  }),
];

//display type delete form on get
//handle type delete form on post
//display type update form on get
//handle type update form on post
