<script setup>
import { useRouter } from "vue-router";
import { store } from "./store";
const router = useRouter();

</script>

<template>
  <div class="flex flex-col h-screen">
    <!-- Navbar -->
    <div class="navbar bg-base-100">
      <div class="flex-none">
        <label for="my-drawer-2" class="btn btn-square drawer-button lg:hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="feather feather-menu"
          >
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </label>
      </div>
      <div class="flex-1">
        <a class="btn btn-ghost text-xl"
          >JDMS From A: {{ store.count
          }}<span v-for="m in store.meow">meow{{ m }}</span></a
        >
      </div>

      <div class="flex-none">
        <button class="btn btn-primary">Export</button>
      </div>
    </div>

    <!-- Main content area with drawer and RouterView -->
    <div class="flex flex-1">
      <!-- Drawer -->
      <div class="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" class="drawer-toggle" />
        <div class="drawer-content flex flex-col w-full">
          <div class="flex-1">
            <!-- RouterView will be displayed here -->
            <RouterView></RouterView>
          </div>
        </div>
        <div class="drawer-side">
          <label
            for="my-drawer-2"
            aria-label="close sidebar"
            class="drawer-overlay"
          ></label>
          <ul class="menu bg-base-200 text-base-content min-h-full w-80 p-4">
            <!-- Sidebar content here -->
            <li>
              <a class="btn btn-primary" @click="router.push('/import')"
                ><svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="feather feather-plus"
                >
                  <line x1="12" y1="5" x2="12" y2="19"></line>
                  <line x1="5" y1="12" x2="19" y2="12"></line></svg
                >Import Links</a
              >
            </li>
            <li>
              <h2 class="menu-title">Title</h2>
              <ul>
                <li v-for="s in store.newsContents">
                  <a @click="router.push(`edit/${s.id}`)">
                    {{ s.title }}
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
