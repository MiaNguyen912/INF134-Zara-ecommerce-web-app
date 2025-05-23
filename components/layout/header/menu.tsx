import React from 'react'

export const menu = () => {
  return (
    <div>
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

    </div>
  )
}
