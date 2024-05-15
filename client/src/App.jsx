import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import AuthProvider from "./components/AuthProvider/AuthProvider";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <AuthProvider>
        <Header />

        <div className="flex-auto flex">
          <Suspense>
            <Outlet />
          </Suspense>
        </div>

        <Footer />
      </AuthProvider>
    </div>
  );
}

export default App;

