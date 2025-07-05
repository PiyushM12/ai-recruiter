"use client"
import { Button } from "@/components/ui/button"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { SideBarOptions } from "@/services/Constant"
import { Plus } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"

export function AppSidebar() {
    const path= usePathname();
    console.log(path);
  return (
    <Sidebar>
      <SidebarHeader className="flex items-center mt-5">
        <Image src={'/logo.png'} alt="logo" width={200} height={100} />
        <Button className="w-full mt-5">
            <Plus/> Create new Interview
        </Button>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
            <SidebarContent>
                <SidebarMenu>
                    {SideBarOptions.map((option,index)=>(
                        <SidebarMenuItem key={index}>
                            <SidebarMenuButton  className={`p-5 ${path == option.path&& 'bg-blue-50'} `} asChild>
                                <Link className={` ${path==option.path && 'text-primary'}`} href={option.path}>
                                <option.icon/>
                                <span className={`text-[16px] ${path==option.path && 'text-primary'}`}>
                                    {option.name}
                                </span>
                                </Link>
                                

                            </SidebarMenuButton>

                        </SidebarMenuItem>
                    ))}
                </SidebarMenu>
            </SidebarContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  )
}