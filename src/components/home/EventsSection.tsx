import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, MapPin, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useEvents } from '@/hooks/useEvents';
import { formatDate } from '@/lib/formatters';
import { Skeleton } from '@/components/ui/skeleton';

export function EventsSection() {
  const { data: events, isLoading } = useEvents({ limit: 3 });

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
          {isLoading ? (
            Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="news-card">
                <Skeleton className="h-48 w-full" />
                <div className="p-4 space-y-3">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-4 w-28" />
                </div>
              </div>
            ))
          ) : events && events.length > 0 ? (
            events.map((event, index) => (
              <Link
                key={event.id}
                to={`/events/${event.id}`}
                className="news-card group animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s`, opacity: 0, animationFillMode: 'forwards' }}
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={event.cover_image_url || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&h=400&fit=crop'}
                    alt={event.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/80 to-transparent" />
                  <span className={`absolute top-3 right-3 px-3 py-1 text-xs font-medium rounded-full ${
                    event.status === 'upcoming' 
                      ? 'bg-green-500 text-white' 
                      : event.status === 'ongoing'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground'
                  }`}>
                    {event.status_text || (event.status === 'upcoming' ? '报名中' : event.status === 'ongoing' ? '进行中' : '已结束')}
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
                    <span>{formatDate(event.event_date, 'yyyy年MM月dd日')}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="w-4 h-4 text-primary" />
                    <span>{event.location || '待定'}</span>
                  </div>
                  {event.attendees_count && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Users className="w-4 h-4 text-primary" />
                      <span>预计 {event.attendees_count.toLocaleString()} 人参与</span>
                    </div>
                  )}
                </div>
              </Link>
            ))
          ) : (
            <div className="col-span-3 text-center py-8 text-muted-foreground">暂无活动</div>
          )}
        </div>
      </div>
    </section>
  );
}
