export interface Ientry {
	_id?: string;
	lowCost: number;
	highCost: number;
	temp: number;
	counter: number;
	solarGrown: number;
	published: string;
}

export interface Imonthly {
	_id: object;
	totalSolarGrown: number;
	totalLowCost: number;
	totalHighCost: number;
}