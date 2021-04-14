import React, { useState } from "react";
import useInterval from "../utils/useInterval";
import FocusBreakDuration from "../FocusBreakDuration";
import TimerControls from "../TimerControls";
import ProgressBar from "../ProgressBar";
import { minutesToDuration } from "../utils/duration";
import { secondsToDuration } from "../utils/duration";

function Pomodoro() {
	const [isTimerRunning, setIsTimerRunning] = useState(false);
	const [firstPlay, setFirstPlay] = useState(true);
	const [onBreak, setOnBreak] = useState(false);
	const [activeSession, setActiveSession] = useState(false);
	const [focusDurationMinutes, setFocusDurationMinutes] = useState(25);
	const [breakDurationMinutes, setBreakDurationMinutes] = useState(5);
	const [durationMinutes, setDurationMinutes] = useState(25);
	const [durationSeconds, setDurationSeconds] = useState(0);
	const [initialDuration, setInitialDuration] = useState(25);
	const [initialBreakDuration, setInitialBreakDuration] = useState(5);
	const [durationProgress, setDurationProgress] = useState(0);

	function percentage(currentMinutes, currentSeconds, initialMinutes) {
		return (
			100 - ((currentMinutes * 60 + currentSeconds) / (initialMinutes * 60)) * 100
		);
	}

	useInterval(
		() => {
			// ToDo: Implement what should happen when the timer is running
			setDurationSeconds((second) => {
				second === 0 ? (second = 59) : (second -= 1);
				if (second === 59)
					setDurationMinutes((minutes) => (minutes = durationMinutes - 1));
				return second;
			});

			if (onBreak)
				setDurationProgress(
					(currentProgress) =>
						(currentProgress = percentage(
							durationMinutes,
							durationSeconds,
							initialBreakDuration
						))
				);
			else
				setDurationProgress(
					(currentProgress) =>
						(currentProgress = percentage(
							durationMinutes,
							durationSeconds,
							initialDuration
						))
				);

			if (durationMinutes === 0 && durationSeconds === 1) timerExpired();
		},
		isTimerRunning ? 1000 : null
	);

	function timerExpired() {
		if (!onBreak) focusSessionExpired();
		else breakSessionExpired();
	}

	function focusSessionExpired() {
		new Audio(`https://bigsoundbank.com/UPLOAD/mp3/1482.mp3`).play(); // Play's a gong sound
		setOnBreak((state) => (state = true));
		setDurationProgress((progress) => (progress = 0));
		setDurationSeconds((seconds) => (seconds = 0));
		setDurationMinutes((minutes) => (minutes = initialBreakDuration));
	}

	function breakSessionExpired() {
		new Audio(`https://bigsoundbank.com/UPLOAD/mp3/0899.mp3`).play(); // Play's a bell alert
		setOnBreak((state) => (state = false));
		setDurationProgress((progress) => (progress = 0));
		setDurationSeconds((seconds) => (seconds = 0));
		setDurationMinutes((minutes) => (minutes = initialDuration));
	}

	function playPause() {
		if (firstPlay) {
			setInitialDuration((duration) => (duration = focusDurationMinutes));
			setInitialBreakDuration((duration) => (duration = breakDurationMinutes));
			setDurationMinutes((duration) => (duration = focusDurationMinutes));
			setFirstPlay((state) => (state = false));
		}
		setActiveSession((state) => (state = true));
		setIsTimerRunning((prevState) => !prevState);
	}
	function stopButton() {
		setFirstPlay((state) => (state = true));
		setIsTimerRunning((state) => (state = false));
		setOnBreak((state) => (state = false));
		setActiveSession((state) => (state = false));

		setDurationProgress((progress) => (progress = 0));
		setDurationSeconds((seconds) => (seconds = 0));
		setDurationMinutes((duration) => (duration = focusDurationMinutes));
		setInitialDuration((duration) => (duration = focusDurationMinutes));
		setInitialBreakDuration((duration) => (duration = breakDurationMinutes));
	}

	return (
		<div className="pomodoro">
			<FocusBreakDuration
				focusDurationMinutes={focusDurationMinutes}
				isTimerRunning={isTimerRunning}
				firstPlay={firstPlay}
				setFocusDurationMinutes={setFocusDurationMinutes}
				breakDurationMinutes={breakDurationMinutes}
				setBreakDurationMinutes={setBreakDurationMinutes}
			/>
			<TimerControls
				playPause={playPause}
				isTimerRunning={isTimerRunning}
				stopButton={stopButton}
			/>
			{/*-----Focus/Break Message-----*/}
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
			<ProgressBar durationProgress={durationProgress} />
		</div>
	);
}

export default Pomodoro;
