import { useState } from "react";
import { createPortal } from "react-dom";
import { AlertTriangleIcon, XIcon, LogOutIcon } from "lucide-react";
import api from "../services/api";

interface LogoutConfirmModalProps {
  onClose: () => void;
  onConfirm: () => void;
}

const LogoutConfirmModal = ({ onClose, onConfirm }: LogoutConfirmModalProps) => {
  const [disconnectAccounts, setDisconnectAccounts] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogout = async () => {
    setError("");
    if (disconnectAccounts) {
      setLoading(true);
      try {
        await api.delete("/accounts");
      } catch (err: any) {
        setError(err.response?.data?.message || "Failed to disconnect accounts");
        setLoading(false);
        return;
      }
      setLoading(false);
    }
    onConfirm();
  };

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 backdrop-blur-md"
      style={{ backgroundColor: "rgba(10, 18, 40, 0.72)" }}
    >
      <div
        className="w-full max-w-md overflow-hidden rounded-2xl bg-white"
        style={{ boxShadow: "0 24px 64px rgba(30, 58, 122, 0.18)", border: "1.5px solid #dce6f9" }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-6 py-5 border-b"
          style={{ background: "linear-gradient(135deg, #f0f5ff 0%, #e8f0fe 100%)", borderColor: "#dce6f9" }}
        >
          <div className="flex items-center gap-3">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: "#185FA5" }}
            >
              <LogOutIcon className="w-4 h-4 text-white" />
            </div>
            <h3 className="text-base font-medium" style={{ color: "#0f1e3d" }}>
              Log out
            </h3>
          </div>
          <button
            onClick={onClose}
            disabled={loading}
            className="w-8 h-8 rounded-full flex items-center justify-center border transition-all"
            style={{ borderColor: "#c5d0e8", color: "#8fa0bf", backgroundColor: "transparent" }}
          >
            <XIcon className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-4">
          <p className="text-sm" style={{ color: "#4a5a7a" }}>
            Are you sure you want to log out?
          </p>

          <label
            className="flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-all"
            style={{
              borderColor: disconnectAccounts ? "#185FA5" : "#e4eaf6",
              backgroundColor: disconnectAccounts ? "#f5f8ff" : "#ffffff",
            }}
          >
            <input
              type="checkbox"
              checked={disconnectAccounts}
              onChange={(e) => setDisconnectAccounts(e.target.checked)}
              disabled={loading}
              className="mt-0.5"
            />
            <div>
              <p className="text-sm font-medium" style={{ color: "#0f1e3d" }}>
                Also disconnect my social accounts
              </p>
              <p className="text-xs mt-0.5" style={{ color: "#8fa0bf" }}>
                This will remove all connected platforms from your account. You'll need to reconnect them next time you log in.
              </p>
            </div>
          </label>

          {disconnectAccounts && (
            <div
              className="flex items-start gap-2 px-3 py-2.5 rounded-lg border text-xs"
              style={{ backgroundColor: "#fff7ed", borderColor: "#fed7aa", color: "#9a5b13" }}
            >
              <AlertTriangleIcon className="w-4 h-4 shrink-0 mt-0.5" />
              This action can't be undone.
            </div>
          )}

          {error && (
            <div className="px-3 py-2.5 rounded-lg bg-red-50 border border-red-200 text-xs text-red-600">
              {error}
            </div>
          )}
        </div>

        {/* Footer */}
        <div
          className="flex items-center justify-end gap-3 px-6 py-4 border-t"
          style={{ backgroundColor: "#f5f8ff", borderColor: "#e4eaf6" }}
        >
          <button
            onClick={onClose}
            disabled={loading}
            className="px-4 py-2 rounded-xl text-sm font-medium transition-all"
            style={{ color: "#4a5a7a" }}
          >
            Cancel
          </button>
          <button
            onClick={handleLogout}
            disabled={loading}
            className="px-4 py-2 rounded-xl text-sm font-semibold text-white transition-all disabled:opacity-60"
            style={{ background: "linear-gradient(135deg, #0f1e3d 0%, #185FA5 100%)" }}
          >
            {loading ? "Logging out…" : "Log out"}
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default LogoutConfirmModal;