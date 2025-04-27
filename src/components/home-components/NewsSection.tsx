"use client";

import { Col, Row } from 'antd';


function NewsSection() {

  return (
    <section className="animate__animated animate__bounce pt-4 pb-[60px] xl:pt-10 xl:pb-[60px] bg-homemb-bg1 xl:bg-home-bg1 bg-cover bg-bottom relative z-10 overflow-hidden">
      <div className="container px-4 mx-auto tlpc:max-w-[375px] 2xl:max-w-[1200px] 2xl:scale-95">
        <h2 
                  data-aos="fade-up" 
                
          className="text-[26px] leading-none xl:text-[52px] xl:leading-normal text-utmgodswordbold text-black xl:mb-[50px] mb-[36px] text-center uppercase aos-init aos-animate title-bolder"
        >
          Bản tin lữ khách
        </h2>

        
         <div style={{ padding: '24px', maxWidth: '1200px', margin: '0 auto' }}>

     <Row justify="center" style={{ marginBottom: '24px' }}>
        <Col span={24}>
<p className="font-bold text-black text-xl text-left title-bolder">TIN TỨC &amp; SỰ KIỆN</p>
        </Col>
    </Row>

      <Row gutter={[24, 24]}>
        {/* Cột tin tức chính */}
        <Col xs={24} md={16}>
          {/* Tin nổi bật */}
          <Row gutter={[10, 16]}>
                              <Col span={24}>
                                  <Row gutter={[16, 16]}>
                                      <Col span={12}>
                                  <div 
             className='nk-post'
                                          >
                  <img src={"https://thienlongsro.com//storage/web/images/1739704512.png"} alt="12" className='nk-post-poster'  />                    
                <h2 className="nk-post-title">[CỘNG ĐỒNG]  VINH DANH CÁC CHIẾN THẦN ĐẤU TRƯỜNG SINH TỬ MÙA 20 SRO VTC </h2>
               <div className="nk-post-date mt-3 mb-3">
                            Đã Đăng 24-02-2025
               </div>
                                    </div>
                                      </Col>
                                       <Col span={12}>
                                  <div 
             className='nk-post'
                                          >
                  <img src={"https://thienlongsro.com//storage/web/images/1739704512.png"} alt="12" className='nk-post-poster'  />                    
                <h2 className="nk-post-title">[CỘNG ĐỒNG]  VINH DANH CÁC CHIẾN THẦN ĐẤU TRƯỜNG SINH TỬ MÙA 20 SRO VTC </h2>
               <div className="nk-post-date mt-3 mb-3">
                            Đã Đăng 24-02-2025
               </div>
                                    </div>
                                      </Col>
                                      
                                  </Row>
                                 
                                  <Row gutter={[16, 16]}>
                                      <Col span={12}>
                                  <div 
             className='nk-post'
                                          >
                  <img src={"https://thienlongsro.com//storage/web/images/1739704512.png"} alt="12" className='nk-post-poster'  />                    
                <h2 className="nk-post-title">[CỘNG ĐỒNG]  VINH DANH CÁC CHIẾN THẦN ĐẤU TRƯỜNG SINH TỬ MÙA 20 SRO VTC </h2>
               <div className="nk-post-date mt-3 mb-3">
                            Đã Đăng 24-02-2025
               </div>
                                    </div>
                                      </Col>
                                       <Col span={12}>
                                  <div 
             className='nk-post'
                                          >
                  <img src={"https://thienlongsro.com//storage/web/images/1739704512.png"} alt="12" className='nk-post-poster'  />                    
                <h2 className="nk-post-title">[CỘNG ĐỒNG]  VINH DANH CÁC CHIẾN THẦN ĐẤU TRƯỜNG SINH TỬ MÙA 20 SRO VTC </h2>
               <div className="nk-post-date mt-3 mb-3">
                            Đã Đăng 24-02-2025
               </div>
                                    </div>
                                      </Col>
                                      
                                  </Row>
              
            </Col>
          </Row>

         
        </Col>

        {/* Sidebar */}
        <Col xs={24} md={8}>
            

       
        </Col>
      </Row>
    </div>
       
      </div>
    </section>
  );
}

export default NewsSection;