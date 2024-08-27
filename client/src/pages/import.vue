
<script setup>
import { ref } from "vue";
import axios from "axios";
import { store } from "../store";
const links = ref();

const qcommLinks = ref();
const mtekLinks = ref();
const wirelessLinks = ref();
const phoneLinks = ref();
const otherLinks = ref();
function handleClick() {
  console.log(links.value);
}
const results = ref();

async function submitForm() {
  try {
    // Replace with your API endpoint
    const response = await axios.post(
      "/news/scrape",
      links?.value.split("\n")
    );

    // Handle the response as needed
    console.log(response);
    response.data.forEach(element => {
        store.newsContents.push(element)
    });;
  } catch (error) {
    console.error("Error:", error);
  }
}

// const groupedByCategory = items.reduce((acc, item) => {
//   const category = item.category;

//   // If the category doesn't exist in the accumulator, create a new array for it
//   if (!acc[category]) {
//     acc[category] = [];
//   }

//   // Add the item to the appropriate category array
//   acc[category].push(item);

//   return acc;
// }, {});
/*
{
  A: [
    { id: 1, name: 'Item 1', category: 'A' },
    { id: 3, name: 'Item 3', category: 'A' }
  ],
  B: [
    { id: 2, name: 'Item 2', category: 'B' },
    { id: 5, name: 'Item 5', category: 'B' }
  ],
  C: [
    { id: 4, name: 'Item 4', category: 'C' }
  ]
}
*/

</script>
<template>
     <main class="w-full h-svh px-4 py-2">
 

 <textarea
   v-model="links"
   class="w-full h-1/2 border-2 border-red-500 rounded-xl px-4 py-2 mx-4"
   @input="
     (event) => {
       links = event.target.value;
     }
   "
 />
 <button class="btn" @click="submitForm">Search</button>
 <div class="card bg-base-100 w-full shadow-xl my-4" v-for="res in results">
   <!-- <label class="input input-bordered flex items-center gap-2">
     Title:
     <input type="text" class="grow" :placeholder="res.title" />
   </label> -->
   <div class="card-body">
     <h2 class="card-title">{{ res.title }}</h2>
     <p>{{ res.date_source_author }}</p>
     <a :href="res.link">{{ res.link }}</a>
     <p v-for="i in JSON.parse(res.content)">{{ i }}</p>
   </div>
 </div></main>
</template>
