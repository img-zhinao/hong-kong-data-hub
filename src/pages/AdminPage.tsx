import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, FileText, Newspaper, Lightbulb, Calendar, 
  Building2, Settings, Users, LogOut, Menu, X, BarChart3,
  Plus, Edit, Trash2, Eye, Search
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { useAuth } from '@/hooks/useAuth';
import { useArticles } from '@/hooks/useArticles';
import { usePlatformStats } from '@/hooks/usePlatformStats';
import { useDataMerchants } from '@/hooks/useDataMerchants';
import { formatDate, formatStatValue } from '@/lib/formatters';
import logo from '@/assets/hkbde-logo.png';

const sidebarItems = [
  { icon: LayoutDashboard, name: '控制台', path: '/admin' },
  { icon: FileText, name: '政策法规', path: '/admin/policy' },
  { icon: Newspaper, name: '行业动态', path: '/admin/news' },
  { icon: Lightbulb, name: '专家观点', path: '/admin/insights' },
  { icon: Calendar, name: '活动管理', path: '/admin/events' },
  { icon: Building2, name: '数商管理', path: '/admin/merchants' },
  { icon: Users, name: '用户管理', path: '/admin/users' },
  { icon: BarChart3, name: '数据统计', path: '/admin/analytics' },
  { icon: Settings, name: '系统设置', path: '/admin/settings' },
];

export default function AdminPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const { data: recentArticles, isLoading: loadingArticles } = useArticles({ limit: 5 });
  const { data: platformStats, isLoading: loadingStats } = usePlatformStats();
  const { data: merchants } = useDataMerchants({ limit: 1 });

  const stats = [
    { label: '今日访问', value: '12,345', change: '+12%' },
    { label: '文章总数', value: recentArticles?.length ? `${recentArticles.length}+` : '0', change: '+5' },
    { label: '注册用户', value: '8,901', change: '+128' },
    { label: '入驻数商', value: merchants?.length ? `${merchants.length}+` : '0', change: '+15' },
  ];

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-navy text-primary-foreground transform transition-transform duration-300 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0`}>
        <div className="flex items-center justify-between p-4 border-b border-navy-light">
          <Link to="/" className="flex items-center gap-2">
            <img src={logo} alt="HKBDE" className="h-10 w-auto" />
            <span className="font-semibold">管理后台</span>
          </Link>
          <button 
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-primary-foreground/70 hover:text-primary-foreground"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="p-4 space-y-1">
          {sidebarItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                location.pathname === item.path
                  ? 'bg-primary text-primary-foreground'
                  : 'text-primary-foreground/70 hover:bg-navy-light hover:text-primary-foreground'
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span>{item.name}</span>
            </Link>
          ))}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-navy-light">
          <button 
            onClick={async () => {
              await signOut();
              navigate('/auth');
            }}
            className="flex items-center gap-3 px-4 py-3 w-full text-primary-foreground/70 hover:text-primary-foreground transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span>退出登录</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className={`flex-1 ${sidebarOpen ? 'lg:ml-64' : ''}`}>
        {/* Top Bar */}
        <header className="sticky top-0 z-40 bg-card border-b px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden"
              >
                <Menu className="w-5 h-5" />
              </button>
              <h1 className="text-xl font-semibold">控制台</h1>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input placeholder="搜索..." className="pl-10 w-64" />
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-medium">
                  {user?.email?.charAt(0).toUpperCase() || 'A'}
                </div>
                <span className="hidden md:inline text-sm font-medium truncate max-w-[120px]">
                  {user?.email || '管理员'}
                </span>
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="p-6">
          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {loadingStats ? (
              Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="bg-card rounded-xl border p-6">
                  <Skeleton className="h-4 w-16 mb-2" />
                  <Skeleton className="h-8 w-20 mb-1" />
                  <Skeleton className="h-3 w-12" />
                </div>
              ))
            ) : (
              stats.map((stat) => (
                <div key={stat.label} className="bg-card rounded-xl border p-6">
                  <div className="text-sm text-muted-foreground mb-1">{stat.label}</div>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <div className="text-xs text-green-500">{stat.change}</div>
                </div>
              ))
            )}
          </div>

          {/* Quick Actions */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-4">快捷操作</h2>
            <div className="flex flex-wrap gap-3">
              <Button variant="hero">
                <Plus className="w-4 h-4 mr-2" />
                发布文章
              </Button>
              <Button variant="outline">
                <Plus className="w-4 h-4 mr-2" />
                添加数商
              </Button>
              <Button variant="outline">
                <Plus className="w-4 h-4 mr-2" />
                创建活动
              </Button>
            </div>
          </div>

          {/* Recent Articles */}
          <div className="bg-card rounded-xl border">
            <div className="p-6 border-b">
              <h2 className="text-lg font-semibold">最近文章</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="text-left px-6 py-3 text-sm font-medium text-muted-foreground">标题</th>
                    <th className="text-left px-6 py-3 text-sm font-medium text-muted-foreground">分类</th>
                    <th className="text-left px-6 py-3 text-sm font-medium text-muted-foreground">状态</th>
                    <th className="text-left px-6 py-3 text-sm font-medium text-muted-foreground">日期</th>
                    <th className="text-left px-6 py-3 text-sm font-medium text-muted-foreground">操作</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {loadingArticles ? (
                    Array.from({ length: 4 }).map((_, i) => (
                      <tr key={i}>
                        <td className="px-6 py-4"><Skeleton className="h-4 w-48" /></td>
                        <td className="px-6 py-4"><Skeleton className="h-5 w-12" /></td>
                        <td className="px-6 py-4"><Skeleton className="h-4 w-16" /></td>
                        <td className="px-6 py-4"><Skeleton className="h-4 w-20" /></td>
                        <td className="px-6 py-4"><Skeleton className="h-4 w-16" /></td>
                      </tr>
                    ))
                  ) : recentArticles && recentArticles.length > 0 ? (
                    recentArticles.map((article) => (
                      <tr key={article.id} className="hover:bg-muted/30 transition-colors">
                        <td className="px-6 py-4 font-medium">{article.title}</td>
                        <td className="px-6 py-4">
                          <span className="tag tag-policy">{article.category === 'policy' ? '政策' : '新闻'}</span>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`text-sm ${
                            article.status === 'published' ? 'text-green-500' :
                            article.status === 'pending' ? 'text-yellow-500' :
                            'text-muted-foreground'
                          }`}>
                            {article.status === 'published' ? '已发布' : article.status === 'pending' ? '审核中' : '草稿'}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-muted-foreground">{formatDate(article.published_at || article.created_at)}</td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <button className="p-1 hover:text-primary transition-colors">
                              <Eye className="w-4 h-4" />
                            </button>
                            <button className="p-1 hover:text-primary transition-colors">
                              <Edit className="w-4 h-4" />
                            </button>
                            <button className="p-1 hover:text-destructive transition-colors">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="px-6 py-8 text-center text-muted-foreground">
                        暂无文章
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-foreground/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}
