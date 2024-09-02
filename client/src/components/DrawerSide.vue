<template>
     <div class="drawer-side">
      <label
        for="my-drawer-2"
        aria-label="close sidebar"
        class="drawer-overlay"
      ></label>
      <ul class="menu bg-base-200 text-base-content min-h-full w-80 pl-4 pr-8">
        <slot></slot>
      </ul>
      </div>
</template>