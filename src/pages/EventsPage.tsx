import { Layout } from '@/components/layout/Layout';
import { Calendar, MapPin, Users, CalendarDays, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useEvents, type Event } from '@/hooks/useEvents';
import { formatDate } from '@/lib/formatters';
import { Skeleton } from '@/components/ui/skeleton';

export default function EventsPage() {
  const { data: upcomingEvents, isLoading: loadingUpcoming } = useEvents({ status: 'upcoming' });
  const { data: pastEvents, isLoading: loadingPast } = useEvents({ status: 'past' });

  return (
    <Layout>
      {/* Page Header */}
      <div className="bg-gradient-hero py-12">
        <div className="container">
          <div className="flex items-center gap-3 mb-4">
            <CalendarDays className="w-8 h-8 text-primary" />
            <h1 className="text-3xl font-bold text-primary-foreground">活动会议</h1>
          </div>
          <p className="text-primary-foreground/70 max-w-2xl">
            数博会、行业峰会、培训讲座等精彩活动，助您把握行业脉搏
          </p>
        </div>
      </div>

      <div className="container py-8">
        <Tabs defaultValue="upcoming" className="space-y-6">
          <TabsList>
            <TabsTrigger value="upcoming">即将开始 ({upcomingEvents?.length || 0})</TabsTrigger>
            <TabsTrigger value="past">往期活动 ({pastEvents?.length || 0})</TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming">
            <div className="space-y-6">
              {loadingUpcoming ? (
                Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="news-card flex flex-col md:flex-row overflow-hidden">
                    <Skeleton className="md:w-80 h-48 md:h-auto" />
                    <div className="flex-1 p-6 space-y-3">
                      <Skeleton className="h-6 w-3/4" />
                      <Skeleton className="h-4 w-full" />
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-4 w-20" />
                        <Skeleton className="h-4 w-28" />
                        <Skeleton className="h-4 w-24" />
                      </div>
                    </div>
                  </div>
                ))
              ) : upcomingEvents && upcomingEvents.length > 0 ? (
                upcomingEvents.map((event, index) => (
                  <EventCard key={event.id} event={event} index={index} />
                ))
              ) : (
                <div className="text-center py-12 text-muted-foreground">
                  暂无即将开始的活动
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="past">
            <div className="space-y-6">
              {loadingPast ? (
                Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="news-card flex flex-col md:flex-row overflow-hidden">
                    <Skeleton className="md:w-80 h-48 md:h-auto" />
                    <div className="flex-1 p-6 space-y-3">
                      <Skeleton className="h-6 w-3/4" />
                      <Skeleton className="h-4 w-full" />
                    </div>
                  </div>
                ))
              ) : pastEvents && pastEvents.length > 0 ? (
                pastEvents.map((event, index) => (
                  <EventCard key={event.id} event={event} index={index} />
                ))
              ) : (
                <div className="text-center py-12 text-muted-foreground">
                  暂无往期活动
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}

interface EventCardProps {
  event: Event;
  index: number;
}

function EventCard({ event, index }: EventCardProps) {
  return (
    <Link
      to={`/events/${event.id}`}
      className="news-card flex flex-col md:flex-row overflow-hidden animate-fade-in"
      style={{ animationDelay: `${index * 0.1}s`, opacity: 0, animationFillMode: 'forwards' }}
    >
      <div className="relative md:w-80 h-48 md:h-auto flex-shrink-0">
        <img
          src={event.cover_image_url || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=400&fit=crop'}
          alt={event.title}
          className="w-full h-full object-cover"
        />
        <span className={`absolute top-3 left-3 px-3 py-1 text-xs font-medium rounded-full ${
          event.status === 'upcoming' 
            ? 'bg-green-500 text-white' 
            : 'bg-muted text-muted-foreground'
        }`}>
          {event.status_text || (event.status === 'upcoming' ? '报名中' : '已结束')}
        </span>
        {event.event_type && (
          <span className="absolute top-3 right-3 px-3 py-1 text-xs font-medium rounded-full bg-primary/90 text-primary-foreground">
            {event.event_type}
          </span>
        )}
      </div>
      
      <div className="flex-1 p-6">
        <h3 className="font-bold text-xl text-foreground hover:text-primary transition-colors mb-3">
          {event.title}
        </h3>
        <p className="text-muted-foreground mb-4 line-clamp-2">
          {event.details}
        </p>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Calendar className="w-4 h-4 text-primary" />
            <span>{formatDate(event.event_date, 'yyyy年MM月dd日')}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Clock className="w-4 h-4 text-primary" />
            <span>{formatDate(event.event_date, 'HH:mm')}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin className="w-4 h-4 text-primary" />
            <span>{event.location || '待定'}</span>
          </div>
          {event.attendees_count && (
            <div className="flex items-center gap-2 text-muted-foreground">
              <Users className="w-4 h-4 text-primary" />
              <span>预计 {event.attendees_count.toLocaleString()} 人</span>
            </div>
          )}
        </div>

        {event.status === 'upcoming' && (
          <div className="mt-4 pt-4 border-t">
            <Button variant="hero">立即报名</Button>
          </div>
        )}
      </div>
    </Link>
  );
}
