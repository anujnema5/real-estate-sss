import OfferIcon from "@/assets/Icons/OfferIcon";
import { Icons } from "@/components/icons";
import { WalletIcon } from "@heroicons/react/24/outline";
import { GiftIcon, UserIcon } from "@heroicons/react/24/solid";
import { PersonIcon } from "@radix-ui/react-icons";
import { BadgeCheck, BadgeIndianRupee, BadgeInfo, BookOpenCheck, Gift, Headset, LucideWallet, NotebookText, NotepadText, PersonStanding, Power, User, User2Icon, UserRound, Wallet, Wallet2Icon, WalletCards, WalletCardsIcon } from "lucide-react";

export const userProfileMenuLinks = [
    {title: "View Profile", href: '/view-profile', icon: UserRound},
    {title: "offers & Deals", href: '/offers-deals', icon: BadgeIndianRupee},
    {title: "Refer & Earn", href: '/refer-and-earn', icon: Gift},
    {title: "Subscription", href: '/subscription', icon: Wallet},
    
]

export const userProfileOptions = [
    {title: "Bookings & Orders", href: '/view-profile', icon: BadgeCheck},
    {title: "Address Book", href: '/view-profile', icon: NotebookText   },
    {title: "Subscription", href: '/view-profile', icon: WalletCards},
    {title: "About", href: '/view-profile', icon: BadgeInfo},
    {title: "Terms and Services", href: '/view-profile', icon: NotepadText},
    {title: "Privacy Policy", href: '/view-profile', icon: BookOpenCheck},
    {title: "FAQs", href: '/view-profile', icon: UserIcon},
    {title: "Contact Us", href: '/view-profile', icon: Headset},
    {title: "Logout", href: '/view-profile', icon: Power},

]