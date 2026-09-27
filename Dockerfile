FROM nginx:alpine

# Eigene nginx-Konfiguration einspielen
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Statische Dateien in das nginx-Webroot kopieren
COPY index.html style.css script.js /usr/share/nginx/html/

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
