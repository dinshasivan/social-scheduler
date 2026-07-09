import { CheckCircleIcon, ExternalLinkIcon, XIcon } from "lucide-react";
import { PLATFORMS } from "../Assets";

interface PlatformPickerModelProps {
  connectedIds: string[];
  connecting: string | null;
  onClose: () => void;
  onConnect: (platformId: string) => void;
}

const PlatformPickerModel = ({
  connectedIds,
  connecting,
  onClose,
  onConnect,
}: PlatformPickerModelProps) => {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-md animate-in fade-in duration-200"
      style={{ backgroundColor: "rgba(10, 18, 40, 0.72)" }}
    >
      <div
        className="w-full max-w-xl overflow-hidden rounded-3xl bg-white animate-in fade-in zoom-in-95 duration-200"
        style={{ boxShadow: "0 24px 64px rgba(30, 58, 122, 0.18)", border: "1.5px solid #dce6f9" }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-8 py-6 border-b"
          style={{ background: "linear-gradient(135deg, #f0f5ff 0%, #e8f0fe 100%)", borderColor: "#dce6f9" }}
        >
          <div className="flex items-center gap-4">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: "#1e3a7a" }}
            >
              <ExternalLinkIcon className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-medium" style={{ color: "#0f1e3d" }}>
                Connect Platform
              </h3>
              <p className="text-sm mt-1" style={{ color: "#8fa0bf" }}>
                Choose a social media platform to connect
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full flex items-center justify-center border transition-all"
            style={{ borderColor: "#c5d0e8", color: "#8fa0bf", backgroundColor: "transparent" }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#eef2fb";
              e.currentTarget.style.color = "#3b72d9";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "transparent";
              e.currentTarget.style.color = "#8fa0bf";
            }}
          >
            <XIcon className="w-4 h-4" />
          </button>
        </div>

        {/* Platform List */}
        <div className="p-6 space-y-3.5 max-h-[520px] overflow-y-auto">
          {PLATFORMS.map((platform) => {
            const isConnected = connectedIds.includes(platform.id);
            const isConnecting = connecting === platform.id;

            return (
              <button
                key={platform.id}
                disabled={isConnected || isConnecting}
                onClick={() => onConnect(platform.id)}
                className="group relative w-full flex items-center gap-5 rounded-2xl border p-5 text-left transition-all duration-200 overflow-hidden"
                style={
                  isConnected
                    ? { backgroundColor: "#eafaf3", borderColor: "#9fe1cb" }
                    : isConnecting
                    ? { backgroundColor: "#f5f8ff", borderColor: "#3b72d9", opacity: 0.75 }
                    : { backgroundColor: "#ffffff", borderColor: "#e4eaf6" }
                }
                onMouseEnter={(e) => {
                  if (!isConnected && !isConnecting) {
                    e.currentTarget.style.borderColor = "#3b72d9";
                    e.currentTarget.style.backgroundColor = "#f5f8ff";
                    e.currentTarget.style.boxShadow = "0 4px 16px rgba(59,114,217,0.10)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isConnected && !isConnecting) {
                    e.currentTarget.style.borderColor = "#e4eaf6";
                    e.currentTarget.style.backgroundColor = "#ffffff";
                    e.currentTarget.style.boxShadow = "none";
                  }
                }}
              >
                {/* Hover accent bar */}
                {!isConnected && !isConnecting && (
                  <div
                    className="absolute top-0 left-0 right-0 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ background: "linear-gradient(90deg, #1e3a7a 0%, #3b72d9 100%)" }}
                  />
                )}

                {/* Platform icon */}
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0"
                  style={
                    isConnected
                      ? { backgroundColor: "#d1f5e8", border: "1.5px solid #9fe1cb" }
                      : { backgroundColor: "#eef2fb", border: "1.5px solid #dce6f9" }
                  }
                >
                  <platform.icon
                    className="w-6 h-6"
                    style={{ color: isConnected ? "#0f6e56" : "#3b72d9" }}
                  />
                </div>

                {/* Name + description */}
                <div className="flex-1 min-w-0">
                  <h4
                    className="text-base font-medium"
                    style={{ color: isConnected ? "#0f6e56" : "#0f1e3d" }}
                  >
                    {platform.name}
                  </h4>
                  <p className="text-sm mt-1 truncate" style={{ color: "#8fa0bf" }}>
                    {isConnected ? "Already connected to this platform" : platform.description}
                  </p>
                </div>

                {/* Right status */}
                {isConnected && (
                  <div
                    className="flex items-center gap-2 px-3.5 py-1.5 rounded-full shrink-0"
                    style={{ backgroundColor: "#eafaf3", border: "1px solid #9fe1cb" }}
                  >
                    <CheckCircleIcon className="w-4 h-4" style={{ color: "#0f6e56" }} />
                    <span className="text-sm font-semibold" style={{ color: "#0f6e56" }}>
                      Connected
                    </span>
                  </div>
                )}

                {isConnecting && (
                  <div
                    className="w-6 h-6 rounded-full border-2 animate-spin shrink-0"
                    style={{ borderColor: "#3b72d9", borderTopColor: "transparent" }}
                  />
                )}

                {!isConnected && !isConnecting && (
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center border shrink-0"
                    style={{ borderColor: "#e4eaf6", backgroundColor: "#f5f8ff" }}
                  >
                    <ExternalLinkIcon className="w-4 h-4" style={{ color: "#8fa0bf" }} />
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Footer */}
        <div
          className="flex items-center justify-center gap-2.5 px-8 py-5 border-t"
          style={{ backgroundColor: "#f5f8ff", borderColor: "#e4eaf6" }}
        >
          <div
            className="w-5 h-5 rounded-full flex items-center justify-center"
            style={{ backgroundColor: "#eef2fb" }}
          >
            <CheckCircleIcon className="w-3.5 h-3.5" style={{ color: "#3b72d9" }} />
          </div>
          <p className="text-sm" style={{ color: "#8fa0bf" }}>
            Secure OAuth authentication is used to connect your accounts.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PlatformPickerModel;