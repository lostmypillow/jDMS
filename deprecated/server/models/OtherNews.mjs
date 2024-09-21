import { Model, DataTypes } from "sequelize";
import sequelize from "../config/database.mjs";
class OtherNews extends Model {
  static async swapPriorities(id1, id2) {
    const news1 = await OtherNews.findOne({where: {priority : id1} })
    const news2 = await OtherNews.findOne({where: {priority : id2} })
    if (!news1 || !news2) {
      throw new Error('One or both tasks not found')
    }
    if (Math.abs(news1.priority - news2.priority) !== 1) {
      throw new Error('Tasks do not have adjacent priorities');
    }

    // Swap the priorities
    if (news1.priority > news2.priority) {
      await news1.decrement('priority', { by: 1 });
      await news2.increment('priority', { by: 1 });
    } else {
      await news1.increment('priority', { by: 1 });
      await news2.decrement('priority', { by: 1 });
    }
  }
}
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
    priority: {
      type: DataTypes.INTEGER,  // Lower number means higher priority
      allowNull: false,
      defaultValue: 0,
    }
  },
  {

    sequelize,
    modelName: "OtherNews",
  }
);
OtherNews.addHook('beforeCreate', async (task, options) => {
  // Find the maximum priority value in the table
  const maxPriority = await OtherNews.max('priority');

  // Set the new task's priority to be one greater than the current maximum
  task.priority = (maxPriority !== null ? maxPriority : 0) + 1;
});
export default OtherNews