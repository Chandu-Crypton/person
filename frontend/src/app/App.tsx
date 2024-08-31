import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import { I18nProvider } from "../_metronic/i18n/i18nProvider";
import { LayoutProvider, LayoutSplashScreen } from "../_metronic/layout/core";
import { MasterInit } from "../_metronic/layout/MasterInit";
import { AuthInit } from "./modules/auth";
import { ThemeModeProvider } from "../_metronic/partials";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { LanguageProvider } from "./contexts/LanguageContext";
// import {DisplayPage} from './modules/accounts/components/settings/cards'
// import {DisplayPage} from './modules/accounts/components/settings/cards/DisplayPage';
// import {SubmissionInfo} from './modules/'
import { FormDataProvider } from "./modules/accounts/components/settings/cards/FormDataContext";
// import DisplayPage from "./modules/accounts/components/settings/cards/DisplayPage";
const App = () => {
  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <LanguageProvider>
        <I18nProvider>
          <LayoutProvider>
            <ThemeModeProvider>
              <AuthInit>
                <FormDataProvider>
                  <Outlet />
                  <MasterInit />
                </FormDataProvider>
              </AuthInit>
            </ThemeModeProvider>
          </LayoutProvider>
        </I18nProvider>
      </LanguageProvider>
    </Suspense>
  );
};

export { App };
