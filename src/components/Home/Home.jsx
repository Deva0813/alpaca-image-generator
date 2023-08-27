import { useState, useEffect } from "react";
import "./Home.css";
import dataDir from "../../assets/data/dataDir";
import html2canvas from "html2canvas";

const Home = () => {
	const [data] = useState(dataDir);
	const [selected, setSelected] = useState("");

	const [defaultImg, setDefaultImg] = useState({
		backgrounds: "blue60.png",
		ears: "default.png",
		neck: "default.png",
		nose: "nose.png",
		hair: "default.png",
		eyes: "default.png",
		mouth: "default.png",
		leg: "default.png",
		accessories: "earings.png",
	});

	useEffect(() => {
		//add selected class to styling buttons based on the defaultImg array
		const buttons = document.querySelectorAll(".styling button");
		buttons.forEach((button) => {
			if (button.name === defaultImg[selected]) {
				button.classList.add("selected");
			}
		});
		//remove selected class from other buttons
		buttons.forEach((button) => {
			if (button.name !== defaultImg[selected]) {
				button.classList.remove("selected");
			}
		});
	}, [selected, defaultImg]);

	const handleSelected = (e) => {
		setSelected(e.target.id);
		const selected = document.getElementById(e.target.id);
		selected.classList.add("selected");
		//remove selected class from other buttons
		const buttons = document.querySelectorAll(".accessorize button");
		buttons.forEach((button) => {
			if (button.id !== e.target.id) {
				button.classList.remove("selected");
			}
		});
	};

	const handleStyle = (e) => {
		//change the image
		setDefaultImg({
			...defaultImg,
			[selected]: e.target.name,
		});
	};

	const handleRandomize = () => {
		const randomizedDefaultImg = { ...defaultImg };

		data.forEach((item) => {
			const shuffledFiles = item.files
				.map((file) => file.file)
				.sort(() => Math.random() - 0.5);
			randomizedDefaultImg[item.folderName] = shuffledFiles[0];
		});

		setDefaultImg(randomizedDefaultImg);
	};

	const downloadDivAsImage = (divId) => {
		const targetDiv = document.getElementById(divId);

		targetDiv.style.borderRadius = "0px";

		if (targetDiv) {
			html2canvas(targetDiv)
				.then((canvas) => {
					const link = document.createElement("a");
					link.href = canvas.toDataURL();
					link.download = "Your Alpaca.png";
					link.click();
				})
				.catch((error) => {
					console.error("Error capturing div as image:", error);
				});
		}

		targetDiv.style.borderRadius = "1rem";		

	};

	return (
		<div className='Home'>
			<div className='outer'>
				<h1>Your Alpaca Avatar</h1>
				<div className='mainBody'>
					<div className='leftDiv'>
						<div className='cont'>
							<div className='imgDiv' id="captureDiv" >
								{Object.keys(defaultImg).map((key, index) => {
									return (
										<img
											key={index}
											src={"/images/alpaca/" + key + "/" + defaultImg[key]}
											alt={key}
										/>
									);
								})}
							</div>
						</div>
					</div>
					<div className='rightDiv'>
						<div className='cont'>
							<div className='acc'>
								<p>Accessorize the Alpaca&apos;s</p>
								<div className='options accessorize'>
									{data.map((item, index) => {
										return (
											<button
												key={index}
												onClick={handleSelected}
												id={item.folderName}
											>
												{item.folderName}
											</button>
										);
									})}
								</div>
							</div>
							<div className='styles'>
								<p>Style</p>
								<div className='options styling'>
									{selected === "" ? (
										<p style={{ fontWeight: "500" }}>
											Select an Accessory
										</p>
									) : null}
									{data.map((item) => {
										if (item.folderName === selected) {
											return item.files.map((file, index) => {
												return (
													<button
														key={index}
														onClick={handleStyle}
														id={file.name}
														name={file.file}
													>
														{file.name}
													</button>
												);
											});
										}
									})}
								</div>
							</div>
							<div className='download'>
								<p>Export</p>
								<div className='options'>
									<button onClick={handleRandomize}>Randomize</button>
									<button onClick={() => downloadDivAsImage('captureDiv')} >Download</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Home;
