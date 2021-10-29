const pricingComponent = {
    offers: {
        '10K': 8,
        '50K': 12,
        '100K': 16,
        '500K': 24,
        '1M': 36
    },
    currentOffer: '10K',
    discount: false,
    discountPercent: 25,
    init: () => {
        // Get DOM elements
        pricingComponent.rangeElement = document.getElementById('priceRange');
        pricingComponent.checkboxElement = document.getElementById('billingCheckbox');
        pricingComponent.nbPageViewsElement = document.getElementById('nbPageViews');
        pricingComponent.offerPriceElement = document.getElementById('offerPrice');
        pricingComponent.offerInput = document.getElementById('offerInput');

        // Listen range
        pricingComponent.rangeElement.addEventListener('input', pricingComponent.onRangeChange);

        // Listen checkbox
        pricingComponent.checkboxElement.addEventListener('change', pricingComponent.onCheckboxChange);

        // Launch events
        pricingComponent.rangeElement.dispatchEvent(new Event('input'));
        pricingComponent.checkboxElement.dispatchEvent(new Event('change'));
    },
    onRangeChange: (e) => {
        console.log(e, this );
        // Get range position
        const position = Number(e.target.value);
        // Get offer name
        const index = position - 1;
        pricingComponent.currentOffer = Object.keys(pricingComponent.offers)[index];
        // Get offer price
        const pricing = pricingComponent.offers[pricingComponent.currentOffer];
        // Store range background sizes
        const backgroundPositions = [0, 25, 50, 75, 100];
        // Set range background size
        e.target.style.backgroundSize = `${backgroundPositions[index]}% 100%`;
        // Display offer name
        pricingComponent.nbPageViewsElement.innerText = pricingComponent.currentOffer;

        // Display offer price
        pricingComponent.displayOfferPrice();

        // Set offer input value
        pricingComponent.offerInput.value = pricingComponent.currentOffer;
    },
    onCheckboxChange: (e) => {
        // Toggle discount
        pricingComponent.discount = e.target.checked;

        // Update offer price
        pricingComponent.displayOfferPrice();
    },
    displayOfferPrice: () => {
        // Get current price
        const price = pricingComponent.offers[pricingComponent.currentOffer];
        // Has discount ?
        const discountAmount = pricingComponent.discount ? ((pricingComponent.discountPercent * price) / 100) : 0;
        // Display price
        pricingComponent.offerPriceElement.innerText = `$${price - discountAmount}.00`;
    }
};

// On dom loaded
window.addEventListener("DOMContentLoaded", () => {
    //Launch component
    pricingComponent.init();
});