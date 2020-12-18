import {synchronize} from '@nozbe/watermelondb/sync';
import {getMockData} from './mock';

export function dbSync(database) {
  return () => {
    return synchronize({
      database,
      pullChanges: async ({lastPulledAt, schemaVersion, migration}) => {
        try {
          const response = await fetch(`https://my.backend/sync`, {
            body: JSON.stringify({lastPulledAt, schemaVersion, migration}),
          });
          if (!response.ok) {
            throw new Error(await response.text());
          }
          const {changes, timestamp} = await response.json();
          return {changes, timestamp};
        } catch (e) {}

        return {changes: getMockData(), timestamp: new Date().valueOf()};
      },
      pushChanges: async ({changes, lastPulledAt}) => {
        try {
          const response = await fetch(
            `https://my.backend/sync?last_pulled_at=${lastPulledAt}`,
            {
              method: 'POST',
              body: JSON.stringify(changes),
            },
          );
          if (!response.ok) {
            throw new Error(await response.text());
          }
        } catch (e) {}
      },
      migrationsEnabledAtVersion: 1,
    });
  };
}
