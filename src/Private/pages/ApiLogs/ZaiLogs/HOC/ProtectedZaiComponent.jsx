import ZaiAustraliaPayment from "../../../PaymentProcess/ZaiAustraliaPayment/ZaiAustraliaPayment";
import withZaiCountryCheck from "./withZaiCountryCheck";

const ProtectedZaiComponent = withZaiCountryCheck(ZaiAustraliaPayment);

export default ProtectedZaiComponent;
