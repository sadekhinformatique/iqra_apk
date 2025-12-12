# Déploiement sur Netlify - RADIO IQRA BF

## ✅ Application Prête pour Netlify

L'application RADIO IQRA BF est maintenant compatible avec le déploiement sur Netlify tout en conservant ses fonctionnalités mobiles (Android/iOS).

## 🌐 Déployer sur Netlify

### Option 1: Déploiement Automatique (Recommandé)

1. **Connectez-vous à Netlify**: https://app.netlify.com

2. **Nouveau site depuis Git**:
   - Cliquez sur "Add new site" → "Import an existing project"
   - Choisissez "GitHub"
   - Sélectionnez le repository: `sadekhinformatique/iqra_apk`

3. **Configuration automatique**:
   - Netlify détectera automatiquement `netlify.toml`
   - Build command: `npx expo export -p web`
   - Publish directory: `dist`
   - Cliquez sur "Deploy site"

4. **Attendez le build** (2-3 minutes)

5. **Votre site est en ligne!** 🎉
   - URL: `https://[nom-aleatoire].netlify.app`
   - Vous pouvez personnaliser le nom dans les paramètres

### Option 2: Déploiement Manuel

```bash
# Installer Netlify CLI
npm install -g netlify-cli

# Se connecter
netlify login

# Construire l'application
npx expo export -p web

# Déployer
netlify deploy --prod --dir=dist
```

## 📱 Fonctionnalités

### Sur Web (Netlify)
- ✅ Streaming radio en direct
- ✅ Contrôles de lecture (play/pause)
- ✅ Contrôle du volume
- ✅ Visualiseur audio animé
- ✅ Interface responsive (desktop/mobile)
- ✅ Thème sombre

### Sur Mobile (Android/iOS)
- ✅ Toutes les fonctionnalités web +
- ✅ Lecture en arrière-plan
- ✅ Contrôles sur l'écran de verrouillage
- ✅ Application native

## 🔧 Configuration Technique

### Fichiers Créés

1. **netlify.toml** - Configuration Netlify
2. **metro.config.js** - Configuration Metro bundler
3. **RadioService.js** - Service audio multi-plateforme
   - Web: HTML5 Audio API
   - Mobile: Expo AV

### Dépendances Ajoutées

```json
{
  "react-dom": "18.3.1",
  "react-native-web": "~0.19.13",
  "@expo/metro-runtime": "~4.0.1"
}
```

## 🧪 Tester Localement

### Web
```bash
# Démarrer le serveur web
npm run web

# Ou construire et servir
npx expo export -p web
npx serve dist
```

### Mobile
```bash
# Android
npm run android

# iOS
npm run ios

# Expo Go
npm start
```

## 📊 Build Info

- **Modules**: 428
- **Bundle size**: 1.02 MB
- **Assets**: 20 fichiers (logos, polices)
- **Plateformes**: Web, Android, iOS

## 🚀 Prochaines Étapes

1. **Personnaliser le domaine**:
   - Dans Netlify: Domain settings → Add custom domain

2. **Activer HTTPS**:
   - Automatique avec Netlify

3. **Configurer les variables d'environnement** (si nécessaire):
   - Site settings → Environment variables

## 🔗 Liens Utiles

- **Repository GitHub**: https://github.com/sadekhinformatique/iqra_apk
- **Netlify Dashboard**: https://app.netlify.com
- **Expo Docs**: https://docs.expo.dev

## ⚠️ Notes Importantes

- Le build web prend 2-3 minutes sur Netlify
- Le streaming fonctionne sur tous les navigateurs modernes
- Les contrôles de verrouillage sont uniquement disponibles sur mobile
- L'application mobile reste inchangée et fonctionnelle

## 🎵 Stream Radio

URL du stream: `https://stream.caster.fm/a092f64f-8e5f-4a70-ae42-0347517df896`

Pour changer le stream, modifiez `src/services/RadioService.js`.
