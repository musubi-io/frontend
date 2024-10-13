import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { useState } from 'react';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { Spinner } from './ui/spinner';
import { Card, CardTitle } from './ui/card';

interface GenFormType {
	sender: string;
	context: string;
	goal: string;
}

const simulateApiCall = async (data: { sender?: string; context?: string; goal?: string; additionalInfo?: string; content?: string | undefined }) => {
	await new Promise((resolve) => setTimeout(resolve, 3000));
	return { text: `Simulated response for: ${JSON.stringify(data)}` };
};

const defaultFormData: GenFormType = {
	sender: '',
	context: '',
	goal: '',
};

export default function EmailGen() {
	const [step, setStep] = useState(1);
	const [formData, setFormData] = useState(defaultFormData);
	const [name, setName] = useState('');

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { id, value } = e.target;
		setFormData({ ...formData, [id]: value });
	};

	const nextStep = () => setStep(step + 1);
	const prevStep = () => setStep(step - 1);

	const fetchFirstApi = async (data: { sender: string; context: string; goal: string }) => {
		const response = await fetch('http://localhost:6900/api/generatePhishEmails', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		});

		if (!response.ok) {
			throw new Error('Network response was not ok');
		}

		return response.json();
	};
	const fetchSecondApi = async (data: { name: string; subject: string; body: string }) => {
		const response = await fetch('http://localhost:6900/api/phishEmails', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		});

		if (!response.ok) {
			throw new Error('Network response was not ok');
		}

		return response.json();
	};

	const firstApiQuery = useQuery({
		queryKey: ['firstApi', formData],
		queryFn: () => fetchFirstApi(formData),
		enabled: true,
	});

	const secondApiQuery = useQuery({
		queryKey: ['secondApi', { subject: firstApiQuery.data?.subject, body: firstApiQuery.data?.body }],
		queryFn: () =>
			fetchSecondApi({
				name: firstApiQuery.data?.subject + firstApiQuery.data?.body,
				subject: firstApiQuery.data?.subject,
				body: firstApiQuery.data?.body,
			}),
		enabled: true,
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
		<Card className="relative flex flex-col items-start gap-8">
			<form className="grid w-full items-start gap-6" onSubmit={handleSubmit}>
				{step === 1 && <GenerateStep formData={formData} handleChange={handleChange} />}
				{step === 2 && <ResponseStep query={firstApiQuery} prevStep={prevStep} nextStep={nextStep} />}
				{step === 3 && <SubmitResponseStep query={firstApiQuery} prevStep={prevStep} name={name} setName={setName} />}
				{step === 4 && <CompletionStep query={secondApiQuery} />}
			</form>
		</Card>
	);
}

function ResponseStep({
	query,
	prevStep,
	nextStep,
}: {
	query: UseQueryResult<{ subject: string; body: string }, Error>;
	prevStep: () => void;
	nextStep: () => void;
}) {
	return (
		<fieldset className="grid gap-6 rounded-lg border p-4">
			<CardTitle className="text-sm font-medium">Step 2: API Response</CardTitle>
			{query.isLoading ? (
				<Spinner />
			) : query.isError ? (
				<p>Error: {query.error.message}</p>
			) : (
				<>
					<Label htmlFor="subject">Subject</Label>
					<Input
						id="subject"
						value={query.data?.subject || ''}
						onChange={(e) => {
							if (query.data) {
								query.data.subject = e.target.value;
							}
						}}
						placeholder="API response subject will appear here"
					/>
					<Label htmlFor="body">Body</Label>
					<Textarea
						id="body"
						value={query.data?.body || ''}
						onChange={(e) => {
							if (query.data) {
								query.data.body = e.target.value;
							}
						}}
						rows={6}
						placeholder="API response body will appear here"
					/>
				</>
			)}
			<div className="flex justify-between">
				<Button type="button" onClick={prevStep}>
					Previous
				</Button>
				<Button type="button" onClick={nextStep} disabled={query.isLoading || query.isError}>
					Next
				</Button>
			</div>
		</fieldset>
	);
}

function SubmitResponseStep({
	query,
	prevStep,
	name,
	setName,
}: {
	query: UseQueryResult<{ subject: string; body: string }, Error>;
	prevStep: () => void;
	name: string;
	setName: (name: string) => void;
}) {
	return (
		<fieldset className="grid gap-6 rounded-lg border p-4">
			<legend className="-ml-1 px-1 text-sm font-medium">Step 3: Submit Response</legend>
			<Label htmlFor="name">Name</Label>
			<Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter your name" />
			<Label htmlFor="subject">Subject</Label>
			<Input
				id="subject"
				value={query.data?.subject || ''}
				onChange={(e) => {
					if (query.data) {
						query.data.subject = e.target.value;
					}
				}}
				placeholder="API response subject will appear here"
			/>
			<Label htmlFor="body">Body</Label>
			<Textarea
				id="body"
				value={query.data?.body || ''}
				onChange={(e) => {
					if (query.data) {
						query.data.body = e.target.value;
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
	);
}

function CompletionStep({ query }: { query: UseQueryResult<{ text: string }, Error> }) {
	return (
		<fieldset className="grid gap-6 rounded-lg border p-4">
			<CardTitle className="text-sm font-medium">Step 4: Completion</CardTitle>
			{query.isLoading ? (
				<p>Submitting...</p>
			) : query.isError ? (
				<p>Error: {query.error.message}</p>
			) : query.isSuccess ? (
				<p>Thank you for your submission!</p>
			) : (
				<p>Waiting for submission...</p>
			)}
		</fieldset>
	);
}

function GenerateStep({ handleChange, formData }: { formData: GenFormType; handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void }) {
	return (
		<fieldset className="grid gap-6 rounded-lg border p-4">
			<CardTitle className="text-sm font-medium">Generate Email</CardTitle>
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
	);
}
