import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import styles from './GalleryCaroussel.module.css'
import type React from 'react'

type CustomArrowProps = {
  className?: string
  style?: React.CSSProperties
  onClick?: () => void
}

function CustomArrow({
  className,
  style,
  onClick,
}: CustomArrowProps) {
  return (
    <div
      className={className}
      style={{
        ...style,
        display: 'block',
        background: '#111',
        borderRadius: '50%',
        width: '20px',
        height: '20px',
        padding: '10px',
        zIndex: '1',
        cursor: 'pointer',
        margin: '0 1rem',
      }}
      onClick={onClick}
    />
  )
}

export default function GalleryCaroussel() {
  const imagePaths = Array.from({ length: 10 }, (_, i) =>
    `/images/horses/others/image-${i + 1}.jpg`
  )

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    centerMode: true, // 🔥 this centers the current slides
    centerPadding: "3.5rem", // no extra spacing
    nextArrow: <CustomArrow />,
    prevArrow: <CustomArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };



  return (
    <div className={styles['carousel-container']}>
      <Slider {...settings}>
        {imagePaths.map((src, idx) => (
          <div key={idx} className={styles['carousel-slide']}>
            <img src={src} alt={`Horse ${idx + 1}`} className={styles['carousel-image']} />
          </div>
        ))}
      </Slider>
    </div>
  )
}
