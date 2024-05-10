import { InstagramLogoIcon } from "@radix-ui/react-icons";
import HomeIcon from '@/assets/Icons/HomeIcon'
import CategoryIcon from '@/assets/Icons/CategoryIcon'
import OfferIconMuted from '@/assets/Icons/OfferIconMuted'
import WhatsappIcon from '@/assets/Icons/WhatsappIcon'
import CartIcon from '@/assets/Icons/CartIcon'


export interface Link {
    title: string;
    href: string;
}

export interface LinkedFooterPages {
    title: string;
    links: Link[];
}

export interface TFooterSocialLinks {
    Icon: any,
    href: string
}

export interface TMobileFooterLinks {
    title: string,
    href: string,
    Icon: React.FC
}

export const footerPageLinks: LinkedFooterPages[] = [
    {
        title: 'COMPANY',
        links: [
            { title: 'About us', href: '/' },
            { title: 'Terms & Conditions', href: '/' },
            { title: 'Privacy Policy', href: '/' },
            { title: 'FAQs', href: '/' },
            { title: 'Franchise', href: '/' },
        ]
    },

    {
        title: 'SERVICES WE PROVIDE',
        links: [
            { title: 'Waxing', href: '/' },
            { title: 'Skin/Face', href: '/' },
            { title: 'Pedi-Mani', href: '/' },
            { title: 'Massage', href: '/' },
            { title: 'Pre Bridal', href: '/' },
        ]
    },

    {
        title: 'CONTACT US',
        links: [
            { title: 'Email id - hi@getlook.in', href: '/' },
            { title: 'Contact Number - 8884877662', href: '/' }
        ]
    }
]

export const cities = []

export const footerSocialLinks: TFooterSocialLinks[] = [
    { Icon: InstagramLogoIcon, href: '/' },
    { Icon: InstagramLogoIcon, href: '/' },
    { Icon: InstagramLogoIcon, href: '/' },
]

export const mobileFooterLinks: TMobileFooterLinks[] = [
    { title: 'Home', href: '/', Icon: HomeIcon },
    { title: 'Categories', href: '/', Icon: CategoryIcon },
    { title: 'Offers', href: '/', Icon: OfferIconMuted },
    { title: 'Whatsapp', href: '/', Icon: WhatsappIcon },
    { title: 'Cart', href: '/', Icon: CartIcon },
]