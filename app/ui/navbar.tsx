"use client";
import { Card } from "@/components/ui/card";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Home" },
  { href: "/npc", label: "NPC" },
  { href: "/location", label: "Location" },
  { href: "/spell", label: "Spell" },
];

const Navbar = () => {
  const pathname = usePathname();
  return (
    <Card className="bg-card py-3 px-5 border-0 flex items-center justify-between gap-6 rounded-2xl m-4">
      <ul className="hidden md:flex items-center gap-10 text-card-foreground">
        {links.map((link) => {
          return (
            <Link
              key={link.label}
              href={link.href}
              className={clsx(
                "flex h-[32px] grow items-center justify-center gap-4 rounded-md p-4 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-5",
                { "bg-sky-100 text-blue-600": pathname === link.href }
              )}
            >
              {link.label}
            </Link>
          );
        })}
      </ul>
    </Card>
  );
};

export default Navbar;
