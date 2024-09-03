import { Model, DataTypes } from "sequelize";
import sequelize from "../config/database.mjs";
class QualcommNews extends Model {}
QualcommNews.init(
  {
    // Model attributes are defined here
    title: {
      type: DataTypes.STRING,
    },
    date_source_author: {
      type: DataTypes.STRING,
    },
    url: {
      type: DataTypes.STRING,
    },
    content: {
      type: DataTypes.STRING,
    },
    category: {
      type: DataTypes.STRING,
    },
  },
  {

    sequelize,
    modelName: "QualcommNews",
  }
);

export default QualcommNews