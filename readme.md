## Access this project online at https://zara-ecommerce-web-app.vercel.app/

You can also see the presentation at https://drive.google.com/drive/folders/129YViucFne34VaqoWvDPSN5i2bJrdD3o?usp=drive_link


## how to run this project
- clone down the project
- run `npm i`
- run `npm run dev`

## Next steps todo:
- 1. Upgrade the search function
- 2. Implement Favorited items page
- 3. display product's reviews and rating (checkout data/products.ts to see the data schema)
- 4. add a rating/review form to each product page
- 5. Build an employee system to allow uploading new product or adjust existing product

## Libraries used
- Redux toolkit to manage components' global state
- shadcn/ui library for prebuilt UI components

## Other notes
- @/app/(shop): group folder, not regular route (@/app/(shop)/cart will be accessed via http://localhost:3000/cart, not http://localhost:3000/shop/cart)

  - this helps organize routes without affecting the URL path.
  - allows to apply different layout to different groups

- set up theme with { ThemeProvider } from "next-themes". Specifi suppressHydrationWarning when use theme to suppress hydration mismatch warning
- IIFE (Immediately Invoked Function Expression): `(() => { ... })()` (defines an arrow function and calls it immediately). For example:

```
   <nav>
     {(() => {
       let prevType = "";
       const elements = [];
       for (const subcategory of subcategories[category.name as keyof typeof subcategories]) {
         if (subcategory.type !== prevType) {
           prevType = subcategory.type;
           elements.push(
             <div key={subcategory.type}>
               <p>{subcategory.type}</p>
             </div>
           );
         }
       }
       return elements;
     })()}
   </nav>
```
