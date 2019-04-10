# Урок по Docker Compose

## Запуск

Сборка и запуск

```
docker-compose build && docker-compose up
```

## API

Получить всех студентов

```
curl http://localhost/project/all
```

Добавить нового студента

```
curl -d '{"name":"maxim", "age": 18}' http://localhost/project/add
```

Отфильтровать по возрасту

```
curl http://localhost/project/filter?age=25
```

