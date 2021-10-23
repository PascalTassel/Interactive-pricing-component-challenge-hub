var pricingComponent = {
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
    init: function () {
        // Get DOM elements
        this.rangeElement = document.getElementById('priceRange');
        this.checkboxElement = document.getElementById('billingCheckbox');
        this.nbPageViewsElement = document.getElementById('nbPageViews');
        this.offerPriceElement = document.getElementById('offerPrice');
        this.offerInput = document.getElementById('offerInput');

        // Listen range
        this.rangeElement.addEventListener('input', pricingComponent.onRangeChange);

        // Listen checkbox
        this.checkboxElement.addEventListener('change', pricingComponent.onCheckboxChange);

        // Launch events
        this.rangeElement.dispatchEvent(new Event('input'));
        this.checkboxElement.dispatchEvent(new Event('change'));
        
    },
    onRangeChange: function () {
        // Get range position
        var position = Number(this.value);
        // Get offer name
        var index = position - 1;
        pricingComponent.currentOffer = Object.keys(pricingComponent.offers)[index];
        // Get offer price
        var pricing = pricingComponent.offers[pricingComponent.currentOffer];
        // Store range background sizes
        var backgroundPositions = [0, 25, 50, 75, 100];
        // Set range background size
        this.style.backgroundSize = `${backgroundPositions[index]}% 100%`;
        // Display offer name
        pricingComponent.nbPageViewsElement.innerText = pricingComponent.currentOffer;

        // Display offer price
        pricingComponent.displayOfferPrice();

        // Set offer input value
        pricingComponent.offerInput.value = pricingComponent.currentOffer;
    },
    onCheckboxChange: function () {
        // Toggle discount
        pricingComponent.discount = this.checked;

        // Update offer price
        pricingComponent.displayOfferPrice();
    },
    displayOfferPrice: function () {
        // Get current price
        var price = this.offers[this.currentOffer];
        // Has discount ?
        var discountAmount = this.discount ? ((this.discountPercent * price) / 100) : 0;
        // Display price
        this.offerPriceElement.innerText = `$${price - discountAmount}.00`;
    }
};

// Launch component
pricingComponent.init();