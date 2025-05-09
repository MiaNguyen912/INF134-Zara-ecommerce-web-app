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
