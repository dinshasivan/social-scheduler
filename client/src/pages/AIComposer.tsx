import { useEffect, useState } from "react"
import { PLATFORMS } from "../assets/assets";
import {
  ArrowRightIcon, CalendarIcon, ClockIcon, HistoryIcon,
  Loader2Icon, TimerIcon, Wand2Icon, XIcon
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";

const AIComposer = () => {
  const { user } = useAuth();

  const [prompt, setPrompt] = useState("");
  const [tone, setTone] = useState("Professional");
  const [generateImage, setGenerateImage] = useState(true);
  const [loading, setLoading] = useState(false);
  const [generations, setGenerations] = useState<any[]>([]);
  const [fetchError, setFetchError] = useState("");

  const [activeScheduler, setActiveScheduler] = useState<any | null>(null);
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [scheduledDate, setScheduledDate] = useState("");
  const [scheduledTime, setScheduledTime] = useState("");
  const [scheduling, setScheduling] = useState(false);
  const [scheduleError, setScheduleError] = useState("");

  const fetchGenerations = async () => {
    try {
      const { data } = await api.get("/posts/generations");
      setGenerations(data);
    } catch (err: any) {
      setFetchError("Could not load generations.");
      console.error("fetchGenerations error:", err);
    }
  };

  useEffect(() => {
    if (user) fetchGenerations();
  }, [user]);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    setFetchError("");
    try {
      const { data } = await api.post("/posts/generate", { prompt, tone, generateImage });
      setGenerations((prev) => [data, ...prev]);
    } catch (err: any) {
      setFetchError(err.response?.data?.message ?? "Generation failed.");
    } finally {
      setLoading(false);
    }
  };

  const handleSchedule = async () => {
    if (!selectedPlatforms.length || !scheduledDate || !scheduledTime) {
      setScheduleError("Please select at least one platform and a date/time.");
      return;
    }
    setScheduleError("");
    setScheduling(true);
    try {
      const schedulerFor = new Date(`${scheduledDate}T${scheduledTime}`).toISOString();

      await api.post("/posts", {
        generationId: activeScheduler._id,
        platforms: selectedPlatforms,
        schedulerFor,
      });

      setActiveScheduler(null);
      setSelectedPlatforms([]);
      setScheduledDate("");
      setScheduledTime("");
    } catch (err: any) {
      setScheduleError(err.response?.data?.message ?? "Scheduling failed.");
    } finally {
      setScheduling(false);
    }
  };

  // ...rest of the JSX is unchanged

  const tones = ["Professional", "Creative", "Funny", "Minimalist", "Excited"];

  return (
    <div className="h-full overflow-y-auto scrollbar-none max-w-4xl mx-auto space-y-10 pb-12 animate-in fade-in duration-700">

      {/* ── Input Section ─────────────────────────────────────────────────── */}
      <div className="space-y-7 text-center px-6 py-6 mx-auto max-w-3xl">

        <div className="space-y-2">
          <h1 className="text-3xl font-medium tracking-tight" style={{ color: "#0f1e3d" }}>
            What should we create today?
          </h1>
          <p className="text-sm" style={{ color: "#8fa0bf" }}>
            Craft AI-powered social posts in seconds — pick a tone, generate, and schedule.
          </p>
        </div>

        {/* Textarea Card */}
        <div
          className="relative rounded-2xl border bg-white transition-all duration-200"
          style={{ borderColor: "#c5d0e8", boxShadow: "0 4px 20px rgba(30,58,122,0.06)" }}
          onFocusCapture={e => {
            e.currentTarget.style.borderColor = "#3b72d9";
            e.currentTarget.style.boxShadow = "0 4px 24px rgba(59,114,217,0.12)";
          }}
          onBlurCapture={e => {
            e.currentTarget.style.borderColor = "#c5d0e8";
            e.currentTarget.style.boxShadow = "0 4px 20px rgba(30,58,122,0.06)";
          }}
        >
          <textarea
            className="w-full px-6 pt-5 pb-16 bg-transparent rounded-2xl text-sm outline-none resize-none"
            style={{ color: "#1e2a4a", height: "148px" }}
            placeholder="Share your idea… (e.g. A post about the launch of our new eco-friendly coffee beans)"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />

          {/* Textarea footer */}
          <div
            className="absolute bottom-0 left-0 right-0 flex items-center justify-between px-4 py-3 rounded-b-2xl border-t"
            style={{ backgroundColor: "#f5f8ff", borderColor: "#e4eaf6" }}
          >
            {/* AI Image Toggle */}
            <button
              onClick={() => setGenerateImage(!generateImage)}
              className="flex items-center gap-2.5 px-3 py-1.5 rounded-lg border text-xs font-medium transition-all"
              style={{
                backgroundColor: generateImage ? "#eef2fb" : "#ffffff",
                borderColor: generateImage ? "#3b72d9" : "#c5d0e8",
                color: generateImage ? "#3b72d9" : "#8fa0bf",
              }}
              onMouseEnter={e => { if (!generateImage) { e.currentTarget.style.borderColor = "#3b72d9"; e.currentTarget.style.color = "#3b72d9"; } }}
              onMouseLeave={e => { if (!generateImage) { e.currentTarget.style.borderColor = "#c5d0e8"; e.currentTarget.style.color = "#8fa0bf"; } }}
            >
              <span>AI Image</span>
              <div
                className="relative inline-flex shrink-0 cursor-pointer rounded-full transition-colors duration-200"
                style={{ width: "34px", height: "19px", backgroundColor: generateImage ? "#3b72d9" : "#c5d0e8" }}
              >
                <span
                  className="pointer-events-none absolute top-0.5 rounded-full bg-white transition-transform duration-200"
                  style={{ width: "15px", height: "15px", transform: generateImage ? "translateX(17px)" : "translateX(2px)" }}
                />
              </div>
            </button>

            {/* Generate Button */}
            <button
              onClick={handleGenerate}
              disabled={loading || !prompt.trim()}
              className="flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-semibold text-white transition-opacity disabled:opacity-60"
              style={{ background: "linear-gradient(135deg, #1e3a7a 0%, #3b72d9 100%)" }}
              onMouseEnter={e => { if (!loading) e.currentTarget.style.opacity = "0.88"; }}
              onMouseLeave={e => { e.currentTarget.style.opacity = "1"; }}
            >
              {loading ? (
                <><Loader2Icon className="size-4 animate-spin" /><span>Generating…</span></>
              ) : (
                <><span>Generate</span><ArrowRightIcon className="size-4" /></>
              )}
            </button>
          </div>
        </div>

        {/* Error banner */}
        {fetchError && (
          <p className="text-sm text-red-500 text-left px-1">{fetchError}</p>
        )}

        {/* Tone Pills */}
        <div className="flex flex-wrap justify-center gap-2">
          {tones.map((t) => (
            <button
              key={t}
              onClick={() => setTone(t)}
              className="px-4 py-1.5 rounded-full text-sm font-medium border transition-all duration-150"
              style={tone === t
                ? { backgroundColor: "#1e3a7a", borderColor: "#1e3a7a", color: "#ffffff" }
                : { backgroundColor: "#ffffff", borderColor: "#c5d0e8", color: "#5a6a8a" }}
              onMouseEnter={e => { if (tone !== t) { e.currentTarget.style.borderColor = "#3b72d9"; e.currentTarget.style.color = "#3b72d9"; } }}
              onMouseLeave={e => { if (tone !== t) { e.currentTarget.style.borderColor = "#c5d0e8"; e.currentTarget.style.color = "#5a6a8a"; } }}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* ── Recent Generations ────────────────────────────────────────────── */}
      <div className="space-y-6 pt-10 border-t" style={{ borderColor: "#e4eaf6" }}>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: "#eef2fb" }}>
              <HistoryIcon className="size-4" style={{ color: "#3b72d9" }} />
            </div>
            <h2 className="text-lg font-medium" style={{ color: "#0f1e3d" }}>Recent Generations</h2>
          </div>
          <span className="text-xs font-semibold px-3 py-1.5 rounded-full border"
            style={{ backgroundColor: "#eef2fb", borderColor: "#c5d0e8", color: "#3b72d9" }}>
            {generations.length} total
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {generations.map((gen) => (
            <div
              key={gen._id}
              className="group relative flex flex-col rounded-2xl border bg-white overflow-hidden transition-all duration-200"
              style={{ borderColor: "#e4eaf6" }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "#3b72d9"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(59,114,217,0.10)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "#e4eaf6"; e.currentTarget.style.boxShadow = "none"; }}
            >
              <div className="h-0.5 w-full opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ background: "linear-gradient(90deg, #1e3a7a 0%, #3b72d9 100%)" }} />

              <div className="flex flex-col flex-1 p-5 space-y-3.5">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs uppercase tracking-widest" style={{ color: "#8fa0bf" }}>
                    {new Date(gen.createdAt).toLocaleString(undefined, { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })}
                  </span>
                  <span className="text-xs font-semibold px-2.5 py-0.5 rounded-md"
                    style={{ backgroundColor: "#eef2fb", color: "#3b72d9" }}>
                    {gen.tone}
                  </span>
                </div>

                <p className="text-sm leading-relaxed line-clamp-3 flex-1" style={{ color: "#4a5a7a" }}>
                  {gen.content}
                </p>

                {gen.mediaUrl && (
                  <div className="rounded-xl overflow-hidden border" style={{ borderColor: "#e4eaf6" }}>
                    <img src={gen.mediaUrl} alt="Generated media"
                      className="w-full aspect-video object-cover transition-opacity duration-200 opacity-85 group-hover:opacity-100" />
                  </div>
                )}

                <div className="pt-1">
                  <button
                    onClick={() => {
                      setActiveScheduler(gen);
                      setScheduleError("");
                      setSelectedPlatforms([]);
                      setScheduledDate("");
                      setScheduledTime("");
                    }}
                    className="w-full py-2.5 rounded-xl text-xs font-semibold border transition-all duration-200 flex items-center justify-center gap-1.5"
                    style={{ backgroundColor: "#f5f8ff", borderColor: "#c5d0e8", color: "#3b72d9" }}
                    onMouseEnter={e => { e.currentTarget.style.backgroundColor = "#1e3a7a"; e.currentTarget.style.borderColor = "#1e3a7a"; e.currentTarget.style.color = "#ffffff"; }}
                    onMouseLeave={e => { e.currentTarget.style.backgroundColor = "#f5f8ff"; e.currentTarget.style.borderColor = "#c5d0e8"; e.currentTarget.style.color = "#3b72d9"; }}
                  >
                    <CalendarIcon className="w-3.5 h-3.5" />
                    Schedule Post
                  </button>
                </div>
              </div>
            </div>
          ))}

          {generations.length === 0 && !loading && (
            <div className="col-span-full py-24 flex flex-col items-center justify-center space-y-4">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center" style={{ backgroundColor: "#eef2fb" }}>
                <Wand2Icon className="size-7" style={{ color: "#c5d0e8" }} />
              </div>
              <div className="text-center space-y-1">
                <p className="text-sm font-medium" style={{ color: "#1e2a4a" }}>No generations yet</p>
                <p className="text-xs" style={{ color: "#8fa0bf" }}>Share an idea above and hit Generate to get started.</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ── Schedule Modal ────────────────────────────────────────────────── */}
      {activeScheduler && (
        <div
          className="fixed inset-0 min-h-screen z-50 flex items-center justify-center p-4 backdrop-blur-md animate-in fade-in duration-300"
          style={{ backgroundColor: "rgba(10, 18, 40, 0.72)" }}
        >
          <div
            className="bg-white rounded-2xl w-full max-w-2xl border border-blue-100 overflow-hidden flex flex-col max-h-[90vh]"
            style={{ boxShadow: "0 24px 64px rgba(30, 58, 122, 0.18)" }}
          >
            {/* Header */}
            <div
              className="flex items-center justify-between px-7 py-4 border-b border-blue-100"
              style={{ background: "linear-gradient(135deg, #f0f5ff 0%, #e8f0fe 100%)" }}
            >
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ backgroundColor: "#1e3a7a" }}>
                  <TimerIcon className="w-3.5 h-3.5 text-white" />
                </div>
                <h3 className="font-medium text-base" style={{ color: "#0f1e3d" }}>Schedule Post</h3>
              </div>
              <button
                onClick={() => setActiveScheduler(null)}
                className="w-8 h-8 rounded-full flex items-center justify-center border transition-colors"
                style={{ borderColor: "#c5d0e8", color: "#8fa0bf" }}
                onMouseEnter={e => { e.currentTarget.style.backgroundColor = "#eef2fb"; e.currentTarget.style.color = "#3b72d9"; }}
                onMouseLeave={e => { e.currentTarget.style.backgroundColor = "transparent"; e.currentTarget.style.color = "#8fa0bf"; }}
              >
                <XIcon className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto p-7 space-y-5">
              {activeScheduler.prompt && (
                <div className="rounded-xl p-4 border" style={{ backgroundColor: "#f5f8ff", borderColor: "#dce6f9" }}>
                  <p className="text-xs font-semibold uppercase tracking-widest mb-1.5" style={{ color: "#3b72d9" }}>Prompt</p>
                  <p className="text-sm leading-relaxed" style={{ color: "#4a5a7a" }}>{activeScheduler.prompt}</p>
                </div>
              )}

              <div className="rounded-xl p-4 border" style={{ backgroundColor: "#ffffff", borderColor: "#e4eaf6" }}>
                <p className="text-xs font-semibold uppercase tracking-widest mb-1.5" style={{ color: "#3b72d9" }}>Content</p>
                <p className="text-sm leading-relaxed" style={{ color: "#1e2a4a" }}>{activeScheduler.content}</p>
                {activeScheduler.mediaUrl && (
                  <div className="mt-3 rounded-lg overflow-hidden border" style={{ borderColor: "#e4eaf6" }}>
                    <img src={activeScheduler.mediaUrl} alt="preview" className="w-full object-cover aspect-video" />
                  </div>
                )}
              </div>
            </div>

            {/* Footer */}
            <div className="px-7 pb-7 pt-4 space-y-5 border-t" style={{ borderColor: "#e4eaf6" }}>

              {/* Platform selector */}
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: "#5a6a8a" }}>
                  Select platforms
                </p>
                <div className="flex flex-wrap gap-2.5">
                  {PLATFORMS.map((p) => {
                    const active = selectedPlatforms.includes(p.id);
                    return (
                      <button
                        key={p.id}
                        onClick={() =>
                          setSelectedPlatforms((prev) =>
                            prev.includes(p.id) ? prev.filter((x) => x !== p.id) : [...prev, p.id]
                          )
                        }
                        className="flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-medium transition-all"
                        style={active
                          ? { backgroundColor: "#1e3a7a", borderColor: "#1e3a7a", color: "#ffffff" }
                          : { backgroundColor: "#ffffff", borderColor: "#c5d0e8", color: "#4a5a7a" }}
                        onMouseEnter={e => { if (!active) { e.currentTarget.style.borderColor = "#3b72d9"; e.currentTarget.style.color = "#3b72d9"; } }}
                        onMouseLeave={e => { if (!active) { e.currentTarget.style.borderColor = "#c5d0e8"; e.currentTarget.style.color = "#4a5a7a"; } }}
                      >
                        <p.icon size={16} />
                        {p.name}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Date & Time */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="flex flex-col gap-1.5">
                  <label className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest" style={{ color: "#5a6a8a" }}>
                    <CalendarIcon className="w-3.5 h-3.5" style={{ color: "#3b72d9" }} />
                    Date
                  </label>
                  <input type="date"
                    className="w-full px-3 py-2.5 rounded-xl border text-sm outline-none transition-colors"
                    style={{ backgroundColor: "#f5f8ff", borderColor: "#c5d0e8", color: "#1e2a4a" }}
                    value={scheduledDate}
                    onChange={(e) => setScheduledDate(e.target.value)}
                    onFocus={e => { e.currentTarget.style.borderColor = "#3b72d9"; e.currentTarget.style.backgroundColor = "#ffffff"; }}
                    onBlur={e => { e.currentTarget.style.borderColor = "#c5d0e8"; e.currentTarget.style.backgroundColor = "#f5f8ff"; }}
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest" style={{ color: "#5a6a8a" }}>
                    <ClockIcon className="w-3.5 h-3.5" style={{ color: "#3b72d9" }} />
                    Time
                  </label>
                  <input type="time"
                    className="w-full px-3 py-2.5 rounded-xl border text-sm outline-none transition-colors"
                    style={{ backgroundColor: "#f5f8ff", borderColor: "#c5d0e8", color: "#1e2a4a" }}
                    value={scheduledTime}
                    onChange={(e) => setScheduledTime(e.target.value)}
                    onFocus={e => { e.currentTarget.style.borderColor = "#3b72d9"; e.currentTarget.style.backgroundColor = "#ffffff"; }}
                    onBlur={e => { e.currentTarget.style.borderColor = "#c5d0e8"; e.currentTarget.style.backgroundColor = "#f5f8ff"; }}
                  />
                </div>
              </div>

              {/* Inline validation error */}
              {scheduleError && (
                <p className="text-sm text-red-500">{scheduleError}</p>
              )}

              {/* Submit */}
              <button
                onClick={handleSchedule}
                disabled={scheduling}
                className="w-full py-3.5 rounded-xl flex items-center justify-center gap-2 text-sm font-semibold text-white transition-opacity disabled:opacity-70"
                style={{ background: "linear-gradient(135deg, #1e3a7a 0%, #3b72d9 100%)" }}
                onMouseEnter={e => { if (!scheduling) e.currentTarget.style.opacity = "0.88"; }}
                onMouseLeave={e => { e.currentTarget.style.opacity = "1"; }}
              >
                {scheduling ? (
                  <><Loader2Icon className="w-4 h-4 animate-spin" />Scheduling...</>
                ) : (
                  <><TimerIcon className="w-4 h-4" />Schedule Post</>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIComposer;