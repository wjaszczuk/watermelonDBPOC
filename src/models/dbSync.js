import {synchronize} from '@nozbe/watermelondb/sync';
import {getMockData} from './mock';

export function dbSync(database) {
  return () => {
    return synchronize({
      database,
      pullChanges: async ({lastPulledAt, schemaVersion, migration}) => {
        return {changes: getMockData(), timestamp: new Date().valueOf()};
      },
      pushChanges: async ({changes, lastPulledAt}) => {
        console.log('Push changes', changes, lastPulledAt);
      },
      migrationsEnabledAtVersion: 1,
    });
  };
}
