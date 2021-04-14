import React from "react";
import { minutesToDuration } from "./utils/duration";

const FocusBreakDuration = (props) => {
	const {
		focusDurationMinutes,
		isTimerRunning,
		firstPlay,
		setFocusDurationMinutes,
		breakDurationMinutes,
		setBreakDurationMinutes,
	} = props;

	const decreaseFocusDuration = () => {
		if (focusDurationMinutes > 5 && !isTimerRunning && firstPlay)
			setFocusDurationMinutes((minutes) => (minutes -= 5));
	};

	const increaseFocusDuration = () => {
		if (focusDurationMinutes < 60 && !isTimerRunning && firstPlay)
			setFocusDurationMinutes((minutes) => (minutes += 5));
	};

	const decreaseBreakDuration = () => {
		if (breakDurationMinutes > 1 && !isTimerRunning && firstPlay)
			setBreakDurationMinutes((minutes) => (minutes -= 1));
	};

	const increaseBreakDuration = () => {
		if (breakDurationMinutes < 15 && !isTimerRunning && firstPlay)
			setBreakDurationMinutes((minutes) => (minutes += 1));
	};

	return (
		<div className="row">
			<div className="col">
				<div className="input-group input-group-lg mb-2">
					<span className="input-group-text" data-testid="duration-focus">
						Focus Duration: {minutesToDuration(focusDurationMinutes)}
					</span>
					<div className="input-group-append">
						<button
							type="button"
							className="btn btn-secondary"
							data-testid="decrease-focus"
							onClick={decreaseFocusDuration}
						>
							<span className="oi oi-minus" />
						</button>
						<button
							type="button"
							className="btn btn-secondary"
							data-testid="increase-focus"
							onClick={increaseFocusDuration}
						>
							<span className="oi oi-plus" />
						</button>
					</div>
				</div>
			</div>
			<div className="col">
				<div className="float-right">
					<div className="input-group input-group-lg mb-2">
						<span className="input-group-text" data-testid="duration-break">
							Break Duration: {minutesToDuration(breakDurationMinutes)}
						</span>
						<div className="input-group-append">
							<button
								type="button"
								className="btn btn-secondary"
								data-testid="decrease-break"
								onClick={decreaseBreakDuration}
							>
								<span className="oi oi-minus" />
							</button>
							<button
								type="button"
								className="btn btn-secondary"
								data-testid="increase-break"
								onClick={increaseBreakDuration}
							>
								<span className="oi oi-plus" />
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default FocusBreakDuration;
