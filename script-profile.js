document.addEventListener('DOMContentLoaded', () => {
    console.log('Profile Script Loaded');

    // 1. Get user data from LocalStorage
    const storedData = localStorage.getItem('banado_agent_data');
    console.log('Stored Data:', storedData);

    // Default fallback data
    let userData = {
        fullname: 'Guest Operative',
        email: 'guest@banado.boss',
        phone: 'N/A',
        role: 'trainee', // lowercase to match dictionary
        github: '#',
        stack: [],
        id: 'GUEST-001'
    };

    if (storedData) {
        try {
            const parsed = JSON.parse(storedData);
            // Merge parsed data over defaults to ensure no missing keys
            userData = { ...userData, ...parsed };
        } catch (e) {
            console.error('Data corruption detected', e);
        }
    }

    console.log('Final User Data:', userData);

    // 2. Populate UI
    populateProfile(userData);

    // 3. Logout Logic
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            if (confirm('Terminate session and wipe local credentials?')) {
                localStorage.removeItem('banado_agent_data');
                window.location.href = 'index.html';
            }
        });
    }
});

function populateProfile(data) {
    console.log('Populating UI with:', data);

    const safeSetText = (id, text) => {
        const el = document.getElementById(id);
        if (el) {
            el.textContent = text || '---';
        } else {
            console.warn(`Element with ID ${id} not found`);
        }
    };

    // Name
    safeSetText('profileName', data.fullname);

    // Initials
    const initialsEl = document.getElementById('avatarInitials');
    if (initialsEl && data.fullname) {
        const parts = data.fullname.trim().split(' ');
        let initials = parts[0][0];
        if (parts.length > 1) initials += parts[parts.length - 1][0];
        initialsEl.textContent = initials.toUpperCase();
    }

    // Role
    safeSetText('profileRole', getRoleLabel(data.role));

    // ID
    safeSetText('agentId', data.id);

    // Contact Info
    safeSetText('profileEmail', data.email);
    safeSetText('profilePhone', data.phone);

    // GitHub
    const ghLink = document.getElementById('profileGithub');
    if (ghLink) {
        ghLink.textContent = data.github || 'Not linked';
        ghLink.href = data.github || '#';
    }

    // Tech Stack
    const stackContainer = document.getElementById('techStackContainer');
    if (stackContainer) {
        stackContainer.innerHTML = ''; // Clear empty state
        if (Array.isArray(data.stack) && data.stack.length > 0) {
            data.stack.forEach(tech => {
                const badge = document.createElement('span');
                badge.className = 'tech-badge-display';
                badge.textContent = tech;
                stackContainer.appendChild(badge);
            });
        } else {
            stackContainer.innerHTML = '<span class="tech-badge-display empty">No tech detected</span>';
        }
    }
}

function getRoleLabel(roleValue) {
    if (!roleValue) return 'Unknown Class';
    const roles = {
        'frontend': 'Frontend Ninja',
        'backend': 'Backend Architect',
        'fullstack': 'Fullstack Overlord',
        'ai-ml': 'AI/ML Visionary',
        'cybersec': 'CyberSec Phantom',
        'trainee': 'Guest Trainee'
    };
    return roles[roleValue] || roleValue.toUpperCase();
}
