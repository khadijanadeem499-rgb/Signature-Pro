// ===== SIGNATURE GENERATOR APPLICATION =====
// Version: 3.0 – 18 unique signature fonts

(function() {
    // ===== 18 UNIQUE SIGNATURE FONTS =====
    const FONTS = [
        // Elegant Scripts (flowing, calligraphic)
        { name: "Great Vibes", category: "elegant", style: "cursive" },
        { name: "Dancing Script", category: "elegant", style: "cursive" },
        { name: "Alex Brush", category: "elegant", style: "cursive" },
        { name: "Allura", category: "elegant", style: "cursive" },
        { name: "Parisienne", category: "elegant", style: "cursive" },
        { name: "Tangerine", category: "elegant", style: "cursive" },
        { name: "WindSong", category: "elegant", style: "cursive" },
        
        // Bold & Statement Signatures
        { name: "Pacifico", category: "bold", style: "cursive" },
        { name: "Cookie", category: "bold", style: "cursive" },
        { name: "Playball", category: "bold", style: "cursive" },
        { name: "Rouge Script", category: "bold", style: "cursive" },
        { name: "Lobster", category: "bold", style: "display" },
        
        // Casual Handwritten
        { name: "Satisfy", category: "casual", style: "handwriting" },
        { name: "Kalam", category: "casual", style: "handwriting" },
        { name: "Shadows Into Light", category: "casual", style: "handwriting" },
        { name: "Covered By Your Grace", category: "casual", style: "handwriting" },
        
        // Artistic & Unique
        { name: "Caveat", category: "artistic", style: "handwriting" },
        { name: "Kaushan Script", category: "artistic", style: "cursive" }
    ];

    // ===== DOM ELEMENTS (same as before) =====
    const elements = {
        container: document.getElementById('signatureContainer'),
        generateBtn: document.getElementById('generateBtn'),
        nameInput: document.getElementById('nameInput'),
        colorInput: document.getElementById('colorInput'),
        bgInput: document.getElementById('bgInput'),
        sizeInput: document.getElementById('sizeInput'),
        sizeVal: document.getElementById('sizeVal'),
        heroPreview: document.getElementById('heroPreview'),
        toast: document.getElementById('toast'),
        toastMsg: document.getElementById('toastMessage'),
        fontCount: document.getElementById('fontCount'),
        filterTabs: document.querySelectorAll('.filter-tab')
    };

    // ===== STATE =====
    let currentFilter = 'all';

    // ===== INITIALIZATION =====
    function initialize() {
        // Set font count (18)
        if (elements.fontCount) {
            elements.fontCount.innerText = FONTS.length + ' fonts';
        }

        // Set initial values
        if (elements.heroPreview) {
            elements.heroPreview.innerText = elements.nameInput.value || 'Khadija';
        }
        
        if (elements.sizeVal) {
            elements.sizeVal.innerText = elements.sizeInput.value + 'px';
        }

        setupFilterTabs();
        generateSignatures();
    }

    // ===== FILTER SETUP =====
    function setupFilterTabs() {
        elements.filterTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                elements.filterTabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                currentFilter = tab.dataset.filter;
                filterSignatures();
            });
        });
    }

    function filterSignatures() {
        const cards = document.querySelectorAll('.sig-card');
        let visibleCount = 0;
        
        cards.forEach(card => {
            if (currentFilter === 'all' || card.dataset.category === currentFilter) {
                card.style.display = 'flex';
                visibleCount++;
            } else {
                card.style.display = 'none';
            }
        });

        // Remove any existing "no results" message
        const oldMsg = document.querySelector('.no-results-message');
        if (oldMsg) oldMsg.remove();

        if (visibleCount === 0 && currentFilter !== 'all') {
            showNoResultsMessage();
        }
    }

    function showNoResultsMessage() {
        const container = elements.container;
        const message = document.createElement('div');
        message.className = 'no-results-message';
        message.innerHTML = `
            <i class="fas fa-search" style="font-size: 48px; color: var(--text-gray); margin-bottom: 20px;"></i>
            <h3 style="color: var(--text-dark); margin-bottom: 10px;">No signatures in this category</h3>
            <p style="color: var(--text-gray);">Try another category or generate with different settings</p>
        `;
        message.style.cssText = `
            grid-column: 1/-1;
            text-align: center;
            padding: 60px 20px;
            background: #f8fafc;
            border-radius: 20px;
            margin-top: 20px;
        `;
        container.appendChild(message);
    }

    // ===== UTILITY FUNCTIONS =====
    function showToast(message, isError = false) {
        if (!elements.toast || !elements.toastMsg) return;
        
        elements.toastMsg.innerText = message;
        elements.toast.style.borderLeftColor = isError ? '#ef4444' : '#10b981';
        elements.toast.querySelector('i').style.color = isError ? '#ef4444' : '#10b981';
        elements.toast.classList.add('show');
        
        setTimeout(() => {
            elements.toast.classList.remove('show');
        }, 3000);
    }

    function downloadCanvas(canvas, name, extension) {
        try {
            const link = document.createElement('a');
            const sanitizedName = name.replace(/\s+/g, '_');
            link.download = `${sanitizedName}_signature.${extension}`;
            link.href = canvas.toDataURL(`image/${extension === 'jpg' ? 'jpeg' : 'png'}`);
            link.click();
            showToast(`${extension.toUpperCase()} downloaded!`);
        } catch (error) {
            showToast('Download failed. Please try again.', true);
        }
    }

    function showLoadingSkeleton() {
        if (!elements.container) return;
        elements.container.innerHTML = `
            <div class="loading-skeleton">
                <div class="skeleton-spinner"></div>
                <p style="color: var(--text-gray);">Crafting your signature styles...</p>
            </div>
        `;
    }

    // ===== SIGNATURE CARD CREATION =====
    function createSignatureCard(fontData, name, color, bg, size) {
        const card = document.createElement('div');
        card.className = `sig-card ${fontData.category}`;
        card.dataset.category = fontData.category;

        const canvas = document.createElement('canvas');
        canvas.width = 400;
        canvas.height = 160;
        const ctx = canvas.getContext('2d');

        // Background
        ctx.fillStyle = bg;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Subtle texture for casual/artistic fonts
        if (fontData.category === 'casual' || fontData.category === 'artistic') {
            ctx.globalAlpha = 0.05;
            for (let i = 0; i < 30; i++) {
                ctx.fillStyle = '#000';
                ctx.fillRect(Math.random() * canvas.width, Math.random() * canvas.height, 2, 1);
            }
            ctx.globalAlpha = 1;
        }

        // Draw signature
        ctx.fillStyle = color;
        ctx.font = `${size}px "${fontData.name}", ${fontData.style}`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        if (fontData.category === 'casual') {
            ctx.save();
            ctx.translate(canvas.width / 2, canvas.height / 2);
            ctx.rotate((Math.random() * 0.02) - 0.01);
            ctx.fillText(name, 0, 0);
            ctx.restore();
        } else {
            ctx.fillText(name, canvas.width / 2, canvas.height / 2);
        }

        // Font name badge
        const fontNameDiv = document.createElement('div');
        fontNameDiv.className = 'font-name';
        fontNameDiv.innerHTML = `<i class="fas fa-font"></i> ${fontData.name}`;

        // Category badge
        const categoryDiv = document.createElement('div');
        categoryDiv.className = 'font-category';
        categoryDiv.innerHTML = getCategoryIcon(fontData.category) + ' ' + fontData.category;

        // Buttons
        const btnGroup = document.createElement('div');
        btnGroup.className = 'button-group';

        const pngBtn = document.createElement('button');
        pngBtn.className = 'btn-dl btn-png';
        pngBtn.innerHTML = '<i class="fas fa-download"></i> PNG';
        pngBtn.onclick = (e) => {
            e.stopPropagation();
            downloadCanvas(canvas, name, 'png');
        };

        const jpgBtn = document.createElement('button');
        jpgBtn.className = 'btn-dl btn-jpg';
        jpgBtn.innerHTML = '<i class="fas fa-image"></i> JPG';
        jpgBtn.onclick = (e) => {
            e.stopPropagation();
            downloadCanvas(canvas, name, 'jpg');
        };

        btnGroup.appendChild(pngBtn);
        btnGroup.appendChild(jpgBtn);

        card.appendChild(canvas);
        card.appendChild(fontNameDiv);
        card.appendChild(categoryDiv);
        card.appendChild(btnGroup);

        return card;
    }

    function getCategoryIcon(category) {
        switch(category) {
            case 'elegant': return '<i class="fas fa-crown"></i>';
            case 'bold': return '<i class="fas fa-bold"></i>';
            case 'casual': return '<i class="fas fa-pen"></i>';
            case 'artistic': return '<i class="fas fa-paint-brush"></i>';
            default: return '<i class="fas fa-tag"></i>';
        }
    }

    async function generateSignatures() {
        const name = elements.nameInput.value.trim();
        const color = elements.colorInput.value;
        const bg = elements.bgInput.value;
        const size = parseInt(elements.sizeInput.value, 10);

        if (!name) {
            showToast('Please enter your name!', true);
            elements.nameInput.focus();
            return;
        }

        showLoadingSkeleton();

        await document.fonts.ready;
        await new Promise(r => setTimeout(r, 80));

        elements.container.innerHTML = "";

        FONTS.forEach(fontData => {
            const card = createSignatureCard(fontData, name, color, bg, size);
            elements.container.appendChild(card);
        });

        filterSignatures();
    }

    // ===== EVENT LISTENERS =====
    function setupEventListeners() {
        if (elements.nameInput) {
            elements.nameInput.addEventListener('input', function() {
                if (elements.heroPreview) {
                    elements.heroPreview.innerText = this.value || 'Khadija';
                }
            });
        }

        if (elements.sizeInput && elements.sizeVal) {
            elements.sizeInput.addEventListener('input', function() {
                elements.sizeVal.innerText = this.value + 'px';
            });
        }

        if (elements.generateBtn) {
            elements.generateBtn.addEventListener('click', generateSignatures);
        }

        if (elements.nameInput) {
            elements.nameInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') generateSignatures();
            });
        }
    }

    // ===== START =====
    function startApp() {
        setupEventListeners();
        initialize();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', startApp);
    } else {
        startApp();
    }
})();