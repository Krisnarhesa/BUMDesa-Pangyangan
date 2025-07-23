import { Input } from '@/components/ui/input';
import { Button } from '../components/ui/button';

export default function Home({ title, description }: { title: string; description: string }) {
	return (
		<div>
			<h1>{title}</h1>
			<p>{description}</p>
			<Button variant='ghost'>Tes bang</Button>
			<Input />
		</div>
	);
}
