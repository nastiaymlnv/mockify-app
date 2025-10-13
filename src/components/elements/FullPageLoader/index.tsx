const FullPageLoader = () => {
	return (
		<div className="h-full grid place-items-center" style={{ minHeight: 'calc(100dvh - 64px)' }}>
			<div
				className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-gray-600"
				role="status"
			></div>
		</div>
	);
};

export default FullPageLoader;
