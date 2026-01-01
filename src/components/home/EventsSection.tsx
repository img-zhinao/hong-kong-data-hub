import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, MapPin, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';

const events = [
  {
    id: 1,
    title: '2025香港大数据产业博览会',
    date: '2025年3月15-17日',
    location: '香港会议展览中心',
    attendees: 5000,
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&h=400&fit=crop',
    status: '报名中',
  },
  {
    id: 2,
    title: '数据要素流通与治理高峰论坛',
    date: '2025年2月20日',
    location: '香港数码港',
    attendees: 500,
    image: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=600&h=400&fit=crop',
    status: '即将开始',
  },
  {
    id: 3,
    title: 'AI数据集标准化研讨会',
    date: '2025年1月28日',
    location: '线上直播',
    attendees: 2000,
    image: 'https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=600&h=400&fit=crop',
    status: '已结束',
  },
];

export function EventsSection() {
  return (
    <section className="py-12 bg-background">
      <div className="container">
        <div className="flex items-center justify-between mb-8">
          <h2 className="section-title">活动会议</h2>
          <Link to="/events">
            <Button variant="ghost" className="text-primary hover:text-primary/80">
              更多活动 <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {events.map((event, index) => (
            <Link
              key={event.id}
              to={`/events/${event.id}`}
              className="news-card group animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s`, opacity: 0, animationFillMode: 'forwards' }}
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/80 to-transparent" />
                <span className={`absolute top-3 right-3 px-3 py-1 text-xs font-medium rounded-full ${
                  event.status === '报名中' 
                    ? 'bg-green-500 text-white' 
                    : event.status === '即将开始'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground'
                }`}>
                  {event.status}
                </span>
                <div className="absolute bottom-3 left-3 right-3">
                  <h3 className="font-bold text-primary-foreground line-clamp-2">
                    {event.title}
                  </h3>
                </div>
              </div>
              
              <div className="p-4 space-y-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="w-4 h-4 text-primary" />
                  <span>{event.date}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="w-4 h-4 text-primary" />
                  <span>{event.location}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Users className="w-4 h-4 text-primary" />
                  <span>预计 {event.attendees.toLocaleString()} 人参与</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
