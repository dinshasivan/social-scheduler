import  { useEffect, useState } from "react";
import { PLATFORMS } from "../Assets";
import {
  PlusIcon,
  LinkIcon,
  CheckCircleIcon,
  ActivityIcon,
  UsersIcon,
} from "lucide-react";
import AccountList from "../components/AccountList";
import PlatformPickerModel from "../components/PlatformPickerModel";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

const Accounts = () => {
  const { user } = useAuth();
  const [accounts, setAccounts] = useState<any[]>([]);
  const [connecting, setConnecting] = useState<string | null>(null);
  const [showPlatformPicker, setShowPlatformPicker] = useState(false);
  const [error, setError] = useState("");
  const [syncing, setSyncing] = useState(false);
  const [loadingAccounts, setLoadingAccounts] = useState(true);

  useEffect(() => {
    // Logged out -> wipe everything and stop
    if (!user?.id) {
      setAccounts([]);
      setError("");
      setSyncing(false);
      setLoadingAccounts(false);
      return;
    }

    let cancelled = false;

    const syncAccounts = async () => {
      try {
        const { data } = await api.get("/oauth/sync");
        console.log("Sync response:", data);
      } catch (err) {
        console.error("Sync failed:", err);
      }
    };

    const fetchAccounts = async () => {
      if (!cancelled) setLoadingAccounts(true);
      try {
        const { data } = await api.get("/accounts");
        console.log("Fetched accounts:", data);
        if (!cancelled) setAccounts(data);
      } catch (err: any) {
        if (!cancelled) {
          setError(err.response?.data?.message || "Failed to load accounts");
        }
      } finally {
        if (!cancelled) setLoadingAccounts(false);
      }
    };

    const init = async () => {
      setAccounts([]);
      setError("");

      const params = new URLSearchParams(window.location.search);
      const justReturned = params.has("code") || params.has("state");

      if (justReturned) {
        if (!cancelled) setSyncing(true);
        window.history.replaceState({}, "", "/accounts");
        await syncAccounts();
        await new Promise((resolve) => setTimeout(resolve, 1500));
        await fetchAccounts();
        if (!cancelled) setSyncing(false);
      } else {
        await syncAccounts();
        await fetchAccounts();
      }
    };

    init();

    return () => {
      cancelled = true;
    };
  }, [user?.id]);

  const handleConnect = async (platformId: string) => {
    setConnecting(platformId);
    setError("");
    try {
      const { data } = await api.get(`/oauth/${platformId}/url`);
      window.location.href = data.url;
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to initiate connection");
      setConnecting(null);
    }
  };

  const handleDisconnect = async (accountId: string) => {
    try {
      await api.delete(`/accounts/${accountId}`);
      setAccounts((prev) => prev.filter((a) => a._id !== accountId));
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to disconnect account");
    }
  };

  const connectedIds = accounts.map((a) => a.platform);

  return (
    <div className="space-y-8 w-full">
      {/* Hero Header */}
      <div
        className="rounded-3xl p-8 sm:p-10 text-white shadow-xl"
        style={{ background: "linear-gradient(135deg, #0f1e3d 0%, #1e3a7a 50%, #3b72d9 100%)" }}
      >
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
          <div>
            <h1 className="text-3xl sm:text-4xl font-semibold">Connected Accounts</h1>
            <p className="mt-3 text-base text-blue-100 max-w-xl">
              Connect and manage all your social media platforms from one place.
            </p>
          </div>
          <button
            onClick={() => setShowPlatformPicker(true)}
            className="flex items-center gap-2.5 rounded-xl bg-white text-base px-6 py-3 text-slate-800 font-semibold hover:bg-slate-100 transition-all w-fit"
          >
            <PlusIcon size={18} />
            Connect Account
          </button>
        </div>
      </div>

      {/* Syncing banner */}
      {syncing && (
        <div
          className="flex items-center gap-3 px-5 py-4 rounded-xl border text-base font-medium"
          style={{ backgroundColor: "#f0f5ff", borderColor: "#c5d0e8", color: "#1e3a7a" }}
        >
          <div
            className="w-5 h-5 rounded-full border-2 animate-spin shrink-0"
            style={{ borderColor: "#3b72d9", borderTopColor: "transparent" }}
          />
          Syncing your connected account…
        </div>
      )}

      {error && (
        <div className="px-5 py-4 rounded-lg bg-red-50 border border-red-200 text-base text-red-600">
          {error}
        </div>
      )}

      {/* Stats */}
      <div className="grid gap-5 md:grid-cols-3">
        <div className="rounded-2xl bg-white border border-slate-200 p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-500 text-sm">Connected Platforms</p>
              <h2 className="text-4xl font-semibold text-slate-900 mt-3">
                {loadingAccounts ? (
                  <span className="inline-block h-9 w-10 rounded bg-slate-200 animate-pulse align-middle" />
                ) : (
                  accounts.length
                )}
              </h2>
            </div>
            <div className="h-14 w-14 rounded-2xl bg-blue-100 flex items-center justify-center">
              <LinkIcon className="text-blue-600" size={22} />
            </div>
          </div>
        </div>

        <div className="rounded-2xl bg-white border border-slate-200 p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-500 text-sm">Available Platforms</p>
              <h2 className="text-4xl font-semibold text-slate-900 mt-3">{PLATFORMS.length}</h2>
            </div>
            <div className="h-14 w-14 rounded-2xl bg-cyan-100 flex items-center justify-center">
              <ActivityIcon className="text-cyan-600" size={22} />
            </div>
          </div>
        </div>

        <div className="rounded-2xl bg-white border border-slate-200 p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-500 text-sm">Active Accounts</p>
              <h2 className="text-4xl font-semibold text-slate-900 mt-3">
                {loadingAccounts ? (
                  <span className="inline-block h-9 w-10 rounded bg-slate-200 animate-pulse align-middle" />
                ) : (
                  accounts.length
                )}
              </h2>
            </div>
            <div className="h-14 w-14 rounded-2xl bg-emerald-100 flex items-center justify-center">
              <CheckCircleIcon className="text-emerald-600" size={22} />
            </div>
          </div>
        </div>
      </div>

      {/* Account List Section */}
      <div className="rounded-2xl bg-white border border-slate-200 shadow-sm overflow-auto ">
        <div className="px-7 py-6 border-b border-slate-100">
          <h3 className="text-xl font-semibold text-slate-900">Social Accounts</h3>
          <p className="text-base text-slate-500 mt-1.5">
            {loadingAccounts
              ? "Checking your connected platforms…"
              : `${accounts.length} of ${PLATFORMS.length} platforms connected`}
          </p>
        </div>
        <div className="p-5">
          {loadingAccounts ? (
            // Loading skeleton
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="flex items-center gap-4 p-5 rounded-xl border border-slate-100 animate-pulse"
                >
                  <div className="h-12 w-12 rounded-full bg-slate-200 shrink-0" />
                  <div className="flex-1 space-y-2.5">
                    <div className="h-3.5 w-1/3 rounded bg-slate-200" />
                    <div className="h-3 w-1/4 rounded bg-slate-100" />
                  </div>
                </div>
              ))}
            </div>
          ) : accounts.length === 0 ? (
            // Empty state - no accounts connected
            <div className="flex flex-col items-center justify-center text-center py-6 px-6">
              <div
                className="h-16 w-16 rounded-2xl flex items-center justify-center mb-5"
                style={{ backgroundColor: "#eaf0fb" }}
              >
                <UsersIcon size={30} style={{ color: "#3b72d9" }} />
              </div>
              <h4 className="text-lg font-semibold text-slate-900">
                No account connected
              </h4>
              <p className="text-base text-slate-500 mt-1.5 max-w-sm">
                Connect a social media platform to start scheduling and publishing posts.
              </p>
              <button
                onClick={() => setShowPlatformPicker(true)}
                className="mt-6 flex items-center gap-2.5 rounded-xl text-base px-6 py-3 text-white font-semibold transition-all"
                style={{ background: "linear-gradient(135deg, #0f1e3d 0%, #3b72d9 100%)" }}
              >
                <PlusIcon size={18} />
                Connect Account
              </button>
            </div>
          ) : (
            <AccountList accounts={accounts} onDisconnect={handleDisconnect} />
          )}
        </div>
      </div>

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