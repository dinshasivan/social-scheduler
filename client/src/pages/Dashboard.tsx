import {
  CheckCircleIcon,
  ClockIcon,
  Share2Icon,
  ActivityIcon,
  SendIcon,
  XCircleIcon,
} from "lucide-react";
import { useEffect, useState } from "react";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

interface Activity {
  _id: string;
  description: string;
  type?: "post_published" | "post_failed" | "account_connected" | "account_disconnected";
  date?: string;
  createdAt: string;
}

const ACTIVITY_BADGES: Record<string, { label: string; bg: string; color: string; border: string }> = {
  post_published: { label: "Published", bg: "#eafaf3", color: "#0f6e56", border: "#9fe1cb" },
  post_failed: { label: "Failed", bg: "#fef2f2", color: "#b91c1c", border: "#fca5a5" },
  account_connected: { label: "Connected", bg: "#eef2fb", color: "#1e3a7a", border: "#c5d0e8" },
  account_disconnected: { label: "Disconnected", bg: "#f5f5f5", color: "#57534e", border: "#d6d3d1" },
};

const Dashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    scheduled: 0,
    published: 0,
    connectedAccounts: 0,
  });
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!user?.id) {
      setStats({ scheduled: 0, published: 0, connectedAccounts: 0 });
      setActivities([]);
      setError("");
      setLoading(false);
      return;
    }

    let cancelled = false;

    const fetchDashboardData = async () => {
      setStats({ scheduled: 0, published: 0, connectedAccounts: 0 });
      setActivities([]);
      setLoading(true);
      setError("");

      try {
        const { data } = await api.get("/dashboard");
        if (!cancelled) {
          setStats(data.stats);
          setActivities(data.activities);
        }
      } catch (err: any) {
        console.error("Error fetching dashboard data:", err);
        if (!cancelled) {
          setError(
            err.response?.data?.message || "Failed to load dashboard data"
          );
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchDashboardData();

    return () => {
      cancelled = true;
    };
  }, [user?.id]);

  const statsCards = [
    {
      label: "Scheduled Posts",
      value: stats.scheduled,
      icon: ClockIcon,
      iconBg: "#eef2fb",
      iconColor: "#3b72d9",
    },
    {
      label: "Published Posts",
      value: stats.published,
      icon: CheckCircleIcon,
      iconBg: "#eafaf3",
      iconColor: "#0f6e56",
    },
    {
      label: "Connected Accounts",
      value: stats.connectedAccounts,
      icon: Share2Icon,
      iconBg: "#eef2fb",
      iconColor: "#1e3a7a",
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <p className="text-base text-slate-400">Loading dashboard…</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">

      {/* ── Hero Banner ── */}
      <div
        className="rounded-3xl p-8 sm:p-10 text-white relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #0f1e3d 0%, #1e3a7a 50%, #3b72d9 100%)" }}
      >
        <div
          className="absolute top-0 right-0 w-72 h-72 rounded-full opacity-10 pointer-events-none"
          style={{ background: "radial-gradient(circle, #ffffff 0%, transparent 70%)", transform: "translate(30%, -30%)" }}
        />
        <div
          className="absolute bottom-0 left-1/2 w-48 h-48 rounded-full opacity-5 pointer-events-none"
          style={{ background: "radial-gradient(circle, #ffffff 0%, transparent 70%)", transform: "translate(-50%, 40%)" }}
        />

        <div className="relative">
          <h1 className="text-3xl sm:text-4xl font-semibold text-white mb-2">
            Welcome back
          </h1>
          <p className="text-base max-w-2xl" style={{ color: "rgba(255,255,255,0.7)" }}>
            Manage, schedule, and automate your social media content from one professional dashboard.
          </p>
        </div>
      </div>

      {error && (
        <div className="px-5 py-4 rounded-xl bg-red-50 border border-red-200 text-base text-red-600">
          {error}
        </div>
      )}

      {/* ── Stats Cards ── */}
      <div className="grid gap-5 md:grid-cols-3">
        {statsCards.map((card) => (
          <div
            key={card.label}
            className="bg-white rounded-2xl border p-6 transition-all duration-200"
            style={{ borderColor: "#e4eaf6", boxShadow: "0 2px 12px rgba(30,58,122,0.05)" }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "#3b72d9";
              e.currentTarget.style.boxShadow = "0 8px 24px rgba(59,114,217,0.10)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "#e4eaf6";
              e.currentTarget.style.boxShadow = "0 2px 12px rgba(30,58,122,0.05)";
            }}
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-widest" style={{ color: "#8fa0bf" }}>
                  {card.label}
                </p>
                <h2 className="mt-3 text-4xl font-semibold" style={{ color: "#0f1e3d" }}>
                  {card.value}
                </h2>
              </div>

              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0"
                style={{ backgroundColor: card.iconBg, border: `1.5px solid ${card.iconColor}22` }}
              >
                <card.icon className="w-6 h-6" style={{ color: card.iconColor }} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ── Activity Feed ── */}
      <div
        className="bg-white rounded-2xl border flex flex-col max-h-[450px]"
        style={{ borderColor: "#e4eaf6", boxShadow: "0 2px 12px rgba(30,58,122,0.05)" }}
      >
        <div
          className="flex items-center justify-between px-7 py-6 border-b shrink-0"
          style={{ borderColor: "#e4eaf6" }}
        >
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: "#eef2fb" }}
            >
              <ActivityIcon className="w-5 h-5" style={{ color: "#3b72d9" }} />
            </div>
            <h2 className="text-xl font-semibold" style={{ color: "#0f1e3d" }}>
              Recent Activity
            </h2>
          </div>
          <span
            className="text-sm font-semibold px-4 py-2 rounded-full border"
            style={{ backgroundColor: "#eef2fb", borderColor: "#c5d0e8", color: "#3b72d9" }}
          >
            {activities.length} events
          </span>
        </div>

        {activities.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 px-6 text-center">
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center mb-5"
              style={{ backgroundColor: "#eef2fb" }}
            >
              <ActivityIcon className="w-7 h-7" style={{ color: "#c5d0e8" }} />
            </div>
            <p className="text-base font-medium mb-1.5" style={{ color: "#1e2a4a" }}>
              No activity yet
            </p>
            <p className="text-sm" style={{ color: "#8fa0bf" }}>
              Connect accounts and schedule posts to see events here.
            </p>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto scrollbar-none divide-y" style={{ borderColor: "#f0f4fc" }}>
            {activities.map((activity) => {
              const badge = ACTIVITY_BADGES[activity.type ?? "post_published"] ?? ACTIVITY_BADGES.post_published;
              const isFailed = activity.type === "post_failed";
              return (
                <div
                  key={activity._id}
                  className="flex items-start gap-5 px-7 py-5 transition-colors"
                  onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#f5f8ff"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; }}
                >
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 mt-0.5"
                    style={{ backgroundColor: "#eef2fb", border: "1.5px solid #dce6f9" }}
                  >
                    {isFailed ? (
                      <XCircleIcon className="w-5 h-5" style={{ color: "#b91c1c" }} />
                    ) : (
                      <SendIcon className="w-5 h-5" style={{ color: "#3b72d9" }} />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-3 mb-1.5">
                      <span
                        className="text-sm font-semibold px-3 py-1 rounded-full"
                        style={{ backgroundColor: badge.bg, color: badge.color, border: `1px solid ${badge.border}` }}
                      >
                        {badge.label}
                      </span>
                      <span className="text-sm shrink-0" style={{ color: "#8fa0bf" }}>
                        {new Date(activity.createdAt).toLocaleDateString(undefined, {
                          month: "short", day: "numeric", year: "numeric",
                        })}
                      </span>
                    </div>
                    <p className="text-base leading-relaxed" style={{ color: "#4a5a7a" }}>
                      {activity.description}
                    </p>
                    {activity.date && (
                      <p className="text-sm mt-1" style={{ color: "#8fa0bf" }}>
                        {activity.date}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;