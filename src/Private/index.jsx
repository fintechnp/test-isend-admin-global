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
    ForgotPasswordReducer,
    AccountSaga,
} from "./pages/Users/Accounts/store";

//permission
import { GetAllPermissionReducer, UpdateUserPermissionRdcr, PermissionSaga } from "./pages/Users/UserPermission/store";
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
    GetBranchByPartnerReducer,
    GetBranchDetailsReducer,
    AddBranchReducer,
    UpdateBranchReducer,
    DeleteBranchReducer,
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
    GetPromoSetupReducer,
    GetPromoSetupDetailsReducer,
    AddPromoSetupReducer,
    UpdatePromoSetupReducer,
    DeletePromoSetupReducer,
    GetPromoCodeReducer,
    DeletePromoCodeReducer,
    AddPromoCodeReducer,
    ImportPromoCodeReducer,
    PromoSetupSaga,
} from "./pages/Setup/PromoSetup/store";

import {
    GetApiConfigReducer,
    GetApiConfigDetailsReducer,
    AddApiConfigReducer,
    UpdateApiConfigReducer,
    ApiConfigSaga,
} from "./pages/Setup/ApiConfiguration/store";

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

import {
    AddLanguageOptions,
    DeleteLanguageOption,
    GetAllLanguageOptions,
    GetAllLanguageOptionsDetails,
    LanguageOptionSaga,
    UpdateLanguageOption,
} from "./pages/Setup/LanguageSetup/store";

import {
    AddLanguageCountry,
    DeleteLanguageCountry,
    GetAllLanguageCountry,
    LanguageCountry,
    LanguageCountrySaga,
    UpdateLanguageCountry,
} from "./pages/Setup/LanguageCountry/store";

import {
    AddLanguageValue,
    DeleteLanguageValue,
    GetAllLanguageValue,
    LanguageValue,
    LanguageValueSaga,
    UpdateLanguageValue,
} from "./pages/Setup/AddLanguage/store";

import {
    GetLocalizationDetails,
    LocalizationSaga,
    AddTranslationValue,
    GetTranslationValue,
    UpdateTranslationValue,
    DeleteTranslationValue,
} from "./pages/Setup/LocalizationDetails/store";

import {
    AddStreetType,
    DeleteStreetType,
    GetStreetType,
    StreetTypeSaga,
    UpdateStreetType,
} from "./pages/Setup/StreetType/store";

//Customer Process
import {
    GetCustomersReducer,
    GetCustomerByPartnersReducer,
    BlockUnblockReducer,
    CustomersSaga,
} from "./pages/Customers/Search/store";

import {
    GetCustomersByIdReducer,
    CreateCustomersReducer,
    UpdateCustomersReducer,
    CustomersCreateSaga,
} from "./pages/Customers/CreateCustomer/store";

//Banks

import {
    AddBankReducer,
    BankListSaga,
    DeleteBankReducer,
    GetBankListDetailsReducer,
    GetBankListReducer,
    UpdateBankReducer,
} from "./pages/Customers/Banks/store";

import { AllBankListActions, AllBankListSaga, GetAllBankListReducer } from "./pages/Customers/AllBanks/store";

//Documents
import {
    GetDocumentsReducer,
    GetDocumentsByIdReducer,
    UploadDocumentsReducer,
    UpdateKycReducer,
    DeleteDocumentsReducer,
    DocumentsCustomerSaga,
} from "./pages/Customers/Documents/store";

//Remarks
import {
    GetRemarksReducer,
    GetRemarksByIdReducer,
    CreateRemarksReducer,
    RemarksCustomerSaga,
} from "./pages/Customers/Remarks/store";

//Transactions
import {
    GetTransactionsReducer,
    GetTransactionByIdReducer,
    GetTransactionsByCustomerReducer,
    CalculateTransactionsReducer,
    CreateTransactionsReducer,
    UpdateTransactionsReducer,
    TransactionsSaga,
} from "./pages/Transactions/store";

import {
    GetTransactionRemarksReducer,
    GetTransactionRemarksByIdReducer,
    CreateTransactionRemarksReducer,
    RemarksTransactionSaga,
} from "./pages/Transactions/Remarks/store";

//Beneficiary
import {
    GetBeneficiaryByCustomerReducer,
    GetBeneficiaryByIdReducer,
    CreateBeneficiaryReducer,
    UpdateBeneficiaryReducer,
    BlockUnblockBeneficiaryReducer,
    BeneficiarySaga,
} from "./pages/Customers/Beneficiary/store";

//Payment Process
import {
    GetTransactionDetailsReducer,
    GetPaymentPendingReducer,
    GetPendingTransactionsReducer,
    GetBlockedTransactionsReducer,
    GetAmlSuspiciousReducer,
    GetAmlSuspiciousDetailsReducer,
    GetRefundBlockTransactionsReducer,
    GetExceptionTransactionsReducer,
    BlockTransactionsReducer,
    RefundTransactionsReducer,
    UpdatePaymentPendingReducer,
    UpdateBlockedTransactionsReducer,
    UpdateAmlSuspiciousReducer,
    UpdateExceptionTransactionsReducer,
    GetTransactionDocumentReducer,
    PaymentProcessingSaga,
    GetSanctionDetailsReducer,
} from "./pages/PaymentProcess/store";

//Reports
import {
    GetCustomerReportsReducer,
    DownloadReportsReducer,
    GetBeneficiaryReportsReducer,
    GetTransactionsSummaryReportsReducer,
    GetYearlyTransactionsReportsReducer,
    GetSuspiciousTransactionsReportsReducer,
    GetCancelledTransactionsReportsReducer,
    ReportsSaga,
} from "./pages/Reports/store";

//Utilities
import {
    GetSmsReducer,
    GetSmsByIdReducer,
    CreateSmsReducer,
    DeleteSmsReducer,
    GetEmailReducer,
    GetEmailByIdReducer,
    CreateEmailReducer,
    DeleteEmailReducer,
    GetFcmReducer,
    GetFcmByIdReducer,
    GetFcmByCustomerIdReducer,
    CreateFcmReducer,
    UpdateFcmReducer,
    DeleteFcmReducer,
    UtilitiesSaga,
} from "./pages/Utilities/store";

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

import {
    addBannerReducer,
    deleteBannerReducer,
    getBannersReducer,
    updateBannerReducer,
    updateBannerStatusReducer,
} from "./features/banners/bannerReducer";
import bannerSaga from "./features/banners/bannerSaga";

import {
    addCountryStateReducer,
    deleteCountryStateReducer,
    getCountryStatesReducer,
    updateCountryStateReducer,
} from "./features/country-states/countryStateReducer";
import countryStateSaga from "./features/country-states/countryStateSaga";

import {
    addFundingSourceReducer,
    deleteFundingSourceReducer,
    getFundingSourcesReducer,
    updateFundingSourceReducer,
    updateFundingSourceStatusReducer,
} from "./features/funding-sources/fundingSourceReducer";

import fundingSourceSaga from "./features/funding-sources/fundingSourceSaga";
import getIcnResponseReducer from "./pages/Reports/store/reducers/getIcnResponseReducer";
import getAchResponseReducer from "./pages/Reports/store/reducers/getAchResponseReducer";
import getUserIpWhitelistReportReducer from "./pages/Reports/store/reducers/getUserIpWhitelistReportReducer";
import getIncompleteRegistrationReducer from "./pages/Reports/store/reducers/getIncompleteRegistrationReducer";

import customerSaga from "./features/customers/customerSaga";
import { updateCustomerAccountReducer } from "./features/customers/customerReducer";
import getOnfidoReportReducer from "./pages/Reports/store/reducers/getOnfidoReportReducer";

import { UpdateChangePasswordReducer, UpdateChangePasswordSaga } from "./pages/Settings/store";

import {
    addBulkEmailGroupReducer,
    deleteBulkEmailGroupReducer,
    getBulkEmailGroupsReducer,
    updateBulkEmailGroupReducer,
} from "./features/bulk-emails/bulkEmailGroupReducer";
import bulkEmailGroupSaga from "./features/bulk-emails/bulkEmailGroupSaga";
import {
    addBulkEmailAddressReducer,
    deleteBulkEmailAddressReducer,
    getBulkEmailAddressesReducer,
    importBulkEmailAddressReducer,
    importConfirmBulkEmailAddressReducer,
    updateBulkEmailAddressReducer,
    updateBulkEmailAddressStatusReducer,
} from "./features/bulk-emails/bulkEmailAddressReducer";
import bulkEmailAddressSaga from "./features/bulk-emails/bulkEmailAddressSaga";
import {
    addBulkEmailContentReducer,
    deleteBulkEmailContentReducer,
    getBulkEmailContentsReducer,
    sendBulkEmailContentReducer,
    updateBulkEmailContentReducer,
    updateBulkEmailContentStatusReducer,
    viewBulkEmailContentReducer,
} from "./features/bulk-emails/bulkEmailContentReducer";
import bulkEmailContentSaga from "./features/bulk-emails/bulkEmailContentSaga";
import bulkEmailCredentialSaga from "./features/bulk-emails/bulkEmailCredentialSaga";
import {
    getBulkEmailCredentialReducer,
    updateBulkEmailCredentialReducer,
} from "./features/bulk-emails/bulkEmailCredentialReducer";

//MARKET MAKER

import {
    AddMarketMakerValueReducer,
    GetAllMarketMakerValueReducer,
    UpdateMarketMakerValueReducer,
    MarketMakerSaga,
    GetMarkerMakerByIdValueReducer,
    UpdateMarketMakerStatusReducer,

    //DOCUMENTS
    GetDocumentSettingsReducer,
    AddDocumentReducer,

    //KYB
    AddMarketMakerKYBReducer,
    UpdateMarketMakerKYBReducer,
} from "../Private/pages/MarketMaker/store";

//CREDIT LIMIT

import {
    AddCreditLimitReducer,
    GetAllCreditLimitReducer,
    GetCreditLimitByIdReducer,
    UpdateCreditLimitStatusReducer,
    creditLimitSaga,
} from "../Private/pages/CreditLimit/store";

// BALANCE REQUEST

import {
    BalanceRequestSaga,
    GetAllBalanceRequestValueReducer,
    GetBalanceRequestIdValueReducer,
    UpdateBalanceRequestStatusReducer,
} from "../Private/pages/BalanceRequest/store";

// Business

import {
    AddBusinessApprovalReducer,
    GetAllBusinessReducer,
    GetBusinessByIdReducer,
    UpdateBusinessStatusReducer,
    GetBusinessKybListingReducer,
    GetBusinessKycListingReducer,
    GetBusinessKycDetailsReducer,
    UpdateBusinessKycStatusReducer,
    GetBusinessKybDetailsReducer,
    UpdateBusinessKybStatusReducer,
    businessSaga,
} from "../Private/pages/Business/store";

export const privateReducer = {
    get_all_user: GetAllUserReducer,
    get_user_details: GetUserDetailsReducer,
    get_user_details_id: GetUserDetailByIdReducer,
    add_user: AddUserReducer,
    update_user: UpdateUserReducer,
    delete_user: DeleteUserReducer,
    update_user_status: UpdateUserStatusReducer,
    get_user_number: GetUserNumberReducer,
    forgot_password: ForgotPasswordReducer,

    //Change Password

    change_password: UpdateChangePasswordReducer,

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

    get_all_language_option: GetAllLanguageOptions,
    get_all_language_option_details: GetAllLanguageOptionsDetails,
    add_language_option: AddLanguageOptions,
    update_language_option: UpdateLanguageOption,
    delete_language_option: DeleteLanguageOption,

    get_all_language_country: GetAllLanguageCountry,
    // get_all_language_option_details: GetAllLanguageOptionsDetails,
    add_language_country: AddLanguageCountry,
    update_language_country: UpdateLanguageCountry,
    delete_language_country: DeleteLanguageCountry,

    get_all_language_value: GetAllLanguageValue,
    add_language_value: AddLanguageValue,
    update_language_value: UpdateLanguageValue,
    delete_language_value: DeleteLanguageValue,

    get_localization_details: GetLocalizationDetails,
    add_translation_value: AddTranslationValue,
    get_translation_value: GetTranslationValue,
    update_translation_value: UpdateTranslationValue,
    delete_translation_value: DeleteTranslationValue,

    get_street_type: GetStreetType,
    add_street_type: AddStreetType,
    update_street_type: UpdateStreetType,
    delete_street_type: DeleteStreetType,

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

    //branch
    get_all_branch_by_partner: GetBranchByPartnerReducer,
    get_branch_details: GetBranchDetailsReducer,
    add_branch: AddBranchReducer,
    update_branch: UpdateBranchReducer,
    delete_branch: DeleteBranchReducer,

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

    //setup promo
    get_promo_setup: GetPromoSetupReducer,
    get_promo_setup_details: GetPromoSetupDetailsReducer,
    add_promo_setup: AddPromoSetupReducer,
    update_promo_setup: UpdatePromoSetupReducer,
    delete_promo_setup: DeletePromoSetupReducer,

    //promo code
    get_promo_code: GetPromoCodeReducer,
    delete_promo_code: DeletePromoCodeReducer,
    add_promo_code: AddPromoCodeReducer,
    import_promo_code: ImportPromoCodeReducer,

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

    //api config
    get_api_config: GetApiConfigReducer,
    get_api_config_details: GetApiConfigDetailsReducer,
    add_api_config: AddApiConfigReducer,
    update_api_config: UpdateApiConfigReducer,

    //Customer
    get_customers: GetCustomersReducer,
    get_customers_by_partner: GetCustomerByPartnersReducer,
    block_unblock_customer: BlockUnblockReducer,
    get_customer_byid: GetCustomersByIdReducer,
    create_customers: CreateCustomersReducer,
    update_customers: UpdateCustomersReducer,

    //Customer Bank

    get_all_bank: GetBankListReducer,
    get_bank_details: GetBankListDetailsReducer,

    //ALL BANKS
    get_all_bank_list: GetAllBankListReducer,

    //Documents
    get_documents: GetDocumentsReducer,
    get_documents_byid: GetDocumentsByIdReducer,
    upload_documents: UploadDocumentsReducer,
    update_kyc: UpdateKycReducer,
    delete_documents: DeleteDocumentsReducer,

    //Remarks
    get_remarks: GetRemarksReducer,
    get_remarks_byid: GetRemarksByIdReducer,
    create_remarks: CreateRemarksReducer,

    //Transactions
    get_transactions: GetTransactionsReducer,
    get_transactions_byid: GetTransactionByIdReducer,
    get_transactions_by_customer: GetTransactionsByCustomerReducer,
    calculate_transactions: CalculateTransactionsReducer,
    create_transactions: CreateTransactionsReducer,
    update_transactions: UpdateTransactionsReducer,

    get_transaction_remarks: GetTransactionRemarksReducer,
    get_transaction_remarks_byid: GetTransactionRemarksByIdReducer,
    create_transaction_remarks: CreateTransactionRemarksReducer,

    //Beneficiary
    get_beneficiary_by_customer: GetBeneficiaryByCustomerReducer,
    get_beneficiary_byid: GetBeneficiaryByIdReducer,
    create_beneficiary: CreateBeneficiaryReducer,
    update_beneficiary: UpdateBeneficiaryReducer,
    block_unblock_beneficiary: BlockUnblockBeneficiaryReducer,

    //Payment Process
    get_transaction_details: GetTransactionDetailsReducer,
    get_payment_pending: GetPaymentPendingReducer,
    get_pending_transactions: GetPendingTransactionsReducer,
    get_blocked_transactions: GetBlockedTransactionsReducer,
    get_aml_suspicious: GetAmlSuspiciousReducer,
    get_aml_suspicious_details: GetAmlSuspiciousDetailsReducer,
    get_exception_transactions: GetExceptionTransactionsReducer,
    get_transaction_refund_block: GetRefundBlockTransactionsReducer,
    block_transactions: BlockTransactionsReducer,
    refund_transactions: RefundTransactionsReducer,
    update_payment_pending: UpdatePaymentPendingReducer,
    update_blocked_transactions: UpdateBlockedTransactionsReducer,
    update_aml_suspicious: UpdateAmlSuspiciousReducer,
    update_exception_transactions: UpdateExceptionTransactionsReducer,
    get_transaction_documents: GetTransactionDocumentReducer,
    get_sanction_details: GetSanctionDetailsReducer,

    //Reports
    get_customer_report: GetCustomerReportsReducer,
    download_report: DownloadReportsReducer,
    get_beneficiary_report: GetBeneficiaryReportsReducer,
    get_transactions_summary_report: GetTransactionsSummaryReportsReducer,
    get_yearly_transactions_report: GetYearlyTransactionsReportsReducer,
    get_suspicious_transactions_report: GetSuspiciousTransactionsReportsReducer,
    get_cancelled_report: GetCancelledTransactionsReportsReducer,
    get_user_ip_whitelist_report: getUserIpWhitelistReportReducer,
    get_icn_response_report: getIcnResponseReducer,
    get_ach_entries_report: getAchResponseReducer,
    get_incomplete_registration_report: getIncompleteRegistrationReducer,
    get_onfido_report: getOnfidoReportReducer,

    //reference type and data
    get_sms: GetSmsReducer,
    get_sms_byid: GetSmsByIdReducer,
    create_sms: CreateSmsReducer,
    delete_sms: DeleteSmsReducer,

    get_email: GetEmailReducer,
    get_email_byid: GetEmailByIdReducer,
    create_email: CreateEmailReducer,
    delete_email: DeleteEmailReducer,

    get_fcm: GetFcmReducer,
    get_fcm_byid: GetFcmByIdReducer,
    get_fcm_by_customer_id: GetFcmByCustomerIdReducer,
    create_fcm: CreateFcmReducer,
    update_fcm: UpdateFcmReducer,
    delete_fcm: DeleteFcmReducer,

    //Sanction
    get_sanction_list: GetSanctionListReducer,
    get_sanction_by_id: GetSanctionByIdReducer,
    add_sanction: AddSanctionReducer,
    import_sanction: ImportSanctionReducer,
    update_sanction: UpdateSanctionReducer,
    delete_sanction: DeleteSanctionReducer,

    // banners
    get_banner_list: getBannersReducer,
    add_banner: addBannerReducer,
    update_banner: updateBannerReducer,
    update_banner_status: updateBannerStatusReducer,
    delete_banner: deleteBannerReducer,

    // country states
    get_country_state_list: getCountryStatesReducer,
    add_country_state: addCountryStateReducer,
    update_country_state: updateCountryStateReducer,
    delete_country_state: deleteCountryStateReducer,

    // funding sources
    get_funding_source_list: getFundingSourcesReducer,
    add_funding_source: addFundingSourceReducer,
    update_funding_source: updateFundingSourceReducer,
    update_funding_source_status: updateFundingSourceStatusReducer,
    delete_funding_source: deleteFundingSourceReducer,

    update_customer_account: updateCustomerAccountReducer,

    // bulk-emails,
    get_bulk_email_group_list: getBulkEmailGroupsReducer,
    add_bulk_email_group: addBulkEmailGroupReducer,
    update_bulk_email_group: updateBulkEmailGroupReducer,
    delete_bulk_email_group: deleteBulkEmailGroupReducer,

    get_bulk_email_address_list: getBulkEmailAddressesReducer,
    add_bulk_email_address: addBulkEmailAddressReducer,
    update_bulk_email_address: updateBulkEmailAddressReducer,
    delete_bulk_email_address: deleteBulkEmailAddressReducer,
    import_bulk_email_address: importBulkEmailAddressReducer,
    update_bulk_email_address_status: updateBulkEmailAddressStatusReducer,
    import_confirm_bulk_email_address: importConfirmBulkEmailAddressReducer,

    get_bulk_email_content_list: getBulkEmailContentsReducer,
    add_bulk_email_content: addBulkEmailContentReducer,
    update_bulk_email_content: updateBulkEmailContentReducer,
    delete_bulk_email_content: deleteBulkEmailContentReducer,
    update_bulk_email_content_status: updateBulkEmailContentStatusReducer,
    view_bulk_email_content: viewBulkEmailContentReducer,
    send_bulk_email_content: sendBulkEmailContentReducer,

    get_bulk_email_credential: getBulkEmailCredentialReducer,
    update_bulk_email_credential: updateBulkEmailCredentialReducer,

    //MARKET_MAKER

    get_all_market_maker: GetAllMarketMakerValueReducer,
    get_market_maker_details: GetMarkerMakerByIdValueReducer,
    add_market_maker: AddMarketMakerValueReducer,
    update_market_maker: UpdateMarketMakerValueReducer,
    update_market_maker_status: UpdateMarketMakerStatusReducer,

    //DOCUMENTS

    get_document_settings: GetDocumentSettingsReducer,
    add_document: AddDocumentReducer,

    // KYB

    add_market_maker_kyb: AddMarketMakerKYBReducer,
    update_market_maker_kyb: UpdateMarketMakerKYBReducer,

    //CREDIT LIMIT
    get_all_credit_limit: GetAllCreditLimitReducer,
    get_credit_limit_details: GetCreditLimitByIdReducer,
    add_credit_limit: AddCreditLimitReducer,
    update_credit_limit: UpdateCreditLimitStatusReducer,

    // BALANCE REQUEST

    get_all_balance_request: GetAllBalanceRequestValueReducer,
    get_balance_request_details: GetBalanceRequestIdValueReducer,
    update_balance_request_status: UpdateBalanceRequestStatusReducer,

    //Business

    get_all_business: GetAllBusinessReducer,
    get_business_details: GetBusinessByIdReducer,
    get_business_kyc: GetBusinessKycListingReducer,
    get_business_kyb: GetBusinessKybListingReducer,
    add_business_approval: AddBusinessApprovalReducer,
    update_business_status: UpdateBusinessStatusReducer,
    get_business_kyc_details: GetBusinessKycDetailsReducer,
    update_business_kyc_status: UpdateBusinessKycStatusReducer,
    get_business_kyb_details: GetBusinessKybDetailsReducer,
    update_business_kyb_status: UpdateBusinessKybStatusReducer,
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
    PromoSetupSaga(),
    ExchangeRateSaga(),
    ReferenceSaga(),
    ApiConfigSaga(),
    CustomersSaga(),
    DocumentsCustomerSaga(),
    RemarksCustomerSaga(),
    TransactionsSaga(),
    RemarksTransactionSaga(),
    CustomersCreateSaga(),
    BeneficiarySaga(),
    PaymentRulesSaga(),
    SanctionSaga(),
    PaymentProcessingSaga(),
    ReportsSaga(),
    UtilitiesSaga(),
    bannerSaga(),
    countryStateSaga(),
    fundingSourceSaga(),
    customerSaga(),
    bulkEmailGroupSaga(),
    bulkEmailAddressSaga(),
    bulkEmailContentSaga(),
    bulkEmailCredentialSaga(),
    LanguageOptionSaga(),
    LanguageCountrySaga(),
    LanguageValueSaga(),
    LocalizationSaga(),
    BankListSaga(),
    AllBankListSaga(),
    StreetTypeSaga(),
    UpdateChangePasswordSaga(),
    MarketMakerSaga(),
    creditLimitSaga(),
    BalanceRequestSaga(),
    businessSaga(),
];

export { default as privateRoutes } from "./config/routes";
