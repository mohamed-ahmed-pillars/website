'use client';

import React from 'react';
import {
	BotIcon,
	BoxesIcon,
	CloudIcon,
	CloudUploadIcon,
	CodeIcon,
	GlobeIcon,
	HardDriveIcon,
	HeadsetIcon,
	ServerIcon,
	ShoppingCartIcon,
	Users,
	Star,
	FileText,
	Shield,
	NewspaperIcon,
	Handshake,
	Leaf,
	HelpCircle,
	MenuIcon,
	XIcon,
} from 'lucide-react';
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetTrigger,
} from '@/components/ui/sheet';
import { Button, buttonVariants } from '@/components/ui/button';
import { TpLogo } from '@/components/logo';
import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuList,
	NavigationMenuItem,
	NavigationMenuTrigger,
	NavigationMenuLink,
	type NavItemType,
	NavGridCard,
	NavSmallItem,
	NavLargeItem,
	NavItemMobile,
} from '@/components/ui/navigation-menu';
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion';
import { cn } from '@/lib/utils';

export const productLinks: NavItemType[] = [
	{
		title: 'Cloud Pillar',
		href: '/under-construction',
		description: 'AWS, Azure, GCP, Huawei Cloud, and TP Public Cloud',
		icon: CloudIcon,
	},
	{
		title: 'ERP Pillar',
		href: '/under-construction',
		description: 'Odoo and TP POS implemented, customized, and supported',
		icon: BoxesIcon,
	},
	{
		title: 'Software Pillar',
		href: '/under-construction',
		description: 'Web apps, websites, and omni-channel customer service',
		icon: CodeIcon,
	},
	{
		title: 'Infrastructure Pillar',
		href: '/under-construction',
		description: 'On-premises, private cloud, and networking',
		icon: ServerIcon,
	},
	{
		title: 'AI Pillar',
		href: '/under-construction',
		description: 'AI agents and automation working on your data',
		icon: BotIcon,
	},
];

export const serviceLinks: NavItemType[] = [
	{
		title: 'TP Public Cloud',
		href: '/under-construction',
		icon: GlobeIcon,
	},
	{
		title: 'TP POS',
		href: '/under-construction',
		icon: ShoppingCartIcon,
	},
	{
		title: 'Managed Hosting',
		href: '/under-construction',
		icon: HardDriveIcon,
	},
	{
		title: 'Cloud Migration',
		href: '/under-construction',
		icon: CloudUploadIcon,
	},
	{
		title: '24/7 Support',
		href: '/under-construction',
		icon: HeadsetIcon,
	},
];

export const companyLinks: NavItemType[] = [
	{
		title: 'About Us',
		href: '/under-construction',
		description: 'Learn more about our story and team',
		icon: Users,
	},
	{
		title: 'Customer Stories',
		href: '/under-construction',
		description: 'See how we’ve helped our clients succeed',
		icon: Star,
	},
	{
		title: 'Terms of Service',
		href: '/under-construction',
		description: 'Understand how we operate',
		icon: FileText,
	},
	{
		title: 'Privacy Policy',
		href: '/under-construction',
		description: 'How we protect your information',
		icon: Shield,
	},
	{
		title: 'News',
		href: '/under-construction',
		description: 'Announcements, partnerships, and updates',
		icon: NewspaperIcon,
	},
	{
		title: 'Partnerships',
		href: '/under-construction',
		icon: Handshake,
		description: 'Collaborate with us for mutual growth',
	},
	{
		title: 'Blog',
		href: '/under-construction',
		icon: Leaf,
		description: 'Insights, tutorials, and company news',
	},
	{
		title: 'Help Center',
		href: '/under-construction',
		icon: HelpCircle,
		description: 'Find answers to your questions',
	},
];

export function SiteHeader() {
	const [menuOpen, setMenuOpen] = React.useState(false);

	return (
		<>
			{/* Dims and blurs the page while a desktop menu is open. Sibling of the
			    header (not portaled): it must share the header's stacking context so
			    the header and menu panel paint above it. */}
			<div
				aria-hidden
				className={cn(
					'bg-background/60 pointer-events-none fixed inset-0 z-40 backdrop-blur-xl transition-opacity ease-in-out',
					menuOpen ? 'opacity-100 duration-300' : 'opacity-0 duration-150',
				)}
			/>
			<header
				className={cn(
					'sticky top-0 z-50 h-14 w-full px-6 transition-colors ease-in-out lg:px-[min(576px,calc((100vw-800px)/2))]',
					menuOpen ? 'bg-background duration-300' : 'bg-transparent duration-150',
				)}
			>
				{/* Progressive glass: the blur extends past the bar and fades out via a
				    gradient mask, so content blends under the bar with no hard edge. */}
				<div
					aria-hidden
					className={cn(
						'pointer-events-none absolute inset-x-0 top-0 -z-10 h-[150%] backdrop-blur-md transition-opacity ease-in-out [mask-image:linear-gradient(to_bottom,black_66%,transparent)]',
						menuOpen ? 'opacity-0 duration-300' : 'opacity-100 duration-150',
					)}
				/>
				<div className="flex h-full items-center justify-between">
					<div className="flex items-center gap-2">
						<TpLogo className="size-6" />
						<p className="font-mono text-lg font-bold whitespace-nowrap">
						Technology Pillars
					</p>
					</div>

					<div className="flex items-center gap-6">
						<DesktopMenu onOpenChange={setMenuOpen} />
						<div className="flex items-center gap-2">
							<a
								href="https://wa.me/201101040838"
								target="_blank"
								rel="noreferrer"
								className={cn(
									buttonVariants({ variant: 'stripes' }),
									'hidden font-mono text-xs font-bold uppercase tracking-wider sm:inline-flex',
								)}
							>
								Get Started
							</a>
							<MobileNav />
						</div>
					</div>
				</div>
			</header>
		</>
	);
}

function DesktopMenu({
	onOpenChange,
}: {
	onOpenChange: (open: boolean) => void;
}) {
	return (
		<NavigationMenu
			className="hidden lg:block"
			onValueChange={(value) => onOpenChange(Boolean(value))}
		>
			<NavigationMenuList>
				<NavigationMenuItem>
					<NavigationMenuTrigger>Services</NavigationMenuTrigger>
					<NavigationMenuContent>
						<div className="mx-auto grid w-full max-w-full md:w-[1345px] md:grid-cols-[1fr_207px]">
							<ul className="grid grow gap-4 p-4 md:grid-cols-5 md:border-r">
								{productLinks.map((link) => (
									<li key={link.title} className="h-full">
										<NavGridCard link={link} className="min-h-52" />
									</li>
								))}
							</ul>
							<ul className="space-y-1 p-4">
								{serviceLinks.map((link) => (
									<li key={link.title}>
										<NavSmallItem
											item={link}
											href={link.href}
											className="gap-x-1"
										/>
									</li>
								))}
							</ul>
						</div>
					</NavigationMenuContent>
				</NavigationMenuItem>
				<NavigationMenuItem>
					<NavigationMenuTrigger>Company</NavigationMenuTrigger>
					<NavigationMenuContent>
						<div className="mx-auto grid w-full md:w-4xl md:grid-cols-[1fr_.40fr]">
							<ul className="grid grow grid-cols-2 gap-4 p-4 md:border-r">
								{companyLinks.slice(0, 2).map((link) => (
									<li key={link.title}>
										<NavGridCard link={link} className="min-h-36" />
									</li>
								))}
								<div className="col-span-2 grid grid-cols-3 gap-x-4">
									{companyLinks.slice(2, 5).map((link) => (
										<li key={link.title}>
											<NavLargeItem href={link.href} link={link} />
										</li>
									))}
								</div>
							</ul>
							<ul className="space-y-2 p-4">
								{companyLinks.slice(5, 10).map((link) => (
									<li key={link.title}>
										<NavLargeItem href={link.href} link={link} />
									</li>
								))}
							</ul>
						</div>
					</NavigationMenuContent>
				</NavigationMenuItem>
				<NavigationMenuItem>
					<NavigationMenuLink
						href="/under-construction"
						className="cursor-pointer"
					>
						Pricing
					</NavigationMenuLink>
				</NavigationMenuItem>
			</NavigationMenuList>
		</NavigationMenu>
	);
}

function MobileNav() {
	const sections = [
		{
			id: 'product',
			name: 'Services',
			list: productLinks,
		},
		{
			id: 'company',
			name: 'Company',
			list: companyLinks,
		},
	];

	return (
		<Sheet>
			<SheetTrigger asChild>
				<Button size="icon" variant="ghost" className="rounded-full lg:hidden">
					<MenuIcon className="size-5" />
					<span className="sr-only">Open menu</span>
				</Button>
			</SheetTrigger>
			<SheetContent
				className="bg-background/95 supports-[backdrop-filter]:bg-background/80 w-full gap-0 backdrop-blur-lg"
				showClose={false}
			>
				<div className="flex h-14 items-center justify-end border-b px-4">
					<SheetClose asChild>
						<Button size="icon" variant="ghost" className="rounded-full">
							<XIcon className="size-5" />
							<span className="sr-only">Close</span>
						</Button>
					</SheetClose>
				</div>
				<div className="container grid gap-y-2 overflow-y-auto px-4 pt-5 pb-12">
					<Accordion type="single" collapsible>
						{sections.map((section) => (
							<AccordionItem key={section.id} value={section.id}>
								<AccordionTrigger className="capitalize hover:no-underline">
									{section.id}
								</AccordionTrigger>
								<AccordionContent className="space-y-1">
									<ul className="grid gap-1">
										{section.list.map((link) => (
											<li key={link.title}>
												<SheetClose asChild>
													<NavItemMobile item={link} href={link.href} />
												</SheetClose>
											</li>
										))}
									</ul>
								</AccordionContent>
							</AccordionItem>
						))}
					</Accordion>
				</div>
			</SheetContent>
		</Sheet>
	);
}
