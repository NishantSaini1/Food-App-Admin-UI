export default function SettingsPage() {
  return (
    <div className="space-y-6">
      {/* Page header */}
      <header className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 px-6 py-5 shadow-sm text-white">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-white/70 mb-1">
            Settings
          </p>
          <h1 className="text-2xl font-semibold leading-tight">
            Admin &amp; Restaurant Settings
          </h1>
          <p className="text-sm text-white/85 mt-1 max-w-2xl">
            Manage your profile, restaurant information, order rules and
            notifications from one place.
          </p>
        </div>
      </header>

      {/* Layout grid */}
      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,2fr)_minmax(0,1.3fr)] gap-6">
        {/* Left column: forms */}
        <div className="space-y-6">
          {/* Profile & account */}
          <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 space-y-4">
            <div>
              <h2 className="text-sm font-semibold text-gray-900">
                Admin profile
              </h2>
              <p className="text-xs text-gray-500 mt-0.5">
                Basic information about you as the admin. This is not visible to
                customers.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="space-y-1.5">
                <label className="block text-xs font-medium text-gray-600">
                  Full name
                </label>
                <input
                  type="text"
                  defaultValue="Admin User"
                  className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500/70"
                />
              </div>
              <div className="space-y-1.5">
                <label className="block text-xs font-medium text-gray-600">
                  Email address
                </label>
                <input
                  type="email"
                  defaultValue="admin@food.com"
                  className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500/70"
                />
              </div>
              <div className="space-y-1.5">
                <label className="block text-xs font-medium text-gray-600">
                  Phone number
                </label>
                <input
                  type="tel"
                  defaultValue="+91 98765 43210"
                  className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500/70"
                />
              </div>
            </div>
          </section>

          {/* Restaurant information */}
          <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 space-y-4">
            <div>
              <h2 className="text-sm font-semibold text-gray-900">
                Restaurant details
              </h2>
              <p className="text-xs text-gray-500 mt-0.5">
                Information shown to customers in the app and on invoices.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="space-y-1.5 md:col-span-2">
                <label className="block text-xs font-medium text-gray-600">
                  Restaurant name
                </label>
                <input
                  type="text"
                  defaultValue="Food Point Restaurant"
                  className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500/70"
                />
              </div>

              <div className="space-y-1.5 md:col-span-2">
                <label className="block text-xs font-medium text-gray-600">
                  Address
                </label>
                <textarea
                  defaultValue="123, Main Street, New Delhi, India"
                  rows={2}
                  className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500/70 resize-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-medium text-gray-600">
                  City
                </label>
                <input
                  type="text"
                  defaultValue="New Delhi"
                  className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500/70"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-medium text-gray-600">
                  Opening hours
                </label>
                <input
                  type="text"
                  defaultValue="10:00 AM – 11:00 PM"
                  className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500/70"
                />
              </div>
            </div>
          </section>

          {/* Order & delivery settings */}
          <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 space-y-4">
            <div>
              <h2 className="text-sm font-semibold text-gray-900">
                Orders &amp; delivery
              </h2>
              <p className="text-xs text-gray-500 mt-0.5">
                Control how new orders are handled in your kitchen.
              </p>
            </div>

            <div className="space-y-3 text-sm">
              <label className="flex items-center justify-between gap-4">
                <div>
                  <p className="font-medium text-gray-900">
                    Auto-accept new orders
                  </p>
                  <p className="text-xs text-gray-500">
                    If turned off, staff must manually accept each order.
                  </p>
                </div>
                <input
                  type="checkbox"
                  defaultChecked
                  className="h-4 w-4 rounded border-gray-300 text-orange-500 focus:ring-orange-500"
                />
              </label>

              <label className="flex items-center justify-between gap-4">
                <div>
                  <p className="font-medium text-gray-900">
                    Allow scheduled orders
                  </p>
                  <p className="text-xs text-gray-500">
                    Let customers place orders for a future time.
                  </p>
                </div>
                <input
                  type="checkbox"
                  defaultChecked
                  className="h-4 w-4 rounded border-gray-300 text-orange-500 focus:ring-orange-500"
                />
              </label>

              <label className="flex items-center justify-between gap-4">
                <div>
                  <p className="font-medium text-gray-900">
                    Disable orders when kitchen is busy
                  </p>
                  <p className="text-xs text-gray-500">
                    Temporarily pause incoming orders during rush hours.
                  </p>
                </div>
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-orange-500 focus:ring-orange-500"
                />
              </label>
            </div>
          </section>
        </div>

        {/* Right column: notifications & security */}
        <div className="space-y-6">
          {/* Notifications */}
          <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 space-y-4">
            <div>
              <h2 className="text-sm font-semibold text-gray-900">
                Notifications
              </h2>
              <p className="text-xs text-gray-500 mt-0.5">
                Choose how the admin receives alerts for new activity.
              </p>
            </div>

            <div className="space-y-3 text-sm">
              <label className="flex items-center justify-between gap-4">
                <div>
                  <p className="font-medium text-gray-900">
                    New order notifications
                  </p>
                  <p className="text-xs text-gray-500">
                    Receive instant alerts when a new order is placed.
                  </p>
                </div>
                <input
                  type="checkbox"
                  defaultChecked
                  className="h-4 w-4 rounded border-gray-300 text-orange-500 focus:ring-orange-500"
                />
              </label>

              <label className="flex items-center justify-between gap-4">
                <div>
                  <p className="font-medium text-gray-900">
                    Low stock reminders
                  </p>
                  <p className="text-xs text-gray-500">
                    Get notified when popular items are running low.
                  </p>
                </div>
                <input
                  type="checkbox"
                  defaultChecked
                  className="h-4 w-4 rounded border-gray-300 text-orange-500 focus:ring-orange-500"
                />
              </label>

              <label className="flex items-center justify-between gap-4">
                <div>
                  <p className="font-medium text-gray-900">
                    Daily summary email
                  </p>
                  <p className="text-xs text-gray-500">
                    Send a summary of sales and orders every night.
                  </p>
                </div>
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-orange-500 focus:ring-orange-500"
                />
              </label>
            </div>
          </section>

          {/* Security */}
          <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 space-y-4">
            <div>
              <h2 className="text-sm font-semibold text-gray-900">Security</h2>
              <p className="text-xs text-gray-500 mt-0.5">
                Keep your admin account safe and secure.
              </p>
            </div>

            <div className="space-y-3 text-sm">
              <div className="space-y-1.5">
                <label className="block text-xs font-medium text-gray-600">
                  Change password
                </label>
                <input
                  type="password"
                  placeholder="New password"
                  className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500/70"
                />
              </div>

              <p className="text-xs text-gray-500">
                After you connect this screen to your backend, saving will
                update your real admin password.
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
