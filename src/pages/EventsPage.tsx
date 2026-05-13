import { Layout } from '@/components/layout/Layout';
import { Calendar, MapPin, Users, CalendarDays, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useEvents, type Event } from '@/hooks/useEvents';
import { formatDate } from '@/lib/formatters';
import { Skeleton } from '@/components/ui/skeleton';
import { SEO } from '@/components/SEO';
import { getResponsiveImage } from '@/lib/responsiveImage';

export default function EventsPage() {
  const { data: upcomingEvents, isLoading: loadingUpcoming } = useEvents({ status: 'upcoming' });
  const { data: pastEvents, isLoading: loadingPast } = useEvents({ status: 'past' });

  return (
    <Layout>
      <SEO
        title="活动会议"
        description="数博会、行业峰会、培训讲座等精彩活动，助您把握数据要素行业脉搏，与业内专家交流互动。"
        keywords="数据交易活动,行业峰会,数博会,数据要素论坛,培训讲座,数据交易大会"
        canonicalUrl="https://hkbde.fun/events"
        itemList={upcomingEvents?.slice(0, 20).map((e, i) => ({
          name: e.title,
          url: `/events/${e.id}`,
          position: i + 1,
        }))}
      />
      
      {/* Page Header */}
      <header className="bg-gradient-hero py-12">
        <div className="container">
          <div className="flex items-center gap-3 mb-4">
            <CalendarDays className="w-8 h-8 text-primary" aria-hidden="true" />
            <h1 className="text-3xl font-bold text-primary-foreground">活动会议</h1>
          </div>
          <p className="text-primary-foreground/70 max-w-2xl">
            数博会、行业峰会、培训讲座等精彩活动，助您把握行业脉搏
          </p>
        </div>
      </header>

      <main className="container py-8">
        <Tabs defaultValue="upcoming" className="space-y-6">
          <TabsList>
            <TabsTrigger value="upcoming">即将开始 ({upcomingEvents?.length || 0})</TabsTrigger>
            <TabsTrigger value="past">往期活动 ({pastEvents?.length || 0})</TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming">
            <section aria-label="即将开始的活动">
              <ul className="space-y-6" role="list">
                {loadingUpcoming ? (
                  Array.from({ length: 3 }).map((_, i) => (
                    <li key={i} className="news-card flex flex-col md:flex-row overflow-hidden">
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
                    </li>
                  ))
                ) : upcomingEvents && upcomingEvents.length > 0 ? (
                  upcomingEvents.map((event, index) => (
                    <EventCard key={event.id} event={event} index={index} />
                  ))
                ) : (
                  <li className="text-center py-12 text-muted-foreground">
                    暂无即将开始的活动
                  </li>
                )}
              </ul>
            </section>
          </TabsContent>

          <TabsContent value="past">
            <section aria-label="往期活动">
              <ul className="space-y-6" role="list">
                {loadingPast ? (
                  Array.from({ length: 3 }).map((_, i) => (
                    <li key={i} className="news-card flex flex-col md:flex-row overflow-hidden">
                      <Skeleton className="md:w-80 h-48 md:h-auto" />
                      <div className="flex-1 p-6 space-y-3">
                        <Skeleton className="h-6 w-3/4" />
                        <Skeleton className="h-4 w-full" />
                      </div>
                    </li>
                  ))
                ) : pastEvents && pastEvents.length > 0 ? (
                  pastEvents.map((event, index) => (
                    <EventCard key={event.id} event={event} index={index} />
                  ))
                ) : (
                  <li className="text-center py-12 text-muted-foreground">
                    暂无往期活动
                  </li>
                )}
              </ul>
            </section>
          </TabsContent>
        </Tabs>
      </main>
    </Layout>
  );
}

interface EventCardProps {
  event: Event;
  index: number;
}

function EventCard({ event, index }: EventCardProps) {
  return (
    <li>
      <article>
        <Link
          to={`/events/${event.id}`}
          className="news-card flex flex-col md:flex-row overflow-hidden animate-fade-in"
          style={{ animationDelay: `${index * 0.1}s`, opacity: 0, animationFillMode: 'forwards' }}
        >
          <figure className="relative md:w-80 h-48 md:h-auto flex-shrink-0">
            <img
              {...getResponsiveImage(
                event.cover_image_url || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=400&fit=crop',
                '(max-width: 768px) 100vw, 320px'
              )}
              alt=""
              loading="lazy"
              decoding="async"
              width={800}
              height={400}
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
          </figure>
          
          <div className="flex-1 p-6">
            <header>
              <h2 className="font-bold text-xl text-foreground hover:text-primary transition-colors mb-3">
                {event.title}
              </h2>
            </header>
            <p className="text-muted-foreground mb-4 line-clamp-2">
              {event.details}
            </p>
            
            <dl className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <dt className="sr-only">日期</dt>
                <Calendar className="w-4 h-4 text-primary" aria-hidden="true" />
                <dd>
                  <time dateTime={event.event_date}>{formatDate(event.event_date, 'yyyy年MM月dd日')}</time>
                </dd>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <dt className="sr-only">时间</dt>
                <Clock className="w-4 h-4 text-primary" aria-hidden="true" />
                <dd>
                  <time dateTime={event.event_date}>{formatDate(event.event_date, 'HH:mm')}</time>
                </dd>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <dt className="sr-only">地点</dt>
                <MapPin className="w-4 h-4 text-primary" aria-hidden="true" />
                <dd>{event.location || '待定'}</dd>
              </div>
              {event.attendees_count && (
                <div className="flex items-center gap-2 text-muted-foreground">
                  <dt className="sr-only">预计参与人数</dt>
                  <Users className="w-4 h-4 text-primary" aria-hidden="true" />
                  <dd>预计 {event.attendees_count.toLocaleString()} 人</dd>
                </div>
              )}
            </dl>

            {event.status === 'upcoming' && (
              <footer className="mt-4 pt-4 border-t">
                <Button variant="hero">立即报名</Button>
              </footer>
            )}
          </div>
        </Link>
      </article>
    </li>
  );
}
