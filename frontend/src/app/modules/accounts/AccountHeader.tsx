import { FC, useContext, useEffect, useState } from "react";
import { KTIcon, toAbsoluteUrl } from "../../../_metronic/helpers";
import { Link } from "react-router-dom";
import { Dropdown1 } from "../../../_metronic/partials";
import { useLocation } from "react-router";
import { ToolbarWrapper } from "../../../_metronic/layout/components/toolbar";
import { Content } from "../../../_metronic/layout/components/content";
import { FormDataContext } from "./components/settings/cards/FormDataContext";
import { setLanguage } from "../../../_metronic/i18n/Metronici18n";
import { FormattedMessage, useIntl } from "react-intl";
import axios from "axios";
import { PricingPlan } from "../../../_metronic/partials/modals/pricing_plans/PricingPlan";

import { useLang } from "../../../_metronic/i18n/Metronici18n";
import CurrencyConverter from "currency-converter-lt";
import { useTranslation } from "react-i18next";
import { Translation } from "react-i18next";

import moment from "moment-timezone";

import "moment-timezone";

type LocationState = {
  formData?: {
    language: string;
    location: string;
  };
};

type Plan = "Startup" | "Professional" | "Enterprise";

const basePrices: Record<Plan, number> = {
  Startup: 9,
  Professional: 25,
  Enterprise: 99,
};

//Conversion Rate
const conversionRates = {
  USD: 1,
  GBP: 0.76,
  JPY: 144.35,
  SEK: 10.18,
  CAD: 1.35,
  AUD: 1.47,
  CHF: 0.85,
} as const;

type Currency = keyof typeof conversionRates;

const convertPrice = (
  price: number,
  fromCurrency: Currency,
  toCurrency: Currency
): number => {
  const baseInUSD = price / conversionRates[fromCurrency]; // Convert to USD first
  return baseInUSD * conversionRates[toCurrency]; // Convert from USD to the new currency
};

const AccountHeader: FC = () => {
  const intl = useIntl();
  const location = useLocation();
  // const formData = useContext(FormDataContext);
  const { country, language, currency, timeZone } = useContext(FormDataContext);
  console.log("currency value", currency);
  const regionTimeMoment = moment.tz(new Date(), timeZone);
  const regionTime = regionTimeMoment.format(" MM DD YYYY HH:mm:ss");
  // + regionTimeMoment.format("Z");
  let timeZone1 = "Asia/kolkata";
  const regionTimeMoment1 = moment.tz(new Date(), timeZone1);
  const createdTime = regionTimeMoment1.format(" MM DD YYYY HH:mm:ss");
  const [i18n] = useTranslation("messages");
  const { t } = useTranslation();
  const [data, setData] = useState([]);
  const [error, setError] = useState<string | null>(null);
  const { selectedPlan, setSelectedPlan, selectedPrice, setSelectedPrice } =
    useContext(FormDataContext);
  const { formatMessage } = useIntl();

  const [previousCurrency, setPreviousCurrency] = useState<Currency>("USD");

  useEffect(() => {
    if (currency && selectedPrice) {
      // Convert the price when the currency changes
      const currentPriceNumber = parseFloat(selectedPrice);
      const newPrice = convertPrice(
        currentPriceNumber,
        previousCurrency,
        currency as Currency
      );
      setSelectedPrice(newPrice.toString());
      setPreviousCurrency(currency as Currency);
    }
  }, [currency, previousCurrency, selectedPrice]);

  const handlePlanSelect = (plan: Plan) => {
    setSelectedPlan(plan);
    const basePrice = basePrices[plan];
    const convertedPrice = convertPrice(basePrice, "USD", currency as Currency); // Convert base price to the selected currency
    setSelectedPrice(convertedPrice.toString());
  };
  return (
    <>
      <ToolbarWrapper />
      <Content>
        <div className="card mb-5 mb-xl-10">
          <div className="card-body pt-9 pb-0">
            <div className="d-flex flex-wrap flex-sm-nowrap mb-3">
              <div className="me-7 mb-4">
                <div className="symbol symbol-100px symbol-lg-160px symbol-fixed position-relative">
                  <img
                    src={toAbsoluteUrl("/media/avatars/300-1.jpg")}
                    alt="Metronic"
                  />
                  <div className="position-absolute translate-middle bottom-0 start-100 mb-6 bg-success rounded-circle border border-4 border-white h-20px w-20px"></div>
                </div>
              </div>

              <div className="flex-grow-1">
                <div className="d-flex justify-content-between align-items-start flex-wrap mb-2">
                  <div className="d-flex flex-column">
                    <div className="d-flex align-items-center mb-2">
                      <a
                        href="#"
                        className="text-gray-800 text-hover-primary fs-2 fw-bolder me-1"
                      >
                        {/* Max Smith */}
                        {intl.formatMessage({ id: "NAME" })}
                      </a>
                      <a href="#">
                        <KTIcon
                          iconName="verify"
                          className="fs-1 text-primary"
                        />
                      </a>
                      <a
                        href="#"
                        className="btn btn-sm btn-light-success fw-bolder ms-2 fs-8 py-1 px-3"
                        data-bs-toggle="modal"
                        data-bs-target="#kt_modal_upgrade_plan"
                      >
                        {/* Upgrade to Pro */}
                        {intl.formatMessage({ id: "Upgrade to pro" })}
                      </a>
                      <a
                        href="#"
                        className="btn btn-sm btn-light-primary fw-bolder ms-2 fs-8 py-1 px-3"
                        data-bs-toggle="modal"
                        data-bs-target="#kt_modal_pricing_plan"
                      >
                        {/* Pricing Plans */}
                        {intl.formatMessage({ id: "Pricing.Plans" })}
                      </a>
                      <PricingPlan />
                    </div>

                    <div className="d-flex flex-wrap fw-bold fs-6 mb-4 pe-2">
                      <a
                        href="#"
                        className="d-flex align-items-center text-gray-500 text-hover-primary me-5 mb-2"
                      >
                        <KTIcon
                          iconName="profile-circle"
                          className="fs-4 me-1"
                        />
                        {/* Developer */}
                        {intl.formatMessage({ id: "Developer" })}
                      </a>
                      <a
                        href="#"
                        className="d-flex align-items-center text-gray-500 text-hover-primary me-5 mb-2"
                      >
                        <KTIcon iconName="geolocation" className="fs-4 me-1" />

                        {intl.formatMessage({ id: `countries.${country}` })}
                      </a>
                      <a
                        href="#"
                        className="d-flex align-items-center text-gray-500 text-hover-primary mb-2"
                        style={{ marginRight: "15px" }}
                      >
                        <KTIcon iconName="sms" className="fs-4 me-1" />
                        max@kt.com
                      </a>
                      <a
                        href="#"
                        className="d-flex align-items-center text-gray-500 text-hover-primary me-5 mb-2"
                      >
                        <KTIcon iconName="language" className="fs-4 me-1" />

                        {/* {language} */}
                        {intl.formatMessage({ id: `languages.${language}` })}
                      </a>
                      <a
                        href="#"
                        className="d-flex align-items-center text-gray-500 text-hover-primary me-5 mb-2"
                      >
                        <KTIcon iconName="language" className="fs-4 me-1" />
                        {/* {currency} */}
                        {intl.formatMessage({ id: `currencies.${currency}` })}
                        {/* {selectedPrice} */}
                        {selectedPrice && (
                          <span className="ms-2 fs-6">({selectedPrice})</span>
                        )}{" "}
                        {currency}
                      </a>
                      <a
                        href="#"
                        className="d-flex align-items-center text-gray-500 text-hover-primary me-5 mb-2"
                      >
                        <KTIcon iconName="language" className="fs-4 me-1" />

                        {intl.formatMessage({ id: `timezones.${timeZone}` })}
                        {regionTime}
                      </a>
                      <a
                        href="#"
                        className="d-flex align-items-center text-gray-500 text-hover-primary me-5 mb-2"
                      >
                        <KTIcon iconName="language" className="fs-4 me-1" />

                        {intl.formatMessage({ id: "Created Time" })}
                        {createdTime}
                      </a>
                    </div>
                  </div>

                  <div className="d-flex my-4">
                    <a
                      href="#"
                      className="btn btn-sm btn-light me-2"
                      id="kt_user_follow_button"
                    >
                      <KTIcon iconName="check" className="fs-3 d-none" />

                      <span className="indicator-label">
                        {" "}
                        {intl.formatMessage({ id: "Follow" })}
                      </span>
                      <span className="indicator-progress">
                        Please wait...
                        <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
                      </span>
                    </a>
                    <a
                      href="#"
                      className="btn btn-sm btn-primary me-3"
                      data-bs-toggle="modal"
                      data-bs-target="#kt_modal_offer_a_deal"
                    >
                      {/* Hire Me */}
                      {intl.formatMessage({ id: "Hire Me" })}
                      {/* {t("Hire Me")} */}
                    </a>
                    <div className="me-0">
                      <button
                        className="btn btn-sm btn-icon btn-bg-light btn-active-color-primary"
                        data-kt-menu-trigger="click"
                        data-kt-menu-placement="bottom-end"
                        data-kt-menu-flip="top-end"
                      >
                        <i className="bi bi-three-dots fs-3"></i>
                      </button>
                      <Dropdown1 />
                    </div>
                  </div>
                </div>

                <div className="d-flex flex-wrap flex-stack">
                  <div className="d-flex flex-column flex-grow-1 pe-8">
                    <div className="d-flex flex-wrap">
                      <div className="border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3">
                        <div className="d-flex align-items-center">
                          <KTIcon
                            iconName="arrow-up"
                            className="fs-3 text-success me-2"
                          />
                          <div className="fs-2 fw-bolder">4500$</div>
                        </div>

                        <div className="fw-bold fs-6 text-gray-500">
                          Earnings
                        </div>
                      </div>

                      <div className="border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3">
                        <div className="d-flex align-items-center">
                          <KTIcon
                            iconName="arrow-down"
                            className="fs-3 text-danger me-2"
                          />
                          <div className="fs-2 fw-bolder">75</div>
                        </div>

                        <div className="fw-bold fs-6 text-gray-500">
                          Projects
                        </div>
                      </div>

                      <div className="border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3">
                        <div className="d-flex align-items-center">
                          <KTIcon
                            iconName="arrow-up"
                            className="fs-3 text-success me-2"
                          />
                          <div className="fs-2 fw-bolder">60%</div>
                        </div>

                        <div className="fw-bold fs-6 text-gray-500">
                          Success Rate
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="d-flex align-items-center w-200px w-sm-300px flex-column mt-3">
                    <div className="d-flex justify-content-between w-100 mt-auto mb-2">
                      <span className="fw-bold fs-6 text-gray-500">
                        Profile Compleation
                      </span>
                      <span className="fw-bolder fs-6">50%</span>
                    </div>
                    <div className="h-5px mx-3 w-100 bg-light mb-3">
                      <div
                        className="bg-success rounded h-5px"
                        role="progressbar"
                        style={{ width: "50%" }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="d-flex overflow-auto h-55px">
              <ul className="nav nav-stretch nav-line-tabs nav-line-tabs-2x border-transparent fs-5 fw-bolder flex-nowrap">
                <li className="nav-item">
                  <Link
                    className={
                      `nav-link text-active-primary me-6 ` +
                      (location.pathname === "/crafted/account/overview" &&
                        "active")
                    }
                    to="/crafted/account/overview"
                  >
                    Overview
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className={
                      `nav-link text-active-primary me-6 ` +
                      (location.pathname === "/crafted/account/settings" &&
                        "active")
                    }
                    to="/crafted/account/settings"
                  >
                    Settings
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </Content>
    </>
  );
};

export { AccountHeader };
