"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { categories, subcategories } from "@/data/categories";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { setSelectedCategory, setShowMenu } from "@/store/features/appSlice";
import { useScreenType } from "@/hooks/useScreenType";

export function Menu() {
  const dispatch = useAppDispatch();
  const selectedCategory = useAppSelector((state) => state.app.selectedCategory);
  const showMenu = useAppSelector((state) => state.app.showMenu);
  const [isDesktop, isTablet, isMobile] = useScreenType();

  const handleSubcategoryClick = () => {
    dispatch(setShowMenu(false));
  };

  return (
    <div>
      {isDesktop ? (
        <div className={`bg-gray-200 w-full  px-20 ${showMenu ? "h-fit pt-8 pb-4" : "h-0"} overflow-hidden transition-all duration-300 ease-in-out`}>
          <nav className="flex justify-around p-4">
            {/* main categories */}
            {categories.map((category) => (
              <div key={category.id} className="w-full">
                <div className={`border-b-2 border-black w-full flex justify-center pb-4 ${category.name === selectedCategory.name ? "border-b-4" : ""} transition-all duration-300 ease-in-out`}>
                  <Button variant="ghost" onClick={() => dispatch(setSelectedCategory(category))} className="text-sm hover:font-bold hover:bg-transparent">
                    {category.name}
                  </Button>
                </div>
              </div>
            ))}
          </nav>

          {/* Desktop subcategories */}
          <div className="mt-4">
            <nav className="max-h-80 grid grid-flow-col grid-rows-4 gap-4 overflow-y-auto">
              {(() => {
                let prevType = "";
                const elements = [];
                for (const subcategory of subcategories[selectedCategory.name as keyof typeof subcategories]) {
                  if (subcategory.type !== prevType) {
                    prevType = subcategory.type;
                    elements.push(
                      <div key={subcategory.type} className="pt-2">
                        <p className="font-bold">{subcategory.type}</p>
                      </div>
                    );
                  }
                  elements.push(
                    <Link onClick={handleSubcategoryClick} key={subcategory.id} href={`/catalog/${selectedCategory.slug}/${subcategory.slug}`} className="block p-3 text-sm border-b border-gray-100">
                      {subcategory.name}
                    </Link>
                  );
                }
                return elements;
              })()}
            </nav>
          </div>
        </div>
      ) : (
        // Mobile menu using Sheet
        <Sheet open={showMenu} onOpenChange={(open) => dispatch(setShowMenu(open))}>
          <SheetContent side="right" className="w-[50%] p-0">
            <div className="h-full flex flex-col">
              {/* Main categories */}
              <nav className="flex flex-col p-4 border-b">
                {categories.map((category) => (
                  <Button
                    key={category.id}
                    variant="ghost"
                    onClick={() => dispatch(setSelectedCategory(category))}
                    className={`justify-start text-sm hover:font-bold hover:bg-transparent ${category.name === selectedCategory.name ? "font-bold" : ""}`}>
                    {category.name}
                  </Button>
                ))}
              </nav>

              {/* Mobile subcategories */}
              {selectedCategory && (
                <div className="flex-1 overflow-y-auto">
                  <nav className="p-4">
                    {(() => {
                      let prevType = "";
                      const elements = [];
                      for (const subcategory of subcategories[selectedCategory.name as keyof typeof subcategories]) {
                        if (subcategory.type !== prevType) {
                          prevType = subcategory.type;
                          elements.push(
                            <div key={subcategory.type} className="pt-4 pb-2">
                              <p className="font-bold text-sm">{subcategory.type}</p>
                            </div>
                          );
                        }
                        elements.push(
                          <Link
                            key={subcategory.id}
                            href={`/catalog/${selectedCategory.slug}/${subcategory.slug}`}
                            onClick={handleSubcategoryClick}
                            className="block py-2 text-sm border-b border-gray-100">
                            {subcategory.name}
                          </Link>
                        );
                      }
                      return elements;
                    })()}
                  </nav>
                </div>
              )}
            </div>
          </SheetContent>
        </Sheet>
      )}
    </div>
  );
}
