import { useEffect, useRef, useState } from "react";
import { BellIcon, CheckCircleIcon, XCircleIcon } from "lucide-react";
import api from "../services/api";

interface Notification {
  _id: string;
  description: string;
  type: "post_published" | "post_failed";
  createdAt: string;
  read: boolean;
}

const NotificationBell = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const fetchNotifications = async () => {
    try {
      const { data } = await api.get("/notifications");
      setNotifications(data.notifications);
      setUnreadCount(data.unreadCount);
    } catch (err) {
      console.error("Failed to fetch notifications:", err);
    }
  };

  useEffect(() => {
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 30_000); // poll every 30s
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleOpen = async () => {
    setOpen((prev) => !prev);
    if (!open && unreadCount > 0) {
      try {
        await api.patch("/notifications/read-all");
        setUnreadCount(0);
        setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
      } catch (err) {
        console.error("Failed to mark notifications read:", err);
      }
    }
  };

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={handleOpen}
        className="relative h-10 w-10 flex items-center justify-center rounded-xl border border-slate-200 text-slate-500 hover:bg-slate-50 transition"
      >
        <BellIcon className="size-5" />
        {unreadCount > 0 && (
          <span className="absolute top-1.5 right-1.5 h-4 min-w-4 px-0.5 flex items-center justify-center rounded-full bg-red-500 text-white text-[10px] font-semibold">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      {open && (
        <div
          className="absolute right-0 mt-2 w-80 bg-white border border-slate-200 rounded-xl shadow-lg overflow-hidden z-50"
        >
          <div className="px-4 py-3 border-b border-slate-100">
            <p className="text-sm font-semibold text-slate-800">Notifications</p>
          </div>

          <div className="max-h-80 overflow-y-auto divide-y divide-slate-100">
            {notifications.length === 0 ? (
              <div className="px-4 py-8 text-center">
                <p className="text-sm text-slate-400">No notifications yet</p>
              </div>
            ) : (
              notifications.map((n) => (
                <div key={n._id} className="flex items-start gap-3 px-4 py-3 hover:bg-slate-50 transition-colors">
                  <div className="mt-0.5 shrink-0">
                    {n.type === "post_failed" ? (
                      <XCircleIcon className="size-4 text-red-500" />
                    ) : (
                      <CheckCircleIcon className="size-4 text-emerald-500" />
                    )}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm text-slate-700 leading-snug">{n.description}</p>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      {new Date(n.createdAt).toLocaleString(undefined, {
                        month: "short", day: "numeric", hour: "2-digit", minute: "2-digit",
                      })}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationBell;