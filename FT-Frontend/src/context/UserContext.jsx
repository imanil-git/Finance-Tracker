import { createContext, useContext, useState } from "react";
import { fetchTransaction } from "../../helpers/axiosHelper";

export const UserContext = createContext();

export const UseProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [transactions, setTransactions] = useState([]);
  const [show, setShow] = useState(false);

  const toogleModal = (value) => setShow(value);

  const getTransactions = async () => {
    // call axios helper to call api
    const { status, transactions } = await fetchTransaction();

    //recieve data and mount to the transactions by setTransactions()
    status === "success" && setTransactions(transactions);
  };

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        transactions,
        getTransactions,
        toogleModal,
        show,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
