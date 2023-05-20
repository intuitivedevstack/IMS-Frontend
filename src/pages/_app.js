import { Baloo_Bhai_2 } from "next/font/google";
import { Toaster } from "react-hot-toast";
const roboto = Baloo_Bhai_2({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
});
import "@/styles/globals.css";
import "@/styles/responsive.css";
import "@/styles/admin.css";
import "react-datepicker/dist/react-datepicker.css";
import "bootstrap/dist/css/bootstrap.min.css";
import store from "@/store/store";
import { Provider } from "react-redux";

function App({ Component, pageProps }) {
  return (
    <div className={roboto.className}>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
      <Toaster position="top-right" />
    </div>
  );
}

export default App;
