export default async function (item) {
    const response = await $fetch("/api/change", {
        method: "POST",
        body: item,
      });
      await syncData(0);
      return;
}