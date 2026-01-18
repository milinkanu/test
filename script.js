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
            alert('Login Successful! (This is a demo)');
            
            // Reset button after delay
            setTimeout(() => {
                submitBtn.querySelector('span').innerText = originalText;
                submitBtn.style.opacity = '1';
                submitBtn.style.cursor = 'pointer';
                submitBtn.style.backgroundColor = ''; // Reset color
                loginForm.reset();
            }, 2000);
        }, 1500);
    });

    // Add input focus effects for floating labels if we were using them
    // (Current design uses static labels, but we can add ripple effects here if needed)
});
