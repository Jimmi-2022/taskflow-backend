Backend:
    [] Express.js
    [] PostgreSQL
    [] Prisma
    [] JWT

Endpoints:
    [X] Аутентификация
        [X] [POST] /api/auth/register: Регистрация пользователя
        [X] [POST] /api/auth/login: Вход пользователя
        [X] [GET] /api/auth/profile: Получение информации о текущем пользователе
    [] Пользователи
        [X] [GET] /api/users: Получение списка пользователей
        [X] [GET] /api/users/:id: Получение информации о конкретном пользователе
        [X] [PUT] /api/users/:id: Обновление информации о пользователе
        [X] [DELETE] /api/users/:id: Удаление пользователя
    [] Сообщения
        [X] [GET] /api/messages: Получение всех сообщений (входящие, исходящие, непрочитанные)
        [X] [DELETE] /api/messages: Удаление всех сообщений (входящие, исходящие, непрочитанные)
        [X] [POST] /api/messages: Отправка сообщения
        [X] [GET] /api/messages/:id: Получение деталей конкретного сообщения
        [X] [DELETE] /api/messages/:id: Удаление сообщения
    [] Проекты
        [X] [GET] /api/projects: Получение списка проектов
        [X] [POST] /api/projects: Создание нового проекта
        [X] [GET] /api/projects/:id: Получение информации о конкретном проекте
        [X] [PUT] /api/projects/:id: Обновление информации о проекте
        [X] [DELETE] /api/projects/:id: Удаление проекта
    [] Задачи
        [X] [GET] /api/tasks: Получение списка задач
        [X] [POST] /api/tasks: Создание новой задачи
        [X] [GET] /api/tasks/:id: Получение информации о конкретной задаче
        [X] [PUT] /api/tasks/:id: Обновление информации о задаче
        [X] [DELETE] /api/tasks/:id: Удаление задачи
    [] Расписание
        [] [GET] /api/schedule: Получение расписания событий и задач
        [] [POST] /api/schedule: Создание нового события
        [] [GET] /api/schedule/:id: Получение информации о конкретном событии
        [] [PUT] /api/schedule/:id: Обновление информации о событии
        [] [DELETE] /api/schedule/:id: Удаление события
    [] Активность
        [] [GET] /api/activity: Получение ленты активности пользователей и проектов
    [] Команда
        [X] [GET] /api/teams: Получение списка участников команды
        [X] [POST] /api/teams: Добавление комманды
        [X] [GET] /api/teams/:id: Получение информации о конкретном участнике
        [X] [PUT] /api/teams/:id: Обновление информации о участнике
        [X] [DELETE] /api/teams/:id: Удаление участника
        [X] [POST] /api/teams/:id/members: Добавление нового участника в команду
    [] Настройки
        [] [GET] /api/settings: Получение настроек приложения
        [] [PUT] /api/settings: Обновление настроек приложения


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