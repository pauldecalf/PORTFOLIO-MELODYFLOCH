const { spawn } = require('child_process');

console.log('🚀 Starting Melody Photography server...\n');

// Étape 1 : MongoDB Push (pas de migrations avec MongoDB)
console.log('📦 Step 1/4: Syncing database schema...');
const dbPush = spawn('npx', ['prisma', 'db', 'push', '--accept-data-loss'], { stdio: 'inherit' });

dbPush.on('close', (code) => {
  if (code !== 0) {
    console.error('❌ DB push failed, but continuing...');
  } else {
    console.log('✅ Database schema synced\n');
  }

  // Étape 2 : Seed (sans bloquer si ça échoue)
  console.log('🌱 Step 2/4: Seeding database (if needed)...');
  const seed = spawn('npm', ['run', 'db:seed-if-empty'], { stdio: 'inherit' });

  seed.on('close', (seedCode) => {
    if (seedCode !== 0) {
      console.warn('⚠️  Seed failed or skipped, continuing anyway...\n');
    } else {
      console.log('✅ Seed completed\n');
    }

    // Étape 3 : Nettoyage des fichiers orphelins
    console.log('🧹 Step 3/4: Cleaning orphaned files...');
    const cleanup = spawn('npm', ['run', 'db:clean-orphaned-files'], { stdio: 'inherit' });

    cleanup.on('close', (cleanupCode) => {
      if (cleanupCode !== 0) {
        console.warn('⚠️  Cleanup failed or skipped, continuing anyway...\n');
      } else {
        console.log('✅ Cleanup completed\n');
      }

      // Étape 4 : Démarrer Next.js (TOUJOURS, même si le nettoyage échoue)
      console.log('🎯 Step 4/4: Starting Next.js server...\n');
      const server = spawn('next', ['start'], { stdio: 'inherit' });

      server.on('close', (serverCode) => {
        process.exit(serverCode);
      });
    });
  });
});
