// Handle sidebar toggle for mobile
document.addEventListener('DOMContentLoaded', () => {
    // Load sidebar content
    const sidebar = document.getElementById('sidebar');
    fetch('components/sidebar.html')
        .then(response => response.text())
        .then(html => {
            sidebar.innerHTML = html;
            initializeSidebar();
        });

    // Handle mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const sidebarElement = document.querySelector('.sidebar');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            sidebarElement.classList.toggle('active');
        });
    }

    // Handle code copy buttons
    document.querySelectorAll('pre').forEach(block => {
        const button = document.createElement('button');
        button.className = 'copy-button';
        button.textContent = 'Copy';
        
        button.addEventListener('click', () => {
            const code = block.querySelector('code');
            navigator.clipboard.writeText(code.textContent);
            
            button.textContent = 'Copied!';
            setTimeout(() => {
                button.textContent = 'Copy';
            }, 2000);
        });

        block.appendChild(button);
    });
});

function initializeSidebar() {
    // Handle nested navigation
    const navItems = document.querySelectorAll('.nav-items li');
    
    navItems.forEach(item => {
        const subMenu = item.querySelector('ul');
        if (subMenu) {
            const link = item.querySelector('a');
            link.addEventListener('click', (e) => {
                e.preventDefault();
                subMenu.classList.toggle('active');
            });
        }
    });
} 