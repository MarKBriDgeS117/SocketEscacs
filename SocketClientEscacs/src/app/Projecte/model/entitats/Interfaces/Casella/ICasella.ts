import { Peça } from "../../Implementations/Peça/peça";


export interface ICasella {
  id: string;
  fila: number;
  columna: number;
  peca?: Peça;
  color?: string;
  contePeca?: boolean;

  setPeça(peça: Peça): void;
}