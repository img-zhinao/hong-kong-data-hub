import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const heroSlides = [
  {
    id: 1,
    tag: '重磅上线',
    title: 'Token 流转市场正式上线 · 数据出海 × 大模型入境',
    description: '香港大数据交易所 Token Hub 依托香港国际数据自由港优势，为中小企业打通双向 Token 流转通道：内地数据资产合规出海，OpenAI / Claude / Gemini 等国际领先大模型经港合规入境，统一 OpenAI 兼容 API、多币种结算。',
    date: '2026-04-28',
    link: '/token-hub',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&h=600&fit=crop',
  },
  {
    id: 3,
    tag: '生态建设',
    title: '首批100家数商正式入驻香港大数据交易所',
    description: '涵盖金融、医疗、物流、制造等多个行业领域，数据产品超过2000款，交易生态初步形成。',
    date: '2024-12-20',
    link: '/news/3',
    image: 'https://images.unsplash.com/photo-1504384764586-bb4cdc1707b0?w=1200&h=600&fit=crop',
  },
  {
    id: 4,
    tag: 'OpenClaw 挂牌',
    title: '欢迎 Mac Mini OpenClaw 龙虾来交易所挂牌',
    description: '您有训练好的 AI 数字员工军团？来香港大数据交易所挂牌交易，获得 Polygon 链上存证、合规认证与全球买家市场。',
    date: '2025-01-15',
    link: '/openclaw',
    image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=1200&h=600&fit=crop',
  },
];

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  return (
    <section className="relative h-[360px] sm:h-[420px] md:h-[500px] overflow-hidden bg-navy">
      {/* Slides */}
      {heroSlides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-700 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {/* Background Image */}
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${slide.image})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-navy/95 via-navy/85 to-navy/50" />
          </div>

          {/* Content */}
          <div className="container relative h-full flex items-center">
            <div className="max-w-2xl animate-slide-up">
              <span className="inline-block px-2.5 py-1 bg-primary text-primary-foreground text-xs sm:text-sm font-medium rounded mb-3 sm:mb-4">
                {slide.tag}
              </span>
              <h2 className="text-xl sm:text-2xl md:text-4xl font-bold text-primary-foreground mb-3 sm:mb-4 leading-tight">
                {slide.title}
              </h2>
              <p className="text-primary-foreground/80 text-sm sm:text-base md:text-lg mb-5 sm:mb-6 line-clamp-3">
                {slide.description}
              </p>
              <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
                <Link to={slide.link}>
                  <Button variant="hero" size="lg" className="w-full sm:w-auto">
                    阅读详情
                  </Button>
                </Link>
                <span className="text-primary-foreground/60 text-xs sm:text-sm">
                  {slide.date}
                </span>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows - hidden on mobile */}
      <button
        onClick={prevSlide}
        className="hidden sm:block absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 text-primary-foreground transition-colors"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={nextSlide}
        className="hidden sm:block absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 text-primary-foreground transition-colors"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? 'w-8 bg-primary'
                : 'bg-primary-foreground/40 hover:bg-primary-foreground/60'
            }`}
          />
        ))}
      </div>
    </section>
  );
}
