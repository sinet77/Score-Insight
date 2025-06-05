import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import styles from "./Banner.module.scss";
import "swiper/scss";
import "swiper/scss/navigation";
import "swiper/scss/pagination";

import banner_Football_stats from "../../../../assets/banner_Football_stats.jpg";
import banner_h2h from "../../../../assets/banner_h2h.jpg";
import banner_Football_news from "../../../../assets/banner_Football_news.png";
import banner_Score_Insight from "../../../../assets/banner_Score_Insight.jpg";
import banner_Team_profile from "../../../../assets/banner_Team_profile.jpg";
import banner_Player_profile from "../../../../assets/banner_Player_profile.jpg";
import mobileBanner from "../../../../assets/mobile_banner_Score_Insight.jpg"; 

const images = [
  banner_Score_Insight,
  banner_Football_stats,
  banner_Football_news,
  banner_Team_profile,
  banner_Player_profile,
  banner_h2h,
];

export default function BannerSlider() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  if (isMobile) {
    return (
      <div className={styles.bannerSlider}>
        <img
          src={mobileBanner}
          alt="Mobile Banner"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>
    );
  }

  return (
    <div className={styles.bannerSlider}>
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000 }}
        loop={true}
        style={{ width: "100%", height: "100%" }}
      >
        {images.map((img, index) => (
          <SwiperSlide key={index}>
            <img
              src={img}
              alt={`Slide ${index}`}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
