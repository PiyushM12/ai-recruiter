import { Calendar, LayoutDashboard, List, Settings, WalletCards } from "lucide-react";

export const SideBarOptions=[
    {
        name:'Dashboard',
        icon :LayoutDashboard,
        path:'/dashboard'
    },
    {
        name:'Scheduled Interviews',
        icon :Calendar,
        path:'/scheduled-interview'
    },
    {
        name:'All Interview',
        icon :List,
        path:'/all-interview'
    },
    {
        name:'Billing',
        icon :WalletCards,
        path:'/billing'
    },
    {
        name:'Setting',
        icon :Settings,
        path:'/settings'
    },
]