#!/bin/bash
# mobileax — deploy команды для mobileax-next на сервере 159.194.200.142
set -e

cd /opt/mobileax

case "$1" in
  update)  git pull origin main ;;
  build)   docker compose build mobileax-web ;;
  restart) docker compose up -d --build mobileax-web ;;
  logs)    docker compose logs -f --tail=100 mobileax-web ;;
  status)  docker compose ps ;;
  reload-nginx) docker exec phonebase-nginx-1 nginx -s reload ;;
  *)       echo "Usage: mobileax {update|build|restart|logs|status|reload-nginx}" ;;
esac
