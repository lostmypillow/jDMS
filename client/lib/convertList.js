export function convertList(inputArray) {
    const groupedByCategory = inputArray?.reduce((acc, article) => {
        if (!article.category) return acc;
    
        const category = article.category;
        const item = {
          id: article.id,
          title: article.title || "No Title",
          category: category,
          link: article.link,
        };
    
        if (!acc[category]) {
          acc[category] = [];
        }
    
        acc[category].push(item);
    
        return acc;
      }, {});
      return groupedByCategory
}