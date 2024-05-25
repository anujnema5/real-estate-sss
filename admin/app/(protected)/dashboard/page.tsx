
import Section from '@/components/section'
import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import DashboardProvider from '@/app/providers/dashboard-provider'

const page = () => {
	return (
		<DashboardProvider>
			<h2 className='text-3xl font-semibold dark:text-white text-black'>Hi, Welcome back 👋</h2>
			<div className="w-full h-full my-5 text-black dark:text-white">SECTION TODO</div>

			<Tabs defaultValue="account" className="">
				<TabsList>
					<TabsTrigger value="account">Graph</TabsTrigger>
					<TabsTrigger value="password">Something else</TabsTrigger>
				</TabsList>
				{/* <TabsContent value="account">Make changes to your account here.</TabsContent>
				<TabsContent value="password">Change your password here.</TabsContent> */}
			</Tabs>
		</DashboardProvider>
	)
}

export default page;