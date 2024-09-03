<script>
import { defineBasicLoader } from "unplugin-vue-router/data-loaders/basic";
import { useRoute } from "vue-router";
import { importFromStore } from "../../lib/importFromStore";
import axios from "axios";
import { syncDbToStore } from "../../lib/syncDbToStore";
const route = useRoute();
async function getData(category, id) {
  const response = await axios.get(
    "http://localhost:3002/get/" + category + "/" + id
  );
  const results = await response.data;
  console.log("http://localhost:3002/get/" + category + "/" + id);
  return results;
}
export const useUserData = defineBasicLoader(
  "/edit/[category]/[id]",
  async (to) => {
    return getData(to.params.category, to.params.id);
  }
);
</script>

<script setup>
import { useRoute } from "vue-router";
import { watch, ref, computed, onMounted } from "vue";
import { store } from "../store";
import { useRouter } from "vue-router";
import axios from "axios";
const router = useRouter();
const route = useRoute();
const { data: user, isLoading, error, reload } = useUserData();
function returnHRN(name) {
  return name == "Qualcomm相關新聞"
    ? "qualcomm"
    : (name = "MediaTek相關新聞"
        ? "mediatek"
        : (name = "無線通訊市場"
            ? "commu"
            : (name = "智慧型手機/消費性電子產品" ? "phone" : "other")));
}

//   <option value="Qualcomm相關新聞">Qualcomm相關新聞</option>
{
  /* <option value="MediaTek相關新聞">MediaTek相關新聞</option>
          <option value="無線通訊市場">無線通訊市場</option>
          <option value="智慧型手機/消費性電子產品">
            智慧型手機/消費性電子產品
          </option>
          <option value="其他業界重要訊息">其他業界重要訊息</option> */
}
async function updateField(field, data) {
  const objj = { [field]: data };
  const url =
    [field] == "category"
      ? "http://localhost:3002/update/" +
        route.params.category +
        "/" +
        route.params.id +
        "?category=" +
        returnHRN(data)
      : "http://localhost:3002/update/" +
        route.params.category +
        "/" +
        route.params.id;

  try {
    const response = await axios.post(url, objj);
    console.log(objj);
    await syncDbToStore();
  } catch (error) {
    console.log(error);
  }

  return true;
}

const computedUser = computed({
  get() {
    return user;
  },
  set(newValue) {
    updatedValue = { ...user, ...newValue };
    console.log("updated value");
  },
});
const updatedValue = ref();
</script>
<template>
  <div class="flex flex-row items-center justify-between w-full pb-4">
    <h2 class="flex-none text-xl">
      Editing {{ route.params.category.toUpperCase() }} No.
      {{ route.params.id }}
    </h2>

    <span v-if="store.isSaving" class="text-yellow-300">Saving...</span
    ><span
      v-else-if="isLoading"
      class="loading loading-spinner loading-md"
    ></span>
    <span v-else class="text-lime-500"
      >Saved at
      {{
        Intl.DateTimeFormat("en", {
          hour: "numeric",
          minute: "numeric",
          hour12: true,
        }).format(new Date())
      }}
    </span>
  </div>

  <div v-if="error">
    <p>{{ error.message }}</p>
    <button @click="reload()">Retry</button>
  </div>
  <div v-else></div>
  <!-- Preview Cards -->

  <div class="card bg-base-100 w-full shadow-xl py-4 flex h-full">
    <div class="card-body">
      <label class="input input-bordered flex items-center gap-2">
        Headline:
        <input
          @input="updateField($event.target.id, $event.target.value)"
          id="title"
          type="text"
          class="grow"
          v-model="computedUser.value.title"
        />
      </label>
      <label class="input input-bordered flex items-center gap-2">
        Date / Source / Author:
        <input
          @input="updateField($event.target.id, $event.target.value)"
          id="date_source_author"
          type="text"
          class="grow"
          v-model="computedUser.value.date_source_author"
        />
      </label>
      <label class="input input-bordered flex items-center gap-2">
        Link:
        <input
          @input="updateField($event.target.id, $event.target.value)"
          id="link"
          type="text"
          class="grow"
          v-model="computedUser.value.url"
        />
        <a
          :href="computedUser.value.url"
          target="_blank"
          rel="noopener noreferrer"
          >Go to link</a
        >
      </label>
      <label class="input input-bordered flex items-center gap-2 pr-0">
        Category:
        <select
          class="select select-bordered w-full"
          @input="updateField($event.target.id, $event.target.value)"
          id="category"
          v-model="computedUser.value.category"
        >
          <option disabled>Choose Category</option>
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
        @input="updateField($event.target.id, $event.target.value)"
        v-model="computedUser.value.content"
        id="content"
        class="flex grow textarea shadow-inner rounded-xl px-4 py-2 border-2 border-blue-200 resize-none"
      />
    </div>
  </div>
</template>
