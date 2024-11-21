<script>
import AppHeader from "@/components/AppHeader.vue";
import Login from "@/views/Login.vue";  // Đảm bảo tên component là đúng
import { computed } from "vue";  // Sử dụng computed để theo dõi nhanvien trong sessionStorage

export default {
  components: {
    AppHeader,
    Login
  },
  computed: {
    // Theo dõi nhanvien trong sessionStorage
    nhanvien() {
      return JSON.parse(sessionStorage.getItem("nhanvien"));
    }
  }
};
</script>

<template>
  <div id="app">
    <div v-if="!nhanvien" class="container mt-5 bg-secondary p-3 bg-gradient bg-opacity-25">
      <!-- Sử dụng Login với chữ L viết hoa -->
      <Login />
    </div>
    <div v-if="nhanvien">
      <AppHeader />
      <div class="container mt-3 bg-secondary p-3 bg-gradient bg-opacity-25">
        <!-- Router view nơi các route được render -->
        <router-view />
      </div>
    </div>
  </div>
</template>
