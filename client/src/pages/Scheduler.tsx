import { useEffect, useState } from "react";
import { dummyPostsData, PLATFORMS } from "../assets/assets";
import {
  ArrowRightIcon,
  CalendarDaysIcon,
  CalendarIcon,
  ClockIcon,
  SendIcon,
  XIcon,
  ImageIcon,
} from "lucide-react";

const Scheduler = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [content, setContent] = useState("");
  const [scheduledDate, setScheduledDate] = useState("");
  const [scheduledTime, setScheduledTime] = useState("");
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [mediaFile, setMediaFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchPosts = async () => {
    setPosts(dummyPostsData);
  };

  useEffect(() => {
    fetchPosts();

    const interval = setInterval(() => {
      fetchPosts();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const scheduled = posts.filter(
    (p) => p.status === "scheduled"
  );

  const published = posts.filter(
    (p) => p.status === "published"
  );

  const togglePlatform = (id: string) => {
    setSelectedPlatforms((prev) =>
      prev.includes(id)
        ? prev.filter((p) => p !== id)
        : [...prev, id]
    );
  };

  const handleSchedule = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    setLoading(true);

    setTimeout(() => {
      setLoading(false);

      setPosts((prev) => [
        ...prev,
        {
          _id: Date.now(),
          content,
          status: "scheduled",
          platforms: selectedPlatforms,
          scheduledFor: `${scheduledDate} ${scheduledTime}`,
        },
      ]);

      setContent("");
      setScheduledDate("");
      setScheduledTime("");
      setSelectedPlatforms([]);
      setMediaFile(null);
    }, 1000);
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-5 gap-6">
      {/* LEFT SIDE */}
      <div className="xl:col-span-3 ">
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="px-4 py-4 border-b border-slate-100">
            <h2 className="text-xl font-bold text-slate-900">
              Compose Post
            </h2>

            <p className="text-sm text-slate-500 mt-1">
              Create and schedule content across platforms
            </p>
          </div>

          <form
            onSubmit={handleSchedule}
            className="p-3 space-y-4"
          >
            {/* Platforms */}
            <div className="">
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Select Platforms
              </label>

              <div className=" flex flex-wrap gap-3">
                {PLATFORMS.map((p) => {
                  const active = selectedPlatforms.includes(p.id);

                  return (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => togglePlatform(p.id)}
                      className={`flex items-center gap-2 px-3 py-2 rounded-xl border transition-all
                    ${active
                          ? "bg-blue-50 border-blue-500 text-blue-600"
                          : "border-slate-200 hover:border-slate-300"
                        }`}
                    >
                      <p.icon size={18} />
                      {p.name}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Content */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Content
              </label>

              <textarea
                rows={5}
                required
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="What do you want to share today?"
                className="w-full rounded-2xl border border-slate-200 p-3 outline-none focus:border-blue-500" />

              <p
                className={`mt-1 text-sm ${content.length > 270
                  ? "text-red-500"
                  : "text-slate-500"
                  }`}
              >
                {content.length}/280
              </p>
            </div>

            {/* Media */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Media (Optional)
              </label>

              {mediaFile ? (
                <div className="relative rounded-2xl overflow-hidden border border-slate-200">
                  {mediaFile.type.startsWith("image/") ? (
                    <img
                      src={URL.createObjectURL(mediaFile)}
                      alt=""
                      className="max-h-56 object-cover"
                    />
                  ) : (
                    <video
                      controls
                      src={URL.createObjectURL(mediaFile)}
                      className=""
                    />
                  )}

                  <button
                    type="button"
                    onClick={() => setMediaFile(null)}
                    className="absolute top-3 right-3 bg-red-500 text-white p-2 rounded-full"
                  >
                    <XIcon size={16} />
                  </button>
                </div>
              ) : (
                <label className="border-2 border-dashed border-slate-300 rounded-2xl p-6 flex justify-center cursor-pointer">
                  <span className="text-slate-500">
                    Upload Image or Video
                  </span>

                  <input
                    type="file"
                    className="hidden"
                    accept="image/*,video/*"
                    onChange={(e) =>
                      e.target.files?.[0] &&
                      setMediaFile(e.target.files[0])
                    }
                  />
                </label>
              )}
            </div>

            {/* Date Time */}
            <div className="grid md:grid-cols-2 gap-3">
              <div>
                <label className="block text-sm mb-1">
                  Schedule Date
                </label>

                <input
                  type="date"
                  required
                  value={scheduledDate}
                  onChange={(e) =>
                    setScheduledDate(e.target.value)
                  }
                  className="w-full rounded-xl border border-slate-200 px-3 py-2"
                />
              </div>

              <div>
                <label className="block text-sm mb-1">
                  Schedule Time
                </label>

                <input
                  type="time"
                  required
                  value={scheduledTime}
                  onChange={(e) =>
                    setScheduledTime(e.target.value)
                  }
                  className="w-full rounded-xl border border-slate-200 px-3 py-2"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-2xl flex items-center justify-center gap-2 font-semibold"
            >
              {loading ? (
                "Scheduling..."
              ) : (
                <>
                  Schedule Post
                  <ArrowRightIcon size={18} />
                </>
              )}
            </button>
          </form>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="xl:col-span-2 flex flex-col gap-6">
        {/* Upcoming */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <CalendarDaysIcon className="text-blue-600" />
              <h3 className="font-semibold">
                Upcoming Posts
              </h3>
            </div>

            <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-semibold">
              {scheduled.length}
            </span>
          </div>

          <div className="p-4 space-y-3 max-h-[350px] overflow-y-auto">
            {scheduled.length === 0 ? (
              <p className="text-slate-500 text-sm">
                No scheduled posts
              </p>
            ) : (
              scheduled.map((post) => (
                <div
                  key={post._id}
                  className="border-b border-slate-100 p-4 hover:bg-slate-50 transition-all"
                >
                  {/* Top Row */}
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      {post.platforms.map((pl: string) => {
                        const meta = PLATFORMS.find((p) => p.id === pl);

                        return meta ? (
                          <meta.icon
                            key={pl}
                            className="size-4 text-slate-400"
                          />
                        ) : null;
                      })}
                    </div>

                    <div className="flex items-center gap-2">
                      {post.mediaType && (
                        <span className="px-2 py-0.5 text-[10px] rounded bg-slate-100 text-slate-600 font-medium">
                          {post.mediaType}
                        </span>
                      )}

                      <span className="text-[11px] text-slate-400">
                        {new Date(post.scheduledFor).toLocaleString()}
                      </span>

                      {post.status === "published" && (
                        <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600 text-[10px] font-medium">
                          Published
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Content */}
                  <p className="text-sm text-slate-700 leading-relaxed line-clamp-2">
                    {post.content}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Published */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <SendIcon className="text-emerald-600" />
              <h3 className="font-semibold">
                Published Posts
              </h3>
            </div>

            <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-sm font-semibold">
              {published.length}
            </span>
          </div>

          <div className="p-4 space-y-3 max-h-[350px] overflow-y-auto">
            {published.length === 0 ? (
              <p className="text-slate-500 text-sm">
                No published posts
              </p>
            ) : (
              published.map((post) => (
                <div
                  key={post._id}
                  className="border-b border-slate-100 p-4 hover:bg-slate-50 transition-all"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      {post.platforms.map((pl: string) => {
                        const meta = PLATFORMS.find((p) => p.id === pl);

                        return meta ? (
                          <meta.icon
                            key={pl}
                            className="size-4 text-slate-400"
                          />
                        ) : null;
                      })}
                    </div>

                    <div className="flex items-center gap-2">
                      {post.mediaType && (
                        <span className="px-2 py-0.5 text-[10px] rounded bg-slate-100 text-slate-600 font-medium">
                          {post.mediaType}
                        </span>
                      )}

                      <span className="text-[11px] text-slate-400">
                        {new Date(post.scheduledFor).toLocaleString()}
                      </span>

                      {post.status === "published" && (
                        <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600 text-[10px] font-medium">
                          Published
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Content */}
                  <p className="text-sm text-slate-700 leading-relaxed line-clamp-2">
                    {post.content}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );;
};

export default Scheduler;