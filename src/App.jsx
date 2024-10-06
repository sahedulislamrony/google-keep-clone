import Layout from "./components/Layout";
import NotFound from "./components/NotFound";
import Archive from "./components/pages/Archive";
import Home from "./components/pages/Home";
import Label from "./components/pages/Label";
import Login from "./components/pages/Login";
import Page404 from "./components/pages/Page404";
import Reminder from "./components/pages/Reminder";
import Search from "./components/pages/Search";
import Signup from "./components/pages/Signup";
import Trash from "./components/pages/Trash";
import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";

import AuthProvider from "./contexts/AuthContext";
import { DataProvider } from "./contexts/DataContext";
import { ViewProvider } from "./contexts/ViewContext";
import "./styles/global.scss";

import { Route, BrowserRouter as Router, Routes } from "react-router-dom";


function App() {
    return (
    // Router
        <Router >
            <AuthProvider>
                <DataProvider>
                    <ViewProvider>
                        <Layout > 
                            <Routes>
                                {/* 404 Route */}
                                <Route path="*" element={<NotFound />} />
                                <Route path="/404" element={<Page404 />} />

                                {/* Private routes */}
                                <Route path="/" element={<PrivateRoute />} >
                                    <Route path="/" element={<Home />} />
                                    <Route path="reminder" element={<Reminder />} />
                                    <Route path="archive" element={<Archive />} />
                                    <Route path="label" element={<Label />} />
                                    <Route path="trash" element={<Trash />} />
                                    <Route path="search" element={<Search />} />
                                </Route>
                           
                                {/* User login || Public routes  */}  
                                <Route path="/" element={<PublicRoute />} >
                                    <Route path="login" element={<Login />} />
                                    <Route path="signup" element={<Signup />} />
                                </Route>


                            
                            </Routes>
                        </Layout>
                    </ViewProvider>
                </DataProvider>
            </AuthProvider>
        </Router>
    
    
     
    );
}

export default App;
