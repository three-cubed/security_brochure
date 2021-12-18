## Project

This is a full-stack brochure website for a (fictional) company.

## Transactions

Fictionally purchasing services of the company will result in an interaction with the backend, which will produce a response from the backend to be found in the browser development tools, as well as some information logged in the console. 

Fictional transactions are processed by Prettypay. Although it was embedded within this brochure project, Prettypay is a separate project which, since version 2.0.0, is now installed by NPM. The Prettypay directory in `node_modules` has its own `README.md` to explain the project, which can also be found at [npmjs.com/package/prettypay](https://www.npmjs.com/package/prettypay).

Both this project and Prettypay record transactions. This brochure project records successful transactions in `/receipts/receipts.json`, with information on purchase items, quantities, etc.. Prettypay also records the amount, identity, time and outcome of all transactions it has processed, but is not concerned with items, quantities, etc.. Its records can be found in `node_modules/prettypay/records`.

## Contact Form

Submitting the contact form leads to another page, informing you that contact has purportedly been made.
This is to give the appearance of a company site.
By deliberate design, no actual contact is made.
No contact form details or messages will be received, let alone processed or recorded, by the site.

## Attribution

Unless otherwise stated, images are in the public domain with a Public Domain Certification; for details see: [creativecommons.org/licenses/publicdomain](https://creativecommons.org/licenses/publicdomain/).

The images *countryside-car-security.jpeg* and *security-training-courses/close-protection.jpg* have Attribution-ShareAlike 4.0 International licences; for details see: https://creativecommons.org/licenses/by-sa/4.0/. 
Those images are hereby duly attributed to **Raimond Spekking** and were originally titled
*Vorstellung der Plakatkampagne Henriette Reker zur Oberbürgermeisterinnen-Wahl 2020 -0382.jpg*
and *Besuch Bundespräsident Steinmeier in Köln-0-4629.jpg* respectively.

The video was downloaded from https://coverr.co/. The name of the individual videographer is not provided.
The licence states:
> *All Videos published on Coverr.co can be used free for commercial and non-commercial purposes. 
> You do not need to ask permission from or provide credit to the videographer or Coverr.co, although it is appreciated when possible.* 

For more details, see: https://coverr.co/license.
