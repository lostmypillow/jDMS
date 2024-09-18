export default defineEventHandler(async (event) => {
  const bodyContent = await readBody(event);
  //{id: id, category:cateogry}
  const oldData = await Content.findByPk(bodyContent.id);
  const oldCategory = await oldData.category;
  const oldPriority = await oldData.priority;
  let newPriorityForCategory;
  if (oldCategory != bodyContent.category) {
    newPriorityForCategory = await assignPriority(bodyContent.category);
  } else if (oldPriority != bodyContent.priority) {
    const newPriority = 3;
  }

  console.log(newPriorityForCategory);

  await Content.update(
    {
      category: bodyContent.category,
      priority:
        newPriorityForCategory != null
          ? newPriorityForCategory
          : bodyContent.priority,
    },
    {
      where: {
        id: bodyContent.id,
      },
    }
  );
  return await Content.findAll();
});
