function ProgressBar({ progress }) {
    return (
        <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">

            <div
                className="bg-blue-600 h-full transition-all duration-700"
                style={{ width: `${progress}%` }}
            />

        </div>
    );
}

export default ProgressBar;