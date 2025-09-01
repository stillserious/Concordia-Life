import { Switch, Route, useLocation } from "wouter";
import { useEffect } from "react";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import HomePage from "@/pages/home";
import ClaimVehiclePage from "@/pages/claim-vehicle";
import ClaimPropertyPage from "@/pages/claim-property";
import ClaimPeoplePage from "@/pages/claim-people";
import ClaimVehicleACPage from "@/pages/claim-vehicle-ac";
import ClaimVehicleACIncidentTypePage from "@/pages/claim-vehicle-ac-incident-type";
import ClaimVehicleACCollisionVehiclePage from "@/pages/claim-vehicle-ac-collision-vehicle";
import ClaimVehicleACVehicleDataPage from "@/pages/claim-vehicle-ac-vehicle-data";
import ClaimVehicleACDamagePage from "@/pages/claim-vehicle-ac-damage";
import ClaimVehicleACDocumentsPage from "@/pages/claim-vehicle-ac-documents";
import NotFound from "@/pages/not-found";
function ScrollToTop() {
  const [location] = useLocation();
  
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location]);
  
  return null;
}

function Router() {
  return (
    <>
      <ScrollToTop />
      <Switch>
        <Route path="/" component={HomePage} />
        <Route path="/claim/vehicle" component={ClaimVehiclePage} />
        <Route path="/claim/vehicle/ac" component={ClaimVehicleACPage} />
        <Route path="/claim/vehicle/ac/incident-type" component={ClaimVehicleACIncidentTypePage} />
        <Route path="/claim/vehicle/ac/collision-vehicle" component={ClaimVehicleACCollisionVehiclePage} />
        <Route path="/claim/vehicle/ac/vehicle-data" component={ClaimVehicleACVehicleDataPage} />
        <Route path="/claim/vehicle/ac/damage" component={ClaimVehicleACDamagePage} />
        <Route path="/claim/vehicle/ac/documents" component={ClaimVehicleACDocumentsPage} />
        <Route path="/claim/property" component={ClaimPropertyPage} />
        <Route path="/claim/people" component={ClaimPeoplePage} />
        <Route component={NotFound} />
      </Switch>
    </>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
