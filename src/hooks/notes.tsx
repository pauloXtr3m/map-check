import React, {
  createContext,
  useCallback,
  useState,
  useContext,
  useEffect,
} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { Alert } from 'react-native';
import * as Datefns from 'date-fns';
import uuidv4 from 'uuidv4';
import { useLocation } from './location';
import api from '../services/api';

export interface Note {
  id: string;
  latitude: number;
  longitude: number;
  annotation: string;
  datetime: string;
  sync: boolean;
}

interface NotesContextData {
  notes: Note[];
  loading: boolean;
  save(note: string): Promise<void>;
  sync(): Promise<void>;
}

const Notes = createContext<NotesContextData>({} as NotesContextData);

export const NotesProvider: React.FC = ({ children }) => {
  const [init, setInit] = useState(false);
  const [data, setData] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const { location } = useLocation();

  useEffect(() => {
    async function loadStorageData(): Promise<void> {
      const notes = await AsyncStorage.getItem('@Mapcheck:notes');

      if (notes) {
        setData(JSON.parse(notes));
      }

      setLoading(false);
    }

    if (!init) {
      setInit(true);
      loadStorageData();
    }
  }, [init, setInit]);

  const save = useCallback(
    async (note: string) => {
      setLoading(true);
      if (!location || !location.latitude || !location.longitude) {
        Alert.alert(
          'Sem acesso a localização',
          'Não foi possível salvar a nota, é necessário dar sua localização',
        );
        setLoading(false);
        return;
      }

      try {
        const { latitude, longitude } = location;

        const datetime = Datefns.format(
          new Date(Date.now()),
          'yyyy-MM-dd HH:mm:ss',
        );

        const annotation: Note = {
          id: uuidv4(),
          latitude,
          longitude,
          annotation: note,
          datetime,
          sync: false,
        };

        const newData = [...data, annotation];

        await AsyncStorage.setItem('@Mapcheck:notes', JSON.stringify(newData));

        setData(newData);
      } catch (e) {
        Alert.alert(
          'Não foi possível salvar a nota',
          'Não foi possível salvar a nota, tente novamente',
        );
        console.log(e);
      } finally {
        setLoading(false);
      }
    },
    [data, location],
  );

  const sync = useCallback(async () => {
    setLoading(true);
    const notesToSync = data.filter(note => !note.sync);

    const promisesSendNotes = notesToSync.map(async note => {
      const dataNote = { ...note, id: undefined, sync: undefined };

      return api.post('/', dataNote);
    });

    const newArray = [...data];

    const promisesSave = notesToSync.map(async note => {
      const index = data.indexOf(note);
      const newNote = { ...note, sync: true };

      newArray[index] = newNote;
      setData(newArray);

      return AsyncStorage.setItem('@Mapcheck:notes', JSON.stringify(newArray));
    });

    try {
      await Promise.all(promisesSendNotes);

      await Promise.all(promisesSave);
    } catch (e) {
      Alert.alert('Erro', 'Não foi possível salvar a nota, tente novamente');
      console.log(e);
    } finally {
      setLoading(false);
    }
  }, [data]);

  return (
    <Notes.Provider
      value={{
        notes: data,
        save,
        sync,
        loading,
      }}
    >
      {children}
    </Notes.Provider>
  );
};

export const useNotes = (): NotesContextData => {
  const context = useContext(Notes);

  if (!context) {
    throw new Error('useNotes must be used within an NotesProvider');
  }

  return context;
};
