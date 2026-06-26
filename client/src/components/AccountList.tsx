import { AlertCircleIcon, CheckCircleIcon, PlaneIcon, UnplugIcon } from "lucide-react";
import { PLATFORMS } from "../Assets";

interface AccountListProps {
  accounts: any[];
  onDisconnect: (accountId: string) => Promise<void>;
}

const AccountList = ({ accounts, onDisconnect }: AccountListProps) => {

  const handleDisconnect = async (accountId: string) => {
    const confirm = window.confirm("Are you sure you want to disconnect this account?");
    if (!confirm) return;
    await onDisconnect(accountId);
  };

  // ── Empty state ──
  if (accounts.length === 0) {
    return (
      <div
        className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed p-14 text-center"
        style={{ borderColor: "#c5d0e8", backgroundColor: "#f5f8ff" }}
      >
        {/* Icon */}
        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5"
          style={{ backgroundColor: "#eef2fb", border: "1.5px solid #c5d0e8" }}
        >
          <PlaneIcon className="w-6 h-6" style={{ color: "#3b72d9" }} />
        </div>

        {/* Text */}
        <h3 className="text-base font-medium mb-2" style={{ color: "#0f1e3d" }}>
          No Accounts Connected
        </h3>
        <p className="text-sm leading-relaxed max-w-sm" style={{ color: "#8fa0bf" }}>
          Connect your social media accounts to start scheduling posts,
          generating AI content, and managing your social presence from
          a single dashboard.
        </p>
      </div>
    );
  }

  // ── Account list ──
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {accounts.map((account, index) => {
        const meta = PLATFORMS.find((p) => p.id === account.platform);
        if (!meta) return null;

        const isConnected = account.status === "connected";

        return (
          <div
            key={index}
            className="group relative bg-white rounded-2xl border overflow-hidden flex items-center gap-4 p-4 transition-all duration-200"
            style={{ borderColor: "#e4eaf6" }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "#3b72d9";
              e.currentTarget.style.boxShadow = "0 6px 20px rgba(59,114,217,0.09)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "#e4eaf6";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            {/* Top hover accent bar */}
            <div
              className="absolute top-0 left-0 right-0 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
              style={{ background: "linear-gradient(90deg, #1e3a7a 0%, #3b72d9 100%)" }}
            />

            {/* Platform icon */}
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
              style={{ backgroundColor: "#eef2fb", border: "1.5px solid #dce6f9" }}
            >
              <meta.icon className="w-5 h-5" style={{ color: "#3b72d9" }} />
            </div>

            {/* Handle + platform name */}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate" style={{ color: "#0f1e3d" }}>
                {account.handle}
              </p>
              <p className="text-xs mt-0.5" style={{ color: "#8fa0bf" }}>
                {meta.name}
              </p>
            </div>

            {/* Status badge */}
            <div
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-full shrink-0"
              style={
                isConnected
                  ? { backgroundColor: "#eafaf3", border: "1px solid #9fe1cb" }
                  : { backgroundColor: "#faeeda", border: "1px solid #fac775" }
              }
            >
              {isConnected ? (
                <>
                  <CheckCircleIcon
                    className="w-3.5 h-3.5"
                    style={{ color: "#0f6e56" }}
                  />
                  <span className="text-xs font-semibold" style={{ color: "#0f6e56" }}>
                    Connected
                  </span>
                </>
              ) : (
                <>
                  <AlertCircleIcon
                    className="w-3.5 h-3.5"
                    style={{ color: "#854f0b" }}
                  />
                  <span className="text-xs font-semibold" style={{ color: "#854f0b" }}>
                    Disconnected
                  </span>
                </>
              )}
            </div>

            {/* Disconnect button */}
            <button
              onClick={() => handleDisconnect(account._id)}
              title="Disconnect account"
              className="w-8 h-8 rounded-lg flex items-center justify-center border shrink-0 transition-all duration-150"
              style={{ borderColor: "#e4eaf6", color: "#c5d0e8", backgroundColor: "transparent" }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#fff0f0";
                e.currentTarget.style.borderColor = "#f09595";
                e.currentTarget.style.color = "#a32d2d";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
                e.currentTarget.style.borderColor = "#e4eaf6";
                e.currentTarget.style.color = "#c5d0e8";
              }}
            >
              <UnplugIcon className="w-3.5 h-3.5" />
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default AccountList;