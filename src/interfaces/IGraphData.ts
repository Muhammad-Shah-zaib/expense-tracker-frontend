export interface IGraphData {
  labels: string[];
  values: number[];
  interval: string;
  graphColor: string; // depend on transaction type (credit, debit, net)
}
