import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader2, User, Building2, Mail, Shield, Camera } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';

export default function ProfilePage() {
  const { user, profile, loading, updateProfile } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [fullName, setFullName] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      navigate('/auth', { state: { from: { pathname: '/profile' } } });
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    if (profile) {
      setFullName(profile.full_name || '');
      setAvatarUrl(profile.avatar_url || '');
    }
  }, [profile]);

  const handleSave = async () => {
    setIsSaving(true);
    const { error } = await updateProfile({
      full_name: fullName,
      avatar_url: avatarUrl || null,
    });
    setIsSaving(false);

    if (error) {
      toast({
        variant: 'destructive',
        title: '保存失败',
        description: error.message,
      });
    } else {
      toast({
        title: '保存成功',
        description: '您的个人资料已更新',
      });
    }
  };

  const getRoleBadge = (role: string) => {
    switch (role) {
      case 'admin':
        return <Badge className="bg-red-500/20 text-red-400 border-red-500/30">系统管理员</Badge>;
      case 'editor':
        return <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">内容编辑</Badge>;
      case 'merchant':
        return <Badge className="bg-primary/20 text-primary border-primary/30">认证数商</Badge>;
      default:
        return <Badge className="bg-slate-500/20 text-slate-400 border-slate-500/30">普通会员</Badge>;
    }
  };

  const getInitials = (name: string | null) => {
    if (!name) return 'U';
    return name.charAt(0).toUpperCase();
  };

  if (loading) {
    return (
      <Layout>
        <div className="min-h-[60vh] flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </Layout>
    );
  }

  if (!user || !profile) {
    return null;
  }

  return (
    <Layout>
      <div className="container py-12 max-w-3xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">个人中心</h1>
          <p className="text-muted-foreground mt-2">管理您的账户信息和偏好设置</p>
        </div>

        <div className="space-y-6">
          {/* Profile Overview Card */}
          <Card className="bg-slate-900/50 border-slate-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5 text-primary" />
                账户概览
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-6">
                <div className="relative">
                  <Avatar className="w-24 h-24 border-2 border-primary/30">
                    <AvatarImage src={profile.avatar_url || undefined} />
                    <AvatarFallback className="bg-primary/20 text-primary text-2xl">
                      {getInitials(profile.full_name)}
                    </AvatarFallback>
                  </Avatar>
                  <Button
                    size="icon"
                    variant="secondary"
                    className="absolute bottom-0 right-0 w-8 h-8 rounded-full"
                    onClick={() => document.getElementById('avatar-url-input')?.focus()}
                  >
                    <Camera className="w-4 h-4" />
                  </Button>
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-semibold text-foreground">
                    {profile.full_name || '未设置姓名'}
                  </h2>
                  <p className="text-muted-foreground">{profile.email}</p>
                  <div className="flex items-center gap-2 mt-2">
                    {getRoleBadge(profile.role)}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Editable Profile Info */}
          <Card className="bg-slate-900/50 border-slate-800">
            <CardHeader>
              <CardTitle>编辑资料</CardTitle>
              <CardDescription>更新您的个人信息</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="fullName" className="text-slate-300">姓名</Label>
                <Input
                  id="fullName"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="您的姓名"
                  className="bg-slate-800 border-slate-700"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="avatar-url-input" className="text-slate-300">头像 URL</Label>
                <Input
                  id="avatar-url-input"
                  value={avatarUrl}
                  onChange={(e) => setAvatarUrl(e.target.value)}
                  placeholder="https://example.com/avatar.jpg"
                  className="bg-slate-800 border-slate-700"
                />
                <p className="text-xs text-muted-foreground">
                  输入图片的网络地址，留空则使用默认头像
                </p>
              </div>
              <Button 
                onClick={handleSave} 
                disabled={isSaving}
                className="bg-primary hover:bg-primary/90"
              >
                {isSaving ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    保存中...
                  </>
                ) : (
                  '保存更改'
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Read-only Company Info */}
          <Card className="bg-slate-900/50 border-slate-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="w-5 h-5 text-primary" />
                企业信息
              </CardTitle>
              <CardDescription>企业信息变更请联系客服</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label className="text-slate-300">公司名称</Label>
                <div className="flex items-center gap-2">
                  <Input
                    value={profile.company_name || '未设置'}
                    disabled
                    className="bg-slate-800/50 border-slate-700 text-muted-foreground"
                  />
                </div>
              </div>
              <Separator className="bg-slate-800" />
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Shield className="w-4 h-4" />
                <span>如需变更企业信息，请联系客服：support@hkbde.fun</span>
              </div>
            </CardContent>
          </Card>

          {/* Account Info */}
          <Card className="bg-slate-900/50 border-slate-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="w-5 h-5 text-primary" />
                账户信息
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <Label className="text-slate-300">注册邮箱</Label>
                  <p className="text-foreground mt-1">{profile.email}</p>
                </div>
                <div>
                  <Label className="text-slate-300">注册时间</Label>
                  <p className="text-foreground mt-1">
                    {new Date(profile.created_at).toLocaleDateString('zh-CN')}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
