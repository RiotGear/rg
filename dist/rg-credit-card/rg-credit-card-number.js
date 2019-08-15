riot.tag2('rg-credit-card-number', '<input type="text" name="cardnumber" class="field card-no {icon} {\'field--success\': opts.card.valid}" oninput="{oninput}" placeholder="{opts.card.placeholder}">', 'rg-credit-card-number .card-no,[data-is="rg-credit-card-number"] .card-no{ padding-right: 60px; background-repeat: no-repeat; background-position: right center; background-size: 60px; } rg-credit-card-number .amex,[data-is="rg-credit-card-number"] .amex{ background-image: url(img/amex.png); } rg-credit-card-number .diners_club,[data-is="rg-credit-card-number"] .diners_club{ background-image: url(img/diners_club.png); } rg-credit-card-number .discover,[data-is="rg-credit-card-number"] .discover{ background-image: url(img/discover.png); } rg-credit-card-number .jcb,[data-is="rg-credit-card-number"] .jcb{ background-image: url(img/jcb.png); } rg-credit-card-number .mastercard,[data-is="rg-credit-card-number"] .mastercard{ background-image: url(img/mastercard.png); } rg-credit-card-number .visa,[data-is="rg-credit-card-number"] .visa{ background-image: url(img/visa.png); }', '', function(opts) {
this.on("mount", () => {
  this.input = this.root.querySelector("input");
  this.input.value = opts.card.cardnumber;
  this.update();
}); // this just triggers update

this.oninput = () => {};

if (!opts.card) opts.card = {
  cardnumber: ''
};
this.on("update", () => {
  opts.card.cardnumber = this.input.value;
  const res = validateCreditCard(opts.card.cardnumber);
  opts.card.valid = res.valid;
  this.icon = opts.card.valid ? res.card_type.name : '';
});

function validateCreditCard(input) {
  var card, card_type, card_types, get_card_type, is_valid_length, is_valid_luhn, normalize, validate, validate_number, _i, _len;

  card_types = [{
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
  }];
  var options = {
    accept: card_types.map(c => c.name)
  };

  get_card_type = function (number) {
    return card_types.find(c => number.match(c.pattern)) || null;
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
    return card_type.valid_length.indexOf(number.length) !== -1;
  };

  validate_number = function (_this) {
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
  }(this);

  normalize = function (number) {
    return number.replace(/[ -]/g, '');
  };

  validate = function (_this) {
    return function () {
      return validate_number(normalize(input));
    };
  }(this);

  return validate(input);
}
});
