// Shop level data - organized rates
const shopLevelRates = {
    1: {
        commonXP: 15,
        rareXP: 10,
        specialXP: 5,
        multiverseClearance: 5,
        restrictedClearance: 0,
        artifacts5x: 12,
        artifacts10x: 0,
        artifacts20x: 0,
        rareHeroes: 50,
        eliteHeroes: 3
    },
    2: {
        commonXP: 14,
        rareXP: 10,
        specialXP: 5,
        multiverseClearance: 5,
        restrictedClearance: 0,
        artifacts5x: 13,
        artifacts10x: 0,
        artifacts20x: 0,
        rareHeroes: 49.5,
        eliteHeroes: 3.5
    },
    3: {
        commonXP: 13,
        rareXP: 10,
        specialXP: 5,
        multiverseClearance: 5,
        restrictedClearance: 5,
        artifacts5x: 13.9992,
        artifacts10x: 0.9996,
        artifacts20x: 0,
        rareHeroes: 43,
        eliteHeroes: 4
    },
    4: {
        commonXP: 12,
        rareXP: 10,
        specialXP: 5,
        multiverseClearance: 5,
        restrictedClearance: 5,
        artifacts5x: 15,
        artifacts10x: 1.9992,
        artifacts20x: 0,
        rareHeroes: 41.5,
        eliteHeroes: 4.5
    },
    5: {
        commonXP: 11,
        rareXP: 10,
        specialXP: 5,
        multiverseClearance: 7,
        restrictedClearance: 7,
        artifacts5x: 15.9996,
        artifacts10x: 1.9992,
        artifacts20x: 0.4992,
        rareHeroes: 36.5,
        eliteHeroes: 5
    },
    6: {
        commonXP: 10,
        rareXP: 10,
        specialXP: 5,
        multiverseClearance: 7,
        restrictedClearance: 7,
        artifacts5x: 16.9992,
        artifacts10x: 3,
        artifacts20x: 0.4992,
        rareHeroes: 35,
        eliteHeroes: 5.5
    },
    7: {
        commonXP: 9,
        rareXP: 10,
        specialXP: 5,
        multiverseClearance: 9,
        restrictedClearance: 9,
        artifacts5x: 18,
        artifacts10x: 3,
        artifacts20x: 0.6,
        rareHeroes: 30.399,
        eliteHeroes: 6
    },
    8: {
        commonXP: 8,
        rareXP: 10,
        specialXP: 5,
        multiverseClearance: 9,
        restrictedClearance: 9,
        artifacts5x: 18.9996,
        artifacts10x: 3.9996,
        artifacts20x: 0.6,
        rareHeroes: 28.899,
        eliteHeroes: 6.5
    },
    9: {
        commonXP: 7,
        rareXP: 10,
        specialXP: 5,
        multiverseClearance: 10,
        restrictedClearance: 10,
        artifacts5x: 19.9992,
        artifacts10x: 3.9996,
        artifacts20x: 0.6996,
        rareHeroes: 26.299,
        eliteHeroes: 7
    },
    10: {
        commonXP: 6,
        rareXP: 10,
        specialXP: 5,
        multiverseClearance: 10,
        restrictedClearance: 10,
        artifacts5x: 21,
        artifacts10x: 4.9992,
        artifacts20x: 0.7992,
        rareHeroes: 24.7,
        eliteHeroes: 7.5
    }
};

const rareHeroesList = ["Multi-Paul", "Kid Omni-Man", "Damien Darkblood", "Dupli-Kate"];
const eliteHeroesList = [
    "Agent Spider", "Dark Wing 2", "Cecil Stedman", "King Lizard",
    "Iguana", "Lucan", "Shapesmith", "Thula"
];

function generateCategoriesForLevel(level) {
    const rates = shopLevelRates[level];
    if (!rates) return [];
    
    const categories = [];
    
    categories.push({name: "Common Artifact XP", baseValue: 50, baseChance: rates.commonXP, multiplier: 1});
    categories.push({name: "Rare Artifact XP", baseValue: 100, baseChance: rates.rareXP, multiplier: 1});
    categories.push({name: "Special Artifact XP", baseValue: 150, baseChance: rates.specialXP, multiplier: 1});
    
    categories.push({name: "Multiverse Clearances", baseValue: 320, baseChance: rates.multiverseClearance, multiplier: 1});
    if (rates.restrictedClearance > 0) {
        categories.push({name: "Restricted Multiverse Clearances", baseValue: 530, baseChance: rates.restrictedClearance, multiplier: 1});
    }
    
    if (rates.artifacts5x > 0) {
        const per5xArtifact = rates.artifacts5x / 12;
        categories.push({name: "Better 5x Artifact(s)", baseValue: 150, baseChance: per5xArtifact, multiplier: 6});
        categories.push({name: "Worse 5x Artifact(s)", baseValue: 75, baseChance: per5xArtifact, multiplier: 6});
    }
    
    if (rates.artifacts10x > 0) {
        const per10xArtifact = rates.artifacts10x / 12;
        categories.push({name: "Better 10x Artifact(s)", baseValue: 300, baseChance: per10xArtifact, multiplier: 6});
        categories.push({name: "Worse 10x Artifact(s)", baseValue: 150, baseChance: per10xArtifact, multiplier: 6});
    }
    
    if (rates.artifacts20x > 0) {
        const per20xArtifact = rates.artifacts20x / 12;
        categories.push({name: "Better 20x Artifact(s)", baseValue: 1200, baseChance: per20xArtifact, multiplier: 6});
        categories.push({name: "Worse 20x Artifact(s)", baseValue: 900, baseChance: per20xArtifact, multiplier: 6});
    }
    
    const perRareHero = rates.rareHeroes / 4;
    rareHeroesList.forEach(hero => {
        categories.push({name: hero, baseValue: 150, baseChance: perRareHero, multiplier: 1});
    });
    
    const perEliteHero = rates.eliteHeroes / 8;
    categories.push({name: "Elite Hero(es) (Non-Food)", baseValue: 1500, baseChance: perEliteHero, multiplier: 2});
    categories.push({name: "Elite Hero(es) (Food)", baseValue: 1000, baseChance: perEliteHero, multiplier: 6});
    
    return categories;
}

function verifyShopLevels() {
    for (let level = 1; level <= 10; level++) {
        const rates = shopLevelRates[level];
        const total = rates.commonXP + rates.rareXP + rates.specialXP + 
                     rates.multiverseClearance + rates.restrictedClearance +
                     rates.artifacts5x + rates.artifacts10x + rates.artifacts20x +
                     rates.rareHeroes + rates.eliteHeroes;
        
        if (Math.abs(total - 100) > 1) {
            console.warn(`Shop Level ${level} total: ${total.toFixed(4)}% (off by ${(total - 100).toFixed(4)}%)`);
        } else {
            console.log(`Shop Level ${level}: ${total.toFixed(4)}% ✓`);
        }
    }
}

verifyShopLevels();

function loadShopLevel() {
    const saved = localStorage.getItem('shopLevel');
    return saved ? parseInt(saved) : 1;
}

function saveShopLevel(level) {
    localStorage.setItem('shopLevel', level);
}

function loadCategories() {
    const currentLevel = loadShopLevel();
    return generateCategoriesForLevel(currentLevel);
}

let categories = loadCategories();
let currentShopLevel = loadShopLevel();

function changeShopLevel(level) {
    currentShopLevel = parseInt(level);
    saveShopLevel(currentShopLevel);
    categories = generateCategoriesForLevel(currentShopLevel);
    
    initShopGrid();
    initEditGrid();
    document.getElementById('resultSection').innerHTML = '';
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
        const isMultiplierEditable = cat.multiplier > 1;
        const multiplierDisabled = isMultiplierEditable ? '' : 'disabled';
        const chanceDisabled = 'disabled'; // Always disabled since shop levels govern this
        
        const row = document.createElement('div');
        row.className = 'edit-grid';
        row.innerHTML = `
            <div class="item-name">${cat.name}</div>
            <input type="number" id="value${idx}" value="${cat.baseValue}" step="1">
            <input type="number" id="chance${idx}" value="${cat.baseChance}" step="0.0001" ${chanceDisabled}>
            <input type="number" id="multiplier${idx}" value="${cat.multiplier}" step="1" min="1" ${multiplierDisabled}>
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
    
    const totalChance = categories.reduce((sum, cat) => sum + getTotalChance(cat), 0);
    alert(`Changes saved for Shop Level ${currentShopLevel}! Total chance: ${totalChance.toFixed(4)}%`);
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

function calculateExpectedSnipeCost(maxSingles = 4) {
    // Based on ChatGPT's mathematical analysis
    // Formula: E[cost] = Σ(k=1 to n) P(success on k) × cost(k) + P(fail all) × 2400
    
    const singleCost = 500;
    const buyAllCost = 2400;
    const shopSize = 6;
    
    let expectedCost = 0;
    
    // Sum expected cost for each possible success point
    for (let k = 1; k <= maxSingles; k++) {
        // P(fail first k-1, succeed on k-th) = (5/6)^(k-1) × (1/6)
        const probFailBefore = Math.pow((shopSize - 1) / shopSize, k - 1);
        const probSuccessOnK = 1 / shopSize;
        const probThisOutcome = probFailBefore * probSuccessOnK;
        
        // Cost is k singles at 500 each
        const costIfSuccess = singleCost * k;
        
        expectedCost += probThisOutcome * costIfSuccess;
    }
    
    // Probability of failing all maxSingles
    const probFailAll = Math.pow(5 / 6, maxSingles);
    
    // If we fail all singles, we buy remaining (2400 - 500*maxSingles)
    const remainingPackCost = buyAllCost - (singleCost * maxSingles);
    const totalCostIfFailAll = (singleCost * maxSingles) + remainingPackCost; // = 2400
    
    expectedCost += probFailAll * totalCostIfFailAll;
    
    return expectedCost;
}

const SNIPE_THRESHOLD = 1633.33;

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
    const avgItemValue = totalValue / 6;
    
    // Find highest value item for sniping analysis
    const sortedByValue = [...selectedCategories].sort((a, b) => b.baseValue - a.baseValue);
    const highestValueItem = sortedByValue[0];
    const otherItemsTotal = totalValue - highestValueItem.baseValue;
    const otherItemsAvg = otherItemsTotal / 5;
    
    // Calculate expected cost for optimal sniping strategy (4 singles max)
    const expectedSnipeCost = calculateExpectedSnipeCost(4);    const snipeThreshold = 1633.33;
    
    let recommendation = '';
    let details = '';
    let snipeAnalysis = '';
    
    if (totalValue >= buyAllCost) {
        const profit = totalValue - buyAllCost;
        recommendation = `✅ BUY ALL - Profit: ${profit} chips`;
        details = `The total value (${totalValue}) exceeds the buy all cost (${buyAllCost}). You'll gain ${profit} chips worth of value!`;
    } else if (highestValueItem.baseValue > snipeThreshold) {
        recommendation = `🎯 SNIPE - Try to get ${highestValueItem.name}`;
        details = `<strong>Optimal Strategy:</strong> Try up to 4 single random pulls, then buy remaining pack if you fail.<br><br>`;
        details += `<strong>Target Item:</strong> ${highestValueItem.name} (${highestValueItem.baseValue} chips)<br>`;
        details += `<strong>Expected Cost:</strong> ~${Math.round(expectedSnipeCost)} chips<br>`;
        details += `<strong>Break-even Value:</strong> ${snipeThreshold.toFixed(2)} chips<br>`;
        details += `<strong>Your Item Value:</strong> ${highestValueItem.baseValue} chips ✓<br><br>`;
        details += `Since your target item (${highestValueItem.baseValue}) exceeds the expected cost (~${Math.round(expectedSnipeCost)}), sniping is +EV!`;
        
        snipeAnalysis = `
            <div class="snipe-analysis">
                <div class="analysis-title">📈 Sniping Mathematics</div>
                <div class="analysis-detail">• Probability per pull: 1/6 (16.67%)</div>
                <div class="analysis-detail">• Success within 4 pulls: ~51.8%</div>
                <div class="analysis-detail">• Average singles used: 3.0</div>
                <div class="analysis-detail">• Expected total cost: ${Math.round(expectedSnipeCost)} chips</div>
            </div>
        `;
    } else {
        const refreshCost = 25;

        recommendation = `🔄 REFRESH - Skip this shop`;
        details = `<strong>Analysis:</strong><br>`;
        details += `• Total value: ${totalValue} chips (below ${buyAllCost})<br>`;
        details += `• Highest item: ${highestValueItem.name} (${highestValueItem.baseValue} chips)<br>`;
        details += `• Snipe break-even: ${SNIPE_THRESHOLD.toFixed(2)} chips<br><br>`;
        details += `The highest value item (${highestValueItem.baseValue}) doesn't exceed the expected sniping cost (~${Math.round(SNIPE_THRESHOLD)} chips). `;
        details += `Refresh for ${refreshCost} chips or wait for hourly refresh.`;
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
    
    resultHTML += snipeAnalysis;
    
    resultHTML += `
        <div class="result-box">
            <div class="result-title">📊 Analysis Results (Shop Level ${currentShopLevel})</div>
            <div class="result-detail"><strong>Total Shop Value:</strong> ${totalValue} chips</div>
            <div class="result-detail"><strong>Average Item Value:</strong> ${avgItemValue.toFixed(0)} chips</div>
            <div class="result-detail"><strong>Buy All Cost:</strong> ${buyAllCost} chips (400 per item)</div>
            <div class="result-detail"><strong>Highest Value Item:</strong> ${highestValueItem.name} (${highestValueItem.baseValue} chips)</div>
            <div class="result-recommendation">
                ${recommendation}
                <div style="margin-top: 10px; font-size: 14px; font-weight: 400; line-height: 1.6;">
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
    const darkModeToggle = document.getElementById('darkModeToggle');
    
    if (document.body.classList.contains('dark-mode')) {
        localStorage.setItem('darkMode', 'enabled');
    } else {
        localStorage.setItem('darkMode', 'disabled');
    }
}

window.addEventListener('DOMContentLoaded', () => {
    const darkModeToggle = document.getElementById('darkModeToggle');
    
    if (localStorage.getItem('darkMode') === 'enabled') {
        document.body.classList.add('dark-mode');
        if (darkModeToggle) {
            darkModeToggle.checked = true;
        }
    }
    
    const levelDropdown = document.getElementById('shopLevelDropdown');
    if (levelDropdown) {
        levelDropdown.value = currentShopLevel;
    }
});