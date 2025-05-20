
import {Separator} from "@/components/ui/separator"
import Link from "next/link"
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu";
import RightNavContent from "@/components/nav/rightnavcontent";

const navItems: { title: string; href: string;}[] = [
    { title: "Home", href: "/home" },
    { title: "Dashboard", href: "/" },
    { title: "About", href: "/about" },
    { title: "Contact Us", href: "/contact" },
    // { title: "Services", href: "/services" },
]

export default function Navbar() {

    return (
        <header className="w-full bg-background border-b h-16">
            <div className="flex justify-between items-center h-16 px-4">
                {/* Left: Brand + Links */}
                <div className="flex items-center space-x-6">
                    <Link href="/" className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                        Invoice Me
                    </Link>
                    <NavigationMenu>
                        <NavigationMenuList>
                            {navItems.map((item) => (
                                <NavigationMenuItem key={item.title}>
                                    <Link href={item.href}>
                                        <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                            {item.title}
                                        </NavigationMenuLink>
                                    </Link>
                                </NavigationMenuItem>
                            ))}
                        </NavigationMenuList>
                    </NavigationMenu>

                </div>

                {/* Right: Auth buttons */}
                <RightNavContent/>
            </div>
            <Separator/>
        </header>
    )
}
