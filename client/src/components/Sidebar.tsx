import { CalendarDays, CalendarDaysIcon, LayoutDashboardIcon, LogOutIcon, UserIcon, Wand2Icon } from 'lucide-react'
import { NavLink, useLocation } from 'react-router-dom'

const Sidebar = ({ isOpen, setIsOpen }: { isOpen: boolean, setIsOpen: (isOpen: boolean) => void }) => {

    const { logout, user } = {
        logout: () => {
            window.location.href = "/";
        },
        user: {
            name: "Dinsha Sivan",
            email: "dinsha@example.com"
        }
    }
    const navItems = [
        { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboardIcon },
        { name: 'Accounts', path: '/accounts', icon: UserIcon },
        { name: 'Scheduler', path: '/scheduler', icon: CalendarDaysIcon },
        { name: 'AI Composer', path: '/ai-composer', icon: Wand2Icon },

    ]
    const locacation = useLocation()
    return (
        <div
            className={`fixed inset-y-0 left-0 z-50 w-72 bg-white/95 backdrop-blur-md border-r border-slate-200 shadow-xl transform transition-transform duration-300 md:relative md:translate-x-0
    ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
        >

            {/* sidebar icon */}
            <div className='p-6 border-b border-slate-100'>
                <div className='flex items-center gap-3'>
                    <div className='p-2 rounded-xl bg-gradient-to-r from-red-500 to-pink-500'>
                        <img src="/logo.png" alt="Logo" className='size-6' />
                    </div>

                    <div>
                        <h1 className='font-bold text-xl text-slate-800'>
                            Scheduler
                        </h1>
                        <p className='text-xs text-slate-500'>
                            Social Media Manager
                        </p>
                    </div>
                </div>
            </div>

            {/* nav section label */}
            <div className='px-6 py-4'>
                <span className='text-xs font-semibold uppercase tracking-wider text-slate-400'>
                    Menu
                </span>
            </div>

            {/* nav links */}
            <nav className='flex-1 px-3 space-y-1'>
                {navItems.map((item) => {
                    const isActive = locacation.pathname === item.path;

                    return (
                        <NavLink
                            key={item.name}
                            to={item.path}
                            end={item.path === '/dashboard'}
                            onClick={() => setIsOpen(false)}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group
    ${isActive
                                    ? 'bg-red-50 text-red-600 shadow-sm'
                                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                                }`}
                        >
                            <item.icon
                                className={`size-5 shrink-0 transition-colors ${isActive
                                    ? 'text-red-500'
                                    : 'text-slate-400 group-hover:text-slate-700'
                                    }`}
                            />

                            <span className="font-medium">{item.name}</span>

                            {isActive && (
                                <span className="ml-auto w-1.5 h-6 rounded-full bg-red-500" />
                            )}
                        </NavLink>
                    )
                })}
            </nav>

            {/* user profile and logout */}
            <div className='p-4 border-t border-slate-100 bg-slate-50'>
                <div className='flex items-center gap-3 p-3 rounded-xl bg-white shadow-sm'>
                    <div className='size-10 rounded-full bg-gradient-to-r from-red-500 to-pink-500 flex items-center justify-center text-white font-semibold'>
                        {user?.name?.charAt(0).toUpperCase() || 'U'}
                    </div>


                    <div className='flex-1 min-w-0'>
                        <h3 className='text-sm font-semibold text-slate-800 truncate'>
                            {user?.name}
                        </h3>

                        <p className='text-xs text-slate-500 truncate'>
                            {user?.email}
                        </p>
                    </div>
                </div>

                <button
                    onClick={logout}
                    className='w-full mt-4 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-red-50 text-red-600 hover:bg-red-500 hover:text-white transition-all duration-300'
                >
                    <LogOutIcon className='size-4.5' />
                    <span className='font-medium'>Sign Out</span>
                </button>
            </div>
        </div>

    )
}

export default Sidebar