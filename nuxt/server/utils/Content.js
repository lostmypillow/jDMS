import { Model, DataTypes } from 'sequelize';
// Adjust the path to your sequelize file

const Content = sequelize.define(
  'content',
  {
    uuid: {
      type: DataTypes.UUID,
      primaryKey: true,
    },
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
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0, // Initialize priority to 0
    },
  },
  {
    hooks: {
      async beforeCreate(content) {
        // Automatically assign priority based on the category before saving
        content.priority = await assignPriority(content.category);
      },
      async beforeBulkCreate(contents) {
        // Assign priorities for each entry in the bulk
        const categories = [...new Set(contents.map(content => content.category))];

        // Calculate priorities for each category
        const priorities = {};
        for (const category of categories) {
          priorities[category] = await assignPriority(category);
        }

        // Assign calculated priorities to each content item
        for (const content of contents) {
          content.priority = priorities[content.category]++;
        }
      },
    },
  }
);

// Function to assign priority based on category
const assignPriority = async (category) => {
  const count = await Content.count({ where: { category } });
  return count + 1;
};


// category: {
//   type: DataTypes.ENUM(
//     'Qualcomm相關新聞',
//     'MediaTek相關新聞',
//     '無線通訊市場',
//     '智慧型手機/消費性電子產品',
//     '其他業界重要訊息'
//   ),
// },
export default Content;
