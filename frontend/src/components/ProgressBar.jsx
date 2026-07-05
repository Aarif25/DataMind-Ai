function ProgressBar({ progress }) {
    return (
        <div className="h-4 w-full overflow-hidden rounded-full bg-[#f6e7c8]/40">

            <div
                className="h-full bg-gradient-to-r from-[#7a2438] to-[#c7a965] transition-all duration-700"
                style={{ width: `${progress}%` }}
            />

        </div>
    );
}

export default ProgressBar;