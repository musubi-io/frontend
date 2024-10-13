import { MainBody } from './components/Body';
import { Header } from './components/header';


export const description = 'A collection of health charts.';

export default function App() {
	return (
		<div className="flex flex-col min-h-screen">
			<Header />
			<div className="flex-1 overflow-auto w-full h-full">
				<MainBody />
			</div>
		</div>
	);
}


