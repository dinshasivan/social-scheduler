import { useEffect, useState } from "react";
import { PLATFORMS } from "../assets/assets";
import {
  ArrowRightIcon,
  CalendarDaysIcon,
  SendIcon,
  XIcon,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";

const Scheduler = () => {
  const { user } = useAuth();

  const [posts, setPosts] = useState<any[]>([]);
  const [content, setContent] = useState("");
  const [scheduledDate, setScheduledDate] = useState("");
  const [scheduledTime, setScheduledTime] = useState("");
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [mediaFile, setMediaFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [fetchError, setFetchError] = useState("");
  const [submitError, setSubmitError] = useState("");

  // ─── Fetch posts ──────────────────────────────────────────────────────────
  const fetchPosts = async () => {
    try {
      const { data } = await api.get("/posts");
      setPosts(data);
    } catch (err: any) {
      setFetchError("Could not load posts.");
      console.error("fetchPosts error:", err);
    }
  };

  useEffect(() => {
    if (user) {
      fetchPosts();
      const interval = setInterval(fetchPosts, 30_000);
      return () => clearInterval(interval);
    }
  }, [user]);

  const scheduled = posts.filter((p) => p.status === "scheduled");
  const published = posts.filter((p) => p.status === "published");

  const togglePlatform = (id: string) =>
    setSelectedPlatforms((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );

  // ─── Schedule (manual compose) ────────────────────────────────────────────
  const handleSchedule = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError("");

    if (!selectedPlatforms.length) {
      setSubmitError("Please select at least one platform.");
      return;
    }

    setLoading(true);
    try {
      const schedulerFor = new Date(`${scheduledDate}T${scheduledTime}`).toISOString();

      let data: any;

      if (mediaFile) {
        const form = new FormData();
        form.append("content", content);
        form.append("platforms", JSON.stringify(selectedPlatforms));
        form.append("schedulerFor", schedulerFor);
        form.append("media", mediaFile);

        const res = await api.post("/posts", form, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        data = res.data;
      } else {
        const res = await api.post("/posts", {
          content,
          platforms: selectedPlatforms,
          schedulerFor,
        });
        data = res.data;
      }

      setPosts((prev) => [data, ...prev]);
      setContent("");
      setScheduledDate("");
      setScheduledTime("");
      setSelectedPlatforms([]);
      setMediaFile(null);
    } catch (err: any) {
      setSubmitError(err.response?.data?.message ?? "Scheduling failed.");
    } finally {
      setLoading(false);
    }
  };

  // ...rest of the JSX is unchanged

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-8">

      {/* ── LEFT: Compose (50%) ────────────────────────────────────────────── */}
      <div className="lg:col-span-1">
        <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="px-6 py-6 border-b border-slate-100">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Compose Post</h2>
            <p className="text-base text-slate-500 mt-1.5">
              Create and schedule content across platforms
            </p>
          </div>

          <form onSubmit={handleSchedule} className="p-5 space-y-6">

            {/* Platforms */}
            <div>
              <label className="block text-base font-medium text-slate-700 mb-2">
                Select Platforms
              </label>
              <div className="flex flex-wrap gap-2.5 sm:gap-3.5">
                {PLATFORMS.map((p) => {
                  const active = selectedPlatforms.includes(p.id);
                  return (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => togglePlatform(p.id)}
                      className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl border transition-all text-base ${
                        active
                          ? "bg-blue-50 border-blue-500 text-blue-600"
                          : "border-slate-200 hover:border-slate-300"
                      }`}
                    >
                      <p.icon size={20} />
                      {p.name}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Content */}
            <div>
              <label className="block text-base font-medium text-slate-700 mb-2">
                Content
              </label>
              <textarea
                rows={5}
                required
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="What do you want to share today?"
                className="w-full rounded-2xl border border-slate-200 p-4 outline-none focus:border-blue-500 text-base"
              />
              <p className={`mt-1.5 text-sm ${content.length > 500 ? "text-red-500" : "text-slate-500"}`}>
                {content.length}/500
              </p>
            </div>

            {/* Media */}
            <div>
              <label className="block text-base font-medium text-slate-700 mb-2">
                Media (Optional)
              </label>
              {mediaFile ? (
                <div className="relative rounded-2xl overflow-hidden border border-slate-200">
                  {mediaFile.type.startsWith("image/") ? (
                    <img
                      src={URL.createObjectURL(mediaFile)}
                      alt=""
                      className="w-full max-h-64 object-cover"
                    />
                  ) : (
                    <video controls src={URL.createObjectURL(mediaFile)} className="w-full" />
                  )}
                  <button
                    type="button"
                    onClick={() => setMediaFile(null)}
                    className="absolute top-4 right-4 bg-red-500 text-white p-2.5 rounded-full"
                  >
                    <XIcon size={18} />
                  </button>
                </div>
              ) : (
                <label className="border-2 border-dashed border-slate-300 rounded-2xl p-6 sm:p-8 flex justify-center cursor-pointer">
                  <span className="text-slate-500 text-base text-center">Upload Image or Video</span>
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*,video/*"
                    onChange={(e) => e.target.files?.[0] && setMediaFile(e.target.files[0])}
                  />
                </label>
              )}
            </div>

            {/* Date & Time */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-base mb-2">Schedule Date</label>
                <input
                  type="date"
                  required
                  value={scheduledDate}
                  onChange={(e) => setScheduledDate(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-base"
                />
              </div>
              <div>
                <label className="block text-base mb-2">Schedule Time</label>
                <input
                  type="time"
                  required
                  value={scheduledTime}
                  onChange={(e) => setScheduledTime(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-base"
                />
              </div>
            </div>

            {/* Inline error */}
            {submitError && (
              <p className="text-base text-red-500">{submitError}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full text-white py-3.5 rounded-2xl flex items-center justify-center gap-2.5 font-semibold disabled:opacity-60 text-base"
              style={{ background: "linear-gradient(135deg, #1e3a7a 0%, #3b72d9 100%)" }}
            >
              {loading ? "Scheduling..." : <><span>Schedule Post</span><ArrowRightIcon size={20} /></>}
            </button>
          </form>
        </div>
      </div>

      {/* ── RIGHT: Post Lists (50%) ───────────────────────────────────────── */}
      <div className="lg:col-span-1 flex flex-col gap-5 sm:gap-8">

        {fetchError && (
          <p className="text-base text-red-500 px-1">{fetchError}</p>
        )}

        {/* Upcoming */}
        <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between px-6 py-6 border-b border-slate-100">
            <div className="flex items-center gap-2.5">
              <CalendarDaysIcon className="text-blue-600" size={24} />
              <h3 className="font-semibold text-base sm:text-lg">Upcoming Posts</h3>
            </div>
            <span className="px-4 py-1.5 rounded-full bg-blue-100 text-blue-700 text-sm sm:text-base font-semibold shrink-0">
              {scheduled.length}
            </span>
          </div>

          <div className="p-4 sm:p-5 space-y-4 max-h-[340px] sm:max-h-[380px] overflow-y-auto">
            {scheduled.length === 0 ? (
              <p className="text-slate-500 text-base">No scheduled posts</p>
            ) : (
              scheduled.map((post) => <PostCard key={post._id} post={post} />)
            )}
          </div>
        </div>

        {/* Published */}
        <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between px-6 py-6 border-b border-slate-100">
            <div className="flex items-center gap-2.5">
              <SendIcon className="text-emerald-600" size={24} />
              <h3 className="font-semibold text-base sm:text-lg">Published Posts</h3>
            </div>
            <span className="px-4 py-1.5 rounded-full bg-emerald-100 text-emerald-700 text-sm sm:text-base font-semibold shrink-0">
              {published.length}
            </span>
          </div>

          <div className="p-4 sm:p-5 space-y-4 max-h-[340px] sm:max-h-[380px] overflow-y-auto">
            {published.length === 0 ? (
              <p className="text-slate-500 text-base">No published posts</p>
            ) : (
              published.map((post) => <PostCard key={post._id} post={post} />)
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

// ─── Shared post card ─────────────────────────────────────────────────────────
const PostCard = ({ post }: { post: any }) => (
  <div className="border-b border-slate-100 p-4 sm:p-5 hover:bg-slate-50 transition-all rounded-xl">
    <div className="flex flex-wrap items-center justify-between gap-2.5 mb-2.5">
      <div className="flex items-center gap-2.5">
        {post.platforms.map((pl: string) => {
          const meta = PLATFORMS.find((p) => p.id === pl);
          return meta ? <meta.icon key={pl} className="size-5 text-slate-400" /> : null;
        })}
      </div>
      <div className="flex items-center gap-2.5 flex-wrap">
        {post.mediaType && (
          <span className="px-2.5 py-1 text-xs rounded bg-slate-100 text-slate-600 font-medium">
            {post.mediaType}
          </span>
        )}
        <span className="text-xs text-slate-400">
          {new Date(post.schedulerFor ?? post.scheduledFor).toLocaleString()}
        </span>
        {post.status === "published" && (
          <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-600 text-xs font-medium">
            Published
          </span>
        )}
      </div>
    </div>
    <p className="text-base text-slate-700 leading-relaxed line-clamp-2">{post.content}</p>
  </div>
);

export default Scheduler;