import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { Footer } from "./Footer";

export const DefaultLayout = () => {
  return (
    <div>
      {/* Header  */}
      <Header />

      {/* Main Content */}
      <main className="main">
        <Outlet />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};
