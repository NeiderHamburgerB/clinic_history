export interface IUser {
  id: number;
  type_identification:string;
  nro_identification:string;
  email: string;
  password: string;
  telefono: string;
  roles: string;
  active:boolean;
  logged:boolean;
  created_at: Date;
}

export interface IUserSearch {
  email?: string;
  id?: number;
}

export interface valid {
  name: string;
  address: string;
  roles: string[];
  birthDate?: Date;
  medicalServices?: string[];
  hospital_id?:number;
}
