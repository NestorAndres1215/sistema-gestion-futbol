export type Team = {
  id: number;
  position: number;
  name: string;
  image: string;
  pj: number;
  pg: number;
  pe: number;
  pp: number;
  gf: number;
  gc: number;
  dg: number;
  pts: number;
};

export type GroupTableProps = {
  title: string;
  teams: Team[];
  qualifiedTeams?: number;
  playoffTeams?: number;
};