const Type = require("../models/type");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

//display all types
exports.type_list = asyncHandler(async (req, res, next) => {
  // const allTypes = await Type.find().sort({ name: 1 }).exec();
  // res.render("type_list", {
  //   title: "Type List",
  //   type_list: allTypes,
  // });
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
exports.type_create_get = asyncHandler(async (req, res, next) => {
  res.render("type_form", { title: "Make Type" });
});

//handle type create form on post
exports.type_create_post = [
  // Validate and sanitize fields.
  body("name")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("Name must be specified.")
    .isAlphanumeric()
    .withMessage("Name has non-alphanumeric characters."),

  // Process request after validation and sanitization.
  asyncHandler(async (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    // Create Type object
    const type = new Type({
      name: req.body.first_name,
    });

    if (!errors.isEmpty()) {
      // There are errors. Render form again with sanitized values/errors messages.
      res.render("type_form", {
        title: "Create Type",
        type: type,
        errors: errors.array(),
      });
      return;
    } else {
      // Data from form is valid.

      // Save type.
      await type.save();
      // Redirect to new type.
      res.redirect(type.url);
    }
  }),
];

//display type delete form on get
exports.type_delete_get = asyncHandler(async (req, res, next) => {
  // Get details of the region
  const [type] = await Promise.all([Type.findById(req.params.id).exec()]);

  if (type === null) {
    // No results.
    res.redirect("/pokedex/types");
  }

  res.render("type_delete", {
    title: "Delete Type",
    type: type,
  });
});

//handle type delete form on post
exports.type_delete_post = asyncHandler(async (req, res, next) => {
  // Get details of type
  const [type] = await Promise.all([Type.findById(req.params.id).exec()]);

  // Delete object and redirect to the list of type.
  await Type.findByIdAndRemove(req.body.regionid);
  res.redirect("/pokedex/types");
});

//display Type update form on get
exports.type_update_get = asyncHandler(async (req, res, next) => {
  //NOT IMPLIMENTED
});
//handle Type update form on post
exports.type_update_post = asyncHandler(async (req, res, next) => {
  //NOT IMPLIMENTED
});
