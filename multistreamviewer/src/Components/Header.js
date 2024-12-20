import * as React from "react";
import Button from "@mui/material/Button";

import "../App.css";

function Header({ addStream }) {
	return (
		<div className="App">
			<Button onClick={addStream}>Add Stream</Button>
		</div>
	);
}

export default Header;
