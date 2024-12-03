export const generatePriceDetails = (initialPrice) => {
    // Create an empty array to hold the price objects
    const priceDetails = [];
  
    // Loop 5 times to create 5 objects
    for (let i = 0; i < 5; i++) {
      const price = initialPrice * Math.pow(0.95, i); // Decrease price by 5% each time
      let label = '';
      let color = '';
  
      // Assign the label and color based on the price
      if (i === 0) {
        label = 'Very Good Offer'; // Highest price
        color = 'green'; // Top price - green
      } else if (i === 1) {
        label = 'Good Offer';
        color = 'green'; // Second-highest price - green
      } else if (i === 2) {
        label = 'Fair Offer';
        color = 'green'; // Third-highest price - green
      } else if (i === 3) {
        label = 'Lesser Price';
        color = 'red'; // Fourth-highest price - red
      } else {
        label = 'Seller Will Not Accept'; // Lowest price
        color = 'red'; // Lowest price - red
      }
  
      // Create an object with price, label, color, and ID
      const priceObject = {
        price: price.toFixed(2), // Price rounded to two decimal places
        label,
        color, // Add color property
        id: i + 1, // ID starting from 1
      };
  
      // Push the object into the array
      priceDetails.push(priceObject);
    }
  
    return priceDetails;
  };
  