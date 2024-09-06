// // Retrieve all items of a given category sorted by priority
const getByPriority = async (category) => {
  return await Content.findAll({
    where: { category },
    order: [["priority", "ASC"]],
  });
};

const buttonClass = 



export default getByPriority