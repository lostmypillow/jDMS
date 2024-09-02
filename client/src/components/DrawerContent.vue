<template>
   <div class="drawer-content flex flex-col items-start justify-center p-6">
      <!-- Page content here -->
      <label for="my-drawer-2" class="btn btn-primary drawer-button lg:hidden">
        Open drawer
      </label>
      <slot></slot>
    </div>
</template>