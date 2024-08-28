<script setup>
import { useRoute } from "vue-router";
import { ref, onMounted, computed, reactive, watch, nextTick } from "vue";
import { store } from "../store";
import axios from "axios";
import { saveToStore } from "../../lib/saveToStore";

const route = useRoute();
// const results = reactive({
//   id: 1,
//   title: "meowtitle",
//   link: "http://example.com",
//   date_source_author: "meowdate",
//   category: "其他業界重要訊息",
//   content:
//     '["雖然AI功能已經廣泛使用在智慧手機，不過當前提到AI手機，則莫過於需要支援生成式AI功能，只是目前真正可執行生成式AI的智慧手機多為高階機種以上，但高通正開始使主流機型也能享受生成式AI，使更多用戶感受AI與生活的結合；高通宣布推出Snapdragon 7s Gen 3平台，除了增強的性能以外，還可支援如Baichuan-7B、1B級的Llama 2等大型語言模型。搭載Snapdragon 7s Gen 3的裝置預計於2024年9月問世，包括Realme、三星、Sharp、小米等都將推出採用Snapdragon 7s Gen 3的終端產品。","Snapdrgaon 7s Gen 3為高通新一代中階平台，採用4nm製程，著重在為主流級手機提供生成式AI體驗；Snapdragon 7s Gen 3搭載高通全方位的AI Engine，包括Adreno GPU、Kryo CPU與Hexagon NPU，其中Hexagon NPU可支援包括INT4、INT8與INT16等精度，並具備Qualcomm Sensing Hub，可用於增強音訊與感測器。","Snapdragon 7s Gen 3雖為中階平台，卻採用與高階平台相似的1+3+4核心配置，包括1個2.5GHz的Prime Core，3個2.4GHz的性能核與4個1.8GHz的節能核，搭配的Adreno GPU可提供10-bit的HDR遊戲視覺，並具備Adaptive Perf Engine 3.0、VRS Pro、Snapdragon Game Super Resolution(AFME)等功能，並支援硬體加速的H.265、VP9解碼，顯示器則支援最高FullHD+ 144Hz高更新率面板或最高4K 60Hz面板。相較前身提升20% CP性能、40% GPU性能與30% NPU性能，整體平台還獲得12%的能耗改善。","在影像功能部分，Snapdragon 7s Gen 3具備3個12bit ISP，最高可支援20MP單鏡頭，與最高64MP的零延遲快門，多鏡頭則支援21MP 30fps的三鏡頭零延遲快門，或32MP+21MP零延遲雙鏡頭。錄影則可提供4K 30p短片錄製的同時進行64MP照片擷取，高速慢快門可支援1080p 120fps格式。在附加功能提供包括基於深度學習的臉部、物件辨識與追蹤對焦，還有AI多幀夜景功能，以及可支援多幀HDR、多幀降噪感光元件與功能。","通訊部分，Snapdrgaon 7s Gen 3可支援包括6GHz在內的三頻Wi-Fi 6E，藍牙規格為支援LE Audio的藍牙5.4，提供包括aptX Voice、aptX Lossless、aptX Adaptive等音訊編碼；行動網路則提供2CA 2x2 MIMO的5G mmWave與4x4 MIMO的5G Sub-6GHz技術，下行最快為2.9Gbps。另外可搭配3,200MHz的LPDDR5X、2,133MHz的LPDDR4記憶體，最大容量達16GB RAM，另外具備相容PD規範的Qualcomm QC4+快充技術。"]',
// });

// const objToUpdate = store.newsContents.find(item => item.id === route.params.id);

// const returnData = computed(() => {
//   return {
//     id: editID.value,
//     title: editTitle.value,
//     date_source_author: editDateSA.value,
//     link: editLink.value,
//     category: editCat.value,
//     // content: JSON.stringify(editContent?.value.split("\n")),
//   };
// });
// const results = await saveToStore("getOne", 1)
// async function fetchData() {
//   // results.value = await syncToNormal("fetchOne", route.params.id);
//   let r = {
//     title: "meowtitle",
//     link: "http://example.com",
//     date_source_author: "meowdate",
//     category: "其他業界重要訊息",
//     content:
//       '["雖然AI功能已經廣泛使用在智慧手機，不過當前提到AI手機，則莫過於需要支援生成式AI功能，只是目前真正可執行生成式AI的智慧手機多為高階機種以上，但高通正開始使主流機型也能享受生成式AI，使更多用戶感受AI與生活的結合；高通宣布推出Snapdragon 7s Gen 3平台，除了增強的性能以外，還可支援如Baichuan-7B、1B級的Llama 2等大型語言模型。搭載Snapdragon 7s Gen 3的裝置預計於2024年9月問世，包括Realme、三星、Sharp、小米等都將推出採用Snapdragon 7s Gen 3的終端產品。","Snapdrgaon 7s Gen 3為高通新一代中階平台，採用4nm製程，著重在為主流級手機提供生成式AI體驗；Snapdragon 7s Gen 3搭載高通全方位的AI Engine，包括Adreno GPU、Kryo CPU與Hexagon NPU，其中Hexagon NPU可支援包括INT4、INT8與INT16等精度，並具備Qualcomm Sensing Hub，可用於增強音訊與感測器。","Snapdragon 7s Gen 3雖為中階平台，卻採用與高階平台相似的1+3+4核心配置，包括1個2.5GHz的Prime Core，3個2.4GHz的性能核與4個1.8GHz的節能核，搭配的Adreno GPU可提供10-bit的HDR遊戲視覺，並具備Adaptive Perf Engine 3.0、VRS Pro、Snapdragon Game Super Resolution(AFME)等功能，並支援硬體加速的H.265、VP9解碼，顯示器則支援最高FullHD+ 144Hz高更新率面板或最高4K 60Hz面板。相較前身提升20% CP性能、40% GPU性能與30% NPU性能，整體平台還獲得12%的能耗改善。","在影像功能部分，Snapdragon 7s Gen 3具備3個12bit ISP，最高可支援20MP單鏡頭，與最高64MP的零延遲快門，多鏡頭則支援21MP 30fps的三鏡頭零延遲快門，或32MP+21MP零延遲雙鏡頭。錄影則可提供4K 30p短片錄製的同時進行64MP照片擷取，高速慢快門可支援1080p 120fps格式。在附加功能提供包括基於深度學習的臉部、物件辨識與追蹤對焦，還有AI多幀夜景功能，以及可支援多幀HDR、多幀降噪感光元件與功能。","通訊部分，Snapdrgaon 7s Gen 3可支援包括6GHz在內的三頻Wi-Fi 6E，藍牙規格為支援LE Audio的藍牙5.4，提供包括aptX Voice、aptX Lossless、aptX Adaptive等音訊編碼；行動網路則提供2CA 2x2 MIMO的5G mmWave與4x4 MIMO的5G Sub-6GHz技術，下行最快為2.9Gbps。另外可搭配3,200MHz的LPDDR5X、2,133MHz的LPDDR4記憶體，最大容量達16GB RAM，另外具備相容PD規範的Qualcomm QC4+快充技術。"]',
//   };
// }
// const editTitle = await results.title

// const editDateSA = computed({
//   get() {
//     return results?.date_source_author;
//   },
//   set(newValue) {
//     results.date_source_author = newValue;
//   },
// });

// const editLink = computed({
//   get() {
//     return results?.link;
//   },
//   set(newValue) {
//     results.link = newValue;
//   },
// });
// const editCategory = computed({
//   get() {
//     return results?.category;
//   },
//   set(newValue) {
//     results.category = newValue;
//   },
// });
// const editContent = computed({
//   get() {
//     return JSON.parse(results?.content).join("\n\n");
//   },
//   set(newValue) {
//     results.content = newValue;
//   },
// });



// watch(results, async (newResults) => {
//   // await saveToStore(newResults);
//   console.log(newResults, route.params.id)
// });
console.log(store.newsContents)
const allContent  = store.newsContents[0]
const results = ref(allContent)
const editTitle = computed({
  get() {
    return results.title;
  },
  set(newValue) {
    results.title = newValue;
  },
});
</script>
<template>
  <h2>
    Editing News Content No.{{ route.params.id }}
  </h2>

  <div class="card bg-base-100 w-full shadow-xl my-4 flex h-full">
    <div class="card-body">
   <span>{{ results }}</span>
      <label class="input input-bordered flex items-center gap-2">
        Headline:
        <input type="text" class="grow" v-model="editTitle" />
      </label>
      <!-- <label class="input input-bordered flex items-center gap-2">
        Date / Source / Author:
        <input type="text" class="grow" v-model="editDateSA" />
      </label>
      <label class="input input-bordered flex items-center gap-2">
        Link:
        <input type="text" class="grow" v-model="editLink" />
        <a :href="editLink">Go to link</a>
      </label>
      <label class="input input-bordered flex items-center gap-2 pr-0">
        Category:
        <select v-model="editCategory" class="select select-bordered w-full">
          <option disabled>Who shot first?</option>
          <option value="Qualcomm相關新聞">Qualcomm相關新聞</option>
          <option value="MediaTek相關新聞">MediaTek相關新聞</option>
          <option value="無線通訊市場">無線通訊市場</option>
          <option value="智慧型手機/消費性電子產品">
            智慧型手機/消費性電子產品
          </option>
          <option value="其他業界重要訊息">其他業界重要訊息</option>
        </select>
      </label>
      <label class="flex items-center gap-2 pl-4"> Content: </label> -->
      <!-- <textarea
        v-model="editContent"
        class="flex grow textarea shadow-inner rounded-xl px-4 py-2 border-2 border-blue-200 resize-none"
      /> -->

  
    </div>
  </div>
</template>
