import Image from "next/image";
import Link from "next/link";

export function MainNavigation() {
  const navItems = [
    { name: "TRANG CHỦ", href: "/" },
    {
      name: "Tải game",
      href: "https://drive.google.com/file/d/1Po1aAKCeAuwylm88dO0iX5R_khYjv3a4/view?pli=1",
    },
    { name: "NẠP tiền", href: "/payment" },
    { name: "MINIGAME", href: "/minigame" },
    { name: "ZALO", href: "https://zalo.me/g/ybvunx631" },
    { name: "NHÓM FB", href: "https://www.facebook.com/share/1DPmy4eGsv" },
    { name: "Đăng ký", href: "/auth/register" },
    { name: "Đăng nhập", href: "/auth/login" },
  ];

  return (
    <nav className="py-4 px-4 header-container">
      <div className=" mx-auto px-4">
        {/* Icon  */}
        <ul className="flex flex-wrap justify-between md:justify-around items-center navbar align-items-center">
          <li>
            <Image
              src="/img/avatars/logo.png"
              alt="SRO Icon"
              width={120}
              height={80}
              className="object-contain"
            />
            {/* <a className="main-logo"></a> */}
          </li>

          {navItems.map((item) => (
            <li key={item.name}>
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
