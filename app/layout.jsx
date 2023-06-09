import "./globals.css";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import Provider from "../components/Provider";
import { Toaster } from "react-hot-toast";
export const metadata = {
  title: "Note app",
  description: "Keep track keep tab of things",
};

const RootLayout = ({children}) => {
  return (
    <html lang="en">
      <body>
        <Provider>
          <Toaster/>
          <Navigation />
          {children}
          <Footer />
        </Provider>
      </body>
    </html>
  );
};

export default RootLayout;
