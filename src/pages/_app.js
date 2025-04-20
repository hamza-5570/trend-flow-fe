import AuthLayout from "@/components/auth/auth-layout";
import DashboardLayout from "@/components/dashboard/dashboard-layout";
import { ThemeProvider } from "@/components/theme-provider";
import store from "@/lib/store";
import "@/styles/globals.css";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useRouter } from "next/router";
import { Provider } from "react-redux";
import { Toaster } from "sonner";

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const { pathname } = router;
  const loadstripe = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY);

  let Layout = ({ children }) => <>{children}</>;
  if (/^\/dashboard/.test(pathname)) {
    Layout = DashboardLayout;
  } else if (/^\/auth/.test(pathname)) {
    Layout = AuthLayout;
  }

  return (
    <Provider store={store}>
      <Elements stripe={loadstripe}>
        <ThemeProvider
          attribute="className"
          defaultTheme="light"
          disableTransitionOnChange
          enableSystem={false}
        >
          <Layout>
            <Component {...pageProps} />
            <Toaster richColors position="top-center" />
          </Layout>
        </ThemeProvider>
      </Elements>
    </Provider>
  );
}
