
export enum ProfileType {
  Dominancia = 'Dominância',
  Influencia = 'Influência',
  Estabilidade = 'Estabilidade',
  Conformidade = 'Conformidade',
}

export interface Question {
  id: number;
  text: string;
  options: {
    [key: string]: string;
  };
}

export type ResultsData = {
  [key in ProfileType]: number;
};
