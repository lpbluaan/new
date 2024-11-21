<template>
  <div class="register-container">
    <h2>Đăng ký nhân viên</h2>
    <form @submit.prevent="registerEmployee">
      <div>
        <label for="hotennv">Họ tên:</label>
        <input type="text" id="hotennv" v-model="hotennv" required />
      </div>
      <div>
        <label for="sdt">Số điện thoại:</label>
        <input type="text" id="sdt" v-model="sdt" required />
      </div>
      <div>
        <label for="chucvu">Chức vụ:</label>
        <input type="text" id="chucvu" v-model="chucvu" required />
      </div>
      <div>
        <label for="diachi">Địa chỉ:</label>
        <input type="text" id="diachi" v-model="diachi" required />
      </div>
      <div>
        <label for="msnv">Mã số nhân viên:</label>
        <input type="text" id="msnv" v-model="msnv" required />
      </div>
      <div>
        <label for="password">Mật khẩu:</label>
        <input type="password" id="password" v-model="password" required />
      </div>
      <button type="submit">Đăng ký</button>
    </form>
    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      hotennv: '',
      sdt: '',
      chucvu: '',
      diachi: '',
      msnv: '',
      password: '',
      errorMessage: ''
    };
  },
  methods: {
    async registerEmployee() {
      try {
        const response = await fetch('http://localhost:3000/api/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            hotennv: this.hotennv,
            sdt: this.sdt,
            chucvu: this.chucvu,
            diachi: this.diachi,
            msnv: this.msnv,
            password: this.password
          })
        });

        if (!response.ok) {
          throw new Error('Đăng ký thất bại');
        }

        this.$router.push('/login'); // Sau khi đăng ký thành công, chuyển hướng đến trang đăng nhập
      } catch (error) {
        this.errorMessage = error.message || 'Có lỗi xảy ra';
      }
    }
  }
};
</script>

<style scoped>
/* Bạn có thể thêm CSS cho trang đăng ký ở đây */
.register-container {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #f9f9f9;
}

form div {
  margin-bottom: 10px;
}

form label {
  display: block;
  margin-bottom: 5px;
}

form input {
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  width: 100%;
  padding: 10px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
}

button:hover {
  background-color: #45a049;
}

.error {
  color: red;
  font-size: 14px;
}
</style>
