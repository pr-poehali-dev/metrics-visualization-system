import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

const mockChartData = [
  { name: 'Пн', users: 240, events: 180, messages: 120 },
  { name: 'Вт', users: 320, events: 230, messages: 150 },
  { name: 'Ср', users: 280, events: 210, messages: 140 },
  { name: 'Чт', users: 380, events: 290, messages: 200 },
  { name: 'Пт', users: 420, events: 340, messages: 230 },
  { name: 'Сб', users: 290, events: 220, messages: 160 },
  { name: 'Вс', users: 250, events: 190, messages: 130 },
];

const mockEvents = [
  { id: 1, title: 'Новая регистрация', user: 'Иван Петров', time: '10:34 AM', type: 'success' },
  { id: 2, title: 'Ошибка авторизации', user: 'Мария Сидорова', time: '10:28 AM', type: 'error' },
  { id: 3, title: 'Обновление профиля', user: 'Алексей Иванов', time: '10:15 AM', type: 'info' },
  { id: 4, title: 'Новый заказ', user: 'Ольга Козлова', time: '10:05 AM', type: 'success' },
  { id: 5, title: 'Отмена подписки', user: 'Дмитрий Волков', time: '09:52 AM', type: 'warning' },
];

const mockMessages = [
  { id: 1, from: 'Иван Петров', text: 'Привет! Как дела с проектом?', time: '10:34 AM', unread: true },
  { id: 2, from: 'Мария Сидорова', text: 'Спасибо за помощь!', time: '10:20 AM', unread: true },
  { id: 3, from: 'Алексей Иванов', text: 'Можно обсудить новую фичу?', time: '09:45 AM', unread: false },
  { id: 4, from: 'Ольга Козлова', text: 'Отличная работа!', time: '09:30 AM', unread: false },
];

const mockUsers = [
  { id: 1, name: 'Иван Петров', email: 'ivan@example.com', status: 'online', avatar: '' },
  { id: 2, name: 'Мария Сидорова', email: 'maria@example.com', status: 'offline', avatar: '' },
  { id: 3, name: 'Алексей Иванов', email: 'alexey@example.com', status: 'online', avatar: '' },
  { id: 4, name: 'Ольга Козлова', email: 'olga@example.com', status: 'away', avatar: '' },
  { id: 5, name: 'Дмитрий Волков', email: 'dmitry@example.com', status: 'online', avatar: '' },
  { id: 6, name: 'Елена Смирнова', email: 'elena@example.com', status: 'offline', avatar: '' },
  { id: 7, name: 'Сергей Попов', email: 'sergey@example.com', status: 'online', avatar: '' },
  { id: 8, name: 'Анна Новикова', email: 'anna@example.com', status: 'away', avatar: '' },
];

type Section = 'dashboard' | 'events' | 'messages' | 'people' | 'analytics' | 'settings';

const Index = () => {
  const [activeSection, setActiveSection] = useState<Section>('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  const renderDashboard = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Активные пользователи
            </CardTitle>
            <Icon name="Users" className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">1,284</div>
            <p className="text-xs text-muted-foreground mt-1">
              <span className="text-green-600">+12.5%</span> от прошлой недели
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">События</CardTitle>
            <Icon name="Activity" className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">2,547</div>
            <p className="text-xs text-muted-foreground mt-1">
              <span className="text-green-600">+8.2%</span> от прошлой недели
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Сообщения</CardTitle>
            <Icon name="MessageSquare" className="h-4 w-4 text-secondary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">863</div>
            <p className="text-xs text-muted-foreground mt-1">
              <span className="text-red-600">-3.1%</span> от прошлой недели
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Конверсия
            </CardTitle>
            <Icon name="TrendingUp" className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">24.8%</div>
            <p className="text-xs text-muted-foreground mt-1">
              <span className="text-green-600">+4.3%</span> от прошлой недели
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Активность пользователей</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={mockChartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="name" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="users"
                  stroke="hsl(var(--primary))"
                  fill="hsl(var(--primary))"
                  fillOpacity={0.2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>События и сообщения</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={mockChartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="name" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="events"
                  stroke="hsl(var(--accent))"
                  strokeWidth={2}
                />
                <Line
                  type="monotone"
                  dataKey="messages"
                  stroke="hsl(var(--secondary))"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Последние события</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockEvents.slice(0, 3).map((event) => (
              <div key={event.id} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Badge
                    variant={
                      event.type === 'success'
                        ? 'default'
                        : event.type === 'error'
                        ? 'destructive'
                        : 'secondary'
                    }
                  >
                    {event.type}
                  </Badge>
                  <div>
                    <p className="font-medium">{event.title}</p>
                    <p className="text-sm text-muted-foreground">{event.user}</p>
                  </div>
                </div>
                <span className="text-sm text-muted-foreground">{event.time}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderEvents = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">События</h2>
        <div className="flex gap-2">
          <Button
            variant={selectedFilter === 'all' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedFilter('all')}
          >
            Все
          </Button>
          <Button
            variant={selectedFilter === 'success' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedFilter('success')}
          >
            Успешные
          </Button>
          <Button
            variant={selectedFilter === 'error' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedFilter('error')}
          >
            Ошибки
          </Button>
          <Button
            variant={selectedFilter === 'warning' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedFilter('warning')}
          >
            Предупреждения
          </Button>
        </div>
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="space-y-4">
            {mockEvents.map((event) => (
              <div
                key={event.id}
                className="flex items-center justify-between p-4 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <Badge
                    variant={
                      event.type === 'success'
                        ? 'default'
                        : event.type === 'error'
                        ? 'destructive'
                        : event.type === 'warning'
                        ? 'secondary'
                        : 'outline'
                    }
                  >
                    {event.type}
                  </Badge>
                  <div>
                    <p className="font-semibold">{event.title}</p>
                    <p className="text-sm text-muted-foreground">{event.user}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm text-muted-foreground">{event.time}</span>
                  <Button variant="ghost" size="sm">
                    <Icon name="MoreVertical" className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderMessages = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Сообщения</h2>
        <Button>
          <Icon name="Plus" className="h-4 w-4 mr-2" />
          Новое сообщение
        </Button>
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="space-y-2">
            {mockMessages.map((message) => (
              <div
                key={message.id}
                className={`flex items-start gap-4 p-4 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer ${
                  message.unread ? 'bg-primary/5' : ''
                }`}
              >
                <Avatar>
                  <AvatarFallback>
                    {message.from
                      .split(' ')
                      .map((n) => n[0])
                      .join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <p className="font-semibold">{message.from}</p>
                    <span className="text-sm text-muted-foreground">{message.time}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{message.text}</p>
                </div>
                {message.unread && (
                  <Badge variant="default" className="ml-2">
                    Новое
                  </Badge>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderPeople = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Люди</h2>
        <Button>
          <Icon name="UserPlus" className="h-4 w-4 mr-2" />
          Добавить
        </Button>
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {mockUsers.map((user) => (
              <div
                key={user.id}
                className="flex flex-col items-center p-4 rounded-lg border hover:shadow-md transition-shadow cursor-pointer"
              >
                <Avatar className="h-16 w-16 mb-3">
                  <AvatarFallback className="text-lg">
                    {user.name
                      .split(' ')
                      .map((n) => n[0])
                      .join('')}
                  </AvatarFallback>
                </Avatar>
                <p className="font-semibold text-center mb-1">{user.name}</p>
                <p className="text-sm text-muted-foreground mb-2">{user.email}</p>
                <Badge
                  variant={
                    user.status === 'online'
                      ? 'default'
                      : user.status === 'away'
                      ? 'secondary'
                      : 'outline'
                  }
                >
                  {user.status}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderAnalytics = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Аналитика</h2>

      <Card>
        <CardHeader>
          <CardTitle>Сравнительная статистика</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={mockChartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="name" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip />
              <Legend />
              <Bar dataKey="users" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
              <Bar dataKey="events" fill="hsl(var(--accent))" radius={[4, 4, 0, 0]} />
              <Bar dataKey="messages" fill="hsl(var(--secondary))" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Тренд пользователей</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={mockChartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="name" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="users"
                  stroke="hsl(var(--primary))"
                  fill="hsl(var(--primary))"
                  fillOpacity={0.3}
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Динамика событий</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={mockChartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="name" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="events"
                  stroke="hsl(var(--accent))"
                  strokeWidth={3}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderSettings = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Настройки</h2>

      <Card>
        <CardHeader>
          <CardTitle>Общие настройки</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-2 block">Название проекта</label>
            <Input placeholder="Мой проект" />
          </div>
          <div>
            <label className="text-sm font-medium mb-2 block">Email уведомлений</label>
            <Input type="email" placeholder="admin@example.com" />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Email уведомления</p>
              <p className="text-sm text-muted-foreground">
                Получать уведомления на почту
              </p>
            </div>
            <Button variant="outline">Включить</Button>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Push уведомления</p>
              <p className="text-sm text-muted-foreground">
                Уведомления в браузере
              </p>
            </div>
            <Button variant="outline">Включить</Button>
          </div>
          <Separator />
          <Button className="w-full">Сохранить изменения</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Безопасность</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Двухфакторная аутентификация</p>
              <p className="text-sm text-muted-foreground">
                Дополнительная защита аккаунта
              </p>
            </div>
            <Button variant="outline">Настроить</Button>
          </div>
          <Separator />
          <Button variant="destructive" className="w-full">
            Изменить пароль
          </Button>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="flex h-screen bg-background">
      <aside className="w-64 bg-sidebar text-sidebar-foreground flex flex-col">
        <div className="p-6 flex items-center gap-3">
          <div className="h-10 w-10 rounded-lg bg-primary flex items-center justify-center text-white font-bold text-lg">
            М
          </div>
          <div>
            <h1 className="font-bold text-lg">Метрики</h1>
            <p className="text-xs text-sidebar-foreground/70">Система визуализации</p>
          </div>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1">
          <Button
            variant={activeSection === 'dashboard' ? 'secondary' : 'ghost'}
            className={`w-full justify-start ${
              activeSection === 'dashboard'
                ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                : 'text-sidebar-foreground hover:bg-sidebar-accent'
            }`}
            onClick={() => setActiveSection('dashboard')}
          >
            <Icon name="LayoutDashboard" className="h-4 w-4 mr-3" />
            Главная
          </Button>

          <Button
            variant={activeSection === 'events' ? 'secondary' : 'ghost'}
            className={`w-full justify-start ${
              activeSection === 'events'
                ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                : 'text-sidebar-foreground hover:bg-sidebar-accent'
            }`}
            onClick={() => setActiveSection('events')}
          >
            <Icon name="Activity" className="h-4 w-4 mr-3" />
            События
          </Button>

          <Button
            variant={activeSection === 'messages' ? 'secondary' : 'ghost'}
            className={`w-full justify-start ${
              activeSection === 'messages'
                ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                : 'text-sidebar-foreground hover:bg-sidebar-accent'
            }`}
            onClick={() => setActiveSection('messages')}
          >
            <Icon name="MessageSquare" className="h-4 w-4 mr-3" />
            Сообщения
            <Badge className="ml-auto" variant="destructive">
              2
            </Badge>
          </Button>

          <Button
            variant={activeSection === 'people' ? 'secondary' : 'ghost'}
            className={`w-full justify-start ${
              activeSection === 'people'
                ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                : 'text-sidebar-foreground hover:bg-sidebar-accent'
            }`}
            onClick={() => setActiveSection('people')}
          >
            <Icon name="Users" className="h-4 w-4 mr-3" />
            Люди
          </Button>

          <Button
            variant={activeSection === 'analytics' ? 'secondary' : 'ghost'}
            className={`w-full justify-start ${
              activeSection === 'analytics'
                ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                : 'text-sidebar-foreground hover:bg-sidebar-accent'
            }`}
            onClick={() => setActiveSection('analytics')}
          >
            <Icon name="BarChart3" className="h-4 w-4 mr-3" />
            Аналитика
          </Button>

          <Separator className="my-4 bg-sidebar-border" />

          <Button
            variant={activeSection === 'settings' ? 'secondary' : 'ghost'}
            className={`w-full justify-start ${
              activeSection === 'settings'
                ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                : 'text-sidebar-foreground hover:bg-sidebar-accent'
            }`}
            onClick={() => setActiveSection('settings')}
          >
            <Icon name="Settings" className="h-4 w-4 mr-3" />
            Настройки
          </Button>
        </nav>

        <div className="p-4 border-t border-sidebar-border">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarFallback>АД</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <p className="text-sm font-medium">Администратор</p>
              <p className="text-xs text-sidebar-foreground/70">admin@example.com</p>
            </div>
            <Button variant="ghost" size="sm">
              <Icon name="LogOut" className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </aside>

      <main className="flex-1 overflow-auto">
        <header className="sticky top-0 z-10 bg-card border-b px-6 py-4 flex items-center justify-between">
          <div className="flex-1 max-w-md">
            <div className="relative">
              <Icon
                name="Search"
                className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground"
              />
              <Input
                placeholder="Поиск..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon">
              <Icon name="Bell" className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <Icon name="HelpCircle" className="h-5 w-5" />
            </Button>
            <Button>
              <Icon name="Plus" className="h-4 w-4 mr-2" />
              Создать
            </Button>
          </div>
        </header>

        <div className="p-6">
          {activeSection === 'dashboard' && renderDashboard()}
          {activeSection === 'events' && renderEvents()}
          {activeSection === 'messages' && renderMessages()}
          {activeSection === 'people' && renderPeople()}
          {activeSection === 'analytics' && renderAnalytics()}
          {activeSection === 'settings' && renderSettings()}
        </div>
      </main>
    </div>
  );
};

export default Index;
