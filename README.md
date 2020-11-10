
## О проекте:
Учебный проект в ЯндексПрактикуме по основам бэкэнда (node.js) - промежуточный этап изучения node.js.
Тема аутентификация и авторизация. Подробнее в разделе "Добавленный в данной работе функционал".
Итоговые наработки по node.js в репозитории https://github.com/Itauiti/mesto_deploy 

## Основной функционал: 
1. Создан сервер для проекта Mesto (вебпак проекта https://github.com/Itauiti/webpack-project.git)
2. Работа с БД - MongoDB (включая связи между схемами), аутентификации/авторизации
3. Роуты: 
- GET /users — возвращает всех пользователей
- GET /users/:userId - возвращает пользователя по _id
- POST /users — создаёт пользователя
- GET /cards — возвращает все карточки
- POST /cards — создаёт карточку
- DELETE /cards/:cardId — удаляет карточку по идентификатору
- PATCH /users/me — обновляет профиль
- PATCH /users/me/avatar — обновляет аватар
- PUT /cards/:cardId/likes — поставить лайк карточке
- DELETE /cards/:cardId/likes — убрать лайк с карточки

## Добавленный в данной работе функционал:
- поле email уникально и валидируется;
- в контроллере createUser почта и хеш пароля записываются в базу;
- есть контроллер login, он проверяет, полученные в теле запроса почту и пароль;
- если почта и пароль верные, контроллер login создаёт JWT, в пейлоуд которого записано свойство _id с идентификатором пользователя; срок жизни токена — 7 дней;
- если почта и пароль верные, контроллер login возвращает созданный токен в ответе;
- если почта и пароль не верные, контроллер login возвращает ошибку 401;
- в app.js есть обработчики POST-запросов на роуты /signin и /signup;
- есть файл middlewares/auth.js, в нём мидлвэр для проверки JWT;
- при правильном JWT авторизационный мидлвэр добавляет в объект запроса пейлоуд и пропускает запрос дальше;
- при неправильном JWT авторизационный мидвэр возвращает ошибку 401;
- все роуты, кроме /signin и /signup, защищены авторизацией;
- пользователь не может удалить карточку, которую он не создавал;
- API не возвращает хеш пароля;
- пользователь не может редактировать чужой профиль и не может менять чужой аватар.

## Стэк технологий:
Node.js, express.js, MongoDBб, ES6, OOP, CSS3, HTML5, BEM

## Пакеты, которые используются в сборках:
- [body-parser](https://www.npmjs.com/package/body-parser)
- [express](https://expressjs.com)
- [validator](https://www.npmjs.com/package/validator)
- [helmet](https://helmetjs.github.io/)
- [express-rate-limit](https://www.npmjs.com/package/express-rate-limit)
- [bcryptjs](https://www.npmjs.com/package/bcryptjs)
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)
- [cookie-parser](https://www.npmjs.com/package/cookie-parser)
- mongoose

## Инструкции по запуску:
- Скачать или склонировать репозитори
- Установить зависимости при помощи npm - `npm i`
- Подключиться к mongo `npm i mongoose`
- Запустить сервер на localhost:3000 - `npm run start`
