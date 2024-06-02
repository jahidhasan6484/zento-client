// /* eslint-disable react/prop-types */
// import { jwtDecode } from "jwt-decode";
// import { createContext, useEffect, useState } from "react";
// import Loading from "../components/shared/Loading";

// export const JWTContext = createContext();

// export const JWTProvider = ({ children }) => {
//   const [loading, setLoading] = useState(true);
//   const [userRole, setUserRole] = useState("");

//   useEffect(() => {
//     setLoading(true);
//     const token = localStorage.getItem("token");
//     if (token) {
//       const decoded = jwtDecode(token);
//       setUserRole(decoded.role);
//     }

//     setLoading(false);
//   }, []);

//   if (loading) {
//     return <Loading />;
//   }

//   return (
//     <JWTContext.Provider value={{ userRole }}>{children}</JWTContext.Provider>
//   );
// };
