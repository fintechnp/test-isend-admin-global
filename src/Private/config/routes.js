import { lazy } from "react";

//Dashboard
const Dashboard = lazy(() => import("../pages/Dashboard"));

//users
const Accounts = lazy(() => import("../pages/Users/Accounts"));
const Menu = lazy(() => import("../pages/Users/Menu"));
const SubMenu = lazy(() => import("../pages/Users/SubMenu"));

//users permission
const UserPermission = lazy(() => import("../pages/Users/UserPermission"));

//setup
const DeliveryOption = lazy(() => import("../pages/Setup/DeliveryOption"));
const DeliveryRoute = lazy(() => import("../pages/Setup/DeliveryRoute"));
const ExchangeRate = lazy(() => import("../pages/Setup/ExchangeRate"));
const ExchangeRateList = lazy(() =>
    import("../pages/Setup/ExchangeRate/ExchangeRateList")
);
const AddUpdateExchangeRate = lazy(() =>
    import("../pages/Setup/ExchangeRate/AddUpdateExchangeRate")
);
const ExchangeRateDetails = lazy(() =>
    import("../pages/Setup/ExchangeRate/ExchangeRateDetails")
);
const Partner = lazy(() => import("../pages/Setup/Partner"));
const AddUpdatePartner = lazy(() =>
    import("../pages/Setup/Partner/AddUpdatePartner")
);
const PartnerDetails = lazy(() =>
    import("../pages/Setup/Partner/PartnerDetails")
);
const Corridor = lazy(() => import("../pages/Setup/Partner/Corridor"));
const AddUpdateCorridor = lazy(() =>
    import("../pages/Setup/Partner/AddUpdateCorridor")
);
const PartnerBank = lazy(() => import("../pages/Setup/PartnerBank"));
const MapBank = lazy(() => import("../pages/Setup/PartnerBank/MapBank"));
const PayoutLocation = lazy(() => import("../pages/Setup/PayoutLocation"));
const Reference = lazy(() => import("../pages/Setup/Reference"));
const ReferenceData = lazy(() =>
    import("../pages/Setup/Reference/ReferenceData")
);
const ServiceCharge = lazy(() => import("../pages/Setup/ServiceCharge"));
const ServiceChargeList = lazy(() =>
    import("../pages/Setup/ServiceCharge/ServiceChargeList")
);
const AddUpdateServiceCharge = lazy(() =>
    import("../pages/Setup/ServiceCharge/AddUpdateServiceCharge")
);
const ServiceChargeDetails = lazy(() =>
    import("../pages/Setup/ServiceCharge/ServiceChargeDetails")
);

const privateRoutes = [
    { path: "/", component: <Dashboard /> },
    { path: "/user/accounts", component: <Accounts /> },
    { path: "/user/permission/:id", component: <UserPermission /> },
    { path: "/user/menu", component: <Menu /> },
    { path: "/user/menu/sub/:id", component: <SubMenu /> },

    { path: "/setup/delivery-option", component: <DeliveryOption /> },
    { path: "/setup/delivery-route", component: <DeliveryRoute /> },
    { path: "/setup/exchange-rate", component: <ExchangeRate /> },
    { path: "/setup/exchange-rate/:id", component: <ExchangeRateList /> },
    {
        path: "/setup/exchange-rate/create",
        component: <AddUpdateExchangeRate />,
    },
    {
        path: "/setup/exchange-rate/update/:id",
        component: <AddUpdateExchangeRate />,
    },
    {
        path: "/setup/exchange-rate/details/:id",
        component: <ExchangeRateDetails />,
    },
    { path: "/setup/partner", component: <Partner /> },
    { path: "/setup/partner/create", component: <AddUpdatePartner /> },
    { path: "/setup/partner/update/:id", component: <AddUpdatePartner /> },
    { path: "/setup/partner/details/:id", component: <PartnerDetails /> },
    { path: "/setup/partner/corridor/:id", component: <Corridor /> },
    { path: "/setup/partner/corridor/add", component: <AddUpdateCorridor /> },
    {
        path: "/setup/partner/corridor/update/:id",
        component: <AddUpdateCorridor />,
    },
    { path: "/setup/partner-bank", component: <PartnerBank /> },
    {
        path: "/setup/partner-bank/map/:payment/:country/:currency",
        component: <MapBank />,
    },
    { path: "/setup/payout-location", component: <PayoutLocation /> },
    { path: "/setup/reference", component: <Reference /> },
    { path: "/setup/reference/data/:id", component: <ReferenceData /> },
    { path: "/setup/service-charge", component: <ServiceCharge /> },
    { path: "/setup/service-charge/:id", component: <ServiceChargeList /> },
    {
        path: "/setup/service-charge/create",
        component: <AddUpdateServiceCharge />,
    },
    {
        path: "/setup/service-charge/update/:id",
        component: <AddUpdateServiceCharge />,
    },
    {
        path: "/setup/service-charge/details/:id",
        component: <ServiceChargeDetails />,
    },
];

export default privateRoutes;
