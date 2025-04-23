import Link from "next/link"

export function MainNavigation() {
  const navItems = [
    { name: "TRANG CHỦ", href: "/" },
    { name: "NẠP THẺ", href: "/nap-the" },
    { name: "FANPAGE", href: "/fanpage" },
    { name: "MINIGAME", href: "/minigame" },
    { name: "ZALO", href: "/zalo" },
    { name: "NHÓM FB", href: "/nhom-fb" },
    { name: "THÔNG TIN", href: "/thong-tin" },
  ]

  return (
    <nav className="bg-black/60 border-b border-amber-900/50 py-4">
      <div className="container mx-auto px-4">
        <ul className="flex flex-wrap justify-center gap-2 md:gap-8">
          {navItems.map((item) => (
            <li key={item.name}>
              <Link
                href={item.href}
                className="text-amber-500 hover:text-amber-300 transition-colors px-3 py-2 text-sm md:text-base font-medium relative group"
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-amber-500 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}
