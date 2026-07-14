import Link from "next/link";
import { ChevronRight, FileText, Scale, Shield, AlertCircle, ShoppingBag, CreditCard, HelpCircle } from "lucide-react";

export const metadata = {
  title: "Terms of Service | GadgetGrid",
  description: "Terms and conditions for using GadgetGrid.",
};

export default function TermsPage() {
  const sections = [
    { id: "acceptance", title: "1. Acceptance of Terms", icon: Scale },
    { id: "products", title: "2. Products and Pricing", icon: ShoppingBag },
    { id: "payments", title: "3. Payments & Billing", icon: CreditCard },
    { id: "privacy", title: "4. Privacy & Data", icon: Shield },
    { id: "liability", title: "5. Limitation of Liability", icon: AlertCircle },
    { id: "contact", title: "6. Contact Information", icon: HelpCircle },
  ];

  return (
    <div className="bg-gray-50 dark:bg-zinc-950 min-h-screen">
      {/* Hero Section */}
      <div className="bg-white dark:bg-zinc-900 border-b border-gray-200 dark:border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center text-sm font-medium text-gray-500">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4 mx-2" />
            <span className="text-gray-900 dark:text-white">Terms of Service</span>
          </nav>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-primary/10 rounded-xl">
              <FileText className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white tracking-tight">
              Terms of Service
            </h1>
          </div>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl">
            Please read these terms carefully before using our platform. By accessing or using GadgetGrid, you agree to be bound by these terms.
          </p>
          <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 dark:bg-zinc-800 text-sm font-medium text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-zinc-700">
            <span className="w-2 h-2 rounded-full bg-green-500"></span>
            Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Sidebar Navigation */}
          <aside className="lg:w-1/4">
            <div className="sticky top-24 bg-white dark:bg-zinc-900 rounded-2xl p-6 border border-gray-200 dark:border-zinc-800 shadow-sm">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
                Quick Links
              </h3>
              <nav className="space-y-1">
                {sections.map((section) => {
                  const Icon = section.icon;
                  return (
                    <a 
                      key={section.id} 
                      href={`#${section.id}`}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-600 dark:text-gray-400 hover:text-primary hover:bg-primary/5 transition-colors text-sm font-medium"
                    >
                      <Icon className="w-4 h-4" />
                      {section.title}
                    </a>
                  )
                })}
              </nav>
            </div>
          </aside>

          {/* Main Content */}
          <div className="lg:w-3/4">
            <div className="bg-white dark:bg-zinc-900 rounded-2xl p-8 md:p-12 border border-gray-200 dark:border-zinc-800 shadow-sm prose prose-gray dark:prose-invert max-w-none">
              
              <section id="acceptance" className="scroll-mt-32 mb-12">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-primary/10 rounded-lg text-primary">
                    <Scale className="w-5 h-5" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white m-0">1. Acceptance of Terms</h2>
                </div>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  By accessing and using GadgetGrid, you accept and agree to be bound by the terms and provision of this agreement. In addition, when using these particular services, you shall be subject to any posted guidelines or rules applicable to such services.
                </p>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed mt-4">
                  Any participation in this service will constitute acceptance of this agreement. If you do not agree to abide by the above, please do not use this service.
                </p>
              </section>

              <hr className="border-gray-200 dark:border-zinc-800 my-8" />

              <section id="products" className="scroll-mt-32 mb-12">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-primary/10 rounded-lg text-primary">
                    <ShoppingBag className="w-5 h-5" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white m-0">2. Products and Pricing</h2>
                </div>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  All products are subject to availability. We reserve the right to modify prices without prior notice. We make every effort to display as accurately as possible the colors, features, specifications, and details of the products available on the site.
                </p>
                <ul className="list-disc pl-6 mt-4 space-y-2 text-gray-600 dark:text-gray-300">
                  <li>Prices for our products are subject to change without notice.</li>
                  <li>We reserve the right at any time to modify or discontinue the Service.</li>
                  <li>We shall not be liable to you or to any third-party for any modification, price change, suspension or discontinuance of the Service.</li>
                </ul>
              </section>

              <hr className="border-gray-200 dark:border-zinc-800 my-8" />

              <section id="payments" className="scroll-mt-32 mb-12">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-primary/10 rounded-lg text-primary">
                    <CreditCard className="w-5 h-5" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white m-0">3. Payments & Billing</h2>
                </div>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  You agree to provide current, complete, and accurate purchase and account information for all purchases made at our store. You agree to promptly update your account and other information, including your email address and credit card numbers and expiration dates, so that we can complete your transactions and contact you as needed.
                </p>
              </section>
              
              <hr className="border-gray-200 dark:border-zinc-800 my-8" />
              
              <section id="privacy" className="scroll-mt-32 mb-12">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-primary/10 rounded-lg text-primary">
                    <Shield className="w-5 h-5" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white m-0">4. Privacy & Data</h2>
                </div>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  Your submission of personal information through the store is governed by our Privacy Policy. Please review our Privacy Policy to understand our practices regarding your personal data.
                </p>
                <div className="mt-4 p-4 bg-gray-50 dark:bg-zinc-800/50 rounded-xl border border-gray-200 dark:border-zinc-700">
                  <Link href="/privacy" className="text-primary hover:underline font-medium flex items-center gap-2">
                    Read our full Privacy Policy <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </section>
              
              <hr className="border-gray-200 dark:border-zinc-800 my-8" />
              
              <section id="liability" className="scroll-mt-32 mb-12">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-primary/10 rounded-lg text-primary">
                    <AlertCircle className="w-5 h-5" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white m-0">5. Limitation of Liability</h2>
                </div>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  In no case shall GadgetGrid, our directors, officers, employees, affiliates, agents, contractors, interns, suppliers, service providers or licensors be liable for any injury, loss, claim, or any direct, indirect, incidental, punitive, special, or consequential damages of any kind.
                </p>
              </section>
              
              <hr className="border-gray-200 dark:border-zinc-800 my-8" />
              
              <section id="contact" className="scroll-mt-32">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-primary/10 rounded-lg text-primary">
                    <HelpCircle className="w-5 h-5" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white m-0">6. Contact Information</h2>
                </div>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  Questions about the Terms of Service should be sent to us at:
                </p>
                <div className="mt-4 text-gray-900 dark:text-white font-medium">
                  <p>Email: support@gadgetgrid.com</p>
                  <p>Phone: +1 (555) 123-4567</p>
                  <p>Address: 123 Tech Avenue, Silicon Valley, CA 94025</p>
                </div>
              </section>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
