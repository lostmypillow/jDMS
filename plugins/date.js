// plugins/date.js
export default defineNuxtPlugin(() => {
 
    const currentDate = new Date();

    const currentYear = currentDate.getFullYear().toString();
  
    const formattedDate = `${String(currentDate.getMonth() + 1).padStart(2, '0')}${String(currentDate.getDate()).padStart(2, '0')}`;
  
    // Provide these globally
    return {
      provide: {
        year: currentYear, // "2024"
        date: formattedDate, // "0924"
      },
    };
  });
  