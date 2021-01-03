// export interface Todo {
//   id: number;
//   content: string;
// }

// export interface Meta {
//   totalCount: number;
// }

interface Covid {
  Confirmed: string,
  Date?: string,
  Deaths: string,
  Hospitalized: string,
  NewConfirmed: string,
  NewDeaths: string,
  NewHospitalized: string,
  NewRecovered: string,
  Recovered: string,
}

interface General {
  DevBy: string,
  SeverBy: string,
  Source: string,
  UpdateDate: string
}

export interface Summary extends Covid, General {}

export interface Daily extends General {
  Data: [Covid]
}