import {Suspense} from 'react'
import {Outlet} from 'react-router-dom'
import {I18nProvider} from '../_metronic/i18n/i18nProvider'
import {LayoutProvider, LayoutSplashScreen} from '../_metronic/layout/core'
import {MasterInit} from '../_metronic/layout/MasterInit'
import {AuthInit} from './modules/auth'
import {ThemeModeProvider} from '../_metronic/partials'
import { BrowserRouter as Router, Route } from 'react-router-dom';
// import {DisplayPage} from './modules/accounts/components/settings/cards'
// import {DisplayPage} from './modules/accounts/components/settings/cards/DisplayPage';
// import {SubmissionInfo} from './modules/'
import DisplayPage from './modules/accounts/components/settings/cards/DisplayPage'
const App = () => {
  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <I18nProvider>
        <LayoutProvider>
          <ThemeModeProvider>
            <AuthInit>
              {/* <Router>
            // <Route>
                  {/* <Route path="/" element={<FormPage />} /> */}
                  {/* <Route path="/display" element={<DisplayPage />} /> */}
                  {/* <Route path='/displaypage' element={<DisplayPage/>} /> */}
                {/* </Route> */}
                {/* </Router> */} 
              <Outlet />
              <MasterInit />
            </AuthInit>
          </ThemeModeProvider>
        </LayoutProvider>
      </I18nProvider>
    </Suspense>


  
  )
}

export {App}
