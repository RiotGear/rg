<rg-loading>

	<div class="overlay"></div>
	<div class="loading">
		<div>
			<yield/>
		</div>
		<div if="{ opts.spinner == 'true' }">
			<svg width='80px' height='80px' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" class="uil-default">
				<rect x="0" y="0" width="80" height="80" fill="none" class="bk"></rect>
				<rect x='48.5' y='47' width='3' height='6' rx='0' ry='0' fill='#ffffff' transform='rotate(0 50 50) translate(0 -10)'><animate attributeName='opacity' from='1' to='0' dur='0.5s' begin='0s' repeatCount='indefinite'/></rect>
				<rect x='48.5' y='47' width='3' height='6' rx='0' ry='0' fill='#ffffff' transform='rotate(45 50 50) translate(0 -10)'><animate attributeName='opacity' from='1' to='0' dur='0.5s' begin='0.0625s' repeatCount='indefinite'/></rect>
				<rect x='48.5' y='47' width='3' height='6' rx='0' ry='0' fill='#ffffff' transform='rotate(90 50 50) translate(0 -10)'><animate attributeName='opacity' from='1' to='0' dur='0.5s' begin='0.125s' repeatCount='indefinite'/></rect>
				<rect x='48.5' y='47' width='3' height='6' rx='0' ry='0' fill='#ffffff' transform='rotate(135 50 50) translate(0 -10)'><animate attributeName='opacity' from='1' to='0' dur='0.5s' begin='0.1875s' repeatCount='indefinite'/></rect>
				<rect x='48.5' y='47' width='3' height='6' rx='0' ry='0' fill='#ffffff' transform='rotate(180 50 50) translate(0 -10)'><animate attributeName='opacity' from='1' to='0' dur='0.5s' begin='0.25s' repeatCount='indefinite'/></rect>
				<rect x='48.5' y='47' width='3' height='6' rx='0' ry='0' fill='#ffffff' transform='rotate(225 50 50) translate(0 -10)'><animate attributeName='opacity' from='1' to='0' dur='0.5s' begin='0.3125s' repeatCount='indefinite'/></rect>
				<rect x='48.5' y='47' width='3' height='6' rx='0' ry='0' fill='#ffffff' transform='rotate(270 50 50) translate(0 -10)'><animate attributeName='opacity' from='1' to='0' dur='0.5s' begin='0.375s' repeatCount='indefinite'/></rect>
				<rect x='48.5' y='47' width='3' height='6' rx='0' ry='0' fill='#ffffff' transform='rotate(315 50 50) translate(0 -10)'><animate attributeName='opacity' from='1' to='0' dur='0.5s' begin='0.4375s' repeatCount='indefinite'/></rect>
			</svg>
		</div>
	</div>

	<style scoped>

		.overlay {
			position: absolute;
			width: 100%;
			height: 100%;
			top: 0;
			right: 0;
			bottom: 0;
			left: 0;
			background-color: rgba(0, 0, 0, 0.8);
			z-index: 200;
		}

		.loading {
			position: absolute;
			width: 95%;
			max-width: 420px;
			top: 50%;
			left: 50%;
			-webkit-transform: translate3d(-50%, -50%, 0);
			-moz-transform: translate3d(-50%, -50%, 0);
			-ms-transform: translate3d(-50%, -50%, 0);
			-o-transform: translate3d(-50%, -50%, 0);
			transform: translate3d(-50%, -50%, 0);
			background-color: transparent;
			color: #fff;
			text-align: center;
			z-index: 201;
		}

	</style>

</rg-loading>
