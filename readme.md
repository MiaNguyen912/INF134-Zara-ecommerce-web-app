## how to run this project

- `npm i`
- `npm run dev`

## TODO

- 1. (done) update menu according to figma prototype and A5's "Proposed Changes" part (Move the “best sellers” feature closer to “trending items” in the main menu or provide a text link consistent with other categories)
- 3. (done) add filtering/sorting button
- 4. (done-partially) implement the search function
- 5. (done) set "S" as current user size preference, move color option from the hover panel outside, make user pick a color before adding to card
- 6. (done) in Product detail page, add alert for add-to-cart button (or a modal pop up on the right side)

- 7. make a page to store favorited items
- 8. display product's reviews and rating (checkout data/products.ts to see the data schema)
- 9. add a rating/review form to each product page
- 10. make an employee system to allow uploading new product or adjust existing product

## Libraries used

- Redux toolkit to manage components' global state
- shadcn/ui library for prebuilt UI components

## other notes

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
