# Pizza Time! :pizza: :pizza:

<p align="center">
  <a href="https://github.com/actions/javascript-action/actions"><img alt="javscript-action status" src="https://github.com/actions/javascript-action/workflows/units-test/badge.svg"></a>
</p>

This action will send a pizza from Dominos to an address/addresses stored in your secret store based on whichever `/` command is entered into an issue comment.

Example: `/order pizza person_name`

## Necessary Secrets

- `CC_NUMBER`: Credit Card Number
- `CC_EXP`: Credit Card Zip
- `CC_CVV`: Credit Card CVV
- `CC_ZIP`: Billing Zip
- `NAME-OF-FRIEND_ADDRESS`: Each one unique, but the `customer` object of the friend you want to send 🍕 to (see below)

## Customer Object

```json
{
  "address": {
    "Street": "745 Evergreen Terr",
    "City": "Springfield",
    "Region": "????",
    "PostalCode": 12345,
  },
  "firstName": "Homer",
  "lastName": "Simpson",
  "phone": "(123)-456-7890",
  "email": "HomerJ@MrPlow.com"
}
```

## Example 

In an Issue comment, assuming the object above is called `Homer_Address` in your secret store, run:

`/order pizza Homer`

## Other References

Check out the API wrapper I'm using developed by @RIAEvangelist over at: [Dominos Node API](https://github.com/RIAEvangelist/node-dominos-pizza-api)
