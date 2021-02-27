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

## Code in Main

Install the dependencies

```bash
npm install
```

Compile project using ncc
```bash
npm run prepare
```
## Other References

Check out the API wrapper I'm using developed by @RIAEvangelist over at: [Dominos Node API](https://github.com/RIAEvangelist/node-dominos-pizza-api)
