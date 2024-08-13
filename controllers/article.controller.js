const articleModel = require("../models/article.model");
const categoryModel = require("../models/category.model");
const {
  categorySchema,
  statusArticleSchema,
} = require("../libraries/validation.library");
const {
  successResponse,
  errorResponse,
} = require("../libraries/response.library");
const { Op, Sequelize } = require("sequelize");

const articleController = {
  getAll: async (req, res) => {
    try {
      const freeArticle = await articleModel.findAll({
        where: {
          status: {
            [Op.eq]: "public",
          },
        },
      });

      const allArticles = await articleModel.findAll();

      if (!req.userId) {
        return successResponse(
          200,
          freeArticle,
          "please enjoy our free article",
          res
        );
      }

      return successResponse(
        200,
        allArticles,
        "please enjoy all our article",
        res
      );
    } catch (error) {
      return errorResponse(
        500,
        error.message || "Failed to show the articles",
        res
      );
    }
  },

  findByTitle: async (req, res) => {
    try {
      const title = req.params.title.toLowerCase();

      //searching the title
      // const dataByTitle = await articleModel.findAll({
      //   where: {
      //     title: {
      //       [Op.substring]: `${title}`,
      //     },
      //   },
      // });

      const dataByTitle = await articleModel.findAll({
        where: {
          [Op.and]: Sequelize.where(
            Sequelize.fn("LOWER", Sequelize.col("title")),
            "LIKE",
            `%${title}%`
          ),
        },
      });

      if (!dataByTitle) throw new Error("title not found");
      return successResponse(200, dataByTitle, "please enjoy our article", res);
    } catch (error) {
      return errorResponse(
        500,
        error.message || "Failed to show the articles by title",
        res
      );
    }
  },
  findByPublicity: async (req, res) => {
    try {
      const year = req.params.year;

      // Menentukan rentang tanggal untuk tahun yang diberikan
      const startDate = new Date(`${year}-01-01T00:00:00.000Z`);
      const endDate = new Date(`${year}-12-31T23:59:59.999Z`);

      // Searching by year
      const dataByPublicity = await articleModel.findAll({
        where: {
          publicity: {
            [Op.between]: [startDate, endDate],
          },
        },
      });
      console.log(dataByPublicity);

      if (!dataByPublicity.length) throw new Error("data not found");

      return successResponse(
        200,
        dataByPublicity,
        "please enjoy our article in this period",
        res
      );
    } catch (error) {
      return errorResponse(
        500,
        error.message || "Failed to show the articles by publicity",
        res
      );
    }
  },
  create: async (req, res) => {
    try {
      const { title, content, publicity, status, categoryId } = req.body;
      const userId = req.userId;

      //validasi
      const { error } = statusArticleSchema.validate(req.body);
      if (error) {
        return errorResponse(400, error.details[0].message, res);
      }
      //is a user?
      if (!userId) throw new Error("you must login first");

      //is id category exist?
      const isCategoryId = await categoryModel.findByPk(categoryId);
      if (!isCategoryId) throw new Error("Category not found");

      const newArticle = await articleModel.create({
        title,
        content,
        publicity,
        status,
        categoryId,
        userId,
      });
      return successResponse(
        200,
        newArticle,
        "congratulations, a new article has been created! ",
        res
      );
    } catch (error) {
      return errorResponse(
        500,
        error.message || "Sorry, new article could not be created successfully",
        res
      );
    }
  },
  update: async (req, res) => {
    try {
      const id = req.params.id;
      const { title, content, publicity, status, categoryId } = req.body;
      const userId = req.userId;

      //is a user?
      if (!userId) throw new Error("you must login first");

      //find article
      const articleById = await articleModel.findOne({ where: { id } });
      if (!articleById) throw new Error("article not found");

      // Hanya perbarui kolom yang ada di body
      const updatedFields = {};
      if (title !== undefined) updatedFields.title = title;
      if (content !== undefined) updatedFields.content = content;
      if (publicity !== undefined) updatedFields.publicity = publicity;
      if (status !== undefined) updatedFields.status = status;
      if (categoryId !== undefined) updatedFields.categoryId = categoryId;
      if (userId !== undefined) updatedFields.userId = userId;

      await articleModel.update(updatedFields, { where: { id } });

      const updateArticle = await updatedFields.findOne({ where: { id } });
      return successResponse(
        200,
        updateArticle,
        "congratulations, article has been updated! ",
        res
      );
    } catch (error) {
      return errorResponse(
        500,
        error.message || "Sorry, new article could not be updated",
        res
      );
    }
  },
  delete: async (req, res) => {
    try {
      const id = req.params.id;

      //is a user
      if (!req.userId) throw new Error("you must login first");

      //is id exist
      const findArticle = await articleModel.findOne({ where: { id } });
      if (!findArticle) throw new Error("article not found!");

      //erase article target
      await findArticle.destroy();

      return successResponse(
        200,
        findArticle,
        "the article has been deleted!",
        res
      );
    } catch (error) {
      return errorResponse(
        500,
        error.message || "Sorry, article could not be deleted",
        res
      );
    }
  },
};

module.exports = articleController;
