document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('registerForm');
    const fields = {
        username: validateUsername,
        password: validatePassword,
        nama: validateNama,
        tanggalLahir: validateTanggalLahir,
        alamat: validateAlamat,
        nomorTelpon: validateNomorTelpon
    };
    const normalizers = {
        nomorTelpon: normalizeNomorTelpon
    };

    function showError(id, message) {
        const errorEl = document.getElementById('error-' + id);
        const inputEl = document.getElementById(id);
        if (inputEl) {
            inputEl.classList.add('border-red-500');
            inputEl.classList.remove('border-gray-300');
        }
        if (errorEl) {
            errorEl.textContent = message;
            errorEl.classList.remove('hidden', 'anim-shake');
            void errorEl.offsetWidth;
            errorEl.classList.add('anim-shake');
        }
    }

    function hideError(id) {
        const errorEl = document.getElementById('error-' + id);
        const inputEl = document.getElementById(id);
        if (inputEl) {
            inputEl.classList.remove('border-red-500');
            inputEl.classList.add('border-gray-300');
        }
        if (errorEl) {
            errorEl.textContent = '';
            errorEl.classList.add('hidden');
        }
    }

    function validateUsername() {
        const value = document.getElementById('username').value.trim();
        if (value === '') {
            showError('username', 'Username tidak boleh kosong.');
            return false;
        }
        if (value.length < 3) {
            showError('username', 'Username minimal 3 karakter.');
            return false;
        }
        hideError('username');
        return true;
    }

    function validatePassword() {
        const value = document.getElementById('password').value;
        if (value === '') {
            showError('password', 'Password tidak boleh kosong.');
            return false;
        }
        if (value.length < 8) {
            showError('password', 'Password minimal 8 karakter.');
            return false;
        }
        hideError('password');
        return true;
    }

    function validateNama() {
        const value = document.getElementById('nama').value.trim();
        if (value === '') {
            showError('nama', 'Nama tidak boleh kosong.');
            return false;
        }
        hideError('nama');
        return true;
    }

    function validateTanggalLahir() {
        const value = document.getElementById('tanggalLahir').value;
        if (value === '') {
            showError('tanggalLahir', 'Tanggal lahir tidak boleh kosong.');
            return false;
        }
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const birthDate = new Date(value + 'T00:00:00');
        if (birthDate > today) {
            showError('tanggalLahir', 'Tanggal lahir tidak boleh melebihi tanggal hari ini.');
            return false;
        }
        hideError('tanggalLahir');
        return true;
    }

    function validateAlamat() {
        const value = document.getElementById('alamat').value.trim();
        if (value === '') {
            showError('alamat', 'Alamat tidak boleh kosong.');
            return false;
        }
        hideError('alamat');
        return true;
    }

    function normalizeNomorTelpon() {
        const input = document.getElementById('nomorTelpon');
        const value = input.value.trim();
        let normalized = value;
        if (value.startsWith('+62')) {
            normalized = '62' + value.slice(3);
        } else if (value.startsWith('62')) {
            normalized = value;
        } else if (value.length >= 2 && value.startsWith('0')) {
            normalized = '62' + value.slice(1);
        } else {
            return;
        }
        if (normalized !== value) {
            input.value = normalized;
        }
    }

    function validateNomorTelpon() {
        const value = document.getElementById('nomorTelpon').value.trim();
        if (value === '') {
            showError('nomorTelpon', 'Nomor telepon tidak boleh kosong.');
            return false;
        }
        if (!value.startsWith('62')) {
            showError('nomorTelpon', 'Nomor telepon harus berawalan 62.');
            return false;
        }
        hideError('nomorTelpon');
        return true;
    }

    Object.keys(fields).forEach(function (id) {
        document.getElementById(id).addEventListener('blur', function () {
            fields[id]();
        });
        document.getElementById(id).addEventListener('input', function () {
            if (normalizers[id]) {
                normalizers[id]();
            }
            fields[id]();
        });
    });

    form.addEventListener('submit', function (event) {
        let isValid = true;
        Object.keys(fields).forEach(function (id) {
            if (!fields[id]()) {
                isValid = false;
            }
        });
        if (!isValid) {
            event.preventDefault();
            alert('Harap perbaiki data yang belum valid.');
        }
    });
});