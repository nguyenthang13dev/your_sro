import Image from "next/image";
import Link from "next/link";

export function MainNavigation() {
  const navItems = [
    { name: "TRANG CHỦ", href: "/" },
    { name: "NẠP tiền", href: "/nap-the" },
    { name: "MINIGAME", href: "/minigame" },
    { name: "ZALO", href: "https://zalo.me/g/ybvunx631" },
    { name: "NHÓM FB", href: "https://zalo.me/g/ybvunx631" },
    { name: "Đăng ký", href: "/auth/register" },
    { name: "Đăng nhập", href: "/auth/login" },
  ];

  return (
    <nav className="py-4 px-4 container header-container">
      <div className="container mx-auto px-4">
        {/* Icon  */}
        <ul className="flex flex-wrap justify-between md:justify-around items-center navbar align-items-center">
         
          <li>
             <Image 
              src="/img/avatars/sroiconpng.png"
              alt="SRO Icon"
              width={120}
              height={80}
              className="object-contain"
            />
           </li>
         
          {navItems.map( ( item ) => (
            <li  key={item.name}>
              <Link
                href={item.href}
                className="text-amber-500 hover:text-amber-300 transition-colors  py-2 text-sm md:text-base font-medium relative
                 group
                 nav-link
                  uppercase
                 "
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-amber-500 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}