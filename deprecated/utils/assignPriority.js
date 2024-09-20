// Assign priority for a category
 const assignPriority = async (category) => {
  const count = await Content.count({ where: { category } });
  return count + 1;
};

export default assignPriority