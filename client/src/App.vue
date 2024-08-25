<template>
  <main class="w-svw h-svh px-4 py-2">
    <div class="navbar bg-base-100">
      <a class="btn btn-ghost text-xl">daisyUI</a>
    </div>

    <textarea
      v-model="links"
      class="w-full h-full border-2 border-red-500 rounded-xl"
      @input="
        (event) => {
          links = event.target.value;
        }
      "
    />
    <button class="btn" @click="submitForm">Search</button>
    <div class="card bg-base-100 w-full shadow-xl my-4" v-for="res in results">
      <div class="card-body">
        <h2 class="card-title">{{ res.title }}</h2>
        <p>{{ res.date_source_author }}</p>
        <a :href="res.link">{{ res.link }}</a>
        <p v-for="i in JSON.parse(res.content)">{{ i }}</p>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";
const links = ref();
function handleClick() {
  console.log(links.value);
}
const results = ref();

async function submitForm() {
  try {
    // Replace with your API endpoint
    const response = await axios.post(
      "http://localhost:3000/news/scrape",
      links.value.split("\n")
    );

    // Handle the response as needed
    console.log(response);
    results.value = response.data;
  } catch (error) {
    console.error("Error:", error);
  }
}
const items = ref([
  {
    label: "Company",
    root: true,
    items: [
      [
        {
          items: [
            {
              label: "Features",
              icon: "pi pi-list",
              subtext: "Subtext of item",
            },
            {
              label: "Customers",
              icon: "pi pi-users",
              subtext: "Subtext of item",
            },
            {
              label: "Case Studies",
              icon: "pi pi-file",
              subtext: "Subtext of item",
            },
          ],
        },
      ],
      [
        {
          items: [
            {
              label: "Solutions",
              icon: "pi pi-shield",
              subtext: "Subtext of item",
            },
            {
              label: "Faq",
              icon: "pi pi-question",
              subtext: "Subtext of item",
            },
            {
              label: "Library",
              icon: "pi pi-search",
              subtext: "Subtext of item",
            },
          ],
        },
      ],
      [
        {
          items: [
            {
              label: "Community",
              icon: "pi pi-comments",
              subtext: "Subtext of item",
            },
            {
              label: "Rewards",
              icon: "pi pi-star",
              subtext: "Subtext of item",
            },
            {
              label: "Investors",
              icon: "pi pi-globe",
              subtext: "Subtext of item",
            },
          ],
        },
      ],
      [
        {
          items: [
            {
              image:
                "https://primefaces.org/cdn/primevue/images/uikit/uikit-system.png",
              label: "GET STARTED",
              subtext: "Build spectacular apps in no time.",
            },
          ],
        },
      ],
    ],
  },
  {
    label: "Resources",
    root: true,
  },
  {
    label: "Contact",
    root: true,
  },
]);
</script>
