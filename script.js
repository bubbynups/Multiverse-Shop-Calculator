// Load categories from localStorage or use defaults
function loadCategories() {
    const saved = localStorage.getItem('categories');
    if (saved) {
        return JSON.parse(saved);
    }
    // Default categories
    return [
        {name: "Common Artifact XP", baseValue: 50, baseChance: 12, multiplier: 1},
        {name: "Rare Artifact XP", baseValue: 100, baseChance: 10, multiplier: 1},
        {name: "Special Artifact XP", baseValue: 150, baseChance: 5, multiplier: 1},
        {name: "Restricted Multiverse Clearances", baseValue: 530, baseChance: 5, multiplier: 1},
        {name: "Multiverse Clearances", baseValue: 320, baseChance: 5, multiplier: 1},
        {name: "Better 5x Artifact(s)", baseValue: 150, baseChance: 1.25, multiplier: 6},
        {name: "Worse 5x Artifact(s)", baseValue: 75, baseChance: 1.25, multiplier: 6},
        {name: "Better 10x Artifact(s)", baseValue: 300, baseChance: 0.1666, multiplier: 6},
        {name: "Worse 10x Artifact(s)", baseValue: 150, baseChance: 0.1666, multiplier: 6},
        {name: "Better 20x Artifact(s)", baseValue: 1200, baseChance: 0, multiplier: 6},
        {name: "Worse 20x Artifact(s)", baseValue: 900, baseChance: 0, multiplier: 6},
        {name: "Multi-Paul", baseValue: 150, baseChance: 10.375, multiplier: 1},
        {name: "Kid Omni-Man", baseValue: 150, baseChance: 10.375, multiplier: 1},
        {name: "Damien Darkblood", baseValue: 150, baseChance: 10.375, multiplier: 1},
        {name: "Dupli-Kate", baseValue: 150, baseChance: 10.375, multiplier: 1},
        {name: "Elite Hero(es) (Non-Food)", baseValue: 1500, baseChance: 0.5625, multiplier: 2},
        {name: "Elite Hero(es) (Food)", baseValue: 1000, baseChance: 0.5625, multiplier: 6},
    ];
}

let categories = loadCategories();

function saveCategoriesToStorage() {
    localStorage.setItem('categories', JSON.stringify(categories));
}

function getTotalChance(category) {
    return category.baseChance * category.multiplier;
}

function initShopGrid() {
    const grid = document.getElementById('shopGrid');
    grid.innerHTML = '';
    
    for (let i = 1; i <= 6; i++) {
        const slot = document.createElement('div');
        slot.className = 'item-slot';
        slot.innerHTML = `
            <label>Slot ${i}</label>
            <select id="slot${i}">
                <option value="">Select item...</option>
                ${categories.map((cat, idx) => `<option value="${idx}">${cat.name}</option>`).join('')}
            </select>
        `;
        grid.appendChild(slot);
    }
}

function refreshShop() {
    const hasSelections = Array.from({length: 6}, (_, i) => {
        const select = document.getElementById(`slot${i + 1}`);
        return select && select.value !== '';
    }).some(selected => selected);
    
    if (hasSelections) {
        if (confirm('Are you sure you want to refresh the shop? This will clear all current selections.')) {
            initShopGrid();
            document.getElementById('resultSection').innerHTML = '';
        }
    } else {
        initShopGrid();
        document.getElementById('resultSection').innerHTML = '';
    }
}

function initEditGrid() {
    const editGrid = document.getElementById('editGrid');
    editGrid.innerHTML = '';
    
    categories.forEach((cat, idx) => {
        const row = document.createElement('div');
        row.className = 'edit-grid';
        row.innerHTML = `
            <div class="item-name">${cat.name}</div>
            <input type="number" id="value${idx}" value="${cat.baseValue}" step="1">
            <input type="number" id="chance${idx}" value="${cat.baseChance}" step="0.0001">
            <input type="number" id="multiplier${idx}" value="${cat.multiplier}" step="1" min="1">
        `;
        editGrid.appendChild(row);
    });
}

function toggleEditMode() {
    const editSection = document.getElementById('editSection');
    editSection.classList.toggle('hidden');
}

function saveChanges() {
    categories.forEach((cat, idx) => {
        cat.baseValue = parseFloat(document.getElementById(`value${idx}`).value);
        cat.baseChance = parseFloat(document.getElementById(`chance${idx}`).value);
        cat.multiplier = parseInt(document.getElementById(`multiplier${idx}`).value);
    });
    
    saveCategoriesToStorage();
    
    const totalChance = categories.reduce((sum, cat) => sum + getTotalChance(cat), 0);
    alert(`Changes saved! Total chance: ${totalChance.toFixed(4)}%`);
    initShopGrid();
}

function binomial(n, k) {
    if (k < 0 || k > n) return 0;
    if (k === 0 || k === n) return 1;
    
    let result = 1;
    for (let i = 1; i <= k; i++) {
        result *= (n - i + 1) / i;
    }
    return result;
}

function calculateRareProbability(rareCategoryCounts) {
    const shopSize = 6;
    const categoryData = [];
    let totalProb = 0;
    
    for (let [catName, count] of Object.entries(rareCategoryCounts)) {
        const cat = categories.find(c => c.name === catName);
        const prob = getTotalChance(cat) / 100;
        categoryData.push({name: catName, prob: prob, minCount: count});
        totalProb += prob;
    }
    
    const otherProb = 1 - totalProb;
    let totalProbability = 0;
    
    function generateDistributions(index, remaining, currentDist) {
        if (index === categoryData.length) {
            const otherCount = remaining;
            if (otherCount >= 0) {
                let prob = 1;
                let multinomialCoeff = 1;
                let n = shopSize;
                
                for (let i = 0; i < currentDist.length; i++) {
                    const k = currentDist[i];
                    multinomialCoeff *= binomial(n, k);
                    n -= k;
                    prob *= Math.pow(categoryData[i].prob, k);
                }
                
                multinomialCoeff *= binomial(n, otherCount);
                prob *= Math.pow(otherProb, otherCount);
                
                totalProbability += multinomialCoeff * prob;
            }
            return;
        }
        
        const minCount = categoryData[index].minCount;
        for (let count = minCount; count <= remaining; count++) {
            generateDistributions(index + 1, remaining - count, [...currentDist, count]);
        }
    }
    
    generateDistributions(0, shopSize, []);
    
    return totalProbability * 100;
}

function calculateStrategy() {
    const selectedCategories = [];
    
    for (let i = 1; i <= 6; i++) {
        const select = document.getElementById(`slot${i}`);
        const catIdx = select.value;
        if (catIdx !== '') {
            selectedCategories.push(categories[parseInt(catIdx)]);
        }
    }
    
    if (selectedCategories.length !== 6) {
        alert('Please select all 6 items in the shop!');
        return;
    }
    
    const rareCategories = selectedCategories.filter(cat => {
        return cat.baseChance < 1 || 
               cat.name === "Elite Hero(es) (Non-Food)" || 
               cat.name === "Elite Hero(es) (Food)";
    });
    
    const totalValue = selectedCategories.reduce((sum, cat) => sum + cat.baseValue, 0);
    const buyAllCost = 2400;
    const has1500Item = selectedCategories.some(cat => cat.baseValue === 1500);
    
    let recommendation = '';
    let details = '';
    
    if (totalValue >= buyAllCost) {
        const profit = totalValue - buyAllCost;
        recommendation = `✅ BUY ALL - Profit: ${profit} chips`;
        details = `The total value (${totalValue}) exceeds the buy all cost (${buyAllCost}). You'll gain ${profit} chips worth of value!`;
    } else if (has1500Item) {
        const item1500 = selectedCategories.find(cat => cat.baseValue === 1500);
        const snipeChance = (1 / 6 * 100).toFixed(2);
        const expectedValue = totalValue / 6;
        recommendation = `🎯 SNIPE - Try to get ${item1500.name}`;
        details = `Shop contains ${item1500.name} (worth 1500 chips)! You have a ${snipeChance}% chance to get it with a single random buy (cost: 500 chips). Expected value per single buy: ${expectedValue.toFixed(0)} chips.`;
    } else {
        const refreshCost = 25;
        recommendation = `🔄 REFRESH - Skip this shop`;
        details = `Total value (${totalValue}) is below buy all cost (${buyAllCost}) and there are no 1500-value items to snipe. Refresh for ${refreshCost} chips or wait for hourly refresh.`;
    }
    
    const resultSection = document.getElementById('resultSection');
    let resultHTML = '';
    
    if (rareCategories.length >= 2) {
        const rareCategoryCounts = {};
        rareCategories.forEach(cat => {
            rareCategoryCounts[cat.name] = (rareCategoryCounts[cat.name] || 0) + 1;
        });
        
        const probability = calculateRareProbability(rareCategoryCounts);
        const oneInX = Math.round(1 / (probability / 100));
        
        const categoryDisplay = Object.entries(rareCategoryCounts)
            .map(([name, count]) => count > 1 ? `${count}x ${name}` : name)
            .join(' + ');
        
        resultHTML += `
            <div class="rare-bubble">
                <div class="rare-title">🎲 RARE SHOP ALERT!</div>
                <div class="rare-text">
                    At least: ${categoryDisplay}
                </div>
                <div class="rare-odds">
                    1 in ${oneInX.toLocaleString()} chance | ${probability.toFixed(6)}%
                </div>
            </div>
        `;
    }
    
    resultHTML += `
        <div class="result-box">
            <div class="result-title">📊 Analysis Results</div>
            <div class="result-detail"><strong>Total Shop Value:</strong> ${totalValue} chips</div>
            <div class="result-detail"><strong>Buy All Cost:</strong> ${buyAllCost} chips</div>
            <div class="result-detail"><strong>Contains 1500-Value Item:</strong> ${has1500Item ? 'Yes ✓' : 'No ✗'}</div>
            <div class="result-recommendation">
                ${recommendation}
                <div style="margin-top: 10px; font-size: 14px; font-weight: 400; line-height: 1.5;">
                    ${details}
                </div>
            </div>
        </div>
    `;
    
    resultSection.innerHTML = resultHTML;
}

initShopGrid();
initEditGrid();

function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    if (document.body.classList.contains('dark-mode')) {
        localStorage.setItem('darkMode', 'enabled');
    } else {
        localStorage.setItem('darkMode', 'disabled');
    }
}

window.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('darkMode') === 'enabled') {
        document.body.classList.add('dark-mode');
    }
});