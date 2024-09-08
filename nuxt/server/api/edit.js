export default defineEventHandler(async (event) => {
  const bodyContent = await readBody(event);
  //{id: id, category:cateogry}
  await Content.update(
    { category: bodyContent.category },
    {
      where: {
        id: bodyContent.id,
      },
    }
  );
  return await Content.findAll();
});
