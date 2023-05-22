const Region = require("../models/region");
const Pokemon = require("../models/pokemon");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

// Display alist of all Regions
exports.region_list = asyncHandler(async (req, res, next) => {
  const allRegions = await Region.find().sort({ name: 1 }).exec();
  res.render("region_list", {
    title: "Region List",
    region_list: allRegions,
  });
});

// Display detail page for a specific reigon.
exports.region_detail = asyncHandler(async (req, res, next) => {
  // Get details of the region and it;s pokemon(in parallel)
  const [region, allPokemon] = await Promise.all([
    Region.findById(req.params.id).exec(),
    Pokemon.find({ region: req.params.id }, "name").exec(),
  ]);

  if (region === null) {
    // No results.
    const err = new Error("Region not found");
    err.status = 404;
    return next(err);
  }

  res.render("region_detail", {
    title: "Region Detail",
    region: region,
    pokemon: allPokemon,
  });
});

// Display Region create form on GET.
exports.region_create_get = asyncHandler(async (req, res, next) => {
  res.render("region_form", { title: "Make region" });
});

// Handle Region create on POST.
exports.region_create_post = [
  // Validate and sanitize fields.
  body("name")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("Name must be specified.")
    .isAlphanumeric()
    .withMessage("Name has non-alphanumeric characters."),
  body("generation", "Invalid number").isInt(),

  // Process request after validation and sanitization.
  asyncHandler(async (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    // Create Region object with escaped and trimmed data
    const region = new Region({
      name: req.body.name,
      generation: req.body.generation,
    });

    if (!errors.isEmpty()) {
      // There are errors. Render form again with sanitized values/errors messages.
      res.render("region_form", {
        title: "Create Region",
        region: region,
        errors: errors.array(),
      });
      return;
    } else {
      // Data from form is valid.

      // Save region.
      await region.save();
      // Redirect to new region.
      res.redirect(region.url);
    }
  }),
];

//display Region delete form on get
exports.region_delete_get = asyncHandler(async (req, res, next) => {
  // Get details of the region
  const [region] = await Promise.all([Region.findById(req.params.id).exec()]);

  if (region === null) {
    // No results.
    res.redirect("/pokedex/regions");
  }

  res.render("region_delete", {
    title: "Delete Region",
    region: region,
  });
});

//handle Region delete form on post
exports.region_delete_post = asyncHandler(async (req, res, next) => {
  // Get details of region
  const [region] = await Promise.all([Region.findById(req.params.id).exec()]);

  // Delete object and redirect to the list of region.
  await Region.findByIdAndRemove(req.body.regionid);
  res.redirect("/pokedex/regions");
});

//display Region update form on get
exports.region_update_get = asyncHandler(async (req, res, next) => {
  //NOT IMPLIMENTED
});
//handle Region update form on post
exports.region_update_post = asyncHandler(async (req, res, next) => {
  //NOT IMPLIMENTED
});
