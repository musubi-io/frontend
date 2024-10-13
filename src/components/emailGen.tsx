// import { Card, CardContent, CardTitle, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Spinner } from './ui/spinner';

// Simulated API call function
const simulateApiCall = async (data: { sender?: string; context?: string; goal?: string; additionalInfo?: string; content?: string | undefined }) => {
	await new Promise((resolve) => setTimeout(resolve, 3000));
	return { text: `Simulated response for: ${JSON.stringify(data)}` };
};

const defaultFormData = {
	sender: '',
	context: '',
	goal: '',
	additionalInfo: '',
};

export default function EmailGen() {
	const [step, setStep] = useState(1);
	const [formData, setFormData] = useState(defaultFormData);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { id, value } = e.target;
		setFormData({ ...formData, [id]: value });
	};

	const nextStep = () => setStep(step + 1);
	const prevStep = () => setStep(step - 1);

	// Step 1: Send data to first API
	const firstApiQuery = useQuery({
		queryKey: ['firstApi', formData],
		queryFn: () => simulateApiCall(formData),
		enabled: false,
	});

	// Step 3: Send textarea content to second API
	const secondApiQuery = useQuery({
		queryKey: ['secondApi', firstApiQuery.data?.text],
		queryFn: () => simulateApiCall({ content: firstApiQuery.data?.text }),
		enabled: false,
	});

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (step === 1) {
			firstApiQuery.refetch();
			nextStep();
		} else if (step === 3) {
			secondApiQuery.refetch();
			nextStep();
		}
	};

	return (
		<div className="relative flex flex-col items-start gap-8">
			<form className="grid w-full items-start gap-6" onSubmit={handleSubmit}>
				{step === 1 && (
					<fieldset className="grid gap-6 rounded-lg border p-4">
						<legend className="-ml-1 px-1 text-sm font-medium">Step 1: Sender Information</legend>
						<div className="grid gap-3">
							<Label htmlFor="sender">Sender</Label>
							<Input id="sender" type="text" placeholder="Enter sender's name" value={formData.sender} onChange={handleChange} />
						</div>
						<div className="grid gap-3">
							<Label htmlFor="context">Context</Label>
							<Input id="context" type="text" placeholder="Enter message context" value={formData.context} onChange={handleChange} />
						</div>
						<div className="grid gap-3">
							<Label htmlFor="goal">Goal</Label>
							<Input id="goal" type="text" placeholder="Enter message goal" value={formData.goal} onChange={handleChange} />
						</div>
						<Button type="submit" className="w-full">
							Submit
						</Button>
					</fieldset>
				)}
				{step === 2 && (
					<fieldset className="grid gap-6 rounded-lg border p-4">
						<legend className="-ml-1 px-1 text-sm font-medium">Step 2: API Response</legend>
						{firstApiQuery.isLoading ? (
							<Spinner/>
						) : firstApiQuery.isError ? (
							<p>Error: {firstApiQuery.error.message}</p>
						) : (
							<Textarea
								value={firstApiQuery.data?.text || ''}
								onChange={(e) => {
									if (firstApiQuery.data) {
										firstApiQuery.data.text = e.target.value;
									}
								}}
								rows={6}
								placeholder="API response will appear here"
							/>
						)}
						<div className="flex justify-between">
							<Button type="button" onClick={prevStep}>
								Previous
							</Button>
							<Button type="button" onClick={nextStep} disabled={firstApiQuery.isLoading || firstApiQuery.isError}>
								Next
							</Button>
						</div>
					</fieldset>
				)}
				{step === 3 && (
					<fieldset className="grid gap-6 rounded-lg border p-4">
						<legend className="-ml-1 px-1 text-sm font-medium">Step 3: Submit Response</legend>
						<Textarea
							value={firstApiQuery.data?.text || ''}
							onChange={(e) => {
								if (firstApiQuery.data) {
									firstApiQuery.data.text = e.target.value;
								}
							}}
							rows={6}
							placeholder="Edit response if needed"
						/>
						<div className="flex justify-between">
							<Button type="button" onClick={prevStep}>
								Previous
							</Button>
							<Button type="submit">Submit</Button>
						</div>
					</fieldset>
				)}
				{step === 4 && (
					<fieldset className="grid gap-6 rounded-lg border p-4">
						<legend className="-ml-1 px-1 text-sm font-medium">Step 4: Completion</legend>
						{secondApiQuery.isLoading ? (
							<p>Submitting...</p>
						) : secondApiQuery.isError ? (
							<p>Error: {secondApiQuery.error.message}</p>
						) : secondApiQuery.isSuccess ? (
							<p>Thank you for your submission!</p>
						) : (
							<p>Waiting for submission...</p>
						)}
					</fieldset>
				)}
			</form>
		</div>
	);
}
