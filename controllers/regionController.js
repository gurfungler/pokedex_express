const Region = require("../models/region");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

// Display alist of all REgions
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
    generation: generation,
    pokemon: allPokemon,
  });
});

// Display Region create form on GET.
exports.pokmon_create_get = (req, res, next) => {
  res.render("region_form", { title: "Make pokemon" });
};

// Handle Pokemon create on POST.
// Handle Region create GET.
//display Region delete form on get
//handle Region delete form on post
//display Region update form on get
//handle Region update form on post