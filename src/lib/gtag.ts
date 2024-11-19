// src/lib/gtag.ts

// Extend the Window interface to add the dataLayer property
declare global {
    interface Window {
      dataLayer: any[];
    }
  }
  
  // Your Google Analytics Measurement ID
  export const GA_TRACKING_ID = 'G-SR3X8XW7YH';
  
  // Function to initialize Google Analytics
  export const initGA = () => {
    if (typeof window !== 'undefined') {
      window.dataLayer = window.dataLayer || [];
      
      // Use a function expression instead of a function declaration
      const gtag = (...args: any[]) => {
        window.dataLayer.push(args);
      };
  
      gtag('js', new Date());
      gtag('config', GA_TRACKING_ID);
    }
  };
  