import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import styles from "./Banner.module.scss";
import "swiper/scss";
import "swiper/scss/navigation";
import "swiper/scss/pagination";

import ball from "../../../../assets/ball.jpg";
import football from "../../../../assets/football.jpg";
import world_cup from "../../../../assets/world_cup.jpg";

const images = [ball, football, world_cup];

export default function BannerSlider() {
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
