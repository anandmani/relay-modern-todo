/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type {ConcreteFragment} from 'relay-runtime';
export type App = {|
  +todos: ?$ReadOnlyArray<?{| |}>;
|};
*/


const fragment /*: ConcreteFragment*/ = {
  "argumentDefinitions": [
    {
      "kind": "LocalArgument",
      "name": "status",
      "type": "String",
      "defaultValue": ""
    }
  ],
  "kind": "Fragment",
  "metadata": null,
  "name": "App",
  "selections": [
    {
      "kind": "LinkedField",
      "alias": null,
      "args": [
        {
          "kind": "Variable",
          "name": "status",
          "variableName": "status",
          "type": "String"
        }
      ],
      "concreteType": "Todo",
      "name": "todos",
      "plural": true,
      "selections": [
        {
          "kind": "FragmentSpread",
          "name": "Todo",
          "args": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "App"
};

module.exports = fragment;
