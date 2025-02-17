import { RadialBarChart, RadialBar, Legend, PolarAngleAxis } from 'recharts';

const data = [
	{
		name: 'Reported',
		val: 18,
		pv: 2400,
		fill: '#6ee7b7',
	},
	{
		name: 'Link Clicked',
		val: 100,
		pv: 4567,
		fill: '#fca5a5',
	},
	{
		name: 'Shared',
		val: 31,
		pv: 1398,
		fill: '#fde047',
	},
	{
		name: 'Responded',
		val: 35.22,
		pv: 9800,
		fill: '#D8B4FE',
	},
];

const style = {
	top: 0,
  right: 25, 
	lineHeight: '24px',
};

export default function UserMetrics() {
	return (
		<RadialBarChart width={500} height={300} cx={150} cy={150} innerRadius={20} outerRadius={140} barSize={20} data={data}>
			<RadialBar
				// minAngle={15}
				// label={{ position: "insideStart", fill: "#fff" }}
				background
				// clockWise
				dataKey="val"
				// max
			/>
			<PolarAngleAxis
				tick={false}
				domain={[0, 100]}
				type="number"
				// @ts-expect-error this prop works but isn't correct in TS types
				reversed
			/>
			<Legend iconSize={10} width={120} height={140} layout="vertical" verticalAlign="middle" wrapperStyle={style} />
		</RadialBarChart>
	);
}
