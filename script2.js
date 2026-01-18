document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('registrationForm');
    const successMsg = document.getElementById('successMessage');
    const userNameDisplay = document.getElementById('userNameDisplay');
    const resetBtn = document.getElementById('resetBtn');

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get user name for personalization
            const fullName = document.getElementById('fullname').value.split(' ')[0];
            const btn = form.querySelector('.cta-button');
            const originalBtnText = btn.innerHTML;

            // Loading state
            btn.innerHTML = '<span class="font-mono">INITIALIZING...</span>';
            btn.style.opacity = '0.7';
            btn.style.pointerEvents = 'none';

            // Simulate processing
            setTimeout(() => {
                // Hide form with animation
                form.style.opacity = '0';
                form.style.transform = 'translateY(-10px)';
                
                setTimeout(() => {
                    form.classList.add('hidden');
                    form.style.display = 'none';
                    
                    // Show success message
                    successMsg.classList.remove('hidden');
                    // Force reflow
                    void successMsg.offsetWidth; 
                    
                    userNameDisplay.textContent = fullName.toUpperCase();
                    
                    // console tech effect
                    console.log('%c ACCESS GRANTED ', 'background: #FFD700; color: #000; font-weight: bold; padding: 4px;');
                    console.log(`Agent ${fullName} registered successfully.`);

                }, 400); // Wait for fade out
                
            }, 1200); // Fake network delay
        });
    }

    if (resetBtn) {
        resetBtn.addEventListener('click', () => {
            // Reset state
            successMsg.classList.add('hidden');
            form.style.display = 'block';
            form.classList.remove('hidden');
            
            // Small delay to allow display:block to apply before animating opacity
            requestAnimationFrame(() => {
                form.style.opacity = '1';
                form.style.transform = 'translateY(0)';
                
                // Reset form fields
                form.reset();
                
                // Reset button
                const btn = form.querySelector('.cta-button');
                btn.innerHTML = '<span class="btn-text">INITIATE SEQUENCE</span><div class="btn-glitch"></div>';
                btn.style.opacity = '1';
                btn.style.pointerEvents = 'all';
            });
        });
    }

    // Input animation helper
    const inputs = document.querySelectorAll('input, select');
    inputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.parentElement.classList.add('focused');
        });
        input.addEventListener('blur', () => {
            if (!input.value) {
                input.parentElement.classList.remove('focused');
            }
        });
    });
});
