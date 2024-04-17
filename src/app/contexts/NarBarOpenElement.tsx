"use client";
import {
  createContext,
  useContext,
  useState,
  Dispatch,
  SetStateAction,
} from "react";

export const OpenElementContext = createContext<{
  openElement: string | null;
  setOpenElement: Dispatch<SetStateAction<string | null>>;
}>({
  openElement: null,
  setOpenElement: () => {},
});

export const useOpenElement = () => useContext(OpenElementContext);

export const NarBarOpenElementProvider = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const [openElement, setOpenElement] = useState<string | null>(null);

  return (
    <OpenElementContext.Provider value={{ openElement, setOpenElement }}>
      {children}
    </OpenElementContext.Provider>
  );
};
