import { authService } from "@/services/auth/auth.service";
import { setLogout } from "@/store/auth/AuthSlice";
import { useDispatch } from "@/store/hooks";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export function MainNavigation() {
  const [token, setToken] = useState<string | null>("");
  const [userInfo, setUserInfo] = useState<any>();
  const dispatch = useDispatch();
  const navItems = [
    { name: "TRANG CHỦ", href: "/" },
    {
      name: "Tải game",
      href: "https://drive.google.com/file/d/1Po1aAKCeAuwylm88dO0iX5R_khYjv3a4/view?pli=1",
    },
    { name: "Mua silk", href: "/payment" },
    { name: "GiftCode", href: "/ThongTinGiftCode" },
    { name: "MINIGAME", href: "/minigame" },
    { name: "ZALO", href: "https://zalo.me/g/ybvunx631" },
    { name: "NHÓM FB", href: "https://www.facebook.com/share/1DPmy4eGsv" },
    { name: "Đăng ký", href: "/auth/register" },
    { name: "Đăng nhập", href: "/auth/login" },
  ];

    const [isDropdownOpen, setIsDropdownOpen] = useState(false)

    const handleSignOut = () => {
      dispatch( setLogout() );
       window.location.reload(); 
    };
  
  const handleGetUserInfo = async () => {
    try {
      const response = await authService.getInfo();
      if (response.status) {
        setUserInfo(response.data);
      }
      console.log(response);
    } catch (err) {}
  };

  useEffect(() => {
    const accessToken = localStorage.getItem("AccessToken");
    setToken(accessToken);
    if (accessToken) {
      handleGetUserInfo();
    }
  }, []);

  return (
    <nav className="py-4 px-4 header-container">
      <div className=" mx-auto px-4">
        {/* Icon  */}
        <ul className="flex flex-wrap justify-between md:justify-around items-center navbar align-items-center">
          <li>
            <Image
              src="/img/avatars/logo.png"
              alt="SRO Icon"
              width={80}
              height={85}
              style={{ marginLeft: "25px" }}
              className="object-contain main-logo"
            />
            {/* <a className="main-logo"></a> */}
          </li>

          {token ? (
            <>
              {navItems
                .filter(
                  (item) => item.name !== "Đăng ký" && item.name !== "Đăng nhập"
                )
                .map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-amber-500 hover:text-amber-300 transition-colors py-2 text-sm md:text-base font-medium relative group nav-link uppercase"
                    >
                      {item.name}
                      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-amber-500 transition-all duration-300 group-hover:w-full"></span>
                    </Link>
                  </li>
                ))}
           <li
            className="relative"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <div className="text-amber-500 py-2 text-sm md:text-base font-medium uppercase flex items-center cursor-pointer hover:text-amber-300 transition-colors">
              Xin chào, {userInfo?.userName}
              <ChevronDown className="ml-1 h-4 w-4" />
            </div>

            {isDropdownOpen && (
              <div className="absolute right-0 mt-1 w-48 rounded-md shadow-lg py-1 z-10 border bg-white border-gray-200">
                <Link
                  href="/dashboard"
                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-amber-50 hover:text-amber-500"
                >
                  Trang quản trị
                </Link>
                    <li
                      onClick={() =>
                      {
                        console.log(1);
                        
                       handleSignOut()
                      }}  
                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-amber-50 hover:text-amber-500"
                >
                  Đăng xuất
                </li>
              </div>
            )}
          </li>
            </>
          ) : (
            navItems.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className="text-amber-500 hover:text-amber-300 transition-colors py-2 text-sm md:text-base font-medium relative group nav-link uppercase"
                >
                  {item.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-amber-500 transition-all duration-300 group-hover:w-full "></span>
                </Link>
              </li>
            ))
          )}
        </ul>
      </div>
    </nav>
  );
}
