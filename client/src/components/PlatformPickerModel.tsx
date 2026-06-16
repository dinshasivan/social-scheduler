import {
  CheckCircleIcon,
  ExternalLinkIcon,
  XIcon,
} from "lucide-react";
import { PLATFORMS } from "../assets/assets";

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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
      <div className="w-full max-w-lg overflow-hidden rounded-3xl bg-white shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">
          <div>
            <h3 className="text-lg font-semibold text-slate-900">
              Connect Platform
            </h3>
            <p className="text-sm text-slate-500 mt-1">
              Choose a social media platform to connect
            </p>
          </div>

          <button
            onClick={onClose}
            className="flex h-10 w-10 items-center justify-center rounded-xl text-slate-500 transition-all hover:bg-slate-100 hover:text-slate-700"
          >
            <XIcon className="size-5" />
          </button>
        </div>

        {/* Platform List */}
        <div className="p-5 space-y-3 max-h-[500px] overflow-y-auto">
          {PLATFORMS.map((platform) => {
            const isConnected = connectedIds.includes(platform.id);
            const isConnecting = connecting === platform.id;

            return (
              <button
                key={platform.id}
                disabled={isConnected || isConnecting}
                onClick={() => onConnect(platform.id)}
                className={`group flex w-full items-center gap-4 rounded-2xl border p-4 text-left transition-all duration-200
                  
                  ${
                    isConnected
                      ? "border-emerald-200 bg-emerald-50"
                      : "border-slate-200 bg-white hover:border-blue-300 hover:bg-blue-50/50 hover:shadow-md"
                  }

                  ${isConnecting && "opacity-70"}
                `}
              >
                {/* Platform Icon */}
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-2xl
                    ${
                      isConnected
                        ? "bg-emerald-100"
                        : "bg-slate-100 group-hover:bg-blue-100"
                    }
                  `}
                >
                  <platform.icon
                    className={`size-6
                      ${
                        isConnected
                          ? "text-emerald-600"
                          : "text-slate-600 group-hover:text-blue-600"
                      }
                    `}
                  />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <h4
                    className={`font-medium
                      ${
                        isConnected
                          ? "text-emerald-700"
                          : "text-slate-900"
                      }
                    `}
                  >
                    {platform.name}
                  </h4>

                  <p className="mt-1 text-sm text-slate-500 truncate">
                    {isConnected
                      ? "Platform already connected"
                      : platform.description}
                  </p>
                </div>

                {/* Status Icons */}
                {isConnected && (
                  <CheckCircleIcon className="size-5 shrink-0 text-emerald-500" />
                )}

                {isConnecting && (
                  <div className="h-5 w-5 shrink-0 rounded-full border-2 border-blue-600 border-t-transparent animate-spin" />
                )}

                {!isConnected && !isConnecting && (
                  <ExternalLinkIcon className="size-4 shrink-0 text-slate-400 transition-colors group-hover:text-blue-600" />
                )}
              </button>
            );
          })}
        </div>

        {/* Footer */}
        <div className="border-t border-slate-100 px-6 py-4 bg-slate-50">
          <p className="text-xs text-slate-500 text-center">
            Secure OAuth authentication is used to connect your accounts.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PlatformPickerModel;