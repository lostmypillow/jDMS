<script setup>
import { store } from "~/store";
const dialog = ref(false);
const editDialog = ref(false);
const currentId = ref("");

function openEditDialog(id) {
  currentId.value = id
  // editDialog.value = true;
  console.log(store.getTitle(currentId.value))


}

</script>
<template>
  <v-dialog v-model="editDialog"">

      <v-card
        
        class="px-8 py-4 w-full flex flex-col gap-4"
        rounded="xl"
      >
        <div class="flex flex-row w-full items-center justify-between">
          <p class="p-4 text-xl">
            News Content No. {{ store.getTitle(currentId).title }}
          </p>
          <!-- <v-btn
            class="ms-auto font-bold"
            prepend-icon="mdi-close"
            @click="editDialog = false"
            rounded="xl"
            >
            Close
            </v-btn>-->
        </div>

        <!-- <v-text-field
          class="px-4"
          v-model="store.getTitle(currentId).title"
          label="Title"
        ></v-text-field>  -->
     <!-- <div class="flex flex-row">
          <v-text-field
            class="px-4"
            v-model="store.getTitle(currentId).date"
            label="Date"
          ></v-text-field>
          <v-text-field
            class="px-4"
            v-model="store.getTitle(currentId).source"
            label="Source"
          ></v-text-field>
          <v-text-field
            class="px-4"
            v-model="store.getTitle(currentId).author"
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
            v-model="store.getTitle(currentIdd).category"
            variant="underlined"
          ></v-select>
        </div> -->

       <!-- <div class="flex flex-row px-4 gap-2">
          <v-text-field
            v-model="store.getTitle(currentId).url"
          ></v-text-field>
          <v-btn
            variant="tonal"
            :href="store.getTitle(currentId).url"
            target="_blank"
            rel="noopener noreferrer"
            icon="mdi-web"
          ></v-btn>
        </div>  -->

        <!-- <v-textarea
        
          label="Content"
          v-model="store.getTitle(currentId).content"
          name="input-7-1"
          variant="filled"
          class="mx-4"
          auto-grow
        ></v-textarea>  -->

      
      </v-card>

  </v-dialog>


  <v-dialog v-model="dialog" max-width="400" persistent>
    <v-card prepend-icon="mdi-map-marker">
      <v-text-field v-model="store.addTitle" label="title"></v-text-field>
      <v-text-field v-model="store.addDate" label="date"></v-text-field>
      <v-text-field v-model="store.addSource" label="source"></v-text-field>
      <v-text-field v-model="store.addAuthor" label="author"></v-text-field>

      <template v-slot:actions>
        <v-spacer></v-spacer>

        <v-btn @click="dialog = false"> Disagree </v-btn>

        <v-btn @click="dialog = false"> Agree </v-btn>
      </template>
    </v-card>
  </v-dialog>

  <div class="flex flex-row w-full h-full p-6" v-if="store.tab == 'edit'">
    <v-list
      class="w-1/5 border-red-500 border-2"
      v-for="i in store.navCategories"
    >
      <v-list-subheader>
        {{ i }}
      </v-list-subheader>

      <v-btn @click="dialog = true" prepend-icon="mdi-plus" class="m-4"
        >Add</v-btn
      >

      <v-list-item
        v-for="n in store.data.filter((x) => x.category == i)"
        rounded
        class="mb-4 px-4 py-2"
      >
        <div class="flex flex-col items-center justify-between w-full py-4">
          <p class="hover:underline pointer-events-auto">
            {{ n.title }}
          </p>

          <div class="flex flex-row items-center justify-between gap-2 w-full">
            <v-btn
              @click="store.swapPriorities(n.category, n.priority, 'up')"
              icon="mdi-arrow-up"
              size="small"
              :disabled="n.priority == 1"
            >
            </v-btn>

            <v-btn
           @click="openEditDialog(n.id)"
              rounded="xl"
              >Edit</v-btn
            >
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
