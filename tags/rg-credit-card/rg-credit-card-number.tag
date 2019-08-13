<rg-credit-card-number>

		<input type="text" name="cardnumber" class="field card-no { icon } { 'field--success': opts.card.valid }" oninput="{ oninput }" placeholder="{ opts.card.placeholder }">

	<script>
		this.on("mount",() => {
			this.input = this.root.querySelector("input")
			this.input.value = opts.card.cardnumber
			this.update()
		})

		this.oninput = (e) =>{
			opts.card.cardnumber = e.target.value
		}

		if (!opts.card) opts.card = { cardnumber: '' }

		this.on("update", () => {
			opts.card.cardnumber = this.input.value
			const res = validateCreditCard(opts.card.cardnumber)
			opts.card.valid = res.valid
			this.icon = opts.card.valid ? res.card_type.name : ''
		})

		function validateCreditCard(input) {
			var __indexOf = [].indexOf || function (item) {
					for (var i = 0, l = this.length; i < l; i++) {
						if (i in this && this[i] === item) return i;
					}
					return -1;
				};
			var card, card_type, card_types, get_card_type, is_valid_length, is_valid_luhn, normalize, validate, validate_number, _i, _len, _ref;
			card_types = [
				{
					name: 'amex',
					icon: 'images/amex.png',
					pattern: /^3[47]/,
					valid_length: [15]
				}, {
					name: 'diners_club',
					icon: 'images/diners_club.png',
					pattern: /^30[0-5]/,
					valid_length: [14]
				}, {
					name: 'diners_club',
					icon: 'images/diners_club.png',
					pattern: /^36/,
					valid_length: [14]
				}, {
					name: 'jcb',
					icon: 'images/jcb.png',
					pattern: /^35(2[89]|[3-8][0-9])/,
					valid_length: [16]
				}, {
					name: 'laser',
					pattern: /^(6304|670[69]|6771)/,
					valid_length: [16, 17, 18, 19]
				}, {
					name: 'visa_electron',
					pattern: /^(4026|417500|4508|4844|491(3|7))/,
					valid_length: [16]
				}, {
					name: 'visa',
					icon: 'images/visa.png',
					pattern: /^4/,
					valid_length: [16]
				}, {
					name: 'mastercard',
					icon: 'images/mastercard.png',
					pattern: /^5[1-5]/,
					valid_length: [16]
				}, {
					name: 'maestro',
					pattern: /^(5018|5020|5038|6304|6759|676[1-3])/,
					valid_length: [12, 13, 14, 15, 16, 17, 18, 19]
				}, {
					name: 'discover',
					icon: 'images/discover.png',
					pattern: /^(6011|622(12[6-9]|1[3-9][0-9]|[2-8][0-9]{2}|9[0-1][0-9]|92[0-5]|64[4-9])|65)/,
					valid_length: [16]
				}
			];

			var options = {};

			if (options.accept == null) {
				options.accept = (function () {
					var _i, _len, _results;
					_results = [];
					for (_i = 0, _len = card_types.length; _i < _len; _i++) {
						card = card_types[_i];
						_results.push(card.name);
					}
					return _results;
				})();
			}
			_ref = options.accept;
			for (_i = 0, _len = _ref.length; _i < _len; _i++) {
				card_type = _ref[_i];
				if (__indexOf.call((function () {
						var _j, _len1, _results;
						_results = [];
						for (_j = 0, _len1 = card_types.length; _j < _len1; _j++) {
							card = card_types[_j];
							_results.push(card.name);
						}
						return _results;
					})(), card_type) < 0) {
					throw "Credit card type '" + card_type + "' is not supported";
				}
			}

			get_card_type = function (number) {
				var _j, _len1, _ref1;
				_ref1 = (function () {
					var _k, _len1, _ref1, _results;
					_results = [];
					for (_k = 0, _len1 = card_types.length; _k < _len1; _k++) {
						card = card_types[_k];
						if (_ref1 = card.name, __indexOf.call(options.accept, _ref1) >= 0) {
							_results.push(card);
						}
					}
					return _results;
				})();
				for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
					card_type = _ref1[_j];
					if (number.match(card_type.pattern)) {
						return card_type;
					}
				}
				return null;
			};

			is_valid_luhn = function (number) {
				var digit, n, sum, _j, _len1, _ref1;
				sum = 0;
				_ref1 = number.split('').reverse();
				for (n = _j = 0, _len1 = _ref1.length; _j < _len1; n = ++_j) {
					digit = _ref1[n];
					digit = +digit;
					if (n % 2) {
						digit *= 2;
						if (digit < 10) {
							sum += digit;
						} else {
							sum += digit - 9;
						}
					} else {
						sum += digit;
					}
				}
				return sum % 10 === 0;
			};

			is_valid_length = function (number, card_type) {
				var _ref1;
				return _ref1 = number.length, __indexOf.call(card_type.valid_length, _ref1) >= 0;
			};

			validate_number = (function (_this) {
				return function (number) {
					var length_valid, luhn_valid;
					card_type = get_card_type(number);
					luhn_valid = false;
					length_valid = false;
					if (card_type != null) {
						luhn_valid = is_valid_luhn(number);
						length_valid = is_valid_length(number, card_type);
					}
					return {
						card_type: card_type,
						valid: luhn_valid && length_valid,
						luhn_valid: luhn_valid,
						length_valid: length_valid
					};
				};
			})(this);

			normalize = function (number) {
				return number.replace(/[ -]/g, '');
			};

			validate = (function (_this) {
				return function () {
					return validate_number(normalize(input));
				};
			})(this);

			return validate(input);
		}

	</script>

	<style scoped>
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
