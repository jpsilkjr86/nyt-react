// Require mongoose
var mongoose = require("mongoose");
// Create Schema class
var Schema = mongoose.Schema;

// Create Article schema
var ArticleSchema = new Schema({
  headline: { type: String, required: true },
  link: { type: String, required: true, unique: true },
  summary: String,
  date: String,
  byline: String,
  saved: { type: Boolean, default: false }
});

// Create the Article model with the ArticleSchema
var Article = mongoose.model("Article", ArticleSchema);

// Export the model
module.exports = Article;