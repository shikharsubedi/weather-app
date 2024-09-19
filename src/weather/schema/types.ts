export type rawInput = string | null | undefined;

export type validInput = {
  lat: number;
  lon: number;
};

export type tempType = 'hot' | 'moderate' | 'cold';

export type alertType = {
  start: string;
  end: string;
  description: string;
  event: string;
};
