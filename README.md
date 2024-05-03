# Тестовое задание для стажировки в Авито | Avito Internship Test Task

## Technologies

- React ^18.2
- react-router-dom v6
- TypeScript
- Webpack
- axios
- Docker
- Ant-Design
- Node.js 18
- пакетный менеджер: npm

## Приложение | App

![alt text](images/app_screen.png)

## Установка и запуск | Installation and Launch

Установка зависимостей | To install dependencies:

```
npm install
```

Запуск проекта | To start the project:

```
TOKEN=<ваш токен> npm run start
```

## Развернуть Docker контейнер | Deploying the Docker Container:


Сборка образа (из директории репозитория) | Building the image (from the repository directory):

```
docker build -t avito-app .
```

Запуска контейнера с токеном | Starting the container with a token:

```
docker run -p 7070:7070 avito-app
```

## Реализованный функционал |  Implemented Features:

### На странице со списком всех фильмов | On the page with a list of all movies:

- Отображается список фильмов и сериалов
- Реализована пагинация
- Можно выбрать количество фильмов для показа на странице (по умолчанию должно быть 10)
- Можно отфильтровать выдачу (по году, стране и возрастному рейтингу)
- Реализован поиск по названию фильма
- Можно перейти на страницу фильма из выдачи

- Возможность поделиться результатами выдачи с другими пользователями через копирование ссылки
- Сохраняется история поиска
- При вводе нового названия появляется suggest с предложениями из ранее введенных значений
- При вводе значений происходит фильтрация подсказок по вхождению

- A list of movies and TV shows is displayed
- Pagination is implemented
- You can select the number of films to show per page (default should be 10)
- You can filter the output (by year, country, and age rating)
- Movie title search is implemented
- You can navigate to the movie page from the list

- Ability to share search results with others by copying the URL
- Search history is preserved
- Suggest appears with suggestions from previously entered values when entering a new title
- Entering values triggers filtering of suggestions by inclusion

### На странице с отдельным фильмом | On the page of an individual movie:

Отображается информация о фильме или сериале, в том числе:

- название фильма/сериала
- описание
- рейтинг
- список актёров (с пагинацией, если их больше 10);
- список сезонов и серий (с пагинацией, если они подразумеваются)
- отзывы пользователей (с пагинацией)
- постеры, отображение которых реализовано в виде «карусели»

- Реализован вывод списка фильмов, похожих на текущий, в виде «карусели». По каждому элементу можно кликнуть и открыть его страницу
- В случае, если какой-то из списков пустой (список отзывов, актёров, сезонов), реализовано отображение заглушки на подобие «нет информации о ...»
- Реализована кнопка «назад», которая ведет на выдачу. Фильтры и номер страницы при этом должны сохраняться.

- Реализована авторизация
- Страница с рандомным фильмом доступна только после авторизации

The following movie or TV show information is displayed:

- Movie/TV show title
- Description
- Rating
- List of actors (with pagination if more than 10);
- List of seasons and episodes (with pagination, if any)
- User reviews (with pagination)
- Posters displayed in a "carousel" format

- A "carousel" display of a list of movies similar to the current one is implemented. You can click on each element to open its page
- If any of the lists are empty (reviews, actors, seasons), a placeholder like "no information about ..." is displayed
- A "back" button is implemented, which leads back to the search. Filters and page number should be preserved

- Authentication is implemented
- A page with a random movie is only available after authentication

### Нефункциональные требования |  Non-Functional Requirements:

- Реализован адаптивный интерфейс
- Роутинг выполнен с использованием React Router v6
- При переходах по ссылкам страница не перезагружается
- Запуск проекта в режиме разработчика должен происходить по команде TOKEN=<your api token> npm run start ; проект должен быть доступен по ссылке http://localhost:7070

- Используется TypeScript
- Есть docker-файл для запуска
- Реализация возможности выполнения трёх попыток повторного запроса, если запрос был неудачным

- An adaptive interface is implemented
- Routing is carried out using React Router v6
- The page does not reload when navigating through links
- The project is launched in developer mode with the command TOKEN=<your API token> npm run start; the project should be accessible via the link http://localhost:7070

- TypeScript is used
- There is a Docker file for launching
- The possibility of three retry attempts for the request is implemented if the request was unsuccessful

## Примеры запросов | Sample Requests:

Получение всех фильмов для главной страницы | Getting all movies for the main page:     
```
curl --request GET \
     --url 'https://api.kinopoisk.dev/v1.4/movie?page=1&limit=10' \
     --header 'X-API-KEY: token' \
     --header 'accept: application/json'
```

Получение фильмов с нужными полями и использованием фильтра по году | Getting movies with the required fields using a filter by year:
```
curl --request GET \
     --url 'https://api.kinopoisk.dev/v1.4/movie?page=1&limit=10&selectFields=id&selectFields=name&selectFields=year&selectFields=poster&year=2022' \
     --header 'token' \
     --header 'accept: application/json'
```
Пример ответа | Response example:
```
{
  "docs": [
    {
      "id": 5079093,
      "name": "Монастырь",
      "poster": {
        "url": "https://image.openmoviedb.com/kinopoisk-images/4774061/ce90ef63-3c81-4aa7-95f0-f5bbe5123484/orig",
        "previewUrl": "https://image.openmoviedb.com/kinopoisk-images/4774061/ce90ef63-3c81-4aa7-95f0-f5bbe5123484/x1000"
      },
      "year": 2022
    },
    {
      "id": 927898,
      "name": "Переводчик",
      "year": 2022,
      "poster": {
        "url": "https://image.openmoviedb.com/kinopoisk-images/1898899/5c775217-8796-4c7a-aba8-e4c6d48a6c36/orig",
        "previewUrl": "https://image.openmoviedb.com/kinopoisk-images/1898899/5c775217-8796-4c7a-aba8-e4c6d48a6c36/x1000"
      }
    },
    ...,
    ...,
  ]
}

```

Получение фильма по id | Getting a movie by id:
```
curl --request GET \
     --url https://api.kinopoisk.dev/v1.4/movie/26278 \
     --header 'X-API-KEY: token' \
     --header 'accept: application/json'
```

Поиск фильма по названию:
```
curl --request GET \
     --url 'https://api.kinopoisk.dev/v1.4/movie/search?page=1&limit=10&query=везение' \
     --header 'X-API-KEY: token' \
     --header 'accept: application/json'
```


## Нюансы разработки | Development Nuances

В API отсутствует метод для одновременного выполнения поисковых запросов по заголовку и фильтрации результатов. Также часто сервис был недоступен, что затрудняло разработку.

The API lacks a method for simultaneously performing search queries by title and filtering results. The service was often unavailable, which complicated development.

