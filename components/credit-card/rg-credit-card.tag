<rg-credit-card>

	<input type="text"
		     name="cardNo"
				 class="field card-no
				 { icon }
				 { valid: validationResult.valid == true }"
				 oninput={ validate }
				 placeholder="{ opts.placeholder || 'Card no.' }">

	<script>
		this.on('mount', () => {
			this.mixin('rg.creditcard')
			this.cardNo.value = opts.cardno || ''
			this.validate()
			this.update()
		})

		this.validate = () => {
			this.validationResult = this.creditcard.validate(this.cardNo.value)
			this.icon = this.validationResult.valid ? this.validationResult.card_type.name : ''
		}
	</script>

	<style scoped>
		.field {
			font-size: 1em;
			padding: 10px 60px 10px 10px;
			border: 1px solid #D3D3D3;
			-webkit-box-sizing: border-box;
			-moz-box-sizing: border-box;
			box-sizing: border-box;
			outline: none;
			background-repeat: no-repeat;
			background-position: right center;
			background-size: 60px;
		}

		.field.valid {
			border-color: #3fc380;
		}

		.field.invalid {
			border-color: #c33f3f;
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

</rg-credit-card>
