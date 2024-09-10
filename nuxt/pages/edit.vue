<script setup>
import { ref } from 'vue';
const toggle = ref("categorize");
import { store } from '~/store';
const isOrder = ref(toggle == 'order')
console.log(store.navItems)


const obj = [
  {
    "id": "320a90b7-8a0a-4ee9-9a3c-4ef691ea1f9d",
    "title": "高通公布Snapdragon 7s Gen 3平台，將能執行大型語言模型的AI下放至平價手機",
    "date_source_author": "2024-08-20 / Cool3c / Chevelle.fu",
    "url": "https://www.cool3c.com/article/222688",
    "content": "雖然AI功能已經廣泛使用在智慧手機，不過當前提到AI手機，則莫過於需要支援生成式AI功能，只是目前真正可執行生成式AI的智慧手機多為高階機種以上，但高通正開始使主流機型也能享受生成式AI，使更多用戶感受AI與生活的結合；高通宣布推出Snapdragon 7s Gen 3平台，除了增強的性能以外，還可支援如Baichuan-7B、1B級的Llama 2等大型語言模型。搭載Snapdragon 7s Gen 3的裝置預計於2024年9月問世，包括Realme、三星、Sharp、小米等都將推出採用Snapdragon 7s Gen 3的終端產品。\n\nSnapdrgaon 7s Gen 3為高通新一代中階平台，採用4nm製程，著重在為主流級手機提供生成式AI體驗；Snapdragon 7s Gen 3搭載高通全方位的AI Engine，包括Adreno GPU、Kryo CPU與Hexagon NPU，其中Hexagon NPU可支援包括INT4、INT8與INT16等精度，並具備Qualcomm Sensing Hub，可用於增強音訊與感測器。\n\nSnapdragon 7s Gen 3雖為中階平台，卻採用與高階平台相似的1+3+4核心配置，包括1個2.5GHz的Prime Core，3個2.4GHz的性能核與4個1.8GHz的節能核，搭配的Adreno GPU可提供10-bit的HDR遊戲視覺，並具備Adaptive Perf Engine 3.0、VRS Pro、Snapdragon Game Super Resolution(AFME)等功能，並支援硬體加速的H.265、VP9解碼，顯示器則支援最高FullHD+ 144Hz高更新率面板或最高4K 60Hz面板。相較前身提升20% CP性能、40% GPU性能與30% NPU性能，整體平台還獲得12%的能耗改善。\n\n在影像功能部分，Snapdragon 7s Gen 3具備3個12bit ISP，最高可支援20MP單鏡頭，與最高64MP的零延遲快門，多鏡頭則支援21MP 30fps的三鏡頭零延遲快門，或32MP+21MP零延遲雙鏡頭。錄影則可提供4K 30p短片錄製的同時進行64MP照片擷取，高速慢快門可支援1080p 120fps格式。在附加功能提供包括基於深度學習的臉部、物件辨識與追蹤對焦，還有AI多幀夜景功能，以及可支援多幀HDR、多幀降噪感光元件與功能。\n\n通訊部分，Snapdrgaon 7s Gen 3可支援包括6GHz在內的三頻Wi-Fi 6E，藍牙規格為支援LE Audio的藍牙5.4，提供包括aptX Voice、aptX Lossless、aptX Adaptive等音訊編碼；行動網路則提供2CA 2x2 MIMO的5G mmWave與4x4 MIMO的5G Sub-6GHz技術，下行最快為2.9Gbps。另外可搭配3,200MHz的LPDDR5X、2,133MHz的LPDDR4記憶體，最大容量達16GB RAM，另外具備相容PD規範的Qualcomm QC4+快充技術。",
    "category": "Qualcomm相關新聞",
    "priority": 1,
    "createdAt": "2024-09-10T08:33:02.834Z",
    "updatedAt": "2024-09-10T08:33:02.834Z"
  },
  {
    "id": "be97b029-176e-48f1-b22f-cf92e316d1fa",
    "title": "三星LPDDR4x記憶體獲高通Snapdragon Digital Chassis車載方案認證，確保可靠性與長期供應",
    "date_source_author": "2024-08-28 / Cool3c / Chevelle.fu",
    "url": "https://www.cool3c.com/article/223341",
    "content": "現在許多車載系統的平台看似與消費產品類似，不過由於車輛具備更為繁瑣的各項驗證、如寬溫、耐突波、抗干擾、可靠性等，符合車用安規的零組件要求並不遜於軍規，同時也需要更長的產品供應週期；三星宣布其車用LPDDR4X記憶體獲得高通Snapdragon Digital Chassis車載方案認證，將可提供做為Snapdragon Digital Chassis的車用娛樂與先進輔助駕駛平台搭配，並確保可靠性與長期供貨。\n\n三星的車規LPDDR4X記憶體除了具備高性能以外，也通過嚴苛的車規可靠性驗證；三星強調目前已經著手開發下一代車規的LPDDR5記憶體，預計於2024年第四季提供樣品，強調可於極端溫度條件維持9.6Gbps的傳輸性能。",
    "category": "Qualcomm相關新聞",
    "priority": 2,
    "createdAt": "2024-09-10T08:33:02.996Z",
    "updatedAt": "2024-09-10T08:33:02.996Z"
  }
]


</script>
<template>
  <div class="flex flex-col items-center justify-center w-full pt-8 h-full">
    <div class="flex flex-row gap-4 items-center justify-center">
      <p>Mode:</p>
      <v-btn-toggle divided variant="outlined" v-model="toggle" color="primary" mandatory>
        <v-btn value="categorize">Categorize</v-btn>
        <v-btn  value="order">Order</v-btn>
        <v-btn value="edit">Edit Content</v-btn>
      </v-btn-toggle>
    </div>
{{ toggle == 'order' ? "isOrder" : "not Order" }}
    <!-- <div class="flex flex-row w-full pt-8 h-full">
      <v-card v-for="nav in navCategories" class="flex items=-center justify-center w-1/5 min-h-full">
         {{nav}}
      </v-card>
    </div> -->
<div class="flex flex-row w-full pt-8 h-full items-center
">
    <v-list class="w-full" v-for="nav in navCategories">
        <v-list-subheader class="flex items-center justify-center">{{ nav }}</v-list-subheader>
        <v-list-item
          v-for="item in store.navItems.filter((x) => x.category == nav)"
          :title="item.title"
          :subtitle="item.date_source_author"
        >
          <template v-slot:prepend
            ><v-btn
              v-if="item.priority != 1 && toggle == 'order'"
              size="x-small"
              icon="mdi-arrow-up"
            ></v-btn
          ></template>
          <template v-slot:append
            ><v-btn
              v-if="
                item.priority !=
                store.navItems.filter((x) => x.category == nav).length && toggle == 'order'
              "
              size="x-small"
              icon="mdi-arrow-down"
            ></v-btn
          ></template>
        </v-list-item>
      </v-list>
      </div>
  </div>
</template>
