# Деплой mobileax-next на сервер 159.194.200.142

## Поддомен: shop.basestock.ru → порт 3001

---

## Первоначальная настройка

### 1. DNS A-запись

В панели DNS добавить:
```
shop.basestock.ru  A  159.194.200.142
```

Проверка: `dig +short shop.basestock.ru` → должен вернуть `159.194.200.142`.

---

### 2. Клонировать репозиторий на сервер

```bash
mkdir -p /opt/mobileax
cd /opt/mobileax
git clone <repo-url> .
```

---

### 3. Скопировать nginx-конфиг в phonebase nginx

Phonebase nginx сейчас монтирует только один файл:
```
./docker/nginx.conf → /etc/nginx/conf.d/default.conf
```

Нужно **добавить volume** в `/opt/phonebase/docker-compose.yml` для нашего конфига:

```yaml
nginx:
  volumes:
    - ./docker/nginx.conf:/etc/nginx/conf.d/default.conf:ro
    - /opt/mobileax/docker/nginx-shop.conf:/etc/nginx/conf.d/shop.basestock.ru.conf:ro
    - /etc/letsencrypt:/etc/letsencrypt:ro
    - /var/www/certbot:/var/www/certbot:ro
    - ./frontend/dist:/usr/share/nginx/html:ro
    - media_files:/app/media:ro
    - ./ssl:/etc/ssl/certs:ro
```

После правки — перезапустить nginx:
```bash
cd /opt/phonebase
docker compose up -d nginx
```

**Важно**: это изменение нужно закоммитить в phonebase репозиторий.

---

### 4. Получить SSL-сертификат (Let's Encrypt)

Certbot должен быть установлен на хосте:
```bash
apt install certbot -y

# Убедиться что /var/www/certbot доступен через nginx (challenge работает на http)
certbot certonly --webroot -w /var/www/certbot -d shop.basestock.ru
```

Сертификат появится в `/etc/letsencrypt/live/shop.basestock.ru/`.

Автообновление — проверить есть ли cron/systemd timer:
```bash
systemctl list-timers | grep certbot
```

---

### 5. Установить deploy-скрипт

```bash
cp /opt/mobileax/scripts/mobileax.sh /usr/local/bin/mobileax
chmod +x /usr/local/bin/mobileax
```

---

### 6. Первый запуск

```bash
mobileax restart
```

Проверка:
```bash
mobileax status
mobileax logs
curl -I http://127.0.0.1:3001
```

---

## Переменные окружения

Контейнер читает `/opt/phonebase/.env` (общий файл всего сервера).

Переменные которые должны быть там (или дополнительно задать в `docker-compose.yml`):
```
NEXT_PUBLIC_STORE_ID=<id магазина>
NEXT_PUBLIC_PHONEBASE_API=https://basestock.ru
```

`NEXT_PUBLIC_SITE_ID=mobileax` задан жёстко в docker-compose.

---

## Повседневные команды

```bash
mobileax update       # git pull
mobileax build        # пересобрать образ
mobileax restart      # пересобрать и перезапустить
mobileax logs         # хвост логов
mobileax status       # статус контейнера
mobileax reload-nginx # перезагрузить nginx (после правок конфига)
```

---

## Структура портов

| Сервис      | Порт хоста | Порт контейнера | Внешний доступ          |
|-------------|------------|-----------------|-------------------------|
| mobileax-web | 3001      | 3000            | через nginx → shop.basestock.ru |
| phonebase    | 8000      | 8000            | через nginx → basestock.ru/api  |

---

## Примечания

- `output: 'standalone'` в `next.config.mjs` — обязателен для Docker-сборки
- Healthcheck: `GET /api/health` каждые 30s, таймаут 5s, 3 retry
- Контейнер работает от непривилегированного пользователя `nextjs` (uid 1001)
