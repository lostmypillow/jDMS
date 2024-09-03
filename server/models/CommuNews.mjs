import { Model, DataTypes } from "sequelize";
import sequelize from "../config/database.mjs";
class CommuNews extends Model {}
CommuNews.init(
  {
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
    modelName: "CommuNews",
  }
);

export default CommuNews