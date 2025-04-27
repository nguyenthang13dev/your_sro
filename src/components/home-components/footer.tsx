// components/Footer.tsx

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      

      <div className="footer py-8">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Links Column 1 */}
            <div>
             <div>
  <ul className="list-none space-y-2 text-right">
    <li>
      <a 
        href="/" 
        className="text-gray-400 hover:text-amber-500 text-lg font-medium transition-colors duration-200 hover:underline underline-offset-4"
      >
        Trang chủ
      </a>
    </li>
    <li>
      <a
        href="https://thienlongsro.com/register"
        className="text-gray-400 hover:text-amber-500 text-lg font-medium transition-colors duration-200 hover:underline underline-offset-4"
      >
        Đăng ký
      </a>
    </li>
    <li>
      <a
        href="https://thienlongsro.com/login"
        className="text-gray-400 hover:text-amber-500 text-lg font-medium transition-colors duration-200 hover:underline underline-offset-4"
      >
        Đăng nhập
      </a>
    </li>
    <li>
      <a
        href="https://thienlongsro.com/ranking/charname"
        className="text-gray-400 hover:text-amber-500 text-lg font-medium transition-colors duration-200 hover:underline underline-offset-4"
      >
        Xếp hạng
      </a>
    </li>
  </ul>
</div>
            </div>

            {/* Logo Column */}
            <div className="text-center">
              <a href="/">
                <img
                  src="https://thienlongsro.com/themes/goodgames-theme/srovoz/images/logo.png"
                  alt="VSRO"
                  className="w-1/3 mx-auto"
                />
              </a>
            </div>

            {/* Social Links Column */}
            <div>
              <ul className="list-none text-left">
                <li>
                  <a
                    href="https://thienlongsro.com/downloads"
        className="text-gray-400 hover:text-amber-500 text-lg font-medium transition-colors duration-200 hover:underline underline-offset-4"
                  >
                    Tải game
                  </a>
                </li>
                <li>
                  <a
                    target="_blank"
                    href="https://www.facebook.com/profile.php?id=61573712690095"
        className="text-gray-400 hover:text-amber-500 text-lg font-medium transition-colors duration-200 hover:underline underline-offset-4"
                  >
                    Facebook
                  </a>
                </li>
                <li>
                  <a
                    target="_blank"
                    href="https://zalo.me/g/auqbkm333"
        className="text-gray-400 hover:text-amber-500 text-lg font-medium transition-colors duration-200 hover:underline underline-offset-4"
                  >
                    Zalo
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-copyright py-4 bg-gray-800">
        <div className="container mx-auto text-center">
          <p className="text-gray-400">
            Copyright © VSRO. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
