import {
  CheckCircleIcon,
  ClockIcon,
  Share2Icon,
  PlusIcon,
  CalendarIcon,
  Wand2Icon,
  ActivityIcon,
  SendIcon,
} from "lucide-react";
import { useEffect, useState } from "react";
import { dummyAccountsData, dummyActivityData, dummyPostsData } from "../assets/assets";

const Dashboard = () => {
  const [stats, setStats] = useState({
    scheduled: 0,
    published: 0,
    connectedAccounts: 0,
  });
  const [activities, setActivities] = useState<any[]>([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [postRes, accountsRes, activityRes] = [
          { data: dummyPostsData },
          { data: dummyAccountsData },
          { data: dummyActivityData },
        ];
        const posts = postRes.data;
        setStats({
          scheduled: posts.filter((p: any) => p.status === "scheduled").length,
          published: posts.filter((p: any) => p.status === "published").length,
          connectedAccounts: accountsRes.data.filter((a: any) => a.status === "connected").length,
        });
        setActivities(activityRes.data);
      } catch (error: any) {
        console.error("Error fetching dashboard data:", error);
      }
    };
    fetchDashboardData();
  }, []);

  const statsCards = [
    {
      label: "Scheduled Posts",
      value: stats.scheduled,
      icon: ClockIcon,
      iconBg: "#eef2fb",
      iconColor: "#3b72d9",
      trendColor: "#3b72d9",
      trend: "+2 today",
    },
    {
      label: "Published Posts",
      value: stats.published,
      icon: CheckCircleIcon,
      iconBg: "#eafaf3",
      iconColor: "#0f6e56",
      trendColor: "#0f6e56",
      trend: "+15 this week",
    },
    {
      label: "Connected Accounts",
      value: stats.connectedAccounts,
      icon: Share2Icon,
      iconBg: "#eef2fb",
      iconColor: "#1e3a7a",
      trendColor: "#3b72d9",
      trend: "All active",
    },
  ];

  return (
    <div className="space-y-6">

      {/* ── Hero Banner ── */}
      <div
        className="rounded-2xl p-8 text-white relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #0f1e3d 0%, #1e3a7a 50%, #3b72d9 100%)" }}
      >
        {/* Subtle background orbs */}
        <div
          className="absolute top-0 right-0 w-72 h-72 rounded-full opacity-10 pointer-events-none"
          style={{ background: "radial-gradient(circle, #ffffff 0%, transparent 70%)", transform: "translate(30%, -30%)" }}
        />
        <div
          className="absolute bottom-0 left-1/2 w-48 h-48 rounded-full opacity-5 pointer-events-none"
          style={{ background: "radial-gradient(circle, #ffffff 0%, transparent 70%)", transform: "translate(-50%, 40%)" }}
        />

        <div className="relative">
          <h1 className="text-2xl font-medium text-white mb-1">
            Welcome back, Dinsha 👋
          </h1>
          <p className="text-sm max-w-xl" style={{ color: "rgba(255,255,255,0.6)" }}>
            Manage, schedule, and automate your social media content from one professional dashboard.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <button
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-opacity"
              style={{ backgroundColor: "#ffffff", color: "#0f1e3d" }}
              onMouseEnter={(e) => { e.currentTarget.style.opacity = "0.9"; }}
              onMouseLeave={(e) => { e.currentTarget.style.opacity = "1"; }}
            >
              <PlusIcon size={16} />
              Create Post
            </button>

            <button
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all"
              style={{
                backgroundColor: "rgba(255,255,255,0.1)",
                border: "1.5px solid rgba(255,255,255,0.2)",
                color: "#ffffff",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.18)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.1)"; }}
            >
              <CalendarIcon size={16} />
              Schedule
            </button>
          </div>
        </div>
      </div>

      {/* ── Stats Cards ── */}
      <div className="grid gap-4 md:grid-cols-3">
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
                <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: "#8fa0bf" }}>
                  {card.label}
                </p>
                <h2 className="mt-2 text-3xl font-medium" style={{ color: "#0f1e3d" }}>
                  {card.value}
                </h2>
                <div className="mt-2 flex items-center gap-1.5">
                  <span
                    className="text-xs font-semibold px-2 py-0.5 rounded-full"
                    style={{
                      backgroundColor: card.iconBg,
                      color: card.trendColor,
                    }}
                  >
                    {card.trend}
                  </span>
                </div>
              </div>

              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                style={{ backgroundColor: card.iconBg, border: `1.5px solid ${card.iconColor}22` }}
              >
                <card.icon className="w-5 h-5" style={{ color: card.iconColor }} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ── Activity Feed ── */}
      <div
        className="bg-white rounded-2xl border overflow-hidden"
        style={{ borderColor: "#e4eaf6", boxShadow: "0 2px 12px rgba(30,58,122,0.05)" }}
      >
        {/* Feed header */}
        <div
          className="flex items-center justify-between px-6 py-5 border-b"
          style={{ borderColor: "#e4eaf6" }}
        >
          <div className="flex items-center gap-2.5">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: "#eef2fb" }}
            >
              <ActivityIcon className="w-4 h-4" style={{ color: "#3b72d9" }} />
            </div>
            <h2 className="text-base font-medium" style={{ color: "#0f1e3d" }}>
              Recent Activity
            </h2>
          </div>
          <span
            className="text-xs font-semibold px-3 py-1.5 rounded-full border"
            style={{ backgroundColor: "#eef2fb", borderColor: "#c5d0e8", color: "#3b72d9" }}
          >
            {activities.length} events
          </span>
        </div>

        {/* Empty state */}
        {activities.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4"
              style={{ backgroundColor: "#eef2fb" }}
            >
              <ActivityIcon className="w-6 h-6" style={{ color: "#c5d0e8" }} />
            </div>
            <p className="text-sm font-medium mb-1" style={{ color: "#1e2a4a" }}>
              No activity yet
            </p>
            <p className="text-xs" style={{ color: "#8fa0bf" }}>
              Connect accounts and schedule posts to see events here.
            </p>
          </div>
        ) : (
          <div className="divide-y" style={{ borderColor: "#f0f4fc" }}>
            {activities.map((activity) => (
              <div
                key={activity._id}
                className="flex items-start gap-4 px-6 py-4 transition-colors"
                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#f5f8ff"; }}
                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; }}
              >
                {/* Icon */}
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5"
                  style={{ backgroundColor: "#eef2fb", border: "1.5px solid #dce6f9" }}
                >
                  <SendIcon className="w-4 h-4" style={{ color: "#3b72d9" }} />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-3 mb-1">
                    <span
                      className="text-xs font-semibold px-2.5 py-0.5 rounded-full"
                      style={{ backgroundColor: "#eafaf3", color: "#0f6e56", border: "1px solid #9fe1cb" }}
                    >
                      Published
                    </span>
                    <span className="text-xs shrink-0" style={{ color: "#8fa0bf" }}>
                      {new Date(activity.createdAt).toLocaleDateString(undefined, {
                        month: "short", day: "numeric", year: "numeric",
                      })}
                    </span>
                  </div>
                  <p className="text-sm leading-relaxed" style={{ color: "#4a5a7a" }}>
                    {activity.description}
                  </p>
                  {activity.date && (
                    <p className="text-xs mt-0.5" style={{ color: "#8fa0bf" }}>
                      {activity.date}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;