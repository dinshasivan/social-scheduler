import { AlertCircleIcon, CheckCircleIcon, PlaneIcon, UnplugIcon } from "lucide-react";
import { PLATFORMS } from "../assets/assets";

interface AccountListProps {
    accounts: any[];
    onDisconnect: (accountId: string) => Promise<void>;
}
const AccountList = ({ accounts, onDisconnect }: AccountListProps) => {

    const handleDisconnect = async (accountId: string) => {
        const confirm = window.confirm("Are you sure you want to disconnect this account?");
        if (!confirm) return;

        await onDisconnect(accountId);
    }
    if (accounts.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-slate-300 bg-gradient-to-br from-slate-50 to-blue-50 p-12 text-center">

                <div className="flex h-10 w-10 items-center justify-center rounded-3xl bg-white shadow-sm border border-slate-200">
                    <PlaneIcon className="h-6 w-6 text-blue-500" />
                </div>

                <h3 className="mt-6 text-xl font-semibold text-slate-900">
                    No Accounts Connected
                </h3>

                <p className="mt-3 max-w-md text-sm leading-relaxed text-slate-500">
                    Connect your social media accounts to start scheduling posts,
                    generating AI content, and managing your social presence from
                    a single dashboard.
                </p>
            </div>
        );
    }
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {accounts.map((account, index) => {
                const meta = PLATFORMS.find((p) => p.id === account.platform);
                console.log(meta)
                if (!meta) return null;

                return (
                    <div key={index} className="group bg-white border border-slate-200 rounded-2xl p-4 flex items-center gap-4 hover:border-slate-300 transition-all">
                        <div className="size-11 bg-slate-50 rounded-xl flex items-center justify-center shrink-0">
                            <meta.icon className="size-5 text-slate-200" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="text-slate-900 truncate">{account.handle}</div>
                            <div className="text-slate-500 text-sm mt-0.5">{meta.name}</div>
                        </div>

                        <div className="flex items-center gap-1.5 shrink-0">
                            {account.status === "connected" ? (
                                <>
                                    <CheckCircleIcon className="size-4 text-emerald-500" />
                                    <span className="text-sm text-emerald-600">Connected</span>
                                </>
                            ) : (
                                <>
                                    <AlertCircleIcon className="size-4 text-amber-500" />
                                    <span className="text-xs text-amber-600">Disconnected</span>
                                </>
                            )}
                        </div>
                        <button onClick={() => handleDisconnect(account._id)}
                            title="Disconnect Account"
                            className="ml-2 p-1.5 rounded-lg text-slate-300 group-hover:text-red-500 transition-all"
                        >
                            <UnplugIcon className="size-4" />

                        </button>
                    </div>
                )
            })}
        </div>
    )
}

export default AccountList