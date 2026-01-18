document.addEventListener('DOMContentLoaded', () => {
    // Password Toggle
    const togglePassword = document.getElementById('togglePassword');
    const passwordInput = document.getElementById('password');

    togglePassword.addEventListener('click', () => {
        // Toggle the type attribute
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);

        // Toggle the eye icon
        togglePassword.classList.toggle('fa-eye');
        togglePassword.classList.toggle('fa-eye-slash');
    });

    // Form Submission (Demo)
    const loginForm = document.getElementById('loginForm');
    const submitBtn = document.getElementById('submitBtn');

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const originalText = submitBtn.querySelector('span').innerText;

        // Loading state
        submitBtn.querySelector('span').innerText = 'Signing In...';
        submitBtn.style.opacity = '0.7';
        submitBtn.style.cursor = 'wait';

        setTimeout(() => {
            submitBtn.querySelector('span').innerText = 'Success!';
            submitBtn.style.backgroundColor = '#10b981'; // Green color for success

            // Here you would typically handle the actual login logic
            // alert('Login Successful! (This is a demo)');
            window.location.href = 'verify.html';
        }, 1500);
    });

    // Add input focus effects for floating labels if we were using them
    // (Current design uses static labels, but we can add ripple effects here if needed)

    /* --- VERIFICATION PAGE LOGIC --- */
    const otpInputs = document.querySelectorAll('.otp-field');

    if (otpInputs.length > 0) {
        otpInputs.forEach((input, index) => {
            // Handle typing
            input.addEventListener('input', (e) => {
                const value = e.target.value;

                // Allow only numbers
                if (!/^\d*$/.test(value)) {
                    e.target.value = value.replace(/\D/g, '');
                    return;
                }

                if (value.length > 0) {
                    // Move to next input if available
                    if (index < otpInputs.length - 1) {
                        otpInputs[index + 1].focus();
                    }
                }
            });

            // Handle backspace
            input.addEventListener('keydown', (e) => {
                if (e.key === 'Backspace') {
                    if (input.value === '' && index > 0) {
                        otpInputs[index - 1].focus();
                    }
                }
            });

            // Paste functionality
            input.addEventListener('paste', (e) => {
                e.preventDefault();
                const pastedData = e.clipboardData.getData('text').slice(0, 4); // Limit to 4 chars
                if (!/^\d+$/.test(pastedData)) return; // Only numbers

                const digits = pastedData.split('');
                digits.forEach((digit, i) => {
                    if (otpInputs[index + i]) {
                        otpInputs[index + i].value = digit;
                        if (index + i < otpInputs.length - 1) {
                            otpInputs[index + i + 1].focus();
                        }
                    }
                });
            });
        });

        // Mock Timer
        let timeLeft = 30; // seconds
        const timerElement = document.getElementById('timer');
        const resendLink = document.getElementById('resendLink');

        const countdown = setInterval(() => {
            timeLeft--;
            if (timeLeft <= 0) {
                clearInterval(countdown);
                timerElement.innerText = '';
                timerElement.parentElement.innerHTML = "Didn't receive code?"; // Simplify text
                resendLink.classList.remove('disabled');
                resendLink.innerText = "Resend Code Now";
            } else {
                timerElement.innerText = `00:${timeLeft < 10 ? '0' + timeLeft : timeLeft}`;
            }
        }, 1000);

        // Verify Button Logic
        const verifyBtn = document.getElementById('verifyBtn');
        const verifyForm = document.getElementById('verifyForm');

        if (verifyForm) {
            verifyForm.addEventListener('submit', (e) => {
                e.preventDefault();
                let code = '';
                otpInputs.forEach(input => code += input.value);

                if (code.length < 4) {
                    alert('Please enter the full 4-digit code.');
                    return;
                }

                const originalText = verifyBtn.querySelector('span').innerText;
                verifyBtn.querySelector('span').innerText = 'Verifying...';
                verifyBtn.style.opacity = '0.7';

                setTimeout(() => {
                    verifyBtn.querySelector('span').innerText = 'Verified!';
                    verifyBtn.style.backgroundColor = '#10b981';
                    alert(`Code ${code} verified successfully!`);
                    window.location.href = 'index.html';

                    setTimeout(() => {
                        verifyBtn.querySelector('span').innerText = originalText;
                        verifyBtn.style.backgroundColor = '';
                        verifyBtn.style.opacity = '1';
                    }, 2000);
                }, 1500);
            });
        }
    }
});
