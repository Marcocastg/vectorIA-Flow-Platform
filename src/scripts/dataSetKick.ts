import { PrismaClient } from '@prisma/client';

// Inicializa el cliente de Prisma
const prisma = new PrismaClient();

// Una función de ayuda para esperar entre peticiones y evitar ser bloqueado por la API de Kick
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

async function main() {
  console.log('Iniciando script para actualizar seguidores...');

  // 1. Obtener todos los canales de tu base de datos
  const channelsToUpdate = await prisma.dataSetKick.findMany({
    select: {
      uuid: true,
      channelName: true,
    },
  });

  console.log(`Se encontraron ${channelsToUpdate.length} canales para actualizar.`);

  // 2. Recorrer cada canal uno por uno
  for (const channel of channelsToUpdate) {
    // Asegurarse de que el nombre del canal no sea nulo o vacío
    if (!channel.channelName) {
      console.log(`- Saltando canal con UUID ${channel.uuid} por no tener nombre.`);
      continue;
    }

    const channelName = channel.channelName;
    console.log(`- Procesando canal: ${channelName}`);

    try {
      // 3. Hacer la llamada a la API de Kick
      const response = await fetch(`https://kick.com/api/v2/channels/${channelName}`);

      if (!response.ok) {
        // Si la respuesta no es exitosa (ej. 404 Not Found), lo reportamos y continuamos
        console.error(`  -> Error al obtener datos para ${channelName}. Status: ${response.status}`);
        continue; // Salta al siguiente canal del bucle
      }

      const kickData = await response.json();
      const followersCount = kickData.followers_count;

      if (followersCount !== undefined && followersCount !== null) {
        // 4. Actualizar la base de datos con el nuevo número de seguidores
        await prisma.dataSetKick.update({
          where: {
            uuid: channel.uuid,
          },
          data: {
            totalFollowers: followersCount,
          },
        });
        console.log(`  -> ¡Éxito! ${channelName} actualizado a ${followersCount} seguidores.`);
      } else {
        console.warn(`  -> No se encontró 'followers_count' en la respuesta para ${channelName}.`);
      }

    } catch (error) {
      console.error(`  -> Fallo crítico al procesar ${channelName}:`, error);
    }

    // 5. Esperar un poco antes de la siguiente petición para no saturar la API de Kick
    await sleep(500); // Espera de 500 milisegundos (medio segundo)
  }

  console.log('Script finalizado.');
}

// Ejecuta la función principal y asegúrate de desconectar el cliente de Prisma al final
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });