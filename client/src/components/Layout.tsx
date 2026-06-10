import React, { useState } from 'react'
import Sidebar from './Sidebar'
import { Outlet, useLocation } from 'react-router'
import { MenuIcon } from 'lucide-react'

const pageTitle: Record<string, string> = {
    '/dashboard': 'Dashboard',
    '/accounts': 'Accounts',
    '/scheduler': 'Scheduler',
    '/ai-composer': 'AI Composer'
}

const Layout = () => {

    const locacation = useLocation()
    const title = pageTitle[locacation.pathname]

    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false)
    return (
        <div className='flex h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 overflow-hidden'>

            {/* mobile overlay */}
            {isMobileMenuOpen && <div className='fixed inset-0 bg-slate-900/50 md:hidden z-40'
                onClick={() => setMobileMenuOpen(false)} />}

            <Sidebar isOpen={isMobileMenuOpen} setIsOpen={setMobileMenuOpen} />

            <div className='flex-1 flex flex-col overflow-hidden'>
                {/* top nav */}
                <header className='h-20 bg-white/80 backdrop-blur-md border-b border-slate-200 flex items-center justify-between px-4 sm:px-6 lg:px-8 shadow-sm'>

                    <button
                        className='md:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-100 transition-colors'
                        onClick={() => setMobileMenuOpen(true)}
                    >
                    </button>
                    <div className='flex flex-col'>
                        <h1 className='text-2xl font-bold text-slate-800 tracking-tight'>
                            {title}
                        </h1>

                        <p className='text-sm text-slate-500 hidden sm:block'>
                            Manage and automate your social media presence
                        </p>
                    </div>
                </header>
                <main className='flex overflow-auto p-4 sm:p-6 md:p-8 xl:p-12'>
                    <Outlet />
                </main>

            </div>

        </div>
    )
}

export default Layout