import React, {
  useState,
  createContext,
  type Dispatch,
  type SetStateAction,
  useEffect,
} from "react";

type Context = {
  isAuthorized: boolean;
  setIsAuthorized: Dispatch<SetStateAction<boolean>>;
};

export const AuthorizationContext = createContext<Context>({
  isAuthorized: false,
  setIsAuthorized: () => {},
});

export const AuthorizationProvider = ({
  children,
}: {
  children: JSX.Element;
}) => {
  const [isAuthorized, setIsAuthorized] = useState(
    localStorage.getItem("token") === "1234"
  );

  useEffect(() => {
    if (!isAuthorized) localStorage.removeItem("token");
  }, [isAuthorized]);

  return (
    <AuthorizationContext.Provider value={{ isAuthorized, setIsAuthorized }}>
      {children}
    </AuthorizationContext.Provider>
  );
};
