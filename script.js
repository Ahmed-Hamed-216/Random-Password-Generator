document.addEventListener('DOMContentLoaded', () => {
    const passwordInput = document.getElementById('password');
    const copyButton = document.getElementById('copy-button');
    const generateButton = document.getElementById('generate-button');
    const lengthInput = document.getElementById('length');
    const lengthValue = document.getElementById('length-value');
    const decreaseButton = document.getElementById('decrease');
    const increaseButton = document.getElementById('increase');
    const uppercaseCheckbox = document.getElementById('uppercase');
    const lowercaseCheckbox = document.getElementById('lowercase');
    const numbersCheckbox = document.getElementById('numbers');
    const symbolsCheckbox = document.getElementById('symbols');
    const easyToSayCheckbox = document.getElementById('easy-say');
    const easyToReadCheckbox = document.getElementById('easy-read');
    const strengthIndicator = document.querySelector('.strength-indicator');

    function updateStrengthIndicator(password) {
        let strength = 'Very weak';
        let strengthColor = '#f4433680';  // Red

        const hasUppercase = /[A-Z]/.test(password);
        const hasLowercase = /[a-z]/.test(password);
        const hasNumbers = /[0-9]/.test(password);
        const hasSymbols = /[!@#$%^&*()_+~`|}{[\]:";'<>?,./-=]/.test(password);

        let score = password.length >= 8 ? 1 : 0;
        if (hasUppercase) score++;
        if (hasLowercase) score++;
        if (hasNumbers) score++;
        if (hasSymbols) score++;

        switch (score) {
            case 0:
            case 1:
                strength = 'Very weak';
                strengthColor = '#f4433680'; // Red
                break;
            case 2:
                strength = 'Weak';
                strengthColor = '#ff980080'; // Orange
                break;
            case 3:
                strength = 'Good';
                strengthColor = '#ffeb3b80'; // Yellow
                break;
            case 4:
                strength = 'Strong';
                strengthColor = '#4caf5080'; // Green
                break;
            case 5:
                strength = 'Very strong';
                strengthColor = '#9ae43780'; // Dark Green
                break;
        }

        strengthIndicator.textContent = strength;
        strengthIndicator.style.backgroundColor = strengthColor;
    }

    function generatePassword() {
        const length = parseInt(lengthInput.value);
        const useUppercase = uppercaseCheckbox.checked;
        const useLowercase = lowercaseCheckbox.checked;
        const useNumbers = numbersCheckbox.checked;
        const useSymbols = symbolsCheckbox.checked;
        const easyToSay = easyToSayCheckbox.checked;
        const easyToRead = easyToReadCheckbox.checked;

        const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
        const numberChars = '0123456789';
        const symbolChars = '!@#$%^&*()_+~`|}{[]:;"<>,.?/=-';

        let allChars = '';

        if (useUppercase) allChars += uppercaseChars;
        if (useLowercase) allChars += lowercaseChars;
        if (useNumbers) allChars += numberChars;
        if (useSymbols) allChars += symbolChars;

        let password = '';

        for (let i = 0; i < length; i++) {
            password += allChars[Math.floor(Math.random() * allChars.length)];
        }

        passwordInput.value = password;
        updateStrengthIndicator(password);
    }

    function generatePasswordWithAnimation() {
        const length = parseInt(lengthInput.value);
        const useUppercase = uppercaseCheckbox.checked;
        const useLowercase = lowercaseCheckbox.checked;
        const useNumbers = numbersCheckbox.checked;
        const useSymbols = symbolsCheckbox.checked;

        const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
        const numberChars = '0123456789';
        const symbolChars = '!@#$%^&*()_+~`|}{[]:;"<>,.?/=-';

        let allChars = '';

        if (useUppercase) allChars += uppercaseChars;
        if (useLowercase) allChars += lowercaseChars;
        if (useNumbers) allChars += numberChars;
        if (useSymbols) allChars += symbolChars;

        let password = '';

        const interval = setInterval(() => {
            password = '';
            for (let i = 0; i < length; i++) {
                password += allChars[Math.floor(Math.random() * allChars.length)];
            }
            passwordInput.value = password;
        }, 50);

        setTimeout(() => {
            clearInterval(interval);
            generatePassword();
        }, 200);
    }

    function handleCheckboxChange() {
        generatePasswordWithAnimation();
    }

    function handleSliderChange() {
        generatePasswordWithAnimation();
    }

    // إضافة مستمعي الأحداث
    uppercaseCheckbox.addEventListener('change', handleCheckboxChange);
    lowercaseCheckbox.addEventListener('change', handleCheckboxChange);
    numbersCheckbox.addEventListener('change', handleCheckboxChange);
    symbolsCheckbox.addEventListener('change', handleCheckboxChange);
    easyToSayCheckbox.addEventListener('change', handleCheckboxChange);
    easyToReadCheckbox.addEventListener('change', handleCheckboxChange);

    copyButton.addEventListener('click', () => {
        navigator.clipboard.writeText(passwordInput.value).then(() => {
            alert('Password copied to clipboard!');
        });
    });

    generateButton.addEventListener('click', generatePasswordWithAnimation);

    lengthInput.addEventListener('input', () => {
        lengthValue.textContent = lengthInput.value;
        handleSliderChange(); // تحديث كلمة المرور مع الرسوم المتحركة عند تغيير قيمة شريط التمرير
    });

    decreaseButton.addEventListener('click', () => {
        if (lengthInput.value > 2) {
            lengthInput.value--;
            lengthValue.textContent = lengthInput.value;
            handleSliderChange(); // تحديث كلمة المرور مع الرسوم المتحركة عند الضغط على زر النقصان
        }
    });

    increaseButton.addEventListener('click', () => {
        if (lengthInput.value < 50) {
            lengthInput.value++;
            lengthValue.textContent = lengthInput.value;
            handleSliderChange(); // تحديث كلمة المرور مع الرسوم المتحركة عند الضغط على زر الزيادة
        }
    });

    generatePassword(); // توليد كلمة مرور افتراضية عند التحميل

    // الوضع الليلي
    const toggleNightModeButton = document.getElementById('toggle-night-mode');
    const nightModeEnabled = localStorage.getItem('nightMode') === 'true';
    if (nightModeEnabled) {
        document.body.classList.add('night-mode');
    }

    toggleNightModeButton.addEventListener('click', () => {
        document.body.classList.toggle('night-mode');
        const isNightMode = document.body.classList.contains('night-mode');
        localStorage.setItem('nightMode', isNightMode);
    });
});
