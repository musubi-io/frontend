import { MainBody } from './components/Body';
import { Header } from './components/header';


export const description = 'A collection of health charts.';

export default function App() {
	return (
		<div className="flex flex-col h-screen">
			<Header />
			<div className="flex-grow-1 overflow-auto w-full">
				<MainBody />
			</div>
		</div>
	);
}


