import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
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
  PieChart,
  Pie,
  Cell,
} from 'recharts';

const mockChartDataWeek = [
  { name: 'Пн', users: 240, events: 180, messages: 120 },
  { name: 'Вт', users: 320, events: 230, messages: 150 },
  { name: 'Ср', users: 280, events: 210, messages: 140 },
  { name: 'Чт', users: 380, events: 290, messages: 200 },
  { name: 'Пт', users: 420, events: 340, messages: 230 },
  { name: 'Сб', users: 290, events: 220, messages: 160 },
  { name: 'Вс', users: 250, events: 190, messages: 130 },
];

const mockChartDataMonth = [
  { name: 'Нед 1', users: 1840, events: 1580, messages: 920 },
  { name: 'Нед 2', users: 2120, events: 1730, messages: 1150 },
  { name: 'Нед 3', users: 1980, events: 1610, messages: 1040 },
  { name: 'Нед 4', users: 2380, events: 1990, messages: 1300 },
];

const mockChartDataYear = [
  { name: 'Янв', users: 8240, events: 6180, messages: 4120 },
  { name: 'Фев', users: 9320, events: 7230, messages: 4650 },
  { name: 'Мар', users: 10280, events: 8210, messages: 5140 },
  { name: 'Апр', users: 11380, events: 9290, messages: 6200 },
  { name: 'Май', users: 12420, events: 10340, messages: 7230 },
  { name: 'Июн', users: 11290, events: 9220, messages: 6160 },
];

const mockEvents = [
  { id: 1, title: 'Новая регистрация', user: 'Иван Петров', time: '10:34 AM', type: 'success' },
  { id: 2, title: 'Ошибка авторизации', user: 'Мария Сидорова', time: '10:28 AM', type: 'error' },
  { id: 3, title: 'Обновление профиля', user: 'Алексей Иванов', time: '10:15 AM', type: 'info' },
  { id: 4, title: 'Новый заказ', user: 'Ольга Козлова', time: '10:05 AM', type: 'success' },
  { id: 5, title: 'Отмена подписки', user: 'Дмитрий Волков', time: '09:52 AM', type: 'warning' },
  { id: 6, title: 'Платеж получен', user: 'Елена Смирнова', time: '09:40 AM', type: 'success' },
  { id: 7, title: 'Ошибка сервера', user: 'Система', time: '09:30 AM', type: 'error' },
  { id: 8, title: 'Экспорт данных', user: 'Сергей Попов', time: '09:20 AM', type: 'info' },
];

const mockMessages = [
  { id: 1, from: 'Иван Петров', text: 'Привет! Как дела с проектом?', time: '10:34 AM', unread: true },
  { id: 2, from: 'Мария Сидорова', text: 'Спасибо за помощь!', time: '10:20 AM', unread: true },
  { id: 3, from: 'Алексей Иванов', text: 'Можно обсудить новую фичу?', time: '09:45 AM', unread: false },
  { id: 4, from: 'Ольга Козлова', text: 'Отличная работа!', time: '09:30 AM', unread: false },
];

const mockUsers = [
  { id: 1, name: 'Иван Петров', email: 'ivan@example.com', status: 'online', role: 'Администратор' },
  { id: 2, name: 'Мария Сидорова', email: 'maria@example.com', status: 'offline', role: 'Менеджер' },
  { id: 3, name: 'Алексей Иванов', email: 'alexey@example.com', status: 'online', role: 'Разработчик' },
  { id: 4, name: 'Ольга Козлова', email: 'olga@example.com', status: 'away', role: 'Дизайнер' },
  { id: 5, name: 'Дмитрий Волков', email: 'dmitry@example.com', status: 'online', role: 'Аналитик' },
  { id: 6, name: 'Елена Смирнова', email: 'elena@example.com', status: 'offline', role: 'Менеджер' },
  { id: 7, name: 'Сергей Попов', email: 'sergey@example.com', status: 'online', role: 'Разработчик' },
  { id: 8, name: 'Анна Новикова', email: 'anna@example.com', status: 'away', role: 'Дизайнер' },
];

const mockNotifications = [
  { id: 1, title: 'Новый пользователь', text: 'Иван Петров зарегистрировался', time: '5 мин назад', read: false },
  { id: 2, title: 'Системное обновление', text: 'Доступна новая версия', time: '1 час назад', read: false },
  { id: 3, title: 'Отчет готов', text: 'Месячный отчет сформирован', time: '3 часа назад', read: true },
];

const pieData = [
  { name: 'Регистрации', value: 400, color: 'hsl(var(--primary))' },
  { name: 'Заказы', value: 300, color: 'hsl(var(--accent))' },
  { name: 'Платежи', value: 200, color: 'hsl(var(--secondary))' },
  { name: 'Другое', value: 100, color: '#9ca3af' },
];

type Section = 'dashboard' | 'events' | 'messages' | 'people' | 'analytics' | 'settings';
type TimePeriod = 'week' | 'month' | 'year';

const Index = () => {
  const [activeSection, setActiveSection] = useState<Section>('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [timePeriod, setTimePeriod] = useState<TimePeriod>('week');
  const [analyticsView, setAnalyticsView] = useState('overview');
  const [currentOwner, setCurrentOwner] = useState(mockUsers[0]);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const getChartData = () => {
    switch (timePeriod) {
      case 'month':
        return mockChartDataMonth;
      case 'year':
        return mockChartDataYear;
      default:
        return mockChartDataWeek;
    }
  };

  const filteredEvents = mockEvents.filter((event) => {
    const matchesFilter = selectedFilter === 'all' || event.type === selectedFilter;
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.user.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const filteredUsers = mockUsers.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderDashboard = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Обзор</h2>
        <div className="flex gap-2">
          <Button
            variant={timePeriod === 'week' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setTimePeriod('week')}
          >
            Неделя
          </Button>
          <Button
            variant={timePeriod === 'month' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setTimePeriod('month')}
          >
            Месяц
          </Button>
          <Button
            variant={timePeriod === 'year' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setTimePeriod('year')}
          >
            Год
          </Button>
        </div>
      </div>

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
              <AreaChart data={getChartData()}>
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
              <LineChart data={getChartData()}>
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
          <Button
            variant={selectedFilter === 'info' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedFilter('info')}
          >
            Инфо
          </Button>
        </div>
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="space-y-4">
            {filteredEvents.map((event) => (
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
            {filteredEvents.length === 0 && (
              <p className="text-center text-muted-foreground py-8">
                События не найдены
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderMessages = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Сообщения</h2>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Icon name="Plus" className="h-4 w-4 mr-2" />
              Новое сообщение
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Новое сообщение</DialogTitle>
              <DialogDescription>
                Отправьте сообщение пользователю
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div>
                <Label>Получатель</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите пользователя" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockUsers.map((user) => (
                      <SelectItem key={user.id} value={user.id.toString()}>
                        {user.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Сообщение</Label>
                <Input placeholder="Введите ваше сообщение..." />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Отправить</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
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
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Icon name="UserPlus" className="h-4 w-4 mr-2" />
              Добавить
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Добавить пользователя</DialogTitle>
              <DialogDescription>
                Создайте нового пользователя в системе
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div>
                <Label>Имя</Label>
                <Input placeholder="Иван Иванов" />
              </div>
              <div>
                <Label>Email</Label>
                <Input type="email" placeholder="ivan@example.com" />
              </div>
              <div>
                <Label>Роль</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите роль" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Администратор</SelectItem>
                    <SelectItem value="manager">Менеджер</SelectItem>
                    <SelectItem value="developer">Разработчик</SelectItem>
                    <SelectItem value="designer">Дизайнер</SelectItem>
                    <SelectItem value="analyst">Аналитик</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Создать</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {filteredUsers.map((user) => (
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
                <p className="text-sm text-muted-foreground mb-1">{user.email}</p>
                <p className="text-xs text-muted-foreground mb-2">{user.role}</p>
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
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Аналитика</h2>
        <Select value={analyticsView} onValueChange={setAnalyticsView}>
          <SelectTrigger className="w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="overview">Обзор</SelectItem>
            <SelectItem value="users">Пользователи</SelectItem>
            <SelectItem value="events">События</SelectItem>
            <SelectItem value="revenue">Доходы</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {analyticsView === 'overview' && (
        <>
          <Card>
            <CardHeader>
              <CardTitle>Сравнительная статистика</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={mockChartDataWeek}>
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
                <CardTitle>Распределение типов событий</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={(entry) => entry.name}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Динамика событий</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={mockChartDataWeek}>
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
        </>
      )}

      {analyticsView === 'users' && (
        <Card>
          <CardHeader>
            <CardTitle>Детальная аналитика пользователей</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={400}>
              <AreaChart data={mockChartDataMonth}>
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
      )}

      {analyticsView === 'events' && (
        <Card>
          <CardHeader>
            <CardTitle>Детальная аналитика событий</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={mockChartDataMonth}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="name" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip />
                <Bar dataKey="events" fill="hsl(var(--accent))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      )}

      {analyticsView === 'revenue' && (
        <Card>
          <CardHeader>
            <CardTitle>Динамика доходов</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={mockChartDataYear}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="name" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="users"
                  stroke="hsl(var(--primary))"
                  strokeWidth={3}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      )}
    </div>
  );

  const renderSettings = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Настройки</h2>

      <Tabs defaultValue="general" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="general">Общие</TabsTrigger>
          <TabsTrigger value="notifications">Уведомления</TabsTrigger>
          <TabsTrigger value="security">Безопасность</TabsTrigger>
          <TabsTrigger value="integrations">Интеграции</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Общие настройки</CardTitle>
              <CardDescription>Управление основными параметрами проекта</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Название проекта</Label>
                <Input placeholder="Мой проект" />
              </div>
              <div>
                <Label>Описание</Label>
                <Input placeholder="Описание проекта" />
              </div>
              <div>
                <Label>Часовой пояс</Label>
                <Select defaultValue="msk">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="msk">МСК (UTC+3)</SelectItem>
                    <SelectItem value="utc">UTC (UTC+0)</SelectItem>
                    <SelectItem value="pst">PST (UTC-8)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Язык интерфейса</Label>
                <Select defaultValue="ru">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ru">Русский</SelectItem>
                    <SelectItem value="en">English</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button className="w-full">Сохранить изменения</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Настройки уведомлений</CardTitle>
              <CardDescription>Управление способами получения уведомлений</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Email для уведомлений</Label>
                <Input type="email" placeholder="admin@example.com" />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Email уведомления</Label>
                  <p className="text-sm text-muted-foreground">
                    Получать уведомления на почту
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Push уведомления</Label>
                  <p className="text-sm text-muted-foreground">
                    Уведомления в браузере
                  </p>
                </div>
                <Switch />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>SMS уведомления</Label>
                  <p className="text-sm text-muted-foreground">
                    Получать SMS о критичных событиях
                  </p>
                </div>
                <Switch />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Уведомления о новых пользователях</Label>
                  <p className="text-sm text-muted-foreground">
                    При регистрации новых пользователей
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Уведомления об ошибках</Label>
                  <p className="text-sm text-muted-foreground">
                    При возникновении системных ошибок
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              <Button className="w-full">Сохранить настройки</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Безопасность</CardTitle>
              <CardDescription>Настройки безопасности и доступа</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Двухфакторная аутентификация</Label>
                  <p className="text-sm text-muted-foreground">
                    Дополнительная защита аккаунта
                  </p>
                </div>
                <Button variant="outline">Настроить</Button>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>История входов</Label>
                  <p className="text-sm text-muted-foreground">
                    Просмотр последних входов в систему
                  </p>
                </div>
                <Button variant="outline">Просмотреть</Button>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Сессии</Label>
                  <p className="text-sm text-muted-foreground">
                    Активные сессии на других устройствах
                  </p>
                </div>
                <Button variant="outline">Управление</Button>
              </div>
              <Separator />
              <Button variant="destructive" className="w-full">
                Изменить пароль
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="integrations" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Интеграции</CardTitle>
              <CardDescription>Подключение внешних сервисов</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Icon name="Mail" className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Email сервис</p>
                    <p className="text-sm text-muted-foreground">Не подключен</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">Подключить</Button>
              </div>

              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-accent/10 flex items-center justify-center">
                    <Icon name="Database" className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <p className="font-medium">База данных</p>
                    <p className="text-sm text-green-600">Подключено</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">Настроить</Button>
              </div>

              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-secondary/10 flex items-center justify-center">
                    <Icon name="Webhook" className="h-5 w-5 text-secondary" />
                  </div>
                  <div>
                    <p className="font-medium">Webhooks</p>
                    <p className="text-sm text-muted-foreground">Не настроены</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">Настроить</Button>
              </div>

              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-green-100 flex items-center justify-center">
                    <Icon name="Cloud" className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium">Облачное хранилище</p>
                    <p className="text-sm text-muted-foreground">Не подключено</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">Подключить</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
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
          <Dialog>
            <DialogTrigger asChild>
              <div className="flex items-center gap-3 cursor-pointer hover:bg-sidebar-accent p-2 rounded-lg transition-colors">
                <Avatar>
                  <AvatarFallback>
                    {currentOwner.name
                      .split(' ')
                      .map((n) => n[0])
                      .join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="text-sm font-medium">{currentOwner.name}</p>
                  <p className="text-xs text-sidebar-foreground/70">{currentOwner.email}</p>
                </div>
                <Button variant="ghost" size="sm">
                  <Icon name="LogOut" className="h-4 w-4" />
                </Button>
              </div>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Сменить владельца</DialogTitle>
                <DialogDescription>
                  Выберите нового владельца проекта из списка пользователей
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  {mockUsers.map((user) => (
                    <div
                      key={user.id}
                      className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer hover:bg-muted/50 transition-colors ${
                        user.id === currentOwner.id ? 'border-primary bg-primary/5' : ''
                      }`}
                      onClick={() => setCurrentOwner(user)}
                    >
                      <Avatar>
                        <AvatarFallback>
                          {user.name
                            .split(' ')
                            .map((n) => n[0])
                            .join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <p className="font-medium">{user.name}</p>
                        <p className="text-sm text-muted-foreground">{user.email}</p>
                      </div>
                      {user.id === currentOwner.id && (
                        <Icon name="Check" className="h-5 w-5 text-primary" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Сменить владельца</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
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
            <Dialog open={notificationsOpen} onOpenChange={setNotificationsOpen}>
              <DialogTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                  <Icon name="Bell" className="h-5 w-5" />
                  <span className="absolute top-1 right-1 h-2 w-2 bg-red-600 rounded-full"></span>
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Уведомления</DialogTitle>
                  <DialogDescription>
                    У вас {mockNotifications.filter((n) => !n.read).length} непрочитанных уведомлений
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  {mockNotifications.map((notif) => (
                    <div
                      key={notif.id}
                      className={`p-4 rounded-lg border ${
                        !notif.read ? 'bg-primary/5 border-primary' : ''
                      }`}
                    >
                      <div className="flex items-start justify-between mb-1">
                        <p className="font-medium">{notif.title}</p>
                        {!notif.read && <Badge variant="default">Новое</Badge>}
                      </div>
                      <p className="text-sm text-muted-foreground mb-1">{notif.text}</p>
                      <p className="text-xs text-muted-foreground">{notif.time}</p>
                    </div>
                  ))}
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setNotificationsOpen(false)}>
                    Отметить все как прочитанные
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            <Dialog>
              <DialogTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Icon name="HelpCircle" className="h-5 w-5" />
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Помощь</DialogTitle>
                  <DialogDescription>
                    Ресурсы и контакты для получения поддержки
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <h3 className="font-medium">Документация</h3>
                    <p className="text-sm text-muted-foreground">
                      Полное руководство по использованию системы
                    </p>
                    <Button variant="outline" className="w-full">
                      <Icon name="Book" className="h-4 w-4 mr-2" />
                      Открыть документацию
                    </Button>
                  </div>
                  <Separator />
                  <div className="space-y-2">
                    <h3 className="font-medium">Связаться с поддержкой</h3>
                    <p className="text-sm text-muted-foreground">
                      support@example.com
                    </p>
                    <Button variant="outline" className="w-full">
                      <Icon name="Mail" className="h-4 w-4 mr-2" />
                      Написать в поддержку
                    </Button>
                  </div>
                  <Separator />
                  <div className="space-y-2">
                    <h3 className="font-medium">Видео-туториалы</h3>
                    <p className="text-sm text-muted-foreground">
                      Обучающие материалы и примеры
                    </p>
                    <Button variant="outline" className="w-full">
                      <Icon name="Video" className="h-4 w-4 mr-2" />
                      Смотреть видео
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>

            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <Icon name="Plus" className="h-4 w-4 mr-2" />
                  Создать
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Что вы хотите создать?</DialogTitle>
                  <DialogDescription>
                    Выберите тип объекта для создания
                  </DialogDescription>
                </DialogHeader>
                <div className="grid grid-cols-2 gap-4 py-4">
                  <Button
                    variant="outline"
                    className="h-24 flex-col gap-2"
                    onClick={() => setActiveSection('events')}
                  >
                    <Icon name="Activity" className="h-8 w-8" />
                    <span>Событие</span>
                  </Button>
                  <Button
                    variant="outline"
                    className="h-24 flex-col gap-2"
                    onClick={() => setActiveSection('messages')}
                  >
                    <Icon name="MessageSquare" className="h-8 w-8" />
                    <span>Сообщение</span>
                  </Button>
                  <Button
                    variant="outline"
                    className="h-24 flex-col gap-2"
                    onClick={() => setActiveSection('people')}
                  >
                    <Icon name="UserPlus" className="h-8 w-8" />
                    <span>Пользователь</span>
                  </Button>
                  <Button
                    variant="outline"
                    className="h-24 flex-col gap-2"
                    onClick={() => setActiveSection('analytics')}
                  >
                    <Icon name="FileText" className="h-8 w-8" />
                    <span>Отчет</span>
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
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
