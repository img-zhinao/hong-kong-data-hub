import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { z } from 'zod';
import { Loader2 } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import logo from '@/assets/hkbde-logo.png';

const signInSchema = z.object({
  email: z.string().trim().email({ message: '请输入有效的邮箱地址' }).max(255, { message: '邮箱长度不能超过255字符' }),
  password: z.string().min(6, { message: '密码至少需要6个字符' }).max(100, { message: '密码长度不能超过100字符' }),
});

const signUpSchema = signInSchema.extend({
  fullName: z.string().min(1, { message: '请输入您的姓名' }).max(100, { message: '姓名长度不能超过100字符' }),
  companyName: z.string().min(1, { message: '请输入公司名称' }).max(200, { message: '公司名称长度不能超过200字符' }),
});

type SignInErrors = { email?: string; password?: string };
type SignUpErrors = SignInErrors & { fullName?: string; companyName?: string };

export default function AuthPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [signInErrors, setSignInErrors] = useState<SignInErrors>({});
  const [signUpErrors, setSignUpErrors] = useState<SignUpErrors>({});
  
  const { signIn, signUp, user, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  const from = (location.state as { from?: { pathname: string } })?.from?.pathname || '/';

  useEffect(() => {
    if (!loading && user) {
      navigate(from, { replace: true });
    }
  }, [user, loading, navigate, from]);

  const validateSignIn = () => {
    try {
      signInSchema.parse({ email, password });
      setSignInErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: SignInErrors = {};
        error.errors.forEach((err) => {
          if (err.path[0] === 'email') fieldErrors.email = err.message;
          if (err.path[0] === 'password') fieldErrors.password = err.message;
        });
        setSignInErrors(fieldErrors);
      }
      return false;
    }
  };

  const validateSignUp = () => {
    try {
      signUpSchema.parse({ email, password, fullName, companyName });
      setSignUpErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: SignUpErrors = {};
        error.errors.forEach((err) => {
          const field = err.path[0] as keyof SignUpErrors;
          fieldErrors[field] = err.message;
        });
        setSignUpErrors(fieldErrors);
      }
      return false;
    }
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateSignIn()) return;
    
    setIsSubmitting(true);
    const { error } = await signIn(email, password);
    setIsSubmitting(false);

    if (error) {
      toast({
        variant: 'destructive',
        title: '登录失败',
        description: error.message === 'Invalid login credentials' 
          ? '邮箱或密码错误' 
          : error.message,
      });
    } else {
      toast({
        title: '登录成功',
        description: '欢迎回到香港大数据交易所',
      });
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateSignUp()) return;
    
    setIsSubmitting(true);
    const { error } = await signUp(email, password, {
      full_name: fullName,
      company_name: companyName,
    });
    setIsSubmitting(false);

    if (error) {
      let errorMessage = error.message;
      if (error.message.includes('already registered')) {
        errorMessage = '该邮箱已被注册，请直接登录或使用其他邮箱';
      } else if (error.message.includes('valid email')) {
        errorMessage = '请输入有效的邮箱地址';
      }
      toast({
        variant: 'destructive',
        title: '注册失败',
        description: errorMessage,
      });
    } else {
      toast({
        title: '注册成功',
        description: '请检查您的邮箱以确认账户，确认后即可登录',
      });
      // Clear form
      setFullName('');
      setCompanyName('');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 px-4 py-12">
      <Card className="w-full max-w-md bg-slate-900/80 border-slate-800 backdrop-blur-sm">
        <CardHeader className="text-center pb-2">
          <div className="flex justify-center mb-4">
            <img src={logo} alt="HKBDE" className="h-14 w-auto" />
          </div>
          <CardTitle className="text-2xl text-foreground">香港大数据交易所</CardTitle>
          <CardDescription className="text-slate-400">
            登录或注册成为会员
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="signin" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6 bg-slate-800">
              <TabsTrigger value="signin" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                登录
              </TabsTrigger>
              <TabsTrigger value="signup" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                注册
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="signin">
              <form onSubmit={handleSignIn} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="signin-email" className="text-slate-300">邮箱</Label>
                  <Input
                    id="signin-email"
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isSubmitting}
                    className="bg-slate-800 border-slate-700 text-foreground placeholder:text-slate-500"
                  />
                  {signInErrors.email && (
                    <p className="text-sm text-destructive">{signInErrors.email}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signin-password" className="text-slate-300">密码</Label>
                  <Input
                    id="signin-password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={isSubmitting}
                    className="bg-slate-800 border-slate-700 text-foreground placeholder:text-slate-500"
                  />
                  {signInErrors.password && (
                    <p className="text-sm text-destructive">{signInErrors.password}</p>
                  )}
                </div>
                <Button type="submit" className="w-full bg-primary hover:bg-primary/90" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      登录中...
                    </>
                  ) : (
                    '登录'
                  )}
                </Button>
              </form>
            </TabsContent>
            
            <TabsContent value="signup">
              <form onSubmit={handleSignUp} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="signup-email" className="text-slate-300">邮箱 <span className="text-destructive">*</span></Label>
                  <Input
                    id="signup-email"
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isSubmitting}
                    className="bg-slate-800 border-slate-700 text-foreground placeholder:text-slate-500"
                  />
                  {signUpErrors.email && (
                    <p className="text-sm text-destructive">{signUpErrors.email}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-password" className="text-slate-300">密码 <span className="text-destructive">*</span></Label>
                  <Input
                    id="signup-password"
                    type="password"
                    placeholder="至少6个字符"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={isSubmitting}
                    className="bg-slate-800 border-slate-700 text-foreground placeholder:text-slate-500"
                  />
                  {signUpErrors.password && (
                    <p className="text-sm text-destructive">{signUpErrors.password}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-fullname" className="text-slate-300">姓名 <span className="text-destructive">*</span></Label>
                  <Input
                    id="signup-fullname"
                    type="text"
                    placeholder="您的姓名"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    disabled={isSubmitting}
                    className="bg-slate-800 border-slate-700 text-foreground placeholder:text-slate-500"
                  />
                  {signUpErrors.fullName && (
                    <p className="text-sm text-destructive">{signUpErrors.fullName}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-company" className="text-slate-300">公司名称 <span className="text-destructive">*</span></Label>
                  <Input
                    id="signup-company"
                    type="text"
                    placeholder="您所在的公司"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    disabled={isSubmitting}
                    className="bg-slate-800 border-slate-700 text-foreground placeholder:text-slate-500"
                  />
                  {signUpErrors.companyName && (
                    <p className="text-sm text-destructive">{signUpErrors.companyName}</p>
                  )}
                </div>
                <Button type="submit" className="w-full bg-primary hover:bg-primary/90" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      注册中...
                    </>
                  ) : (
                    '注册'
                  )}
                </Button>
                <p className="text-xs text-slate-500 text-center">
                  注册即表示您同意我们的服务条款和隐私政策
                </p>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
