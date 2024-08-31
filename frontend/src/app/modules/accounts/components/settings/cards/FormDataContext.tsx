import React, {
  createContext,
  useState,
  useEffect,
  ReactNode,
  FC,
} from "react";

interface FormDataContextProps {
  country: string;
  language: string;
  currency: string;
  timeZone: string;
  selectedPlan: string;
  selectedPrice: string;
  setFormData: (data: {
    country: string;
    language: string;
    currency: string;
    timeZone: string;
  }) => void;
  setSelectedPlan: (plan: string) => void;
  setSelectedPrice: (price: string) => void;
}

const FormDataContext = createContext<FormDataContextProps>({
  country: "",
  language: "",
  currency: "",
  timeZone: "",
  selectedPlan: "",
  selectedPrice: "",
  setFormData: () => {},
  setSelectedPlan: () => {},
  setSelectedPrice: () => {},
});

const FormDataProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [formData, setFormDataState] = useState({
    country: "",
    language: "",
    currency: "",
    timeZone: "",
  });

  const [selectedPlan, setSelectedPlan] = useState<string>("");
  const [selectedPrice, setSelectedPrice] = useState<string>("");
  useEffect(() => {
    // Load data from local storage when the component mounts
    const storedData = localStorage.getItem("formData");
    if (storedData) {
      setFormDataState(JSON.parse(storedData));
    }
  }, []);

  const setFormData = (data: {
    country: string;
    language: string;
    currency: string;
    timeZone: string;
  }) => {
    setFormDataState(data);
    // Save data to local storage whenever it is set
    localStorage.setItem("formData", JSON.stringify(data));
  };

  return (
    <FormDataContext.Provider
      value={{
        ...formData,
        selectedPlan,
        selectedPrice,
        setFormData,
        setSelectedPlan,
        setSelectedPrice,
      }}
    >
      {children}
    </FormDataContext.Provider>
  );
};

export { FormDataProvider, FormDataContext };
