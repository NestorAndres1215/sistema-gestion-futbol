export type MatchCardProps = {
    homeTeam: string;
    homeImage: string;
    awayTeam: string;
    awayImage: string;
    homeScore?: number;
    awayScore?: number;
    referee: string;
    time: string;
    status: string;
    detailHref?: string;
    onHomeScoreChange?: (value: number | undefined) => void;
    onAwayScoreChange?: (value: number | undefined) => void;
};