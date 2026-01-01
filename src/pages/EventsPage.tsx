import { Layout } from '@/components/layout/Layout';
import { Calendar, MapPin, Users, CalendarDays, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const events = [
  {
    id: 1,
    title: '2025香港大数据产业博览会',
    description: '粤港澳大湾区最具影响力的数据产业盛会，汇聚全球数据交易、AI应用、隐私计算等领域的领军企业和专家学者。',
    date: '2025年3月15-17日',
    time: '09:00 - 18:00',
    location: '香港会议展览中心',
    attendees: 5000,
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=400&fit=crop',
    status: 'upcoming',
    statusText: '报名中',
    type: '博览会',
  },
  {
    id: 2,
    title: '数据要素流通与治理高峰论坛',
    description: '探讨数据要素市场化配置改革路径，分享数据治理最佳实践，促进产学研深度合作。',
    date: '2025年2月20日',
    time: '14:00 - 17:30',
    location: '香港数码港',
    attendees: 500,
    image: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&h=400&fit=crop',
    status: 'upcoming',
    statusText: '即将开始',
    type: '论坛',
  },
  {
    id: 3,
    title: 'AI数据集标准化研讨会',
    description: '聚焦人工智能训练数据集的标准化建设，探讨高质量数据集的生产、标注、评估标准。',
    date: '2025年1月28日',
    time: '10:00 - 12:00',
    location: '线上直播',
    attendees: 2000,
    image: 'https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=800&h=400&fit=crop',
    status: 'past',
    statusText: '已结束',
    type: '研讨会',
  },
  {
    id: 4,
    title: '数据资产入表实操培训班',
    description: '系统讲解数据资产入表的政策要求、操作流程、典型案例，助力企业顺利完成数据资产入表工作。',
    date: '2024年12月15日',
    time: '09:00 - 17:00',
    location: '香港科技园',
    attendees: 150,
    image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&h=400&fit=crop',
    status: 'past',
    statusText: '已结束',
    type: '培训',
  },
];

const upcomingEvents = events.filter(e => e.status === 'upcoming');
const pastEvents = events.filter(e => e.status === 'past');

export default function EventsPage() {
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
            <TabsTrigger value="upcoming">即将开始 ({upcomingEvents.length})</TabsTrigger>
            <TabsTrigger value="past">往期活动 ({pastEvents.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming">
            <div className="space-y-6">
              {upcomingEvents.map((event, index) => (
                <EventCard key={event.id} event={event} index={index} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="past">
            <div className="space-y-6">
              {pastEvents.map((event, index) => (
                <EventCard key={event.id} event={event} index={index} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}

interface EventCardProps {
  event: typeof events[0];
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
          src={event.image}
          alt={event.title}
          className="w-full h-full object-cover"
        />
        <span className={`absolute top-3 left-3 px-3 py-1 text-xs font-medium rounded-full ${
          event.status === 'upcoming' 
            ? 'bg-green-500 text-white' 
            : 'bg-muted text-muted-foreground'
        }`}>
          {event.statusText}
        </span>
        <span className="absolute top-3 right-3 px-3 py-1 text-xs font-medium rounded-full bg-primary/90 text-primary-foreground">
          {event.type}
        </span>
      </div>
      
      <div className="flex-1 p-6">
        <h3 className="font-bold text-xl text-foreground hover:text-primary transition-colors mb-3">
          {event.title}
        </h3>
        <p className="text-muted-foreground mb-4 line-clamp-2">
          {event.description}
        </p>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Calendar className="w-4 h-4 text-primary" />
            <span>{event.date}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Clock className="w-4 h-4 text-primary" />
            <span>{event.time}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin className="w-4 h-4 text-primary" />
            <span>{event.location}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Users className="w-4 h-4 text-primary" />
            <span>预计 {event.attendees.toLocaleString()} 人</span>
          </div>
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
