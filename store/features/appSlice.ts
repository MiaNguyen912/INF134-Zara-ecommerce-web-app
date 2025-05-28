import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { categories } from "@/data/categories";

interface AppState {
  theme: "light" | "dark";
  selectedCategory: {
    id: string;
    name: string;
    slug: string;
    image: string;
  };
  showMenu: boolean;
  showSearch: boolean;
  activeCategory: string;
  isMounted: boolean;
}

const initialState: AppState = {
  theme: "light",
  selectedCategory: categories[0],
  showMenu: false,
  showSearch: false,
  activeCategory: "",
  isMounted: false,
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<"light" | "dark">) => {
      state.theme = action.payload;
    },
    setSelectedCategory: (state, action: PayloadAction<AppState["selectedCategory"]>) => {
      state.selectedCategory = action.payload; // set the selected category
    },
    setShowMenu: (state, action: PayloadAction<boolean>) => {
      state.showMenu = action.payload; // set the show menu state
    },
    setShowSearch: (state, action: PayloadAction<boolean>) => {
      state.showSearch = action.payload; // set the show search state
    },
    setActiveCategory: (state, action: PayloadAction<string>) => {
      state.activeCategory = action.payload; // set the active category
    },
    setIsMounted: (state, action: PayloadAction<boolean>) => {
      state.isMounted = action.payload; // set the is mounted state
    },
  },
});

export const { setTheme, setSelectedCategory, setShowMenu, setShowSearch, setActiveCategory, setIsMounted } = appSlice.actions;
