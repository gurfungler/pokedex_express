const Poekmon = require("../models/pokemon");
const Type = require("../models/type");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

// Display alist of all Pokemon
exports.pokemon_list = asyncHandler(async (req, res, next) => {
  const allPokemon = await Pokemon.find().sort({ number: 1 }).exec();
  res.render("pokemon_list", {
    title: "Pokemon List",
    pokemon_list: allPokemon,
  });
});

// Display detail page for a specific Pokemon.
exports.pokemon_detail = asyncHandler(async (req, res, next) => {
  // Get details of the pokemon and ?? (in parallel)
  const [pokemon, allPokemon] = await Promise.all([
    Pokemon.findById(req.params.id).exec(),
    //Book.find({ author: req.params.id }, "title summary").exec(),
  ]);

  if (pokemon === null) {
    // No results.
    const err = new Error("Pokemon not found");
    err.status = 404;
    return next(err);
  }

  res.render("pokemon_detail", {
    title: "Pokemon Detail",
    pokemon: pokemon,
    //author_books: allBooksByAuthor,
  });
});

// Display Pokemon create form on GET.
exports.pokmon_create_get = (req, res, next) => {
  res.render("pokemon_form", { title: "Make pokemon" });
};

// Handle Pokemon create on POST.
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
// Display Author delete form on GET.
exports.author_delete_get = asyncHandler(async (req, res, next) => {
  // Get details of author and all their books (in parallel)
  const [author, allBooksByAuthor] = await Promise.all([
    Author.findById(req.params.id).exec(),
    Book.find({ author: req.params.id }, "title summary").exec(),
  ]);

  if (author === null) {
    // No results.
    res.redirect("/catalog/authors");
  }

  res.render("author_delete", {
    title: "Delete Author",
    author: author,
    author_books: allBooksByAuthor,
  });
});

// Handle Author delete on POST.
exports.author_delete_post = asyncHandler(async (req, res, next) => {
  // Get details of author and all their books (in parallel)
  const [author, allBooksByAuthor] = await Promise.all([
    Author.findById(req.params.id).exec(),
    Book.find({ author: req.params.id }, "title summary").exec(),
  ]);

  if (allBooksByAuthor.length > 0) {
    // Author has books. Render in same way as for GET route.
    res.render("author_delete", {
      title: "Delete Author",
      author: author,
      author_books: allBooksByAuthor,
    });
    return;
  } else {
    // Author has no books. Delete object and redirect to the list of authors.
    await Author.findByIdAndRemove(req.body.authorid);
    res.redirect("/catalog/authors");
  }
});

// Display Author update form on GET.
exports.author_update_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Author update GET");
});

// Handle Author update on POST.
exports.author_update_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Author update POST");
});
