import { useEffect, lazy } from "react";
import { useParams, useNavigate, Navigate } from "react-router-dom";

const ChooseStonePage = lazy(() => import("./choose-stone/ChooseStonePage"));
const DesignPage = lazy(() => import("./design/DesignPage"));
const CheckAndOrderPage = lazy(
  () => import("./check-and-order/CheckAndOrderPage")
);
const CompletePage = lazy(() => import("./complete/CompletePage"));

interface PageComponentProps {
  onStepChange: (stepName: string) => void;
}

function PageComponent({ onStepChange }: PageComponentProps) {
  const { step } = useParams<{ step: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    if (step) {
      onStepChange(step);
    }
  }, [step, onStepChange]);

  const nextStep = () => {
    if (step === "valitse") navigate("/suunnittele/koristele");
    else if (step === "koristele") navigate("/suunnittele/tilaa");
    else if (step === "tilaa") {
      localStorage.removeItem("selectedStone");
      localStorage.removeItem("items");
      navigate("/suunnittele/valmis");
    }
  };

  const prevStep = () => {
    if (step === "koristele") navigate("/suunnittele/valitse");
    else if (step === "tilaa") navigate("/suunnittele/koristele");
    else if (step === "valmis") navigate("/suunnittele/tilaa");
  };

  switch (step) {
    case "valitse":
      return <ChooseStonePage onNavigateNext={nextStep} />;
    case "koristele":
      return (
        <DesignPage onNavigateNext={nextStep} onNavigatePrevious={prevStep} />
      );
    case "tilaa":
      return (
        <CheckAndOrderPage
          onNavigateNext={nextStep}
          onNavigatePrevious={prevStep}
        />
      );
    case "valmis":
      return <CompletePage onNavigateReturn={() => navigate("/")} />;
    default:
      return <Navigate to="suunnittele/valitse" replace />;
  }
}

export default PageComponent;
