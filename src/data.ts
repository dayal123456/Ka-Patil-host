import { HostingPlan, DomainPricing, Testimonial, FAQItem, CurrencyDetails } from './types';

export const CURRENCY_LIST: CurrencyDetails[] = [
  { code: 'INR', symbol: '₹', rate: 1 },
  { code: 'USD', symbol: '$', rate: 0.12 }, // 1 INR = 0.012 USD
  { code: 'EUR', symbol: '€', rate: 0.11 }, // 1 INR = 0.011 EUR
  { code: 'GBP', symbol: '£', rate: 0.094 }  // 1 INR = 0.0094 GBP
];

// Helper to convert from INR to other currencies
export function convertPrice(priceInINR: number, targetCurrency: 'INR' | 'USD' | 'EUR' | 'GBP'): number {
  const currency = CURRENCY_LIST.find(c => c.code === targetCurrency) || CURRENCY_LIST[0];
  return Math.round((priceInINR * currency.rate) * 100) / 100;
}

export const HOSTING_PLANS: HostingPlan[] = [
  // Shared Web Hosting
  {
    id: 'shared-starter',
    name: 'Starter Shared',
    type: 'shared',
    priceMonthly: 79, // ~ $0.97
    priceYearly: 759, // Save approx 20%
    features: [
      '1 WordPress Website',
      '3GB NVMe SSD Storage',
      'Unlimited Bandwidth',
      'Free SSL Certificate',
      '3 Email Accounts',
      'cPanel Control Panel',
      'LiteSpeed Web Server',
      'cPGuard Malware Protection',
      '24/7/365 WhatsApp & Ticket Support'
    ],
    specs: {
      websites: '1 Website',
      storage: '3GB NVMe SSD',
      bandwidth: 'Unlimited',
      emails: '3 Accounts',
      ssl: 'Free Auto-SSL',
      backup: 'Weekly Backup'
    }
  },
  {
    id: 'shared-premium',
    name: 'Premium Shared',
    type: 'shared',
    priceMonthly: 179, // ~ $2.19
    priceYearly: 1719,
    bestValue: true,
    features: [
      '5 Websites',
      '20GB NVMe SSD Storage',
      'Unlimited Bandwidth',
      'Free SSL Certificates',
      '10 Email Accounts',
      'cPanel Control Panel',
      'LiteSpeed Web Server',
      'cPGuard Security Guard',
      'Free Website Migration',
      '24/7/365 Support'
    ],
    specs: {
      websites: '5 Websites',
      storage: '20GB NVMe SSD',
      bandwidth: 'Unlimited',
      emails: '10 Accounts',
      ssl: 'Free Auto-SSL',
      backup: 'Semi-Weekly Backup'
    }
  },
  {
    id: 'shared-business',
    name: 'Business Shared',
    type: 'shared',
    priceMonthly: 299, // ~ $3.65
    priceYearly: 2869,
    features: [
      'Unlimited Websites',
      '50GB NVMe SSD Storage',
      'Unlimited Bandwidth',
      'Free SSL Certificate',
      'Unlimited Email Accounts',
      'cPanel + WHM Lite',
      'LiteSpeed Web Server 20X Faster',
      'cPGuard Advanced Suite',
      'Daily Automatic Backups',
      'Priority 24/7 Support'
    ],
    specs: {
      websites: 'Unlimited',
      storage: '50GB NVMe SSD',
      bandwidth: 'Unlimited',
      emails: 'Unlimited',
      ssl: 'Free Auto-SSL',
      backup: 'Daily Backup'
    }
  },

  // WordPress Hosting (as in the screenshot!)
  {
    id: 'wp-essential',
    name: 'Essential WP',
    type: 'wordpress',
    priceMonthly: 415, // ~ $4.99
    priceYearly: 2490, // Save 50%
    features: [
      '1 WordPress Website',
      '20GB NVMe High-Speed Storage',
      'Unlimited Bandwidth',
      'Free Let’s Encrypt SSL',
      'Speed Boost LiteSpeed Cache',
      'Auto WordPress Core Updates',
      'Staging Environment Access',
      'cPGuard Daily Scanning'
    ],
    specs: {
      websites: '1 Profile',
      storage: '20GB NVMe Storage',
      bandwidth: 'Unlimited',
      emails: '5 Accounts',
      ssl: 'Free SSL Certificate',
      backup: 'Weekly Automated'
    }
  },
  {
    id: 'wp-growth',
    name: 'Growth WP',
    type: 'wordpress',
    priceMonthly: 830, // ~ $9.99
    priceYearly: 4980, // Save 50%
    bestValue: true,
    features: [
      '3 WordPress Websites',
      '50GB NVMe Superfast Storage',
      'Unlimited Bandwidth',
      'Free Let’s Encrypt SSL',
      'Speed Boost Cache & CDN Integration',
      'WordPress Multi-Site Management',
      'Smart Automated Updates with AI',
      'One-Click WordPress Staging Tools',
      'Unlimited Business Mailboxes'
    ],
    specs: {
      websites: '3 Websites',
      storage: '50GB NVMe Storage',
      bandwidth: 'Unlimited',
      emails: 'Unlimited Email',
      ssl: 'Free SSL Certificate',
      backup: 'Daily Automated'
    }
  },
  {
    id: 'wp-advanced',
    name: 'Advanced WP',
    type: 'wordpress',
    priceMonthly: 1490, // ~ $17.99
    priceYearly: 8940, // Save 50%
    features: [
      '5 WordPress Websites',
      '100GB NVMe Storage',
      'Unlimited Bandwidth',
      'Free Custom SSL Certificate',
      'Visual Regression testing (Smart Updates)',
      '1-Click Clone and Staging Sandbox',
      'Automatic CloudLinux Virtualization',
      'Daily Off-site Secure Backups',
      'Dedicated WordPress Expert Support'
    ],
    specs: {
      websites: '5 Websites',
      storage: '100GB NVMe Storage',
      bandwidth: 'Unlimited',
      emails: 'Unlimited Email',
      ssl: 'Premium SSL Included',
      backup: 'Daily Off-site'
    }
  },
  {
    id: 'wp-ultimate',
    name: 'Ultimate WP',
    type: 'wordpress',
    priceMonthly: 2900, // ~ $34.99
    priceYearly: 17400, // Save 50%
    features: [
      '10 WordPress Websites',
      '250GB NVMe SSD Grid Storage',
      'Unlimited Bandwidth',
      'Free Custom SSL Certificate',
      'Free Dedicated IP Address',
      'Git Integration & SSH Access',
      'Instant Web Migration Service',
      'Double Backup Integrity (Hourly database)',
      'Pre-installed Redis & Memcached caches'
    ],
    specs: {
      websites: '10 Websites',
      storage: '250GB NVMe Storage',
      bandwidth: 'Unlimited',
      emails: 'Unlimited',
      ssl: 'Free SSL Certificate',
      backup: 'Hourly Database + Daily Full'
    }
  },

  // Reseller Hosting
  {
    id: 'reseller-bronze',
    name: 'Bronze Reseller',
    type: 'reseller',
    priceMonthly: 499, // ~ $6.00
    priceYearly: 4799,
    features: [
      '10 cPanel (CloudLinux) User Accounts',
      '50GB NVMe SSD Storage Space',
      '1000GB Bandwidth',
      '100% Whitelabel Control Panel',
      'Custom Nameservers Support',
      'Free Billing Software Integration',
      'LiteSpeed Caching Server',
      'Malware Scanning & cPGuard'
    ],
    specs: {
      websites: '10 cPanel client seats',
      storage: '50GB NVMe Storage',
      bandwidth: '1000GB Bandwidth',
      emails: 'Unlimited per account',
      ssl: 'Free Auto-SSL for Clients',
      backup: 'Weekly Backup'
    }
  },
  {
    id: 'reseller-silver',
    name: 'Silver Reseller',
    type: 'reseller',
    priceMonthly: 899, // ~ $10.80
    priceYearly: 8629,
    bestValue: true,
    features: [
      '30 cPanel User Accounts',
      '100GB NVMe SSD Storage',
      '3000GB Premium Bandwidth',
      'Free WHMCS Billing License',
      '100% White-Label Branding',
      'Custom Reverse DNS config',
      'LiteSpeed Web Server',
      'Daily JetBackup Restores'
    ],
    specs: {
      websites: '30 cPanel seats',
      storage: '100GB NVMe SSD',
      bandwidth: '3000GB',
      emails: 'Unlimited per account',
      ssl: 'Free Auto-SSL',
      backup: 'Daily Automatic'
    }
  },
  {
    id: 'reseller-gold',
    name: 'Gold Reseller',
    type: 'reseller',
    priceMonthly: 1499, // ~ $18.00
    priceYearly: 14389,
    features: [
      '100 cPanel User Accounts',
      'Unlimited NVMe Storage Space',
      'Unlimited Premium Bandwidth',
      'Free WHM & WHMCS System setup',
      '100% Custom Whitelisted IPs available',
      'Overselling Allowed',
      'cPGuard Premium Security License',
      'Dedicated Priority Hosting Desk'
    ],
    specs: {
      websites: '100 cPanel seats',
      storage: 'Unlimited NVMe Storage',
      bandwidth: 'Unlimited Bandwidth',
      emails: 'Unlimited',
      ssl: 'Free Auto-SSL',
      backup: 'Double Daily Automatic'
    }
  },

  // Cloud VPS Hosting
  {
    id: 'vps-basic',
    name: 'VPS Basic',
    type: 'vps',
    priceMonthly: 915, // ~ $11.05
    priceYearly: 8789,
    features: [
      '1 CPU Core (Intel Xeon)',
      '2GB DDR4 High-Performance RAM',
      '40GB NVMe RAID-10 SSD',
      '1TB Premium Bandwidth',
      '1 Dedicated IPv4 Address',
      'Full root SSH Access & Console',
      'Any Linux OS (CentOS, Ubuntu, Alma)',
      'Deploy in 5 Minutes',
      'No-latency Asia-Pacific Servers'
    ],
    specs: {
      websites: 'Unlimited Apps',
      storage: '40GB NVMe RAID-10',
      bandwidth: '1TB Bandwidth',
      ram: '2GB DDR4',
      cores: '1 Xeon Core',
      ssl: 'Self-Configured',
      backup: 'SolusVM Virtualization Snapshots'
    }
  },
  {
    id: 'vps-pro',
    name: 'VPS Pro',
    type: 'vps',
    priceMonthly: 1829, // ~ $22.10
    priceYearly: 17559,
    bestValue: true,
    features: [
      '2 CPU Cores (V-Dedicated)',
      '4GB DDR4 High-Performance RAM',
      '80GB NVMe RAID-10 Storage',
      '3TB Premium Bandwidth',
      '1 Dedicated IPv4 + /64 IPv6 Subnet',
      'Virtualizor Control Pane Integrations',
      'Free cPanel/WHM Solo License',
      'Weekly Baremetal Cloud Backups'
    ],
    specs: {
      websites: 'Unlimited',
      storage: '80GB NVMe SSD',
      bandwidth: '3TB Bandwidth',
      ram: '4GB DDR4',
      cores: '2 Cores Intel Xeon',
      ssl: 'cPanel Auto-SSL included',
      backup: 'Weekly Full VM Backups'
    }
  },
  {
    id: 'vps-elite',
    name: 'VPS Elite',
    type: 'vps',
    priceMonthly: 3659, // ~ $44.20
    priceYearly: 35129,
    features: [
      '4 CPU Cores (Hyper-v Dedicated)',
      '8GB DDR4 High-Performance RAM',
      '160GB NVMe RAID-10 Storage',
      '5TB Premium Bandwidth',
      '2 Dedicated IPv4 Addresses',
      'Full Management & Support Desk',
      'Free CyberPanel / aaPanel Preconfiguration',
      'Daily automated VM snapshots'
    ],
    specs: {
      websites: 'Unlimited Solutions',
      storage: '160GB NVMe Storage',
      bandwidth: '5TB Bandwidth',
      ram: '8GB DDR4 RAM',
      cores: '4 Cores Xeon Special',
      ssl: 'Unlimited SSL setup',
      backup: 'Daily VM Snapshots'
    }
  }
];

export const DOMAIN_PRICING: DomainPricing[] = [
  { tld: '.com', registerPrice: 849, transferPrice: 849, renewPrice: 949 },
  { tld: '.in', registerPrice: 499, transferPrice: 499, renewPrice: 599 },
  { tld: '.net', registerPrice: 949, transferPrice: 949, renewPrice: 1049 },
  { tld: '.org', registerPrice: 899, transferPrice: 899, renewPrice: 999 },
  { tld: '.xyz', registerPrice: 199, transferPrice: 199, renewPrice: 499 },
  { tld: '.co.in', registerPrice: 399, transferPrice: 399, renewPrice: 499 },
  { tld: '.online', registerPrice: 149, transferPrice: 849, renewPrice: 1249 }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    name: 'Manish Singh',
    role: 'CEO, NexaCorp Media',
    rating: 5,
    text: 'Moving to ka patil’s WordPress hosting is the fastest response time I’ve ever experienced in a decade of web management. Pages that used to take 3 seconds load in under 200 ms. LiteSpeed and NVMe make a huge difference.',
    avatarText: 'MS'
  },
  {
    name: 'Ankit Rowdy',
    role: 'Full Stack Web Developer',
    rating: 5,
    text: 'I migrated 12 client portfolios here. Not only is the pricing extremely nominal compared to major foreign corporate hosts, but the 24/7 WhatsApp support actually answers within 10 seconds. Highly recommended!',
    avatarText: 'AR'
  },
  {
    name: 'Anshu Kumari',
    role: 'E-commerce Store Owner',
    rating: 5,
    text: 'We get huge flash sale crowds. Their cPGuard and DDoS shield kept our shopping cart perfectly online and fluid. My clients love the speed.',
    avatarText: 'AK'
  },
  {
    name: 'Rohan Patil',
    role: 'SaaS Founder',
    rating: 5,
    text: 'Exceptional VPS latency across Bangalore and Asia Pacific. Our node hasn’t experienced a single second of unexpected downtime in 18 months of heavy load.',
    avatarText: 'RP'
  }
];

export const FAQS: FAQItem[] = [
  {
    category: 'General',
    question: 'How long has Ka Patil / HostingDart been in operation?',
    answer: 'We are celebrating 6.8 years of officially registered MSME services under the Govt of India. Started in 2019 in Bangalore, we bridge the gap between premium speed enterprise-grade hosting and affordable, pocket-friendly indian pricing.'
  },
  {
    category: 'General',
    question: 'What is the difference between web hosting and domain names?',
    answer: 'A domain name is your website’s address on the internet (like yourbusiness.in), allowing users to find you. Web hosting is the physical storage server space where your website’s files, databases, and codes actually live. You need both to launch a live website.'
  },
  {
    category: 'Hosting',
    question: 'What is LiteSpeed, and why is it faster?',
    answer: 'LiteSpeed is an ultra-high performance alternative to traditional Apache web servers. It handles double the concurrent traffic seamlessly, supports built-in server-side caching (LSCache plugin for WordPress), and speeds up your delivery by up to 20 times.'
  },
  {
    category: 'Hosting',
    question: 'Do you offer a money-back guarantee?',
    answer: 'Yes! We stand behind our infrastructure. We offer a hassle-free, risk-free 2-Day money-back guarantee on all our shared as well as WordPress hosting packages if you are not fully satisfied.'
  },
  {
    category: 'Domains',
    question: 'Can I transfer my existing domain to ka patil?',
    answer: 'Absolutely! Domain lookup let’s you easily request transfers. Just unlock your domain, fetch the EPP/Auth code from your current registrar, input it in our Domain Transfer view, and we will migrate it within 5-7 days.'
  },
  {
    category: 'Billing',
    question: 'Do you have any discount promo codes available?',
    answer: 'Yes! For a limited time, you can apply the promo code "NEW50OFF" during checkout to unlock a massive flat 50% discount on yearly hosting packages.'
  }
];
