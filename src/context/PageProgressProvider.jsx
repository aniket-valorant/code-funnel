import { createContext, useContext, useState } from "react";

const PageProgressContext = createContext();

export const PageProgressProvider = ({ children }) => {
  const [page1Completed, setPage1Completed] = useState(false);
  const [page2Completed, setPage2Completed] = useState(false);

  const currentStep =
    page1Completed && page2Completed ? 3 : page1Completed ? 2 : 1;

  return (
    <PageProgressContext.Provider
      value={{
        page1Completed,
        page2Completed,
        setPage1Completed,
        setPage2Completed,
        currentStep
      }}
    >
      {children}
    </PageProgressContext.Provider>
  );
};

export const usePageProgress = () => useContext(PageProgressContext);
