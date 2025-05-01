import { Col, Row } from 'antd';
import Image from 'next/image';
import Link from 'next/link';

const AchiveMent = () => {
  return (
    <Row gutter={[30,30]} >
      {/* External link - using Link with <a> for external URL */}
          <Col span={6}>
            <Link href="https://d.wanyouxi7.com/37/gamebox/37wanty/cyhj/37gamebox-55cd24.exe" passHref>
                  <Image
                    src="/img/f-1_fb5e536 (1).png" // Replace with your image URL
                    alt="Game Character"
                    className="opacity-80"
                    width={300}
                    height={300}
                  />
            </Link>
          </Col>
          
    <Col span={6}>
            <Link href="https://d.wanyouxi7.com/37/gamebox/37wanty/cyhj/37gamebox-55cd24.exe" passHref>
                  <Image
                    src="/img/f-1_fb5e536 (1).png" // Replace with your image URL
                    alt="Game Character"
                      className="opacity-80"
                         width={300}
                    height={300}
                  />
            </Link>
          </Col>

           <Col span={6}>
            <Link href="https://d.wanyouxi7.com/37/gamebox/37wanty/cyhj/37gamebox-55cd24.exe" passHref>
                  <Image
                    src="/img/f-1_fb5e536 (1).png" // Replace with your image URL
                    alt="Game Character"
                      className="opacity-80"
                         width={300}
                    height={300}
                  />
            </Link>
          </Col>
 <Col span={6}>
            <Link href="https://d.wanyouxi7.com/37/gamebox/37wanty/cyhj/37gamebox-55cd24.exe" passHref>
                  <Image
                    src="/img/f-1_fb5e536 (1).png" // Replace with your image URL
                    alt="Game Character"
                      className="opacity-80"
                         width={300}
                    height={300}
                  />
            </Link>
          </Col>
    </Row>
  );
};

export default AchiveMent;