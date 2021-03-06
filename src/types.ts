import {SettingsResource} from './resources/SettingsResource';
import {PayConditionsResource} from './resources/PayConditionsResource';
import {OffersResource} from './resources/OffersResource';
import {ArticlesResource} from './resources/ArticlesResource';
import {TodosResource} from './resources/TodosResource';
import {CustomersResource} from './resources/CustomersResource';
import {ExpensesResource} from './resources/ExpensesResource';
import {InvoicesResource} from './resources/InvoicesResource';

export type ApiResponse<T> = {
    meta: {}
    data: T
}

export type Article = {
    calculationBase?: 'gross' | 'net'
    category?: string
    description?: string
    notes?: string
    notesAlert?: boolean
    number: string
    price?: number
    priceGross?: number
    title: string
    unit?: string
    vatPercent?: number
}

export type ArticlePaginationOptions =
    BasePaginationOptions
    & PaginationDescending
    & PaginationSearchText
    & {
    orderBy?: 'number' | 'title'
}

export type ArticlePostInvoiceMixed = {
    existingArticle: BaseArticlePostInvoiceArticle & {
        id: number
    }[]
    newArticle: BaseArticlePostInvoiceArticle & {
        amount?: number
        discount: number
        price?: number
        title?: string
        unit?: string
        vatPercent: number
    }[]
}

export type ArticlePostInvoice =
    ArticlePostInvoiceMixed
    | Omit<ArticlePostInvoiceMixed, 'newArticle'>
    | Omit<ArticlePostInvoiceMixed, 'existingArticle'>

export type ArticleSetting = {
    autoCreateArticles?: boolean
    categories?: string
    units?: string
}

export type AuthTokenResponse = {
    token: string
}

type BaseArticlePostInvoiceArticle = {
    amount: number
    discount: number
}

type BasePostInvoiceCustomerData<T> = BasePostInvoice & {
    customerData: T
    customerId?: never
}

export type BasePaginationOptions = {
    limit?: number
    offset?: number
}

type BasePostInvoice = {
    date: string
    infoSectionCustomFields?:
        [InfoSectionCustomField?, InfoSectionCustomField?, InfoSectionCustomField?]
    options?: {
        deliveryDateEnd?: number
        deliveryDateStart?: string
        dueDays?: number
        showArticleNumber?: boolean
    }
    payConditionId: number
    priceKind?: 'net' | 'gross'
    texts?: {
        conclusion?: boolean
        introduction?: string
    }
    title?: string
}

export type ClientConfig = {
    accessToken?: string
    apiKey: string
    apiKeySecret: string
    installationId?: string
}

export type Customer = {
    address: {
        city: string
        isoCountry: string
        street: string
        zipCode: string

    }
    companyName: string
    companyNameAffix: string
    discount: number
    fax: string
    firstName: string
    id: number
    kind: 'company' | 'person'
    lastName: string
    mobile: string
    name: string
    notes: string
    notesAlert: boolean
    number: string
    payConditionId: number
    phone1: string
    phone2: string
    salutation: string
    title: string
    website: string
}

export type CustomerData = {
    city: string
    description: string
    firstName: string
    lastName: string
    name: string
    number: string
    salutation: string
    street: string
    title: string
    zipCode: string
}

export type CustomerPaginationOptions =
    BasePaginationOptions
    & PaginationDescending
    & PaginationSearchText
    & {
    orderBy?: 'name' | 'number'
}

export enum Endpoint {
    Article = 'article',
    AuthToken = 'auth/token',
    Customer = 'customer',
    Expense = 'expense',
    ExpenseReceipt = 'expense/receipt',
    Invoice = 'invoice',
    Offer = 'offer',
    SettingArticle = 'setting/article',
    SettingPayCondition = 'setting/payCondition',
    SettingMiscellaneous = 'setting/miscellaneous',
    ToDo = 'todo'
}

export type Entity = {
    id: number
}

export type EntityArticle = Entity & Article
export type EntityExpense = Entity & Expense
export type EntityInvoice = Entity & Invoice
export type EntityInvoicePayment = Entity & InvoicePayment
export type EntityPayCondition = Entity & PayCondition
export type EntityToDo = Entity & ToDo

export type Expense = {
    date: string
    payDate?: string
    payKind: 'bank' | 'cash' | 'open'
    payee: string
    description?: string
    price?: number
    priceTotal: number
    vatPercent: number
    vatAmount?: number
    receipts?: ExpenseReceipt
}

export type ExpensePaginationOptions =
    BasePaginationOptions
    & PaginationDescending
    & PaginationSearchText
    & {
    orderBy?: 'date' | 'id' | 'payee' | 'payKind' | 'priceTotal'
    filter?: 'all' | 'open' | 'paid'
    payKind?: 'bank' | 'cash'
}

export type ExpenseReceipt = {
    id: number
}

export type InvoicePaginationOptions =
    BasePaginationOptions
    & PaginationDescending
    & PaginationSearchText
    & {
    filter?: 'all' | 'dunned' | 'partiallyPaid' | 'paid' | 'draft' | 'locked' | 'cancelled'
    orderBy?: 'customerData.name' | 'date' | 'dueToDate' | 'totalNet' | 'totalGross'
}

export type OfferPaginationOptions =
    BasePaginationOptions
    & PaginationDescending
    & PaginationSearchText
    & {
    orderBy?: 'customerData.name' | 'number' | 'date' | 'totalNet' | 'totalGross'
}

export type InfoSectionCustomField = {
    label: string
    value: string
}

export type Invoice = {
    cashDiscountTotal: number
    customerData: Customer
    date: string
    dueToDate: string
    number: string
    outstandingAmount: number
    payConditionId: number
    payConditionData: EntityPayCondition
    positions: InvoicePosition[]
    priceKind: 'gross' | 'net'
    totalGross: number
    totalNet: number
    type: 'invoice'
}

export type InvoiceList = {
    cashDiscountTotal: number
    customerData: CustomerData
    customerId: number
    date: string
    dueToDate: string
    id: number
    metaData: {
        cancellation: {
            date: string
            id: number
            number: number
            totalNet: number
            totalGross: number
        }
        currentDunning: {
            date: string
            label: string
        }
        nextDunning: {
            date: string
            dunningLevel: string
            label: string
        }
    }
    number: string
    outstandingAmount: number
    state: 'draft' | 'locked' | 'partiallyPaid' | 'paid' | 'cancelled'
    totalGross: number
    totalNet: number
    type: 'invoice' | 'closingInvoice' | 'depositInvoice' | 'recurringInvoice' | 'recurringInvoiceTemplate'
}

export type InvoiceMailParams = {
    attachmentName: string
    recipients: string[]
    subject: string
}

export type InvoicePayment = {
    amount: number
    notes: string
    type: 'payment' | 'partial' | 'discount' | 'bankcharge' | 'surcharge'
}

export type InvoicePosition = {
    id: number
    title: string
}

export type ItemValidationError = {
    code: string
}

export type Miscellaneous = {
    articleCategories: string[]
    articleUnits: string[]
    autoCreateArticles: boolean
    customerCategories: string[]
    jobTitles: string[]
    salutations: string[]
    titles: string[]
    vats: number[]
}

export type NoContent = {
    code: string
}

export type Offer = {
    cashDiscountTotal: number
    date: string
    dueToDate: string
    id: number
    number: string
    outstandingAmount: number
    totalGross: number
    totalNet: number
}

export type PayCondition = {
    dueDays?: number
    invoiceText?: string
    isBasic?: boolean
    isInstant?: boolean
    name: string
    offerText?: string
}

export type PaginatedResponse<T> = {
    meta: {
        count: number
        filter: any[]
    }
    data: T[]
}

export type PaginationDescending = {
    desc?: boolean
}

export type PaginationSearchText = {
    searchText?: string
}

export type PaginatedArticles = PaginatedResponse<EntityArticle>
export type PaginatedCustomers = PaginatedResponse<Customer>
export type PaginatedEntityExpenses = PaginatedResponse<EntityExpense>
export type PaginatedEntityInvoices = PaginatedResponse<EntityInvoice>
export type PaginatedOffers = PaginatedResponse<Offer>
export type PaginatedToDos = PaginatedResponse<EntityToDo>

export type PaginatedMethod = keyof Pick<ArticlesResource, 'paginated'>
    & keyof Pick<CustomersResource, 'paginated'>
    & keyof Pick<ExpensesResource, 'paginated'>
    & keyof Pick<InvoicesResource, 'paginated'>
    & keyof Pick<OffersResource, 'paginated'>
    & keyof Pick<TodosResource, 'paginated'>

export type ParameterlessGetMethod = keyof Pick<SettingsResource, 'miscellaneous'>
    & keyof Pick<PayConditionsResource, 'all'>

export type PostInvoiceCustomerId = BasePostInvoice & {
    customerData?: never
    customerId: number
}

export type PostInvoiceCustomerDataCompany = BasePostInvoiceCustomerData<{
    kindCompany: {
        city?: string
        companyName: string
        companyNameAffix?: string
        country?: string
        kind: 'company'
        street?: string
        zipCode?: string
    }
}>

export type PostInvoiceCustomerDataPerson = BasePostInvoiceCustomerData<{
    kindPerson: {
        city?: string
        countryIso?: string
        firstName?: string
        kind: 'person'
        lastName: string
        required: false
        street?: string
        zipCode?: string
    }
}>

export type ResponseArticle = ApiResponse<EntityArticle>
export type ResponseCustomer = ApiResponse<Customer>
export type ResponseExpense = ApiResponse<EntityExpense>
export type ResponseInvoice = ApiResponse<EntityInvoice>
export type ResponseOffer = ApiResponse<Offer>

export type RetrieveMethod = PaginatedMethod | ParameterlessGetMethod

export type ToDo = {
    customerId?: number
    date: string
    doneAt?: string
    metaData?: {
        description?: string
    }
    tenantId?: number
    title: string
}

export type ToDoPaginationOptions = BasePaginationOptions & {
    activeFilter?: 'all' | 'future' | 'overdue'
    customerId?: number
}

export type ValidationError = {
    message: string
    meta: {
        [k: string]: ItemValidationError[]
    }
    name: string
}
