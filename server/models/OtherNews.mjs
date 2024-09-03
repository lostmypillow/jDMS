import { Model, DataTypes } from "sequelize";
import sequelize from "../config/database.mjs";
class OtherNews extends Model {}
OtherNews.init(
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
    modelName: "OtherNews",
  }
);

export default OtherNews