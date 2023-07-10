import { UserInterface } from 'interfaces/user';
import { LabelInterface } from 'interfaces/label';
import { GetQueryInterface } from 'interfaces';

export interface MusicInterface {
  id?: string;
  title: string;
  artist_id?: string;
  label_id?: string;
  created_at?: any;
  updated_at?: any;

  user?: UserInterface;
  label?: LabelInterface;
  _count?: {};
}

export interface MusicGetQueryInterface extends GetQueryInterface {
  id?: string;
  title?: string;
  artist_id?: string;
  label_id?: string;
}
