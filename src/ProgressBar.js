import React from "react";

const ProgressBar = ({ durationProgress }) => {
	return (
		<div className="row mb-2">
			<div className="col">
				<div className="progress" style={{ height: "20px" }}>
					<div
						className="progress-bar"
						role="progressbar"
						aria-valuemin="0"
						aria-valuemax="100"
						aria-valuenow={durationProgress}
						style={{ width: `${durationProgress}%` }}
					/>
				</div>
			</div>
		</div>
	);
};

export default ProgressBar;
