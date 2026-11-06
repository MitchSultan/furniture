"use client";

import { createContext, useContext, useReducer, useEffect, useState } from "react";

const CartContext = createContext(null);
const STORAGE_KEY = "zia_cart_v1";

const initialState = {
  items: [],
  isOpen: false,
};

function cartReducer(state, action) {
  switch (action.type) {
    case "INIT":
      return { ...state, items: action.payload || [] };

    case "ADD_ITEM": {
      const existingIndex = state.items.findIndex(
        (i) => i.slug === action.payload.slug
      );
      if (existingIndex > -1) {
        const updated = [...state.items];
        updated[existingIndex].quantity += action.payload.quantity || 1;
        return { ...state, items: updated, isOpen: true };
      }
      return {
        ...state,
        items: [...state.items, { ...action.payload, quantity: action.payload.quantity || 1 }],
        isOpen: true,
      };
    }

    case "REMOVE_ITEM":
      return {
        ...state,
        items: state.items.filter((i) => i.slug !== action.payload.slug),
      };

    case "UPDATE_QUANTITY": {
      const { slug, quantity } = action.payload;
      if (quantity <= 0) {
        return {
          ...state,
          items: state.items.filter((i) => i.slug !== slug),
        };
      }
      return {
        ...state,
        items: state.items.map((i) =>
          i.slug === slug ? { ...i, quantity } : i
        ),
      };
    }

    case "CLEAR":
      return { ...state, items: [] };

    case "OPEN_DRAWER":
      return { ...state, isOpen: true };

    case "CLOSE_DRAWER":
      return { ...state, isOpen: false };

    case "TOGGLE_DRAWER":
      return { ...state, isOpen: !state.isOpen };

    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  const [mounted, setMounted] = useState(false);

  // Load from localStorage on mount (SSR guard)
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          dispatch({ type: "INIT", payload: parsed });
        }
      }
    } catch {
      // Ignore storage errors
    }
    setMounted(true);
  }, []);

  // Save to localStorage when items change
  useEffect(() => {
    if (!mounted) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.items));
    } catch {
      // Ignore storage errors
    }
  }, [state.items, mounted]);

  const addItem = (product, quantity = 1) => {
    dispatch({ type: "ADD_ITEM", payload: { ...product, quantity } });
  };

  const removeItem = (slug) => {
    dispatch({ type: "REMOVE_ITEM", payload: { slug } });
  };

  const updateQuantity = (slug, quantity) => {
    dispatch({ type: "UPDATE_QUANTITY", payload: { slug, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: "CLEAR" });
  };

  const openDrawer = () => dispatch({ type: "OPEN_DRAWER" });
  const closeDrawer = () => dispatch({ type: "CLOSE_DRAWER" });
  const toggleDrawer = () => dispatch({ type: "TOGGLE_DRAWER" });

  const totalItems = state.items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotalKES = state.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const subtotalUSD = state.items.reduce(
    (sum, item) => sum + (item.priceUSD || Math.round(item.price / 130)) * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        items: state.items,
        isOpen: state.isOpen,
        totalItems,
        subtotalKES,
        subtotalUSD,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        openDrawer,
        closeDrawer,
        toggleDrawer,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return ctx;
}
