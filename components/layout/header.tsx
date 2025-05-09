"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, ShoppingBag, Menu, X, SunIcon, MoonIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { categories, subcategories } from "@/data/categories";
import { useCart } from "@/hooks/useCart";
import { useScreenType } from "@/hooks/useScreenType";
import { useTheme } from "next-themes";

export function Header() {
  const [showSearch, setShowSearch] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [activeCategory, setActiveCategory] = useState("");
  const { getItemCount } = useCart();
  const itemCount = getItemCount();
  const [isMobile, isTablet, isDesktop] = useScreenType();
  const { theme, setTheme, systemTheme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);

  useEffect(() => {
    setIsMounted(true); // prevent hydration error
  }, []);
  if (!isMounted) return null; // prevent hydration error

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white transition-all duration-300 border-b-black border-b-1">
      <div className="mx-auto ">
        {/* Desktop navigation */}
        {isDesktop ? (
          <div className="h-20 flex items-center justify-between px-20">
            {/* Menu */}
            <Button variant="ghost" size="icon" onClick={() => setShowMenu(!showMenu)} className="relative border-none hover:bg-transparent hover:font-bold text-sm">
              MENU
            </Button>

            {/* New */}
            <Link href="/new">
              <Button variant="ghost" size="icon" className="relative hover:bg-transparent hover:font-bold text-sm" aria-label="New">
                NEW
              </Button>
            </Link>

            {/* Search Toggle */}
            <Button variant="ghost" size="icon" onClick={() => setShowSearch(!showSearch)} className="relative border-none hover:bg-transparent hover:font-bold text-sm" aria-label="Search">
              SEARCH
            </Button>

            {/* Logo */}
            <Link href="/home" className="font-bold text-xl tracking-widest w-[40%]">
              <Image src="/svg/logo.svg" alt="Logo" width={0} height={0} className="h-10 mx-auto my-6 w-fit" />
            </Link>

            {/* log in */}
            <Link href="/login">
              <Button variant="ghost" size="icon" className="relative hover:bg-transparent hover:font-bold text-sm" aria-label="Login">
                LOGIN
              </Button>
            </Link>

            {/* Help */}
            <Link href="/help">
              <Button variant="ghost" size="icon" className="relative hover:bg-transparent hover:font-bold text-sm" aria-label="Help">
                HELP
              </Button>
            </Link>

            {/* Cart */}
            <Link href="/cart">
              <Button variant="ghost" size="icon" className="relative hover:bg-transparent hover:font-bold text-sm" aria-label="Cart">
                CART [{itemCount}]
              </Button>
            </Link>
          </div>
        ) : (
          // mobile navigation
          <div className="h-16 flex items-center justify-between w-full px-4">
            {/* Logo */}
            <Link href="/home" className="font-bold text-xl tracking-widest">
              <Image src="/svg/logo.svg" alt="Logo" width={0} height={0} className="h-10 mx-auto my-6 w-fit" />
            </Link>

            <div className="flex items-center space-x-4">
              {/* Search Toggle */}
              <Button variant="ghost" size="icon" onClick={() => setShowSearch(!showSearch)} className="relative border-none hover:bg-transparent hover:font-bold" aria-label="Search">
                <Search className="h-5 w-5" />
              </Button>

              {/* Cart */}
              <Link href="/cart">
                <Button variant="ghost" size="icon" className="relative" aria-label="Cart">
                  <ShoppingBag className="h-5 w-5" />
                </Button>
              </Link>

              {/* Menu */}
              <Button variant="ghost" size="icon" onClick={() => setShowMenu(!showMenu)} className="relative border-none hover:bg-transparent hover:font-bold">
                <Menu className="h-5 w-5" />
              </Button>

              {/* <div className="flex items-center space-x-4">
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="ghost" size="icon" className="md:hidden" aria-label="Menu">
                      <Menu className="h-5 w-5" />
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="right" className="p-0 w-full sm:max-w-sm">
                    <div className="h-full flex flex-col">
                      <div className="p-4 border-b flex justify-end">
                        <SheetTrigger asChild>
                          <Button variant="ghost" size="icon" aria-label="Close menu">
                            <X className="h-5 w-5" />
                          </Button>
                        </SheetTrigger>
                      </div>
                      <div className="flex flex-col flex-1 overflow-auto">
                        {categories.map((category) => (
                          <div key={category.id}>
                            <button
                              className={cn("w-full text-left p-4 border-b text-sm font-medium flex justify-between items-center", activeCategory === category.id ? "bg-gray-50" : "")}
                              onClick={() => setActiveCategory(activeCategory === category.id ? "" : category.id)}>
                              {category.name}
                              <span>{activeCategory === category.id ? "−" : "+"}</span>
                            </button>
                            {activeCategory === category.id && subcategories[category.slug as keyof typeof subcategories] && (
                              <div className="pl-8 bg-gray-50">
                                {subcategories[category.slug as keyof typeof subcategories].map((subcategory) => (
                                  <Link key={subcategory.id} href={`/catalog/${category.slug}/${subcategory.slug}`} className="block p-3 text-sm border-b border-gray-100">
                                    {subcategory.name}
                                  </Link>
                                ))}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </SheetContent>
                </Sheet>
              </div> 
              */}
            </div>
          </div>
        )}

        {/* Menu */}
        <div className={`${showMenu ? "h-fit" : "h-0"} overflow-hidden transition-all duration-300 ease-in-out`}>
          <div className="bg-gray-200 w-full h-full pt-8 pb-4 px-20">
            <nav className="flex justify-around p-4 ">
              {categories.map((category) => (
                // main category
                <div key={category.id} className="w-full">
                  <div className={`border-b-2 border-black w-full flex justify-center pb-4 ${category.name === selectedCategory.name ? "border-b-4" : ""} transition-all duration-300 ease-in-out`}>
                    {/* click one time: change category, click again: go to category page */}
                    <Button
                      variant="ghost"
                      onClick={() => (category.name !== selectedCategory.name ? setSelectedCategory(category) : window.location.replace(`/catalog/${category.slug}`))}
                      className="text-sm hover:font-bold hover:bg-transparent">
                      {category.name}
                    </Button>
                  </div>
                </div>
              ))}
            </nav>

            {/* subcategories */}
            <div className="mt-4">
              <nav className="max-h-80 grid grid-flow-col grid-rows-4 overflow-y-auto">
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
                      <Link key={subcategory.id} href={`/catalog/${selectedCategory.slug}/${subcategory.slug}`} className="block p-3 text-sm border-b border-gray-100">
                        {subcategory.name}
                      </Link>
                    );
                  }
                  return elements;
                })()}
              </nav>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className={`overflow-hidden transition-all duration-300 ease-in-out ${showSearch ? "h-16 opacity-100 mb-4" : "h-0 opacity-0"}`}>
          <div className="py-4 flex items-center w-[30%] mx-auto">
            <Search className="h-5 w-5 mr-2 text-gray-400" />
            <Input placeholder="Search products..." className="border-0 focus-visible:ring-0 bg-transparent text-sm" autoFocus={showSearch} />
            <Button variant="ghost" size="sm" onClick={() => setShowSearch(false)}>
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
