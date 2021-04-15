import React from "react";
import classNames from "./utils/class-names";
import { minutesToDuration } from "./utils/duration";
import { secondsToDuration } from "./utils/duration";

const FocusBreakMessage = (props) => {
	const {
		onBreak,
		initialDuration,
		initialBreakDuration,
		durationMinutes,
		durationSeconds,
		isTimerRunning,
	} = props;
	return (
		<div>
			<div className="row mb-2">
				<div className="col">
					<h2 data-testid="session-title">
						{!onBreak ? "Focusing" : "On Break"} for{" "}
						{!onBreak
							? minutesToDuration(initialDuration)
							: minutesToDuration(initialBreakDuration)}{" "}
						minutes
					</h2>
					<p className="lead" data-testid="session-sub-title">
						{" "}
						{secondsToDuration(durationMinutes * 60 + durationSeconds)} remaining
					</p>
					{!isTimerRunning ? <h2>PAUSED</h2> : null}
				</div>
			</div>
		</div>
	);
};

export default FocusBreakMessage;
