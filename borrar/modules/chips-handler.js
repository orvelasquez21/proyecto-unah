export let temasArray = [];

export function initializeChips() {
    const chipsContainer = document.getElementById('temas-chips-container');
    const chipsInput = document.getElementById('temas-input');
    const temasHidden = document.getElementById('temas');
    
    if (!chipsContainer || !chipsInput || !temasHidden) return;

    function addTema(tema) {
        tema = tema.trim();
        if (tema && !temasArray.includes(tema)) {
            temasArray.push(tema);
            updateTemasHidden();
            renderChips();
        }
    }
    
    chipsInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ',' || e.key === 'Tab') {
            e.preventDefault();
            const valor = chipsInput.value.replace(/,/g, '').trim();
            if (valor) {
                addTema(valor);
                chipsInput.value = '';
            }
        } else if (e.key === 'Backspace' && chipsInput.value === '') {
            temasArray.pop();
            updateTemasHidden();
            renderChips();
        }
    });
    
    // Inicializar si hay valor inicial
    if (temasHidden && temasHidden.value) {
        temasArray = temasHidden.value.split(',').map(t => t.trim()).filter(Boolean);
        renderChips();
    }
}

export function renderChips() {
    const chipsContainer = document.getElementById('temas-chips-container');
    const chipsInput = document.getElementById('temas-input');
    
    if (!chipsContainer || !chipsInput) return;
    
    // Eliminar chips existentes
    chipsContainer.querySelectorAll('.chip-tema').forEach(chip => chip.remove());
    
    // Agregar nuevos chips
    temasArray.forEach((tema, idx) => {
        const chip = document.createElement('span');
        chip.className = 'chip-tema';
        chip.textContent = tema;
        
        const closeBtn = document.createElement('button');
        closeBtn.type = 'button';
        closeBtn.textContent = '×';
        closeBtn.onclick = function() {
            temasArray.splice(idx, 1);
            updateTemasHidden();
            renderChips();
        };
        
        chip.appendChild(closeBtn);
        chipsContainer.insertBefore(chip, chipsInput);
    });
}

export function updateTemasHidden() {
    const temasHidden = document.getElementById('temas');
    if (temasHidden) {
        temasHidden.value = temasArray.join(', ');
    }
}