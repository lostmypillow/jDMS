<script setup>
const props = defineProps(["item"]);
const list = [
  "Qualcomm相關新聞",
  "MediaTek相關新聞",
  "無線通訊市場",
  "智慧型手機/消費性電子產品",
  "其他業界重要訊息",
];
</script>

<template>
  <div class="flex w-full h-fit">
    <v-card v-if="props.item" variant="tonal" class="px-4 w-full">
      <p class="p-4 text-xs">
        News Content No.{{ props.item.priority }}; ID No.
        {{ props.item.id }}
      </p>

      <v-text-field
        class="px-4"
        v-model="props.item.title"
        label="Title"
      ></v-text-field>
      <div class="flex flex-row">
        <v-text-field
          class="px-4"
          v-model="props.item.date_source_author"
          label="Date / Source / Author"
        ></v-text-field>
        <!-- <v-select
                    class="w-fit pl-4"
                    label="Category"
                    :items="[
                      'Qualcomm相關新聞',
                      'MediaTek相關新聞',
                      '無線通訊市場',
                      '智慧型手機/消費性電子產品',
                      '其他業界重要訊息',
                    ]"
                    v-model="props.item.category"
                    variant="underlined"
                    @update:model-value="handleEdit(item, tab)"
                  ></v-select> -->
      </div>
      <v-btn-toggle
        :items="list"
        v-model="props.item.category"
        color="primary"
        mandatory
        class="w-full mb-4 ml-4"
      >
        <v-btn v-for="i in list" :value="i">{{ i }}</v-btn>
      </v-btn-toggle>

      <div class="px-4">
        <v-text-field v-model="props.item.url" label="URL">
          <template v-slot:append-inner>
            <v-btn
              a
              variant="tonal"
              :href="props.item.url"
              target="_blank"
              rel="noopener noreferrer"
              class="lowercase underline text-blue-400"
              >Open link</v-btn
            >
          </template></v-text-field
        >
      </div>
      <!-- <p>ID: {{ item.id }}</p> -->

      <!-- <p v-html="formatAsHTML(item.content)"></p> -->

      <v-container fluid>
        <v-textarea
          label="Content"
          v-model="props.item.content"
          name="input-7-1"
          variant="filled"
          auto-grow
        ></v-textarea>
      </v-container>

      <v-card-actions>
        <v-btn
          variant="tonal"
          a
          :href="props.item.url"
          target="_blank"
          rel="noopener noreferrer"
          >Link</v-btn
        >
      </v-card-actions>
    </v-card>
  </div>
</template>
