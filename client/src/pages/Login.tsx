import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MailIcon, LockIcon, ArrowRightIcon, User2Icon } from "lucide-react";
import api from "../services/api"; // adjust path to wherever you put api.ts
import { useAuth } from "../context/AuthContext";

export default function Login() {
    const [isLogin, setIsLogin] = useState(true);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const [success, setSuccess] = useState("");

    const { login } = useAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setSuccess("");
        setLoading(true);

        try {
            const endpoint = isLogin ? "/auth/login" : "/auth/register";
            const payload = isLogin
                ? { email, password }
                : { name, email, password };

            const { data } = await api.post(endpoint, payload);

            if (isLogin) {
                // Real login — store the session and go to dashboard
                login(
                    { id: data._id, name: data.name, email: data.email },
                    data.token
                );
                navigate("/dashboard");
            } else {

                setIsLogin(true);
                setPassword("");
                setName("");
                setError("");
                setSuccess("Account created! Please sign in.");
            }
        } catch (err: any) {
            setError(
                err.response?.data?.message ||
                "Something went wrong. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
            <div className="w-full max-w-sm">

                {/* Card */}
                <div className="bg-white rounded-2xl border border-slate-200 p-8">

                    {/* Logo */}
                    <div className="flex flex-col items-center mb-7">
                        <Link to="/" className="flex flex-col items-center gap-1">
                            <div className="w-10 h-10 rounded-xl bg-[#185FA5] flex items-center justify-center mb-1">
                                <img src="/logo.svg" alt="logo" className="size-5 brightness-0 invert" />
                            </div>
                            <h1 className="text-[18px] font-medium text-slate-800">Scheduler</h1>
                        </Link>
                        <p className="text-[13px] text-slate-400 mt-0.5">
                            {isLogin ? "Sign in to your dashboard" : "Create your free account"}
                        </p>
                    </div>

                    {/* Error message */}
                    {error && (
                        <div className="mb-4 px-3 py-2 rounded-lg bg-red-50 border border-red-200 text-[13px] text-red-600">
                            {error}
                        </div>
                    )}
                    {success && (
                        <div className="mb-4 px-3 py-2 rounded-lg bg-green-50 border border-green-200 text-[13px] text-green-600">
                            {success}
                        </div>
                    )}

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">

                        {/* Name — only shown on sign up */}
                        <div
                            className={`overflow-hidden transition-all duration-300 ${!isLogin ? "max-h-24 opacity-100" : "max-h-0 opacity-0"
                                }`}
                        >
                            <div className="flex flex-col gap-1.5">
                                <label className="text-[13px] font-medium text-slate-500">Name</label>
                                <div className="relative">
                                    <User2Icon className="size-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none" />
                                    <input
                                        type="text"
                                        placeholder="Enter your name"
                                        required={!isLogin}
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="w-full pl-9 pr-4 py-2.5 text-[13.5px] bg-slate-50 border border-slate-200 rounded-full outline-none focus:border-[#378ADD] focus:ring-2 focus:ring-[#378ADD]/15 transition-all placeholder:text-slate-300"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Email */}
                        <div className="flex flex-col gap-1.5">
                            <label className="text-[13px] font-medium text-slate-500">Email</label>
                            <div className="relative">
                                <MailIcon className="size-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none" />
                                <input
                                    type="email"
                                    required
                                    placeholder="you@company.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full pl-9 pr-4 py-2.5 text-[13.5px] bg-slate-50 border border-slate-200 rounded-full outline-none focus:border-[#378ADD] focus:ring-2 focus:ring-[#378ADD]/15 transition-all placeholder:text-slate-300"
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div className="flex flex-col gap-1.5">
                            <label className="text-[13px] font-medium text-slate-500">Password</label>
                            <div className="relative">
                                <LockIcon className="size-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none" />
                                <input
                                    type="password"
                                    required
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full pl-9 pr-4 py-2.5 text-[13.5px] bg-slate-50 border border-slate-200 rounded-full outline-none focus:border-[#378ADD] focus:ring-2 focus:ring-[#378ADD]/15 transition-all placeholder:text-slate-300"
                                />
                            </div>
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="mt-1 w-full flex items-center justify-center gap-2 py-2.5 rounded-full bg-[#185FA5] hover:bg-[#0C447C] text-[#e6f1fb] text-[13.5px] font-medium transition-all disabled:opacity-60"
                        >
                            {loading ? (
                                isLogin ? "Signing in…" : "Creating account…"
                            ) : (
                                <>
                                    {isLogin ? "Sign in" : "Sign up"}
                                    <ArrowRightIcon className="size-4" />
                                </>
                            )}
                        </button>
                    </form>

                    {/* Toggle */}
                    <p className="mt-5 text-center text-[13px] text-slate-400">
                        {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
                        <button
                            onClick={() => {
                                setIsLogin(!isLogin);
                                setError("");
                                setSuccess("");
                            }}
                            className="text-[#378ADD] hover:text-[#185FA5] font-medium transition-colors"
                        >
                            {isLogin ? "Create one free" : "Sign in"}
                        </button>
                    </p>
                </div>

            </div>
        </div>
    );
}