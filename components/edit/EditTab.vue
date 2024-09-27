<script setup>
import { store } from "~/store";
const dialog = ref(false);
const editDialog = ref(false);
const currentId = ref("");
function openEditDialog(id) {
  editDialog.value = true;
  currentId.value = id;

  console.log(store.data.find((x) => x.id == id));
}

function saveItem() {
  store.addItem({
    title: store.addTitle,
    date: store.addDate,
    source: store.addSource,
    url: store.addURL,
    author: store.addAuthor,
    category: store.addCategory,
    content: store.addContent,
  });
  store.addTitle = "";
  store.addDate = "";
  store.addURL = "";
  store.addSource = "";
  store.addAuthor = "";
  store.addCategory = "";
  store.addContent = "";
  dialog.value = false;
}
const currentCategoryyy = ref("");
function openAddDialog(cat) {
  store.addCategory = cat;
  dialog.value = true;
}

const menuvmodel = ref(null);
</script>
<template>
  <v-dialog v-model="editDialog">
    <v-card class="px-8 py-4 w-full flex flex-col gap-4" rounded="xl">
      <div class="flex flex-row w-full items-center justify-between">
        <p class="p-4 text-xl">
          News Content No {{ store.data.find((x) => x.id == currentId).id }}
        </p>
        <v-btn
          class="ms-auto font-bold"
          prepend-icon="mdi-close"
          @click="editDialog = false"
          rounded="xl"
        >
          Close
        </v-btn>
      </div>

      <v-text-field
        class="px-4"
        v-model="store.data.find((x) => x.id == currentId).title"
        label="Title"
      ></v-text-field>
      <div class="flex flex-row">
        <v-text-field
          class="px-4"
          v-model="store.data.find((x) => x.id == currentId).date"
          label="Date"
        ></v-text-field>
        <v-text-field
          class="px-4"
          v-model="store.data.find((x) => x.id == currentId).source"
          label="Source"
        ></v-text-field>
        <v-text-field
          class="px-4"
          v-model="store.data.find((x) => x.id == currentId).author"
          label="Author"
        ></v-text-field>
        <v-select
          class="w-fit pl-4"
          label="Category"
          :items="[
            'Qualcomm相關新聞',
            'MediaTek相關新聞',
            '無線通訊市場',
            '智慧型手機/消費性電子產品',
            '其他業界重要訊息',
          ]"
          v-model="store.data.find((x) => x.id == currentId).category"
          variant="underlined"
          @update:model-value="
            store.changeCategory(
              currentId,
              store.data.find((x) => x.id == currentId).category
            )
          "
        ></v-select>
      </div>

      <div class="flex flex-row px-4 gap-2">
        <v-text-field
          v-model="store.data.find((x) => x.id == currentId).url"
        ></v-text-field>
        <v-btn
          variant="tonal"
          :href="store.data.find((x) => x.id == currentId).url"
          target="_blank"
          rel="noopener noreferrer"
          icon="mdi-web"
        ></v-btn>
      </div>

      <v-textarea
        label="Content"
        v-model="store.data.find((x) => x.id == currentId).content"
        name="input-7-1"
        variant="filled"
        class="mx-4"
        auto-grow
      ></v-textarea>
    </v-card>
  </v-dialog>

  <v-dialog v-model="dialog" persistent>
    <v-card class="px-8 py-4 w-full flex flex-col gap-4" rounded="xl">
      <div class="flex flex-row w-full items-center justify-between">
        <v-btn
          prepend-icon="mdi-close"
          @click="dialog = false"
          rounded="xl"
          variant="tonal"
        >
          Cancel
        </v-btn>
        <div>Add to {{ store.addCategory }}</div>
        <edit-button-save @click="saveItem" rounded="xl" />
      </div>

      <v-text-field v-model="store.addTitle" label="title"></v-text-field>
      <div class="flex w-full flex-row gap-4">
        <v-text-field v-model="store.addDate" label="date"></v-text-field>
        <v-text-field v-model="store.addSource" label="source"></v-text-field>
        <v-text-field v-model="store.addAuthor" label="author"></v-text-field>
      </div>

      <v-text-field v-model="store.addURL" label="url"></v-text-field>
      <v-textarea
        label="Content"
        v-model="store.addContent"
        name="input-7-1"
        variant="filled"
        auto-grow
      ></v-textarea>
    </v-card>
  </v-dialog>

  <div class="flex flex-row w-full h-full p-6" v-if="store.tab == 'edit'">
    {{ menuvmodel }}
    <v-list
      class="w-1/5 border-red-500 border-2"
      v-for="i in store.navCategories"
    >
      <v-list-subheader>
        {{ i }}
      </v-list-subheader>

      <edit-button-add rounded="xl" :id="i" @click="openAddDialog(i)" />

      <v-list-item
        v-for="n in store.data.filter((x) => x.category == i)"
        rounded
        class="mb-4 px-4 py-2"
      >
        <div class="flex flex-col items-center justify-between w-full py-4">
          <p>
            {{ n.title }}
          </p>

          <div class="flex flex-row items-center justify-between gap-2 w-full">
            <edit-button-up :category="n.category" :priority="n.priority" />

            <v-btn
              size="small"
              @click="openEditDialog(n.id)"
              rounded="xl"
              icon="mdi-pencil"
            ></v-btn>
            <v-btn
              icon="mdi-arrow-down"
              size="small"
              @click="store.swapPriorities(n.category, n.priority, 'down')"
              :disabled="
                n.priority == store.data.filter((x) => x.category == i).length
              "
            >
            </v-btn>
          </div>
        </div>
      </v-list-item>
    </v-list>
  </div>
</template>
