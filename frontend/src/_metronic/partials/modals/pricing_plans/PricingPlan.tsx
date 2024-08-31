import { FC, useState, useEffect, useContext } from "react";
import { KTIcon } from "../../../helpers";
import { FormDataContext } from "../../../../app/modules/accounts/components/settings/cards/FormDataContext";
import { useNavigate } from "react-router-dom";
const plansByCurrency = {
  GBP: [
    {
      title: "Startup",
      subTitle: "Best for startups",
      description: "Optimal for 10+ team size and new startup",
      priceMonth: "£7.01", //£
      priceAnnual: "£22.58",
      default: true,
      custom: false,
      features: [
        {
          title: "Up to 10 Active Users",
          supported: true,
        },
        {
          title: "Up to 30 Project Integrations",
          supported: true,
        },
        {
          title: "Analytics Module",
          supported: true,
        },
        {
          title: "Finance Module",
          supported: false,
        },
        {
          title: "Accounting Module",
          supported: false,
        },
        {
          title: "Network Platform",
          supported: false,
        },
        {
          title: "Unlimited Cloud Space",
          supported: false,
        },
      ],
    },

    {
      title: "Advanced",
      subTitle: "Best for 100+ team size",
      description: "Optimal for 100+ team size and grown company",
      priceMonth: "£19.47",
      priceAnnual: "£38.16",
      default: false,
      custom: false,
      features: [
        {
          title: "Up to 10 Active Users",
          supported: true,
        },
        {
          title: "Up to 30 Project Integrations",
          supported: true,
        },
        {
          title: "Analytics Module",
          supported: true,
        },
        {
          title: "Finance Module",
          supported: true,
        },
        {
          title: "Accounting Module",
          supported: true,
        },
        {
          title: "Network Platform",
          supported: false,
        },
        {
          title: "Unlimited Cloud Space",
          supported: false,
        },
      ],
    },

    {
      title: "Enterprise",
      subTitle: "Best value for 1000+ team",
      description: "Optimal for 1000+ team and enterpise",
      priceMonth: "£77.09",
      priceAnnual: "£116.03",
      label: "Most popular",
      default: false,
      custom: false,
      features: [
        {
          title: "Up to 10 Active Users",
          supported: true,
        },
        {
          title: "Up to 30 Project Integrations",
          supported: true,
        },
        {
          title: "Analytics Module",
          supported: true,
        },
        {
          title: "Finance Module",
          supported: true,
        },
        {
          title: "Accounting Module",
          supported: true,
        },
        {
          title: "Network Platform",
          supported: true,
        },
        {
          title: "Unlimited Cloud Space",
          supported: true,
        },
      ],
    },

    {
      title: "Custom",
      subTitle: "Request a custom license",
      default: false,
      custom: true,
    },
  ],

  USD: [
    {
      title: "Startup",
      subTitle: "Best for startups",
      description: "Optimal for 10+ team size and new startup",
      priceMonth: "$9", //$
      priceAnnual: "$29",
      default: true,
      custom: false,
      features: [
        {
          title: "Up to 10 Active Users",
          supported: true,
        },
        {
          title: "Up to 30 Project Integrations",
          supported: true,
        },
        {
          title: "Analytics Module",
          supported: true,
        },
        {
          title: "Finance Module",
          supported: false,
        },
        {
          title: "Accounting Module",
          supported: false,
        },
        {
          title: "Network Platform",
          supported: false,
        },
        {
          title: "Unlimited Cloud Space",
          supported: false,
        },
      ],
    },

    {
      title: "Advanced",
      subTitle: "Best for 100+ team size",
      description: "Optimal for 100+ team size and grown company",
      priceMonth: "$25",
      priceAnnual: "$49",
      default: false,
      custom: false,
      features: [
        {
          title: "Up to 10 Active Users",
          supported: true,
        },
        {
          title: "Up to 30 Project Integrations",
          supported: true,
        },
        {
          title: "Analytics Module",
          supported: true,
        },
        {
          title: "Finance Module",
          supported: true,
        },
        {
          title: "Accounting Module",
          supported: true,
        },
        {
          title: "Network Platform",
          supported: false,
        },
        {
          title: "Unlimited Cloud Space",
          supported: false,
        },
      ],
    },

    {
      title: "Enterprise",
      subTitle: "Best value for 1000+ team",
      description: "Optimal for 1000+ team and enterpise",
      priceMonth: "$99",
      priceAnnual: "$149",
      label: "Most popular",
      default: false,
      custom: false,
      features: [
        {
          title: "Up to 10 Active Users",
          supported: true,
        },
        {
          title: "Up to 30 Project Integrations",
          supported: true,
        },
        {
          title: "Analytics Module",
          supported: true,
        },
        {
          title: "Finance Module",
          supported: true,
        },
        {
          title: "Accounting Module",
          supported: true,
        },
        {
          title: "Network Platform",
          supported: true,
        },
        {
          title: "Unlimited Cloud Space",
          supported: true,
        },
      ],
    },

    {
      title: "Custom",
      subTitle: "Request a custom license",
      default: false,
      custom: true,
    },
  ],

  AUD: [
    {
      title: "Startup",
      subTitle: "Best for startups",
      description: "Optimal for 10+ team size and new startup",
      priceMonth: "A$13.59", //A$
      priceAnnual: "A$43.79",
      default: true,
      custom: false,
      features: [
        {
          title: "Up to 10 Active Users",
          supported: true,
        },
        {
          title: "Up to 30 Project Integrations",
          supported: true,
        },
        {
          title: "Analytics Module",
          supported: true,
        },
        {
          title: "Finance Module",
          supported: false,
        },
        {
          title: "Accounting Module",
          supported: false,
        },
        {
          title: "Network Platform",
          supported: false,
        },
        {
          title: "Unlimited Cloud Space",
          supported: false,
        },
      ],
    },

    {
      title: "Advanced",
      subTitle: "Best for 100+ team size",
      description: "Optimal for 100+ team size and grown company",
      priceMonth: "A$37.75",
      priceAnnual: "A$73.99",
      default: false,
      custom: false,
      features: [
        {
          title: "Up to 10 Active Users",
          supported: true,
        },
        {
          title: "Up to 30 Project Integrations",
          supported: true,
        },
        {
          title: "Analytics Module",
          supported: true,
        },
        {
          title: "Finance Module",
          supported: true,
        },
        {
          title: "Accounting Module",
          supported: true,
        },
        {
          title: "Network Platform",
          supported: false,
        },
        {
          title: "Unlimited Cloud Space",
          supported: false,
        },
      ],
    },

    {
      title: "Enterprise",
      subTitle: "Best value for 1000+ team",
      description: "Optimal for 1000+ team and enterpise",
      priceMonth: "A$149.49",
      priceAnnual: "A$224.99",
      label: "Most popular",
      default: false,
      custom: false,
      features: [
        {
          title: "Up to 10 Active Users",
          supported: true,
        },
        {
          title: "Up to 30 Project Integrations",
          supported: true,
        },
        {
          title: "Analytics Module",
          supported: true,
        },
        {
          title: "Finance Module",
          supported: true,
        },
        {
          title: "Accounting Module",
          supported: true,
        },
        {
          title: "Network Platform",
          supported: true,
        },
        {
          title: "Unlimited Cloud Space",
          supported: true,
        },
      ],
    },

    {
      title: "Custom",
      subTitle: "Request a custom license",
      default: false,
      custom: true,
    },
  ],

  JPY: [
    {
      title: "Startup",
      subTitle: "Best for startups",
      description: "Optimal for 10+ team size and new startup",
      priceMonth: "¥1325.81", //¥
      priceAnnual: "¥4272.06",
      default: true,
      custom: false,
      features: [
        {
          title: "Up to 10 Active Users",
          supported: true,
        },
        {
          title: "Up to 30 Project Integrations",
          supported: true,
        },
        {
          title: "Analytics Module",
          supported: true,
        },
        {
          title: "Finance Module",
          supported: false,
        },
        {
          title: "Accounting Module",
          supported: false,
        },
        {
          title: "Network Platform",
          supported: false,
        },
        {
          title: "Unlimited Cloud Space",
          supported: false,
        },
      ],
    },

    {
      title: "Advanced",
      subTitle: "Best for 100+ team size",
      description: "Optimal for 100+ team size and grown company",
      priceMonth: "¥3682.81",
      priceAnnual: "¥7218.31",
      default: false,
      custom: false,
      features: [
        {
          title: "Up to 10 Active Users",
          supported: true,
        },
        {
          title: "Up to 30 Project Integrations",
          supported: true,
        },
        {
          title: "Analytics Module",
          supported: true,
        },
        {
          title: "Finance Module",
          supported: true,
        },
        {
          title: "Accounting Module",
          supported: true,
        },
        {
          title: "Network Platform",
          supported: false,
        },
        {
          title: "Unlimited Cloud Space",
          supported: false,
        },
      ],
    },

    {
      title: "Enterprise",
      subTitle: "Best value for 1000+ team",
      description: "Optimal for 1000+ team and enterpise",
      priceMonth: "¥14583.94",
      priceAnnual: "¥21949.56",
      label: "Most popular",
      default: false,
      custom: false,
      features: [
        {
          title: "Up to 10 Active Users",
          supported: true,
        },
        {
          title: "Up to 30 Project Integrations",
          supported: true,
        },
        {
          title: "Analytics Module",
          supported: true,
        },
        {
          title: "Finance Module",
          supported: true,
        },
        {
          title: "Accounting Module",
          supported: true,
        },
        {
          title: "Network Platform",
          supported: true,
        },
        {
          title: "Unlimited Cloud Space",
          supported: true,
        },
      ],
    },

    {
      title: "Custom",
      subTitle: "Request a custom license",
      default: false,
      custom: true,
    },
  ],

  SEK: [
    {
      title: "Startup",
      subTitle: "Best for startups",
      description: "Optimal for 10+ team size and new startup",
      priceMonth: "kr94.16", //kr
      priceAnnual: "kr303.40",
      default: true,
      custom: false,
      features: [
        {
          title: "Up to 10 Active Users",
          supported: true,
        },
        {
          title: "Up to 30 Project Integrations",
          supported: true,
        },
        {
          title: "Analytics Module",
          supported: true,
        },
        {
          title: "Finance Module",
          supported: false,
        },
        {
          title: "Accounting Module",
          supported: false,
        },
        {
          title: "Network Platform",
          supported: false,
        },
        {
          title: "Unlimited Cloud Space",
          supported: false,
        },
      ],
    },

    {
      title: "Advanced",
      subTitle: "Best for 100+ team size",
      description: "Optimal for 100+ team size and grown company",
      priceMonth: "kr261.55",
      priceAnnual: "kr512.64",
      default: false,
      custom: false,
      features: [
        {
          title: "Up to 10 Active Users",
          supported: true,
        },
        {
          title: "Up to 30 Project Integrations",
          supported: true,
        },
        {
          title: "Analytics Module",
          supported: true,
        },
        {
          title: "Finance Module",
          supported: true,
        },
        {
          title: "Accounting Module",
          supported: true,
        },
        {
          title: "Network Platform",
          supported: false,
        },
        {
          title: "Unlimited Cloud Space",
          supported: false,
        },
      ],
    },

    {
      title: "Enterprise",
      subTitle: "Best value for 1000+ team",
      description: "Optimal for 1000+ team and enterpise",
      priceMonth: "kr1035.74",
      priceAnnual: "kr1558.84",
      label: "Most popular",
      default: false,
      custom: false,
      features: [
        {
          title: "Up to 10 Active Users",
          supported: true,
        },
        {
          title: "Up to 30 Project Integrations",
          supported: true,
        },
        {
          title: "Analytics Module",
          supported: true,
        },
        {
          title: "Finance Module",
          supported: true,
        },
        {
          title: "Accounting Module",
          supported: true,
        },
        {
          title: "Network Platform",
          supported: true,
        },
        {
          title: "Unlimited Cloud Space",
          supported: true,
        },
      ],
    },

    {
      title: "Custom",
      subTitle: "Request a custom license",
      default: false,
      custom: true,
    },
  ],

  CAD: [
    {
      title: "Startup",
      subTitle: "Best for startups",
      description: "Optimal for 10+ team size and new startup",
      priceMonth: "C$12.34", //C$
      priceAnnual: "C$39.76",
      default: true,
      custom: false,
      features: [
        {
          title: "Up to 10 Active Users",
          supported: true,
        },
        {
          title: "Up to 30 Project Integrations",
          supported: true,
        },
        {
          title: "Analytics Module",
          supported: true,
        },
        {
          title: "Finance Module",
          supported: false,
        },
        {
          title: "Accounting Module",
          supported: false,
        },
        {
          title: "Network Platform",
          supported: false,
        },
        {
          title: "Unlimited Cloud Space",
          supported: false,
        },
      ],
    },

    {
      title: "Advanced",
      subTitle: "Best for 100+ team size",
      description: "Optimal for 100+ team size and grown company",
      priceMonth: "C$34.28",
      priceAnnual: "C$67.19",
      default: false,
      custom: false,
      features: [
        {
          title: "Up to 10 Active Users",
          supported: true,
        },
        {
          title: "Up to 30 Project Integrations",
          supported: true,
        },
        {
          title: "Analytics Module",
          supported: true,
        },
        {
          title: "Finance Module",
          supported: true,
        },
        {
          title: "Accounting Module",
          supported: true,
        },
        {
          title: "Network Platform",
          supported: false,
        },
        {
          title: "Unlimited Cloud Space",
          supported: false,
        },
      ],
    },

    {
      title: "Enterprise",
      subTitle: "Best value for 1000+ team",
      description: "Optimal for 1000+ team and enterpise",
      priceMonth: "C$135.74",
      priceAnnual: "C$204.30",
      label: "Most popular",
      default: false,
      custom: false,
      features: [
        {
          title: "Up to 10 Active Users",
          supported: true,
        },
        {
          title: "Up to 30 Project Integrations",
          supported: true,
        },
        {
          title: "Analytics Module",
          supported: true,
        },
        {
          title: "Finance Module",
          supported: true,
        },
        {
          title: "Accounting Module",
          supported: true,
        },
        {
          title: "Network Platform",
          supported: true,
        },
        {
          title: "Unlimited Cloud Space",
          supported: true,
        },
      ],
    },

    {
      title: "Custom",
      subTitle: "Request a custom license",
      default: false,
      custom: true,
    },
  ],

  CHF: [
    {
      title: "Startup",
      subTitle: "Best for startups",
      description: "Optimal for 10+ team size and new startup",
      priceMonth: "Fr7.79", //Fr
      priceAnnual: "Fr25.11",
      default: true,
      custom: false,
      features: [
        {
          title: "Up to 10 Active Users",
          supported: true,
        },
        {
          title: "Up to 30 Project Integrations",
          supported: true,
        },
        {
          title: "Analytics Module",
          supported: true,
        },
        {
          title: "Finance Module",
          supported: false,
        },
        {
          title: "Accounting Module",
          supported: false,
        },
        {
          title: "Network Platform",
          supported: false,
        },
        {
          title: "Unlimited Cloud Space",
          supported: false,
        },
      ],
    },

    {
      title: "Advanced",
      subTitle: "Best for 100+ team size",
      description: "Optimal for 100+ team size and grown company",
      priceMonth: "Fr21.64",
      priceAnnual: "Fr42.42",
      default: false,
      custom: false,
      features: [
        {
          title: "Up to 10 Active Users",
          supported: true,
        },
        {
          title: "Up to 30 Project Integrations",
          supported: true,
        },
        {
          title: "Analytics Module",
          supported: true,
        },
        {
          title: "Finance Module",
          supported: true,
        },
        {
          title: "Accounting Module",
          supported: true,
        },
        {
          title: "Network Platform",
          supported: false,
        },
        {
          title: "Unlimited Cloud Space",
          supported: false,
        },
      ],
    },

    {
      title: "Enterprise",
      subTitle: "Best value for 1000+ team",
      description: "Optimal for 1000+ team and enterpise",
      priceMonth: "Fr85.71", //Fr
      priceAnnual: "Fr128.99",
      label: "Most popular",
      default: false,
      custom: false,
      features: [
        {
          title: "Up to 10 Active Users",
          supported: true,
        },
        {
          title: "Up to 30 Project Integrations",
          supported: true,
        },
        {
          title: "Analytics Module",
          supported: true,
        },
        {
          title: "Finance Module",
          supported: true,
        },
        {
          title: "Accounting Module",
          supported: true,
        },
        {
          title: "Network Platform",
          supported: true,
        },
        {
          title: "Unlimited Cloud Space",
          supported: true,
        },
      ],
    },

    {
      title: "Custom",
      subTitle: "Request a custom license",
      default: false,
      custom: true,
    },
  ],
};

interface Plan {
  title: string;
  subTitle: string;
  description?: string; // Optional property
  priceMonth?: string; // Optional property
  priceAnnual?: string; // Optional property
  default: boolean;
  custom: boolean;
  features?: {
    title: string;
    supported: boolean;
  }[];
  label?: string; // Optional property
}

const PricingPlan: FC = () => {
  const [currentState, setCurrentState] = useState<"month" | "annual">("month");
  const [selected, setSelected] = useState("Startup");

  const {
    country,
    language,
    currency,
    timeZone,
    setSelectedPlan,
    setSelectedPrice,
    selectedPlan,
    selectedPrice,
  } = useContext(FormDataContext);

  const { setFormData } = useContext(FormDataContext);

  const selectedCurrency = currency as keyof typeof plansByCurrency; // Replace with your dynamic currency selection logic
  const plans = plansByCurrency[selectedCurrency];
  const navigate = useNavigate();

  const handlePlanSelection = (plan: Plan) => {
    setSelectedPlan(plan.title);
    // Set the price based on the current plan (monthly or annual)
    // setSelectedPrice(currentState === "month" ? plan.priceMonth : plan.priceAnnual);
    const price = currentState === "month" ? plan.priceMonth : plan.priceAnnual;
    setSelectedPrice(price || "");
    console.log("Selected Plan:", plan.title);
    console.log("Selected Price:", price);
  };

  useEffect(() => {
    const savedPrice = localStorage.getItem("selectedPrice");
    if (savedPrice) {
      setSelectedPrice(savedPrice);
    }
  }, []);
  const handleSubmit = async () => {
    try {
      const dataToSend = {
        selectedPrice,
      };
      localStorage.setItem("selectedPrice", selectedPrice);
      // Send the data to the backend
      const res = await fetch("http://localhost:5002/api/logger1", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend), // Send selectedPrice to the backend
      });

      // Handle the response
      if (res.ok) {
        console.log("Data sent successfully:", dataToSend);
      } else {
        console.error("Failed to send data:", res.statusText);
      }
    } catch (error) {
      console.error("Error sending data to the backend:", error);
    }
  };
  return (
    <div className="modal fade" id="kt_modal_pricing_plan" aria-hidden="true">
      <div className="modal-dialog modal-xl">
        <div className="modal-content rounded">
          <div className="modal-header justify-content-end border-0 pb-0">
            <div
              className="btn btn-sm btn-icon btn-active-color-primary"
              data-bs-dismiss="modal"
            >
              <KTIcon iconName="cross" className="fs-1" />
            </div>
          </div>

          <div className="modal-body pt-0 pb-15 px-5 px-xl-20">
            <div className="mb-13 text-center">
              <h1 className="mb-3">Upgrade a Plan</h1>

              <div className="text-muted fw-bold fs-5">
                If you need more info, please check{" "}
                <a href="#" className="link-primary fw-bolder">
                  Pricing Guidelines
                </a>
                .
              </div>
            </div>

            <div className="d-flex flex-column">
              <div
                className="nav-group nav-group-outline mx-auto"
                data-kt-buttons="true"
              >
                <a
                  href="#"
                  className={
                    "btn btn-color-gray-500 btn-active btn-active-secondary px-6 py-3 me-2 " +
                    (currentState === "month" && "active")
                  }
                  onClick={() => {
                    setCurrentState("month");
                  }}
                  data-kt-plan="month"
                >
                  Monthly
                </a>
                <a
                  href="#"
                  className={
                    "btn btn-color-gray-500 btn-active btn-active-secondary px-6 py-3 me-2 " +
                    (currentState === "annual" && "active")
                  }
                  onClick={() => {
                    setCurrentState("annual");
                  }}
                  data-kt-plan="annual"
                >
                  Annual
                </a>
              </div>

              <div className="row mt-10">
                <div className="col-lg-6 mb-10 mb-lg-0">
                  <div className="nav flex-column">
                    {plans.map((plan: Plan, index: number) => {
                      return (
                        <div
                          onClick={() => {
                            // setSelected(plan.title);
                            handlePlanSelection(plan);
                          }}
                          className={
                            `nav-link btn btn-outline btn-outline-dashed btn-color-dark d-flex flex-stack text-start p-6 ` +
                            (index !== plans.length - 1 && "mb-6 ") +
                            (plan.default && "active ") +
                            (!plan.custom && "btn-active btn-active-primary ")
                          }
                          data-bs-toggle="tab"
                          data-bs-target={`#kt_pricing_plan_${index}`}
                          key={index}
                        >
                          <div className="d-flex align-items-center me-2">
                            <div className="form-check form-check-custom form-check-solid form-check-success me-6">
                              <input
                                className="form-check-input"
                                type="radio"
                                name="plan"
                                value={plan.title}
                                checked={selectedPlan === plan.title}
                                onChange={() => handlePlanSelection(plan)}
                              />
                            </div>

                            <div className="flex-grow-1">
                              <h2 className="d-flex align-items-center fs-2 fw-bolder flex-wrap">
                                {plan.title}

                                {plan.label && (
                                  <span className="badge badge-light-success ms-2 fs-7">
                                    {plan.label}
                                  </span>
                                )}
                              </h2>
                              <div className="fw-bold opacity-50">
                                {plan.subTitle}
                              </div>
                            </div>
                          </div>

                          <div className="ms-5">
                            {plan.custom && (
                              <button className="btn btn-sm btn-primary">
                                Contact Us
                              </button>
                            )}
                            {!plan.custom && (
                              <>
                                <span className="mb-2"></span>

                                <span className="fs-3x fw-bolder">
                                  {currentState === "month"
                                    ? plan.priceMonth
                                    : plan.priceAnnual}
                                </span>

                                <span className="fs-7 opacity-50">
                                  /<span data-kt-element="period">Mon</span>
                                </span>
                              </>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="col-lg-6">
                  <div className="tab-content rounded h-100 bg-light p-10">
                    {plans.map((plan, index) => {
                      return (
                        <div key={`custom${index}`}>
                          {plan.title === selected && !plan.custom && (
                            <>
                              <div
                                className={
                                  `tab-pane fade` +
                                  (plan.default && "show active")
                                }
                                id={`kt_pricing_plan_${index}`}
                                key={index}
                              >
                                <div className="pb-5">
                                  <h2 className="fw-bolder text-gray-900">
                                    What’s in Startup Plan?
                                  </h2>

                                  <div className="text-gray-500 fw-bold">
                                    {plan.description}
                                  </div>
                                </div>

                                <div className="pt-1">
                                  {plan.features!.map((feature, i) => {
                                    return (
                                      <div
                                        className={
                                          `d-flex align-items-center` +
                                          (i !== plan.features!.length - 1 &&
                                            " mb-7")
                                        }
                                        key={`${i}-${feature.title}`}
                                      >
                                        {feature.supported && (
                                          <>
                                            <span className="fw-bold fs-5 text-gray-700 flex-grow-1">
                                              {feature.title}
                                            </span>

                                            <KTIcon
                                              iconName="check-circle"
                                              className="fs-1 text-success"
                                            />
                                          </>
                                        )}
                                        {!feature.supported && (
                                          <>
                                            <span className="fw-bold fs-5 text-gray-500 flex-grow-1">
                                              {feature.title}
                                            </span>
                                            <KTIcon
                                              iconName="cross-circle"
                                              className="fs-1"
                                            />
                                          </>
                                        )}
                                      </div>
                                    );
                                  })}
                                </div>
                              </div>
                            </>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            <div className="d-flex flex-center flex-row-fluid pt-12">
              <button
                // type="reset"
                className="btn btn-light me-3"
                data-bs-dismiss="modal"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="btn btn-primary"
                data-bs-dismiss="modal"
                onClick={handleSubmit}
              >
                Upgrade Plan
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { PricingPlan };
