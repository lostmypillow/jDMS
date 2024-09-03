import { Model, DataTypes } from "sequelize";
import sequelize from "../config/database.mjs";
class MediaTekNews extends Model {}
MediaTekNews.init(
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
    modelName: "MediaTekNews",
  }
);

export default MediaTekNews