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
    priority: {
      type: DataTypes.INTEGER,  // Lower number means higher priority
      allowNull: false,
      defaultValue: 0,
    }
  },
  {

    sequelize,
    modelName: "MediaTekNews",
  }
);
MediaTekNews.addHook('beforeCreate', async (task, options) => {
  // Find the maximum priority value in the table
  const maxPriority = await MediaTekNews.max('priority');

  // Set the new task's priority to be one greater than the current maximum
  task.priority = (maxPriority !== null ? maxPriority : 0) + 1;
});
export default MediaTekNews