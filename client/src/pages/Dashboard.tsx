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

  const [activities, setActivities] = useState<(any)[]>([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [postRes, accountsRes, activityRes] = [{ data: dummyPostsData }, { data: dummyAccountsData }, { data: dummyActivityData }];
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
  }, [])
  const statsCards = [
    {
      label: "Scheduled Posts",
      value: stats.scheduled,
      icon: ClockIcon,
      color: "bg-blue-50 text-blue-600",
      trend: "+2 today",
    },
    {
      label: "Published Posts",
      value: stats.published,
      icon: CheckCircleIcon,
      color: "bg-emerald-50 text-emerald-600",
      trend: "+15 this week",
    },
    {
      label: "Connected Accounts",
      value: stats.connectedAccounts,
      icon: Share2Icon,
      color: "bg-indigo-50 text-indigo-600",
      trend: "All active",
    },
  ];

  return (
    <div className="space-y-8 bg-slate-50 min-h-screen">
      {/* Hero Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-slate-900 via-slate-800 to-blue-700 p-8 text-white shadow-xl">
        <h1 className="text-3xl font-bold">
          Welcome back, Dinsha 👋
        </h1>

        <p className="mt-2 text-slate-300 max-w-2xl">
          Manage, schedule, and automate your social media content from one
          professional dashboard.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <button className="flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-slate-900 font-medium transition hover:bg-slate-100">
            <PlusIcon size={18} />
            Create Post
          </button>

          <button className="flex items-center gap-2 rounded-xl border border-white/20 px-5 py-3 text-white backdrop-blur-sm transition hover:bg-white/10">
            <CalendarIcon size={18} />
            Schedule
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-6 md:grid-cols-3">
        {statsCards.map((card) => (
          <div
            key={card.label}
            className="rounded-3xl bg-white p-6 border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  {card.label}
                </p>

                <h2 className="mt-2 text-3xl font-bold text-slate-900">
                  {card.value}
                </h2>

                <p className="mt-2 text-sm text-emerald-600">
                  {card.trend}
                </p>
              </div>

              <div
                className={`h-14 w-14 rounded-2xl flex items-center justify-center ${card.color}`}
              >
                <card.icon size={26} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Activity feed */}

      <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <h2 className="text-slate-900">Recent Activity</h2>
          <span className="text-slate-500 text-sm">{activities.length} events </span>
        </div>

        {activities.length === 0 ? (
          <div className=" flex flex-col items-center justify-centerpy-16 px-6">
            <div className="size-12 bg-slate-100 rounded-xl flex items-center justify-center mb-3">
              <ActivityIcon className="size-6 text-slate-400 " /></div>
            <p className="text-slate-500">No Activity yet</p>
            <p className="text-slate-500 text-sm mt-1">Connect accounts and schedule posts to see events here.</p>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {activities.map((activity) => (
              <div key={(activity._id)} className="flex items-start gap-4 px-6 py-4 hover:bg-slate-50/50 transition-colors">
                <div className="size-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5 bg-zinc-100 text-zinc-600">
                  <SendIcon className="size-5" />
                </div>
                <div className="flex min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="text-sm px-2 py-0.5 rounded-full bg-zinc-100">Published</span>
                    <span className="text-sm text-slate-400 shrink-0">{new Date(activity.createdAt).toLocaleDateString()}</span>
                  </div>
                  <p className="text-sm text-slate-500">{activity.description}</p>
                  <p className="text-xs text-slate-400">{activity.date}</p>
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