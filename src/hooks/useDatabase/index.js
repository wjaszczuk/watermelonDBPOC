import {useContext} from 'react';
import {DatabaseContext} from '../../components/DatabaseContext';

export function useDatabase() {
  return useContext(DatabaseContext);
}
