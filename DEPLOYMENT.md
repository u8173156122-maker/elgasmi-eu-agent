# Elgasmi.e.U - Guide de Deploiement Multi-Plateformes

## Prerequis
- Node.js 20+
- Git
- Compte sur chaque plateforme

---

## 1. RAILWAY (Recommande - Simple et rapide)

### Creer un compte
1. Aller sur https://railway.app
2. Cliquer "Login" -> "Login with GitHub"
3. Autoriser Railway

### Deployer
```bash
# Installer Railway CLI
npm install -g @railway/cli

# Se connecter
railway login

# Initialiser le projet
cd C:/Users/Asmae/elgasmi-eu
railway init

# Deployer
railway up

# Ajouter les variables d'environnement
railway variables set DATABASE_URL="votre_url"
railway variables set JWT_SECRET="votre_secret"
railway variables set BUILT_IN_FORGE_API_KEY="votre_cle_openai"
```

**URL**: https://elgasmi-eu.up.railway.app

---

## 2. RENDER (Gratuit avec limitations)

### Creer un compte
1. Aller sur https://render.com
2. Cliquer "Get Started for Free"
3. S'inscrire avec GitHub

### Deployer
1. Dashboard -> "New" -> "Web Service"
2. Connecter votre repo GitHub
3. Configurer:
   - **Name**: elgasmi-eu
   - **Region**: Frankfurt
   - **Branch**: main
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
4. Ajouter les variables d'environnement
5. Cliquer "Create Web Service"

**URL**: https://elgasmi-eu.onrender.com

---

## 3. VERCEL (Ideal pour frontend)

### Creer un compte
1. Aller sur https://vercel.com
2. Cliquer "Sign Up" -> "Continue with GitHub"

### Deployer
```bash
# Installer Vercel CLI
npm install -g vercel

# Se connecter
vercel login

# Deployer
cd C:/Users/Asmae/elgasmi-eu
vercel

# Pour la production
vercel --prod
```

Ou via le dashboard:
1. "Add New" -> "Project"
2. Importer votre repo GitHub
3. Configurer les variables d'environnement
4. Deploy

**URL**: https://elgasmi-eu.vercel.app

---

## 4. NETLIFY (Ideal pour JAMstack)

### Creer un compte
1. Aller sur https://netlify.com
2. Cliquer "Sign up" -> "GitHub"

### Deployer
```bash
# Installer Netlify CLI
npm install -g netlify-cli

# Se connecter
netlify login

# Initialiser
cd C:/Users/Asmae/elgasmi-eu
netlify init

# Deployer
netlify deploy --prod
```

Ou via le dashboard:
1. "Add new site" -> "Import an existing project"
2. Connecter GitHub
3. Selectionner le repo
4. Build settings sont automatiques (netlify.toml)

**URL**: https://elgasmi-eu.netlify.app

---

## 5. AWS (Enterprise - Plus complexe)

### Creer un compte
1. Aller sur https://aws.amazon.com
2. Cliquer "Create an AWS Account"
3. Suivre les etapes (carte bancaire requise)

### Option A: Elastic Beanstalk (Simple)
```bash
# Installer AWS CLI et EB CLI
pip install awscli awsebcli

# Configurer AWS
aws configure
# Entrer Access Key, Secret Key, Region (eu-central-1)

# Initialiser EB
cd C:/Users/Asmae/elgasmi-eu
eb init elgasmi-eu --platform node.js --region eu-central-1

# Creer l'environnement
eb create elgasmi-eu-prod

# Deployer
eb deploy
```

### Option B: ECS avec Fargate (Production)
```bash
# Creer le repository ECR
aws ecr create-repository --repository-name elgasmi-eu --region eu-central-1

# Login ECR
aws ecr get-login-password --region eu-central-1 | docker login --username AWS --password-stdin YOUR_ACCOUNT_ID.dkr.ecr.eu-central-1.amazonaws.com

# Build et push
docker build -t elgasmi-eu .
docker tag elgasmi-eu:latest YOUR_ACCOUNT_ID.dkr.ecr.eu-central-1.amazonaws.com/elgasmi-eu:latest
docker push YOUR_ACCOUNT_ID.dkr.ecr.eu-central-1.amazonaws.com/elgasmi-eu:latest

# Creer le cluster ECS
aws ecs create-cluster --cluster-name elgasmi-cluster

# Creer le service (utiliser aws-ecs-task-definition.json)
aws ecs register-task-definition --cli-input-json file://aws-ecs-task-definition.json
aws ecs create-service --cluster elgasmi-cluster --service-name elgasmi-service --task-definition elgasmi-eu --desired-count 1 --launch-type FARGATE
```

---

## 6. VPS (DigitalOcean, Hetzner, OVH)

### Creer un compte
- DigitalOcean: https://digitalocean.com
- Hetzner: https://hetzner.com
- OVH: https://ovh.com

### Deployer sur VPS
```bash
# Se connecter au VPS
ssh root@votre_ip

# Installer Node.js
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# Installer Docker
curl -fsSL https://get.docker.com | sh

# Cloner le projet
git clone https://github.com/votre-username/elgasmi-eu.git
cd elgasmi-eu

# Configurer les variables
cp .env.example .env
nano .env  # Editer les valeurs

# Deployer avec Docker
docker-compose up -d --build

# Configurer Nginx (optionnel)
sudo apt install nginx
sudo nano /etc/nginx/sites-available/elgasmi-eu
```

Configuration Nginx:
```nginx
server {
    listen 80;
    server_name elgasmi.eu www.elgasmi.eu;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

```bash
# Activer le site
sudo ln -s /etc/nginx/sites-available/elgasmi-eu /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx

# SSL avec Certbot
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d elgasmi.eu -d www.elgasmi.eu
```

---

## Variables d'Environnement Requises

| Variable | Description |
|----------|-------------|
| `DATABASE_URL` | URL de connexion MySQL |
| `JWT_SECRET` | Cle secrete pour JWT |
| `ENCRYPTION_KEY` | Cle de chiffrement |
| `BUILT_IN_FORGE_API_URL` | https://api.openai.com |
| `BUILT_IN_FORGE_API_KEY` | Cle API OpenAI |
| `ALLOWED_ORIGINS` | https://elgasmi.eu |

---

## Domaine Personnalise

Pour chaque plateforme, ajouter un enregistrement DNS:
- **Type A**: `@` -> IP du serveur
- **Type CNAME**: `www` -> votre-app.platform.app

---

## Support

- Email: asmaewarter5@gmail.com
- WhatsApp: +43 681 2046 0618
