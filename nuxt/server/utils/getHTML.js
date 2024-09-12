export default async function (links) {
  let response
  let resultList1
  for (const link of links) {
      try {
        response = await $fetch(link);
      } catch (error) {
        response = "error";
      } finally {
        if (response != "error") {
          resultList1.push({
            url: link,
            html: response,
          });
        }
      }
      

  }
  return resultList1;
}
