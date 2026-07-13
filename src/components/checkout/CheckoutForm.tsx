"use client";

export default function CheckoutForm() {
  return (
    <div className="bg-white dark:bg-zinc-900 rounded-none border border-gray-200 dark:border-zinc-800 p-6 sm:p-8">
      <h2 className="text-xl font-heading font-bold text-gray-900 dark:text-white mb-6">Shipping Address</h2>
      
      <div className="space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">First Name</label>
            <input 
              type="text" 
              name="firstName"
              required
              className="block w-full h-12 px-4 border border-gray-200 dark:border-zinc-700 rounded-none bg-gray-50 dark:bg-zinc-950 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-primary transition-all sm:text-base"
              placeholder="John"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Last Name</label>
            <input 
              type="text" 
              name="lastName"
              required
              className="block w-full h-12 px-4 border border-gray-200 dark:border-zinc-700 rounded-none bg-gray-50 dark:bg-zinc-950 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-primary transition-all sm:text-base"
              placeholder="Doe"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Email Address</label>
          <input 
            type="email" 
            name="email"
            required
            className="block w-full h-12 px-4 border border-gray-200 dark:border-zinc-700 rounded-none bg-gray-50 dark:bg-zinc-950 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-primary transition-all sm:text-base"
            placeholder="john@example.com"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Street Address</label>
          <input 
            type="text" 
            name="address"
            required
            className="block w-full h-12 px-4 border border-gray-200 dark:border-zinc-700 rounded-none bg-gray-50 dark:bg-zinc-950 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-primary transition-all sm:text-base"
            placeholder="123 Tech Avenue"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <div className="lg:col-span-1">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">City</label>
            <input 
              type="text" 
              name="city"
              required
              className="block w-full h-12 px-4 border border-gray-200 dark:border-zinc-700 rounded-none bg-gray-50 dark:bg-zinc-950 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-primary transition-all sm:text-base"
              placeholder="San Francisco"
            />
          </div>
          <div className="lg:col-span-1">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">State/Province</label>
            <input 
              type="text" 
              name="state"
              required
              className="block w-full h-12 px-4 border border-gray-200 dark:border-zinc-700 rounded-none bg-gray-50 dark:bg-zinc-950 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-primary transition-all sm:text-base"
              placeholder="CA"
            />
          </div>
          <div className="lg:col-span-1">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">ZIP / Postal Code</label>
            <input 
              type="text" 
              name="zip"
              required
              className="block w-full h-12 px-4 border border-gray-200 dark:border-zinc-700 rounded-none bg-gray-50 dark:bg-zinc-950 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-primary transition-all sm:text-base"
              placeholder="94105"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Country</label>
            <input 
              type="text" 
              name="country"
              required
              className="block w-full h-12 px-4 border border-gray-200 dark:border-zinc-700 rounded-none bg-gray-50 dark:bg-zinc-950 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-primary transition-all sm:text-base"
              placeholder="Bangladesh"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Phone Number</label>
            <input 
              type="tel" 
              name="phone"
              required
              className="block w-full h-12 px-4 border border-gray-200 dark:border-zinc-700 rounded-none bg-gray-50 dark:bg-zinc-950 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-primary transition-all sm:text-base"
              placeholder="+880 1700-000000"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
