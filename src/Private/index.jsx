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
    AddUserKycReducer,
    EditSystemUserKycReducer,
    AccountSaga,
} from "./pages/Users/Accounts/store";

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
    RefreshExchangeRateReducer,
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
    GetAllCustomerKycCountByStatusReducer,
} from "./pages/Customers/Search/store";

import {
    GetCustomersByIdReducer,
    CreateCustomersReducer,
    UpdateCustomersReducer,
    CustomersCreateSaga,
} from "./pages/Customers/Customer/store";

import { UploadProfilePictureReducer, UploadProfilePictureSaga } from "./pages/Auth/MyAccount/store";

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

import {
    GetAllCustomerDeleteListReducer,
    GetCustomerDeleteDetailReducer,
    UpdateCustomerDeleteReducer,
    customerDeleteSaga,
} from "./pages/Customers/DeleteList/store";

//Documents
import {
    GetDocumentsReducer,
    GetDocumentsByIdReducer,
    UploadDocumentsReducer,
    UpdateKycReducer,
    DeleteDocumentsReducer,
    DocumentsCustomerSaga,
    ResetKycVerificationReducer,
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
    DownloadTransactionPdfReducer,
    SendMailTransactionReducer,
    GetZaiAustraliaPaymentReducer,
    GetBalanceDetailsReducers,
    GetZaiLogsReducer,
    GetRefundPaymentReducer,
    GetMakePaymentReducer,
    GetZaiRefundLogsReducer,
    GetZaiPaymentModalReducers,
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
    getReferralReportsReducer,
    getReferralReportByIdReducer,
    getCampaignReportsReducer,
    getCampaignReportDetailsReducer,
    getCampaignLedgerReportsReducer,
    getCampaignUsageReportReducer,
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
    ResendNotification,
    ViewFcmReducer,
    ViewSmsReducer,
    ViewEmailReducer,
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

import { UpdateChangePasswordReducer, UpdateChangePasswordSaga } from "./pages/Auth/Settings/store";

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

    //KYC
    AddMarketMakerKYCReducer,
    EditMarketMakerKYCReducer,

    //USERS
    GetMarketMakerUsersReducer,
} from "./pages/Agent/MarketMaker/store";

//CREDIT LIMIT

import {
    AddCreditLimitReducer,
    GetAllCreditLimitReducer,
    GetCreditLimitByIdReducer,
    UpdateCreditLimitStatusReducer,
    EditCreditLimitByIdReducer,
    DeleteCreditLimitByIdReducer,
    creditLimitSaga,
} from "../Private/pages/Agent/CreditLimit/store";

// BALANCE REQUEST

import {
    BalanceRequestSaga,
    GetAllBalanceRequestValueReducer,
    GetBalanceRequestIdValueReducer,
    UpdateBalanceRequestStatusReducer,
} from "../Private/pages/Agent/BalanceRequest/store";

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
    UpdateBusinessReducer,
    businessSaga,
    ChangeBusinessStatusReducer,
    ToggleBusinessActiveStatusReducer,
} from "../Private/pages/Agent/Business/store";
import {
    getSingleTransactionReducer,
    getSingleTransactionsReducer,
} from "./features/b2b-transactions/singleTransactionReducer";
import {
    getBatchTransactionReducer,
    getBatchTransactionsReducer,
} from "./features/b2b-transactions/batchTransactionReducer";
import singleTransactionSaga from "./features/b2b-transactions/singleTransactionSaga";
import batchTransactionSaga from "./features/b2b-transactions/batchTransactionSaga";

//B2B Beneficiary List

import {
    GetAllB2BBeneficiaryReducer,
    GetB2BBeneficiaryByIdReducer,
    beneficiarySaga,
} from "./pages/Agent/Beneficiary/store";

// region: Business Charge
import {
    GetAllBusinessChargeByIdReducer,
    GetAllBusinessChargeReducer,
    AddBusinessChargeReducer,
    UpdateBusinessChargeStatusReducer,
    UpdateBusinessChargeReducer,
    businessChargeSaga,
} from "Private/pages/Agent/BusinessServiceCharge/store";

import {
    GetAllKycUserValueReducer,
    GetKycUserIdValueReducer,
    KycUserSaga,
    UpdateKycUserStatusReducer,
} from "Private/pages/Agent/KycUser/store";

//Ledger

import {
    GetAllLedgerReducer,
    GetLedgerDetailsReducer,
    AddLedgerReducer,
    ledgerSaga,
} from "Private/pages/Agent/Ledger/store";

import { GetAllB2bAccounts, b2bAccountSaga } from "Private/pages/Agent/B2BAccount/store";

import { ListAccountReducer, accountListSaga, ListAccountDetailReducer } from "Private/pages/Agent/AccountList/store";

import { AddCommentReducer, GetAllCommentsReducer, commentSaga } from "Private/pages/Transactions/Comments/store";

import {
    GetAllAttachmentsReducer,
    UploadAttachmentReducer,
    attachmentSaga,
} from "Private/pages/Transactions/Attachments/store";

import {
    GetACHTransactionReducer,
    UpdateAchTransactionStatusReducer,
    achTransactionSaga,
} from "Private/pages/Transactions/AchTransactions/store";
import { addCountryReducer, getCountryReducer, updateCountryReducer } from "./features/countries/countryReducer";
import countrySaga from "./features/countries/countrySaga";
import documentAcceptanceSaga, {
    getDocumentAcceptanceList,
} from "./features/documentAcceptance/documentAcceptanceSaga";
import {
    addDocumentAcceptanceReducer,
    getDocumentAcceptanceReducer,
    updateDocumentAcceptanceReducer,
} from "./features/documentAcceptance/documentAcceptanceReducer";

import attributeFamilySaga from "./features/attributeFamily/attributeFamilySaga";
import {
    addAttributeFamilyReducer,
    getAttributeFamilyReducer,
    updateAttributeFamilyReducer,
    deleteAttributeFamilyReducer,
} from "./features/attributeFamily/attributeFamilyReducer";

// region: User Profile Setup
import {
    UserProfileSetupSaga,
    AddUserProfileSetupReducer,
    UpdateUserProfileSetupReducer,
    GetUserProfileSetupsReducer,
    GetUserProfileSetupByIdReducer,
    GetUserProfileSetupsForSelectReducer,
} from "./pages/Users/ProfileSetups/store";
import {
    addEmailTemplateReducer,
    getEmailTemplateReducer,
    getEmailTemplateTagReducer,
    updateEmailTemplateReducer,
} from "./components/email-template/store/reducer/emailTemplateReducer";
import EmailTemplateSaga from "./components/email-template/store/emailTemplateSaga";

import {
    getEmailElementReducer,
    addEmailElementReducer,
    updateEmailElementReducer,
} from "./components/email-template/store/reducer/emailElementReducer";
// region: Dashboard
import {
    DashboardSaga,
    GetCustomerCountByDeviceTypeReducer,
    GetCustomerKycCountByStatusReducer,
    GetTransactionCountByStatusReducer,
    DashboardFilterParamsReducer,
    GetCustomerKycCountByStatusPreviousReducer,
} from "./pages/Dashboard/store";
import {
    GetOrganizationStakeholdersReducer,
    GetIndividualStakeholdersReducer,
    AddOrganizationStakeholderReducer,
    AddIndividualStakeholderReducer,
    UpdateOrganizationStakeholderReducer,
    UpdateIndividualStakeholderReducer,
    StakeholderSaga,
    GetOrganizationStakeholderByIdReducer,
    GetIndividualStakeholderByIdReducer,
    UpdateOrganizationStakeholderStatusReducer,
    UpdateIndividualStakeholderStatusReducer,
} from "./pages/Agent/Stakeholder/store";
import {
    B2BUserSaga,
    GetB2BUsersReducer,
    ChangeB2BUserStatusReducer,
    GetB2BUserKycByIdReducer,
} from "./pages/Agent/User/store";

// region: ach webhooks

import {
    AchWebhooksSaga,
    GetAchCirWebhooksReducer,
    GetAchRdfiWebhooksReducer,
    GetAchRejectWebhooksReducer,
    GetAchReturnWebhooksReducer,
    ReturnAchRdfiTransactionReducer,
    GetAchOdfiWebhooksReducer,
    GetAchNocWebhooksReducer,
} from "./pages/AchWebhooks/store";
import {
    CreateHelpCenterReducer,
    GetHelpCenterReducer,
    HelpCenterSaga,
    UpdateHelpCenterReducer,
} from "./pages/Agent/HelpCenter/store";

import {
    AcceptRejectB2BAccountClosureRequestReducer,
    GetB2BAccountClosureRequestReducer,
    B2BAccountClosureRequestSaga,
    ViewB2BAccountClosureRequestReducer,
} from "./pages/Agent/AccountClosureRequest/store";
import { CustomerKycLogsSaga, GetCustomerKycLogsReducer } from "./pages/Customers/KycLogs/store";
import {
    GetPromoCodeReducer,
    AddPromoCodeReducer,
    GetPromoCodeByIdReducer,
    PromoCodeSagas,
    UpdatePromoCodeStatusReducer,
    AddPromoCodeBudgetReducer,
    GetPromoCodeUsageReducers,
    UpdatePromoCodeReducer,
} from "./pages/PromoCode/store";
import {
    AddPromoSetupReducer,
    DeletePromoSetupReducer,
    GetPromoSetupDetailsReducer,
    GetPromoSetupReducer,
    UpdatePromoSetupReducer,
} from "./pages/Setup/PromoSetup/store";

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
    add_system_user_kyc: AddUserKycReducer,
    update_system_user_kyc: EditSystemUserKycReducer,

    //Change Password

    change_password: UpdateChangePasswordReducer,

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

    //exchange charge
    get_all_exchange_rate: GetAllExchangeRateReducer,
    get_exchange_rate_by_partner: GetExchangeRateByPartnerReducer,
    get_exchange_rate_details: GetExchangeRateDetailsReducer,
    add_exchange_rate: AddExchangeRateReducer,
    update_exchange_rate: UpdateExchangeRateReducer,
    delete_excahnge_rate: DeleteExchangeRateReducer,
    refresh_exchange_rate: RefreshExchangeRateReducer,

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
    get_customer_by_id: GetCustomersByIdReducer,
    create_customers: CreateCustomersReducer,
    update_customers: UpdateCustomersReducer,
    get_all_customer_kyc_count_by_status: GetAllCustomerKycCountByStatusReducer,

    // Upload Image

    upload_profile_picture: UploadProfilePictureReducer,

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
    reset_kyc_verification: ResetKycVerificationReducer,

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
    get_zai_australia_payment_details: GetZaiAustraliaPaymentReducer,
    get_balance_details: GetBalanceDetailsReducers,
    get_zai_logs: GetZaiLogsReducer,
    get_zai_payment_logs: GetZaiPaymentModalReducers,
    make_payment: GetMakePaymentReducer,
    refund_payment: GetRefundPaymentReducer,
    get_zai_refund_logs: GetZaiRefundLogsReducer,

    // GET_BALANCE_DETAILS

    block_transactions: BlockTransactionsReducer,
    refund_transactions: RefundTransactionsReducer,
    update_payment_pending: UpdatePaymentPendingReducer,
    update_blocked_transactions: UpdateBlockedTransactionsReducer,
    update_aml_suspicious: UpdateAmlSuspiciousReducer,
    update_exception_transactions: UpdateExceptionTransactionsReducer,
    get_transaction_documents: GetTransactionDocumentReducer,
    get_sanction_details: GetSanctionDetailsReducer,
    download_transaction_pdf: DownloadTransactionPdfReducer,
    send_mail_transaction: SendMailTransactionReducer,

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
    get_referral_reports: getReferralReportsReducer,
    get_referral_report_by_id: getReferralReportByIdReducer,
    get_campaign_reports: getCampaignReportsReducer,
    get_campaign_report_details: getCampaignReportDetailsReducer,
    get_campaign_ledger_report: getCampaignLedgerReportsReducer,
    get_campaign_code_report_usage: getCampaignUsageReportReducer,

    //reference type and data
    get_sms: GetSmsReducer,
    get_sms_by_id: GetSmsByIdReducer,
    create_sms: CreateSmsReducer,
    delete_sms: DeleteSmsReducer,
    view_sms: ViewSmsReducer,

    get_email: GetEmailReducer,
    get_email_byid: GetEmailByIdReducer,
    create_email: CreateEmailReducer,
    delete_email: DeleteEmailReducer,
    view_email: ViewEmailReducer,

    get_fcm: GetFcmReducer,
    get_fcm_byid: GetFcmByIdReducer,
    get_fcm_by_customer_id: GetFcmByCustomerIdReducer,
    create_fcm: CreateFcmReducer,
    update_fcm: UpdateFcmReducer,
    delete_fcm: DeleteFcmReducer,
    resend_notification: ResendNotification,

    view_fcm: ViewFcmReducer,

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

    // countries
    get_countries: getCountryReducer,
    add_country: addCountryReducer,
    update_country: updateCountryReducer,

    //documentAcceptance
    get_document_acceptance_list: getDocumentAcceptanceReducer,
    add_document_acceptance: addDocumentAcceptanceReducer,
    update_document_acceptance: updateDocumentAcceptanceReducer,

    //emailTemplate

    get_email_templates: getEmailTemplateReducer,
    get_email_template_tags: getEmailTemplateTagReducer,
    add_email_template: addEmailTemplateReducer,
    update_email_template: updateEmailTemplateReducer,
    get_email_element: getEmailElementReducer,
    add_email_element: addEmailElementReducer,
    update_email_element: updateEmailElementReducer,

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

    // KYC

    add_market_maker_kyc: AddMarketMakerKYCReducer,
    update_market_maker_kyc: EditMarketMakerKYCReducer,

    //MARKET MAKER USERS

    get_market_maker_users: GetMarketMakerUsersReducer,

    //CREDIT LIMIT
    get_all_credit_limit: GetAllCreditLimitReducer,
    get_credit_limit_details: GetCreditLimitByIdReducer,
    add_credit_limit: AddCreditLimitReducer,
    update_credit_limit: UpdateCreditLimitStatusReducer,
    update_credit_limit_data: EditCreditLimitByIdReducer,

    delete_credit_limit: DeleteCreditLimitByIdReducer,

    // BALANCE REQUEST

    get_all_balance_request: GetAllBalanceRequestValueReducer,
    get_balance_request_details: GetBalanceRequestIdValueReducer,
    update_balance_request_status: UpdateBalanceRequestStatusReducer,

    // region B2B - Business
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
    update_business: UpdateBusinessReducer,
    change_business_status: ChangeBusinessStatusReducer,
    toggle_business_active_status: ToggleBusinessActiveStatusReducer,

    // region B2B - Stakeholders
    get_organization_stakeholders: GetOrganizationStakeholdersReducer,
    get_individual_stakeholders: GetIndividualStakeholdersReducer,
    add_organization_stakeholder: AddOrganizationStakeholderReducer,
    update_organization_stakeholder: UpdateOrganizationStakeholderReducer,
    add_individual_stakeholder: AddIndividualStakeholderReducer,
    update_individual_stakeholder: UpdateIndividualStakeholderReducer,
    get_organization_stakeholder_by_id: GetOrganizationStakeholderByIdReducer,
    get_individual_stakeholder_by_id: GetIndividualStakeholderByIdReducer,
    change_organization_stakeholder_status: UpdateOrganizationStakeholderStatusReducer,
    change_individual_stakeholder_status: UpdateIndividualStakeholderStatusReducer,

    // region B2B - Users
    get_b2b_users: GetB2BUsersReducer,
    get_b2b_user_kyc_by_id: GetB2BUserKycByIdReducer,
    change_b2b_user_status: ChangeB2BUserStatusReducer,

    // region B2B - Account Closure Request
    get_b2b_account_closure_request: GetB2BAccountClosureRequestReducer,
    view_b2b_account_closure_request: ViewB2BAccountClosureRequestReducer,
    accept_reject_b2b_account_closure_request: AcceptRejectB2BAccountClosureRequestReducer,

    get_single_transaction_list: getSingleTransactionsReducer,
    get_single_transaction_by_id: getSingleTransactionReducer,

    get_batch_transaction_list: getBatchTransactionsReducer,
    get_batch_transaction_by_id: getBatchTransactionReducer,

    //B2B Beneficiary List
    get_all_beneficiary: GetAllB2BBeneficiaryReducer,
    get_beneficiary_details: GetB2BBeneficiaryByIdReducer,

    //Business Charge
    get_all_business_charge: GetAllBusinessChargeReducer,
    get_business_charge_details: GetAllBusinessChargeByIdReducer,
    add_business_charge: AddBusinessChargeReducer,
    update_business_charge_status: UpdateBusinessChargeStatusReducer,
    update_business_charge: UpdateBusinessChargeReducer,

    //KYC USER
    get_all_kyc_user: GetAllKycUserValueReducer,
    get_kyc_user_details: GetKycUserIdValueReducer,
    update_kyc_user_status: UpdateKycUserStatusReducer,

    //LEDGER
    get_all_ledger: GetAllLedgerReducer,
    get_ledger_details: GetLedgerDetailsReducer,
    add_ledger: AddLedgerReducer,

    //B2B ACCOUNT

    get_all_b2b_account: GetAllB2bAccounts,

    //ACCOUNT LIST

    get_all_account_list: ListAccountReducer,
    get_account_balance_by_id: ListAccountDetailReducer,

    //Customer Delete List
    get_all_customer_delete_list: GetAllCustomerDeleteListReducer,
    get_customer_delete_details: GetCustomerDeleteDetailReducer,
    update_delete_request: UpdateCustomerDeleteReducer,

    //Comment Reducers

    get_all_comments: GetAllCommentsReducer,
    add_comment: AddCommentReducer,

    // Attachment Reducers
    get_all_attachments: GetAllAttachmentsReducer,
    upload_attachment: UploadAttachmentReducer,

    //ACH Transactions

    get_ach_transactions: GetACHTransactionReducer,
    update_ach_transaction_status: UpdateAchTransactionStatusReducer,

    // region: User Profile Setup
    list_user_profile_setup: GetUserProfileSetupsReducer,
    get_user_profile_setup_by_id: GetUserProfileSetupByIdReducer,
    add_user_profile_setup: AddUserProfileSetupReducer,
    update_user_profile_setup: UpdateUserProfileSetupReducer,
    list_user_profile_setup_for_select: GetUserProfileSetupsForSelectReducer,

    // region: Dashboard
    get_customer_count_by_device_type: GetCustomerCountByDeviceTypeReducer,
    get_customer_kyc_count_by_status: GetCustomerKycCountByStatusReducer,
    get_customer_kyc_count_by_status_previous: GetCustomerKycCountByStatusPreviousReducer,
    get_transaction_count_by_status: GetTransactionCountByStatusReducer,
    dashboard_filter_params: DashboardFilterParamsReducer,

    // region ACH Webhooks
    get_ach_rdfi_webhooks: GetAchRdfiWebhooksReducer,
    get_ach_cir_webhooks: GetAchCirWebhooksReducer,
    get_ach_return_webhooks: GetAchReturnWebhooksReducer,
    get_ach_reject_webhooks: GetAchRejectWebhooksReducer,
    return_ach_rdfi_transaction: ReturnAchRdfiTransactionReducer,
    get_ach_odfi_webhooks: GetAchOdfiWebhooksReducer,
    get_ach_noc_webhooks: GetAchNocWebhooksReducer,

    //region: Help Center

    list_help_center: GetHelpCenterReducer,
    create_help_center: CreateHelpCenterReducer,
    update_help_center: UpdateHelpCenterReducer,

    // region: Customer
    get_customer_kyc_logs: GetCustomerKycLogsReducer,

    //region: Promo Codes
    get_promo_codes: GetPromoCodeReducer,
    get_promo_code_Usage: GetPromoCodeUsageReducers,
    get_promo_code_by_id: GetPromoCodeByIdReducer,
    add_promo_code: AddPromoCodeReducer,
    update_promo_code: UpdatePromoCodeReducer,
    add_promo_code_budget: AddPromoCodeBudgetReducer,
    update_promo_code_status: UpdatePromoCodeStatusReducer,

    // campaign Attribute
    get_attribute_family_list: getAttributeFamilyReducer,
    delete_attribute_family: deleteAttributeFamilyReducer,
    add_attribute_family: addAttributeFamilyReducer,
    update_attribute_family: updateAttributeFamilyReducer,
};

export const privateSaga = [
    AccountSaga(),
    DeliveryOptionSaga(),
    DeliveryRouteSaga(),
    PartnerSaga(),
    PartnerBankSaga(),
    PayoutLocationSaga(),
    ServiceChargeSaga(),
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
    singleTransactionSaga(),
    batchTransactionSaga(),
    beneficiarySaga(),
    businessChargeSaga(),
    KycUserSaga(),
    ledgerSaga(),
    b2bAccountSaga(),
    accountListSaga(),
    customerDeleteSaga(),
    commentSaga(),
    attachmentSaga(),
    achTransactionSaga(),
    countrySaga(),
    documentAcceptanceSaga(),
    UserProfileSetupSaga(),
    EmailTemplateSaga(),
    DashboardSaga(),
    UploadProfilePictureSaga(),
    StakeholderSaga(),
    B2BUserSaga(),
    AchWebhooksSaga(),
    HelpCenterSaga(),
    B2BAccountClosureRequestSaga(),
    CustomerKycLogsSaga(),
    PromoCodeSagas(),
    attributeFamilySaga(),
];

export { default as privateRoutes } from "./config/routes";
