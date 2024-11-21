<template>
  <div class="container col-md-6 d-flex flex-column text-center">
    <h3 class="text-center">Đăng Nhập</h3>
    <div class="p-3">
      <label class="w-25" for="msnv">Mã nhân viên: </label>
      <input type="text" class="w-25" v-model="msnv">
    </div>
    <div class="p-3">
      <label class=" w-25" for="password">Mật khẩu: </label>
      <input type="password" class="w-25" v-model="password">
    </div>
    <div class="p-3">
      <button type="submit" class="w-25 rounded" @click="loginStaff">Đăng nhập</button>
    </div>

    <!-- Thêm phần điều hướng sang trang đăng ký -->
    <div class="p-3">
      <p>Chưa có tài khoản? <router-link to="/register">Đăng ký ngay</router-link></p>
    </div>
  </div>
</template>

<script>
import EmployeeService from "@/services/employee.service";
import { nextTick } from "vue"; // Import nextTick từ Vue

export default {
  data() {
    return {
      msnv: '',
      password: '',
    };
  },
  methods: {
    async loginStaff() {
      if (this.msnv && this.password) {
        const data = {
          msnv: this.msnv,
          password: this.password
        };

        try {
          const staff = await EmployeeService.login(data);
          if (staff) {
            // Lưu thông tin nhân viên vào sessionStorage
            sessionStorage.setItem("nhanvien", JSON.stringify(staff));

            // Thông báo đăng nhập thành công
            alert("Đăng nhập thành công");

            // Chờ Vue cập nhật DOM và sau đó thực hiện chuyển hướng
            nextTick(() => {
              this.$router.replace({ name: 'book' });  // Dùng replace để thay đổi trang mà không thêm vào lịch sử
            });
          }
        } catch (error) {
          console.error(error);
          alert("Đăng nhập thất bại! Vui lòng kiểm tra lại thông tin.");
        }
      }
    },
  }
}
</script>

<style scoped>
/* Bạn có thể thêm các style tùy chỉnh ở đây */
</style>
