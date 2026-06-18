import React, { useEffect, useState } from "react";
import { dummyAccountsData, PLATFORMS } from "../assets/assets";
import {
  PlusIcon,
  LinkIcon,
  CheckCircleIcon,
  ActivityIcon,
} from "lucide-react";
import AccountList from "../components/AccountList";
import PlatformPickerModel from "../components/PlatformPickerModel";

const Accounts = () => {
  const [accounts, setAccounts] = useState<any[]>([]);
  const [connecting, setConnecting] = useState<string | null>(null);
  const [showPlatformPicker, setShowPlatformPicker] = useState(false);

  const fetchAccounts = async (
    isSync = false,
    platform?: string | null,
    successMsg?: string
  ) => {
    setAccounts(dummyAccountsData);
    console.log(isSync, platform, successMsg);
  };

  useEffect(() => {
    fetchAccounts();
  }, []);

  const handleConnect = async (platformId: string) => {
    setConnecting(platformId);

    setTimeout(() => {
      setConnecting(null);
      setAccounts((prev) => [...prev, dummyAccountsData[0]]);
      setShowPlatformPicker(false);
    }, 1000);
  };

  const handleDisconnect = async (accountId: string) => {
    setAccounts(accounts.filter((a) => a._id !== accountId));
  };

  const connectedIds = accounts.map((a) => a.platform);

  return (
    <div className="space-y-8 w-full">
      {/* Hero Header */}
      <div className="rounded-3xl bg-gradient-to-r from-slate-900 via-slate-800 to-blue-700 p-4 text-white shadow-xl"
              style={{ background: "linear-gradient(135deg, #0f1e3d 0%, #1e3a7a 50%, #3b72d9 100%)" }}>
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">
              Connected Accounts
            </h1>

            <p className="mt-2 text-sm text-blue-100 max-w-xl">
              Connect and manage all your social media platforms from
              one place.
            </p>
          </div>

          <button
            onClick={() => setShowPlatformPicker(true)}
            className="flex items-center gap-2 rounded-xl bg-white text-sm px-4 py-2 text-slate-800 font-semibold hover:bg-slate-100 transition-all w-fit"
          >
            <PlusIcon size={14} />
            Connect Account
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl bg-white border border-slate-200 p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-500 text-sm">
                Connected Platforms
              </p>
              <h2 className="text-2xl font-bold text-slate-900 mt-2">
                {accounts.length}
              </h2>
            </div>

            <div className="h-10 w-10 rounded-xl bg-blue-100 flex items-center justify-center">
              <LinkIcon className="text-blue-600" size={20} />
            </div>
          </div>
        </div>

        <div className="rounded-2xl bg-white border border-slate-200 p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-500 text-sm">
                Available Platforms
              </p>
              <h2 className="text-2xl font-bold text-slate-900 mt-2">
                {PLATFORMS.length}
              </h2>
            </div>

            <div className="h-10 w-10 rounded-xl bg-cyan-100 flex items-center justify-center">
              <ActivityIcon className="text-cyan-600" size={20} />
            </div>
          </div>
        </div>

        <div className="rounded-2xl bg-white border border-slate-200 p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-500 text-sm">
                Active Accounts
              </p>
              <h2 className="text-2xl font-bold text-slate-900 mt-2">
                {accounts.length}
              </h2>
            </div>

            <div className="h-10 w-10 rounded-xl bg-emerald-100 flex items-center justify-center">
              <CheckCircleIcon
                className="text-emerald-600"
                size={20}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Account List Section */}
      <div className="rounded-2xl bg-white border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-100">
          <h3 className="text-lg font-semibold text-slate-900">
            Social Accounts
          </h3>

          <p className="text-sm text-slate-500 mt-1">
            {accounts.length} of {PLATFORMS.length} platforms connected
          </p>
        </div>

        <div className="p-4">
          <AccountList
            accounts={accounts}
            onDisconnect={handleDisconnect}
          />
        </div>
      </div>

      {/* Platform Picker */}
      {showPlatformPicker && (
        <PlatformPickerModel
          connectedIds={connectedIds}
          connecting={connecting}
          onClose={() => setShowPlatformPicker(false)}
          onConnect={handleConnect}
        />
      )}
    </div>
  );
};

export default Accounts;