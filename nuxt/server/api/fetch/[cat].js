export default defineEventHandler(async (event) => {
  const category = getRouterParam(event, "cat");

  return category == 0 || category == "All"
    ? await Content.findAll()
    : await Content.findAll({
        where: { category: decodeURIComponent(category) },
      });
});
