import { Op } from "sequelize";
export default defineEventHandler(async (event) => {
  //{element: item, direction: "down"}
  const bodyContent = await readBody(event);
  const inputElement = bodyContent.element;
  const direction = bodyContent.direction;
  console.log("inputElement", inputElement);
  console.log("direction", direction);
  try {
    const prevPriority = inputElement.priority - 1;
    const nextPriority = inputElement.priority + 1;
    const changeElement =
      direction == "down"
        ? await Content.findOne({
            where: {
              [Op.and]: [
                { category: inputElement.category },
                { priority: nextPriority },
              ],
            },
          })
        : await Content.findOne({
            where: {
              [Op.and]: [
                { category: inputElement.category },
                { priority: prevPriority },
              ],
            },
          });
    const currentElement = await Content.findByPk(inputElement.id);

    if (!changeElement) {
      throw new Error("One or both tasks not found");
    }

    // Swap the priorities
    if (bodyContent.direction == "down") {
      await currentElement.increment("priority", { by: 1 });
      await changeElement.decrement("priority", { by: 1 });
    } else {
      await currentElement.decrement("priority", { by: 1 });
      await changeElement.increment("priority", { by: 1 });
    }
  } catch (error) {
    console.log(error);
  }

  return {
    hello: "world",
  };
});
