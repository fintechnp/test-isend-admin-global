//Manage user
import {
    GetAllUserReducer,
    GetUserDetailsReducer,
    GetUserDetailByIdReducer,
    AddUserReducer,
    UpdateUserReducer,
    DeleteUserReducer,
    UpdateUserStatusReducer,
    GetUserNumberReducer,
    AccountSaga,
} from "./pages/Users/Accounts/store";

//permission
import {
    GetAllPermissionReducer,
    UpdateUserPermissionRdcr,
    PermissionSaga,
} from "./pages/Users/UserPermission/store";
import {
    GetAllMenuReducer,
    AddMenuReducer,
    UpdateMenuReducer,
    DeleteMenuReducer,
    MenuSaga,
} from "./pages/Users/Menu/store";
import {
    GetAllSubMenuReducer,
    AddSubMenuReducer,
    UpdateSubMenuReducer,
    DeleteSubMenuReducer,
    SubMenuSaga,
} from "./pages/Users/SubMenu/store";

//setup
import {
    GetAllDeliveryOptionReducer,
    GetDeliveryOptionDetailsReducer,
    AddDeliveryOptionReducer,
    UpdateDeliveryOptionReducer,
    DeleteDeliveryOptionReducer,
    DeliveryOptionSaga,
} from "./pages/Setup/DeliveryOption/store";

import {
    GetDeliveryRouteReducer,
    GetDeliveryRouteByIdReducer,
    CreateDeliveryRouteReducer,
    UpdateDeliveryRouteReducer,
    DeleteDeliveryRouteReducer,
    DeliveryRouteSaga,
} from "./pages/Setup/DeliveryRoute/store";

import {
    GetAllPartnerReducer,
    GetPartnerDetailsReducer,
    AddPartnerReducer,
    UpdatePartnerReducer,
    DeletePartnerReducer,
    GetSendingPartnerReducer,
    GetPayoutPartnerReducer,
    PartnerSaga,
} from "./pages/Setup/Partner/store";

import {
    GetAllCorridorReducer,
    GetCorridorDetailsReducer,
    AddCorridorReducer,
    UpdateCorridorReducer,
    DeleteCorridorReducer,
} from "./pages/Setup/Partner/store";

import {
    GetAllPartnerBankReducer,
    GetPartnerBankByIdReducer,
    GetPartnerBankByAgentIdReducer,
    CreatePartnerBankReducer,
    UpdatePartnerBankReducer,
    DeletePartnerBankReducer,
    UnmapPartnerBankReducer,
    PartnerBankSaga,
} from "./pages/Setup/PartnerBank/store";

import {
    GetAllPayoutLocationReducer,
    GetPayoutLocationDetailsReducer,
    AddPayoutLocationReducer,
    UpdatePayoutLocationReducer,
    DeletePayoutLocationReducer,
    PayoutLocationSaga,
} from "./pages/Setup/PayoutLocation/store";

import {
    GetAllServiceChargeReducer,
    GetServiceChargeByPartnerReducer,
    GetServiceChargeDetailsReducer,
    AddServiceChargeReducer,
    UpdateServiceChargeReducer,
    DeleteServiceChargeReducer,
    ServiceChargeSaga,
} from "./pages/Setup/ServiceCharge/store";

import {
    GetAllExchangeRateReducer,
    GetExchangeRateByPartnerReducer,
    GetExchangeRateDetailsReducer,
    AddExchangeRateReducer,
    UpdateExchangeRateReducer,
    DeleteExchangeRateReducer,
    ExchangeRateSaga,
} from "./pages/Setup/ExchangeRate/store";

import {
    GetAllReferenceReducer,
    AddReferenceReducer,
    UpdateReferenceReducer,
    GetReferenceDataReducer,
    AddReferenceDataReducer,
    UpdateReferenceDataReducer,
    DeleteReferenceDataReducer,
    ReferenceSaga,
} from "./pages/Setup/Reference/store";

//Payment Process
import {
    GetTransactionDetailsReducer,
    GetPaymentPendingReducer,
    GetPendingTransactionsReducer,
    GetBlockedTransactionsReducer,
    GetAmlSuspiciousReducer,
    GetExceptionTransactionsReducer,
    BlockTransactionsReducer,
    UpdatePaymentPendingReducer,
    UpdatePendingTransactionsReducer,
    UpdateBlockedTransactionsReducer,
    UpdateAmlSuspiciousReducer,
    UpdateExceptionTransactionsReducer,
    PaymentProcessingSaga,
} from "./pages/PaymentProcess/store";

//Manage Compliance payment rules
import {
    GetPaymentRulesReducer,
    GetPaymentRulesByIdReducer,
    AddPaymentRulesReducer,
    UpdatePaymentRulesReducer,
    UpdatePaymentRulesStatusReducer,
    DeletePaymentRulesReducer,
    PaymentRulesSaga,
} from "./pages/Compliance/PaymentRules/store";

//Manage Compliance Sanction
import {
    GetSanctionListReducer,
    GetSanctionByIdReducer,
    AddSanctionReducer,
    ImportSanctionReducer,
    UpdateSanctionReducer,
    DeleteSanctionReducer,
    SanctionSaga,
} from "./pages/Compliance/SanctionList/store";

export const privateReducer = {
    get_all_user: GetAllUserReducer,
    get_user_details: GetUserDetailsReducer,
    get_user_details_id: GetUserDetailByIdReducer,
    add_user: AddUserReducer,
    update_user: UpdateUserReducer,
    delete_user: DeleteUserReducer,
    update_user_status: UpdateUserStatusReducer,
    get_user_number: GetUserNumberReducer,

    //permission
    get_all_permission: GetAllPermissionReducer,
    update_user_permission: UpdateUserPermissionRdcr,

    //menu
    get_all_menu: GetAllMenuReducer,
    add_menu: AddMenuReducer,
    update_menu: UpdateMenuReducer,
    delete_menu: DeleteMenuReducer,

    //sub-menu
    get_all_sub_menu: GetAllSubMenuReducer,
    add_sub_menu: AddSubMenuReducer,
    update_sub_menu: UpdateSubMenuReducer,
    delete_sub_menu: DeleteSubMenuReducer,

    //setup
    //delivery option
    get_all_delivery_option: GetAllDeliveryOptionReducer,
    get_delivery_option_details: GetDeliveryOptionDetailsReducer,
    add_delivery_option: AddDeliveryOptionReducer,
    update_delivery_option: UpdateDeliveryOptionReducer,
    delete_delivery_option: DeleteDeliveryOptionReducer,

    //delivery route
    get_delivery_route: GetDeliveryRouteReducer,
    get_delivery_route_by_id: GetDeliveryRouteByIdReducer,
    create_delivery_route: CreateDeliveryRouteReducer,
    update_delivery_route: UpdateDeliveryRouteReducer,
    delete_delivery_route: DeleteDeliveryRouteReducer,

    //partner
    get_all_partner: GetAllPartnerReducer,
    get_sending_partner: GetSendingPartnerReducer,
    get_payout_partner: GetPayoutPartnerReducer,
    get_partner_details: GetPartnerDetailsReducer,
    add_partner: AddPartnerReducer,
    update_partner: UpdatePartnerReducer,
    delete_partner: DeletePartnerReducer,

    //corridor
    get_all_corridor: GetAllCorridorReducer,
    get_corridor_details: GetCorridorDetailsReducer,
    add_corridor: AddCorridorReducer,
    update_corridor: UpdateCorridorReducer,
    delete_corridor: DeleteCorridorReducer,

    //Partner Bank
    get_all_partner_bank: GetAllPartnerBankReducer,
    get_partner_bank_by_id: GetPartnerBankByIdReducer,
    get_partner_bank_by_agent_id: GetPartnerBankByAgentIdReducer,
    create_partner_bank: CreatePartnerBankReducer,
    update_partner_bank: UpdatePartnerBankReducer,
    delete_partner_bank: DeletePartnerBankReducer,
    unmapp_partner_bank: UnmapPartnerBankReducer,

    //payout location
    get_all_payout_location: GetAllPayoutLocationReducer,
    get_payout_location_details: GetPayoutLocationDetailsReducer,
    add_payout_location: AddPayoutLocationReducer,
    update_payout_location: UpdatePayoutLocationReducer,
    delete_payout_location: DeletePayoutLocationReducer,

    //Service Charge
    get_all_service_charge: GetAllServiceChargeReducer,
    get_service_charge_by_partner: GetServiceChargeByPartnerReducer,
    get_service_charge_details: GetServiceChargeDetailsReducer,
    add_service_charge: AddServiceChargeReducer,
    update_service_charge: UpdateServiceChargeReducer,
    delete_service_charge: DeleteServiceChargeReducer,

    //exchange charge
    get_all_exchange_rate: GetAllExchangeRateReducer,
    get_exchange_rate_by_partner: GetExchangeRateByPartnerReducer,
    get_exchange_rate_details: GetExchangeRateDetailsReducer,
    add_exchange_rate: AddExchangeRateReducer,
    update_exchange_rate: UpdateExchangeRateReducer,
    delete_excahnge_rate: DeleteExchangeRateReducer,

    //reference type and data
    get_all_reference: GetAllReferenceReducer,
    add_reference: AddReferenceReducer,
    update_reference: UpdateReferenceReducer,
    get_reference_data: GetReferenceDataReducer,
    add_reference_data: AddReferenceDataReducer,
    update_reference_data: UpdateReferenceDataReducer,
    delete_reference_data: DeleteReferenceDataReducer,

    get_payment_rules: GetPaymentRulesReducer,
    get_payment_rules_by_id: GetPaymentRulesByIdReducer,
    add_payment_rules: AddPaymentRulesReducer,
    update_payment_rules: UpdatePaymentRulesReducer,
    update_payment_rules_status: UpdatePaymentRulesStatusReducer,
    delete_payment_rules: DeletePaymentRulesReducer,

    //Payment Process
    get_transaction_details: GetTransactionDetailsReducer,
    get_payment_pending: GetPaymentPendingReducer,
    get_pending_transactions: GetPendingTransactionsReducer,
    get_blocked_transactions: GetBlockedTransactionsReducer,
    get_aml_suspicious: GetAmlSuspiciousReducer,
    get_exception_transactions: GetExceptionTransactionsReducer,
    block_transactions: BlockTransactionsReducer,
    update_payment_pending: UpdatePaymentPendingReducer,
    update_pending_transactions: UpdatePendingTransactionsReducer,
    update_blocked_transactions: UpdateBlockedTransactionsReducer,
    update_aml_suspicious: UpdateAmlSuspiciousReducer,
    update_exception_transactions: UpdateExceptionTransactionsReducer,

    //Sanction
    get_sanction_list: GetSanctionListReducer,
    get_sanction_by_id: GetSanctionByIdReducer,
    add_sanction: AddSanctionReducer,
    import_sanction: ImportSanctionReducer,
    update_sanction: UpdateSanctionReducer,
    delete_sanction: DeleteSanctionReducer,
};

export const privateSaga = [
    AccountSaga(),
    PermissionSaga(),
    MenuSaga(),
    SubMenuSaga(),
    DeliveryOptionSaga(),
    DeliveryRouteSaga(),
    PartnerSaga(),
    PartnerBankSaga(),
    PayoutLocationSaga(),
    ServiceChargeSaga(),
    ExchangeRateSaga(),
    ReferenceSaga(),
    PaymentRulesSaga(),
    SanctionSaga(),
    PaymentProcessingSaga(),
];

export { default as privateRoutes } from "./config/routes";
