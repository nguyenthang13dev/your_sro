import { Col, Row } from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import AchiveMent from './AchiveMent';

const GameServerNotice = () => {
  const servers = [
    { name: 'Server 37 Red Flame Horn 208', date: '10:00 ngày 2..04-29' },
    { name: 'Server 37 Red Flame Horn 207', date: '10:00 ngày 2..04-28' },
    { name: 'Server 37 Red Flame Horn 206', date: '10:00 ngày 2..04-27' },
    { name: 'Server 37 Red Flame Horn 205', date: '10:00 ngày 2..04-26' },
    { name: 'Server 37 Red Flame Horn 204', date: '10:00 ngày 2..04-25' },
  ];

  return (
    <div className=" bg-gradient-to-r from-gray-900 to-gray-800 text-white rounded-lg shadow-lg overflow-hidden bg-img-news pd-news">
          {/* Phần hình ảnh bên trái */}
          
          <Row gutter={[10, 10]} className="mb-4">
              
              <Col span={12} className="relative">
                     <div className="relative img-h382">
        <Image
          src="/img/13113539NLCJj.png" // Thay bằng đường dẫn hình ảnh thực tế
          alt="Game Character"
          objectFit="cover"
                          className="opacity-80"
                          width={600}
                          height={382}
        />
        {/* <div className="absolute">
          <h1 className="text-4xl font-bold text-yellow-400 ">
            Thông báo tin tức mới nhất
          </h1>
        </div> */}
      </div>
              </Col>
            
              <Col span={12} className="relative">
              
                {/* Phần thông báo bên phải */}
      <div className="w-full  p-6 bg-gradient-to-b from-red-900 to-red-700 min-h382 bg-khung">
        {/* Tabs */}
        <div className="flex space-x-4 mb-4 border-b border-yellow-500">
          <button className="pb-2 text-yellow-400 border-b-2 border-yellow-400 font-semibold">
            toàn diện
          </button>
          <button className="pb-2 text-gray-300 hover:text-yellow-400">
            thông báo
          </button>
          <button className="pb-2 text-gray-300 hover:text-yellow-400">
            Hoạt động
          </button>
          <button className="pb-2 text-gray-300 hover:text-yellow-400">
            Chiến lược
          </button>
        </div>

        {/* Tiêu đề */}
        <h2 className="text-2xl font-bold mb-4 text-center">
          MÁY CHỦ 37 RED FLAME HORN 209 SẼ ĐƯỢC ...
        </h2>

        {/* Danh sách thông báo */}
        <ul className="space-y-2">
          {servers.map((server, index) => (
            <li key={index} className="text-sm">
              <span className="text-yellow-400">[Thông báo]</span> {server.name} sẽ ra mắt vào lúc {server.date}
            </li>
          ))}
        </ul>
      </div>
              
              </Col>
              
         </Row>
   
  {/* Main Action Buttons */}
              <div className="container flex justify-around items-center flex-row pd-20 ">
                {/* Section 1: Hướng dẫn nạp Silk */}
                <div className="relative block-item__banner bg-guide">
                  <Link href="/guide" className="game-button w-full md:w-auto bounce-text">
                    HƯỚNG DẪN NẠP SILK
                  </Link>
                </div>

                {/* Section 2: Lịch hoạt động sự kiện */}
                <div className="relative block-item__banner bg-schedule">
                  <Link href="/schedule" className="game-button w-full md:w-auto text-schedule text-glow bounce-text">
                    LỊCH HOẠT ĐỘNG SỰ KIỆN
                  </Link>
                </div>

                {/* Section 3: Cắm năng tần thù */}
                <div className="relative block-item__banner bg-energy">
                  <Link href="/energy" className="game-button w-full md:w-auto text-energy text-glow bounce-text">
                    CẮM NĂNG TẦN THÙ
                  </Link>
                </div>

                {/* Section 4: FAQ */}
                <div className="relative block-item__banner bg-faq">
                  <Link href="/faq" className="game-button w-full md:w-auto text-faq text-glow bounce-text">
                    FAQ
                  </Link>
                </div>
              </div>
          


          {/* Achive ment */}


              <div className="container flex justify-around items-center flex-row ">
                <AchiveMent />
          </div>
    </div>
  );
};

export default GameServerNotice;