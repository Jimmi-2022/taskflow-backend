Backend:
    [] Express.js
    [] PostgreSQL
    [] Prisma
    [] JWT

Endpoints:
    [] Аутентификация
        [POST] /api/auth/register: Регистрация пользователя
        [POST] /api/auth/login: Вход пользователя
        [GET] /api/auth/user: Получение информации о текущем пользователе
    [] Пользователи
        [GET] /api/users: Получение списка пользователей
        [GET] /api/users/:id: Получение информации о конкретном пользователе
        [PUT] /api/users/:id: Обновление информации о пользователе
        [DELETE] /api/users/:id: Удаление пользователя
    [] Сообщения
        [GET] /api/messages: Получение всех сообщений (входящие, исходящие, непрочитанные)
        [POST] /api/messages: Отправка сообщения
        [GET] /api/messages/:id: Получение деталей конкретного сообщения
        [DELETE] /api/messages/:id: Удаление сообщения
    [] Проекты
        [GET] /api/projects: Получение списка проектов
        [POST] /api/projects: Создание нового проекта
        [GET] /api/projects/:id: Получение информации о конкретном проекте
        [PUT] /api/projects/:id: Обновление информации о проекте
        [DELETE] /api/projects/:id: Удаление проекта
    [] Задачи
        [GET] /api/tasks: Получение списка задач
        [POST] /api/tasks: Создание новой задачи
        [GET] /api/tasks/:id: Получение информации о конкретной задаче
        [PUT] /api/tasks/:id: Обновление информации о задаче
        [DELETE] /api/tasks/:id: Удаление задачи
    [] Расписание
        [GET] /api/schedule: Получение расписания событий и задач
        [POST] /api/schedule: Создание нового события
        [GET] /api/schedule/:id: Получение информации о конкретном событии
        [PUT] /api/schedule/:id: Обновление информации о событии
        [DELETE] /api/schedule/:id: Удаление события
    [] Активность
        [GET] /api/activity: Получение ленты активности пользователей и проектов
    [] Команда
        [GET] /api/team: Получение списка участников команды
        [GET] /api/team/:id: Получение информации о конкретном участнике
        [PUT] /api/team/:id: Обновление информации о участнике
        [DELETE] /api/team/:id: Удаление участника
    [] Настройки
        [GET] /api/settings: Получение настроек приложения
        [PUT] /api/settings: Обновление настроек приложения


Frontend:
    [] React
    [] Axios
    [] TanStack Query
    [] SCSS


Страницы:
[] Главная страница: Основная информация и навигация по разделам.
[] Панель управления (Dashboard): Обзор активности и статистики.
[] Сообщения:
[] Обзор всех сообщений (входящие, исходящие, непрочитанные).
[] Детали конкретного чата.
[] Проекты:
[] Список проектов.
[] Детали конкретного проекта.
[] Мои задачи:
[] Список задач по категориям (Backlog, To Do, In Progress, Done).
[] Детали конкретной задачи.
[] Расписание:
[] Календарь событий и задач.
[] Детали конкретного события.
[] Активность: Лента активности пользователей и проектов.
[] Моя команда:
[] Список участников команды.
[] Детали конкретного участника.
[] Профиль пользователя: Информация о пользователе, настройки.
[] Настройки: Настройки приложения и учетной записи.

Компоненты:
[] Главная страница
    [] Header
    [] Navigation
    [] MainContent
    [] Footer
[] Панель управления (Dashboard)
    [] ActivityOverview
    [] Statistics
    [] RecentTasks
    [] RecentMessages
[] Сообщения
    [] Обзор всех сообщений
        [] MessageList
        [] MessageFilter
        [] MessageSummary
    [] Детали конкретного чата
        [] ChatHeader
        [] ChatMessages
        [] ChatInput
[] Проекты
    [] Список проектов
        [] ProjectList
        [] ProjectFilter
        [] ProjectSummary
    [] Детали конкретного проекта
        [] ProjectDetails
        [] ProjectTasks
        [] ProjectMembers
        [] ProjectActivity
[] Мои задачи
    [] Список задач по категориям
        [] TaskList
        [] TaskFilter
        [] TaskCategory
    [] Детали конкретной задачи
        [] TaskDetails
        [] TaskComments
        [] TaskAttachments
[] Расписание
    [] Календарь событий и задач
        [] Calendar
        [] EventList
        [] EventFilter
    [] Детали конкретного события
        [] EventDetails
        [] EventParticipants
        [] EventAttachments
[] Активность
    [] ActivityFeed
    [] ActivityItem
    [] ActivityFilter
[] Моя команда
    [] Список участников команды
        [] TeamList
        [] TeamFilter
        [] TeamMemberSummary
    [] Детали конкретного участника
        [] MemberDetails
        [] MemberTasks
        [] MemberActivity
[] Профиль пользователя
    [] UserProfile
    [] UserSettings
    [] UserActivity
[] Настройки
    [] GeneralSettings
    [] NotificationSettings
    [] PrivacySettings
    [] AccountSettings