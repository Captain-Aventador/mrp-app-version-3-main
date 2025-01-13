export interface Customer {
  id: string;
  name: string;
  email: string;
  phone?: string;
  comment?: string;
  firstName: string;
  lastName: string;
  companyName?: string;
  displayName: string;
  billingAddress?: string;
  shippingAddress?: string;
  discount?: number;
  referenceId?: string;
  category?: string;
}

export const mockCustomers: Customer[] = [
  {
    id: "1",
    name: "Naval Sea Systems Command (NAVSEA)",
    email: "contact@navalseasystemscommand(navsea).com",
    phone: "(555) 001-4988",
    comment: "",
    firstName: "Naval",
    lastName: "Command",
    companyName: "NAVSEA",
    displayName: "NAVSEA",
    billingAddress: "123 Navy St, Washington, DC",
    shippingAddress: "123 Navy St, Washington, DC",
    discount: 0,
    referenceId: "REF001",
    category: "Government"
  },
  {
    id: "2",
    name: "Royal Australian Navy",
    email: "contact@royalaustraliannavy.com",
    phone: "(555) 002-9104",
    comment: "",
    firstName: "Royal",
    lastName: "Navy",
    companyName: "Royal Australian Navy",
    displayName: "RAN",
    billingAddress: "456 Navy Rd, Canberra, ACT",
    shippingAddress: "456 Navy Rd, Canberra, ACT",
    discount: 0,
    referenceId: "REF002",
    category: "Government"
  },
  {
    id: "3",
    name: "Royal Navy of Oman",
    email: "contact@royalnavyofoman.com",
    phone: "(555) 003-1716",
    comment: "",
    firstName: "Royal",
    lastName: "Navy",
    companyName: "Royal Navy of Oman",
    displayName: "RNO",
    billingAddress: "789 Navy Ave, Muscat, Oman",
    shippingAddress: "789 Navy Ave, Muscat, Oman",
    discount: 0,
    referenceId: "REF003",
    category: "Government"
  },
  {
    id: "4",
    name: "United States Navy",
    email: "contact@unitedstatesnavy.com",
    phone: "(555) 004-9399",
    comment: "",
    firstName: "United",
    lastName: "States",
    companyName: "United States Navy",
    displayName: "USN",
    billingAddress: "101 Navy Blvd, Washington, DC",
    shippingAddress: "101 Navy Blvd, Washington, DC",
    discount: 0,
    referenceId: "REF004",
    category: "Government"
  },
  {
    id: "5",
    name: "Commonwealth of Australia",
    email: "contact@commonwealthofaustralia.com",
    phone: "(555) 005-9052",
    comment: "",
    firstName: "Commonwealth",
    lastName: "Australia",
    companyName: "Commonwealth of Australia",
    displayName: "CA",
    billingAddress: "202 Commonwealth St, Canberra, ACT",
    shippingAddress: "202 Commonwealth St, Canberra, ACT",
    discount: 0,
    referenceId: "REF005",
    category: "Government"
  },
  {
    id: "6",
    name: "Australian Border Force Royal",
    email: "contact@australianborderforceroyal.com",
    phone: "(555) 006-2086",
    comment: "",
    firstName: "Australian",
    lastName: "Border Force",
    companyName: "Australian Border Force Royal",
    displayName: "ABF",
    billingAddress: "303 Border St, Sydney, NSW",
    shippingAddress: "303 Border St, Sydney, NSW",
    discount: 0,
    referenceId: "REF006",
    category: "Government"
  },
  {
    id: "7",
    name: "Armed Forces of Malta",
    email: "contact@armedforcesofmalta.com",
    phone: "(555) 007-0628",
    comment: "",
    firstName: "Armed",
    lastName: "Forces",
    companyName: "Armed Forces of Malta",
    displayName: "AFM",
    billingAddress: "404 Armed St, Valletta, Malta",
    shippingAddress: "404 Armed St, Valletta, Malta",
    discount: 0,
    referenceId: "REF007",
    category: "Government"
  },
  {
    id: "8",
    name: "Queensland Police Service",
    email: "contact@queenslandpoliceservice.com",
    phone: "(555) 008-0931",
    comment: "",
    firstName: "Queensland",
    lastName: "Police",
    companyName: "Queensland Police Service",
    displayName: "QPS",
    billingAddress: "505 Police Rd, Brisbane, QLD",
    shippingAddress: "505 Police Rd, Brisbane, QLD",
    discount: 0,
    referenceId: "REF008",
    category: "Government"
  },
  {
    id: "9",
    name: "Government of the Republic of Trinidad",
    email: "contact@governmentoftherepublicoftrinidad.com",
    phone: "(555) 009-2397",
    comment: "",
    firstName: "Government",
    lastName: "Trinidad",
    companyName: "Government of the Republic of Trinidad",
    displayName: "GRT",
    billingAddress: "606 Government St, Port of Spain, Trinidad",
    shippingAddress: "606 Government St, Port of Spain, Trinidad",
    discount: 0,
    referenceId: "REF009",
    category: "Government"
  }
];
