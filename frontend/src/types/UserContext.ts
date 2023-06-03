import { User } from '../types/User';

export interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
}