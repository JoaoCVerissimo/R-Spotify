import React, { useEffect } from "react";
import { spotifyAuthCall } from "../../utils/spotifyAuthCall";
import { useLocation } from "react-router-dom";

function Callback(props) {
	const location = useLocation();

	useEffect(async () => {
		const urlParams = new URLSearchParams(location.search);
		const spotifyCode = urlParams.get("code");

		await spotifyAuthCall(spotifyCode);
		props.history.push("/dashboard");
	}, [])
	return (
		<></>
	);
};

export default Callback;
