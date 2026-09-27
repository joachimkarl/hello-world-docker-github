# Hello World – Docker + nginx

Einfache statische Hello-World-Seite (HTML/CSS/JS), ausgeliefert über nginx im Docker-Container.

## Build

```bash
docker build -t hello-world-nginx .
```

## Run

```bash
docker run -d -p 8080:80 --name hello-world hello-world-nginx
```

Danach im Browser öffnen: http://localhost:8080

## Stoppen

```bash
docker stop hello-world && docker rm hello-world
```

## Projekt zu GitHub übertragen

```bash
git init
git add .
git commit -m "Initial commit: Hello World mit Docker"
git branch -M main
git remote add origin https://github.com/<dein-user>/<dein-repo>.git
git push -u origin main
```

Repo vorher auf github.com anlegen (ohne README/License, sonst gibt's einen Merge-Konflikt beim Push).

## GitHub Actions

Es liegen drei Workflows in `.github/workflows/`:

| Workflow | Trigger | Zweck |
|---|---|---|
| `build-push.yml` | Push auf `main` | Baut das Docker-Image und pusht es nach GitHub Container Registry (GHCR) |
| `deploy-ssh.yml` | Nach erfolgreichem Build | Pullt das Image auf einem eigenen Server per SSH und startet den Container neu |
| `deploy-helm.yml` | Nach erfolgreichem Build | Deployt das Image via Helm auf einen Kubernetes-Cluster |

Die Build-Workflow läuft immer. Die beiden Deploy-Workflows sind unabhängig voneinander – nutze den, der zu deiner Infrastruktur passt, und lösche/deaktiviere den anderen.

### Benötigte Secrets (Repo → Settings → Secrets and variables → Actions)

**Für `deploy-ssh.yml`:**
- `SSH_HOST` – IP/Hostname des Servers
- `SSH_USER` – SSH-Benutzer
- `SSH_PRIVATE_KEY` – privater SSH-Key (passend zum Public Key auf dem Server)
- `SSH_PORT` – optional, Standard 22
- `GHCR_TOKEN` – Personal Access Token mit `read:packages`-Recht, damit der Server das Image pullen kann

**Für `deploy-helm.yml`:**
- `KUBE_CONFIG` – Base64-kodierte kubeconfig für den Ziel-Cluster (`cat ~/.kube/config | base64`)

`GITHUB_TOKEN` für den Build/Push-Workflow wird automatisch von GitHub bereitgestellt, dafür ist nichts einzurichten.

### Helm Chart lokal testen

```bash
helm install hello-world ./helm/hello-world --set image.repository=ghcr.io/<dein-user>/<dein-repo> --set image.tag=latest
```
