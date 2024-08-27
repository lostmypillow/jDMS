<script setup>
import { useRoute } from "vue-router";
import { ref, onMounted, computed } from "vue";
import { store } from "../store";
import axios from "axios";
const route = useRoute();
const results = ref([]);
const editTitle = ref();
const editDateSA = ref();
const editCat = ref();
const editContent = ref();
const editID = ref()
const editLink = ref();
const isEditing = ref(false);
const returnData = computed( ()=> {
  return {
  id: editID.value,
  title: editTitle.value,
  date_source_author: editDateSA.value,
  link: editLink.value,
  category: editCat.value,
  // content: JSON.stringify(editContent?.value.split("\n")),
}});

async function fetchData() {
  try {
    const response = await axios.get("http://localhost:3002/news/get?id="+ route.params.id);
    console.log(response)
    console.log(route.params.id)
    results.value = response.data;
    // results.value = [
    //   {
    //     title: "meowtitle",
    //     link: "http://example.com",
    //     date_source_author: "meowdate",
    //     cat: "其他業界重要訊息",
    //     content: '["apple", "banana", "cherry","apple", "banana", "cherry","apple", "banana", "cherry","apple", "banana", "cherry","apple", "banana", "cherry","apple", "banana", "cherry","apple", "banana", "cherry","apple", "banana", "cherry","apple", "banana", "cherry"]',
    //   },
    // ];
    editID.value = results.value.id
    editTitle.value = results.value.title;
    editDateSA.value = results.value.date_source_author;
    editLink.value = results.value.link;
    editCat.value = results.value.category;
    let ret = results.value.content;
    let parsedJSON = JSON.parse(results.value?.content);
    let parsedText = await parsedJSON.join("\n\n");
    editContent.value = parsedText;
    // ;
    console.log(parsedText);
  } catch (error) {}
}

async function updateData() {
  try {
    const response = await axios.post("http://localhost:3002/news/update", returnData.value);
    console.log('Update response:', results.value = response.data);
  } catch (error) {
    console.error('Error updating data:', error);
  }
  // console.log(returnData.value)
}


onMounted(async () => {
  await fetchData()
});
</script>
<template>
  <div>
    <!-- The current route is accessible as $route in the template -->
    User {{ route.params.id }}
  </div>

  <div
    class="card bg-base-100 w-full shadow-xl my-4 flex h-full"
    
  >
    <div class="card-body">
      <label class="input input-bordered flex items-center gap-2">
        Headline:
        <input @input="updateData" type="text" class="grow" v-model="editTitle" />
      </label>
      <label class="input input-bordered flex items-center gap-2">
        Date / Source / Author:
        <input @input="updateData" type="text" class="grow" v-model="editDateSA" />
      </label>
      <label class="input input-bordered flex items-center gap-2">
        Link:
        <input @input="updateData" type="text" class="grow" v-model="editLink" />
        <a :href="editLink">Go to link</a>
      </label>
      <label class="input input-bordered flex items-center gap-2 pr-0">
        Category:
        <select @change="updateData" v-model="editCat" class="select select-bordered w-full">
          <option disabled selected>Who shot first?</option>
          <option value="Qualcomm相關新聞">Qualcomm相關新聞</option>
          <option value="MediaTek相關新聞">MediaTek相關新聞</option>
          <option value="無線通訊市場">無線通訊市場</option>
          <option value="智慧型手機/消費性電子產品">
            智慧型手機/消費性電子產品
          </option>
          <option value="其他業界重要訊息">其他業界重要訊息</option>
        </select>
      </label>
      <label class="flex items-center gap-2 pl-4"> Content: </label>
      <textarea
        v-model="editContent"
        class="flex grow textarea shadow-inner rounded-xl px-4 py-2 border-2 border-blue-200 resize-none"
        @input="updateData"
      />

      <!-- <p v-for="i in JSON.parse(res.content)">{{ i }}</p> -->
    </div>
  </div>
</template>
