import { createContext, useContext, useState } from "react";

const PageProgressContext = createContext();

export const PageProgressProvider = ({ children }) => {
  const [page1Completed, setPage1Completed] = useState(false);
  const [page2Completed, setPage2Completed] = useState(false);

  return (
    <PageProgressContext.Provider
      value={{ page1Completed, setPage1Completed, page2Completed, setPage2Completed }}
    >
      {children}
    </PageProgressContext.Provider>
  );
};

export const usePageProgress = () => useContext(PageProgressContext);
