<rg-credit-card-number>

	<input type="text" name="cardnumber" class="field card-no
				 { RgCreditCard.icon }
				 { valid: RgCreditCard.valid }" oninput="{ validate }" placeholder="{ RgCreditCard.placeholder }">

	<script>
		const setUI = () => {
			if (this.cardnumber.value != this.RgCreditCard.cardnumber)
				this.cardnumber.value = this.RgCreditCard.cardnumber
			this.RgCreditCard.validate()
		}

		this.on('mount', () => {
			this.RgCreditCard = opts.card || new RgCreditCard()
			this.RgCreditCard.on('cardnumber', () => {
				setUI()
			})
			this.RgCreditCard.on('validate', () => {
				this.update()
			})
			setUI()
		})

		this.validate = () => {
			this.RgCreditCard.cardnumber = this.cardnumber.value
			this.RgCreditCard.validate()
		}

	</script>

	<style scoped>
		.field {
			font-size: 1em;
			padding: 10px;
			border: 1px solid #D3D3D3;
			box-sizing: border-box;
			outline: none;
		}

		.card-no {
			padding-right: 60px;
			background-repeat: no-repeat;
			background-position: right center;
			background-size: 60px;
		}

		.amex {
			background-image: url(img/amex.png);
		}

		.diners_club {
			background-image: url(img/diners_club.png);
		}

		.discover {
			background-image: url(img/discover.png);
		}

		.jcb {
			background-image: url(img/jcb.png);
		}

		.mastercard {
			background-image: url(img/mastercard.png);
		}

		.visa {
			background-image: url(img/visa.png);
		}

	</style>

</rg-credit-card-number>
