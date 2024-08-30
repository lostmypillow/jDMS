<script setup>
import { RouterView, useRoute, useRouter } from "vue-router";
import { store } from "./store";
import { computed, onMounted, ref } from "vue";
import ImportLinksBtn from "./components/ImportLinksBtn.vue";
const router = useRouter();
const route = useRoute();
import Sidebar from "./components/Sidebar.vue";
import HomeBtn from "./components/HomeBtn.vue";
import MobileNavBar from "./components/MobileNavBar.vue";
import DrawerOverlay from "./components/DrawerOverlay.vue";
import DrawerContent from "./components/DrawerContent.vue";
import DrawerToggle from "./components/DrawerToggle.vue";
import Drawer from "./components/Drawer.vue";
import { syncDbToStore } from "../lib/syncDbToStore";
import PreviewBtn from "./components/PreviewBtn.vue";
import TestNav from "./components/TestNav.vue";
import TestDrawer from "./components/TestDrawer.vue";
import TestNavDrawer from "./components/TestNavDrawer.vue";

// await syncToStore("sync", await tellDb("sync"));

// store.newsContents = [
//   {
//     id: 1,
//     title: "meowtitle",
//     link: "http://example.com",
//     date_source_author: "meowdate",
//     category: "其他業界重要訊息",
//     content:
//       '["雖然AI功能已經廣泛使用在智慧手機，不過當前提到AI手機，則莫過於需要支援生成式AI功能，只是目前真正可執行生成式AI的智慧手機多為高階機種以上，但高通正開始使主流機型也能享受生成式AI，使更多用戶感受AI與生活的結合；高通宣布推出Snapdragon 7s Gen 3平台，除了增強的性能以外，還可支援如Baichuan-7B、1B級的Llama 2等大型語言模型。搭載Snapdragon 7s Gen 3的裝置預計於2024年9月問世，包括Realme、三星、Sharp、小米等都將推出採用Snapdragon 7s Gen 3的終端產品。","Snapdrgaon 7s Gen 3為高通新一代中階平台，採用4nm製程，著重在為主流級手機提供生成式AI體驗；Snapdragon 7s Gen 3搭載高通全方位的AI Engine，包括Adreno GPU、Kryo CPU與Hexagon NPU，其中Hexagon NPU可支援包括INT4、INT8與INT16等精度，並具備Qualcomm Sensing Hub，可用於增強音訊與感測器。","Snapdragon 7s Gen 3雖為中階平台，卻採用與高階平台相似的1+3+4核心配置，包括1個2.5GHz的Prime Core，3個2.4GHz的性能核與4個1.8GHz的節能核，搭配的Adreno GPU可提供10-bit的HDR遊戲視覺，並具備Adaptive Perf Engine 3.0、VRS Pro、Snapdragon Game Super Resolution(AFME)等功能，並支援硬體加速的H.265、VP9解碼，顯示器則支援最高FullHD+ 144Hz高更新率面板或最高4K 60Hz面板。相較前身提升20% CP性能、40% GPU性能與30% NPU性能，整體平台還獲得12%的能耗改善。","在影像功能部分，Snapdragon 7s Gen 3具備3個12bit ISP，最高可支援20MP單鏡頭，與最高64MP的零延遲快門，多鏡頭則支援21MP 30fps的三鏡頭零延遲快門，或32MP+21MP零延遲雙鏡頭。錄影則可提供4K 30p短片錄製的同時進行64MP照片擷取，高速慢快門可支援1080p 120fps格式。在附加功能提供包括基於深度學習的臉部、物件辨識與追蹤對焦，還有AI多幀夜景功能，以及可支援多幀HDR、多幀降噪感光元件與功能。","通訊部分，Snapdrgaon 7s Gen 3可支援包括6GHz在內的三頻Wi-Fi 6E，藍牙規格為支援LE Audio的藍牙5.4，提供包括aptX Voice、aptX Lossless、aptX Adaptive等音訊編碼；行動網路則提供2CA 2x2 MIMO的5G mmWave與4x4 MIMO的5G Sub-6GHz技術，下行最快為2.9Gbps。另外可搭配3,200MHz的LPDDR5X、2,133MHz的LPDDR4記憶體，最大容量達16GB RAM，另外具備相容PD規範的Qualcomm QC4+快充技術。"]',
//   },
//   {
//     id: 2,
//     title: "meowtitle2",
//     link: "http://example2.com",
//     date_source_author: "meowdate2",
//     category: "Qualcomm相關新聞",
//     content:
//       '["雖然AI功能已經廣泛使用在智慧手機，不過當前提到AI手機，則莫過於需要支援生成式AI功能，只是目前真正可執行生成式AI的智慧手機多為高階機種以上，但高通正開始使主流機型也能享受生成式AI，使更多用戶感受AI與生活的結合；高通宣布推出Snapdragon 7s Gen 3平台，除了增強的性能以外，還可支援如Baichuan-7B、1B級的Llama 2等大型語言模型。搭載Snapdragon 7s Gen 3的裝置預計於2024年9月問世，包括Realme、三星、Sharp、小米等都將推出採用Snapdragon 7s Gen 3的終端產品。","Snapdrgaon 7s Gen 3為高通新一代中階平台，採用4nm製程，著重在為主流級手機提供生成式AI體驗；Snapdragon 7s Gen 3搭載高通全方位的AI Engine，包括Adreno GPU、Kryo CPU與Hexagon NPU，其中Hexagon NPU可支援包括INT4、INT8與INT16等精度，並具備Qualcomm Sensing Hub，可用於增強音訊與感測器。","Snapdragon 7s Gen 3雖為中階平台，卻採用與高階平台相似的1+3+4核心配置，包括1個2.5GHz的Prime Core，3個2.4GHz的性能核與4個1.8GHz的節能核，搭配的Adreno GPU可提供10-bit的HDR遊戲視覺，並具備Adaptive Perf Engine 3.0、VRS Pro、Snapdragon Game Super Resolution(AFME)等功能，並支援硬體加速的H.265、VP9解碼，顯示器則支援最高FullHD+ 144Hz高更新率面板或最高4K 60Hz面板。相較前身提升20% CP性能、40% GPU性能與30% NPU性能，整體平台還獲得12%的能耗改善。","在影像功能部分，Snapdragon 7s Gen 3具備3個12bit ISP，最高可支援20MP單鏡頭，與最高64MP的零延遲快門，多鏡頭則支援21MP 30fps的三鏡頭零延遲快門，或32MP+21MP零延遲雙鏡頭。錄影則可提供4K 30p短片錄製的同時進行64MP照片擷取，高速慢快門可支援1080p 120fps格式。在附加功能提供包括基於深度學習的臉部、物件辨識與追蹤對焦，還有AI多幀夜景功能，以及可支援多幀HDR、多幀降噪感光元件與功能。","通訊部分，Snapdrgaon 7s Gen 3可支援包括6GHz在內的三頻Wi-Fi 6E，藍牙規格為支援LE Audio的藍牙5.4，提供包括aptX Voice、aptX Lossless、aptX Adaptive等音訊編碼；行動網路則提供2CA 2x2 MIMO的5G mmWave與4x4 MIMO的5G Sub-6GHz技術，下行最快為2.9Gbps。另外可搭配3,200MHz的LPDDR5X、2,133MHz的LPDDR4記憶體，最大容量達16GB RAM，另外具備相容PD規範的Qualcomm QC4+快充技術。"]',
//   },
// ];
console.log(store.newsContents);
console.log(store.newsContentsByCat);
const cats = [
  "Qualcomm相關新聞",
  "MediaTek相關新聞",
  "無線通訊市場",
  "智慧型手機/消費性電子產品",
  "其他業界重要訊息",
];
onMounted(async () => {
  await syncDbToStore();
});
function getFilteredItems(catId) {
  return store.newsContents.filter((item) => item.category === catId);
}
const bigger = computed((c) => {
  return listy.value.filter((item) => item.id == c);
});
const dynamicClasses = computed(() => {
  // Check if the current route path matches the element ID
  return route.path === `/${elementId}`
    ? "btn-primary" // Classes for matching route
    : "btn"; // Default classes
});
console.log(route.path);

const navPlaces = [
  {
    name: "Home",
    link: "/",
  },
  {
    name: "Import",
    link: "/import",
  },
  {
    name: "Preview",
    link: "/preview",
  },
  // {
  //   "name": "Export",
  //   "link": "/export"
  // }
];
</script>

<template>
  <div class="drawer lg:drawer-open">
    <input id="my-drawer-2" type="checkbox" class="drawer-toggle" />
    <div class="drawer-content flex flex-col items-start justify-center p-6">
      <!-- Page content here -->
      <label for="my-drawer-2" class="btn btn-primary drawer-button lg:hidden">
        Open drawer
      </label>
      <RouterView></RouterView>
    </div>
    <div class="drawer-side">
      <label
        for="my-drawer-2"
        aria-label="close sidebar"
        class="drawer-overlay"
      ></label>
      <ul class="menu bg-base-200 text-base-content min-h-full w-80 p-4">
        <!-- Sidebar content here -->

        <li v-for="place in navPlaces">
          <a
            @click="router.push(place.link)"
            :class="route.path == place.link ? 'btn btn-primary' : 'btn'"
            >{{ place.name }}</a
          >
        </li>

        <ul class="flex flex-col items-start gap-2">
          <li v-for="cat in cats" class="w-full">
            <h3 class="font-bold">
              {{ cat }} ({{ getFilteredItems(cat).length }})
            </h3>

            <a
              @click="router.push({ path: `/edit/${s.id}`, replace: true })"
              v-for="s in getFilteredItems(cat)"
              class="indent-8"
            >
              N0. {{s.id}}: {{ s.title ? s.title :"No Title" }}
            </a>
          </li>
        </ul>
        <!-- <li>
          <ul>
            <li v-for="li in listy">{{ li }}</li>
          </ul>
        </li> -->
      </ul>
    </div>
  </div>

  <!-- 
  <TestNavDrawer>
    <RouterView></RouterView>
  </TestNavDrawer> -->

  <!-- <TestNav />
<TestDrawer /> -->
  <!-- <main class="flex flex-col h-vh w-vw overflow-hidden">
    <!-- <MobileNavBar /> -->

  <!-- <Drawer>
      <DrawerToggle />
      <DrawerContent>
        <RouterView></RouterView>
      </DrawerContent>

      <Sidebar>
      
        <DrawerOverlay />
        <HomeBtn />
        <ImportLinksBtn />
<PreviewBtn />

        <li v-for="key in Object.keys(store.newsContentsByCat)">
          <h2 class="menu-title">{{ key }}</h2>
       
            <li v-for="s in store.newsContentsByCat[key]" @click="router.push({ path: `/edit/${s.id}`, replace: true })">
           
                {{ s.title }}
          
            </li>
         
        </li>
      </Sidebar>
    </Drawer> -->
  <!-- </main> -->
</template>
