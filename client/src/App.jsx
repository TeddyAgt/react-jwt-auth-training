import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-auto flex">
        <Suspense>
          <Outlet />
        </Suspense>
      </div>
      <Footer />
    </div>
  );
}

export default App;

