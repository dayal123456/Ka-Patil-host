export type Currency = 'INR' | 'USD' | 'EUR' | 'GBP';

export interface CurrencyDetails {
  code: Currency;
  symbol: string;
  rate: number; // rate relative to INR
}

export type HostingType = 'shared' | 'wordpress' | 'reseller' | 'vps';

export interface HostingPlan {
  id: string;
  name: string;
  type: HostingType;
  priceMonthly: number; // in INR
  priceYearly: number; // in INR
  features: string[];
  specs: {
    websites: string;
    storage: string;
    bandwidth: string;
    ram?: string;
    cores?: string;
    emails?: string;
    ssl: string;
    backup: string;
  };
  bestValue?: boolean;
}

export interface DomainPricing {
  tld: string;
  registerPrice: number; // in INR / yr
  transferPrice: number; // in INR
  renewPrice: number; // in INR
}

export interface CartItem {
  id: string;
  name: string;
  type: 'hosting' | 'domain_register' | 'domain_transfer';
  planId?: string; // for hosting
  price: number; // in INR
  billingCycle?: 'monthly' | 'yearly';
  durationYears?: number; // for domains
}

export interface DNSRecord {
  id: string;
  type: 'A' | 'CNAME' | 'TXT' | 'MX';
  host: string;
  value: string;
  ttl: number;
}

export interface ActiveDomain {
  name: string;
  registeredDate: string;
  expiryDate: string;
  status: 'Active' | 'Pending' | 'Expired';
  nameservers: string[];
  dnsRecords: DNSRecord[];
}

export interface ActiveHosting {
  id: string;
  domainName: string;
  planId: string;
  planName: string;
  type: HostingType;
  status: 'Active' | 'Pending' | 'Suspended';
  billingCycle: 'monthly' | 'yearly';
  pricePaid: number; // in selected currency or INR
  nextDueDate: string;
  maintenanceMode: boolean;
  autoUpdates: boolean;
  resourceUsage: {
    cpu: number; // percentage
    ram: number; // percentage
    disk: number; // percentage
  };
}

export interface TicketReply {
  id: string;
  sender: 'client' | 'support' | 'system';
  message: string;
  timestamp: string;
}

export interface SupportTicket {
  id: string;
  subject: string;
  service: string;
  department: 'Technical' | 'Billing' | 'Sales' | 'Abuse';
  priority: 'Low' | 'Medium' | 'High';
  status: 'Open' | 'Client Reply' | 'Answered' | 'Closed';
  createdDate: string;
  replies: TicketReply[];
}

export interface Invoice {
  id: string;
  date: string;
  amount: number; // in INR
  status: 'Paid' | 'Unpaid';
  items: { description: string; amount: number }[];
}

export interface Testimonial {
  name: string;
  role: string;
  rating: number;
  text: string;
  avatarText: string;
}

export interface FAQItem {
  question: string;
  answer: string;
  category: 'General' | 'Hosting' | 'Domains' | 'Billing';
}
