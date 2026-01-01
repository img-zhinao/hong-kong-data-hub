import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const heroSlides = [
  {
    id: 1,
    tag: '重要政策',
    title: '香港数据要素市场化配置改革全面启动',
    description: '香港特区政府正式发布《数据要素市场化配置综合改革方案》，标志着香港数据交易市场进入全新发展阶段。',
    date: '2024-12-28',
    link: '/news/1',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&h=600&fit=crop',
  },
  {
    id: 2,
    tag: '行业动态',
    title: '2024香港大数据产业博览会圆满闭幕',
    description: '本届数博会吸引超过500家企业参展，达成数据交易意向金额突破50亿港元，创历史新高。',
    date: '2024-12-25',
    link: '/news/2',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&h=600&fit=crop',
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
    <section className="relative h-[400px] md:h-[500px] overflow-hidden bg-navy">
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
            <div className="absolute inset-0 bg-gradient-to-r from-navy/95 via-navy/80 to-navy/40" />
          </div>

          {/* Content */}
          <div className="container relative h-full flex items-center">
            <div className="max-w-2xl animate-slide-up">
              <span className="inline-block px-3 py-1 bg-primary text-primary-foreground text-sm font-medium rounded mb-4">
                {slide.tag}
              </span>
              <h2 className="text-2xl md:text-4xl font-bold text-primary-foreground mb-4 leading-tight">
                {slide.title}
              </h2>
              <p className="text-primary-foreground/80 text-base md:text-lg mb-6 line-clamp-2">
                {slide.description}
              </p>
              <div className="flex items-center gap-4">
                <Link to={slide.link}>
                  <Button variant="hero" size="lg">
                    阅读详情
                  </Button>
                </Link>
                <span className="text-primary-foreground/60 text-sm">
                  {slide.date}
                </span>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 text-primary-foreground transition-colors"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 text-primary-foreground transition-colors"
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
