export default async function (link) {
  // let response
  // let resultList1 = []
  // for (const link of links) {
  //     try {
        const response = await $fetch(link);
  //       resultList1.push({
  //           url: link,
  //           html: response,
  //         })
  //     } catch (error) {
  //       response = "error";
  //     }   

  // }
  return await response;
}
