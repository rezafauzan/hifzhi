# How to Contribute

## 🤝 How to Contribute

Kami sangat terbuka untuk kontribusi. Ikuti langkah-langkah berikut agar kontribusi kamu terstruktur dengan baik:

### 1. Diskusikan Terlebih Dahulu (Wajib)

Sebelum melakukan fork atau menulis kode:

* Buat issue baru untuk mendiskusikan perubahan yang ingin kamu lakukan
* Jelaskan secara singkat:

  * Tujuan perubahan
  * Solusi yang diusulkan
* Tunggu feedback atau persetujuan dari maintainer

Hal ini bertujuan untuk menghindari pekerjaan yang tidak sesuai arah project.

---

### 2. Fork & Clone Repository

* Fork repository ini ke akun GitHub kamu
* Clone hasil fork ke local environment

---

### 3. Buat Branch Baru dari `development`

Pastikan selalu membuat branch dari branch `development`, bukan `main`.

Gunakan naming convention berikut:

* Feature baru:

```bash
feat/nama-feature-baru
```

* Perbaikan bug:

```bash
fix/nama-bug
```

Contoh:

```bash
feat/user-authentication
fix/login-validation-error
```

---

### 4. Lakukan Perubahan

* Tulis kode dengan clean dan konsisten
* Pastikan tidak merusak fitur lain
* Tambahkan test jika diperlukan

---

### 5. Commit dengan Pesan yang Jelas

Gunakan commit message yang deskriptif, misalnya:

```bash
feat: add JWT authentication
fix: resolve null pointer on login
```

---

### 6. Push & Buat Pull Request

* Push branch ke repository fork kamu
* Buat Pull Request ke branch `development` di repository utama

---

### 7. Kaitkan dengan Issue

Saat membuat Pull Request:

* Mention issue yang ingin diselesaikan
* Gunakan format seperti:

```bash
Closes #nomor_issue
```

atau

```bash
Fixes #nomor_issue
```

---

### 8. Review Process

* Tunggu review dari maintainer
* Lakukan revisi jika diminta
* Setelah disetujui, PR akan di-merge

---

Kalau mau lebih “strict”, kamu juga bisa tambahkan rule seperti: PR tanpa issue akan otomatis ditolak.
