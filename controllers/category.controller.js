const categoryModel = require("../models/category.model");
const articleModel = require("../models/article.model");
const { categorySchema } = require("../libraries/validation.library");
const {
  successResponse,
  errorResponse,
} = require("../libraries/response.library");

const userController = {
  getAll: async (req, res) => {
    try {
      const allCategory = await categoryModel.findAll();
      return successResponse(200, allCategory, "thi is all categories", res);
    } catch (error) {
      return errorResponse(
        500,
        error.message || "Failed to show the categories",
        res
      );
    }
  },
  create: async (req, res) => {
    try {
      const category = req.body;

      //apakah sudah login?
      if (!req.userId) throw new Error("you must login first!");

      //validasi
      const { error } = categorySchema.validate(req.body);
      if (error) {
        return errorResponse(400, error.details[0].message, res);
      }

      const newCategory = await categoryModel.create(category);
      return successResponse(
        200,
        newCategory,
        "Category add  successfully",
        res
      );
    } catch (error) {
      return errorResponse(
        500,
        error.message || "Failed to add a category",
        res
      );
    }
  },

  delete: async (req, res) => {
    try {
      const id = req.params.id;

      //are u a user
      if (!req.userId) throw new Error("you must login first!");

      //is category exist?
      const getOneCategory = await categoryModel.findOne({
        where: { id },
      });

      if (!getOneCategory) throw new Error("Category did not exist!");

      await categoryModel.destroy();
      return successResponse(200, "Category deleted", res);
    } catch (error) {
      return errorResponse(
        500,
        error.message || "cannot delete a category",
        res
      );
    }
  },

  getOneById: async (req, res) => {
    try {
      const categoryId = req.params.categoryId;

      // Mencari artikel berdasarkan categoryId
      const articlesByCategory = await articleModel.findAll({
        where: {
          categoryId: categoryId,
        },
      });

      if (!articlesByCategory.length)
        throw new Error("No articles found for this category");

      return successResponse(
        200,
        articlesByCategory,
        "Here are the articles for this category",
        res
      );
    } catch (error) {
      return errorResponse(
        500,
        error.message || "Failed to show the categories",
        res
      );
    }
  },
};

module.exports = userController;
