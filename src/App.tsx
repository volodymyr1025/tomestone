import React, { useEffect, Suspense, lazy } from "react";
import { ThemeProvider } from "@mui/material";
import { Routes, Route, Navigate } from "react-router-dom";
import theme from "./theme";
import Header from "./components/header/Header";
import ProgressBar from "./components/header/ProgressBar";

const StoneManagementPage = lazy(() => import("./components/admin/stone"));
const SymbolManagementPage = lazy(() => import("./components/admin/symbol"));
const DashboardPage = lazy(
  () => import("./components/dashboard/DashboardPage")
);
const FAQPage = lazy(() => import("./components/faq/FaqPage"));
const AdminAuthPage = lazy(() => import("./components/admin/dashboard"));

import PrivateRoute from "./PrivateRoute";
import { AuthProvider } from "./AuthContext";
import { getSymbols } from "./features/symbols/symbolsActions";
import { getStones } from "./features/stones/stonesActions";
import { useAppDispatch } from "./hooks";
import SharedProduct from "./components/SharedProduct";
import PageComponent from "./components/PageComponent";
import LoadingComponent from "./shared-components/LoadingComponent";
import TombStonePricePage from "./components/TombStonePricePage";
import NatureTombStonePage from "./components/NatureTombStonePage";
import ContactPage from "./components/ContactPage";
import PaymentTermsPage from "./components/PaymentTermsPage";

function App() {
  const [currentStep, setCurrentStep] = React.useState(0);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getSymbols());
    dispatch(getStones());
  }, [dispatch]);

  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <Header />
        <ProgressBar step={currentStep} />
        <Suspense fallback={<LoadingComponent />}>
          <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route
              path="/hautakivien-hinnat"
              element={<TombStonePricePage />}
            />
            <Route
              path="/luonnon-hautakivet"
              element={<NatureTombStonePage />}
            />
            <Route path="/Yhteystiedot" element={<ContactPage />} />
            <Route
              path="/toimitus-ja-maksuehdot"
              element={<PaymentTermsPage />}
            />
            <Route
              path="/suunnittele"
              element={<Navigate to="/suunnittele/valitse" replace />}
            />
            <Route
              path="/admin"
              element={<Navigate to="/admin/auth" replace />}
            />
            <Route path="/tuote/:productId" element={<SharedProduct />} />
            <Route path="/admin/auth" element={<AdminAuthPage />} />
            <Route path="faq" element={<FAQPage />} />
            <Route
              path="/admin/stone"
              element={
                <PrivateRoute>
                  <StoneManagementPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/admin/symbol"
              element={
                <PrivateRoute>
                  <SymbolManagementPage />
                </PrivateRoute>
              }
            />
            <Route
              path="suunnittele/:step"
              element={
                <PageComponent
                  onStepChange={(stepName: string) => {
                    const stepMapping: Record<string, number> = {
                      valitse: 0,
                      koristele: 1,
                      tilaa: 2,
                      valmis: 3,
                    };
                    const stepIndex = stepMapping[stepName] ?? 0;
                    setCurrentStep(stepIndex);
                  }}
                />
              }
            />
          </Routes>
        </Suspense>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
