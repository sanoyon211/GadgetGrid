import Link from "next/link";
import { ChevronRight, Shield, Database, Lock, Eye, Bell, HelpCircle } from "lucide-react";

export const metadata = {
  title: "Privacy Policy | GadgetGrid",
  description: "Privacy policy for GadgetGrid.",
};

export default function PrivacyPage() {
  const sections = [
    { id: "collect", title: "1. Information We Collect", icon: Database },
    { id: "use", title: "2. How We Use Information", icon: Eye },
    { id: "protect", title: "3. Data Protection", icon: Lock },
    { id: "cookies", title: "4. Cookies & Tracking", icon: Shield },
    { id: "updates", title: "5. Policy Updates", icon: Bell },
    { id: "contact", title: "6. Contact Us", icon: HelpCircle },
  ];

  return (
    <div className="bg-gray-50 dark:bg-zinc-950 min-h-screen">
      {/* Hero Section */}
      <div className="bg-white dark:bg-zinc-900 border-b border-gray-200 dark:border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center text-sm font-medium text-gray-500">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4 mx-2" />
            <span className="text-gray-900 dark:text-white">Privacy Policy</span>
          </nav>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-primary/10 rounded-xl">
              <Shield className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white tracking-tight">
              Privacy Policy
            </h1>
          </div>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl">
            We value your privacy and are committed to protecting your personal data. Learn about how we collect, use, and safeguard your information.
          </p>
          <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 dark:bg-zinc-800 text-sm font-medium text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-zinc-700">
            <span className="w-2 h-2 rounded-full bg-blue-500"></span>
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
                Policy Sections
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
              
              <section id="collect" className="scroll-mt-32 mb-12">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-primary/10 rounded-lg text-primary">
                    <Database className="w-5 h-5" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white m-0">1. Information We Collect</h2>
                </div>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  We collect information to provide better services to all our users. We collect information in the following ways:
                </p>
                <ul className="list-disc pl-6 mt-4 space-y-2 text-gray-600 dark:text-gray-300">
                  <li><strong>Information you give us:</strong> When you create an account, purchase a product, or contact us, we collect personal information like your name, email address, telephone number, and payment information.</li>
                  <li><strong>Information we get from your use of our services:</strong> We collect information about the services that you use and how you use them, like when you view and interact with our content and ads.</li>
                </ul>
              </section>

              <hr className="border-gray-200 dark:border-zinc-800 my-8" />

              <section id="use" className="scroll-mt-32 mb-12">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-primary/10 rounded-lg text-primary">
                    <Eye className="w-5 h-5" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white m-0">2. How We Use Information</h2>
                </div>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  We use the information we collect from all of our services to provide, maintain, protect, and improve them, to develop new ones, and to protect GadgetGrid and our users.
                </p>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed mt-4">
                  When you contact us, we keep a record of your communication to help solve any issues you might be facing. We may use your email address to inform you about our services, such as letting you know about upcoming changes or improvements.
                </p>
              </section>

              <hr className="border-gray-200 dark:border-zinc-800 my-8" />

              <section id="protect" className="scroll-mt-32 mb-12">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-primary/10 rounded-lg text-primary">
                    <Lock className="w-5 h-5" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white m-0">3. Data Protection</h2>
                </div>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  We work hard to protect GadgetGrid and our users from unauthorized access to or unauthorized alteration, disclosure or destruction of information we hold. In particular:
                </p>
                <ul className="list-disc pl-6 mt-4 space-y-2 text-gray-600 dark:text-gray-300">
                  <li>We encrypt many of our services using SSL.</li>
                  <li>We review our information collection, storage, and processing practices.</li>
                  <li>We restrict access to personal information to employees and contractors who need to know that information.</li>
                </ul>
              </section>
              
              <hr className="border-gray-200 dark:border-zinc-800 my-8" />
              
              <section id="cookies" className="scroll-mt-32 mb-12">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-primary/10 rounded-lg text-primary">
                    <Shield className="w-5 h-5" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white m-0">4. Cookies & Tracking</h2>
                </div>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  We and our partners use various technologies to collect and store information when you visit GadgetGrid, and this may include using cookies or similar technologies to identify your browser or device. You can set your browser to not accept cookies, but this may limit your ability to use the services.
                </p>
              </section>
              
              <hr className="border-gray-200 dark:border-zinc-800 my-8" />
              
              <section id="updates" className="scroll-mt-32 mb-12">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-primary/10 rounded-lg text-primary">
                    <Bell className="w-5 h-5" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white m-0">5. Policy Updates</h2>
                </div>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  Our Privacy Policy may change from time to time. We will not reduce your rights under this Privacy Policy without your explicit consent. We will post any privacy policy changes on this page and, if the changes are significant, we will provide a more prominent notice.
                </p>
              </section>
              
              <hr className="border-gray-200 dark:border-zinc-800 my-8" />
              
              <section id="contact" className="scroll-mt-32">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-primary/10 rounded-lg text-primary">
                    <HelpCircle className="w-5 h-5" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white m-0">6. Contact Us</h2>
                </div>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  If you have any questions about this Privacy Policy, please feel free to contact us through our website or write to us at:
                </p>
                <div className="mt-4 p-4 bg-gray-50 dark:bg-zinc-800/50 rounded-xl border border-gray-200 dark:border-zinc-700">
                  <div className="text-gray-900 dark:text-white font-medium">
                    <p>Email: privacy@gadgetgrid.com</p>
                    <p>Data Protection Officer: +1 (555) 987-6543</p>
                  </div>
                </div>
              </section>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
