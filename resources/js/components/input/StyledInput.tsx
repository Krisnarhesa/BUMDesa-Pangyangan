// Component for make child styled like TextInput
export default function StyledInput({
	children,
	label,
	error,
}: {
	children: React.ReactNode;
	label: string;
	error?: string;
}) {
	return (
		<div className="after:bg-pertamina-blue relative space-y-3 after:top-0 after:left-20 after:h-full after:w-1 after:rounded-lg after:content-[''] lg:px-28 lg:after:absolute">
			<label className='font-semibold'>{label}</label>
			{children}
			{error && <span className='text-xs text-red-500 italic'>{error}</span>}
		</div>
	);
}
